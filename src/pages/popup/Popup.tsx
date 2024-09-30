import { useEffect, useState } from "react";

import axios from "../../utils/axiosInstance";

import { User } from "../../types";

import profileSrc from "../../assets/images/profile.png";

const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

export default function Popup() {
  const [user, setUser] = useState<User | null>({
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
        console.error(error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLoadImageError = () => {
    if (user) {
      setUser({
        ...user,
        profileUrl: profileSrc,
      });
    }
  };

  const handleLogoutClick = async () => {
    await axios.get("/v1/oauth/logout");
    window.location.reload();
  };

  const openWebPage = () => {
    window.open(`${CLIENT_URL}`, "_blank");
  };

  return (
    <div className="p-4 glerk-template w-60">
      {user ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <button
              className="text-xl font-bold cursor-pointer select-none font-roboto"
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
                className="ml-2 rounded-full w-9 h-9"
                src={user.profileUrl}
                onError={handleLoadImageError}
                alt="profile"
              />
            </div>
            <div>
              <p className="mb-1 text-base font-semibold leading-none text-gray-800">
                {user.username}
              </p>
              <p className="mb-3 text-sm font-normal text-gray-500">{user.email}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold font-roboto">Glerk</h1>
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
