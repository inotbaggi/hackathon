import React from "react";
import {Button, Card, CardContent, Divider, LinearProgress, Stack, Typography} from "@mui/joy";

const Portfolio: React.FC = () => {
    return (
        <div className="p-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Stack spacing={4}>
                    <div className="pt-8 font-bold text-2xl text-center">
                        Твое портфолио
                    </div>
                    <div className="p-4 text-xl text-center">
                        EduConnect автоматически формирует твое портфолио основываясь на твоей активности!
                    </div>
                    <Button size="lg">Экспортировать</Button>
                    <Card key="12" variant="outlined">
                        <CardContent>
                            <Typography level="h4" className="font-bold mb-2">
                                Пройденные курсы
                            </Typography>
                            <div>
                                <p>Курс 1</p>
                                <p>Курс 2</p>
                                <p>Курс 3</p>
                                <p>Курс 4</p>
                                <p>Курс 5</p>
                                <p>Курс 6</p>
                                <p>Курс 7</p>
                                <p>Курс 8</p>
                            </div>
                            <Typography level="body-lg" className="text-gray-700 mb-2">
                                Очень неплохо! Но для полноты мы составили список рекомендаций курсов
                            </Typography>
                            <LinearProgress sx={{
                                "--LinearProgress-thickness": "22px"
                            }} determinate value={55}>55%</LinearProgress>
                            <Button>Перейти к рекомендациям</Button>
                        </CardContent>
                        <Divider></Divider>
                        <CardContent>
                            <Typography level="h4" className="font-bold mb-2">
                                Награды
                            </Typography>
                            <div>
                                <p>1 место в конкурсе "конкурс"</p>
                                <p>3 место в конкурсе "конкурс 2"</p>
                                <p>Принимал участие в "конкурс 3"</p>
                            </div>
                            <Typography level="body-lg" className="text-gray-700 mb-2">
                                Прямо сейчас проходит набор на несколько мероприятий!! Твои рекомендации уже составлены, скорее жми!
                            </Typography>
                            <Button>Перейти к рекомендациям</Button>
                        </CardContent>
                    </Card>
                </Stack>
            </div>
        </div>
    );
};

export default Portfolio;