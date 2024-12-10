import React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import {Image} from "@mui/icons-material";
import kek from "../asset/1.png"
import kek2 from "../asset/2.jpg"
import kek3 from "../asset/3.jpg"
import {Button, Divider} from "@mui/joy";

const Home: React.FC = () => {
    return (
        <div className="py-2 px-6 md:px-8 lg:px-10 pb-4 flex flex-col items-center">
            <div className="pt-24 font-bold text-5xl text-center">
                Платформа прокладывающая путь в будущее!
            </div>
            <div className="p-4 text-xl text-center">
                Объединяем студентов, преподавателей и работодателей в единой экосистеме,
                <p>
                    чтобы качественное образование вело к успеху!
                </p>
            </div>
            <Button size="lg" onClick={() => {
                window.location.href = "/profile"
            }}>
                Начать
            </Button>
            <div>
                <img src={kek} alt=""/>
            </div>
            <Divider/>
            <div className="pt-24 font-bold text-3xl text-center">
                Что мы предлагаем
            </div>
            <div className="pt-8 flex flex-row gap-4 items-center">
                <Card>
                    <div className="font-bold text-base text-center">
                        Увлекательные курсы
                    </div>
                    <div className="text-base text-center">
                        Максимум информации, без воды
                        <p>с мгновенной обратной связью!</p>
                    </div>
                    <img src={kek2} height={256} width={256} alt=""/>
                </Card>
                <Card>
                <div className="font-bold text-base text-center">
                        Цифровое портфолио
                    </div>
                    <div className="text-base text-center">
                        Ого! Портфолио само собирается
                        <p>из вашей активности!</p>
                    </div>
                    <img src={kek3} height={256} width={256} alt=""/>
                </Card>
            </div>
        </div>
    );
};

export default Home;