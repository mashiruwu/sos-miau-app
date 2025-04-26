"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function Card() {
    const [isOpen, setIsOpen] = useState(false);

    // Close overlay when ESC key is pressed
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    // Prevent scrolling when overlay is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <button onClick={() => setIsOpen(true)} className="px-8">
                Open Fullscreen Overlay
            </button>
            {/* Fullscreen Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
                    {/* Close button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
                        aria-label="Close overlay"
                    >
                        <X className="h-8 w-8" />
                    </button>

                    {/* Overlay content */}
                    <div className="max-w-2xl w-full mx-auto p-6 text-white">
                        <h2 className="text-3xl font-bold mb-6 text-center">
                            Fullscreen Overlay
                        </h2>

                        <div className="space-y-4">
                            <p className="text-lg">
                                This is a fullscreen overlay that takes over the
                                entire viewport. It's perfect for important
                                messages, fullscreen menus, or immersive content
                                that requires the user's full attention.
                            </p>

                            <p className="text-lg">
                                You can close this overlay by:
                            </p>

                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Clicking the X button in the top-right
                                    corner
                                </li>
                                <li>Pressing the ESC key on your keyboard</li>
                                <li>Clicking the button below</li>
                            </ul>

                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    variant="outline"
                                    className="border-white text-white hover:bg-white hover:text-black"
                                >
                                    Close Overlay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Page content (visible when overlay is closed) */}
            <div className="mt-8 max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Main Page Content</h1>
                <p className="text-muted-foreground">
                    Click the button above to open the fullscreen overlay. This
                    content will be hidden when the overlay is open.
                </p>
            </div>
        </div>
    );
}
