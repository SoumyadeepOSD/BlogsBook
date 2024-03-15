"use client";

import "../../app/globals.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { NavbarSection } from "@/components/primary-components/navbar-section";

export const LandingPage = () => {
    const router = useRouter();
    const { isAuthenticated } = useConvexAuth();
    const handleSignin = () => {
        router.replace("/home");
    }
    return(
        <div className="bg-black h-screen w-screen flex flex-col items-center">
            <NavbarSection/>
            <div className="h-[80%] flex flex-col justify-center items-center">
            <h1 className="text-3xl text-blue-500 font-bold my-5">Blogify</h1>
            {!isAuthenticated && <Button variant="outline" onClick={handleSignin}>Signin</Button>}
            {isAuthenticated && <Button variant="secondary" onClick={handleSignin}>Go to Dashboard</Button>}
            </div>
        </div>
    );
}