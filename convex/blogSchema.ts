import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { GenericId, v } from "convex/values";


export type Blogs = {
    id: Id,
    title: string,
    username: string,
    userId: string,
    image: string,
    labels: string[],
    blogContent: string,
    votes: {userId: string, upvotes: number, downvotes: number}[],
    comments: {
        id: Id,
        username: string,
        profileURL: string,
        content: string,
    }[]
}

export const createBlog = mutation({
    args:{
        title: v.string(),
        image: v.string(),
        username: v.string(),
        userId: v.string(),
        labels: v.array(v.string()),
        blogContent: v.string(),
        votes: v.array(v.object({userId: v.string(), upvotes: v.number(), downvotes: v.number()})),
        comments: v.array(v.object({
            id: v.id("blogs"),
            commentId: v.string(), 
            username: v.string(),
            profileURL: v.string(), 
            content: v.string(), 
        }))
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("blogs", {
            image: args.image,
            title: args.title,
            username: args.username,
            userId: args.userId,
            labels: args.labels,
            blogContent: args.blogContent,
            votes: args.votes,
            comments: args.comments
        });
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


export const createComment = mutation({
    args:{
        id: v.id("blogs"),
        username: v.string(),
        commentId: v.string(),
        profileURL: v.string(),
        content: v.string(),
        creationTime: v.any(),
    },
    handler: async(ctx, args) => {
        const blog = await ctx.db.get(args.id);
        blog.comments.push({id: args.id, username: args.username, profileURL: args.profileURL, content: args.content, creationTime: args.creationTime, commentId: args.commentId});
        await ctx.db.patch(args.id, {comments: blog.comments});
    }
});

export const getBlogs = query({
    args: {
        sortBy: v.optional(v.string()),
        labels: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        let blogs = await ctx.db.query("blogs").collect();
        
        if (args.labels) {
            blogs = blogs.filter((blog: { labels: string[]; }) =>
                blog.labels.includes(args.labels!)
            );
        }
        
        if (args.sortBy === "date") {
            blogs.sort((a, b) => new Date(b._creationTime).getTime() - new Date(a._creationTime).getTime());
        } else if (args.sortBy === "upvotes") {
            blogs.sort((a, b) => {
                const totalUpvotesA = a.votes.reduce((acc: any, cur: { upvotes: any; }) => acc + cur.upvotes, 0);
                const totalUpvotesB = b.votes.reduce((acc: any, cur: { upvotes: any; }) => acc + cur.upvotes, 0);
                return totalUpvotesB - totalUpvotesA;
            });
        }
        return blogs;
    },
});

