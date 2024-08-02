import React from "react"

interface TodaysTasksProps {
    children?: React.FC
}

export default function TodaysTasks({children = null}) {

    return (
        <div className="bg-slate-200 rounded-lg p-5 mb-5">
            Hello World!
            {children}
        </div>
    )
}