// "use client";

// import { InputWithLabel } from "@/components/primary-components/input-field";
// import { TipTapTextArea } from "@/elements/text-editor-components/Tiptap";
// import { Button } from "@/components/ui/button";
// import { UploadIcon } from "lucide-react";
// import { useRef, useState } from 'react';
// import Image from "next/image";
// import { NavbarSection } from "@/components/primary-components/navbar-section";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import toast, { Toaster } from 'react-hot-toast';


// const BlogsPage = () => {
//   const content =
//     `<p></p>
//   <p></p>
//   <p></p>
//   <p></p>
//   <p></p>
//   `
//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState<HTMLInputElement | null>(null);
//   const [blogContent, setBlogContent] = useState(content);
//   const [publishLoading, setPublishLoading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const createBlog = useMutation(api.blogSchema.createBlog);

//   const handleClick = () => {
//     if (fileInputRef.current && !file) {
//       fileInputRef.current.click();
//     }
//   };

//   const imagePresentState = () => {
//     return (
//       <section className="flex flex-col items-center justify-center gap-2">
//         {file && <Image src={file} alt="Uploaded image" width={100} height={100} />}
//         {file && <Button variant="destructive" className="text-center" onClick={deleteFile}>Delete</Button>}
//       </section>
//     );
//   }

//   const handlePublish = async () => {
//     if(!title ||!file || blogContent == "<p></p>"){
//       toast("Please fill all the fields")
//       return;
//     }
//    const response = await createBlog({
//       title,
//       blogContent,
//       file
//     });
//     if(response){
//       setPublishLoading(true);
//     }
//     setPublishLoading(false);
//   };


//   const imageAbsentState = () => {
//     return (<section className="w-[80%] h-[30%] flex flex-col items-center justify-evenly rounded-md shadow-lg border-2 border-slate-400">
//       <h2 className="text-xl font-bold">Choose image for background of your blog</h2>
//       <div className="bg-cyan-100 w-[80%] flex flex-col items-center justify-center h-[30%] rounded-md border-dotted border-blue-500 border-4 hover:cursor-pointer shadow-lg shadow-slate-300 relative"
//         onClick={handleClick}
//       >
//         <label htmlFor="avatar" className="cursor-pointer">
//           <section className="flex flex-col items-center justify-center">
//             {!file && <h3>Click here to upload a file</h3>}
//             {!file && <UploadIcon />}
//           </section>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </label>
//       </div>
//     </section>);
//   }
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFile(reader.result as any);
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const deleteFile = () => {
//     setFile(null);
//   }

//   return (
//     <div className="h-full w-screen flex flex-col items-center overflow-hidden">
//  <Toaster 
//   toastOptions={{
//     className: '',
//     style: {
//       border: '1px solid #713200',
//       padding: '16px',
//       color: '#713200',
//     },
//   }}
//  />
// <NavbarSection />
//       {/* Input fields */}
//       <section className="w-screen h-screen flex flex-col items-center justify-evenly overflow-hidden">
// <InputWithLabel
//   label="Write your blog title"
//   placeholder="Enter your blog title"
//   setTitle={setTitle}
// />

//         {/* Image Picker */}
//         {file ? (imagePresentState()) : (imageAbsentState())}
//         {/* TipTap documents */}
// <div className="text-black w-[80%] drop-shadow-md bg-white rounded-lg">
//   <TipTapTextArea
//     content={blogContent}
//     setContent={setBlogContent}
//   />
// </div>
//         {/* {!publishLoading && <Button variant="default" className="my-5" onClick={handlePublish}>Publish</Button>} */}
//         {/* { <Progress value={100} color="danger" aria-label="Success"/>} */}
//         {!publishLoading && <Button variant="default" className="my-5" onClick={handlePublish}>Publish</Button>}
//         {publishLoading && <Button variant="default" className="my-5" onClick={handlePublish}>Loading...</Button>}
//       </section>
//     </div>
//   )
// };
// export default BlogsPage;








"use client";

import "../../app/globals.css";
import { CldUploadWidget } from 'next-cloudinary';
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { NavbarSection } from "@/components/primary-components/navbar-section";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { ArrowDownSquare, CircleCheckIcon, UploadCloudIcon } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { labels } from "../landing/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Chip } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { TipTapTextArea } from "@/elements/text-editor-components/Tiptap";

const BlogsPage = () => {
  const createBlog = useMutation(api.blogSchema.createBlog);
  const [items, setItems] = useState({
    title: "",
    image: null,
    labels: [""],
  });
  const [blogContent, setBlogContent] = useState(
    `<p></p>
    <p></p>
    <p></p>
    <p></p>`
  );
  const [wordCount, setWordCount] = useState(0);
  const handleClose = (labelToRemove: string) => {
    setItems((data) => {
      return { ...data, labels: data.labels.filter((label) => label !== labelToRemove) };
    });
  };

  const handlePublish = () => {

    if (items.title !== "" && items.image !== null && items.labels.length > 0) {
      createBlog(
        {
          title: items.title,
          image: items.image!,
          labels: items.labels.filter((label) => label !== ""),
          blogContent: blogContent,
        }
      );
    }
    else if (wordCount < 100) {
      toast.error(`You have written only ${wordCount} words! Write more words to publish your blog.`, {
        icon: "⚠️",
      });
    }
  }

  return (
    <div className="bg-gray-500 flex flex-col items-center justify-center">
      <NavbarSection />
      <section className="w-[80%] h-full bg-white rounded-lg shadow-lg p-5">
        <Toaster
          toastOptions={{
            className: "bg-red-500",
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
          }}
        />

        {/* Title of Blog */}
        <Input
          type="text"
          placeholder="Write your Blog's Title"
          onChange={(e) => setItems((data) => {
            return { ...data, title: e.target.value }
          })}
        />
        {/* Title of Blog */}


        {/* Image Picker */}
        <CldUploadWidget
          signatureEndpoint="/api/sign-image"
          uploadPreset="my_blog_app"
          onSuccess={(results: any) => {
            console.log(results.info.secure_url);
            setItems((data) => {
              return { ...data, image: results.info.secure_url }
            })
          }}
        >
          {({ open }) => {
            return (
              <div className="flex flex-col items-center justify-center mt-10">
                <UploadCloudIcon className="absolute top-60 lg:top-72" />
                <button
                  onClick={() => open()}
                  className="border-dotted border-4 border-gray-400 w-[50%] h-[200px] rounded-lg flex flex-col items-center justify-center relative"
                >
                  {items.image ? (<p className="flex flex-row items-center justify-between mt-2">Done <CircleCheckIcon color="white" fill="green" /></p>)
                    : (<p>Upload Cover Image</p>)}
                </button>
              </div>
            );
          }}
        </CldUploadWidget>
        {/* Image Picker */}


        {/* Tgas */}
        <div className="w-[80%] h-[30%] flex flex-row items-center justify-between my-10">
          <div className="flex gap-2">
            {items.labels.map((label, index) => label != "" && (
              <Chip key={index} onClose={() => handleClose(label)} variant="faded" color="warning">
                {label}
              </Chip>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Select Labels <ArrowDownSquare /> </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Labels</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col items-start justify-center">
                {
                  labels.map((label, index) => (
                    <DropdownMenuItem key={index} onClick={() => {
                      if (!items.labels.includes(label)) {
                        setItems((data: any) => {
                          return { ...data, labels: [...data.labels, label] }
                        }
                        );
                      }
                    }}>{label}</DropdownMenuItem>
                  ))
                }
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Tags */}


        {/* Blog Content */}
        <section className="flex flex-col items-center justify-center">
          <div className="text-black w-[80%] drop-shadow-md rounded-lg">
            <TipTapTextArea
              content={blogContent}
              setContent={setBlogContent}
              setWordCount={setWordCount}
            />
          </div>
        </section>
        {/* Blog Content */}

        <Button onClick={handlePublish}>Publish</Button>
      </section>


    </div>
  );
}

export default BlogsPage;