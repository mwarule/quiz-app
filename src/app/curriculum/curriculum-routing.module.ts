import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SyllabusComponent } from './components/syllabus/syllabus.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'syllabus',
  pathMatch: 'full'
},{
  path: 'syllabus',
  component: SyllabusComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule { }
