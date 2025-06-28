import { useQuery } from "@tanstack/react-query";
import AuthHook from "../AuthHook/AuthHook";
import UseAxiosSecure from "../AxiosSecure/UseAxiosSecure";

const useUserRole = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = AuthHook(); // get user from Auth hook
  const email = user?.email;

  const { data: roleData, isLoading } = useQuery({
    queryKey: ["userRole", email],
    enabled: !!email, // run only when email is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${email}`);
      return res.data;
    },
  });

  return { role: roleData?.role, isLoading };
};

export default useUserRole;
