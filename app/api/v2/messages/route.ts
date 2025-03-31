import { createClient } from 'redis';
import { NextResponse } from 'next/server';


export interface Message {
    name: string;
    message: string;
    timestamp: number;
  }

const REDIS_KEY = "messages";

export async function GET() {
    const redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();
    const data = await redis.get(REDIS_KEY);
    const messages: Message[] = data ? JSON.parse(data) : [];

    await redis.disconnect();
    
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    // 요청에서 데이터 추출
    const { name, message }: { name: string; message: string } = await request.json();

    // Redis 클라이언트 생성 및 연결
    const redis = createClient({
      url: process.env.REDIS_URL, // Vercel 환경 변수에 Redis URL 설정
      password: process.env.REDIS_PASSWORD, // Redis 비밀번호
    });
    await redis.connect();

    // Redis에서 기존 메시지 가져오기
    const data = await redis.get(REDIS_KEY);
    const messages: Message[] = data ? JSON.parse(data) : [];

    // 새로운 메시지 추가
    const newMessage: Message = { name, message, timestamp: Date.now() };
    messages.push(newMessage);

    // Redis에 메시지 저장
    await redis.set(REDIS_KEY, JSON.stringify(messages));

    // Redis 연결 종료
    await redis.disconnect();

    return NextResponse.json(newMessage);
}