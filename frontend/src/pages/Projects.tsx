import React, {useEffect, useState} from "react";
import api from "../api/axois";
import {Button, Card, CardContent, Stack, Typography} from "@mui/joy";
import UserDashboard from "./Profile";

const Projects: React.FC = () => {
    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Typography level="h4" className="font-bold mb-6">
                    Проекты
                </Typography>

                {/*                <Input
                    placeholder="Поиск по названию, описанию или тегам"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="mb-6"
                />*/}

                <Stack spacing={4}>
                    <Card key="123" variant="outlined">
                        <CardContent>
                            <Typography level="h4" className="font-bold mb-2">
                                Хакатон IT-Tech 2025
                            </Typography>
                            <Typography level="body-lg" className="text-gray-700 mb-2">
                               РКСИ
                            </Typography>
                            <Typography level="body-lg" className="text-gray-500">
                                Online/Offline
                                От 2 до 6 человек на команду
                            </Typography>
                            <Button>Подробнее</Button>
                        </CardContent>
                    </Card>
                    <Card key="12" variant="outlined">
                        <CardContent>
                            <Typography level="h4" className="font-bold mb-2">
                                Еще один проект
                            </Typography>
                            <Typography level="body-lg" className="text-gray-700 mb-2">
                                Другая организация
                            </Typography>
                            <Typography level="body-lg" className="text-gray-500">
                                Offline
                                1 человек
                            </Typography>
                            <Button>Подробнее</Button>
                        </CardContent>
                    </Card>
                </Stack>
            </div>
        </div>
    );
};

export default Projects;