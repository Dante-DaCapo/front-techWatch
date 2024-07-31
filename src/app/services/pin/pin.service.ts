import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ACCESS_TOKEN_PROTECTED } from '../../shared/jwt.interceptor';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { TagService } from '../tag/tag.service';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  private pins = signal<Pin[]>([]);

  constructor(
    private readonly http: HttpClient,
    private readonly tagService: TagService
  ) {}

  get pins$() {
    return this.pins.asReadonly();
  }

  private setPins(newPins: Pin[]) {
    this.pins.set(
      newPins.sort(
        (a, b) =>
          new Date(b.createdDate).getMilliseconds() -
          new Date(a.createdDate).getMilliseconds()
      )
    );
  }

  clearPins(): void {
    this.setPins([]);
  }

  deletePin(pinId: number): Observable<boolean> {
    return this.http
      .delete<HttpResponse<null>>(`pin/${pinId}`, {
        context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status === 200) {
            this.removePin(pinId);
            this.tagService.loadTags();
            return true;
          } else {
            return false;
          }
        }),
        catchError((error) => {
          console.log('Error while deleting pin: ', error);
          return of(false);
        })
      );
  }

  loadPins(): void {
    this.http
      .get<Pin[]>('pin/get-all-user-pins', {
        context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
      })
      .subscribe((pins) => {
        this.setPins(pins);
      });
  }

  searchPins(searchString: string): void {
    this.http
      .get<Pin[]>('pin/search-pin', {
        context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
        params: { q: searchString },
      })
      .subscribe((pins) => this.pins.set(pins));
  }

  extractDataFromUrl(url: string): Observable<ExtractedUrlInfos> {
    return this.http.post<ExtractedUrlInfos>(
      'pin/extract-data-from-url',
      { url },
      {
        context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
      }
    );
  }

  savePin(pin: Omit<Pin, 'id' | 'createdDate'>): Observable<void> {
    return this.http
      .post<Pin>('pin/create-pin', pin, {
        context: new HttpContext().set(ACCESS_TOKEN_PROTECTED, true),
      })
      .pipe(
        map((response: Pin) => {
          this.setPins([...this.pins(), response]);
          this.tagService.loadTags();
        })
      );
  }

  private removePin(pinId: number): void {
    this.pins.set(this.pins().filter((pin) => pin.id !== pinId));
  }
}

export type Pin = {
  id: number;
  title: string;
  description: string;
  sourceUrl: string;
  imageUrl: string;
  tags: string[];
  createdDate: Date;
};

export type ExtractedUrlInfos = {
  title: string;
  description: string;
  imageUrl: string;
};
