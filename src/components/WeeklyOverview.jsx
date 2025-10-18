import { useState } from "react";

const WeeklyOverview = ({ expenses = [] }) => {
  const [expandedWeek, setExpandedWeek] = useState(null);

  // Groups expenses by week and aggregates totals
  const getWeeklyExpenses = () => {
    const weeklyData = {};

    if (Array.isArray(expenses)) {
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const weekNumber = getWeekNumber(date);
        const key = `${year}-W${weekNumber.toString().padStart(2, "0")}`;

        if (!weeklyData[key]) {
          weeklyData[key] = { total: 0, details: [] };
        }

        // Accumulate total and push expense into the week's list
        weeklyData[key].total += expense.amount;
        weeklyData[key].details.push(expense);
      });
    }

    // Convert the object to a sorted array format
    return (
      Object.entries(weeklyData)
        .map(([week, data]) => ({
          week,
          total: data.total,
          // Sort expenses inside each week by date (newest first)
          details: data.details.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          ),
        }))
        // Sort weeks in descending order (latest first)
        .sort((a, b) => b.week.localeCompare(a.week))
    );
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const weeklyExpenses = getWeeklyExpenses();

  // ✅ Instead of using maxExpense, use totalExpenses for proportional distribution
  const totalExpenses = weeklyExpenses.reduce(
    (sum, week) => sum + week.total,
    0
  );

  const toggleWeek = (week) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div>
      {weeklyExpenses.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <p className="text-gray-500">No expense data available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {weeklyExpenses.map(({ week, total, details }) => (
            <div
              key={week}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div
                className="bg-gray-50 p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => toggleWeek(week)}
              >
                <div className="hidden sm:flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Week {week}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {details.length} expense
                      {details.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-br from-gray-900 via-indigo-600 to-purple-900 h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            totalExpenses > 0
                              ? (total / totalExpenses) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="font-bold text-gray-900 text-lg min-w-20 text-right">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <div className="sm:hidden flex flex-col space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Week {week}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {details.length} expense
                        {details.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="gradient h-2.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          totalExpenses > 0 ? (total / totalExpenses) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {expandedWeek === week && (
                <div className="border-t border-gray-200 bg-white">
                  <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                    {details.map((expense, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {expense.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(expense.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(expense.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyOverview;
