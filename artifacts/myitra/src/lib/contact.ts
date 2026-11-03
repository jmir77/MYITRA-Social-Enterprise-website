import { SiInstagram, SiWhatsapp } from "react-icons/si";

/* Single source for contact details and social links. */
export const CONTACT = {
  email: "myitra.socialenterprise@gmail.com",
  addressLines: [
    "Level 9, Room 7",
    "INTI International College Subang",
    "3, Jalan SS 15/8,",
    "47500 Subang Jaya,",
    "Selangor, Malaysia.",
  ],
  mapQuery: "INTI International College Subang, 3 Jalan SS 15/8, 47500 Subang Jaya",
};

export const SOCIALS = [
  { name: "Instagram", label: "@myitra.socialenterprise", url: "https://www.instagram.com/myitra.socialenterprise", Icon: SiInstagram, testid: "instagram" },
  { name: "WhatsApp community", label: "WhatsApp community", url: "https://chat.whatsapp.com/HTIeX6zno0gH391dmeetE5", Icon: SiWhatsapp, testid: "whatsapp" },
] as const;
