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
          // migrate old data: convert tags from string to array if needed
          const migratedExpenses = parsedExpenses.map((expense) => ({
            ...expense,
            tags: migrateTags(expense.tags),
          }));
          setExpenses(migratedExpenses);
        }
      }
    } catch (error) {
      console.error("Error loading expenses from localStorage:", error);

      setExpenses([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // helper function to migrate tags from string to array
  const migrateTags = (tags) => {
    if (Array.isArray(tags)) {
      return tags;
    }
    if (typeof tags === "string" && tags.trim()) {
      // convert comma-separated string to array, or create array from single string
      return tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
    }
    return [];
  };

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
      description: expense.description.trim(),
      tags: expense.tags || [],
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
              description: updatedExpense.description.trim(),
              tags: updatedExpense.tags || [],
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
};
