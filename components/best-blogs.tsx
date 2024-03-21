"use client";

const Blogs = [
    {
        "id": 1,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Travel",
        "title": "How to grow hair in 3 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    {
        "id": 2,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Health",
        "title": "How to grow hair in 4 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    
    {
        "id": 3,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Science",
        "title": "How to grow hair in 5 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    {
        "id": 4,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Business",
        "title": "How to grow hair in 5 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },

    {
        "id": 5,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Business",
        "title": "How to grow hair in 5 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    {
        "id": 6,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Business",
        "title": "How to grow hair in 5 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },

    {
        "id": 7,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Health",
        "title": "How to grow hair in 5 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    {
        "id": 7,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Health",
        "title": "How to grow hair in 5 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },

    {
        "id": 7,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Health",
        "title": "How to grow hair in 5 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    {
        "id": 7,
        "name": "Sujay Sarkar",
        "date": "20-03-24",
        "category": "Health",
        "title": "How to grow hair in 5 months",
        "avatar": "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
];

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


export const BestBlogs = ({ selectedLabel }: any) => {
    return (
        <div className="flex flex-col items-start justify-start w-full">
            <h2 className="flex self-start flex-row items-center justify-center font-bold">Best Blogs ({Blogs.length}) <ArrowRightIcon /></h2>
            <div className="flex gap-5 flex-col lg:flex-row items-center justify-evenly w-full mt-5">
                <CarouselSlider selectedLabel={selectedLabel} />
            </div>
        </div>
    );
}



export const CarouselSlider = ({ selectedLabel }: any) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-[90%]"
        >
            <CarouselContent className="-ml-1">
                {Blogs.map((e) => {
                    if (selectedLabel === "All categories" || e.category === selectedLabel) {
                        return (
                            <CarouselItem key={e.id} className="w-[60%] lg:w-[30%] mx-3 flex flex-row items-center justify-center p-5 rounded-lg bg-slate-200 border-2 border-slate-400 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 flex flex-row items-center justify-between">
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
                            </CarouselItem>
                        )
                    }
                }
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
