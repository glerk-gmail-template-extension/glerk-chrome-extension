import { useEffect, useState } from "react";

import axios from "../../utils/axiosInstance";
import profileSrc from "../../assets/images/profile.png";

const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

export default function Popup() {
  const [user, setUser] = useState({
    username: "",
    profileUrl: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/v1/user");
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLoadImageError = () => {
    setUser({
      ...user,
      profileUrl: profileSrc,
    });
  };

  const handleLogoutClick = async () => {
    await axios.get("/v1/oauth/logout");
    window.location.reload();
  };

  const openWebPage = () => {
    window.open(`${CLIENT_URL}`, "_blank");
  };

  return (
    <div className="glerk-template w-60 p-4">
      {user ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <button
              className="font-roboto font-bold text-xl select-none cursor-pointer"
              onClick={openWebPage}
            >
              Glerk
            </button>
            <div>
              <button
                type="button"
                onClick={handleLogoutClick}
                className="text-primary bg-white border border-primary font-medium rounded-2xl text-sm px-3 py-1.5 hover:text-dark-primary hover:border-dark-primary"
              >
                로그아웃
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="me-4 shrink-0">
              <img
                className="w-9 h-9 rounded-full ml-2"
                src={user.profileUrl}
                onError={handleLoadImageError}
                alt="profile"
              />
            </div>
            <div>
              <p className="mb-1 text-base font-semibold leading-none text-gray-800">
                {user.username}
              </p>
              <p className="mb-3 text-sm font-normal text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <h1 className="font-roboto font-bold text-xl">Glerk</h1>
          <div>
            <button
              type="button"
              onClick={openWebPage}
              className="text-primary bg-white border border-primary font-medium rounded-2xl text-sm px-3 py-1.5 hover:text-dark-primary hover:border-dark-primary"
            >
              로그인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
