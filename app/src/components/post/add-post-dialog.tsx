
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
import { Textarea } from "../ui/textarea";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationPosts from "@/hooks/use-mutations-posts";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import { useState, useRef } from "react";
import { PostType } from "@/lib/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import './drag-drop-image-uploader.css';
import useMutationImages from "@/hooks/use-mutations-images";

type PreviewType = {
  url: string,
  name: string
}

export const AddPostDialog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cost, setCost] = useState(0);
  const [address, setAddress] = useState("");
  const [type, setType] = useState<PostType | null>(null);
  const { makeNewPost } = useMutationPosts();
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  // For saving uploaded images
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { postImagesToURLs } = useMutationImages();

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
    Array.from(files).forEach((file) => {
      if (!previews.some((item) => item.name === file.name)) {
        uniqueImages.push(file);
        uniquePreviews.push(
          {
            url: URL.createObjectURL(file),
            name: file.name,
          }
        );
      }
    });

    // Add unique images to state variable
    setImageFiles([...imageFiles, ...uniqueImages]);
    setPreviews([...previews, ...uniquePreviews]);
  }

  const deleteImage = (index: number) => {
    setPreviews(previews.filter((_, i) => i !== index));
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
    Array.from(files).forEach((file) => {
      if (!previews.some((item) => item.name === file.name)) {
        uniqueImages.push(file);
        uniquePreviews.push(
          {
            url: URL.createObjectURL(file),
            name: file.name,
          }
        );
      }
    });

    // Add unique images to state variable
    setImageFiles([...imageFiles, ...uniqueImages]);
    setPreviews([...previews, ...uniquePreviews]);
  }

  const handleSave = async () => {
    if (!title || !content || !address || !type) {
      toast({
        variant: "destructive",
        title: "Sorry! All fields (except Image URL) must be completed! 🙁",
        description: `Please enter the missing fields of the post.`,
      });
      handleCancel()
      return;
    }
    if (cost === 0 || cost < 0) {
      toast({
        variant: "destructive",
        title: "Sorry! The cost must be a valid number! 🙁",
        description: `Please enter an integer, greater than 0`,
      });
      handleCancel()
      return;
    }
    let imageURLs: string[] = [];
    if (imageFiles.length !== 0) {
      imageURLs = await postImagesToURLs(imageFiles);
    }
    console.log(imageURLs);
    await makeNewPost(title, content, cost, address, type, imageURLs);
    setImageFiles([]);
    setPreviews([]);
    setTitle("");
    setContent("");
    setCost(0);
    setAddress("");
  };

  const handleCancel = () => {
    setImageFiles([]);
    setPreviews([]);
    setTitle("");
    setContent("");
    setCost(0);
    setAddress("");
  };

  return (
    <Dialog>
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
                  Provide the information of your post here.<br/>
                  Required fields <span className="text-red-500">*</span>
                </>
              : "Please login to make a post."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 mb-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="type">
              Type <span className="text-red-500 ">*</span>
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
        <div className="grid gap-4 mb-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="title">
              Title <span className="text-red-500 ">*</span>
            </Label>
            <Textarea
              id="title"
              value={title}
              className="h-0 col-span-4"
              style={{ resize: 'none' }}
              placeholder="Type your title here."
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid gap-4 mb-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="content">
              Content <span className="text-red-500 ">*</span>
            </Label>
            <Textarea
              id="content"
              value={content}
              className="col-span-4 h-30"
              style={{ resize: 'none' }}
              placeholder="Type your content here."
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid gap-4 mb-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="cost">
              Monthly Cost <span className="text-red-500 ">*</span>
            </Label>
            <Input
              id="cost"
              type="number"
              placeholder="Please enter an integer"
              onChange={(e) => setCost(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="grid gap-4 mb-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="address">
              Address <span className="text-red-500 ">*</span>
            </Label>
            <Textarea
              id="address"
              value={address}
              className="col-span-4"
              style={{ resize: 'none' }}
              placeholder="Type your address here."
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
        </div>
        <Label htmlFor="upload">
          Upload Images
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
            {previews.map((item, i) => (
              <div className='image' key={`img-${i}`}>
                <span className='delete' onClick={() => deleteImage(i)}>&times;</span>
                <img src={item.url} alt={item.name}/>
              </div>
            ))}
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
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Submit
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
