"use client";

import { Button } from '@/components/ui/button';
import React from 'react'
import { useRouter } from 'next/navigation';
import {PlusIcon} from "lucide-react";
import Link from 'next/link';

const Home = () => {
  const router = useRouter();
  const handleClick = () => {
    router.replace("/");
  };  

  const addBlogsHandler = () => {
    router.push("/blogs/");
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-black flex flex-col justify-center items-center">
      <Button variant="secondary" onClick={handleClick}>Go to Landing Page</Button>
      <div className="bg-blue-500 h-[30%] w-[10%] flex flex-col items-center justify-center mt-10 rounded-md hover:bg-blue-800 transition-all hover:cursor-pointer" onClick={addBlogsHandler}>
        <h2 className="my-5 font-bold text-white">Create new Blog</h2>
        <PlusIcon color="white" size={30}/>
      </div>
    </div>
  )
}

export default Home;