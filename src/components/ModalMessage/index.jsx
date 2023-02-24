import React from 'react';

export function ModalMessage({ message }) {
    console.log(message)
    const { data } = message.response ? message.response : message;
    console.log(data)
    const bgColor = data.status === 'error' ? "bg-red-50" : "bg-green-50";
    const borderColor = data.status === 'error' ? "border-red-300" : "border-green-300";
    const textColor = data.status === 'error' ? "text-red-700" : "text-green-700";

    return (
        <div
            className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded relative`}
            role="alert"
        >
            <strong className="font-bold mb-4">{data.status.toUpperCase()}</strong>
            <span className="block">{data.message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        </div>
    );
}
