import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurriculumRoutingModule } from './curriculum-routing.module';
import { SyllabusComponent } from './components/syllabus/syllabus.component';
import { SyllabusService } from './services/syllabus.service';


@NgModule({
  declarations: [
    SyllabusComponent
  ],
  imports: [
    CommonModule,
    CurriculumRoutingModule
  ],
  providers: [
    SyllabusService
  ]
})
export class CurriculumModule { }
