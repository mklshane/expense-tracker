import { use, useState } from "react";
import { useExpenses } from "./hooks/useExpense"
import ExpenseCard from "./components/ExpenseCard";

const App = () => {
  const { expenses, addExpense, updateExpense, deleteExpense, totalExpenses } = useExpenses();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
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
    </div>
  );
}

export default App