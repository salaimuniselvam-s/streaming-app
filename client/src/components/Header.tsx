import Logo from "../assets/codiis.png";
import Avatar from "../assets/avatar.png";
import { Dropdown } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

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
    <header className="fixed z-50 w-screen max-w-1600 mx-auto py-3 px-4 md:py-6 md:px-16 bg-primary flex justify-between">
      <img src={Logo} className="w-24 h-8 inline-block" alt="logo" />
      <UserDetails />
    </header>
  );
};

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname === "/home";
  const username = getUserDetails().username;
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
      label: <p className="font-semibold min-w-80">{username}</p>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          onClick={() => mutateAsync()}
          className="px-3 py-1 rounded-lg bg-red-600 text-white"
        >
          Logout
        </button>
      ),
      key: "1",
    },
  ];

  if (!location || !username) return null;

  return (
    <Dropdown menu={{ items }}>
      <img
        src={Avatar}
        className="w-10 drop-shadow-xl rounded-full cursor-pointer"
        alt="userprofile"
      />
    </Dropdown>
  );
};

export default Header;
