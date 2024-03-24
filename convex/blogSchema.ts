import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export type Blogs = {
    id: Id,
    title: string,
    username: string,
    image: string,
    labels: string[],
    blogContent: string,
    votes: {userId: string, upvotes: number, downvotes: number}[]
}


export const createBlog = mutation({
    args:{
        title: v.string(),
        image: v.string(),
        username: v.string(),
        labels: v.array(v.string()),
        blogContent: v.string(),
        votes: v.array(v.object({userId: v.string(), upvotes: v.number(), downvotes: v.number()})),
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("blogs", {
            image: args.image,
            title: args.title,
            username: args.username,
            labels: args.labels,
            blogContent: args.blogContent,
            votes: args.votes
        });
    }
});




export const getBlogs = query({
    handler: async(ctx) => {
        return ctx.db.query("blogs").collect();
    }
});



export const updateVote = mutation({
    args:{
        id: v.id("blogs"),
        userId: v.string(),
        upvote: v.boolean(),
        downvote: v.boolean(),
    },
    handler: async(ctx, args) => {
        const blog = await ctx.db.get(args.id);
        const userVote = blog.votes.find((vote: {userId: string, upvotes: number, downvotes: number}) => vote.userId === args.userId);
        if(!userVote){
            blog.votes.push({userId: args.userId, upvotes: args.upvote ? 1 : 0, downvotes: args.downvote ? 1 : 0});
        }else{
            if(args.upvote){
                userVote.upvotes += 1;
                if(userVote.downvotes > 0){
                    userVote.downvotes -= 1;
                }
            } else if(args.downvote){
                userVote.downvotes += 1;
                if(userVote.upvotes > 0){
                    userVote.upvotes -= 1;
                }
            }
        }
        await ctx.db.patch(args.id, {votes: blog.votes});
    }
});