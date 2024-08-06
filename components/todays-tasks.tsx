"use client"

import React, { useEffect, useState } from "react"
import Task from "./task"
import DeleteButton from "./delete-button"

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

    const deleteTask = (data: TaskData) => {
        const updatedTasks:TaskData[] | undefined = TasksToday?.filter(task => task.activity !== data.activity)
        
        if (updatedTasks) {
            setTasksToday(updatedTasks)
            // localStorage.setItem("todaysTasks", JSON.stringify(updatedTasks))
            // Will uncomment after implementing task Addition
        }
    }

    return (
        <div className="bg-slate-200 rounded-lg p-5 pe-1 mb-5">
            {children}
            {TasksToday ? TasksToday.map((data, index) => {
                return (
                    <div key={index} className="flex justify-between items-center group">
                        <Task data={data} onClick={handleTaskClick}></Task>
                        <DeleteButton data={data} onClick={deleteTask}/>
                    </div>
                )
            }) : 
            "Loading Tasks"
            }
        </div>
    )
}