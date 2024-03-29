import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {apiUrl} from "../../config/api";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(() => {

    let userProfle = localStorage.getItem("jwt");

    if (userProfle) {
      console.log(userProfle)
      return JSON.parse(userProfle);
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (payload) => {

    let apiResponse = await axios.post(`${apiUrl}/auth/login`, payload, {
      withCredentials: true,
    });

    if (apiResponse.data.isOk === false ) {
      setUser(null);
    } else {
    localStorage.setItem("jwt", JSON.stringify(apiResponse.data));
    setUser(apiResponse.data);
    navigate("/");
    }
  };

  const logout = async () => {

    localStorage.removeItem("jwt");

    await axios.get(`${apiUrl}/auth/logout`,
        { withCredentials: true }
        );
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
