/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { atomIsAuthenticate, atomToken, atomUser } from "./atomState";
import { useAtom } from "jotai";
import { getFromLocalStorage, removeFromLocalStorage } from "./helpers";


export default function useAuthCheck() {

  // global
  const navigate = useNavigate();

  // states
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [token, setToken] = useAtom(atomToken);
  const [isAuthenticate, setIsAuthenticate] = useAtom(atomIsAuthenticate);
  const [user, setUser] = useAtom(atomUser);

  useEffect(() => {
    if (authChecked) return;

    const accessToken = getFromLocalStorage("token");
    // const _id = Cookies.get("_id");
    const headers = { Authorization: `Bearer ${accessToken}` };

    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);

      if (decodedToken.exp * 1000 < new Date().getTime()) {

        // atom sates
        setToken('');
        setIsAuthenticate(false);
        setUser(null);

        // local states
        setAuthChecked(true);
        setAuthenticated(true);

        // remove from storage
        removeFromLocalStorage('token');

        // navigate
        navigate('/login');
      } else {
        // Check if already authenticated
        if (!authenticated) {
          // Fetch user data from the server
          fetch(`${import.meta.env.VITE_BACKEND_URL}auth/profile`, { headers })
            .then((response) => response.json())
            .then((data) => {

              // set atom sates
              setUser(data.data);
              setIsAuthenticate(true);
              setToken(accessToken);

              // states which Mark as authenticated
              setAuthenticated(true);
            })
            .catch((error) => {
              console.error(error);

              // set atom sates
              setToken('');
              setIsAuthenticate(false);
              setUser(null);

              // remove from storage
              removeFromLocalStorage('token');
              navigate('/login');
            });
        }
        setAuthChecked(true);
      }
    } else {
      navigate('/login');
      setAuthChecked(true);
      setAuthenticated(true);
    }

    setAuthChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, authChecked, authenticated]);

  return authenticated;
}