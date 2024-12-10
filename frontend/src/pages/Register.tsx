// src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import {Button, TextField} from "@mui/joy";

const Register: React.FC = () => {
    const [fio, setFio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/v1/auth/register', { fio, email, password });
            alert('Регистрация успешна!');
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/*<TextField
                label="ФИО"
                value={fio}
                onChange={(e) => setFio(e.target.value)}
                required
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                sx={{ mb: 2 }}
            />*/}
            <Button type="submit" fullWidth>
                Зарегистрироваться
            </Button>
        </form>
    );
};

export default Register;