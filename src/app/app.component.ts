import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from './components/pages/admin/admin.component';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import {CoordinatorComponent} from './components/pages/coordinator/coordinator.component';
import { ProfessorAndStudentComponent } from './components/pages/professorandstudent/professorandstudent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AdminComponent, RouterOutlet, CoordinatorComponent, ProfessorAndStudentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  userRoles: string[] = [];

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit(): Promise<void> {
    const authenticated: boolean = await this.keycloakService.isLoggedIn();

    this.isAuthenticated = authenticated;

    if (authenticated) {
      this.userRoles = this.keycloakService.getUserRoles();

      const token = this.keycloakService.getKeycloakInstance().token ?? '';
      const idToken = this.keycloakService.getKeycloakInstance().idToken ?? '';

      localStorage.setItem('access_token', token);
      localStorage.setItem('id_token', idToken);
    }
  }

  login(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout(window.location.origin);
  }
}
