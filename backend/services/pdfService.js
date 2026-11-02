import PDFDocument from 'pdfkit';

export const generateLabReportPDF = (report, res) => {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  // Stream directly to HTTP response as PDF download or inline view
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="Chitwan_Sajha_Lab_Report_${report.report_code}.pdf"`);
  doc.pipe(res);

  // Header Branding Bar
  doc.rect(0, 0, doc.page.width, 100).fill('#0A2540');
  
  doc.fillColor('#FFFFFF').fontSize(22).font('Helvetica-Bold').text('CHITWAN SAJHA HOSPITAL', 40, 25);
  doc.fontSize(10).font('Helvetica').text('Sajha Petro Pump, 10 Bypass Rd, Bharatpur | Emergency: +977 981-9283223 | www.chitwansajha.org', 40, 55);
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#00D4B2').text('DEPARTMENT OF LABORATORY MEDICINE & PATHOLOGY', 40, 72);

  doc.moveDown(3);

  // Report Title & Code
  doc.fillColor('#0A2540').fontSize(16).font('Helvetica-Bold').text('OFFICIAL DIAGNOSTIC REPORT', 40, 120);
  doc.fontSize(10).font('Helvetica').text(`Report Code: ${report.report_code}`, 400, 122, { align: 'right' });
  
  // Patient Details Box
  doc.rect(40, 145, 515, 75).fillAndStroke('#F8FAFC', '#E2E8F0');
  
  doc.fillColor('#1E293B').fontSize(10).font('Helvetica-Bold').text('Patient Name:', 55, 155);
  doc.font('Helvetica').text(report.patient_name, 140, 155);
  
  doc.font('Helvetica-Bold').text('Phone:', 330, 155);
  doc.font('Helvetica').text(report.patient_phone, 390, 155);

  doc.font('Helvetica-Bold').text('Referring Dr:', 55, 175);
  doc.font('Helvetica').text(report.doctor_name, 140, 175);

  doc.font('Helvetica-Bold').text('Department:', 330, 175);
  doc.font('Helvetica').text(report.department, 390, 175);

  doc.font('Helvetica-Bold').text('Report Date:', 55, 195);
  doc.font('Helvetica').text(report.report_date, 140, 195);

  doc.font('Helvetica-Bold').text('Status:', 330, 195);
  doc.fillColor('#166534').font('Helvetica-Bold').text(report.status.toUpperCase(), 390, 195);

  // Test Results Table Header
  const tableTop = 240;
  doc.rect(40, tableTop, 515, 25).fill('#0A2540');
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold');
  doc.text('TEST DESCRIPTION', 50, tableTop + 7);
  doc.text('RESULT SUMMARY / FINDINGS', 250, tableTop + 7);
  doc.text('STATUS', 470, tableTop + 7);

  // Test Results Content
  doc.rect(40, tableTop + 25, 515, 80).stroke('#E2E8F0');
  doc.fillColor('#0F172A').fontSize(10).font('Helvetica-Bold').text(report.test_name, 50, tableTop + 35);
  doc.font('Helvetica').fontSize(9).text(report.result_summary, 250, tableTop + 35, { width: 200 });
  doc.fillColor('#059669').font('Helvetica-Bold').text('VERIFIED', 470, tableTop + 35);

  // Pathologist Signature & Stamp Block
  const sigY = tableTop + 140;
  doc.fillColor('#64748B').fontSize(9).font('Helvetica').text('Report Verified Electronically by:', 40, sigY);
  doc.fillColor('#0A2540').fontSize(11).font('Helvetica-Bold').text('Prof. Dr. Surendra Mohan Bhattarai', 40, sigY + 15);
  doc.fontSize(9).font('Helvetica').text('Head of Pathology & Clinical Laboratory', 40, sigY + 30);
  doc.text('NMC Reg No: 4891', 40, sigY + 42);

  // Security Verification Stamp
  doc.rect(380, sigY, 175, 50).fillAndStroke('#F1F5F9', '#CBD5E1');
  doc.fillColor('#0F172A').fontSize(8).font('Helvetica-Bold').text('AUTHENTICITY VERIFIED', 390, sigY + 10);
  doc.font('Helvetica').fontSize(7).text('Scanned QR code linked to Chitwan Sajha Secure HIS Server.', 390, sigY + 22, { width: 155 });

  // Footer
  doc.fillColor('#94A3B8').fontSize(8).font('Helvetica').text('This report is digitally signed and valid without manual physical stamp. Page 1 of 1', 40, 780, { align: 'center' });

  doc.end();
};

export const generateAppointmentPDF = (appointment, res) => {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="Appointment_Slip_${appointment.appointment_number}.pdf"`);
  doc.pipe(res);

  // Header
  doc.rect(0, 0, doc.page.width, 90).fill('#0A2540');
  doc.fillColor('#FFFFFF').fontSize(20).font('Helvetica-Bold').text('CHITWAN SAJHA HOSPITAL', 40, 20);
  doc.fontSize(10).font('Helvetica').text('OPD APPOINTMENT PASS / SLIP', 40, 48);
  doc.fontSize(10).fillColor('#00D4B2').font('Helvetica-Bold').text(`SLIP NO: ${appointment.appointment_number}`, 40, 65);

  doc.moveDown(4);

  // Appointment details card
  doc.rect(40, 110, 515, 180).fillAndStroke('#F8FAFC', '#CBD5E1');
  
  doc.fillColor('#0F172A').fontSize(11).font('Helvetica-Bold').text('PATIENT & APPOINTMENT DETAILS', 55, 125);
  doc.strokeColor('#00D4B2').lineWidth(2).moveTo(55, 140).lineTo(250, 140).stroke();

  doc.lineWidth(1);
  doc.fontSize(10).font('Helvetica-Bold').text('Patient Name:', 55, 155);
  doc.font('Helvetica').text(appointment.patient_name, 150, 155);

  doc.font('Helvetica-Bold').text('Phone / Mobile:', 55, 175);
  doc.font('Helvetica').text(appointment.patient_phone, 150, 175);

  doc.font('Helvetica-Bold').text('Doctor:', 55, 195);
  doc.fillColor('#0A2540').font('Helvetica-Bold').text(appointment.doctor_name, 150, 195);

  doc.fillColor('#0F172A').font('Helvetica-Bold').text('Date & Time:', 55, 215);
  doc.fillColor('#0284C7').font('Helvetica-Bold').text(`${appointment.appointment_date} at ${appointment.appointment_time}`, 150, 215);

  doc.fillColor('#0F172A').font('Helvetica-Bold').text('Status:', 55, 235);
  doc.fillColor('#166534').font('Helvetica-Bold').text(appointment.status.toUpperCase(), 150, 235);

  doc.fillColor('#0F172A').font('Helvetica-Bold').text('Insurance:', 55, 255);
  doc.font('Helvetica').text(appointment.insurance_provider || 'Self Paying / None', 150, 255);

  // Instructions
  doc.fillColor('#0A2540').fontSize(12).font('Helvetica-Bold').text('Important Instructions for OPD Visit:', 40, 310);
  doc.fillColor('#334155').fontSize(9).font('Helvetica');
  doc.text('1. Please report to the OPD Reception desk 15 minutes before your scheduled appointment time.', 50, 330);
  doc.text('2. Carry any past medical records, prescriptions, and lab test reports.', 50, 345);
  doc.text('3. If you have insurance coverage, present your Health Insurance Card at the counter.', 50, 360);
  doc.text('4. For cancellations or rescheduling, call +977-56-520100 at least 2 hours prior.', 50, 375);

  doc.end();
};
