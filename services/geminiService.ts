
import { GoogleGenAI, Type } from "@google/genai";
import { PROMPTS } from "../constants";
import { UserInput, ProjectIdea, BudgetData } from "../types";

// Note: In a real deployment, ensure this is handled securely.
const getClient = () => {
    // Try different possible environment variable names
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        console.error("Gemini API Key is missing. Please set GEMINI_API_KEY in your environment.");
        throw new Error("API_KEY_MISSING");
    }
    return new GoogleGenAI({ apiKey });
};

const MODEL_FLASH = 'gemini-2.5-flash';

export const analyzeIdea = async (input: UserInput): Promise<string> => {
    const ai = getClient();
    const prompt = PROMPTS.ANALYZE
        .replace('{{Project_Idea}}', input.idea)
        .replace('{{Country}}', input.country)
        .replace('{{Category}}', input.category)
        .replace(/{{Beneficiaries}}/g, input.beneficiaries)
        .replace(/{{Language}}/g, input.language);

    const response = await ai.models.generateContent({
        model: MODEL_FLASH,
        contents: prompt,
    });

    return response.text || "Failed to analyze idea.";
};

export const generateIdeas = async (input: UserInput, analysis: string): Promise<ProjectIdea[]> => {
    const ai = getClient();
    const prompt = PROMPTS.GENERATE_IDEAS
        .replace('{{Analyzed_Idea}}', analysis)
        .replace('{{Country}}', input.country)
        .replace('{{Category}}', input.category)
        .replace(/{{Language}}/g, input.language);

    const response = await ai.models.generateContent({
        model: MODEL_FLASH,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        goal: { type: Type.STRING },
                        appeal: { type: Type.STRING },
                    },
                    required: ["name", "description", "goal", "appeal"]
                }
            }
        }
    });

    try {
        const text = response.text || "[]";
        // Parse the JSON. 
        const data = JSON.parse(text);
        return data.map((d: any, idx: number) => ({ ...d, id: `idea-${idx}` }));
    } catch (e) {
        console.error("Failed to parse JSON ideas", e);
        return [];
    }
};

export const createProposal = async (input: UserInput, idea: ProjectIdea): Promise<string> => {
    const ai = getClient();
    const prompt = PROMPTS.CREATE_PROPOSAL
        .replace('{{Selected_Title}}', idea.name)
        .replace('{{Selected_Description}}', idea.description)
        .replace('{{Selected_Goal}}', idea.goal)
        .replace('{{Category}}', input.category)
        .replace('{{Beneficiaries}}', input.beneficiaries)
        .replace('{{Country}}', input.country)
        .replace('{{Language}}', input.language);

    const response = await ai.models.generateContent({
        model: MODEL_FLASH,
        contents: prompt,
    });

    return response.text || "Failed to generate proposal.";
};

export const refineProposal = async (currentProposal: string, request: string, language: string): Promise<string> => {
    const ai = getClient();
    const prompt = PROMPTS.REFINE_PROPOSAL
        .replace('{{Current_Project}}', currentProposal)
        .replace('{{User_Edit_Request}}', request)
        .replace('{{Language}}', language);

    const response = await ai.models.generateContent({
        model: MODEL_FLASH,
        contents: prompt,
    });

    return response.text || currentProposal;
};

export const createBudget = async (input: UserInput, ideaName: string, proposalText: string): Promise<BudgetData> => {
    const ai = getClient();
    // Sending a summarized prompt to avoid token limits if proposal is huge, but usually it fits.
    // We include the full proposal context for better accuracy.
    const prompt = PROMPTS.CREATE_BUDGET
        .replace('{{Project_Name}}', ideaName)
        .replace('{{Country}}', input.country)
        .replace('{{Language}}', input.language);

    // We pass the proposal as additional context if needed, but the prompt structure relies on the idea name primarily for the structure.
    // Let's prepend the context.
    const fullPrompt = `Context: ${proposalText.substring(0, 5000)}...\n\n${prompt}`;

    const response = await ai.models.generateContent({
        model: MODEL_FLASH,
        contents: fullPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    currency: { type: Type.STRING },
                    items: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                category: { type: Type.STRING },
                                item: { type: Type.STRING },
                                description: { type: Type.STRING },
                                quantity: { type: Type.NUMBER },
                                unitCost: { type: Type.NUMBER },
                                total: { type: Type.NUMBER }
                            },
                            required: ["category", "item", "quantity", "unitCost", "total"]
                        }
                    }
                },
                required: ["currency", "items"]
            }
        }
    });

    try {
        const text = response.text || "{}";
        const data = JSON.parse(text);

        // Calculate total just in case
        const totalCost = data.items.reduce((acc: number, item: any) => acc + item.total, 0);

        return {
            currency: data.currency,
            items: data.items,
            totalCost
        };
    } catch (e) {
        console.error("Budget parse error", e);
        return { currency: "USD", items: [], totalCost: 0 };
    }
};
