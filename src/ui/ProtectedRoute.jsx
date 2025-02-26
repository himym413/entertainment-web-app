import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/auth/useUser";

import Spinner from "../ui/Spinner";
import { useCreateProfile } from "../features/auth/useCreateProfile";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, fetchStatus } = useUser();
  const { checkAndCreateProfile, isCreating } = useCreateProfile();

  useEffect(
    function () {
      // if there is no user, show login page
      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
        navigate("/login");

      // if there is auth user, check if his profile exists
      // if there is no profile, create one
      checkAndCreateProfile();
    },
    [isAuthenticated, isLoading, fetchStatus, navigate],
  );

  // while loading, return spinner
  if (isLoading) return <Spinner />;

  // if there is a user, show app and check/create profile table row
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
