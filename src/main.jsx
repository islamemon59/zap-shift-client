import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router";
import AuthProvider from "./Context/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="urbanist max-w-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </div>
  </StrictMode>
);
