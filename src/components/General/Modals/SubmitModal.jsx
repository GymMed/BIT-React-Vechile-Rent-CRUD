import { useEffect, useRef, useState } from "react";
import { STATUSES_ENUM } from "../../../utils/enums/statusesManager";
import Button from "../Button";

export default function SubmitModal({
    children,
    onCancel = () => {},
    onOk = () => {},
    isOpen = false,
}) {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef(null);

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return;

        if (isModalOpen) modalElement.showModal();
        else modalElement.close();
    }, [isModalOpen]);

    return (
        <dialog
            ref={modalRef}
            className="fixed m-auto top-0 left-0 bottom-0 right-0 rounded-lg shadow-lg backdrop-blur-xl"
        >
            <div className="p-3 rounded-lg shadow-lg flex flex-col gap-3">
                {children}
                <div className="flex justify-between gap-3">
                    <Button
                        text="Ok"
                        status={STATUSES_ENUM.Success}
                        onClick={() => {
                            if (onOk) {
                                onOk();
                            }
                            // setModalOpen(false);
                        }}
                    />
                    <Button
                        text="Cancel"
                        status={STATUSES_ENUM.Error}
                        onClick={() => {
                            if (onCancel) {
                                onCancel();
                            }

                            // setModalOpen(false);
                        }}
                    />
                </div>
            </div>
        </dialog>
    );
}
