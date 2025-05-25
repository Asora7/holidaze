import { useAuth } from "../../auth/AuthContext";
import CustomerAccount from "./Customer";
import ManagerAccount from "./Manager";

export default function AccountPage() {
  const { user } = useAuth();
  if (!user) return null;

  return user.venueManager ? <ManagerAccount /> : <CustomerAccount />;
}
