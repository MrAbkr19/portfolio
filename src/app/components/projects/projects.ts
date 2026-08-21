import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project, projects } from '../../data/projects';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit, OnDestroy {
  // Liste complète des projets du portfolio
  allProjects: Project[] = projects;

  // Index du projet actuellement affiché au premier plan
  currentIndex: number = 0;

  // Gestion du défilement automatique (autoplay 3s)
  isAutoPlayActive: boolean = true;
  private readonly autoPlayDelay: number = 1000;
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  // Gestion du glissement (slide) manuel à la souris et au tactile
  isDragging: boolean = false;
  startX: number = 0;
  currentDragX: number = 0;
  dragOffset: number = 0;

  ngOnInit(): void {
    this.demarrerAutoPlay();
  }

  ngOnDestroy(): void {
    this.arreterAutoPlay();
  }

  // Projet actif courant
  get projetActif(): Project {
    return this.allProjects[this.currentIndex];
  }

  // Passe au projet suivant
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.allProjects.length;
  }

  // Revient au projet précédent
  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.allProjects.length) % this.allProjects.length;
  }

  // Sélectionne directement un projet
  goToSlide(index: number): void {
    if (index >= 0 && index < this.allProjects.length) {
      this.currentIndex = index;
    }
  }

  // Calcule le décalage (offset) de chaque carte par rapport à la carte active
  getCardOffset(index: number): number {
    const total = this.allProjects.length;
    return (index - this.currentIndex + total) % total;
  }

  // Détermine si une carte est visible dans la pile
  isCardVisible(index: number): boolean {
    const offset = this.getCardOffset(index);
    return offset < 3 || offset === this.allProjects.length - 1;
  }

  // Démarrage du minuteur automatique
  demarrerAutoPlay(): void {
    if (this.isAutoPlayActive && !this.autoPlayTimer) {
      this.autoPlayTimer = setInterval(() => {
        this.nextSlide();
      }, this.autoPlayDelay);
    }
  }

  // Arrêt du minuteur automatique
  arreterAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  // Mise en pause temporaire
  pauseAutoPlay(): void {
    this.arreterAutoPlay();
  }

  // Reprise du défilement automatique
  reprendreAutoPlay(): void {
    if (this.isAutoPlayActive) {
      this.demarrerAutoPlay();
    }
  }

  // Bascule l'état d'activation du défilement automatique
  toggleAutoPlay(): void {
    this.isAutoPlayActive = !this.isAutoPlayActive;
    if (this.isAutoPlayActive) {
      this.demarrerAutoPlay();
    } else {
      this.arreterAutoPlay();
    }
  }

  // --- Gestion du glissement manuel (Souris / Desktop) ---

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    this.currentDragX = event.clientX;
    this.dragOffset = 0;
    this.pauseAutoPlay();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.currentDragX = event.clientX;
    this.dragOffset = this.currentDragX - this.startX;
  }

  onMouseUp(): void {
    if (!this.isDragging) return;
    this.finaliserGlissement();
  }

  onMouseLeave(): void {
    if (this.isDragging) {
      this.finaliserGlissement();
    }
    this.reprendreAutoPlay();
  }

  // --- Gestion du glissement manuel (Touch / Mobile) ---

  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.currentDragX = event.touches[0].clientX;
    this.dragOffset = 0;
    this.pauseAutoPlay();
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.currentDragX = event.touches[0].clientX;
    this.dragOffset = this.currentDragX - this.startX;
  }

  onTouchEnd(): void {
    if (!this.isDragging) return;
    this.finaliserGlissement();
    this.reprendreAutoPlay();
  }

  private finaliserGlissement(): void {
    const seuil = 45;
    if (this.dragOffset < -seuil) {
      this.nextSlide();
    } else if (this.dragOffset > seuil) {
      this.prevSlide();
    }
    this.isDragging = false;
    this.dragOffset = 0;
  }

  // Navigation clavier
  @HostListener('window:keydown', ['$event'])
  gererTouchesClavier(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      this.prevSlide();
    }
  }
}
