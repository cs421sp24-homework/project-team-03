import { useStore } from "@/lib/store";
import { LogoutDialog } from "./auth/logout-dialog";
import { LoginDialog } from "./auth/login-dialog";
import { RegisterDialog } from "./auth/register-dialog";
const Aside = () => {
  const user = useStore((state) => state.user);
  return (
    <div className="flex flex-col gap-2 p-4">
      {user ? <LogoutDialog /> : <LoginDialog />}
      {!user && <RegisterDialog />}
    </div>
  );
};

export default Aside;
