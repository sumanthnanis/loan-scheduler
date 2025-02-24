import React, { useState, useEffect } from 'react';
import AmortizationTable from './AmortizationTable';
import ChartComponent from './ChartComponent';
import './LoanRepaymentSchedule.css';

const LoanRepaymentSchedule = () => {
  const [disbursementDate, setDisbursementDate] = useState('');
  const [principal, setPrincipal] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [emiFrequency, setEmiFrequency] = useState('monthly');
  const [interestRate, setInterestRate] = useState(10);
  const [moratorium, setMoratorium] = useState(0);
  const [schedule, setSchedule] = useState([]);

  const calculateSchedule = () => {
    let freqFactor = 1;
    if (emiFrequency === 'quarterly') {
      freqFactor = 3;
    } else if (emiFrequency === 'yearly') {
      freqFactor = 12;
    }
    
    const totalPayments = Math.floor(tenure / freqFactor);
    const periodRate = (interestRate / 100) / (12 / freqFactor);

    const numerator = principal * periodRate * Math.pow(1 + periodRate, totalPayments);
    const denominator = Math.pow(1 + periodRate, totalPayments) - 1;
    const emi = denominator !== 0 ? numerator / denominator : principal / totalPayments;

    let remainingPrincipal = principal;
    let scheduleArray = [];
    let currentDate = new Date(disbursementDate);

    for (let i = 1; i <= totalPayments; i++) {
      currentDate.setMonth(currentDate.getMonth() + freqFactor);
      let interestPortion = remainingPrincipal * periodRate;
      let principalPortion = emi - interestPortion;

      if (i <= moratorium) {
        principalPortion = 0;
      }

      if (principalPortion > remainingPrincipal) {
        principalPortion = remainingPrincipal;
      }
      
      const payment = {
        paymentNumber: i,
        paymentDate: new Date(currentDate),
        emi: emi.toFixed(2),
        principalPortion: principalPortion.toFixed(2),
        interestPortion: interestPortion.toFixed(2),
        remainingPrincipal: (remainingPrincipal - principalPortion).toFixed(2)
      };

      scheduleArray.push(payment);
      remainingPrincipal -= principalPortion;
      if (remainingPrincipal <= 0) break;
    }

    setSchedule(scheduleArray);
  };

  useEffect(() => {
    if (disbursementDate) {
      calculateSchedule();
    }
  }, [disbursementDate, principal, tenure, emiFrequency, interestRate, moratorium]);

  return (
    <div className="loan-calculator">
      <div className="calculator-header">
        <h1>Loan Repayment Calculator</h1>
        <p>Plan your loan repayment schedule with precision</p>
      </div>

      <div className="calculator-card">
        <form onSubmit={(e) => { e.preventDefault(); calculateSchedule(); }}>
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">
                <span className="icon calendar-icon"></span>
                Disbursement Date
              </label>
              <input
                type="date"
                value={disbursementDate}
                onChange={(e) => setDisbursementDate(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <span className="icon dollar-icon"></span>
                Principal Amount
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                required
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <span className="icon clock-icon"></span>
                Tenure (months)
              </label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                required
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <span className="icon frequency-icon"></span>
                EMI Frequency
              </label>
              <select 
                value={emiFrequency}
                onChange={(e) => setEmiFrequency(e.target.value)}
                className="input-field"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">
                <span className="icon percent-icon"></span>
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                required
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <span className="icon pause-icon"></span>
                Moratorium Period (months)
              </label>
              <input
                type="number"
                value={moratorium}
                onChange={(e) => setMoratorium(Number(e.target.value))}
                className="input-field"
              />
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="calculate-button">
              Calculate Schedule
            </button>
          </div>
        </form>
      </div>

      {schedule.length > 0 && (
        <>
          <div className="calculator-card">
            <ChartComponent schedule={schedule} />
          </div>
          
          <div className="calculator-card">
            <AmortizationTable schedule={schedule} />
          </div>
          
          
        </>
      )}
    </div>
  );
};

export default LoanRepaymentSchedule;