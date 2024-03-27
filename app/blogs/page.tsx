"use client"

import { NavbarSection } from '@/components/primary-components/navbar-section';
import { BlogsCard } from '@/components/primary-components/blogs-card';
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import "../../app/globals.css"
import { MenuIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Key, useState } from 'react';

const ViewBlogs = () => {
   
  const [sortvalues, setSortValues] = useState<string | undefined>();
  const fetchedBlogs = useQuery(api.blogSchema.getBlogs, { sortBy: sortvalues });

  const setFilters = (key: string) => {
    setSortValues(key);
  }

  const FilterDropDown = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setFilters("upvotes")}>Sort by upvotes</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilters("comments")}>Sort by comments</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilters("date")}>Sort by date</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <NavbarSection />
      <section className="flex flex-row items-end justify-end w-[80%] mb-5">
        <FilterDropDown />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fetchedBlogs?.map((blog: { 
          _id: Key | null | undefined; 
          votes: { userId: string; upvotes: number; downvotes: number; }[];
          title: string; 
          username: string; 
          userId: string;
          image: string; 
          labels: string[]; 
          blogContent: string; 
          comments: { id: string; username: string; commentId: string; content: string;}[]; 
          _creationTime: string; }) => (
          
          <BlogsCard
            key={blog._id}
            _id={blog._id}
            votes={blog.votes}
            title={blog.title}
            username={blog.username}
            userId={blog.userId}
            image={blog.image}
            labels={blog.labels}
            blogContent={blog.blogContent}
            comments={blog.comments}
            _creationTime={blog._creationTime} 
            />
        ))}
      </section>
    </div>
  );
}

export default ViewBlogs;
