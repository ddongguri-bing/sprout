import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";

type Props = {
  isAdmin?: boolean;
};

export default function PrivateLayout({ isAdmin }: Props) {
  const navigate = useNavigate();
  const isLogIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user || !loading) return;
    if (!isLogIn) {
      navigate("/");
      return;
    }
    if (isAdmin && user.role !== "SuperAdmin") {
      navigate("/");
      return;
    }
    setLoading(false);
  }, [isLogIn]);

  return <>{loading ? <Loading /> : <Outlet />}</>;
}
