import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthCookies, getUserDetails } from "../utils/cookies";
import { JSX } from "react/jsx-runtime";
import CustomerHome from "../pages/CustomerHome";

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return function Wrapper(props: JSX.IntrinsicAttributes & T) {
    const navigate = useNavigate();

    useEffect(() => {
      // protecting home page route from unauthorized users
      const token = getAuthCookies().accessToken;
      if (!token || !getUserDetails().role || !getUserDetails().username) {
        navigate("/");
      }
    }, [navigate]);

    // Return HomePage Based on the Admin or Customer
    if (!(getUserDetails().role === "admin"))
      return <CustomerHome {...props} />;

    return <WrappedComponent {...props} />;
  };
}
