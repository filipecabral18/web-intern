import { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/auth";
import {Header} from "../../components/Header";
import {api} from "../../services/api";


export function Profile() {
    const [isEditing, setIsEditing] = useState(false);

    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleEditCancel = () => {
        setIsEditing(false);
    }

    const handleSaveClick = async () => {
        const updated = {
            name,
            email,
        }

        const userUpdated = Object.assign(user, updated);

        await updateProfile({
            user: userUpdated,
        });

        setIsEditing(false);
    }


    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium mb-1">Name:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name || ''}
                                onChange={e => setName(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            />
                        ) : (
                            <div>{name}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium mb-1">Email:</label>
                        {isEditing ? (
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email || ''}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-md"
                            />
                        ) : (
                            <div>{email}</div>
                        )}
                    </div>
                    {isEditing ? (
                        <div className="flex justify-between">
                            <button onClick={handleSaveClick} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                            <button onClick={handleEditCancel} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                        </div>
                    ) : (
                        <button onClick={setIsEditing} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                    )}
                </div>
            </div>
        </>

    );


}
