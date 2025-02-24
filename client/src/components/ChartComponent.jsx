import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ChartComponent = ({ schedule }) => {
  const labels = schedule.map(payment => `#${payment.paymentNumber}`);
  const principalData = schedule.map(payment => parseFloat(payment.principalPortion));
  const interestData = schedule.map(payment => parseFloat(payment.interestPortion));

  const data = {
    labels,
    datasets: [
      {
        label: 'Principal Paid',
        data: principalData,
        borderColor: '#36b37e',
        backgroundColor: 'rgba(54, 179, 126, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Interest Paid',
        data: interestData,
        borderColor: '#ff5630',
        backgroundColor: 'rgba(255, 86, 48, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: {
        ticks: { color: '#172b4d' },
      },
      y: {
        ticks: { color: '#172b4d' },
      },
    },
  };

  return (
    <div className="chart-component">
      <h3>Payment Breakdown</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
