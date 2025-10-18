import { useState } from "react";

const ExpenseTable = ({ expenses }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return expenses.length === 0 ? (
    <div className="bg-gray-50 rounded-xl p-8 text-center">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">
        No expenses found
      </h3>
      <p className="text-gray-500 text-sm">
        Try adjusting your search terms or add a new expense
      </p>
    </div>
  ) : (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-300 transition-all duration-150 relative"
        >
          <div className="flex items-start justify-between">
            {/* Left side - Title and description */}
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {expense.title}
              </h3>
              {expense.description && (
                <p className="text-xs text-gray-600 truncate mt-0.5">
                  {expense.description}
                </p>
              )}
            </div>

            {/* Right side - Amount and date */}
            <div className="flex flex-col items-end text-right mr-6">
              <span className="text-xl font-bold text-black whitespace-nowrap">
                {formatCurrency(expense.amount)}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(expense.date)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTable;
