# Loan Repayment Scheduler

A full‐stack web application for generating loan repayment schedules with options to export the results in CSV, PDF, or Excel format. Built with **React** (frontend) and **Node.js/Express** (backend), this app provides a modern UI for entering loan details and viewing a dynamic amortization table and interactive charts.
# Deployed-Link:https://loan-scheduler-humblebee.onrender.com
## Table of Contents
1. [Features](#features)  
2. [Project Structure](#project-structure)  
3. [Tech Stack](#tech-stack)  
4. [Local Setup & Development](#local-setup--development)  
5. [Usage](#usage)  

---

## Features

- **Dynamic Loan Schedule Calculation:**  
  Enter disbursement date, principal amount, tenure, EMI frequency, interest rate, and moratorium period to automatically generate a detailed repayment schedule.

- **Amortization Table:**  
  View each payment’s breakdown of principal, interest, and remaining balance.

- **Interactive Charts:**  
  Visualize principal vs. interest payments over time.

- **Export Options:**  
  Download the schedule as **CSV**, **PDF**, or **Excel**.



---

## Project Structure

```
loan-scheduler/
├── client/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── index.css
│       ├── App.js
│       └── components/
│           ├── LoanRepaymentSchedule.js
│           ├── AmortizationTable.js
│           ├── ChartComponent.js
│          
└── server/
    ├── package.json
    └── index.js

```

- **client/**: Contains the React app (Created via Vite).  
- **server/**: Contains the Node/Express backend. This also exports CSV/PDF/Excel files and serves the built React static files.

---

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express  
- **Libraries:**  
  - [pdfkit](https://github.com/foliojs/pdfkit) for PDF generation  
  - [json2csv](https://www.npmjs.com/package/json2csv) for CSV exports  
  - [exceljs](https://www.npmjs.com/package/exceljs) for Excel exports  

---

## Local Setup & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/loan-scheduler.git
   cd loan-scheduler
   ```

2. **Install dependencies**:

   - **Frontend** (React):
     ```bash
     cd client
     npm install
     ```
   - **Backend** (Express):
     ```bash
     cd ../server
     npm install
     ```

3. **Build the React app** (generates the production build in `client/dist`):
   ```bash
   cd ../client
   npm run build
   ```
   This command compiles the React code into static files (HTML, JS, CSS) inside `client/dist`.

4. **Run the server**:
   ```bash
   cd ../server
   node index.js
   ```
   The server should log something like:  
   ```
   Server running on port 5000
   ```
   Visit [http://localhost:5000](http://localhost:5000) in your browser to see the app.



## Usage

1. **Navigate** to the deployed URL or [http://localhost:5000](http://localhost:5000) if running locally.
2. **Enter** loan details:
   - Disbursement date  
   - Principal amount  
   - Tenure (months)  
   - EMI frequency (monthly, quarterly, yearly)  
   - Annual interest rate  
   - Moratorium period (months)
3. **Generate Schedule**: The tool will calculate your EMI and display a detailed repayment schedule, including a chart.
4. **Export**: Download the schedule in CSV, PDF, or Excel format for offline reference or sharing.
---




### Enjoy Using the Loan Repayment Scheduler!
