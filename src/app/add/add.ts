import { Component } from '@angular/core';
import { FormGroup ,FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add {
  addForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.addForm = this.fb.group({
      fullName: ['', Validators.required],
      enrollment: ['', Validators.required],
      program: ['', Validators.required],
      date: ['', Validators.required],
      remarks: ['']
    });

}

 onSubmit() {
   if (this.addForm.invalid) {
   
    this.addForm.markAllAsTouched();
    alert('Please fill all required fields.');
    return; 
  }
    if (this.addForm.valid) {
      const formData = this.addForm.value;
      const existingData = JSON.parse(localStorage.getItem('formData') || '[]');
      existingData.push(formData);
      localStorage.setItem('formData', JSON.stringify(existingData));
      alert('Data saved successfully!');
      this.addForm.reset();
    }
     this.router.navigate(['/home']);
  }
}