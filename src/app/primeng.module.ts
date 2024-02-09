import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

const modPrimeNg: any = [
  ButtonModule,
  CardModule,
  InputTextModule,
  PasswordModule  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  
  ],
  exports: [
    modPrimeNg
  ]
})
export class PrimengModule { }
