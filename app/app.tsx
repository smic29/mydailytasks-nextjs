"use client"

import { useEffect, useState } from "react"

export default function HomeApp() {
    const [randomTask, setRandomTask] = useState<any>()
    
    useEffect(() => {
        const getRandomTask = async () => {
            try {
                const response = await fetch("/api/random-task")
        
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
        
                const json = await response.json();
                setRandomTask(json["activity"])
                localStorage.setItem("randomTask", json["activity"])
            } catch(error:any) {
                console.error(error.message)
                setRandomTask("Error: Failed to get a task")
            }
        }

        const storedData = localStorage.getItem("randomTask")

        if (!storedData) {
            getRandomTask()
        } else {
            setRandomTask(storedData)
        }
    },[])

    return (
        <div className="bg-slate-300 rounded-lg font-mono p-5 ease-in-out duration-300 hover:bg-slate-500">
            { randomTask ? randomTask : "Loading" }
        </div>
    )
}