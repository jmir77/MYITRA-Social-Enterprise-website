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

- 3D Kotak Cantik box (2026-11-03): the user wanted their reference image (attached_assets/Eco-Friendly_Personal_Care_Gift_Box_*.png) turned into 3D. The AI 3D generator returned 403 Forbidden for this account, so the box is built from code shapes laid out like that image. Labels still use the spec's quantities. If the generator works later, a generated model would be one solid piece: the lid wouldn't open and items couldn't be labelled separately.

**Why:** the user stated these choices directly.
**How to apply:** when new code arrives, slot it into this plan. Re-uploads are often duplicates with CRLF line endings, so compare files with `diff --strip-trailing-cr` before treating them as new.
