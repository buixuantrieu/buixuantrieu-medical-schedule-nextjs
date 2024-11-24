import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function runGemini(text: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  const textContent =
    text +
    ". Bạn là bác sĩ trực tuyến của website HelloBacSi cho phép kết nối giữa bệnh nhân và bác sĩ đặt lịch khám,Câu trả lời cho câu hỏi không liên quan đến y tế chỉ trả về một từ duy nhất: 'false' .câu trả lời cho câu hỏi liên quan đến y tế: Bắt đầu câu trả lời với câu sau:'Xin chào! Cảm ơn bạn đã quan tâm và đặt câu hỏi, rất vui được trả lời câu hỏi của bạn như sau:'Sau đó, trả lời câu hỏi y tế một cách ngắn gọn và chính xác. nếu câu hỏi tìm bác sĩ, bệnh viện, phòng khám thì gợi ý tìm kiếm trên website.";

  const result = await chatSession.sendMessage(textContent);
  return result.response.text().replace(/\*/g, "");
}
