import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMessageCardComponent } from './components/profile-message-card/profile-message-card.component';
import { QuestionFiltersComponent } from './components/question-filters/question-filters.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InplaceModule } from 'primeng/inplace';
@NgModule({
  declarations: [
    ProfileMessageCardComponent,
    QuestionFiltersComponent,
    SkeletonComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SkeletonModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    MultiSelectModule,
    FileUploadModule,
    AvatarModule,
    AvatarGroupModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    InplaceModule
  ],
  exports: [
    ProfileMessageCardComponent,
    QuestionFiltersComponent,
    SkeletonComponent,
    UserProfileComponent
  ]
})
export class CoreModule { }
