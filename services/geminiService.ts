
import { GoogleGenAI, Type } from "@google/genai";
import { PROMPTS } from "../constants";
import { UserInput, ProjectIdea, BudgetData } from "../types";

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = 'gemini-3-pro-preview';

const cleanJSON = (text: string): string => {
  if (!text) return "[]";
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const analyzeIdea = async (input: UserInput): Promise<string> => {
  const ai = getClient();
  const prompt = PROMPTS.ANALYZE
    .replace('{{Project_Idea}}', input.idea)
    .replace('{{Country}}', input.country)
    .replace('{{Category}}', input.category)
    .replace(/{{Beneficiaries}}/g, input.beneficiaries)
    .replace(/{{Language}}/g, input.language);

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      maxOutputTokens: 8000,
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text || "Analysis failed.";
};

export const generateIdeas = async (input: UserInput, analysis: string): Promise<ProjectIdea[]> => {
  const ai = getClient();
  const prompt = PROMPTS.GENERATE_IDEAS
    .replace('{{Analyzed_Idea}}', analysis)
    .replace('{{Country}}', input.country)
    .replace('{{Category}}', input.category)
    .replace(/{{Language}}/g, input.language);

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
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
    const text = response.text;
    const data = JSON.parse(cleanJSON(text || "[]"));
    return data.map((d: any, idx: number) => ({ ...d, id: `idea-${idx}` }));
  } catch (e) {
    console.error("JSON Parsing Error:", e);
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
    model: MODEL_NAME,
    contents: prompt,
    config: {
      maxOutputTokens: 20000,
      thinkingConfig: { thinkingBudget: 10000 }
    }
  });
  return response.text || "";
};

export const createBudget = async (input: UserInput, ideaName: string, proposalText: string): Promise<BudgetData> => {
  const ai = getClient();
  const prompt = PROMPTS.CREATE_BUDGET
    .replace('{{Project_Name}}', ideaName)
    .replace('{{Country}}', input.country)
    .replace('{{Language}}', input.language);

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Proposal Summary: ${proposalText.substring(0, 2000)}\n\n${prompt}`,
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
    const text = response.text;
    const data = JSON.parse(cleanJSON(text || "{}"));
    const totalCost = data.items?.reduce((acc: number, item: any) => acc + (item.total || 0), 0) || 0;
    return { currency: data.currency || "USD", items: data.items || [], totalCost };
  } catch (e) {
    return { currency: "USD", items: [], totalCost: 0 };
  }
};
