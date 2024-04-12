import { useState } from "react";
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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useStore } from "@/lib/store";
import { PostType } from "@/lib/types";
import { Label } from "../ui/label";
import './drag-drop-image-uploader.css';
import { RoommateDialog } from "./roommate-dialog";
import { HousingDialog } from "./housing-dialog";
import { SubletDialog } from "./sublet-dialog";


export const PostTypeDialog = () => {
    
  const [type, setType] = useState<PostType | null>(null);
  const user = useStore((state) => state.user);
  const [typeDialogState, setTypeDialogState] = useState(false);  

  const renderDialog = () => {

    switch (type) {
      case 'Roommate':
        return <RoommateDialog setTypeDialogState={setTypeDialogState}/>;
      case 'Housing':
        return <HousingDialog setTypeDialogState={setTypeDialogState} />;
      case 'Sublet': 
        return <SubletDialog setTypeDialogState={setTypeDialogState}/>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={typeDialogState} onOpenChange={(open) => {
        setTypeDialogState(open);
        if(open === true) setType(null); 
      }} >
      <DialogTrigger asChild>
        <Button id="add-posts" aria-label={"Make a Post"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>
            {user
              ? 
                <>
                  Select the type of post you would like to make.<br/>
                </>
              : "Please login to make a post."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 mb-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="type">
              Type <span className="text-red-500">*</span>
            </Label>
            <select
              id="type"
              className="col-span-4"
              onChange={(e) => {
                setType(e.target.value as PostType);
              }}
            >
              <option value="">Select a post type...</option>
              <option id="Roommate" value="Roommate">Looking for Roommate</option>
              <option id="Sublet" value="Sublet">Looking for Subletter</option>
              <option id="Housing" value="Housing">Looking for Housing</option>
            </select>
          </div>
        </div>
        
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset">
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
                {renderDialog()}
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
