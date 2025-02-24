const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const ExcelJS = require('exceljs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use(cors());
app.use(bodyParser.json());

// Export as CSV
app.post('/export/csv', (req, res) => {
  const { schedule } = req.body;
  try {
    const parser = new Parser();
    const csv = parser.parse(schedule);
    res.header('Content-Type', 'text/csv');
    res.attachment('loan_schedule.csv');
    return res.send(csv);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// Export as PDF
app.post('/export/pdf', (req, res) => {
  const { schedule } = req.body;
  try {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=loan_schedule.pdf',
      }).end(pdfData);
    });

    doc.fontSize(18).text('Loan Repayment Schedule', { align: 'center' });
    doc.moveDown();

    schedule.forEach((payment) => {
      doc.fontSize(10)
         .text(
           `Payment #${payment.paymentNumber} - Date: ${new Date(payment.paymentDate).toLocaleDateString()} - EMI: ${payment.emi} - Principal: ${payment.principalPortion} - Interest: ${payment.interestPortion} - Remaining: ${payment.remainingPrincipal}`
         );
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// Export as Excel
app.post('/export/excel', async (req, res) => {
  const { schedule } = req.body;
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Loan Schedule');
    
    worksheet.columns = [
      { header: 'Payment #', key: 'paymentNumber', width: 10 },
      { header: 'Date', key: 'paymentDate', width: 15 },
      { header: 'EMI', key: 'emi', width: 10 },
      { header: 'Principal', key: 'principalPortion', width: 15 },
      { header: 'Interest', key: 'interestPortion', width: 15 },
      { header: 'Remaining Principal', key: 'remainingPrincipal', width: 20 }
    ];

    schedule.forEach(payment => {
      worksheet.addRow({
        paymentNumber: payment.paymentNumber,
        paymentDate: new Date(payment.paymentDate).toLocaleDateString(),
        emi: payment.emi,
        principalPortion: payment.principalPortion,
        interestPortion: payment.interestPortion,
       
        remainingPrincipal: payment.remainingPrincipal
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=loan_schedule.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {

    return res.status(500).send(err.message);
  }
});


app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});
