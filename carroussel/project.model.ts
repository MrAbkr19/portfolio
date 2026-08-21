export interface Project {
  id: string;
  title: string;
  image: string;       // URL ou chemin vers l'image du projet
  description: string; // Description courte (1-2 phrases)
  technos: string[];   // Ex: ['Angular', 'Spring Boot', 'PostgreSQL']
  demoUrl?: string;     // Lien vers la démo live (optionnel)
  githubUrl?: string;   // Lien vers le repo GitHub (optionnel)
}
