import React from 'react';
import axios from 'axios';

const AmortizationTable = ({ schedule }) => {
  const handleExport = async (type) => {
    try {
      const response = await axios.post(
        `/export/${type}`, 
        { schedule }, 
        { responseType: 'blob' }
      );
      // Create a blob link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `loan_schedule.${type === 'csv' ? 'csv' : type === 'pdf' ? 'pdf' : 'xlsx'}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Export error", error);
    }
  };
  return (
    <div className="amortization-table">
      <h3>Amortization Schedule</h3>
      <table>
        <thead>
          <tr>
            <th>Payment #</th>
            <th>Date</th>
            <th>EMI</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Remaining Principal</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((payment, index) => (
            <tr key={index}>
              <td>{payment.paymentNumber}</td>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td>{payment.emi}</td>
              <td>{payment.principalPortion}</td>
              <td>{payment.interestPortion}</td>
              <td>{payment.remainingPrincipal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="export-buttons">
      <h3>Export Options</h3>
      <button onClick={() => handleExport('csv')}>Export as CSV</button>
      <button onClick={() => handleExport('pdf')}>Export as PDF</button>
      <button onClick={() => handleExport('excel')}>Export as Excel</button>
      </div>
    </div>
  );
};

export default AmortizationTable;
