import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../types/error';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  protected error: ApiError;
  private route = inject(Router);
  protected showDetails = signal(false);

  constructor() {
    const navigation = this.route.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error']
  }

  detailsToggle() {
    this.showDetails.update(value => !value);
  }
} 
  