// src/components/CourseEditor.tsx
import React, { useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

interface Course {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
}

interface Lesson {
    id: number;
    title: string;
    videoUrl: string;
    description: string;
    questions: Question[];
}

interface Question {
    id: number;
    text: string;
    answers: { [key: string]: boolean };
}

interface Answer {
    id: number;
    text: string;
    isCorrect: boolean;
}

const CourseEditor: React.FC = () => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [currentLessonTitle, setCurrentLessonTitle] = useState('');
    const [currentLessonVideoUrl, setCurrentLessonVideoUrl] = useState('');
    const [currentLessonDescription, setCurrentLessonDescription] = useState('');
    const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
    const [currentQuestionText, setCurrentQuestionText] = useState('');
    const [currentAnswerText, setCurrentAnswerText] = useState('');
    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);

    const handleAddAnswer = () => {
        if (currentAnswerText.trim()) {
            setCurrentAnswers([...currentAnswers, { id: currentAnswers.length + 1, text: currentAnswerText, isCorrect: false }]);
            setCurrentAnswerText('');
        }
    };

    const handleToggleAnswerCorrectness = (index: number) => {
        setCurrentAnswers(currentAnswers.map((answer, i) =>
            i === index ? { ...answer, isCorrect: !answer.isCorrect } : answer
        ));
    };

    const handleAddQuestion = () => {
        if (currentQuestionText.trim()) {
            const answersMap: { [key: string]: boolean } = {};
            currentAnswers.forEach(answer => {
                answersMap[answer.text] = answer.isCorrect;
            });
            setCurrentQuestions([...currentQuestions, { id: currentQuestions.length + 1, text: currentQuestionText, answers: answersMap }]);
            setCurrentQuestionText('');
            setCurrentAnswers([]);
        }
    };

    const handleAddLesson = () => {
        if (currentLessonTitle.trim()) {
            const newLesson: Lesson = {
                id: lessons.length + 1,
                title: currentLessonTitle,
                videoUrl: currentLessonVideoUrl,
                description: currentLessonDescription,
                questions: currentQuestions,
            };
            setLessons([...lessons, newLesson]);
            setCurrentLessonTitle('');
            setCurrentLessonVideoUrl('');
            setCurrentLessonDescription('');
            setCurrentQuestions([]);
            setCurrentQuestionText('');
            setCurrentAnswers([]);
            console.log('Added Lesson:', newLesson); // Добавляем логирование
        } else {
            console.log('Lesson title is empty'); // Добавляем логирование
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const course: Course = { id: 0, title: courseTitle, description: courseDescription, lessons: lessons };
        try {
            await axios.post('/api/courses', course);
            setCourseTitle('');
            setCourseDescription('');
            setLessons([]);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <Typography variant="h4">Конструктор курсов</Typography>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                    label="Название курса"
                    variant="outlined"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    required
                />
                <TextField
                    label="Описание курса"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    required
                />
                <Button variant="outlined" color="primary" onClick={() => setCurrentLessonTitle('New Lesson')}>
                    Добавить урок
                </Button>
                {lessons.map((lesson, index) => (
                    <Accordion key={lesson.id} className="mt-4">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{lesson.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label="Название урока"
                                variant="outlined"
                                value={lesson.title}
                                onChange={(e) => {
                                    const updatedLessons = [...lessons];
                                    updatedLessons[index].title = e.target.value;
                                    setLessons(updatedLessons);
                                }}
                                required
                            />
                            <TextField
                                label="Ссылка на видео"
                                variant="outlined"
                                value={lesson.videoUrl}
                                onChange={(e) => {
                                    const updatedLessons = [...lessons];
                                    updatedLessons[index].videoUrl = e.target.value;
                                    setLessons(updatedLessons);
                                }}
                                required
                            />
                            <TextField
                                label="Текстовое содержание"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={lesson.description}
                                onChange={(e) => {
                                    const updatedLessons = [...lessons];
                                    updatedLessons[index].description = e.target.value;
                                    setLessons(updatedLessons);
                                }}
                                required
                            />
                            <Button variant="outlined" color="primary" onClick={() => setCurrentQuestionText('')}>
                                Добавить новый вопрос
                            </Button>
                            {lesson.questions.map((question, qIndex) => (
                                <Card key={question.id} className="mt-4">
                                    <CardContent>
                                        <TextField
                                            label="Вопрос"
                                            variant="outlined"
                                            value={question.text}
                                            onChange={(e) => {
                                                const updatedLessons = [...lessons];
                                                updatedLessons[index].questions[qIndex].text = e.target.value;
                                                setLessons(updatedLessons);
                                            }}
                                            required
                                        />
                                        {Object.entries(question.answers).map(([answerText, correct], aIndex) => (
                                            <div key={aIndex} className="flex items-center space-x-2 mt-2">
                                                <TextField
                                                    label="Ответ"
                                                    variant="outlined"
                                                    value={answerText}
                                                    onChange={(e) => {
                                                        const updatedLessons = [...lessons];
                                                        const newAnswers = { ...updatedLessons[index].questions[qIndex].answers };
                                                        delete newAnswers[answerText];
                                                        newAnswers[e.target.value] = correct;
                                                        updatedLessons[index].questions[qIndex].answers = newAnswers;
                                                        setLessons(updatedLessons);
                                                    }}
                                                    required
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={correct}
                                                            onChange={(e) => {
                                                                const updatedLessons = [...lessons];
                                                                updatedLessons[index].questions[qIndex].answers[answerText] = e.target.checked;
                                                                setLessons(updatedLessons);
                                                            }}
                                                        />
                                                    }
                                                    label="Это верный ответ"
                                                />
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
                {currentLessonTitle && (
                    <Accordion className="mt-4">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Новый урок</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label="Название урока"
                                variant="outlined"
                                value={currentLessonTitle}
                                onChange={(e) => setCurrentLessonTitle(e.target.value)}
                                required
                            />
                            <TextField
                                label="Ссылка на видео"
                                variant="outlined"
                                value={currentLessonVideoUrl}
                                onChange={(e) => setCurrentLessonVideoUrl(e.target.value)}
                                required
                            />
                            <TextField
                                label="Текстовое содержание"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={currentLessonDescription}
                                onChange={(e) => setCurrentLessonDescription(e.target.value)}
                                required
                            />
                            <Button variant="outlined" color="primary" onClick={() => setCurrentQuestionText('')}>
                                Добавить новый вопрос
                            </Button>
                            {currentQuestionText && (
                                <Card className="mt-4">
                                    <CardContent>
                                        <TextField
                                            label="Текст вопроса"
                                            variant="outlined"
                                            value={currentQuestionText}
                                            onChange={(e) => setCurrentQuestionText(e.target.value)}
                                            required
                                        />
                                        <div className="flex space-x-4">
                                            <TextField
                                                label="Текст ответа"
                                                variant="outlined"
                                                value={currentAnswerText}
                                                onChange={(e) => setCurrentAnswerText(e.target.value)}
                                                required
                                            />
                                            <Button onClick={handleAddAnswer} variant="outlined" color="primary">
                                                Добавить ответ
                                            </Button>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-2">
                                            {currentAnswers.map((answer, index) => (
                                                <div key={answer.id} className="flex items-center space-x-2">
                                                    <TextField
                                                        label="Ответ"
                                                        variant="outlined"
                                                        value={answer.text}
                                                        onChange={(e) => {
                                                            const updatedAnswers = [...currentAnswers];
                                                            updatedAnswers[index].text = e.target.value;
                                                            setCurrentAnswers(updatedAnswers);
                                                        }}
                                                        required
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={answer.isCorrect}
                                                                onChange={(e) => handleToggleAnswerCorrectness(index)}
                                                            />
                                                        }
                                                        label="Это верный?"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <Button onClick={handleAddQuestion} variant="contained" color="primary">
                                            Добавить вопрос
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                            <Button onClick={handleAddLesson} variant="contained" color="primary">
                                Добавить урок
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                )}
                <Button type="submit" variant="contained" color="primary">
                    Создать курс
                </Button>
            </form>
        </div>
    );
};

export default CourseEditor;