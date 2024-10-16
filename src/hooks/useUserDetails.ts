import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { shallowEqual } from "react-redux";
import { getUserDetails } from "@/lib/features/auth/authActions";
import { useGetUserDetailsQuery } from "@/lib/services/authService";

const useUserDetails = () => {
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state: any) => state.auth, shallowEqual);
  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);

  const { data, error, refetch } = useGetUserDetailsQuery("userDetails", {
    refetchOnMountOrArgChange: true,
    skip: !authState.token,
  });

  useEffect(() => {
    if (authState.token && data) {
      dispatch(getUserDetails());
    }
    if (error) {
      console.error("Error fetching user details: ", error);
    }
  }, [authState.token, data, dispatch, error]);

  return {
    data,
    error,
    isLoggedIn,
    refetch,
  };
};

export default useUserDetails;
