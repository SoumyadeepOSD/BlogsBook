import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Chip } from "@nextui-org/react";
import Image from "next/image";


interface FullBlogProps {
    isOpen: boolean;
    onClose: () => void;
    blogContent: string;
    title: string;
    labels: string[];
    userName: string;
    image: string;
    _creationTime: string;
}


const dateAndTimeFormatter = (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
}

export const FullBlog = (
    { isOpen,
        onClose,
        title,
        userName,
        blogContent,
        image,
        labels,
        _creationTime
    }: FullBlogProps) => {
    const size = "full";
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
                                    <h6 className="text-sm font-medium">{dateAndTimeFormatter(_creationTime)}</h6>
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
                            <Image src={image} alt="blog" className="w-[50%] h-60  object-fill rounded-md mt-5" width={300} height={900}/>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: blogContent }} />
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
