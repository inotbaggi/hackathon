import React, { useState } from 'react';
import { Input, Button, Select, Option, Stack } from '@mui/joy';
import { Modal, ModalDialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/joy';
import api from "../api/axois";

export enum RegisterAccountType {
    NONE = "NONE",
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    EMPLOYER = "EMPLOYER",
}

const Register: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fio, setFio] = useState('');
    const [accountType, setAccountType] = useState<RegisterAccountType>(RegisterAccountType.NONE);

    // Specific fields for profiles
    const [educationalInstitution, setEducationalInstitution] = useState('');
    const [group, setGroup] = useState('');
    const [subject, setSubject] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {
                fio,
                email,
                password,
                role: accountType, // Use accountType as the `role`
                educationalInstitution: accountType === RegisterAccountType.STUDENT || accountType === RegisterAccountType.TEACHER ? educationalInstitution : null,
                group: accountType === RegisterAccountType.STUDENT ? group : null,
                subject: accountType === RegisterAccountType.TEACHER ? subject : null,
                companyName: accountType === RegisterAccountType.EMPLOYER ? companyName : null,
                position: accountType === RegisterAccountType.EMPLOYER ? position : null,
            };

            const response = await api.post('api/v1/auth/register', data);
            console.log('Registration successful:', response.data);
            alert(response.data);
            window.location.href = '/dashboard';
        } catch (error) {
            setError((error as Error).message);
            setOpen(true);
        }
    };

    const renderForm = () => {
        switch (accountType) {
            case RegisterAccountType.STUDENT:
                return (
                    <div className="flex flex-col gap-4">
                        <Input
                            size="lg"
                            placeholder="Учебное заведение"
                            value={educationalInstitution}
                            onChange={(e) => setEducationalInstitution(e.target.value)}
                            required
                        />
                        <Input
                            size="lg"
                            placeholder="Группа"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            required
                        />
                    </div>
                );
            case RegisterAccountType.TEACHER:
                return (
                    <div className="flex flex-col gap-4">
                        <Input
                            size="lg"
                            placeholder="Учебное заведение"
                            value={educationalInstitution}
                            onChange={(e) => setEducationalInstitution(e.target.value)}
                            required
                        />
                        <Input
                            size="lg"
                            placeholder="Предмет"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>
                );
            case RegisterAccountType.EMPLOYER:
                return (
                    <div className="flex flex-col gap-4">
                        <Input
                            size="lg"
                            placeholder="Название компании"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                        <Input
                            size="lg"
                            placeholder="Должность"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>Ошибка!!!</DialogTitle>
                    <Divider />
                    <DialogContent>{error}</DialogContent>
                    <DialogActions>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Закрыть
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
            <div className="container mx-auto flex flex-col bg-gray-50 rounded-2xl items-center py-6 px-4 md:px-6 lg:px-8">
                <div className="font-bold text-2xl pt-4">Регистрация</div>
                <form onSubmit={handleSubmit} className="pt-6">
                    <Stack spacing={2}>
                        <Input
                            size="lg"
                            type="email"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            size="lg"
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Input
                            size="lg"
                            placeholder="ФИО"
                            value={fio}
                            onChange={(e) => setFio(e.target.value)}
                            required
                        />
                        <Select
                            size="lg"
                            value={accountType}
                            onChange={(e, value) => setAccountType(value as RegisterAccountType)}
                            required
                            placeholder="Выберите тип аккаунта"
                        >
                            <Option value={RegisterAccountType.STUDENT}>Студент</Option>
                            <Option value={RegisterAccountType.TEACHER}>Преподаватель</Option>
                            <Option value={RegisterAccountType.EMPLOYER}>Работодатель</Option>
                        </Select>
                        {renderForm()}
                        <Button size="lg" type="submit">
                            Зарегистрироваться
                        </Button>
                    </Stack>
                </form>
                <div
                    className="pt-4 text-blue-500 cursor-pointer"
                    onClick={() => (window.location.href = '/login')}
                >
                    Уже есть аккаунт? Войти!
                </div>
            </div>
        </div>
    );
};

export default Register;
