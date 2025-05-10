// src/App.tsx
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      {/* This is where all your toasts will show up */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
      />
      <AppRoutes />
    </>
  );
}
