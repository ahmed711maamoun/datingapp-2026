import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { Nav } from './nav/nav'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav, CommonModule] 
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'Dating App';
  // Best practice: Initializing as an empty array []
  members = signal<any>([]);

  ngOnInit(): void {
    // FIX: Changed 'users' to 'members' to match your MembersController
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: response => {
        this.members.set(response);
        console.log('Members loaded:', response); // Good for debugging!
      },
      error: error => console.log('API Error:', error)
    });
  }
}