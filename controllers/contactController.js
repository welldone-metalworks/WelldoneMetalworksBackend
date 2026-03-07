import { Resend } from "resend";

export const sendEnquiry = async (req, res) => {

  try {

    console.log("Enquiry API hit");
    console.log("Payload:", req.body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    // 1️⃣ Mail to Admin
    const adminMail = await resend.emails.send({
      from: "Website Enquiry <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry: ${subject}`,
      html: `
        <h2>New Contact Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    console.log("Admin mail response:", adminMail);

    // 2️⃣ Mail to Customer
    const customerMail = await resend.emails.send({
      from: "Support <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "We received your enquiry",
      html: `
        <h2>Hello ${name}</h2>
        <p>Thank you for contacting us.</p>
        <p>Our team will get back to you soon.</p>
      `
    });

    console.log("Customer mail response:", customerMail);

    res.status(200).json({
      success: true,
      message: "Enquiry sent successfully"
    });

  } catch (error) {

    console.log("RESEND ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};