import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/*
POST
/auth/login
*/

export async function loginService(
  payload
) {
    console.log(payload);
  try {
    const response =
      await axios.post(
        `${API}/auth/login`,
        {
          email:
            payload.email,

          password:
            payload.password,
        }
      );

    return {
      success: true,

      data:
        response.data,
    };
  } catch (error) {
    return {
      success: false,

      message:
        error?.response?.data
          ?.message ||
        error.message ||
        "Login failed",
    };
  }
}

export function saveToken(
  token
) {
  localStorage.setItem(
    "token",
    token
  );
}

export function getToken() {
  return localStorage.getItem(
    "token"
  );
}

export function logoutService() {
  localStorage.removeItem(
    "token"
  );
}

export function isAuthenticated() {
  return Boolean(
    getToken()
  );
}