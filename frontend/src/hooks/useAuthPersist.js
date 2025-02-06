import { LOGIN } from "@/constants/actionTypes";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useAuthPersist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [localUser, setLocalUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setLocalUser(parsedProfile.user);
      dispatch({ type: LOGIN, payload: parsedProfile });
    }
    setIsLoading(false);
  }, [dispatch]);

  return { isLoading, localUser };
};
