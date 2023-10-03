import { FormGroup } from "@angular/forms";

export const ADMIN_MENU = [
  {
    label: 'Home',
    items: [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin/dashboard'] },
    ],
  },
  {
    label: 'Questions',
    items: [
      {
        label: 'Questions',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/questions'],
      },
      {
        label: 'Add Question',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/questions/create'],
      },
      { label: 'Tags', icon: 'pi pi-fw pi-home', routerLink: ['/tags'] },
    ],
  },
  {
    label: 'Quiz',
    items: [
      { label: 'Quizs', icon: 'pi pi-fw pi-home', routerLink: ['/quizs'] },
      { label: 'Add Quiz', icon: 'pi pi-fw pi-home', routerLink: ['/quizs/create'] },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Profile', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
      { label: 'Settings', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
    ],
  },
];

export const USER_MENU = [
  {
    label: 'Home',
    items: [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
    ],
  },
  {
    label: 'Study Material',
    items: [
      {
        label: 'Syllabus',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/curriculum/syllabus'],
      },
      {
        label: 'Books',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/curriculum/books'],
      },
      { label: 'Tags', icon: 'pi pi-fw pi-home', routerLink: ['/tags'] },
    ],
  },
  {
    label: 'Quiz',
    items: [
      { label: 'Quizs', icon: 'pi pi-fw pi-home', routerLink: ['/quizs'] },
      { label: 'Add Quiz', icon: 'pi pi-fw pi-home', routerLink: ['/quizs/create'] },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Profile', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
      { label: 'Settings', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
    ],
  },
];

export const SUBJECTS = [
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'Science',
    value: 'science',
  },
  {
    label: 'History',
    value: 'history',
  },
  {
    label: 'Geography',
    value: 'geography',
  },
  {
    label: 'Civics',
    value: 'civics',
  },
  {
    label: 'Enviornmental Studies',
    value: 'evs',
  },
  {
    label: 'Maths',
    value: 'maths',
  },
  {
    label: 'Sanskrit',
    value: 'sanskrit',
  },
  {
    label: 'Political Science',
    value: 'political',
  },
];

export const SKELETON_TYPES = {
  DEFAULT: 'default',
  FORM: 'form',
  TABLE: 'table'
}

export const QUESTION_TYPES = [{
  label: 'Boolean',
  value: 'boolean'
}, {
  label: 'Multiple Choice',
  value: 'mcq'
}, {
  label: 'Short Answer',
  value: 'short'
}, {
  label: 'Match the pairs',
  value: 'match'
}, {
  label: 'Fill in the blanks',
  value: 'blanks'
}];


export const getControlError = (form: FormGroup, field: string) => {
  return form.get(field)?.invalid && (form.get(field)?.dirty || form.get(field)?.touched)
}