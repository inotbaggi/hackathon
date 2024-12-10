import {useAuth} from "../AuthContext";
import Stack from "@mui/joy/Stack";
import {Button, Input} from "@mui/joy";
import React from "react";
import kek from "../asset/4.png";
import kek1 from "../asset/5.webp";

export default function NotVerified() {
    const {profile} = useAuth()

    if (profile?.verified == false && !profile.verificationCanceled) {
        return (
            <div className="container mx-auto my-auto flex flex-col
                 bg-gray-50 rounded-2xl items-center py-2 px-6 md:px-8 lg:px-10">
                <div className="pt-24 font-bold text-3xl text-center">
                    Твой профиль не верифицирован...
                </div>
                <div className="p-4 text-xl text-center">
                    Мы обязательно свяжемся с Вами для верификации личности!
                    <p>Просто стоит немножко подождать...</p>
                </div>
                <div>
                    <img src={kek} alt=""/>
                </div>
            </div>
        )
    }
    return (
        <div className="container mx-auto my-auto flex flex-col
                 bg-gray-50 rounded-2xl items-center py-2 px-6 md:px-8 lg:px-10">
            <div className="pt-24 font-bold text-3xl text-center">
                Верификация отклонена!
            </div>
            <div className="p-4 text-xl text-center">
                Увы, Вы не смогли доказать подлинность вашего профиля...
            </div>
            <div>
                <img src={kek1} alt=""/>
            </div>
        </div>
    )
}