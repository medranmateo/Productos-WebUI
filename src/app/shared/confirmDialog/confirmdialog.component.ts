import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-confirmdialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogContent, MatDialogActions],
  templateUrl: './confirmdialog.component.html',
  styleUrl: './confirmdialog.component.scss'
})
export class ConfirmDialogComponent implements OnInit {

  title: string = "Confirmar";
  message: string = "¿Estás seguro de que deseas realizar esta acción?";

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    if(this.data){
      this.title = this.data['title'];
      this.message = this.data['message'];
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
