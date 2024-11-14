import  { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Login from "./Login"; // Ensure the Login component is correctly imported

// Export the CodePage component
export default function CodePage() {
  const [searchParams] = useSearchParams(); // Hook to access the query parameters
  const code = searchParams.get("code");
  const navigate = useNavigate(); // Use the navigate hook to programmatically navigate

  const getToken = async (code) => {
    try {
      const response = await fetch("http://157.245.204.196:8069/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: "4b4bedc312",
          client_secret: "4ce4daeb43572eb34ae3",
          code,
          grant_type: "authorization_code",
          redirect_uri:"http://localhost:3002/dashboard",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw new Error("Failed to obtain token");
    }
  };

  const getAccessToken = async (code) => {
    try {
      const res = await getToken(code);
      const accessToken = res.response.access_token;
      const refreshToken = res.response.refresh_token;
      localStorage.setItem("@access_sso_token", accessToken);
      localStorage.setItem("@refresh_sso_token", refreshToken);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) {
      getAccessToken(code);
    } else {
      navigate("/"); // Redirect to login if no code is present
    }
  }, [code]);

  return (
    <div>
      {/* <h1>Code from Query Param</h1>
      <p>Code: {code}</p> */}
      <Login /> {/* Render the Login component */}
    </div>
  );
}