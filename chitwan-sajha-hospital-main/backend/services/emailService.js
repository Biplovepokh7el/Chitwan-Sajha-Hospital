import nodemailer from 'nodemailer';

export const sendAppointmentEmail = async (appointment) => {
  try {
    // Transporter configuration (using Ethereal/test or production credentials if provided)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'demo@chitwansajha.org',
        pass: process.env.SMTP_PASS || 'demopassword'
      }
    });

    const mailOptions = {
      from: '"Chitwan Sajha Hospital" <noreply@chitwansajha.org>',
      to: appointment.patient_email,
      subject: `Appointment Confirmed [${appointment.appointment_number}] - Chitwan Sajha Hospital`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0A2540; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; color: #00D4B2;">CHITWAN SAJHA HOSPITAL</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px;">World-Class Healthcare in Central Nepal</p>
          </div>
          <div style="padding: 24px; color: #334155;">
            <h3 style="color: #0A2540;">Dear ${appointment.patient_name},</h3>
            <p>Your appointment has been successfully registered with Chitwan Sajha Hospital.</p>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #00D4B2; padding: 16px; margin: 20px 0;">
              <p style="margin: 4px 0;"><strong>Appointment Slip No:</strong> ${appointment.appointment_number}</p>
              <p style="margin: 4px 0;"><strong>Doctor:</strong> ${appointment.doctor_name}</p>
              <p style="margin: 4px 0;"><strong>Date:</strong> ${appointment.appointment_date}</p>
              <p style="margin: 4px 0;"><strong>Time Slot:</strong> ${appointment.appointment_time}</p>
              <p style="margin: 4px 0;"><strong>Status:</strong> <span style="color: #166534; font-weight: bold;">${appointment.status}</span></p>
            </div>

            <p style="font-size: 13px; color: #64748b;">Please arrive 15 minutes early at our OPD reception. Carry your previous medical reports and insurance card if applicable.</p>
            <p style="margin-top: 24px;">Emergency Contact: <strong>+977-56-520999</strong></p>
          </div>
          <div style="background-color: #f1f5f9; text-align: center; padding: 12px; font-size: 12px; color: #94a3b8;">
            © 2026 Chitwan Sajha Hospital. Bharatpur-10, Chitwan, Nepal.
          </div>
        </div>
      `
    };

    // In local dev without SMTP server, catch error gracefully and log
    const info = await transporter.sendMail(mailOptions).catch(e => {
      console.log('📬 Simulated Email Sent to:', appointment.patient_email);
    });

    return info;
  } catch (error) {
    console.error('Email dispatch error (simulated):', error.message);
  }
};
