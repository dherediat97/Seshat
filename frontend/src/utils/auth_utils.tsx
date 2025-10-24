import { jwtDecode } from "jwt-decode";

function isTokenExpired(token: string) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);

    if (!decoded || typeof decoded.exp !== "number") {
      return true;
    }

    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (error) {
    return true;
  }
}

export default isTokenExpired;