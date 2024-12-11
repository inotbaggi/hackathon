import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/joy';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../api/axois";

interface Vacancy {
    id: number;
    title: string;
    wage: string;
    tags: string[];
    position: string;
    description: string;
    ownerCompany: string;
    owner: string;
}

const VacancyDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);

    useEffect(() => {
        if (id) {
            fetchVacancy(id);
        }
    }, [id]);

    const fetchVacancy = async (vacancyId: string) => {
        try {
            const response = await api.get(`/api/v1/vacancies/${vacancyId}`);
            console.log(response.data);
            setVacancy(response.data);
        } catch (error) {
            console.error('Error fetching vacancy details:', error);
            navigate('/vacancies');
        }
    };

    if (!vacancy) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <Typography level="h4" className="text-gray-500">
                    Загрузка данных о вакансии...
                </Typography>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Button variant="soft" color="neutral" onClick={() => navigate('/vacancies')} className="mb-4">
                    Назад к списку вакансий
                </Button>

                <Card variant="outlined">
                    <CardContent>
                        <Typography level="h4" className="font-bold mb-4">
                            {vacancy.title}
                        </Typography>

                        <Stack spacing={2}>
                            <Typography level="body-sm" className="text-gray-700">
                                {vacancy.description}
                            </Typography>

                            <Typography level="body-sm" className="text-gray-700">
                                <strong>Зарплата:</strong> {vacancy.wage}
                            </Typography>

                            <Typography level="body-sm" className="text-gray-700">
                                <strong>Позиция:</strong> {vacancy.position}
                            </Typography>

                            <Button>Откликнуться</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VacancyDetailsPage;