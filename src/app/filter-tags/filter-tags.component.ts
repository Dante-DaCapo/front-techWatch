import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { Tag, TagService } from '../services/tag/tag.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-tags',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './filter-tags.component.html',
})
export class FilterTagsComponent {
  tags = this.tagService.tags$;
  selectedTag: Tag = this.tagService.selectedTag$();

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tagService.loadTags();
  }

  ngOnChange(): void {
    this.tagService.setSelectedTag(this.selectedTag);
  }
}
