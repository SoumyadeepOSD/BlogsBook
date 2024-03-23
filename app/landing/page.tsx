"use client";

import "../../app/globals.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { NavbarSection } from "@/components/primary-components/navbar-section";
import Image from "next/image";
import { BestBlogs } from "@/components/best-blogs";
import { Badge } from "@/components/ui/badge";
import { SetStateAction, useState } from "react";

export const labels = [
"Technology",
"Travel",
"Food",
"Health and Fitness",
"Fashion",
"Lifestyle",
"Business",
"Personal Finance",
"Education",
"Entertainment",
"Sports",
"DIY and Crafts",
"Parenting",
"Science",
"Environment and Sustainability",
"Home Decor",
"Photography",
"Art and Culture",
"Gaming",
"Book Reviews"
];

export const LandingPage = () => {
    const router = useRouter();
    const { isAuthenticated } = useConvexAuth();
    const handleSignin = () => {
        router.replace("/home");
    }
    const [selectedLabel, setSelectedLabel] = useState("All categories");
    const handleLabelClick = (label: SetStateAction<string>) => 
    setSelectedLabel(
        label === selectedLabel ? "All categories" : label
    );

    return (
        <div className="bg-gray-500 h-full w-screen flex flex-col items-center">
            <NavbarSection />
            <section className="flex flex-col items-center justify-center gap-5 md:flex-row lg:flex-row bg-white p-5 rounded-lg w-[80%]">
                <h1 className="text-4xl font-extrabold lg:text-5xl">Keep <span className={"gradient-text"}>up-to-date</span> your<br /> writing skills with<br /> <span className={"gradient-text"}>BlogsBook</span></h1>
                <Image src={"./blogsvg.svg"} alt="blogsvg" width={200} height={100} />
            </section>
            <section className="flex items-center justify-center gap-5 flex-col bg-white p-5 rounded-lg w-[80%] my-5">
                {/* <div className="flex flex-row items-center justify-evenly w-full"> */}
                <div className="grid grid-cols-5 md:grid-cols-10 gap-4 md:flex md:flex-wrap">
                {labels.map((label) => (
                    <Badge 
                        key={label} 
                        variant={label === selectedLabel ? "default" : "outline"}
                        className="hover:cursor-pointer"
                        onClick={() => handleLabelClick(label)}
                    >
                        <p className="truncate">{label}</p>
                    </Badge>
                ))}
                </div>
                <BestBlogs selectedLabel = {selectedLabel}/>
            <div className="h-[80%] flex flex-col justify-center items-center">
                <Button variant="default" onClick={handleSignin}>Get Started</Button>
            </div>
            </section>
        </div>
    );
}