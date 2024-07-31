import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ACCESS_TOKEN_PROTECTED } from '../../shared/jwt.interceptor';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private tags = signal<Tag[]>([]);
  private selectedTag = signal<Tag>({ id: 0, name: 'all' });

  constructor(private readonly http: HttpClient) {}

  get tags$() {
    return this.tags.asReadonly();
  }

  get selectedTag$() {
    return this.selectedTag.asReadonly();
  }

  setSelectedTag(tag: Tag) {
    this.selectedTag.set(tag);
  }

  clearTags(): void {
    this.setSelectedTag({ id: 0, name: 'all' });
    this.tags.set([]);
  }

  loadTags(): void {
    this.http
      .get<Tag[]>('tag/get-user-tags', {
        context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
      })
      .subscribe((tags) => this.tags.set(tags));
  }
}

export type Tag = {
  id: number;
  name: string;
};
