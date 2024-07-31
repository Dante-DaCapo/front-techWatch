import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PinService } from '../services/pin/pin.service';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  searchForm = this.formBuilder.nonNullable.group({
    search: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.searchForm.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        switchMap((search) => {
          if (search) {
            this.pinService.searchPins(search);
          } else {
            this.pinService.loadPins();
          }
          return search;
        })
      )
      .subscribe();
  }

  ngOnChange(): void {
    if (!this.searchForm.value?.search) {
      this.pinService.loadPins();
    }
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pinService: PinService
  ) {}
}
