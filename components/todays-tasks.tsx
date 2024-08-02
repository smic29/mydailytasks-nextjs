"use client"

import React, { ReactNode, useEffect, useState } from "react"
import Task from "./task"

interface TodaysTasksProps {
    children?: React.FC
}

interface TaskData {
    activity: string
    done?: boolean
}


export default function TodaysTasks({children = null}) {
    const [TasksToday, setTasksToday] = useState<TaskData[] | null>(null)
    
    useEffect(() => {
        console.log(`TodaysTasks Component Mounted`)

        const storedData = localStorage.getItem("todaysTasks")
        
        if (storedData) {
            setTasksToday(JSON.parse(storedData))
        } else {
            setTasksToday([{activity: "NONE"}])
        }

    }, [])

    const handleTaskClick = (data: TaskData) => {
        const updatedTasks:TaskData[] | undefined = TasksToday?.map((task) => {
            if (task.activity === data.activity) {
                return {
                    ...task,
                    done: !task.done
                }
            }
            return task
        })

        if (updatedTasks) setTasksToday(updatedTasks)
    }

    return (
        <div className="bg-slate-200 rounded-lg p-5 mb-5">
            {children}
            {TasksToday ? TasksToday.map((data, index) => {
                return (
                    <Task data={data} key={index} onClick={handleTaskClick}></Task>
                )
            }) : 
            "Loading Tasks"
            }
        </div>
    )
}