import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder } from '@angular/forms';
import { passwordsMatchValidator } from '../../../core/utils/validators';
import { AuthenticationService } from '../../services/authentication.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { catchError, mergeMap, of, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { SUBJECTS } from 'src/app/core/utils/constants';
import { User as AppUser, Education } from '../../../core/models/user';
import { User, UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = this.initForm();
  loading: boolean = false;
  standards!: SelectItem[];
  boards!: SelectItem[];
  mediums!: SelectItem[];
  filteredSubjects!: string[];
  constructor(private fb: NonNullableFormBuilder,
    private authService: AuthenticationService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getStandards();
    this.getBoards();
    this.getMediums();
  }

  initForm() {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      education: this.fb.group({
        board: ['', Validators.required],
        standard: ['', Validators.required],
        medium: ['', Validators.required],
        favSubjects: [[], Validators.required]
      })
    }, { validators: passwordsMatchValidator() });
  }

  onSubmit() {
    this.loading = true;
    let createdUser: User;
    const subjects = this.form.value.education?.favSubjects || [] as any[];
    const user: AppUser = {
      uid: '',
      email: this.form.value.email || '',
      name: this.form.value.name || '',
      education: {
        board: this.form.value.education?.board || '',
        standard: this.form.value.education?.standard || '',
        medium: this.form.value.education?.medium || '',
        favSubjects: subjects.map(s => s.value),
      }
    }
    this.authService
      .register(this.form.value.email || '', this.form.value.password || '')
      .pipe(
        mergeMap((u: UserCredential, i: number) => {
          createdUser = u.user;
          user.uid = createdUser.uid;
          return this.userService.add(user)
        }),
        mergeMap(() => this.authService.sendVerificationMail(createdUser)
        .pipe(catchError((error) => of(error)))) 
      )
      .subscribe({
        next: (user) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'Your account has been created. Please log in to continue',
          });
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Registration failed',
            detail: this.authService.resolveAuthErrors(error.code),
          });
          this.loading = false;
        }
      });
  }

  get getNameValue() {
    return this.form.get('name')?.invalid && (this.form.get('name')?.dirty || this.form.get('name')?.touched)
  }

  get getEmailValue() {
    return this.form.get('email')?.invalid && (this.form.get('email')?.dirty || this.form.get('email')?.touched)
  }

  get getPasswordValue() {
    return this.form.get('password')?.invalid && (this.form.get('password')?.dirty || this.form.get('password')?.touched)
  }

  get getUserNameValue() {
    return this.form.get('username')?.invalid && (this.form.get('username')?.dirty || this.form.get('username')?.touched)
  }

  get getConfirmPasswordValue() {
    return this.form.get('confirmPassword')?.invalid && (this.form.get('confirmPassword')?.dirty || this.form.get('confirmPassword')?.touched)
  }

  get getBoardValue() {
    return this.form.get('board')?.invalid && (this.form.get('board')?.dirty || this.form.get('board')?.touched)
  }

  get getStandardValue() {
    return this.form.get('standard')?.invalid && (this.form.get('standard')?.dirty || this.form.get('standard')?.touched)
  }

  get getMediumValue() {
    return this.form.get('medium')?.invalid && (this.form.get('medium')?.dirty || this.form.get('medium')?.touched)
  }

  get getFavSubjectsValue() {
    return this.form.get('favSubjects')?.invalid && (this.form.get('favSubjects')?.dirty || this.form.get('favSubjects')?.touched)
  }

  getStandards() {
    this.standards = [];
    for (let index = 5; index <= 10; index++) {
      this.standards.push({
        label: `Class ${index}`,
        value: index
      })
    }
  }

  getBoards() {
    this.boards = [{
      label: 'Maharashtra State Board',
      value: 'msb'
    }, {
      label: 'Central Board (CBSE)',
      value: 'cbse'
    }]
  }

  getMediums() {
    this.mediums = [{
      label: 'English',
      value: 'english'
    }, {
      label: 'Semi-English',
      value: 'semi'
    }, {
      label: 'Marathi',
      value: 'marathi'
    }]
  }

  filterSubjects(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (SUBJECTS as any[]).length; i++) {
      let subject = (SUBJECTS as any[])[i];
      if (subject.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(subject);
      }
    }

    this.filteredSubjects = filtered;
  }
}