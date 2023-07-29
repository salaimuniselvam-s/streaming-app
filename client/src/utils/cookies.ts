import Cookies from "js-cookie";

// Store access and refresh tokens as cookies
interface AuthCookies {
  accessToken: string;
  refreshToken: string;
}

export const setAuthCookies = ({
  accessToken,
  refreshToken,
}: AuthCookies): void => {
  Cookies.set("accessToken", accessToken, { expires: 1 });
  Cookies.set("refreshToken", refreshToken, { expires: 30 });
};

// Remove access and refresh tokens from cookies
export const removeAuthCookies = (): void => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

// Get access and refresh tokens from cookies
interface AuthCookiesResponse {
  accessToken?: string;
  refreshToken?: string;
}

export const getAuthCookies = (): AuthCookiesResponse => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  return { accessToken, refreshToken };
};

// Store username and role in localStorage
interface UserDetails {
  username: string;
  role: string;
}

export const setUserDetails = ({ username, role }: UserDetails): void => {
  localStorage.setItem("username", username);
  localStorage.setItem("role", role);
};

export const getUserDetails = (): UserDetails => {
  return {
    username: localStorage.getItem("username") || "",
    role: localStorage.getItem("role") || "",
  };
};

export const removeUserDetails = (): void => {
  localStorage.setItem("username", "");
  localStorage.setItem("role", "");
};
