import { useLocation } from "wouter";
import { useCallback } from "react";
import type { EnquiryInterest } from "@workspace/api-client-react";
import { queueAnchor, scrollToId, setPendingInterest } from "@/lib/site";

export function useGoTo() {
  const [location, setLocation] = useLocation();
  return useCallback(
    (anchor: string, interest?: EnquiryInterest) => {
      if (interest) setPendingInterest(interest);
      if (location === "/") {
        if (anchor === "top") window.scrollTo({ top: 0, behavior: "smooth" });
        else scrollToId(anchor);
      } else {
        queueAnchor(anchor);
        setLocation("/");
      }
    },
    [location, setLocation],
  );
}
