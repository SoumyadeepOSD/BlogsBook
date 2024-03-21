"use client";

const Blogs = [
    {
        "id": 1,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Health",
        "title": "How to grow hair in 3 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    {
        "id": 2,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Cooking",
        "title": "How to grow hair in 4 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    {
        "id": 3,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Business",
        "title": "How to grow hair in 5 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
];

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "lucide-react";

export const BestBlogs = () => {
    return (
        <div className="flex flex-col items-start justify-start w-full">
            <h2 className="flex self-start flex-row items-center justify-center font-bold">Best Blogs <ArrowRightIcon/></h2>
            <div className="flex flex-row items-center justify-evenly w-full mt-5">
                {Blogs.map((e) => {
                    return (
                        <div key={e.id} className="flex flex-row items-center justify-center p-5 rounded-lg bg-slate-200 border-2 border-slate-400">
                            <Avatar>
                                <AvatarImage src={e.avatar} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p>{e.title}</p>
                                <p>- by {e.name}</p>
                                <div className="flex flex-row items-center justify-between">
                                    <p>{e.date}</p>
                                    <Badge variant="destructive">{e.category}</Badge>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}