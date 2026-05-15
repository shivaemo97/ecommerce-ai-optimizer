import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const platform = formData.get("platform") as string;
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";
    if (platform === "amazon") {
      prompt = `Act as an Amazon A9 SEO expert. Analyze this product image. Generate a JSON with: "SEO_Title" (max 200 chars), "Five_Bullet_Points" (Array of 5 benefit-driven points), "Backend_Search_Terms" (Array of top 10 trending hidden keywords), "Product_Description" (Simple paragraph).`;
    } else if (platform === "flipkart") {
      prompt = `Act as a Flipkart ranking expert. Analyze this product image. Generate a JSON with: "Product_Title" (Crisp, focused on features), "Key_Highlights" (Array of 4 short punchy features), "Mandatory_Attributes" (JSON of expected attributes like Ideal For, Material), "Description" (Simple text).`;
    } else if (platform === "meesho") {
      prompt = `Act as a Meesho seller expert. Analyze this product image. Generate a JSON with: "Short_Name" (Simple, direct name), "Vernacular_Tags" (Array of 10 search tags rural/tier-2 users use, e.g., 'sasti', 'trendy'), "Description" (Short, easy to read, highlighting price value).`;
    }

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: buffer.toString("base64"), mimeType: file.type } }
    ]);

    const text = result.response.text().replace(/```json|```/g, "");
    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate listing" }, { status: 500 });
  }
}
