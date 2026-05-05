/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import PATCHDATA from '@/app/default/functions/Patch'
import { useState } from 'react'

export default function StudentProfileUpdate() {
    const [bio, setBio] = useState('');
    const [originalBio, setOriginalBio] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [charCount, setCharCount] = useState(0);

 

    const handleBioChange = (e:any) => {
        const newBio = e.target.value;
        if (newBio.length <= 500) {
            setBio(newBio);
            setCharCount(newBio.length);
        }
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        if (!bio.trim()) {
            setMessage({ type: 'error', text: 'Bio cannot be empty' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const updateData = {
                bio: bio.trim()
            };

            const response = await PATCHDATA('/v1/student/update/profile', updateData);
            
            if (response.success) {
                setMessage({ 
                    type: 'success', 
                    text: response.message || 'Profile updated successfully!' 
                });
                setOriginalBio(bio.trim());
                
                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                }, 3000);
            } else {
                setMessage({ 
                    type: 'error', 
                    text: response.message || 'Failed to update profile' 
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ 
                type: 'error', 
                text: 'An error occurred while updating your profile' 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setBio(originalBio);
        setCharCount(originalBio.length);
        setMessage({ type: '', text: '' });
    };



    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Profile Bio</h2>
            
            {message.text && (
                <div className={`mb-4 p-3 rounded-lg ${
                    message.type === 'success' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={handleBioChange}
                        placeholder="Tell us about yourself, your interests, and your learning goals..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                        disabled={loading}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-gray-500">
                            {charCount}/500 characters
                        </div>
                        {charCount === 500 && (
                            <div className="text-xs text-orange-500">
                                Maximum character limit reached
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading || bio === originalBio}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            loading || bio === originalBio
                                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </span>
                        ) : (
                            'Update Bio'
                        )}
                    </button>
                    
                    {(bio !== originalBio) && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="px-4 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}