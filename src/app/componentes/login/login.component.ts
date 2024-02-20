import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  get email(){
    return this.loginForm.controls['email']
  }

  get password(){
    return this.loginForm.controls['password']
  }

  async login(){
    console.log('Login')
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (typeof password === 'string') {
        const hashedPassword = await this.hashPassword(password);
  
        this.authService.getUserEmail(email as string).subscribe(
          (response: any) => {
            if (response.length > 0 && response[0].password === hashedPassword) {
              sessionStorage.setItem('email', email as string);
              this.router.navigate(['/home']);
            } else {this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email o Contraseña Incorrecta'})}
          },
          error => {this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email o Contraseña Incorrecta'})}
        );
      } else {this.messageService.add({severity: 'error', summary: 'Error', detail: 'Contraseña no válida'});}
    }
  }
  
  

  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashedPassword;
  }
}
