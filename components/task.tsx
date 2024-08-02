import { Checkbox } from "./ui/checkbox"

interface TaskProps {
    data: any
    onClick: (data: any) => void
}

export default function Task({data, onClick}:TaskProps) {

    return (
        <div className="flex justify-between content-center w-full border rounded-md border-gray-300 my-2 cursor-pointer hover:bg-slate-300 duration-300 ease-in-out p-4"
        onClick={() => {onClick(data)}}
        >
            <div>
                {data.activity}
            </div>
            <div>
                {data.done ?
                <Checkbox checked disabled/>
                :
                <Checkbox disabled/>
                }
            </div>
        </div>
    )
}