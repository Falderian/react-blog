import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/store/store";

export function isAuthorizedMiddleware(WrappedComponent: React.ComponentType) {
  const ComponentWithAuth = () => {
    const { authorized } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
      console.log(authorized);
      if (!authorized) {
        router.push("/login");
      }
    }, [authorized]);

    return authorized ? <WrappedComponent /> : null;
  };

  return ComponentWithAuth;
}
