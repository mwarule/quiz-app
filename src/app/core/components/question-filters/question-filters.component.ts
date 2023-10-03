import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { QUESTION_TYPES } from '../../utils/constants';

@Component({
  selector: 'app-question-filters',
  templateUrl: './question-filters.component.html',
  styleUrls: ['./question-filters.component.scss']
})
export class QuestionFiltersComponent implements OnInit {
  types: SelectItem[] = [];
  selectedType!: SelectItem;
  searchQuery!: string;
  constructor() {}

  ngOnInit(): void {
    this.types = QUESTION_TYPES;
  }

  onTypeChanged(event: any) {
    console.log(event)
  }

}
