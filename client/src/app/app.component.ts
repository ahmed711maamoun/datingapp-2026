import { Component, OnInit, inject } from '@angular/core';
import { Nav } from './nav/nav'; 
import { Home } from './features/home/home';
import { AccountService } from '../core/services/account-service'; // Adjust path if needed

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav, Home] 
})
export class AppComponent implements OnInit {
  // We inject the AccountService to manage the logged-in user state
  private accountService = inject(AccountService);
  title = 'Dating App';

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    
    // Parse the stored user and update the signal in AccountService
    const user = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}