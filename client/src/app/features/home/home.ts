import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from "../account/register/register";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private http = inject(HttpClient); // Using private for cleaner class design
  
  registerMode = signal(false);
  members = signal<any>([]); 

  ngOnInit(): void {
    this.getMembers();
  }

  // This method matches the (click) in your home.html
  showRegister(value: boolean) {
    this.registerMode.set(value);
  }

  getMembers() {
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: response => {
        this.members.set(response);
        console.log('Members successfully fetched from API');
      },
      error: error => console.log('Error fetching members:', error)
    });
  }

  // Kept for flexibility, though showRegister(true/false) is more explicit
  registerToggle() {
    this.registerMode.set(!this.registerMode());
  }
}