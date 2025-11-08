import React from 'react';
import {Moon , Sun} from "lucide-react"
const ChangeTheme = () => {
    const {}
    return (
        <div className=" rounded-xl flex my-16 bg-gray-500 p-2 px-4  mx-10">
            <button className="flex items-center justify-center gap-2"><span><Moon /></span> Dark</button>
            <button className="flex items-center justify-center gap-2"><span><Sun /></span>Light</button>
        </div>
    );
};

export default ChangeTheme;