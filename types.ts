
export enum AppStep {
  INPUT = 0,
  ANALYSIS = 1,
  IDEAS = 2,
  PROPOSAL = 3,
  BUDGET = 4,
  HISTORY = 5
}

export interface UserInput {
  idea: string; // This will act as the "Humanitarian Problem" description
  country: string;
  language: string;
  category: string; // New: Sector (Health, Education, etc.)
  beneficiaries: string; // New: Target Audience
}

export interface AnalysisResult {
  analysisText: string;
}

export interface ProjectIdea {
  id: string;
  name: string;
  description: string;
  goal: string;
  appeal: string;
}

export interface BudgetLineItem {
  category: string;
  item: string;
  description: string;
  quantity: number;
  unitCost: number;
  total: number;
}

export interface BudgetData {
  items: BudgetLineItem[];
  currency: string;
  totalCost: number;
}

export interface SavedProject {
  id: string;
  timestamp: number;
  input: UserInput;
  selectedIdea: ProjectIdea;
  fullProposal: string;
  budget: BudgetData | null;
}

export interface AppState {
  step: AppStep;
  input: UserInput;
  analysis: string | null;
  generatedIdeas: ProjectIdea[];
  selectedIdea: ProjectIdea | null;
  fullProposal: string | null;
  budget: BudgetData | null;
  isLoading: boolean;
  error: string | null;
}
