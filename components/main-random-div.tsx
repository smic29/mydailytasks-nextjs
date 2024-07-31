"use client"

import React, { ReactNode, useEffect, useState } from "react"

interface RandomDivProps {
    children?: React.FC | string | ReactNode
}

export default function RandomDiv({children}:RandomDivProps) {
    const [randomTask, setRandomTask] = useState<any>()

    const getRandomTask = async () => {
        try {
            const response = await fetch("/api/random-task")

            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const task = await response.json()
            setRandomTask(task["activity"])
            localStorage.setItem("randomTask", task["activity"])
        } catch(error:any) {
            console.error(error.message)
            setRandomTask("Error: Failed to get a task")
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem("randomTask")

        if (!storedData) {
            getRandomTask()
        } else {
            setRandomTask(storedData)
        }
    }, [])

    return (
        <div className="bg-slate-300 rounded-lg font-mono p-5 ease-in-out duration-300 hover:bg-slate-500 flex justify-between">
            { randomTask ? randomTask : "Loading... Remain calm.."}
            { children }
        </div>
    )
}