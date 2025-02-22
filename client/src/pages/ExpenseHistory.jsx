import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function ExpenseHistory() {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showChart, setShowChart] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  }

  async function fetchExpenses() {
    const today = new Date().toISOString().split("T")[0];

    if (!dateRange.startDate || !dateRange.endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    if (dateRange.startDate > dateRange.endDate) {
      setError("Start date cannot be after end date.");
      return;
    }

    setLoading(true);
    setError("");
    setShowChart(false); // Hide chart initially

    try {
      const res = await fetch("/api/form/allDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(dateRange),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await res.json();
      setExpenses(data);
      setTimeout(() => setShowChart(true), 300); // Delay chart appearance for smooth transition
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Process data for the chart
  const expenseData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = Object.keys(expenseData).map((date) => ({
    date,
    totalAmount: expenseData[date],
  }));

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto mt-10">
      {/* Left: Form */}
      <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Expense History</h2>

        {/* Date Range Inputs */}
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleChange}
              className="border rounded p-2"
              // max={dateRange.endDate || new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleChange}
              className="border rounded p-2"
              min={dateRange.startDate}
              // max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {/* Fetch Button */}
        <button
          onClick={fetchExpenses}
          className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-900 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Expenses"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Expense List with Animation */}
        {expenses.length > 0 && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold">Expenses:</h3>
            <ul className="mt-2 space-y-3">
              {expenses.map((expense) => (
                <motion.li
                  key={expense._id}
                  className="p-4 border rounded-lg bg-gray-50 shadow-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">₹{expense.amount}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{expense.description}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Category: <span className="font-semibold">{expense.category}</span>
                  </p>
                  <p
                    className={`mt-2 px-2 py-1 text-xs font-semibold rounded ${
                      !expense.tracker ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}
                  >
                    {!expense.tracker ? "Required Expense" : "Leisure Expense"}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Right: Recharts Visualization with Conditional Rendering */}
      {showChart && (
        <motion.div
          className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/2 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-4">Daily Expense Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalAmount" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
}

export default ExpenseHistory;
