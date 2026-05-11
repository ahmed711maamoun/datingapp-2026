import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../types/user';
import { AccountService } from '../../../../core/services/account-service';

@Component({
  selector: 'app-register',
  standalone: true, // Added this to ensure it works in your new main.ts setup
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private accountService = inject(AccountService);
  
  // This emits an event to the parent (Home) to close the form
  cancelRegister = output<boolean>();
  
  protected creds = {} as RegisterCreds;

  register() {
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log('Registration successful:', response);
        this.cancel(); // Close the form on success
      },
      error: error => console.log('Registration error:', error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}