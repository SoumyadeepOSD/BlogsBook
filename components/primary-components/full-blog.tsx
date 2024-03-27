import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Chip } from "@nextui-org/react";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Label } from "../ui/label";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface FullBlogProps {
    isOpen: boolean;
    onClose: () => void;
    blogContent: string;
    title: string;
    labels: string[];
    userName: string;
    userId: string;
    image: string;
    _id: any;
    comments: Array<any>;
    _creationTime: string;
}


export const dateAndTimeFormatter = (type: string, timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return type === "Date" ? formattedDate : formattedTime;
}

export const FullBlog = (
    { isOpen,
        onClose,
        title,
        userName,
        userId,
        blogContent,
        image,
        labels,
        comments,
        _id ,
        _creationTime
    }: FullBlogProps) => {
    const size = "full";

    const [comment, setComment] = useState("");


    const { user } = useUser();
    const createComment = useMutation(api.blogSchema.createComment);

    const handlePostComment = () => {
        if (!comment) {
            toast.error("Put a comment first");
        }
        createComment({
            id: _id,
            username: user?.fullName!,
            commentId: user?.id!,
            profileURL: user?.profileImageUrl!,
            content: comment,
            creationTime: new Date().toISOString(),
        });
        setComment("");
    }

    return (
        <Modal
            size={size}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent  >

                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-3xl font-bold bg-cyan-100 mt-2 rounded-md mx-10">
                            <div className="flex flex-row items-center justify-between">
                                {title}
                                <span className="flex flex-col items-end">
                                    <small className="text-slate-500">{userName}</small>
                                    <h6 className="text-sm font-medium">{dateAndTimeFormatter("Date", _creationTime)}</h6>
                                </span>
                            </div>
                        </ModalHeader>
                        <ModalBody className="border-2 border-slate-400 rounded-lg mx-10 mt-5" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            <div className="flex flex-wrap gap-3">
                                {
                                    labels.map((label, index) => {
                                        return (
                                            <Chip color="success" variant="flat" key={index}>{label}</Chip>
                                        );
                                    })
                                }
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <Image src={image} alt="blog" className="w-[50%] h-60  object-fill rounded-md mt-5" width={300} height={900} />
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: blogContent }} />
                            <hr />

                            <Toaster />
                            <Label>
                                Comments
                            </Label>
                            <section className="flex flex-row items-center justify-around gap-5">
                                <Avatar>
                                    <AvatarImage src={user?.profileImageUrl} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Input type="text" placeholder="Email" onChange={(e) => setComment(e.target.value)} />
                                <Button variant="shadow" color="primary" onClick={handlePostComment}>Post</Button>
                            </section>
                            <hr />
                            {comments.length &&
                                comments.map((comment, index) => {
                                    return (
                                        <div key={index} className="bg-slate-200 p-3 rounded-s-medium">
                                            <div className="flex flex-row items-start justify-start gap-5">
                                                <Avatar>
                                                    <AvatarImage src={comment.profileURL} alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex flex-row gap-5">
                                                        <p className="font-bold">{comment.username}({comment.commentId===userId ? "Author":"Visitor"})</p>
                                                        <p>{dateAndTimeFormatter("Date", comment.creationTime)}</p>
                                                    </div>
                                                    <p>{comment.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
