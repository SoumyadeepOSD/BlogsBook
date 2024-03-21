"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Image from "next/image";
import "../../app/globals.css";
import { Button } from "@nextui-org/react";
import { ArrowDownNarrowWideIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export const NavbarSection = () => {
    const { isAuthenticated } = useConvexAuth();
    return (
        <div className="bg-slate-800 w-[80%] flex flex-row items-center justify-between px-5 py-5 my-5 rounded-lg" style={{ backdropFilter: 'blur(2px)' }}>
            <picture>
                <img src={"./blogsbook.svg"} alt="logo" className="w-25 h-5 lg:w-30 lg:h-10" />
            </picture>
            <section className="text-slate-400 hidden lg:flex flex-row items-center justify-evenly w-full">
                <h3 className="group hover:text-slate-200 transition-colors duration-300 cursor-pointer">Home</h3>
                <h3 className="group hover:text-slate-200 transition-colors duration-300 cursor-pointer">Contact us</h3>
                <h3 className="group hover:text-slate-200 transition-colors duration-300 cursor-pointer">Blogs</h3>
            </section>
            <section className="text-white lg:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger><ArrowDownNarrowWideIcon /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Home</DropdownMenuItem>
                        <DropdownMenuItem>Contact</DropdownMenuItem>
                        <DropdownMenuItem>Blogs</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>
            {isAuthenticated && <UserButton />}
            {!isAuthenticated &&
                (<SignInButton>
                    <Button className="bg-white text-black rounded-sm px-5 py-2 hover:bg-slate-300">
                        <p className="font-bold text-sm">Signin</p>
                    </Button>
                </SignInButton>)
            }
        </div>
    );
}




