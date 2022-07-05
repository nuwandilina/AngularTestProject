import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OpenDialogComponent } from './open-dialog/open-dialog.component';
import { ApiService } from './services/api.service';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from "./services/category.service";

import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AngularMaterialTest';

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price','date','comments','action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService, private category:CategoryService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(OpenDialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllProducts();
      }
    })
  }
 
  getAllProducts() {
    this.api.getProducts().subscribe({
      next: (resp) => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while getting data');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(elemant:any) {
    this.dialog.open(OpenDialogComponent, {
      width: '30%',
      data: elemant
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllProducts();
      }
    })
  }

  deleteProduct(elemant:any) {
    this.api.deleteProduct(elemant.id).subscribe({
      next: (resp) => {
        alert("Product deleted successfully")
        this.getAllProducts();
      },
      error: (resp) => {
        alert("Error while deleting product")
      }
    })
  }

  openCategory() {
    this.dialog.open(CategoryComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllProducts();
      }
    })
  }

}
