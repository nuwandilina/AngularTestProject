import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from "../services/category.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryForm!: FormGroup
  actionButtonName: string = 'Save';
  actionButtonColor: string = 'primary';

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CategoryComponent>,
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryCode: ['', Validators.required],
      categoryName: ['', Validators.required]
    });
  }

  addCategory() {
    if (this.categoryForm.valid) {
      this.categoryService.PostCategory(this.categoryForm.value).subscribe({
        next: (resp) => {
          alert('Category Saved Successfully');
          this.categoryForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert('Error while saving category');
        },
      });
    }
  }

}
