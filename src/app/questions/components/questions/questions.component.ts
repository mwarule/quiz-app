import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { Question } from '../../../core/models/question';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
@UntilDestroy()
export class QuestionsComponent implements OnInit {
  questions!: Question[];
  selectedQuestions!: Question[];
  sortOptions: SelectItem[] = [
    { label: 'Question Desc', value: '!question' },
    { label: 'Question Asc', value: 'question' }
  ];
  sortOrder: number = 0;
  sortField: string = '';
  constructor(private questionsService: QuestionsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,) {

  }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questionsService.getAll()
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

  filterQuestions(table: any, event: any) {
    table.filterGlobal(event.target.value, 'contains');
  }

  addNewQuestion() {
    this.router.navigate(['/admin/question']);
  }
  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  onFilter(dv: DataView, event: Event) {
      dv.filter((event.target as HTMLInputElement).value);
  }

  hasMulitpleAnswers(answer: any) {
    return Array.isArray(answer);
  }

  editQuestion(id: string) {
    this.router.navigate(['/admin/question', id]);
  }

  deleteQuestions(questions: Question[]) {
    this.questionsService.delete(questions)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Questions deleted successfully.`,
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  showDeleteConfirmation(questions: Question[]) {
    let message = `Are you sure you want to delete the selected questions?`
    this.confirmationService.confirm({
      message: message,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.deleteQuestions(questions);
      }
    });
  }
}
