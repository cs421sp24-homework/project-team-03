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

export const RegisterDialog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { toast } = useToast();
  const { registerUser } = useMutationUser();

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setAvatarUrl("");
  };

  const handleSave = async () => {
    if (!email || !password || !firstName || !lastName) {
      toast({
        variant: "destructive",
        title: "Sorry! Email, password, firstName, or lastName cannot be empty! 🙁",
        description: `Please enter the required information to register.`,
      });
      return;
    }

   registerUser(email, password, firstName, lastName, avatarUrl);

    clearFields();
  };

  const handleCancel = () => {
    clearFields();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id="register-dialog" aria-label={"Click to register"} variant="outline">
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Please complete this form to register.
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
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="col-span-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              value={firstName}
              className="col-span-3"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={lastName}
              className="col-span-3"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="avatarUrl" className="text-right">
              Avatar URL
            </Label>
            <Input
              id="avatarUrl"
              value={avatarUrl}
              className="col-span-3"
              onChange={(e) => setAvatarUrl(e.target.value)}
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
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
