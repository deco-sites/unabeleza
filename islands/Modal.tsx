import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";

interface ModalProps {
    title: string,
    children: ComponentChildren
    cta: string
}

export default function Modal({ title, children, cta }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                class="w-fit font-bold text-xs text-primary cursor-pointer uppercase hover:underline decoration-primary"
            >
                {cta}
            </button>
            {
                isOpen && (
                    <div class="fixed inset-0 bg-black bg-opacity-50 z-[100]">
                        <div class="p-5 mobile:p-4 w-[38.19vw] mobile:w-[calc(100vw_-_32px)] max-h-[85.45vh] h-fit bg-white rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div class="flex justify-between mb-6">
                                <span class="text-xl font-bold mobile:text-lg">{title}</span>
                                <button onClick={() => setIsOpen(false)}>
                                    <Icon id="close" width="25" height="25" />
                                </button>
                            </div>
                            <div class="w-full">
                                {children}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}