import { LoginDialog } from "@/auth/login-dialog";
import { LogoutDialog } from "@/auth/logout-dialog";
import { RegisterDialog } from "@/auth/register-dialog";
import { useStore } from "../lib/store";
//import { VerifyEmailDialog } from "@/auth/verify-email-dialog";

const Aside = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="flex flex-col gap-2 p-4">
      {user ? <LogoutDialog /> : <LoginDialog />}
      {!user && <RegisterDialog /> }
      {/*{!user && <VerifyEmailDialog />}*/}
    </div>
  );
};

export default Aside;
