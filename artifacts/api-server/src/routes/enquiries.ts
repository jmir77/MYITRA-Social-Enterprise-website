import { Router, type IRouter } from "express";
import { CreateEnquiryBody, CreateEnquiryResponse } from "@workspace/api-zod";
import { db, enquiriesTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/enquiries", async (req, res) => {
  const parsed = CreateEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please check the form fields and try again." });
    return;
  }

  const { fullName, email, phone, interest, message } = parsed.data;
  const [row] = await db
    .insert(enquiriesTable)
    .values({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone?.trim() ? phone.trim() : null,
      interest,
      message: message.trim(),
    })
    .returning();

  req.log.info({ enquiryId: row.id, interest }, "Enquiry received");

  res.status(201).json(
    CreateEnquiryResponse.parse({
      ...row,
      createdAt: row.createdAt.toISOString(),
    }),
  );
});

export default router;
