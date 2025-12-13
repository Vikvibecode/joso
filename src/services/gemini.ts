import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async generateJson(prompt: string): Promise<string> {
        const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

        const systemPrompt = `
      You are an expert data architect. 
      Your task is to convert the following natural language request into a valid, realistic, and comprehensive JSON object.
      
      Rules:
      1. Output ONLY valid JSON. No markdown code blocks, no explanations, no text before or after.
      2. If the request is vague, infer reasonable fields and values to make the JSON useful.
      3. Use camelCase for keys unless specified otherwise.
      4. Ensure data types are appropriate (e.g., numbers for age, booleans for flags).
    `;

        const fullPrompt = `${systemPrompt}\n\nUser Request: "${prompt}"\n\nJSON Output:`;

        try {
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            let text = response.text();

            // Clean up if the model adds markdown despite instructions
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return text;
        } catch (error) {
            console.error("Gemini Generation Error:", error);
            throw error;
        }
    }

    // Method to check if key works (optional lightweight check)
    static async validateKey(apiKey: string): Promise<boolean> {
        if (!apiKey) return false;
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            await model.generateContent("Test"); // minimal call
            return true;
        } catch (e) {
            return false;
        }
    }
}
