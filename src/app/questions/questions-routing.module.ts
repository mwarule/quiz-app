import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './components/questions/questions.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';

const routes: Routes = [{
  path: '',
  component: QuestionsComponent
}, {
  path: 'create',
  component: CreateQuestionComponent
}, { path: '**', redirectTo: '', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
