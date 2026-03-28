import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  try {
    await resend.emails.send({
from: "Dewiana <onboarding@resend.dev>", // ganti domain kamu nanti
      to: "dewianaaryanir@gmail.com",
      reply_to: body.email,
      subject: `New Project Inquiry - ${body.plan}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <p>Hello Dewiana,</p>

          <p>You just received a new project inquiry from your website.</p>

          <p><strong>Selected Plan:</strong> ${body.plan}</p>

          <hr style="margin: 16px 0;" />

          <p><strong>Client Details:</strong></p>
          <ul style="padding-left: 16px;">
            <li><strong>Email:</strong> ${body.email}</li>
            <li><strong>WhatsApp:</strong> ${body.whatsapp}</li>
          </ul>

          ${
            body.message
              ? `
          <p><strong>Message:</strong></p>
          <p style="background:#f5f5f5; padding:10px; border-radius:8px;">
            ${body.message}
          </p>
          `
              : ""
          }

          <hr style="margin: 16px 0;" />

          <p>You can reply directly to this email to respond to the client.</p>

          <p style="margin-top:20px;">
            Best regards,<br/>
            Your Portfolio System
          </p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false });
  }
}