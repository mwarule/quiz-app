import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    CreateQuizComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    InputSwitchModule,
    ButtonModule,
    RadioButtonModule,
    MultiSelectModule,
    ChipsModule,
    TableModule,
    DialogModule,
    ToolbarModule,
    AutoCompleteModule,
    DataViewModule,
    TagModule,
    AccordionModule,
    DragDropModule,
    PickListModule,
    InputNumberModule,
    OverlayPanelModule,
    QuizRoutingModule,
    CoreModule
  ],
  providers: []
})
export class QuizModule { }
