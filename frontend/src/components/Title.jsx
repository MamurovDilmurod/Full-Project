import React from 'react'

function Title({ text1, text2 }) {
    return (
        <div className="inline-flex items-center gap-2 mb-3">
            <div>
                <span className="text-gray-500">{text1}</span>
                <span className="font-medium text-gray-700">{text2}</span>
            </div>
            <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
        </div>
    );
}

export default Title