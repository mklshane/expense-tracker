import { useState, useEffect } from "react";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // load expenses from localStorage on mount
  useEffect(() => {
    try {
      const savedExpenses = localStorage.getItem("expenses");
      if (savedExpenses) {
        const parsedExpenses = JSON.parse(savedExpenses);
        if (Array.isArray(parsedExpenses)) {
          setExpenses(parsedExpenses);
        }
      }
    } catch (error) {
      console.error("Error loading expenses from localStorage:", error);
      // If there's an error, start with empty array
      setExpenses([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // save expenses to localStorage 
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("expenses", JSON.stringify(expenses));
      } catch (error) {
        console.error("Error saving expenses to localStorage:", error);
      }
    }
  }, [expenses, isLoaded]);

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title: expense.title.trim(),
      description: expense.description?.trim() || "",
      amount: parseFloat(expense.amount),
      date: expense.date || new Date().toISOString().split("T")[0],
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              title: updatedExpense.title.trim(),
              description: updatedExpense.description?.trim() || "",
              amount: parseFloat(updatedExpense.amount),
              date: updatedExpense.date,
            }
          : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    totalExpenses,
    isLoaded,
  };
}