import { SavedProject } from "../types";

const STORAGE_KEY = 'ngo_architect_projects';

export const saveProject = (project: SavedProject): void => {
  try {
    const existing = getProjects();
    // Check if update or new
    const index = existing.findIndex(p => p.id === project.id);
    if (index >= 0) {
      existing[index] = project;
    } else {
      existing.unshift(project); // Add to top
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error("Failed to save project", e);
  }
};

export const getProjects = (): SavedProject[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load projects", e);
    return [];
  }
};

export const deleteProject = (id: string): SavedProject[] => {
  try {
    const existing = getProjects();
    const filtered = existing.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.error("Failed to delete project", e);
    return [];
  }
};