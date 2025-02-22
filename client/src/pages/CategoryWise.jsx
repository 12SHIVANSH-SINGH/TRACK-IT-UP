import React, { useState, useEffect } from "react";

function CategoryWise() {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [category, setCategory] = useState("");
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/form/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  }

  async function fetchCategoryExpenses() {
    const today = new Date().toISOString().split("T")[0];

    if (!dateRange.startDate || !dateRange.endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    if (dateRange.startDate > dateRange.endDate) {
      setError("Start date cannot be after end date.");
      return;
    }

    if (dateRange.endDate > today) {
      setError("End date cannot be in the future.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/form/categoryWiseExpenseTotal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...dateRange, category }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const { categoryTotals, detailedExpenses } = await res.json();
      setCategoryTotals(categoryTotals);
      setExpenses(detailedExpenses);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-10 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Category-Wise Expenses</h2>

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
            max={dateRange.endDate || new Date().toISOString().split("T")[0]}
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
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      {/* Category Selection */}
      <div className="mt-4">
  <label className="text-sm font-medium">Category (Optional)</label>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="border rounded p-2 w-full"
  >
    <option value="">All Categories</option>
    <option value="Food">Food</option>
    <option value="Transport">Transport</option>
    {categories.map((cat) =>
      cat !== "Food" && cat !== "Transport" ? (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ) : null
    )}
  </select>
</div>


      {/* Fetch Button */}
      <button
        onClick={fetchCategoryExpenses}
        className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-900 transition disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get Category Expenses"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Category Totals List */}
      {categoryTotals.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Category Totals:</h3>
          <ul className="mt-2 space-y-3">
            {categoryTotals.map((category) => (
              <li
                key={category._id}
                className="p-4 border rounded-lg bg-gray-50 shadow-md"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">₹{category.totalAmount}</span>
                  <span className="text-sm text-gray-500">{category._id}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Detailed Expenses */}
      {expenses.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Detailed Expenses:</h3>
          <ul className="mt-2 space-y-3">
            {expenses.map((expense) => (
              <li key={expense._id} className="p-4 border rounded-lg bg-gray-50 shadow-md">
                <div className="flex justify-between">
                  <span className="font-bold text-lg">₹{expense.amount}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{expense.description}</p>
                <p className="text-sm text-gray-600">
                  Category: <span className="font-semibold">{expense.category}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoryWise;
