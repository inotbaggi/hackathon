import React from 'react';
import { Card, CardContent, Typography, Stack, Divider } from '@mui/joy';
import { Button } from '@mui/joy';
import {useAuth} from "../AuthContext";
import {Navigate} from "react-router-dom";

const UserDashboard: React.FC = () => {
    const { profile, logout } = useAuth();
    console.log(profile);
    if (profile == null) return <div>kek</div>
    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Card variant="outlined" className="mb-6">
                    <CardContent>
                        <Typography level="h4" className="font-bold mb-2">
                            Личный кабинет
                        </Typography>
                        <Typography level="body-lg" className="text-gray-700 mb-1">
                            <strong>ФИО:</strong> {profile.fio}
                        </Typography>
                        <Typography level="body-lg" className="text-gray-700 mb-1">
                            <strong>Email:</strong> {profile.email}
                        </Typography>
                        <Typography level="body-lg" className="text-gray-700 mb-1">
                            <strong>Роль:</strong> {profile.role}
                        </Typography>
                        <Typography level="body-lg" className="text-gray-700 mb-1">
                            <strong>Статус верификации:</strong> {profile.verified ? 'Верифицирован' : 'Не верифицирован'}
                        </Typography>
                        {profile.verificationCanceled && (
                            <Typography level="body-md" className="text-red-600">
                                Верификация была отклонена.
                            </Typography>
                        )}
                    </CardContent>
                </Card>

                {profile.studentProfile && (
                    <ProfileCard
                        title="Профиль студента"
                        details={[
                            { label: 'Учебное заведение', value: profile.studentProfile.educationalInstitution },
                            { label: 'Группа', value: profile.studentProfile.group },
                        ]}
                    />
                )}

                {profile.teacherProfile && (
                    <ProfileCard
                        title="Профиль учителя"
                        details={[
                            { label: 'Учебное заведение', value: profile.teacherProfile.educationalInstitution },
                            { label: 'Предмет', value: profile.teacherProfile.subject },
                        ]}
                    />
                )}

                {profile.employerProfile && (
                    <ProfileCard
                        title="Профиль работодателя"
                        details={[
                            { label: 'Компания', value: profile.employerProfile.companyName },
                            { label: 'Должность', value: profile.employerProfile.position },
                        ]}
                    />
                )}

                {/* Logout Button */}
                <div className="mt-6 flex justify-end">
                    <Button variant="solid" color="danger" onClick={logout}>
                        Выйти из аккаунта
                    </Button>
                </div>
            </div>
        </div>
    );
};

interface ProfileCardProps {
    title: string;
    details: { label: string; value: string }[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, details }) => {
    return (
        <Card variant="outlined" className="mb-4">
            <CardContent>
                <Typography level="h4" className="font-bold mb-3">
                    {title}
                </Typography>
                <Stack spacing={2} divider={<Divider />}>
                    {details.map((detail, index) => (
                        <div key={index} className="flex justify-between text-gray-700">
                            <Typography level="body-lg" className="font-medium">
                                {detail.label}
                            </Typography>
                            <Typography level="body-lg">{detail.value}</Typography>
                        </div>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default UserDashboard;