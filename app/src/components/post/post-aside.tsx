import { LoginDialog } from "@/auth/login-dialog";
import { LogoutDialog } from "@/auth/logout-dialog";
import { RegisterDialog } from "@/auth/register-dialog";
import { useStore } from "@/lib/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "../ui/button";

const PostAside = () => {
  const user = useStore((state) => state.user);
  const [dropdownState, setDropdownState] = useState(false);

  return (
    <><DropdownMenu open={dropdownState} onOpenChange={setDropdownState}>

        <DropdownMenuTrigger asChild>
          <Button id="user-actions" variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted" >
            <HamburgerMenuIcon className="w-5 h-5" />
            <span className="sr-only">Open menu</span>
          </Button> 
        </DropdownMenuTrigger>

        <DropdownMenuContent>
        <div className="flex flex-col gap-2 p-4">
              {user ? <LogoutDialog /> : <LoginDialog />}
              {!user && <RegisterDialog />}
          </div>

        </DropdownMenuContent>
      </DropdownMenu>
      </>
  );
};

export default PostAside;
