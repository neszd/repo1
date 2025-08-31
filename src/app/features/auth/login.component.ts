import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  loading = false;
  showPassword = false;

  readonly f = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true],
  });

  // 👇 Estos dos getters resuelven el error del template
  get ux() { return this.f.controls.username; }
  get pw() { return this.f.controls.password; }

  toggleShowPassword() { this.showPassword = !this.showPassword; }

  async onSubmit() {
    if (this.f.invalid || this.loading) return;
    this.loading = true;
    await new Promise(r => setTimeout(r, 800));
    console.log('Login OK', this.f.getRawValue());
    this.loading = false;
  }
}
