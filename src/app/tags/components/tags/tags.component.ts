import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tag } from 'src/app/core/models/tag';
import { TagsService } from '../../services/tags.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
@UntilDestroy()
export class TagsComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  tags!: Tag[];
  selectedTags!: Tag[];
  showDialog = false;
  tag!: Tag | null;
  loadingTags = false;
  constructor(private fb: FormBuilder,
    private tagsService: TagsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.getAllTags()
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.loading = true;
    if(this.tag) {
      this.editTag();
    } else {
      this.addTag();
    }
  }

  addTag() {
    this.tagsService.add(this.form.value)
    .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Tag ${this.form.value.name} added successfully.`,
          });
          this.loading = false;
          this.showDialog = false;
          this.tag = null;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message
          });
          this.loading = false;
        }
      })
  }

  editTag() {
    this.tagsService.update({...this.form.value, uid: this.tag?.uid})
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Tag ${this.form.value.name} edited successfully.`,
        });
        this.loading = false;
        this.showDialog = false;
        this.tag = null;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message
        });
        this.loading = false;
      }
    })
  }

  getAllTags() {
    this.loadingTags = true;
    this.tagsService.getAll()
    .pipe(untilDestroyed(this))
      .subscribe({
        next: (tags: Tag[]) => {
          this.tags = tags.map(t => {
            return {
              uid: t.uid,
              name: t.name,
              description: t.description
            };
          });
          console.log(this.tags)
          this.loadingTags = false;
        },
        error: (error) => {
          console.log(error)
          this.loadingTags = false;
        }
      });
  }

  filterTags(table: any, event: any) {
    table.filterGlobal(event.target.value, 'contains');
  }

  showAddTagDialog() {
    this.tag = null;
    this.showDialog = true;
    this.form.reset();
  }

  showEditDialog(tag: Tag) {
    this.tag = { ...tag };
    this.showDialog = true;
    this.form.patchValue({
      name: tag.name,
      description: tag.description
    });
  }

  showDeleteConfirmation(tags: Tag[]) {
    let message = `Are you sure you want to delete the selected tags?`
    if(tags?.length === 1) {
      message = `Are you sure you want to delete Tag: ${tags[0].name}?`
    }
    this.confirmationService.confirm({
      message: message,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.deleteTags(tags);
      }
    });
  }

  deleteTags(tags: Tag[]) {
    this.tagsService.delete(tags)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Tags deleted successfully.`,
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  get showNameError() {
    return this.form.get('name')?.invalid && (this.form.get('name')?.dirty || this.form.get('name')?.touched)
  }

  get showDescriptionError() {
    return this.form.get('description')?.invalid && (this.form.get('description')?.dirty || this.form.get('description')?.touched)
  }
}
