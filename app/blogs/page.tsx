"use client";

import { InputWithLabel } from "@/components/primary-components/input-field";
import { TipTapTextArea } from "@/elements/text-editor-components/Tiptap";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useRef, useState } from 'react';
import "../../app/globals.css";
import Image from "next/image";

const BlogsPage = () => {

  const [file, setFile] = useState<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current && !file) {
      fileInputRef.current.click();
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };


  const deleteFile = () => {
    setFile(null);
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-evenly">

      {/* Input fields */}
      <Image src={"./BlogsBook.svg"} alt="Uploaded image" width={300} height={200}/>
      <InputWithLabel
        label="Write your blog title"
        placeholder="Enter your blog title"
      />

      {/* Image Picker */}
      <section className="w-[80%] h-[30%] flex flex-col items-center justify-evenly rounded-md shadow-lg border-2 border-slate-400">
        <h2 className="text-xl font-bold">Choose image for background of your blog</h2>
        <div className="bg-cyan-100 w-[80%] flex flex-col items-center justify-center h-[30%] rounded-md border-dotted border-blue-500 border-4 hover:cursor-pointer shadow-lg shadow-slate-300 relative"
          onClick={handleClick}
        >
          <label htmlFor="avatar" className="cursor-pointer">
            <section className="flex flex-col items-center justify-center">
              {!file && <h3>Click here to upload a file</h3>}
              {!file && <UploadIcon />}
            </section>
            <section className="flex flex-col items-center justify-center gap-2">
              {file && <Image src={file} alt="Uploaded image" width={300} height={200} />}
              {file && <Button variant="destructive" className="text-center" onClick={deleteFile}>Delete</Button>}
            </section>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </section>


      {/* TipTap documents */}
      <div className="text-black w-[80%] drop-shadow-md bg-white rounded-lg">
        <TipTapTextArea />
      </div>
    </div>
  )
};
export default BlogsPage;








