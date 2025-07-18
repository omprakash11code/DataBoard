import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Menu } from '../menu/menu';
import { Header } from '../header/header';
import { Auth, DataItem } from '../service/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, Menu, Header, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  data: DataItem[] = [];

  constructor(private router: Router, private authService: Auth) {}

  ngOnInit() {
    this.loadData();
  }

  // Fetch all items from backend
  loadData() {
    this.authService.getAllData().subscribe({
      next: items => this.data = items,
      error: err => console.error('Error loading data:', err)
    });
  }

  // Delete an item by its numeric ID
  deleteItemById(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.authService.deleteData(id).subscribe({
        next: () => this.loadData(),
        error: err => {
          console.error('Error deleting item:', err);
          alert('Delete failed.');
        }
      });
    }
  }

  // Navigate to the edit form with item ID
  navigateToEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }

  // Navigate to the add form
  navigateToAddData() {
    this.router.navigate(['/add']);
  }
}
