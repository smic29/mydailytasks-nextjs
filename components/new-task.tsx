"use client"

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormEvent, useContext, useState } from "react";
import { ActionContext } from "./todays-tasks";

export default function NewInput() {
    const [ newTask, setNewTask ] = useState("")
    const onAction = useContext(ActionContext)

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        const submittedTask = { activity: newTask, done: false }

        if (!onAction) return
        onAction(submittedTask)
        setNewTask("")
    } 

    return(
        <form className="mb-5 me-3" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex justify-between">
                <Input type="text" placeholder="Add a task for today!" className=" w-10/12" onChange={(e) => setNewTask(e.target.value)} value={newTask}/>
                <Button className="me-5">
                    Add
                </Button>
            </div>
        </form>
    )
}