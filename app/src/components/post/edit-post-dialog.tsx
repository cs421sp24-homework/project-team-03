import React, { useRef, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import useMutationPosts from "@/hooks/use-mutations-posts";
import { ImageMetadata, PostWithUserData } from "@/lib/types";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import useMutationImages from "@/hooks/use-mutations-images";

type PreviewType = {
  url: string,
  name: string
}

export const EditPostDialog = ({
  post,
  setDropdownState,
}: {
  post: PostWithUserData;
  setDropdownState: (b: boolean) => void;
}) => {
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);
  const [newCost, setNewCost] = useState(post.cost);
  const [newAddress, setNewAddress] = useState(post.address);
  
  const { editPostById } = useMutationPosts();
  const { toast } = useToast();
  const [dialogueState, setDialogueState] = useState(false);

  const [imageFiles, setImageFiles] = useState<File[]>([]); // uploaded images
  const [newPreviews, setNewPreviews] = useState<PreviewType[]>([]); // data of newly uploaded images
  const [existingPreviews, setExistingPreviews] = useState<ImageMetadata[]>(post.images); // data of existing post images
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { postImagesToData } = useMutationImages(); // to convert new Image files to metadata (of Supabase storage)

  const selectFiles = () => {
    fileInputRef.current?.click();
  }

  const onFileSelect = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList,
    };
    const files = target.files;
    if (files.length === 0) return;

    // Filter out duplicate images by name
    let uniqueImages: File[] = [];
    let uniquePreviews: PreviewType[] = [];
    // let uniquePreviews: ImageMetadata[] = [];
    Array.from(files).forEach((file) => {
      if (!newPreviews.some((item) => item.name === file.name)) {
        uniqueImages.push(file);
        uniquePreviews.push({
          url: URL.createObjectURL(file),
          name: file.name,
        });
      }
    });

    // Add unique images to state variable
    setImageFiles([...imageFiles, ...uniqueImages]);
    setNewPreviews([...newPreviews, ...uniquePreviews]);
    //console.log('Selected files', [...uniqueImages]);
  }

  const deleteImage = (index: number, isNew: boolean) => {
    if (isNew) {
      setImageFiles(imageFiles.filter((_, i) => i !== index));
      setNewPreviews(newPreviews.filter((_, i) => i !== index));
      return;
    }
    setExistingPreviews(existingPreviews.filter((_, i) => i !== index));
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();   // prevent browser from opening dragged file in new tab onDrop
    setIsDragging(true);
    e.dataTransfer.dropEffect = 'copy';
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();   
    setIsDragging(false);
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();   
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    // Filter out duplicate images by name
    let uniqueImages: File[] = [];
    let uniquePreviews: PreviewType[] = [];
    // let uniquePreviews: ImageMetadata[] = [];
    Array.from(files).forEach((file) => {
      if (!newPreviews.some((item) => item.name === file.name)) {
        uniqueImages.push(file);
        uniquePreviews.push({
          url: URL.createObjectURL(file),
          name: file.name,
        });
      }
    });

    // Add unique images to state variable
    setImageFiles([...imageFiles, ...uniqueImages]);
    setNewPreviews([...newPreviews, ...uniquePreviews]);
    //console.log('Dropped files', [...uniqueImages]);
  }

  const handleEditClick = async (event: React.SyntheticEvent) => {
    event.stopPropagation(); // Stop event propagation to prevent closing the dropdown
    event.preventDefault(); // Prevent the default behavior (e.g., form submission)
    setDialogueState(true);
  };

  const handleSave = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!newTitle || !newContent || !newAddress) { 
      toast({
        variant: "destructive",
        title: "Sorry! Fields cannot be empty! 🙁",
        description: "Please fill out all fields for your post.",
      });
      return;
    }
    //TODO: handle invalid Cost field

    let imgDataArray: ImageMetadata[] = [];
    if (existingPreviews && existingPreviews.length) {
      imgDataArray = imgDataArray.concat(existingPreviews);
    }
    if (imageFiles.length > 0) {
      imgDataArray = imgDataArray.concat(await postImagesToData(imageFiles));
    }
    
    await editPostById(post.id, newTitle, newContent, newCost, newAddress, post.type, imgDataArray );
    setNewTitle("");
    setNewContent("");
    setNewAddress("");
    setNewCost(0);
    setImageFiles([]);
    setExistingPreviews([]);
    setDropdownState(false);
    setDialogueState(false);
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setNewTitle(post.title);
    setNewContent(post.content);
    setNewAddress(post.address);
    setNewCost(post.cost);
    setImageFiles([]);
    setExistingPreviews([]);
    setDropdownState(false);
    setDialogueState(false);
  };

  return (
    <Dialog open={dialogueState} onOpenChange={setDialogueState}>
      <DialogTrigger asChild>
          <DropdownMenuItem id="edit-post" onClick={handleEditClick}>
              Edit
          </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Edit the title and content of your post here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="newTitle" className="text-right">
              New Title
            </Label>
            <Input
              id="newTitle"
              value={newTitle}
              className="col-span-3"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="newContent" className="text-right">
              New Content
            </Label>
            <Textarea
              id="newContent"
              value={newContent}
              className="col-span-3"
              onChange={(e) => {
                setNewContent(e.target.value);
              }}
            />
          </div>

          {post.type == "Sublet" &&
            <><div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="cost">New Cost
                <div>(Please enter an integer)</div>
              </Label>
              <Input
                id="cost"
                type="number"
                value={newCost}
                onChange={(e) => setNewCost(Number(e.target.value))} />
            </div><div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="address"> New Address</Label>
                <Textarea
                  id="address"
                  value={newAddress}
                  className="col-span-4"
                  style={{ resize: 'none' }}
                  placeholder="Type your address here."
                  onChange={(e) => {
                    setNewAddress(e.target.value);
                  } } />
              </div></>
          }
          <Label htmlFor="upload">
            Upload Images JPG or PNG only
          </Label>
          <div className='card'>
            <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
              {isDragging ? (
                <span className='select'>
                  Drop images here
                </span>
              ) : (
                <>
                  Drag & Drop images here or {' '}
                  <span className='select' role='button' onClick={selectFiles}>
                    Browse
                  </span>
                </>
              )}
              <input
                id = 'file'
                name='file' 
                type='file' 
                className='file' 
                accept='image/png, image/jpg'
                multiple 
                ref={fileInputRef} 
                onChange={onFileSelect}
              />
            </div>
            <div className='container'>
              {existingPreviews && existingPreviews.map((item, i) => (
                <div className='image' key={`img-${i}`}>
                  <span className='delete' onClick={() => deleteImage(i, false)}>&times;</span>
                  <img src={item.url} alt={item.path}/>
                </div>
              ))}
              {newPreviews && newPreviews.map((item, i) => (
                <div className='image' key={`img-${i}`}>
                  <span className='delete' onClick={() => deleteImage(i, true)}>&times;</span>
                  <img src={item.url} alt={item.name}/>
                </div>
              ))}
            </div>
          </div>
          </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
