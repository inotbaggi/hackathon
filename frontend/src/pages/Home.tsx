import React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import {Image} from "@mui/icons-material";
import kek from "../asset/1.png"
import {Button} from "@mui/joy";

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
            <Button size="lg">
                Начать
            </Button>
            <div>
                <img src={kek} alt=""/>
            </div>
        </div>
    );
};

export default Home;