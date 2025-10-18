import { useState } from "react";
import { useExpenses } from "./hooks/useExpense";
import ExpenseCard from "./components/ExpenseCard";
import ExpenseModal from "./components/ExpenseModal";
import SearchFilter from "./components/SearchFilter";
import ExpenseTable from "./components/ExpenseTable";

const App = () => {
  const { expenses, addExpense, updateExpense, deleteExpense, totalExpenses } =
    useExpenses();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [activeView, setActiveView] = useState("history");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  };

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
          <ExpenseCard total={totalExpenses} onAddExpense={handleAddExpense} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {activeView === "weekly"
                  ? "Weekly Expenses Overview"
                  : "Expense History"}
              </h2>
              {activeView === "weekly" && (
                <p className="text-sm text-gray-500">
                  Click card to view expense breakdown
                </p>
              )}
            </div>

            <div className="relative bg-gray-100 rounded-3xl p-1">
              <div
                className={`absolute top-1 bottom-1 gradient rounded-3xl transition-all duration-300 ease-in-out ${
                  activeView === "history"
                    ? "left-1 right-1/2"
                    : "left-1/2 right-1"
                }`}
              />

              <button
                onClick={() => setActiveView("history")}
                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 z-10 ${
                  activeView === "history"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Expense History
              </button>
              <button
                onClick={() => setActiveView("weekly")}
                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 z-10 ${
                  activeView === "weekly"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Weekly Overview
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {activeView === "history" && (
            <div className="mb-6">
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          )}

          {/* Expense List */}
          <ExpenseTable
            expenses={filteredExpenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
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
};

export default App;
