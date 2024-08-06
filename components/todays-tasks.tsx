"use client"

import React, { ReactNode, useEffect, useState } from "react"
import Task from "./task"
import { Button } from "./ui/button"

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

        if (updatedTasks) {
            setTasksToday(updatedTasks)
            localStorage.setItem("todaysTasks", JSON.stringify(updatedTasks))
        }
    }

    return (
        <div className="bg-slate-200 rounded-lg p-5 pe-1 mb-5">
            {children}
            {TasksToday ? TasksToday.map((data, index) => {
                return (
                    <div className="flex justify-between items-center group">
                    <Task data={data} key={index} onClick={handleTaskClick}></Task>
                    <Button variant="ghost" className="hidden opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="fill-red-600 stroke-slate-600 stroke-2 size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </Button>
                    </div>
                )
            }) : 
            "Loading Tasks"
            }
        </div>
    )
}