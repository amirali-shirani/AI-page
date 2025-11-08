import { useState } from 'react';
import {SendHorizontal,Mic , Paperclip} from "lucide-react"

export default function MessageInput({ onSend }) {
    const [message, setMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const startRecording = () => {
        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            onSend("این یک پیام صوتی تست است");
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-end space-x-3">
                <button
                    type="button"
                    onClick={startRecording}
                    className={`p-3 mb-2.5 cursor-pointer rounded-full transition-all ${
                        isRecording
                            ? 'bg-red-500 text-white animate-pulse-slow'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                    {isRecording ? (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto" />
                    ) : (
                        <Mic  className="text-xl" />
                    )}
                </button>

                <div className="flex-1 relative">
          <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl p-4
              pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[50px] max-h-[200px]"
              rows="1"
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
          />
                    <button
                        type="button"
                        className="absolute top-2 left-3 bottom-3 text-gray-500 hover:text-blue-500 transition-colors">
                        <Paperclip  className="text-xl" />
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={!message.trim()}
                    className={`p-4 mb-2 cursor-pointer rounded-full transition-all ${
                        message.trim()
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' +
                            ' hover:from-blue-600 hover:to-purple-700'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    <SendHorizontal />
                </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center">
                Shift + Enter برای خط جدید
            </p>
        </form>
    );
}