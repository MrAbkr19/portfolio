// Interface définissant la structure d'une compétence
export interface skill {
  title: string;
  category?: string;
  icon?: string;
  image?: string;
  color?: string;
  level?: string;
}

// Alias pour compatibilité avec les imports en PascalCase
export type Skill = skill;