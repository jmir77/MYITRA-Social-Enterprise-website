import { useEffect } from "react";
import type { EnquiryInterest } from "@workspace/api-client-react";

export const img = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;

const ANCHOR_KEY = "myitra:anchor";
const INTEREST_KEY = "myitra:interest";
export const INTEREST_EVENT = "myitra:interest";

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

export function queueAnchor(id: string) {
  sessionStorage.setItem(ANCHOR_KEY, id);
}

export function consumeAnchor(): string | null {
  const v = sessionStorage.getItem(ANCHOR_KEY);
  sessionStorage.removeItem(ANCHOR_KEY);
  return v;
}

export function setPendingInterest(i: EnquiryInterest) {
  sessionStorage.setItem(INTEREST_KEY, i);
  window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: i }));
}

export function consumeInterest(): EnquiryInterest | null {
  const v = sessionStorage.getItem(INTEREST_KEY) as EnquiryInterest | null;
  sessionStorage.removeItem(INTEREST_KEY);
  return v;
}

export function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", description);
  }, [title, description]);
}
