import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Nav } from "../layout/nav/nav";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav]
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'Dating App';
  members = signal<any>([]);

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.members.set(response),
      error: error => console.log(error)
    });
  }
}