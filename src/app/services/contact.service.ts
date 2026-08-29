import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ContactData {
  name: string; email: string; message: string; website: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);

  send(data: ContactData) {
    return this.http.post('/api/contact', data);
  }
}