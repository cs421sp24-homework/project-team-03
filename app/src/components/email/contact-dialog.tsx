import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { useToast } from "../ui/use-toast"
import { incrementNotifications, sendEmail } from "@/lib/api"
import { User } from "@/lib/types"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"

export function ContactDialog() {

    const userProf: User = {
      id: 0,
      email: "stasneem2003@gmail.com",
      firstName: "Sabira",
      lastName: "Tasneem",
      notifications: 0
  };


    const { toast } = useToast();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSave = async () => {
        if (!name || !email || !subject || !message) {
            toast({
                variant: "destructive",
                title: "Sorry! All fields  must be completed! 🙁",
                description: `Please enter the missing fields of the email.`,
            });
            clearForm()
            return;
        }
        await sendEmail(name, email, subject, message, userProf);
        toast({
            variant: "default",
            title: "Email Sent!",
            description: `Your email was successfully sent`,
        });
        await incrementNotifications(userProf.email);
        clearForm();
    }

    const clearForm = () => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button id="send-email" variant="ghost"><QuestionMarkCircledIcon className="w-5 h-5"  /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                    <DialogDescription>
                        Email us with questions/concerns.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            placeholder="Type your name here."
                            className="col-span-3"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="Type your email here."
                            className="col-span-3"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="subject" className="text-right">
                            Subject
                        </Label>
                        <Input
                            id="subject"
                            placeholder="Type your subject line here."
                            className="col-span-3"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                            }}
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="message" className="text-right">
                            Message
                        </Label>
                        <Textarea
                            id="message"
                            value={message}
                            className="col-span-3"
                            placeholder="Type your message here."
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"secondary"} type="reset" onClick={clearForm}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" onClick={handleSave}>
                            Submit
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
