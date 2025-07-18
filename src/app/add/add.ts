import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth, DataItem } from '../service/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add.html',
  styleUrls: ['./add.css']
})
export class Add implements OnInit {
  addForm: FormGroup;
  isEditMode = false;
  dataId!: number;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addForm = this.fb.group({
      FullName: ['', Validators.required],
      Enrolment: ['', Validators.required],
      program: ['', Validators.required],
      date: ['', Validators.required],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.dataId = +idParam; // number conversion
      this.isEditMode = true;
      this.loadItem(this.dataId);
    }
  }

  loadItem(id: number): void {
    this.authService.getDataById(id).subscribe({
      next: item => {
        this.addForm.patchValue({
          FullName: item.FullName,
          Enrolment: item.Enrolment,
          program: item.program,
          date: item.date.substring(0, 10),
          remarks: item.remarks
        });
      },
      error: err => {
        console.error('Failed to load item', err);
        alert('Failed to load item');
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit(): void {
    if (!this.addForm || this.addForm.invalid) {
      this.addForm?.markAllAsTouched();
      alert('Please fill all required fields');
      return;
    }

    const f = this.addForm.value;
    const isoDate = new Date(f.date).toISOString();

    const data: DataItem = {
      FullName: f.FullName,
      Enrolment: f.Enrolment,
      program: f.program,
      date: isoDate,
      remarks: f.remarks
    };

    if (this.isEditMode) {
      this.authService?.updateData(this.dataId, data).subscribe({
        next: () => {
          alert('Item updated successfully');
          this.router?.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('Update error', err);
          alert('Failed to update item. Check console.');
        }
      });
    } else {
      this.authService?.createData(data).subscribe({
        next: () => {
          alert('Item created successfully');
          this.router?.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('Create error', err);
          alert('Failed to create item. Check console.');
        }
      });
    }
  }
}
