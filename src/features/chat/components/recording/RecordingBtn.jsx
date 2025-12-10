import React, {useState} from 'react';
import {Mic} from "lucide-react";

const RecordingBtn = ({sendMessage}) => {
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = () => {
        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            sendMessage("پیام صوتی تست");
        }, 2000);
    };

    return (
            <button
                type="button"
                onClick={startRecording}
                className={`p-2.5 md:p-3 rounded-full transition-all shrink-0 ${
                    isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
                {isRecording ? (
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full mx-auto"/>
                ) : (
                    <Mic className="w-5 h-5 md:w-6 md:h-6"/>
                )}
            </button>
    );
};

export default RecordingBtn;