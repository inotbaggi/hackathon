import {useAuth} from "../AuthContext";
import {Button} from "@mui/joy";
import React from "react";

export default function HeaderProfile() {
    const {profile} = useAuth()
    return (
        <>
            {profile == null ? <Button onClick={() => (window.location.href = "/login")}>Войти</Button> :
                <Button onClick={() => (window.location.href = "/profile")}>Личный кабинет</Button>}
        </>
    )
}