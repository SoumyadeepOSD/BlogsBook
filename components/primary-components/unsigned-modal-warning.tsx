import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UnsignedModalWarningProps {
  status: boolean,
  setStatus: any
}

export const UnsignedModalWarning = ({ status, setStatus }: UnsignedModalWarningProps) => {

  const handleClose = () => {
    setStatus(false);
  }
  const router = useRouter();
  return (
    <>
      <div className="flex flex-wrap gap-3">
      </div>
      <Modal backdrop="blur" isOpen={status}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning⚠️</ModalHeader>
              <ModalBody className="flex flex-col items-center justify-center">
                <Image src="./unauthorized.svg" alt="warning" width={200} height={200} />
                <p className="text-center text-red-600 font-extrabold">You need to be logged in to perform this action</p>
                <Button variant="shadow" color="success" onClick={() => router.replace("/home")}>
                  <h4 className="font-bold text-white">Login</h4>
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
