"use client";
import { Spinner } from "@nextui-org/react";

const LoadingPage = () => {
    return(
        <div className="h-screen w-screen bg-white flex flex-col items-center justify-center">
            <Spinner size="lg" color="secondary"/>
        </div>
    );  
}

export default LoadingPage;