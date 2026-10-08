import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PasswordField } from '../shared/components/password-field/password-field';
import { CommonModule } from '@angular/common';
import { User } from '../services/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, PasswordField,
    ReactiveFormsModule, MatProgressSpinnerModule],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
  encapsulation: ViewEncapsulation.Emulated
})
export class Register {

  form: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: User,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get fullNameErrors(): string | null {
    const control = this.form.get('nome');
    if (control?.hasError('required')) return 'O campo Nome Completo é obrigatório.';
    if (control?.hasError('minlength')) return 'O campo Nome Completo deve ter pelo menos 3 caracteres.';
    return null;

  }

  get emailErrors(): string | null {
    const control = this.form.get('email');
    if (control?.hasError('required')) return 'O campo Email é obrigatório.';
    if (control?.hasError('email')) return 'O campo Email deve ser um endereço de email válido.';
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = this.form.value;
    this.isLoading = true;
    this.userService.register(formData)
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: (response) => {
        // console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }

}
