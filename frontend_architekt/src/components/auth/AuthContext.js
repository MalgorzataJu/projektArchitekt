import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(() => {

    let userProfle = localStorage.getItem("jwt");

    if (userProfle) {
      return JSON.parse(userProfle);
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (payload) => {

    let apiResponse = await axios.post("http://localhost:3001/auth/login", payload, {
      withCredentials: true,
    });

    // if (apiResponse.data.isOk === false ) {
    //   setUser(null);
    // } else {
    localStorage.setItem("jwt", JSON.stringify(apiResponse.data));
    setUser(apiResponse.data);
    navigate("/");
    // }
  };

  const logout = async () => {
    await axios.get("http://localhost:3001/auth/logout",
        { withCredentials: true }
        );
    localStorage.removeItem("jwt");
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
