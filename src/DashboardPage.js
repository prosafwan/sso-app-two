import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Dashboard Component
const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use the navigate hook to programmatically navigate

  // Fetch user data using access token
  const getUserById = async () => {
    try {
      const accessToken = localStorage.getItem("@access_sso_token");

      if (!accessToken) {
        // Redirect to CodePage if there's no token
        navigate("/");
        return;
      }

      // Decode the access token to get the UserID
      const decoded = jwtDecode(accessToken);
      const userId = decoded?.UserID;

      if (!userId) {
        throw new Error("UserID not found in token");
      }

      // Fetch user data from the API
      const response = await fetch(
        `http://157.245.204.196:8069/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setUserData(data.data); // Store the fetched user data
    } catch (error) {
      setError(error.message); // Store error message if any
    } finally {
      setLoading(false); // Stop the loading state after fetch completes
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    getUserById();
  }, []);

  function handleLogout() {
    navigate("/");
    localStorage.removeItem("@access_sso_token");
    localStorage.removeItem("@refresh_sso_token");
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-heading">Dashboard</h2>

        {/* Loading State */}
        {loading && <div className="loader">Loading...</div>}

        {/* Error State */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* User Info Display */}
        {userData && (
          <div className="user-info">
            <h3 className="user-info-heading">User Information</h3>
            <ul>
              <li>
                <strong>User ID:</strong> {userData.id}
              </li>
              <li>
                <strong>User Owner:</strong> {userData.owner}
              </li>
              <li>
                <strong>Owner Name:</strong> {userData.name}
              </li>
              <li>
                <strong>Display Name:</strong> {userData.display_name}
              </li>
              <li>
                <strong>Email:</strong> {userData.email}
              </li>
              <li>
                <strong>Role:</strong> {userData.role}
              </li>
              <li>
                <strong>Type:</strong> {userData.type}
              </li>
              <li>
                <strong>Country Code:</strong> {userData.country_code}
              </li>
            </ul>
          </div>
        )}

        {/* Logout Button */}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
