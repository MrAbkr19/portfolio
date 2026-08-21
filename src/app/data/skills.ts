import { skill } from '../models/skill';

// Compétences Développement Front-End & Architecture Web
export const skillsFront: skill[] = [
  {
    title: 'Angular',
    category: 'Standalone, Signals & Router',
    icon: 'fa-brands fa-angular',
    color: '#DD0031',
    level: 'Avancé'
  },
  {
    title: 'TypeScript',
    category: 'Typage fort & POO',
    icon: 'fa-solid fa-code',
    color: '#3178C6',
    level: 'Avancé'
  },
  {
    title: 'JavaScript (ES6+)',
    category: 'Asynchrone & DOM',
    icon: 'fa-brands fa-js',
    color: '#F7DF1E',
    level: 'Avancé'
  },
  {
    title: 'HTML5',
    category: 'Sémantique & Accessibilité',
    icon: 'fa-brands fa-html5',
    color: '#E34F26',
    level: 'Expert'
  },
  {
    title: 'CSS3 / SCSS',
    category: 'Préprocesseur & Styles avancés',
    icon: 'fa-brands fa-sass',
    color: '#CC6699',
    level: 'Avancé'
  },
  {
    title: 'Tailwind CSS',
    category: 'Utility-First Framework',
    image: 'icons/tailwind.png',
    color: '#38BDF8',
    level: 'Avancé'
  },
  {
    title: 'Git / GitHub',
    category: 'Versionning & Collaboration',
    icon: 'fa-brands fa-github',
    color: '#FFFFFF',
    level: 'Avancé'
  },
  {
    title: 'Jira / Trello',
    category: 'Gestion de projet & Agile',
    image: 'icons/jira.jfif',
    color: '#0052CC',
    level: 'Avancé'
  }
];

// Compétences UI/UX & Graphic Design
export const skillsDesign: skill[] = [
  {
    title: 'Figma',
    category: 'UI/UX & Prototypage',
    image: 'icons/figma.svg',
    color: '#F24E1E'
  },
  {
    title: 'Indesign',
    category: 'Mise en page & PAO',
    image: 'icons/indesign.jfif',
    color: '#FF3366'
  },
  {
    title: 'Illustrator',
    category: 'Illustration vectorielle',
    image: 'icons/illustrator.png',
    color: '#FF9A00'
  },
  {
    title: 'Photoshop',
    category: 'Retouche & Graphisme',
    image: 'icons/ps.png',
    color: '#31A8FF'
  },
  {
    title: 'Adobe XD',
    category: 'Maquettage d\'interfaces',
    image: 'icons/xd.png',
    color: '#FF61F6'
  }
];

// Alias pour rétro-compatibilité
export const skillFront = skillsFront;
export const skillDesign = skillsDesign;