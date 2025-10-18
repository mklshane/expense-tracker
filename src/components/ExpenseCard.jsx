const ExpenseCard = ({total, onAddExpense}) => {
  // formats the total to always show two decimal places
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="relative gradient rounded-2xl p-8 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-gray-300 text-lg font-medium mb-3">
              Total Expenses
            </p>
            <p className="text-5xl sm:text-6xl font-bold text-white mb-2">
              ${formatNumber(total)}
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>
          
          {/* Add Expense Button - Visible on medium screens and up */}
          <button
            onClick={onAddExpense}
            className="absolute right-0 bottom-0 hidden sm:flex items-center gap-2 px-4 py-3 text-sm bg-white/20 backdrop-blur-sm rounded-3xl text-white font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-102 border border-white/20"
          >
            <svg
              className="w-3 h-3"
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
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard