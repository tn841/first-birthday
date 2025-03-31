import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), "public", "msg.json");

export async function GET() {
    const data = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
    const  {name, message} = await request.json();
    const data = await fs.readFile(filePath, "utf-8");
    const messages = JSON.parse(data);

    const newMessage = { name, message };
    messages.push(newMessage);

    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), "utf-8");
    return NextResponse.json(messages);
}