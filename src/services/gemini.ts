import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async generateJson(prompt: string, mode: string = 'Balanced'): Promise<string> {
        const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

        let modeInstruction = "";
        switch (mode) {
            case 'Strict':
                modeInstruction = `
            - Strict Mode: Output MINIMAL JSON. 
            - Do NOT add any fields not explicitly requested. 
            - Adhere strictly to inferred types.
            - No filler data.
          `;
                break;
            case 'Creative':
                modeInstruction = `
            - Creative Mode: Output RICH and DETAILED JSON.
            - Infer nested structures where appropriate.
            - Add realistic mock data, arrays with multiple items, and descriptive fields.
            - Be imaginative with values.
          `;
                break;
            case 'TypeScript':
                modeInstruction = `
            - TypeScript Mode: Output ONLY a valid TypeScript Interface/Type.
            - Use proper syntax (interface Name { ... }).
            - Export the interface.
            - Use descriptive comments (JSDoc).
            - NO JSON output. ONLY TypeScript code.
          `;
                break;
            case 'Zod':
                modeInstruction = `
            - Zod Mode: Output ONLY a valid Zod Schema.
            - Import zod if needed (import { z } from "zod";).
            - Define the schema (const UserSchema = z.object({...})).
            - Infer the type (type User = z.infer<typeof UserSchema>;).
            - NO JSON output. ONLY TypeScript/Zod code.
          `;
                break;
            case 'Balanced':
            default:
                modeInstruction = `
            - Balanced Mode: Output clean, useful JSON.
            - Infer common best-practice fields.
            - Balance between brevity and helpful details.
          `;
                break;
        }

        const systemPrompt = `
      You are an expert data architect. 
      Your task is to convert the following natural language request into a valid, realistic, and comprehensive JSON object.
      
      Rules:
      1. If mode is JSON-based (Balanced/Strict/Creative): Output ONLY valid JSON.
      2. If mode is Code-based (TypeScript/Zod): Output ONLY valid Code.
      3. No markdown code blocks (unless asked), no explanations, no text before or after.
      4. If the request is vague, infer reasonable fields and values to make the output useful.
      3. Use camelCase for keys unless specified otherwise.
      4. Ensure data types are appropriate.
      
      Mode Instructions (${mode}):
      ${modeInstruction}
    `;

        const fullPrompt = `${systemPrompt}\n\nUser Request: "${prompt}"\n\nJSON Output:`;

        try {
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            let text = response.text();

            // Clean up if the model adds markdown despite instructions
            text = text.replace(/```json/g, '')
                .replace(/```typescript/g, '')
                .replace(/```ts/g, '')
                .replace(/```/g, '')
                .trim();

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
