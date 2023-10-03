import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { UserService } from '../../services/user.service';
import { passwordsMatchValidator } from '../../utils/validators';
import { SUBJECTS, getControlError } from '../../utils/constants';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  form = this.initForm();
  loading: boolean = false;
  standards!: SelectItem[];
  boards!: SelectItem[];
  mediums!: SelectItem[];
  filteredSubjects!: string[];
  currentUser!: User;
  constructor(private fb: NonNullableFormBuilder,
    private authService: AuthenticationService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.form.controls.email.disable();
    this.getStandards();
    this.getBoards();
    this.getMediums();
    this.userService.user$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.setFormData(user);
      }
    });
  }

  setFormData(user: User) {
    if (user.education?.favSubjects) {
      const favSubjects = user.education?.favSubjects.map((favSubject: any) => {
        return SUBJECTS.find(s => s.value === favSubject);
      })
      user.education.favSubjects = favSubjects
    }
    this.form.patchValue(user);
  }

  initForm() {
    return this.fb.group({
      name: ['', Validators.required],
      email: [''],
      education: this.fb.group({
        board: ['', Validators.required],
        standard: ['', Validators.required],
        medium: ['', Validators.required],
        favSubjects: [[], Validators.required]
      })
    }, { validators: passwordsMatchValidator() });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value)
  }

  get getNameError() {
    return getControlError(this.form, 'name');
  }

  get getPasswordError() {
    return getControlError(this.form, 'password');
  }

  get getBoardError() {
    return getControlError(this.form, 'board');
  }

  get getConfirmPasswordError() {
    return getControlError(this.form, 'confirmPassword');
  }

  get getStandardError() {
    return getControlError(this.form, 'standard');
  }

  get getMediumError() {
    return getControlError(this.form, 'medium');
  }

  get getFavSubjectsError() {
    return getControlError(this.form, 'favSubjects');
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
