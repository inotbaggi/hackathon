import React, {useState} from 'react';
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

import Stack from "@mui/joy/Stack";
import api from "../api/axois";
import Cookies from "js-cookie";
import {Authorized, UserDTO} from "../types";
import {useAuth} from "../AuthContext";

const Login: React.FC = () => {
    const {setToken, setProfile} = useAuth();
    const [open, setOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('api/v1/auth/login', {email, password});
            const data = (response.data as Authorized)
            if (data.role == null) {
                setError("Пользователь не имеет роли! Сообщи в тех поддержку")
                setOpen(true)
                return
            }
            setToken(data.token)
            Cookies.set('role', data.role);

            const responseUser = await api.get(`api/v1/users/${data.id}`);
            const dataUser = (responseUser.data as UserDTO)
            setProfile(dataUser)
            window.location.href = '/profile';
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
                    <DialogActions>
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
                <form onSubmit={handleSubmit} className="pt-12">
                    <Stack spacing={1}>
                        <Input size="lg" type="email" placeholder="Почта" onChange={(e) => setEmail(e.target.value)}
                               required/>
                        <Input size="lg" type="password" placeholder="Пароль"
                               onChange={(e) => setPassword(e.target.value)} required/>
                        <Button size="lg" type="submit">Войти</Button>
                    </Stack>
                </form>
                <div className="p-4 text-blue-500 cursor-pointer" onClick={() => window.location.href = '/register'}>
                    Нет аккаунта? Зарегистрируйся!
                </div>
            </div>
        </div>
    );
};

export default Login;