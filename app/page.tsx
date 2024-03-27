"use client";

import LoadingPage from "@/pages/loading-page";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import LandingPage from "./landing/page";

export default function Home() { 
  return (
      <div>
        <Authenticated>
          <LandingPage/>
        </Authenticated>
        <Unauthenticated>
          <LandingPage/>
        </Unauthenticated>
        <AuthLoading>
         <LoadingPage/>
        </AuthLoading>
      </div>
    );
}
