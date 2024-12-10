import React, { useState } from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Input,
    Modal,
    ModalDialog,
    TextField
} from "@mui/joy";
import axios from "axios";
import Stack from "@mui/joy/Stack";
import api from "../api/axois";

const Login: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('api/v1/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/dashboard';
        } catch (error) {
            setError((error as Error).message);
            setOpen(true)
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto my-auto py-2 px-6 md:px-8 lg:px-10">
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        Ошибка!!!
                    </DialogTitle>
                    <Divider/>
                    <DialogContent>
                        {error}
                    </DialogContent>
                    <DialogActions >
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Закрыть
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
            <div className="container mx-auto my-auto flex flex-col
                 bg-gray-50 rounded-2xl items-center py-2 px-6 md:px-8 lg:px-10">
                <div className="font-bold text-2xl pt-12">
                    Авторизация
                </div>
                <form onSubmit={handleSubmit} className="p-12">
                    <Stack spacing={1}>
                        <Input size="lg" type="email" placeholder="Почта" required/>
                        <Input size="lg" type="password" placeholder="Пароль" required/>
                        <Button size="lg" type="submit">Войти</Button>
                    </Stack>
                </form>
            </div>
        </div>
    );
};

export default Login;