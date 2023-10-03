import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  loading = false
  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const { email, password } = this.form.value;
    this.loading = true

    this.authService
      .login(email, password)
      .subscribe({
        next: (response) => {
          setTimeout(() => {
            this.loading = false
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
            this.router.navigate(['/dashboard']);
          }, 100);
        }, error: (error) => {
          this.loading = false
          this.messageService.add({
            severity: 'error',
            summary: 'Authentication Failed',
            detail: this.authService.resolveAuthErrors(error.code),
          })
        }
      });
  }

  get getEmailvalue() {
    return this.form.get('email')?.invalid && (this.form.get('email')?.dirty || this.form.get('email')?.touched)
  }

  get getPasswordValue() {
    return this.form.get('password')?.invalid && (this.form.get('password')?.dirty || this.form.get('password')?.touched)
  }
}