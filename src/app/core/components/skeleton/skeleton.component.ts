import { Component, Input } from '@angular/core';
import { SKELETON_TYPES } from '../../utils/constants';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  types = SKELETON_TYPES;
  @Input() type = this.types.DEFAULT;
}
