import React from "react";
import Dashsidebar from "../component/Dashsidebar";

function Entry() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Dashsidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-black mb-6">Entry Page</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Enter the details
          </h2>
          <form className="space-y-4">
            {/* Amount */}
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Amount:
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              />
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category:
              </label>
              <select
                id="category"
                name="category"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
              </select>
            </div>

            {/* Required Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="required"
                name="required"
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <label htmlFor="required" className="ml-2 text-sm font-medium text-gray-700">
                Required
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Entry;
