"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

const DashboardPage = () => {
  useEffect(() => toast.remove(), []);

  return (
    <main className="flex flex-col">
      Dashboard page
    </main>
  );
}
export default DashboardPage;