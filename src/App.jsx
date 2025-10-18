import { useState } from "react";
import { useExpenses } from "./hooks/useExpense"
import ExpenseCard from "./components/ExpenseCard";
import ExpenseModal from "./components/ExpenseModal";

const App = () => {
  const { expenses, addExpense, updateExpense, deleteExpense, totalExpenses } = useExpenses();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

   const handleEdit = (expense) => {
     setEditingExpense(expense);
   };

   const handleDelete = (id) => {
     if (window.confirm("Are you sure you want to delete this expense?")) {
       deleteExpense(id);
     }
   };

   const handleSaveExpense = (expenseData) => {
     if (editingExpense) {
       updateExpense(editingExpense.id, expenseData);
       setEditingExpense(null);
     } else {
       addExpense(expenseData);
       setIsAddModalOpen(false);
     }
   };

  const handleAddExpense = () => {
    setIsAddModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8 ml-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Expense Tracker
          </h1>
          <p className="text-gray-600">Manage expenses efficiently</p>
        </div>

        {/* Expenses Card */}
        <div className="mb-8">
          <ExpenseCard total={totalExpenses} />
        </div>
      </main>

      {/* Add Expense FAB */}
      <button
        onClick={handleAddExpense}
        className="sm:hidden fixed bottom-6 right-6 w-16 h-16 bg-purple-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-105 z-50"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Modals */}
      {isAddModalOpen && (
        <ExpenseModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveExpense}
        />
      )}

      {editingExpense && (
        <ExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={handleSaveExpense}
        />
      )}
    </div>
  );
}

export default App