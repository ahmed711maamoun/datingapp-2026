import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
// ADD THIS LINE:
import { Nav } from './nav/nav'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [Nav], 
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  title = 'Dating App';
  protected members = signal<any[]>([]); // Best practice: add the array type []

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.getmembers();
      this.members.set(data);
    } catch (error) {
      console.error('Failed to load members', error);
    }
  }

  async getmembers() {
    return await lastValueFrom(this.http.get<any[]>('https://localhost:5001/api/users')); 
    // NOTE: Check your API URL. Neil usually uses /api/users in Section 4.
  }
}