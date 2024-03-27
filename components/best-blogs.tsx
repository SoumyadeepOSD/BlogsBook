"use client";


import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
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
import { dateAndTimeFormatter } from "./primary-components/full-blog";




export const BestBlogs = ({ selectedLabel }: any) => {
    const fetchedBlogs = useQuery(api.blogSchema.getBlogs, { labels: selectedLabel });
    return (
        <div className="flex flex-col items-start justify-start w-full">
            <h2 className="flex self-start flex-row items-center justify-center font-bold">Best Blogs ({fetchedBlogs?.length}) <ArrowRightIcon /></h2>
            <div className="flex gap-5 flex-col lg:flex-row items-center justify-evenly w-full mt-5">
                <CarouselSlider selectedLabel={selectedLabel} fetchedBlogs={fetchedBlogs} />
            </div>
        </div>
    );
}



export const CarouselSlider = ({ selectedLabel, fetchedBlogs }: any) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-[90%]"
        >
            <CarouselContent className="-ml-1">
                {fetchedBlogs?.map((blog: any) => {
                    if (blog.labels.includes(selectedLabel)) {
                        return (
                            <CarouselItem key={blog.id} className="w-[60%] lg:w-[30%] mx-3 flex flex-row items-center justify-center p-5 rounded-lg bg-slate-200 border-2 border-slate-400 md:basis-1/2 lg:basis-1/3">
                                <div key={blog.id} className="w-full flex flex-row">
                                    <CarouselItem>
                                        <div className="p-1 flex flex-row items-center justify-between">
                                            <Avatar>
                                                <AvatarImage src={blog.image} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p>{blog.title}</p>
                                                <p>- by {blog.username}</p>
                                                <div className="flex flex-row items-center justify-between">
                                                    <p>{dateAndTimeFormatter("date", blog._creationTime)}</p>
                                                    <Badge variant="destructive">{selectedLabel}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                </div>
                            </CarouselItem>
                        );
                    }
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
