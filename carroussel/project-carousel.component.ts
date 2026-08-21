import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from './project.model';

@Component({
  selector: 'app-project-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-carousel.component.html',
  styleUrls: ['./project-carousel.component.scss'],
})
export class ProjectCarouselComponent {
  /** Liste des projets à afficher. Peut être passée depuis le composant parent. */
  @Input() set projects(value: Project[]) {
    this._projects.set(value ?? []);
    this.activeIndex.set(0);
  }
  get projects(): Project[] {
    return this._projects();
  }

  private _projects = signal<Project[]>(PLACEHOLDER_PROJECTS);

  /** Index de la carte actuellement au premier plan. */
  activeIndex = signal(0);

  /** Nombre total de projets (pour les points de navigation). */
  total = computed(() => this._projects().length);

  private touchStartX = 0;
  private touchEndX = 0;

  @ViewChild('track') trackRef?: ElementRef<HTMLDivElement>;

  get activeProject(): Project | undefined {
    return this._projects()[this.activeIndex()];
  }

  next(): void {
    const t = this.total();
    if (t === 0) return;
    this.activeIndex.set((this.activeIndex() + 1) % t);
  }

  prev(): void {
    const t = this.total();
    if (t === 0) return;
    this.activeIndex.set((this.activeIndex() - 1 + t) % t);
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  trackByProjectId(_index: number, project: Project): string {
    return project.id;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    const delta = this.touchEndX - this.touchStartX;
    const swipeThreshold = 40;
    if (delta > swipeThreshold) this.prev();
    else if (delta < -swipeThreshold) this.next();
  }
}

/**
 * Données de démonstration — à remplacer par les vrais projets.
 * Conforme au placeholder utilisé pendant la phase de maquette (Stitch).
 */
export const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Nom du projet 1',
    image: 'assets/images/projects/placeholder-1.webp',
    description: 'Courte description du projet, son objectif et le problème résolu.',
    technos: ['Angular', 'TypeScript', 'SCSS'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-2',
    title: 'Nom du projet 2',
    image: 'assets/images/projects/placeholder-2.webp',
    description: 'Courte description du projet, son objectif et le problème résolu.',
    technos: ['Angular', 'Spring Boot', 'PostgreSQL'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'proj-3',
    title: 'Nom du projet 3',
    image: 'assets/images/projects/placeholder-3.webp',
    description: 'Courte description du projet, son objectif et le problème résolu.',
    technos: ['React', 'FastAPI', 'Docker'],
    demoUrl: '#',
    githubUrl: '#',
  },
];
