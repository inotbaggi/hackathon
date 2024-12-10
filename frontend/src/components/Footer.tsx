import {Button} from "@mui/joy";
import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-white h-10">
            <div
                className="backdrop-blur-md container mx-auto flex items-center
                 bg-gray-100 rounded-t-lg justify-between py-2 px-6 md:px-8 lg:px-10">

                <span>
                    <p>Разработано с ❤️ командой '52 строчка кода'</p>
                    <p>Специально для Хакатон «IT-Tech 2024»</p>
                </span>
            </div>
        </footer>
    )
}