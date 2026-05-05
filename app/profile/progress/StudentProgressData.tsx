/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import GETDATA from '@/app/default/functions/GetData'
import  { useEffect, useState } from 'react'

export default function StudentProgressData() {
    const [progressData, setProgressData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProgressData();
    }, []);

    const fetchProgressData = async () => {
        try {
            setLoading(true);
            const res = await GETDATA('/v1/course-progress/student/progress');
            
            if (res.success) {
                setProgressData(res.data);
            } else {
                setError(res.message || 'Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
            console.error('Error fetching progress:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="text-gray-500">Loading progress data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!progressData || progressData.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="text-gray-500">No progress data available</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Progress Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {progressData.map((course:any) => (
                    <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {course.course.title}
                                </h2>
                                {course.isCompleted && (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        Completed
                                    </span>
                                )}
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Progress</span>
                                    <span>{course.progressPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className={`h-2.5 rounded-full transition-all duration-500 ${
                                            course.progressPercentage === 100 ? 'bg-green-600' : 'bg-blue-600'
                                        }`}
                                        style={{ width: `${course.progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Completed Lessons:</span>
                                    <span className="font-medium">{course.completedLessons.length} / {course.totalLessons}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Last Updated:</span>
                                    <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            
                            {course.completedLessons.length > 0 && (
                                <div className="mt-4">
                                    <button 
                                        onClick={() => {
                                            const modal = document.getElementById(`modal-${course._id}`);
                                            if (modal) modal.classList.toggle('hidden');
                                        }}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View Completed Lessons →
                                    </button>
                                    
                                    {/* Modal for completed lessons */}
                                    <div 
                                        id={`modal-${course._id}`} 
                                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                                        onClick={(e) => {
                                            if (e.target === e.currentTarget) {
                                                e.currentTarget.classList.add('hidden');
                                            }
                                        }}
                                    >
                                        <div className="bg-white rounded-lg max-w-md w-full p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-xl font-semibold">Completed Lessons</h3>
                                                <button 
                                                    onClick={() => {
                                                        const modal = document.getElementById(`modal-${course._id}`);
                                                        if (modal) modal.classList.add('hidden');
                                                    }}
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {course.completedLessons.map((lesson:any) => (
                                                    <div key={lesson._id} className="p-3 bg-gray-50 rounded-lg">
                                                        <p className="text-gray-800">{lesson.title}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}