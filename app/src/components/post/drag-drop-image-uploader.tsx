import './drag-drop-image-uploader.css';
import { useState, useRef } from 'react';

type PreviewImage = {
  image: File,
  url: string,
  name: string
}

const DragDropImageUploader = () => {
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    let uniqueImages: PreviewImage[] = [];
    Array.from(files).forEach((file) => {
      if (!images.some((item) => item.image.name === file.name)) {
        uniqueImages.push(
          {
            image: file,
            url: URL.createObjectURL(file),
            name: file.name,
          }
        )
      }
    });

    // Add unique images to state variable
    setImages([...images, ...uniqueImages]);
  }

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
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
    let uniqueImages: PreviewImage[] = [];
    Array.from(files).forEach((file) => {
      if (!images.some((item) => item.image.name === file.name)) {
        uniqueImages.push(
          {
            image: file,
            url: URL.createObjectURL(file),
            name: file.name,
          }
        )
      }
    });

    // Add unique images to state variable
    setImages([...images, ...uniqueImages]);
  }

  const uploadImages = () => {
    console.log(images);
  }

  return (
    <div className='card'>
      <div className='top'>
        {/* <p>Drag & Drop image uploading</p> */}
      </div>
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
        {images.map((item, i) => (
          <div className='image' key={`img-${i}`}>
            <span className='delete' onClick={() => deleteImage(i)}>&times;</span>
            <img src={item.url} alt={item.name}/>
          </div>
        ))}
      </div>
      {/* Use Callback function to pass data to parent instead of button */}
      <button type='button'>
        Upload
      </button>
    </div>
  );
}

export default DragDropImageUploader;