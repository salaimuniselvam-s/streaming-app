import Logo from "../assets/codiis.png";
import Avatar from "../assets/avatar.png";
import { Dropdown } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import type { MenuProps } from "antd";
import {
  getUserDetails,
  removeAuthCookies,
  removeUserDetails,
} from "../utils/cookies";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { logoutUser } from "../actions/auth";

const Header = () => {
  return (
    <header className="fixed h-24 z-50 w-screen max-w-1600 mx-auto py-3 px-4 md:py-6 md:px-16 bg-primary flex justify-between">
      <img src={Logo} className="w-24 h-8 inline-block" alt="logo" />
      <UserDetails />
    </header>
  );
};

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname === "/home";
  const { username, role } = getUserDetails();
  const { mutateAsync } = useMutation(logoutUser, {
    onSuccess() {
      removeUserDetails();
      removeAuthCookies();
      navigate("/");
    },
    onError(error) {
      const err = error as AxiosError;
      console.error(err);
      alert("logut failed.. please try again");
    },
  });

  const items: MenuProps["items"] = [
    {
      label: (
        <p className="flex gap-3 text-xl items-center min-w-80">
          <FaUserCircle size={32} />
          <span>
            <span className="font-semibold">{username}</span>
            <span className="text-sm block text-gray-500">{role}</span>
          </span>
        </p>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className="grid place-content-center">
          <button
            onClick={() => mutateAsync()}
            className="px-3 py-1 rounded-lg bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      ),
      key: "2",
    },
  ];

  // for showing user profile icon only after user logged in
  if (!location || !username) return null;

  return (
    <Dropdown menu={{ items }}>
      <img
        src={Avatar}
        className="w-12 h-12 first:drop-shadow-xl rounded-full cursor-pointer"
        alt="userprofile"
      />
    </Dropdown>
  );
};

export default Header;
