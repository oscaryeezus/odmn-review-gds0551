import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../shared/password-match.directives';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../../interfaces/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:[a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get fullName() {
    return this.registerForm.controls['fullName']
  }
  get email() {
    return this.registerForm.controls['email']
  }
  get password() {
    return this.registerForm.controls['password']
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword']
  }

  enviarRegistro() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      delete data.confirmPassword;
      if (data.password) {
        this.hashPassword(data.password).then((hashedPassword: string) => {
          data.password = hashedPassword;

          this.authService.registerUser(data as User).subscribe(
            (response: any) => { 
              console.log('Registro exitoso:', response);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registrado Agregado' });
              this.router.navigate(['/login']);
            },
            (error: any) => {
              console.error('Error en el registro:', error);
            }
          );
        });
      }
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
