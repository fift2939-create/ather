
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPTS } from "../constants";
import { UserInput, ProjectIdea, BudgetData, LogFrameRow, TimelineActivity } from "../types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const MODEL_NAME = 'gemini-1.5-flash';

const cleanJSON = (text: string): string => {
  if (!text) return "[]";
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const analyzeIdea = async (input: UserInput): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = PROMPTS.ANALYZE
    .replace('{{Project_Idea}}', input.idea)
    .replace('{{Country}}', input.country)
    .replace('{{Category}}', input.category)
    .replace(/{{Beneficiaries}}/g, input.beneficiaries)
    .replace(/{{Language}}/g, input.language);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text() || "Analysis failed.";
};

export const generateIdeas = async (input: UserInput, analysis: string): Promise<ProjectIdea[]> => {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: "application/json",
    }
  });
  const prompt = PROMPTS.GENERATE_IDEAS
    .replace('{{Analyzed_Idea}}', analysis)
    .replace('{{Country}}', input.country)
    .replace('{{Category}}', input.category)
    .replace(/{{Language}}/g, input.language);

  const result = await model.generateContent(prompt);
  const response = await result.response;

  try {
    const data = JSON.parse(cleanJSON(response.text() || "[]"));
    return data.map((d: any, idx: number) => ({ ...d, id: `idea-${idx}-${Date.now()}` }));
  } catch (e) {
    console.error("JSON Parsing Error:", e);
    return [];
  }
};

export const createProposal = async (input: UserInput, idea: ProjectIdea): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = PROMPTS.CREATE_PROPOSAL
    .replace('{{Selected_Title}}', idea.name)
    .replace('{{Category}}', input.category)
    .replace('{{Beneficiaries}}', input.beneficiaries)
    .replace('{{Country}}', input.country)
    .replace('{{Language}}', input.language);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text() || "";
};

export const refineProposal = async (currentProposal: string, request: string, language: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = PROMPTS.REFINE_PROPOSAL
    .replace('{{User_Edit_Request}}', request)
    .replace('{{Current_Project}}', currentProposal)
    .replace('{{Language}}', language);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text() || currentProposal;
};

export const createLogFrame = async (projectName: string, language: string): Promise<LogFrameRow[]> => {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: "application/json",
    }
  });
  const prompt = PROMPTS.CREATE_LOGFRAME
    .replace('{{Project_Name}}', projectName)
    .replace('{{Language}}', language);

  const result = await model.generateContent(prompt);
  const response = await result.response;

  try {
    return JSON.parse(cleanJSON(response.text() || "[]"));
  } catch (e) {
    return [];
  }
};

export const createTimeline = async (projectName: string, language: string): Promise<TimelineActivity[]> => {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: "application/json",
    }
  });
  const prompt = PROMPTS.CREATE_TIMELINE
    .replace('{{Project_Name}}', projectName)
    .replace('{{Language}}', language);

  const result = await model.generateContent(prompt);
  const response = await result.response;

  try {
    return JSON.parse(cleanJSON(response.text() || "[]"));
  } catch (e) {
    return [];
  }
};

export const createBudget = async (input: UserInput, ideaName: string, proposalText: string): Promise<BudgetData> => {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: "application/json",
    }
  });
  const prompt = PROMPTS.CREATE_BUDGET
    .replace('{{Project_Name}}', ideaName)
    .replace('{{Country}}', input.country)
    .replace('{{Language}}', input.language);

  const result = await model.generateContent(`Proposal Summary: ${proposalText.substring(0, 2000)}\n\n${prompt}`);
  const response = await result.response;

  try {
    const data = JSON.parse(cleanJSON(response.text() || "{}"));
    const totalCost = data.items?.reduce((acc: number, item: any) => acc + (item.total || 0), 0) || 0;
    return { currency: data.currency || "USD", items: data.items || [], totalCost };
  } catch (e) {
    return { currency: "USD", items: [], totalCost: 0 };
  }
};
