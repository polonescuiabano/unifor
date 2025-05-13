import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../model/User';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;
  error: string = '';

  selectedUser: User | null = null;
  modalUser: User = { id:'', username: '', email: '', role: '' };
  showModal: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.adminService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar usuários!';
        this.isLoading = false;
      }
    });
  }

  openAddUserModal(): void {
    this.selectedUser = null;
    this.modalUser = { id: '',username: '', email: '', role: '' };
    this.showModal = true;
  }

  editUser(userId: string): void {
    this.adminService.getUserById(userId).subscribe({
      next: (user: User) => {
        this.selectedUser = user;
        this.modalUser = { ...user }; // Clona os dados para edição
        this.showModal = true;
      },
      error: () => {
        this.error = 'Erro ao carregar os dados do usuário para edição!';
      }
    });
  }

  saveUser(formData: any): void {
    if (this.selectedUser && this.selectedUser.id) {
      // Edição
      this.adminService.updateUser(this.selectedUser.id, formData).subscribe({
        next: () => {
          this.fetchUsers();
          this.closeModal();
        },
        error: () => (this.error = 'Erro ao atualizar usuário.')
      });
    } else {
      // Inclusão
      this.adminService.addUser(formData).subscribe({
        next: () => {
          this.fetchUsers();
          this.closeModal();
        },
        error: () => (this.error = 'Erro ao adicionar usuário.')
      });
    }
  }

  deleteUser(userId: string): void {
    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => this.fetchUsers(),
        error: () => (this.error = 'Erro ao excluir usuário!')
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}
