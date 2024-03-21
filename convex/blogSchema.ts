import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createBlog = mutation({
    args:{
        title: v.string(),
        blogContent: v.string(),
        file: v.any(),
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("blogs", {
            title: args.title,
            blogContent: args.blogContent,
            file: args.file
        });
    }
});