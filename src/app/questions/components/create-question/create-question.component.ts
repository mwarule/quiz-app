import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { QuestionsService } from '../../services/questions.service';
import { Tag } from 'src/app/core/models/tag';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from '../../../core/models/question';
import { first } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TagsService } from '../../../tags/services/tags.service';
import { QUESTION_TYPES } from '../../../core/utils/constants';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
@UntilDestroy()
export class CreateQuestionComponent implements OnInit {
  form: FormGroup = this.initForm()
  types!: SelectItem[];
  submitting = false;
  tags!: string[];
  booleanOptions: SelectItem[] = [{
    label: 'True',
    value: 'true'
  }, {
    label: 'False',
    value: 'false'
  }]
  editMode = false;
  loadingQuestion = false;
  questionId!: string
  constructor(private fb: FormBuilder,
    private questionService: QuestionsService,
    private tagsService: TagsService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.types = QUESTION_TYPES;
    this.subscribeToRoute();
  }

  get title() {
    return this.editMode ? 'Edit Question' : 'Add Question' 
  }

  subscribeToRoute() {
    this.route.params
    .pipe(untilDestroyed(this))
    .subscribe((params: Params) => {
      if(params['id']) {
        this.questionId = params['id'];
        this.editMode = true;
        this.loadingQuestion = true;
        this.getQuestionbyId(this.questionId);
      }
    });
  }

  getQuestionbyId(id: string) {
    this.questionService.getById(id)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (question) => {
        if(question) {
          this.setFormData(question);
          this.loadingQuestion = false;
        }
      },
      error: (error) => {
        console.log(error);
        this.loadingQuestion = false;
      }
    })
  }

  setFormData(question: Question) {
    this.questionTypeChanged({ value: question.type});
    this.form.patchValue(question);
    if(question.options && question.options.length > 0) {
      question.options.forEach(option => {
        this.addOption(option);
      });
    }
  }

  initForm() {
    return this.form = this.fb.group({
      question: ['', [Validators.required]],
      type: ['', [Validators.required]],
      tags: ['', Validators.required],
      marks: [1, Validators.required]
    });
  }

  questionTypeChanged(event: any) {
    if (event.value === 'mcq') {
      if(this.form.get('options')) {
        this.form.removeControl('options');
      }
      if(this.form.get('answer')) {
        this.form.removeControl('answer');
      }
      this.form.addControl('options', this.fb.array([], Validators.required));
      this.form.addControl('answer', new FormControl('', Validators.required));
    }
    if(event.value === 'boolean') {
      this.form.addControl('options', this.fb.array(['true', 'false'], Validators.required));
      this.form.addControl('answer', new FormControl('', Validators.required));
    }

    if(event.value === 'short') {
      this.form.addControl('answer', new FormControl('', Validators.required));
      if(this.form.get('options')) {
        this.form.removeControl('options');
      }
    }
  }

  removeOption(idx: number) {
    this.options.removeAt(idx);
  }

  addOption(value?: string) {
    this.options.push(new FormControl(value ? value : '', Validators.required));
  }

  onSubmit() {
    if(!this.form.valid) {
      return;
    }
    this.submitting = true;
    let method, message = `Question added successfully.`;
    if(this.editMode) {
      const question: Question = {uid: this.questionId, ...this.form.value};
      method = this.questionService.update(question);
      message = `Question updated successfully.`;
    } else {
      method = this.questionService.add(this.form.value);
    }
    method
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: message,
        });
        this.submitting = false;
        this.form.reset();
        if(this.editMode) {
          this.router.navigate(['/admin/questions']);
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message
        });
        this.submitting = false;
      }
    })
  }

  get options(): FormArray {
    return this.form.get("options") as FormArray;
  }

  get showQuestionTypeError() {
    return this.form.get('type')?.invalid && (this.form.get('type')?.dirty || this.form.get('type')?.touched)
  }

  get showQuestionError() {
    return this.form.get('question')?.invalid && (this.form.get('question')?.dirty || this.form.get('question')?.touched)
  }

  get showTagsError() {
    return this.form.get('tags')?.invalid && (this.form.get('tags')?.dirty || this.form.get('tags')?.touched)
  }

  get showAnswerError() {
    return this.form.get('answer')?.invalid && (this.form.get('answer')?.dirty || this.form.get('answer')?.touched)
  }

  get showMarksError() {
    return this.form.get('marks')?.invalid && (this.form.get('marks')?.dirty || this.form.get('marks')?.touched)
  }

  filterTags(event: any) {
    this.tagsService.search(event.query)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (tags) => {
        this.tags = tags.map(tag => tag.name);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
