import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HandHeart, Gift, Handshake, HandCoins, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { useCreateEnquiry, type EnquiryInterest } from "@workspace/api-client-react";
import { Reveal, SectionHead } from "@/components/site/primitives";
import { CONTACT, SOCIALS } from "@/lib/contact";
import { useGoTo } from "@/components/site/nav";
import { RainbowButton } from "@/components/fx/rainbow-button";
import { INTEREST_EVENT, consumeInterest } from "@/lib/site";

const cards: { t: string; d: string; bg: string; fg: string; icon: typeof HandHeart; interest: EnquiryInterest; cta: string }[] = [
  { t: "Volunteer", d: "Share your time and skills.", bg: "#F98B78", fg: "#3a160f", icon: HandHeart, interest: "Volunteering", cta: "Volunteer with us" },
  { t: "Sponsor", d: "Sponsor Kotak Cantik boxes and kits.", bg: "#7DD56F", fg: "#173512", icon: Gift, interest: "Sponsoring Kotak Cantik", cta: "Become a sponsor" },
  { t: "Partner", d: "CSR and strategic synergy.", bg: "#F6A44C", fg: "#3d2207", icon: Handshake, interest: "Corporate Partnership", cta: "Partner with us" },
  { t: "Donate", d: "Fuel our programs.", bg: "#8CCBEB", fg: "#0f3043", icon: HandCoins, interest: "Donating", cta: "Make a donation" },
];

export function GetInvolved() {
  const goTo = useGoTo();
  return (
    <section id="get-involved" className="relative px-3 md:px-5"><div className="sec bg-deep relative overflow-hidden rounded-[32px] md:rounded-[48px] max-w-[1320px] mx-auto shadow-[inset_6px_6px_18px_rgba(10,30,8,.45),inset_-6px_-6px_18px_rgba(90,150,72,.35),12px_12px_30px_var(--neu-lo),-10px_-10px_26px_var(--neu-hi)]">
      <div aria-hidden className="absolute -left-40 top-10 w-96 h-96 rotate-45 rounded-[60px] bg-brand/30" />
      <div className="wrap relative">
        <SectionHead light title="Join the MYITRA Movement" sub="Empowering Communities. Inspiring Futures." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 80} className="lift rounded-[24px] p-2 flex flex-col min-h-[260px] bg-[#2D5E27] shadow-[6px_6px_14px_rgba(10,30,8,.5),-5px_-5px_12px_rgba(90,150,72,.35)]">
              <div className="p-6 rounded-[18px] flex flex-col flex-1 min-h-[244px] shadow-[inset_2px_2px_0_rgba(255,255,255,.3),inset_-3px_-3px_8px_rgba(0,0,0,.1)]" style={{ background: c.bg, color: c.fg }}>
                <span className="w-14 h-14 rounded-2xl bg-white/50 grid place-items-center shadow-[inset_2px_2px_5px_rgba(0,0,0,.08),inset_-2px_-2px_5px_rgba(255,255,255,.5)]"><c.icon className="w-7 h-7" strokeWidth={1.75} aria-hidden /></span>
                <h3 className="mt-6 text-[22px] font-semibold" style={{ color: c.fg }}>{c.t}</h3>
                <p className="mt-2 text-[15px] flex-1">{c.d}</p>
                <RainbowButton type="button" variant="outline" size="sm" onClick={() => goTo("contact", c.interest)} className="mt-6 self-start shadow-[3px_3px_8px_rgba(0,0,0,.15),-2px_-2px_6px_rgba(255,255,255,.35)]!" data-testid={`button-involve-${c.t.toLowerCase()}`}>
                  {c.cta} <ArrowRight />
                </RainbowButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div></section>
  );
}

const INTERESTS = ["Volunteering", "Sponsoring Kotak Cantik", "Corporate Partnership", "Donating", "General Enquiry"] as const;

const schema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name.").max(200),
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address.").max(320),
  phone: z.string().trim().max(50, "Phone number is too long.").optional(),
  interest: z.enum(INTERESTS, { errorMap: () => ({ message: "Please choose an option." }) }),
  message: z.string().trim().min(1, "Please write a short message.").max(5000),
});
type FormValues = z.infer<typeof schema>;

const field = "field-neu placeholder:text-body/50";

export function Contact() {
  const mutation = useCreateEnquiry();
  const [done, setDone] = useState<string | null>(null);
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { fullName: "", email: "", phone: "", interest: "General Enquiry", message: "" } });
  const { register, handleSubmit, setValue, formState: { errors } } = form;

  useEffect(() => {
    const pending = consumeInterest();
    if (pending) setValue("interest", pending);
    const on = (e: Event) => { setValue("interest", (e as CustomEvent<EnquiryInterest>).detail); consumeInterest(); };
    window.addEventListener(INTEREST_EVENT, on);
    return () => window.removeEventListener(INTEREST_EVENT, on);
  }, [setValue]);

  const onSubmit = (v: FormValues) => {
    mutation.mutate(
      { data: { fullName: v.fullName, email: v.email, phone: v.phone ? v.phone : undefined, interest: v.interest, message: v.message } },
      { onSuccess: (r) => { setDone(r.fullName.split(" ")[0]); form.reset(); } },
    );
  };

  const err = (m?: string) => m ? <p role="alert" className="mt-1.5 text-[13px] text-[#b3261e]">{m}</p> : null;

  return (
    <section id="contact" className="sec">
      <div className="wrap">
        <SectionHead title="Get in Touch" />
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8">
          <Reveal className="card p-6 md:p-10">
            {done ? (
              <div className="text-center py-10" aria-live="polite" data-testid="status-enquiry-success">
                <span className="neu-in mx-auto w-20 h-20 rounded-full! text-brand grid place-items-center"><CheckCircle2 className="w-10 h-10" strokeWidth={1.75} aria-hidden /></span>
                <h3 className="t-h3 mt-6">Thank you, {done}.</h3>
                <p className="mt-3 max-w-md mx-auto">Your message has been sent to the MYITRA team. We will be in touch soon. Together, we build stronger communities.</p>
                <p className="script text-[28px] text-deep mt-4">People · Purpose · Positive Change</p>
                <RainbowButton type="button" variant="outline" className="mt-6" onClick={() => { setDone(null); mutation.reset(); }} data-testid="button-enquiry-another">Send another enquiry</RainbowButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid sm:grid-cols-2 gap-5" aria-label="Enquiry form">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-[14px] font-semibold text-deep mb-1.5">Full name *</label>
                  <input id="fullName" autoComplete="name" className={field} aria-invalid={!!errors.fullName} {...register("fullName")} data-testid="input-fullname" />
                  {err(errors.fullName?.message)}
                </div>
                <div>
                  <label htmlFor="email" className="block text-[14px] font-semibold text-deep mb-1.5">Email *</label>
                  <input id="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} {...register("email")} data-testid="input-email" />
                  {err(errors.email?.message)}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[14px] font-semibold text-deep mb-1.5">Phone</label>
                  <input id="phone" type="tel" autoComplete="tel" className={field} {...register("phone")} data-testid="input-phone" />
                  {err(errors.phone?.message)}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="interest" className="block text-[14px] font-semibold text-deep mb-1.5">I am interested in *</label>
                  <select id="interest" className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23468B34%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_1rem_center] pr-10`} {...register("interest")} data-testid="select-interest">
                    {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                  {err(errors.interest?.message)}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-[14px] font-semibold text-deep mb-1.5">Message *</label>
                  <textarea id="message" rows={5} className={`${field} resize-y`} aria-invalid={!!errors.message} {...register("message")} data-testid="input-message" />
                  {err(errors.message?.message)}
                </div>
                {mutation.isError && (
                  <div role="alert" className="sm:col-span-2 flex gap-3 items-start rounded-xl bg-[#fdecea] text-[#8c1d18] p-4 text-[15px]" data-testid="status-enquiry-error">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden />
                    <span>Sorry, we could not send your enquiry just now. Please check your connection and try again.</span>
                  </div>
                )}
                <div className="sm:col-span-2" data-dock-avoid>
                  <RainbowButton type="submit" size="lg" disabled={mutation.isPending} className="w-full sm:w-auto" data-testid="button-send-enquiry">
                    {mutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden /> Sending...</> : <>Send Enquiry <Send className="w-4 h-4" aria-hidden /></>}
                  </RainbowButton>
                </div>
              </form>
            )}
          </Reveal>
          <Reveal delay={100} className="space-y-5">
            <div className="card p-7">
              <ul className="space-y-5">
                <li className="flex gap-4"><span className="w-11 h-11 neu-in rounded-full! text-brand grid place-items-center shrink-0"><Mail className="w-5 h-5" strokeWidth={1.75} aria-hidden /></span><span><span className="block text-[13px] text-body">Email</span><a href={`mailto:${CONTACT.email}`} className="break-all font-semibold text-deep underline decoration-lime underline-offset-4 hover:text-brand" data-testid="link-contact-email">{CONTACT.email}</a></span></li>
                                <li className="flex gap-4"><span className="w-11 h-11 neu-in rounded-full! text-brand grid place-items-center shrink-0"><MapPin className="w-5 h-5" strokeWidth={1.75} aria-hidden /></span><span><span className="block text-[13px] text-body">Address</span><address className="font-semibold not-italic text-deep">{CONTACT.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address></span></li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/80 flex flex-wrap gap-3">
                {SOCIALS.map(({ label, name, url, Icon, testid }) => (
                  <RainbowButton key={name} asChild variant="outline" size="sm"><a href={url} target="_blank" rel="noopener noreferrer" aria-label={`MYITRA on ${name}`} data-testid={`link-contact-${testid}`}>
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </a></RainbowButton>
                ))}
              </div>
            </div>
            <div className="card p-3">
              <iframe title="Map showing INTI International College Subang" src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&output=embed`} className="w-full h-64 border-0 block rounded-[18px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
