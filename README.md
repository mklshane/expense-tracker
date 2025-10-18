# Expense Tracker

A modern, mobile-first single-page application (SPA) for tracking and managing expenses. Users can add, edit, delete, and view expenses with weekly summaries and expandable breakdowns. Data is persisted using **localStorage**, so entries remain available on refresh.

---

## Features

* Add new expenses
* Edit and delete existing entries
* Persistent data using `localStorage`
* Weekly expense overview with collapsible breakdown
* Progress bars showing proportional weekly totals
* Mobile-first responsive UI

---

## Tech Stack

* **React (Vite)**
* **Tailwind CSS**
* **JavaScript (ES6+)**
* **LocalStorage**

---

## Getting Started

Follow these exact steps to run the app.

### Clone the Repository

```bash
git clone https://github.com/mklshane/expense-tracker.git
```

```bash
cd expense-tracker
```

### 🔹 Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

After running the command, Vite will show a local URL like:

```
http://localhost:5173
```

Open it in your browser to use the app.

---


## Project Structure

```
expense-tracker/
│
├── src/
│   ├── components/
│   │   ├── ExpenseCard.jsx
│   │   ├── ExpenseModal.jsx
│   │   ├── ExpenseTable.jsx
│   │   ├── SearchFilter.jsx
│   │   └── WeeklyOverview.jsx
│   ├── hooks/
│   │   └── useExpense.js
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## Notes for Reviewers 

* No backend or database setup is required.
* Data is stored in `localStorage`, so entries persist automatically.


