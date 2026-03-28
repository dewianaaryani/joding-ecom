import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: "youremail@gmail.com",
    subject: `New Client - ${body.plan}`,
    html: `
      <h2>New Pricing Request</h2>
      <p><b>Plan:</b> ${body.plan}</p>
      <p><b>Email:</b> ${body.email}</p>
      <p><b>WhatsApp:</b> ${body.whatsapp}</p>
      <p><b>Message:</b> ${body.message}</p>
    `,
  });

  return Response.json({ success: true });
}