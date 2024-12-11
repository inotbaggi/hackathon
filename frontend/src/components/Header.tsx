import {Button, DialogTitle, Drawer} from "@mui/joy";
import React from "react";
import HeaderProfile from "./HeaderProfile";

export default function Header() {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="h-10">
            <Drawer open={open} onClose={() => setOpen(false)}>
                <DialogTitle>EduConnect</DialogTitle>
                <div className="p-4 flex flex-col items-center content-center">
                    <HeaderProfile/>
                </div>

            </Drawer>
            <header className="w-full bg-white p-4">
                <div
                    className="backdrop-blur-md container mx-auto flex items-center
                 bg-gray-100 rounded-2xl justify-between py-2 px-6 md:px-8 lg:px-10">

                <span className="text-xl font-bold cursor-pointer whitespace-nowrap"
                      onClick={() => (window.location.href = "/")}>
                    EduConnect
                </span>

                    <div className="hidden sm:flex items-center gap-4">
                        <HeaderProfile/>
                    </div>

                    <div className="sm:hidden">
                        <Button onClick={() => setOpen(true)}>A</Button>
                    </div>
                </div>
            </header>
        </div>

    )
}