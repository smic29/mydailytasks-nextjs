"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { Button } from "./ui/button"

interface RandomDivProps {
    children?: React.FC | string | ReactNode
}

export default function RandomDiv({children}:RandomDivProps) {
    const [randomTask, setRandomTask] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getRandomTask = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/random-task")

            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const task = await response.json()
            setRandomTask(task["activity"])
            localStorage.setItem("randomTask", task["activity"])
            setIsLoading(false)
        } catch(error:any) {
            console.error(error.message)
            setRandomTask("Error: Failed to get a task")
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem("randomTask")

        if (!storedData) {
            getRandomTask()
        } else {
            setRandomTask(storedData)
            setIsLoading(false)
        }
    }, [])

    return (
        <div className="bg-slate-300 rounded-lg font-mono p-5 flex justify-between items-center">
            { isLoading ? "Searching..." : randomTask}
            <Button className="ms-3" onClick={getRandomTask}>
                {isLoading ? "Randomizing..." : "Randomize"}
            </Button>
            { children }
        </div>
    )
}