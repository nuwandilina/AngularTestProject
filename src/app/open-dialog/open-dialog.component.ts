import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-open-dialog',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.scss'],
})
export class OpenDialogComponent implements OnInit {
  freshessList = ['Brand New', 'Second Hand'];
  dropdownCategorie: any;
  productForm!: FormGroup;
  actionButtonName: string = 'Save';
  actionButtonColor: string = 'primary';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<OpenDialogComponent>,
    private category: CategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comments: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionButtonName = 'Update';
      this.actionButtonColor = 'accent';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comments'].setValue(this.editData.comments);
      this.productForm.controls['date'].setValue(this.editData.date);
    }

    this.getCategories();
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (resp) => {
            alert('Product Saved Successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while saving product');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.updateProduct(this.productForm.value, this.editData.id).subscribe({
      next: (resp) => {
        alert('Product updated successfully');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating data');
      },
    });
  }

  getCategories() {
    this.category.getCategories().subscribe({
      next: (resp: any) => {
        this.dropdownCategorie = resp;
      },
      error: (err) => {
        alert('Error while getting data');
      },
    });
  }
}
