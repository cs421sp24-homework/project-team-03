import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import useMutationUser from '@/hooks/use-mutations-users';

export const VerifyEmailDialog = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const { toast } = useToast();
  const { verifyUser } = useMutationUser();


  const clearFields = () => {
    setEmail("");
    setToken("");
  };

  const handleSave = async () => {
    if (!email || !token) {
      toast({
        variant: "destructive",
        title: "Empty fields",
        description: `Please enter the required information to register.`,
      });
      return;
    }

   verifyUser(email, token);

    clearFields();
  };

  const handleCancel = () => {
    clearFields();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id="verify-email-dialog" aria-label={"Click to verify email"} variant="outline">
          Verify Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Verify Email</DialogTitle>
          <DialogDescription>
            Please complete this form to verify your email.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="token" className="text-right">
              Token
            </Label>
            <Input
              id="token"
              type="token"
              value={token}
              className="col-span-3"
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button id ="save" type="submit" onClick={handleSave}>
              Verify
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
