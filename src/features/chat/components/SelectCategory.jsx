import React from 'react';
import {ChevronDown} from "lucide-react";

const categoriesMap = [
    {name: "distribution", labelFa: "توزیع برق"},
    {name: "power_control", labelFa: "مدیریت نیرو"},
]
const SelectCategory = ({setSelectedCategory, selectedCategory}) => {

    return (
        <div className="relative group hidden md:block gap-3 mr-2">
            <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none text-sm text-gray-400 font-medium rounded-lg
                        cursor-pointer py-2 pl-2 pr-7 border border-gray-500">
                <option value="" selected>انتخاب دسته بندی</option>
                {categoriesMap.map((category, index) => (
                    <option key={index} value={category.name}>
                        {category.labelFa}
                    </option>
                ))}
            </select>

            <ChevronDown
                className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600"/>
        </div>
    );
};

export default SelectCategory;