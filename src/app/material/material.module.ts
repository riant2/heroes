import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatListModule,
  MatTableModule,
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatListModule, MatTableModule],
  exports: [MatButtonModule, MatCheckboxModule, MatListModule, MatTableModule],
})
export class MaterialModule {}
