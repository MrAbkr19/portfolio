import { Component } from '@angular/core';
import { skill } from '../../models/skill';
import { skillsFront, skillsDesign } from '../../data/skills';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  // Compétences Front-End & Architecture Web
  skillsFront: skill[] = skillsFront;

  // Compétences UI/UX Design, Outils & Collaboration
  skillsDesign: skill[] = skillsDesign;

  // Listes dupliquées pour assurer une boucle infinie continue et fluide
  get skillsFrontInfinite(): skill[] {
    return [...this.skillsFront, ...this.skillsFront, ...this.skillsFront];
  }

  get skillsDesignInfinite(): skill[] {
    return [...this.skillsDesign, ...this.skillsDesign, ...this.skillsDesign];
  }
}
