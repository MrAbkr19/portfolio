import { Component, inject, signal } from '@angular/core'; 
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { ContactService } from '../../services/contact.service'; 
  
@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private fb = inject(FormBuilder); 
  private contact = inject(ContactService); 
  status = signal<'idle' | 'sending' | 'ok' | 'error'>('idle'); 
  
  form = this.fb.group({ 
    name: ['', Validators.required], 
    email: ['', [Validators.required, Validators.email]], 
    message: ['', Validators.required], 


    website: [''],   // honeypot anti-robot 
  }); 
  
  submit() { 
    if (this.form.invalid) return; 
    this.status.set('sending'); 
    this.contact.send(this.form.getRawValue() as any).subscribe({ 
      next: () => { this.status.set('ok'); this.form.reset(); }, 
      error: () => this.status.set('error'), 
    }); 
  } 
} 

