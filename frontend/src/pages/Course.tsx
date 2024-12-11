import React from "react";
import {Button, Card, CardContent, LinearProgress, Stack, Typography} from "@mui/joy";

const Course: React.FC = () => {
    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Typography level="h4" className="font-bold mb-6">
                    Курсы
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
                                Объектно-ориентированное программирование
                            </Typography>
                            <Typography level="body-lg" className="text-gray-700 mb-2">
                                15 уроков
                            </Typography>
                            <Button>Начать обучение</Button>
                        </CardContent>
                    </Card>
                    <Card key="12" variant="outlined">
                        <CardContent>
                            <Typography level="h4" className="font-bold mb-2">
                                Паттерны микросервисной архитектуры
                            </Typography>
                            <Typography level="body-lg" className="text-gray-700 mb-2 ">
                                9 уроков
                            </Typography>
                            <LinearProgress sx={{
                                "--LinearProgress-thickness": "22px"
                            }} determinate value={75}>75%</LinearProgress>
                            <Button>Продолжить обучение</Button>
                        </CardContent>
                    </Card>
                </Stack>
            </div>
        </div>
    );
};

export default Course;