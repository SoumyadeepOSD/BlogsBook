"use client";

import { InputWithLabel } from "@/components/primary-components/input-field";
import { TipTapTextArea } from "@/elements/text-editor-components/Tiptap";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useRef, useState } from 'react';
import Image from "next/image";
import { NavbarSection } from "@/components/primary-components/navbar-section";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast, { Toaster } from 'react-hot-toast';
import "../../app/globals.css";

const BlogsPage = () => {
  const content =
    `<p></p>
  <p></p>
  <p></p>
  <p></p>
  <p></p>
  `
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<HTMLInputElement | null>(null);
  const [blogContent, setBlogContent] = useState(content);
  const [publishLoading, setPublishLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createBlog = useMutation(api.blogSchema.createBlog);

  const handleClick = () => {
    if (fileInputRef.current && !file) {
      fileInputRef.current.click();
    }
  };

  const imagePresentState = () => {
    return (
      <section className="flex flex-col items-center justify-center gap-2">
        {file && <Image src={file} alt="Uploaded image" width={100} height={100} />}
        {file && <Button variant="destructive" className="text-center" onClick={deleteFile}>Delete</Button>}
      </section>
    );
  }

  const handlePublish = async () => {
    if(!title ||!file || blogContent == "<p></p>"){
      toast("Please fill all the fields")
      return;
    }
   const response = await createBlog({
      title,
      blogContent,
      file
    });
    if(response){
      setPublishLoading(true);
    }
    setPublishLoading(false);
  };


  const imageAbsentState = () => {
    return (<section className="w-[80%] h-[30%] flex flex-col items-center justify-evenly rounded-md shadow-lg border-2 border-slate-400">
      <h2 className="text-xl font-bold">Choose image for background of your blog</h2>
      <div className="bg-cyan-100 w-[80%] flex flex-col items-center justify-center h-[30%] rounded-md border-dotted border-blue-500 border-4 hover:cursor-pointer shadow-lg shadow-slate-300 relative"
        onClick={handleClick}
      >
        <label htmlFor="avatar" className="cursor-pointer">
          <section className="flex flex-col items-center justify-center">
            {!file && <h3>Click here to upload a file</h3>}
            {!file && <UploadIcon />}
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
    </section>);
  }
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
    <div className="h-full w-screen flex flex-col items-center overflow-hidden">
       <Toaster 
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
        }}
       />
      <NavbarSection />
      {/* Input fields */}
      <section className="w-screen h-screen flex flex-col items-center justify-evenly overflow-hidden">
        <InputWithLabel
          label="Write your blog title"
          placeholder="Enter your blog title"
          setTitle={setTitle}
        />

        {/* Image Picker */}
        {file ? (imagePresentState()) : (imageAbsentState())}
        {/* TipTap documents */}
        <div className="text-black w-[80%] drop-shadow-md bg-white rounded-lg">
          <TipTapTextArea
            content={blogContent}
            setContent={setBlogContent}
          />
        </div>
        {/* {!publishLoading && <Button variant="default" className="my-5" onClick={handlePublish}>Publish</Button>} */}
        {/* { <Progress value={100} color="danger" aria-label="Success"/>} */}
        {!publishLoading && <Button variant="default" className="my-5" onClick={handlePublish}>Publish</Button>}
        {publishLoading && <Button variant="default" className="my-5" onClick={handlePublish}>Loading...</Button>}
      </section>
    </div>
  )
};
export default BlogsPage;








