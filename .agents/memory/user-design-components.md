---
name: User-supplied effect components and choices
description: Which pasted code components the user wants in the MYITRA site, and their decisions on how to adapt them
---
The user supplies UI effect code (pasted into attached_assets/) and wants each one used on the site with its original features kept, but restyled creatively. The whole site should look mostly neumorphic, keep green and white as the main colours, and run smoothly on phones and laptops.

User decisions (2026-11-03):
- Logo reveal: liquid-glass WebGL logo reveal.
- Landing images reveal: perspective tunnel hero. The user will upload more real photos for it. Until then, use only the existing 2 photos (no AI or stock people).
- Every button: the rainbow-button pattern, recoloured to greens and lime only (no rainbow).
- Main CTA: the earlier "Get Started" liquid-chrome shader button.
- Text reveal: Magic UI MorphingText.
- Site background: Magic UI DitherField.
- Dock: the user will re-send the code. Their uploads so far had the button code in its place. Do not invent a dock until it arrives.

**Why:** the user stated these choices directly.
**How to apply:** when new code arrives, slot it into this plan. Re-uploads are often duplicates with CRLF line endings, so compare files with `diff --strip-trailing-cr` before treating them as new.
