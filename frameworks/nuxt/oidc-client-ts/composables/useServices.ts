import AuthService from "@/services/auth-service";
import ApplicationService from "@/services/application-service";
import { useAuth } from "@/stores/auth";

export const useServices = () => {
  const authStore = useAuth();

  return {
    $auth: new AuthService(),
    $application: new ApplicationService(authStore.access_token),
  };
};
