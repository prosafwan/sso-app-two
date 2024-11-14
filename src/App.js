import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CodePage from "./Codepage";
import DashboardPage from "./DashboardPage";

function App() {
  const accessToken = localStorage.getItem("@access_sso_token");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={accessToken ? <Navigate to="/dashboard" /> : <CodePage />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
