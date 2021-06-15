import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(private dialoRef: MatDialogRef<ConfirmarComponent>) {

  }

  ngOnInit(): void {
  }

  borrar(){
    this.dialoRef.close(true)

  }

  cerrar(){
      this.dialoRef.close()
  }

}
