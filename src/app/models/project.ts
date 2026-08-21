// Modèle de données d'un projet selon les conventions ATL2026
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  techs: string[];
  highlights?: string[];
  icon: string;
  demoUrl: string;
  githubUrl: string;
  image: string;
  gradient?: string;
  color?: string;
}
