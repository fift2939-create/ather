
export enum AppStep {
  INPUT = 0,
  ANALYSIS = 1,
  IDEAS = 2,
  PROPOSAL = 3,
  LOGFRAME = 4,
  TIMELINE = 5,
  BUDGET = 6,
  HISTORY = 7
}

export interface UserInput {
  idea: string;
  country: string;
  language: string;
  category: string;
  beneficiaries: string;
}

export interface ProjectIdea {
  id: string;
  name: string;
  description: string;
  goal: string;
  appeal: string;
}

export interface LogFrameRow {
  level: string; // Goal, Outcomes, Outputs, Activities
  description: string;
  indicators: string;
  verification: string;
  assumptions: string;
}

export interface TimelineActivity {
  activity: string;
  month: number; // 1 to 12
  responsible: string;
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
  logFrame: LogFrameRow[] | null;
  timeline: TimelineActivity[] | null;
  budget: BudgetData | null;
}

export interface AppState {
  step: AppStep;
  input: UserInput;
  analysis: string | null;
  generatedIdeas: ProjectIdea[];
  selectedIdea: ProjectIdea | null;
  fullProposal: string | null;
  logFrame: LogFrameRow[] | null;
  timeline: TimelineActivity[] | null;
  budget: BudgetData | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  currentProjectId: string | null;
}
