"use client";

import { NavbarSection } from '@/components/primary-components/navbar-section';
import { BlogsCard } from '@/components/primary-components/blogs-card';
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import "../../app/globals.css"


const ViewBlogs = () => {
  const fethedBlogs = useQuery(api.blogSchema.getBlogs);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <NavbarSection />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          fethedBlogs?.map((blog: {
            _id: any; title: string; username: string; votes: { userId: string, upvotes: number, downvotes: number }[]; image: string; labels: string[]; blogContent: string; _creationTime: string;
          }) => {
            return (<BlogsCard
              key={blog._id}
              _id={blog._id}
              votes={blog.votes}
              title={blog.title}
              username={blog.username}
              image={blog.image}
              labels={blog.labels}
              blogContent={blog.blogContent}
              _creationTime={blog._creationTime}
            />)
          })
        }
      </section>
    </div>
  )
}

export default ViewBlogs
