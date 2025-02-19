import React from "react";
import Dashsidebar from "../component/Dashsidebar";

function Entry() {
  return (
    <div className="flex ">
      <Dashsidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-black mb-6">Entry Page</h1>
        <p className="text-gray-700">
          This is the Entry page. Add your content here.
        </p>
      </main>
    </div>
  );
}

export default Entry;