import { createClient } from 'redis';
import { NextResponse } from 'next/server';


export interface Message {
    name: string;
    message: string;
    timestamp: number;
  }

const REDIS_KEY = "messages";
const redis = createClient({ url: process.env.REDIS_URL });

export async function GET() {
    
    try{
        await redis.connect();
        const data = await redis.get(REDIS_KEY);
        const messages: Message[] = data ? JSON.parse(data) : [];
        return NextResponse.json(messages);
        
    } catch (error) {
        console.error("Redis connection error:", error);
        return NextResponse.json({ error: "Failed to connect to Redis" }, { status: 500 });
    } finally {
        await redis.disconnect();
    }
}

export async function POST(request: Request) {
    

    // 요청에서 데이터 추출
    const { name, message }: { name: string; message: string } = await request.json();

    try{
        await redis.connect();

        // Redis에서 기존 메시지 가져오기
        const data = await redis.get(REDIS_KEY);
        const messages: Message[] = data ? JSON.parse(data) : [];

        // 새로운 메시지 추가
        const newMessage: Message = { name, message, timestamp: Date.now() };
        messages.push(newMessage);

        // Redis에 메시지 저장
        await redis.set(REDIS_KEY, JSON.stringify(messages));

        return NextResponse.json(newMessage);
    } catch( error){
        console.error("Redis connection error:", error);
        return NextResponse.json({ error: "Failed to connect to Redis" }, { status: 500 });
    } finally {
         // Redis 연결 종료
    await redis.disconnect();
    }
    
}