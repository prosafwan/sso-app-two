import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleLogin = async (provider) => {
    try {
      setIsLoading(true);
      let url = "";
      if (provider === "piaccess") {
        url = `https://oidc.piaccess.vivasoftltd.com/oauth2/authorize?client_id=4b4bedc312&redirect_uri=http://localhost:3002&scope=email,roles&response_type=code&state=given_state`;
      } else if (provider === "google") {
        url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=http://localhost:3001&scope=email%20profile&response_type=code&state=given_state`;
      }
      window.location.href = url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Welcome to viva sso</h2>
          <p>Please log in to your account</p>
          <button
            onClick={() => handleLogin("piaccess")}
            disabled={isLoading}
            className="login-button piaccess-button"
          >
            <div className="button-content">
              {isLoading ? "Loading..." : "Sign In With Pi Access"}
            </div>
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            onClick={() => handleLogin("google")}
            disabled={isLoading}
            className="login-button google-button"
          >
            <div className="button-content">
              <svg
                className="google-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.9 0 7 1.3 9.2 3.7l6.9-6.9C36.7 2.9 30.8 0 24 0 14.7 0 7 5.8 3.6 13.9l7.6 5.9C13.6 14.7 18.4 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M24 47c5.9 0 10.8-1.9 14.4-5.1l-6.9-5.4c-2.1 1.4-4.8 2.4-7.5 2.4-6.3 0-11.7-4.3-13.6-10.2l-7.6 5.9C7.3 41.5 14.9 47 24 47z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.4 28.5C9.8 26.8 9.5 24.9 9.5 23c0-1.9.3-3.8.8-5.5l-7.6-5.9C.8 15.9 0 19.4 0 23c0 3.6.8 7.1 2.1 10.3l7.6-5.9z"
                />
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.9 0 7 1.3 9.2 3.7l6.9-6.9C36.7 2.9 30.8 0 24 0c-9.3 0-17 5.8-20.4 13.9l7.6 5.9C13.6 14.7 18.4 9.5 24 9.5z"
                />
              </svg>
              <span>{isLoading ? "Loading..." : "Sign In With Google"}</span>
            </div>
          </button>
        </div>

        <div className="image-section">
          {!isImageLoaded && <div className="image-loader">Loading image...</div>}
          <img
            src="https://picsum.photos/500/700"
            alt="Login Visual"
            onLoad={() => setIsImageLoaded(true)}
            style={{ display: isImageLoaded ? "block" : "none" }}
          />
        </div>
      </div>
    </div>
  );
}
