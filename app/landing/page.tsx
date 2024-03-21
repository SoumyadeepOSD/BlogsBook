"use client";

import "../../app/globals.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { NavbarSection } from "@/components/primary-components/navbar-section";
import Image from "next/image";
import { BestBlogs } from "@/components/best-blogs";

export const LandingPage = () => {
    const router = useRouter();
    const { isAuthenticated } = useConvexAuth();
    const handleSignin = () => {
        router.replace("/home");
    }
    return (
        <div className="bg-gray-300 h-screen w-screen flex flex-col items-center">
            <NavbarSection />
            <section className="flex flex-col items-center justify-center gap-5 md:flex-row lg:flex-row bg-white p-5 rounded-lg w-[80%]">
                <h1 className="text-4xl font-extrabold lg:text-5xl">Keep <span className={"gradient-text"}>up-to-date</span> your<br /> writing skills with<br /> <span className={"gradient-text"}>BlogsBook</span></h1>
                <Image src={"./blogsvg.svg"} alt="blogsvg" width={200} height={100} />
            </section>
            <section className="flex items-center justify-center gap-5 flex-col bg-white p-5 rounded-lg w-[80%] my-5">
                <div className="flex flex-row items-center justify-evenly w-full">
                    <p>All categories</p>
                    <p>News</p>
                    <p>Travel</p>
                    <p>Cooking</p>
                    <p>Self-Development</p>
                    <p>Science</p>
                    <p>Health</p>
                </div>
                <BestBlogs/>
            </section>
            <div className="h-[80%] flex flex-col justify-center items-center">
                <Button variant="default" onClick={handleSignin}>Get Started</Button>
            </div>
        </div>
    );
}