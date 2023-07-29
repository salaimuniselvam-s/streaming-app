import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthCookies, getUserDetails } from "../utils/cookies";
import { JSX } from "react/jsx-runtime";

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return function Wrapper(props: JSX.IntrinsicAttributes & T) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = getAuthCookies().accessToken;

      if (!token || !getUserDetails().role || !getUserDetails().username) {
        navigate("/");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
}
