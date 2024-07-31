import axios from 'axios';
import { NextResponse } from 'next/server';

const RANDOM_TASK_URL = "https://bored-api.appbrewery.com/random"

export async function GET() {
    try {
        const response = await axios.get(RANDOM_TASK_URL)
        return NextResponse.json(response.data)
    } catch(error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}