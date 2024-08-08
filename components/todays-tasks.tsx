"use client"

import React, { createContext, useEffect, useState } from "react"
import Task from "./task"
import DeleteButton from "./delete-button"

interface TodaysTasksProps {
    children?: React.ReactNode
}

interface TaskData {
    activity: string
    done?: boolean
}

export const ActionContext = createContext<((data: any) => void) | undefined>(undefined);

export default function TodaysTasks({children}: TodaysTasksProps) {
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
            localStorage.setItem("todaysTasks", JSON.stringify(updatedTasks))
        }
    }

    const addTask = (data: TaskData) => {
        setTasksToday(prevTasks => {
            if (prevTasks === null) {
                localStorage.setItem("todaysTasks", JSON.stringify([data]))
                return [data]
            }

            localStorage.setItem("todaysTasks", JSON.stringify([data,...prevTasks]))
            return [data, ...prevTasks]
        })
    }

    return (
        <div className="bg-slate-200 rounded-lg p-5 pe-1 mb-5">
            <ActionContext.Provider value={addTask}>
                {children}
            </ActionContext.Provider>
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