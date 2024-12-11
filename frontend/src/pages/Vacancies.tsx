import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Stack,
    Divider,
    Select,
    Option,
    Input,
    Textarea
} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../AuthContext";
import api from "../api/axois";

interface Vacancy {
    id?: number;
    title: string;
    wage: string;
    tags: string[];
    position: string;
    description: string;
    owner: number;
}

const EmployerVacancies: React.FC = () => {
    const { profile, userId } = useAuth();
    const navigate = useNavigate();
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newVacancy, setNewVacancy] = useState<Vacancy>({
        title: '',
        wage: '',
        tags: [],
        position: '',
        description: '',
        owner: userId == null ? -1 : userId
    });

    useEffect(() => {
        fetchVacancies();
    }, [profile, navigate]);

    const fetchVacancies = async () => {
        try {
            const response = await api.get('/api/v1/vacancies');
            setVacancies(response.data);
        } catch (error) {
            console.error('Error fetching vacancies:', error);
        }
    };

    const handleCreateVacancy = async () => {
        try {
            await api.post('/api/v1/vacancies', newVacancy);
            setNewVacancy({ title: '', wage: '', tags: [], position: '', description: '', owner: userId == null ? -1 : userId });
            fetchVacancies();
        } catch (error) {
            console.error('Error creating vacancy:', error);
        }
    };

    const handleDeleteVacancy = async (id: number) => {
        try {
            await axios.delete(`/api/v1/vacancies/${id}`);
            fetchVacancies();
        } catch (error) {
            console.error('Error deleting vacancy:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewVacancy({ ...newVacancy, [e.target.name]: e.target.value });
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewVacancy({ ...newVacancy, tags: e.target.value.split(',').map(tag => tag.trim()) });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Typography level="h4" className="font-bold mb-6">
                    Управление вакансиями
                </Typography>

                <Card variant="outlined" className="mb-6">
                    <CardContent>
                        <Typography level="h4" className="font-bold mb-4">
                            Создать вакансию
                        </Typography>
                        <Stack spacing={2}>
                            <Input
                                placeholder="Название вакансии"
                                name="title"
                                value={newVacancy.title}
                                onChange={handleInputChange}
                            />
                            <Input
                                placeholder="Зарплата"
                                name="wage"
                                value={newVacancy.wage}
                                onChange={handleInputChange}
                            />
                            <Input
                                placeholder="Теги (через запятую)"
                                name="tags"
                                value={newVacancy.tags.join(', ')}
                                onChange={handleTagsChange}
                            />
                            <Input
                                placeholder="Позиция"
                                name="position"
                                value={newVacancy.position}
                                onChange={handleInputChange}
                            />
                            <Textarea
                                placeholder="Описание вакансии"
                                name="description"
                                value={newVacancy.description}
                                onChange={handleInputChange}
                            />
                            <Button onClick={handleCreateVacancy} variant="solid" color="primary">
                                Создать
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>

                <Typography level="h4" className="font-bold mb-4">
                    Мои вакансии
                </Typography>
                <Stack spacing={4}>
                    {vacancies.map(vacancy => (
                        <Card key={vacancy.id} variant="outlined">
                            <CardContent>
                                <Typography level="h4" className="font-bold mb-2">
                                    {vacancy.title}
                                </Typography>
                                <Typography level="body-lg" className="text-gray-500">
                                   {vacancy.wage}
                                </Typography>
                                <div className="flex justify-end mt-4 gap-2">
                                    <Button
                                        variant="solid"
                                        color="danger"
                                        onClick={() => vacancy.id && handleDeleteVacancy(vacancy.id)}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </div>
        </div>
    );
};

export default EmployerVacancies;
