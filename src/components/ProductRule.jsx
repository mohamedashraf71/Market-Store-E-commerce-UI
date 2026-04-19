import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}