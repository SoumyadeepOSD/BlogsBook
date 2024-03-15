"use client";

import { useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(CONVEX_URL);

interface ConvexClerkProviderProps{
    children: React.ReactNode;
};

export const ConvexClerkProvider = ({children}: ConvexClerkProviderProps) => {
    return(
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};