import { createClient } from 'redis';
import { NextResponse } from 'next/server';


export interface Message {
    id: number;
    name: string;
    message: string;
    timestamp: number;
  }

const REDIS_KEY = "messages_v002";
const REDIS_ID_KEY = "message_id_key"
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
    console.log(`name: ${name}, message: ${message}`)

    try{
        await redis.connect();

        // Redis에서 ID 가져오기
        const id = await redis.incr(REDIS_ID_KEY);

        // Redis에서 기존 메시지 가져오기
        const data = await redis.get(REDIS_KEY);
        const messages: Message[] = data ? JSON.parse(data) : [];

        // 새로운 메시지 추가
        const newMessage: Message = {id, name, message, timestamp: Date.now() };
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

export async function DELETE(request: Request) {
	const { id }: { id: string; } = await request.json();
	console.log('>> delete : req = ', JSON.stringify(id))
	
    try{
        await redis.connect();
        const data = await redis.get(REDIS_KEY); 
		
		if(id === 'clear'){
			await redis.flushDb();
			return NextResponse.json({ success: true, message: 'clear' });
		}
		
		
        const messages: Message[] = data ? JSON.parse(data) : [];
		console.log(`req id = ${id}`)
        const updatedMessages = messages.filter((msg) => String(msg.id) !== id);
		console.log('>> delete : redis = ', JSON.stringify(data))
        await redis.set(REDIS_KEY, JSON.stringify(updatedMessages));
        return NextResponse.json({ success: true });

    } catch(error) {
        console.error("Redis connection error:", error);
        return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
    }finally{
        await redis.disconnect();
    }
}