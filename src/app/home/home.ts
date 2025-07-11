import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, RouterModule ,} from '@angular/router';
import { Menu } from '../menu/menu';
import { Header } from '../header/header';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, Menu, Header, RouterModule,FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  data: any[] = [];
  editingIndex: number | null = null;
  editedItem: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const raw = localStorage.getItem('formData');
    this.data = raw ? JSON.parse(raw) : [];
  }

  deleteItem(index: number) {
    this.data.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(this.data));
    this.loadData();
  }

  editItem(index: number) {
    this.editingIndex = index;
    this.editedItem = { ...this.data[index] };
  }

  updateItem() {
    if (this.editingIndex !== null) {
      this.data[this.editingIndex] = this.editedItem;
      localStorage.setItem('formData', JSON.stringify(this.data));
      this.editingIndex = null;
      this.editedItem = {};
      this.loadData();
    }
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editedItem = {};
  }

  navigateToAddData() {
    this.router.navigate(['/add']);
  }
}
