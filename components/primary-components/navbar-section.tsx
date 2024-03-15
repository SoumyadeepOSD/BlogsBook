"use client";

import { useConvexAuth } from "convex/react";
import { UserButton } from "@clerk/clerk-react";

export const NavbarSection = () => {
    const { isAuthenticated } = useConvexAuth();
    return(
        <div className="bg-slate-800 w-full h-[10%] flex flex-row items-center justify-between px-5 overflow-hidden">
            <h1>Navbar</h1>
            <h1>notice</h1>
            {isAuthenticated && <UserButton/>}
        </div>
    );
}