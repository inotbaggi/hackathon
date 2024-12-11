import React, { useEffect, useState } from 'react';
import {Card, CardContent, TextField, Typography, Stack, Select, Option, Button, Input} from '@mui/joy';
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

const VacancySearchPage: React.FC = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([]);

    useEffect(() => {
        fetchVacancies();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, vacancies]);

    const fetchVacancies = async () => {
        try {
            const response = await api.get('/api/v1/vacancies');
            setVacancies(response.data);
        } catch (error) {
            console.error('Error fetching vacancies:', error);
        }
    };

    const handleSearch = () => {
        const filtered = vacancies.filter(vacancy =>
            vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vacancy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vacancy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredVacancies(filtered);
    };

    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Typography level="h4" className="font-bold mb-6">
                    Вакансии и стажировки
                </Typography>

{/*                <Input
                    placeholder="Поиск по названию, описанию или тегам"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="mb-6"
                />*/}

                <Stack spacing={4}>
                    {filteredVacancies.map(vacancy => (
                        <Card key={vacancy.id} variant="outlined">
                            <CardContent>
                                <Typography level="h4" className="font-bold mb-2">
                                    {vacancy.title}
                                </Typography>
                                <Typography level="body-lg" className="text-gray-700 mb-2">
                                    {vacancy.ownerCompany} ({vacancy.owner})
                                </Typography>
                      {/*          <Typography level="body-lg" className="text-gray-500">
                                    Теги: {vacancy.tags.join(', ')}
                                </Typography>*/}
                                <Typography level="body-lg" className="text-gray-500">
                                    Зарплата: {vacancy.wage}
                                </Typography>
                                <Typography level="body-lg" className="text-gray-500">
                                    Позиция: {vacancy.position}
                                </Typography>
                                <Button onClick={() => window.location.href = `/vacancies/${vacancy.id}`}>Подробнее</Button>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                {filteredVacancies.length === 0 && (
                    <Typography level="body-lg" className="text-center text-gray-500 mt-4">
                        Вакансии не найдены.
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default VacancySearchPage;