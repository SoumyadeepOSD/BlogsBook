import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createBlog = mutation({
    args:{
        title: v.string(),
        image: v.string(),
        labels: v.array(v.string()),
        blogContent: v.string(),
    },
    handler: async(ctx, args) => {
        await ctx.db.insert("blogs", {
            image: args.image,
            title: args.title,
            labels: args.labels,
            blogContent: args.blogContent
        });
    }
});