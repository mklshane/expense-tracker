import { useState } from "react";

export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const addExpense = (expense) => {
        const newExpense = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          title: expense.title.trim(),
          description: expense.description?.trim() || "",
          amount: parseFloat(expense.amount),
          date: expense.date || new Date().toISOString().split("T")[0],
        };
        setExpenses((prev) => [newExpense, ...prev])
    }

    






}