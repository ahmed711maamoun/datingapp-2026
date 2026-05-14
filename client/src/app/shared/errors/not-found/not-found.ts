import { Location } from '@angular/common';
import { Component, inject } from '@angular/core'; // Move inject here

// REMOVE this line:
// import { inject } from 'vitest'; 

@Component({
  selector: 'app-not-found',
  standalone: true, // Add this to match your zoneless setup
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}