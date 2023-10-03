import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { QuestionsService } from '../../../questions/services/questions.service';
import { Question } from 'src/app/core/models/question';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TagsService } from '../../../tags/services/tags.service';

@UntilDestroy()
@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  form: FormGroup = this.initForm();
  questions: Question[] = [];
  selectedQuestions: Question[] = [];
  showQuestionsError = false;
  types = [{
    label: 'Multiple Choice',
    value: 'mcq'
  }, {
    label: 'Custom',
    value: 'custom'
  }]
  constructor(private fb: FormBuilder,
    private questionService: QuestionsService,
    private tagsService: TagsService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }
    
  ngOnInit(): void {
  }

  initForm() {
    return this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // questions: [[], [Validators.required]],
      type: ['', Validators.required]
    });
  }

  get showTitleError() {
    return this.form.get('title')?.invalid && (this.form.get('title')?.dirty || this.form.get('title')?.touched)
  }

  get showDescriptionError() {
    return this.form.get('description')?.invalid && (this.form.get('description')?.dirty || this.form.get('description')?.touched)
  }

  get showTypeError() {
    return this.form.get('type')?.invalid && (this.form.get('type')?.dirty || this.form.get('type')?.touched)
  }

  getQuestions(type?: string) {
    const method = type ? this.questionService.getByType(type) : this.questionService.getAll()
    method
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (questions: Question[]) => {
       this.questions = questions;
       console.log(this.questions)
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  onSubmit() {
    if(!this.form.valid) {
      return;
    }
    if(!this.selectedQuestions || !this.selectedQuestions.length || this.selectedQuestions.length < 5) {
      this.showQuestionsError = true;
      return;
    }
    this.showQuestionsError = false;
    console.log(this.form.value)
    const selectedQuestions = this.selectedQuestions.map(q => q.uid);
    console.log(selectedQuestions)
  }

  quizTypeChanged(event: any) {
    if(event) {
      const type = event.value === 'custom' ? '' : event.value
      this.getQuestions(type);
    }
  }

  hasMulitpleAnswers(answer: any) {
    return Array.isArray(answer);
  }

}
