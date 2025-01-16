"use client";

import React from "react";

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export default function Login() {
  const [loginStatus, setLoginStatus] = React.useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://genialtx-x2-dev-lb-1910728596.ap-northeast-1.elb.amazonaws.com/auth/browser/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "admin@example.com",
            password: "adminpsd",
          }),
        }
      );

      const data: LoginResponse = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        setLoginStatus("Login successful!");
      } else {
        setLoginStatus(`Login failed: ${data.message}`);
      }
    } catch (error) {
      setLoginStatus(`Error: ${error}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Login
      </button>
      {loginStatus && (
        <p
          className={`text-sm ${
            loginStatus.includes("successful")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {loginStatus}
        </p>
      )}
    </div>
  );
}
