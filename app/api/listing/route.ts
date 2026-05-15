import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Analyze this product image and generate e-commerce listings for Amazon, Flipkart, and Meesho.
  Include:
  1. Amazon: SEO Title (max 150 chars), 5 Benefit-driven Bullet Points, and Search Terms.
  2. Flipkart: Catchy Title, 4-5 Highlights.
  3. Meesho: Simple Title, Simple Description for local buyers.
  Return the response as a clean JSON object.`;

  const result = await model.generateContent([
    prompt,
    { inlineData: { data: buffer.toString("base64"), mimeType: file.type } }
  ]);

  // Clean JSON response
  const text = result.response.text().replace(/```json|```/g, "");
  return NextResponse.json(JSON.parse(text));
    }
