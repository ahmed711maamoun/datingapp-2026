import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false, 
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  title = 'Dating App';
  protected members = signal<any>([]); 

  // FIX: Added the method parentheses () and the proper async body
  async ngOnInit(): Promise<void> {
    try {
      const data = await this.getmembers();
      this.members.set(data);
    } catch (error) {
      console.error('Failed to load members', error);
    }
  }

  async getmembers() {
    // lastValueFrom converts the Observable to a Promise
    return await lastValueFrom(this.http.get('https://localhost:5001/api/members'));
  }
}