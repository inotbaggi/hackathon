import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Card, Typography, Divider, Stack} from '@mui/joy';
import {useNavigate, useParams} from 'react-router-dom';
import api from "../api/axois";
import {useAuth} from "../AuthContext";

interface Course {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
    completed: boolean;
}

interface Lesson {
    id: number;
    title: string;
    videoUrl: string;
    description: string;
    test: TestQuestion[];
}

interface TestQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

// Page: All Courses
export const AllCourses: React.FC = () => {
    const {profile} = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="p-6">
            <Typography level="h4" className="font-bold mb-6">Все курсы</Typography>
            <Stack spacing={4}>
                {courses.map(course => (
                    <Card key={course.id} variant="outlined" className="p-4">
                        <Typography level="h4" className="font-bold">{course.title}</Typography>
                        <Typography className="text-gray-700 mb-4">{course.description}</Typography>
                        {profile && course.completed && (
                            <Typography level="body-sm" className="text-green-600">Курс завершен</Typography>
                        )}
                        <Button onClick={() => navigate(`/courses/${course.id}`)}>Открыть</Button>
                    </Card>
                ))}
            </Stack>
        </div>
    );
};

// Page: Course Details
export const CourseDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/api/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse();
    }, [id]);

    if (!course) return <Typography>Загрузка...</Typography>;

    return (
        <div className="p-6">
            <Typography level="h4" className="font-bold mb-6">{course.title}</Typography>
            <Typography className="text-gray-700 mb-6">{course.description}</Typography>
            <Divider className="mb-4"/>
            <Typography level="h4" className="font-bold mb-4">Уроки</Typography>
            <Stack spacing={4}>
                {course.lessons.map(lesson => (
                    <Card key={lesson.id} variant="outlined" className="p-4">
                        <Typography level="h4" className="font-bold">{lesson.title}</Typography>
                        <Button onClick={() => navigate(`/courses/${id}/lessons/${lesson.id}`)} className="mt-4">
                            Открыть урок
                        </Button>
                    </Card>
                ))}
            </Stack>
        </div>
    );
};

// Page: Lesson Details
export const LessonDetails: React.FC = () => {
    const {courseId, lessonId} = useParams<{ courseId: string; lessonId: string }>();
    const [lesson, setLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`/api/courses/${courseId}/lessons/${lessonId}`);
                setLesson(response.data);
            } catch (error) {
                console.error('Error fetching lesson:', error);
            }
        };
        fetchLesson();
    }, [courseId, lessonId]);

    if (!lesson) return <Typography>Загрузка...</Typography>;

    return (
        <div className="p-6">
            <Typography level="h4" className="font-bold mb-6">{lesson.title}</Typography>
            <iframe
                width="100%"
                height="400"
                src={lesson.videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mb-6"
            />
            <Typography className="text-gray-700 mb-6">{lesson.description}</Typography>
            <Divider className="mb-4"/>
            <Typography level="h4" className="font-bold mb-4">Тест</Typography>
            {lesson.test.map((question, index) => (
                <Card key={index} variant="outlined" className="p-4 mb-4">
                    <Typography>{question.question}</Typography>
                    <Stack spacing={2} className="mt-2">
                        {question.options.map((option, idx) => (
                            <Button key={idx} variant="outlined" className="text-left">
                                {option}
                            </Button>
                        ))}
                    </Stack>
                </Card>
            ))}
        </div>
    );
};
