import { useUser } from "@clerk/clerk-react";
import { Card, CardHeader, CardBody, Image, useDisclosure } from "@nextui-org/react";
import { ArrowBigDownIcon, ArrowBigUp, ArrowUpRightFromSquareIcon } from "lucide-react";
import { Chip } from "@nextui-org/react";
import { toast, Toaster } from "react-hot-toast";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Button } from "../ui/button";
import { FullBlog } from "./full-blog";
import { useState } from "react";
import { UnsignedModalWarning } from "./unsigned-modal-warning";

interface BlogsCardProps {
    _id: any,
    title: string,
    username: string,
    votes: Array<{ userId: string, upvotes: number, downvotes: number }>,
    image: string,
    labels: Array<string>
    blogContent: string,
    _creationTime: string
};

export const BlogsCard = ({
    _id,
    title,
    username,
    votes,
    image,
    labels,
    blogContent,
    _creationTime
}: BlogsCardProps) => {
    const { user } = useUser();
    const updateVote = useMutation(api.blogSchema.updateVote);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus] = useState(false);
    const handleOpenBlog = () => {
        onOpen();
    }


    const handleUpvote = async () => {
        if (!user) {
            toast.error("You need to be logged in to upvote.");
            setStatus(true);
            return;
        }
        const hasVoted = votes.find(vote => vote.userId === user.id);
        if (hasVoted && hasVoted.upvotes > 0) {
            toast.error("You have already upvoted this post.");
            return;
        }
        updateVote({ id: _id, userId: user.id, upvote: true, downvote: false });
    };

    const handleDownvote = async () => {
        if (!user) {
            toast.error("You need to be logged in to downvote.");
            setStatus(true);
            return;
        }
        const hasVoted = votes.find(vote => vote.userId === user.id);
        if (hasVoted && hasVoted.downvotes > 0) {
            toast.error("You have already downvoted this post.");
            return;
        }
        await updateVote({ id: _id, userId: user.id, upvote: false, downvote: true });
    };

    return (
        <Card className="py-4">
            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                }}
            />
            <CardHeader className="flex pb-0 pt-2 px-4 flex-col items-start w-full">
                <div className="flex flex-row items-center justify-between w-[100%]">
                    <p className="text-tiny font-medium">✍🏻 {username.split(" ")[0]}</p>
                    <div className="flex flex-row items-center">
                        <span className="flex flex-row items-center justify-center"><small>{votes.filter(vote => vote.upvotes > 0).length}</small><ArrowBigUp
                            onClick={handleUpvote} /></span>
                        <span className="flex flex-row items-center justify-center"><small>{votes.filter(vote => vote.downvotes > 0).length}</small><ArrowBigDownIcon
                            onClick={handleDownvote} /></span>
                    </div>
                </div>
                <h4 className="font-bold text-large text-wrap">{title}</h4>
            </CardHeader>
            <CardBody className="flex flex-col items-center justify-center">
                <picture>
                    <img
                        alt="Card background"
                        className=" object-fill rounded-xl w-full h-32"
                        src={image}
                    />
                </picture>
                <div className="grid grid-cols-2 gap-2 items-center w-full mt-3">
                    {labels.map((label) => (
                        <Chip key={label} variant="faded" color="warning">{label}</Chip>
                    ))}
                </div>
                <Button className="mt-5 flex flex-row gap-2" onClick={handleOpenBlog}><ArrowUpRightFromSquareIcon /> Read full article</Button>
                <FullBlog isOpen={isOpen} onClose={onClose} title={title} blogContent = {blogContent} labels={labels} _creationTime = {_creationTime} userName = {username} image={image}/>
                <UnsignedModalWarning status={status} setStatus={setStatus}/>
            </CardBody>
        </Card>
    );
};
