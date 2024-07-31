import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Pin, PinService } from '../services/pin/pin.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'dialog-add-pin',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    LoadingSpinnerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './dialog-add-pin.component.html',
})
export class DialogAddPinComponent {
  url!: string;
  loadingExtraction: boolean = false;
  extractedData:
    | { description: string; title: string; imageUrl: string; tags: string }
    | undefined = undefined;
  constructor(
    private dialogRef: MatDialogRef<DialogAddPinComponent>,
    private pinService: PinService
  ) {}

  onCheck(): void {
    this.loadingExtraction = true;
    this.pinService.extractDataFromUrl(this.url).subscribe((result) => {
      this.extractedData = { ...result, tags: '' };
      setTimeout(() => {
        this.loadingExtraction = false;
      }, 1000);
    });
  }

  save(): void {
    // TODO gestion des erreurs (sur tout l'app)
    if (this.extractedData) {
      this.loadingExtraction = true;
      const toCreatePin: Omit<Pin, 'id' | 'createdDate'> = {
        imageUrl: this.extractedData.imageUrl,
        title: this.extractedData.title,
        description: this.extractedData.description,
        sourceUrl: this.url,
        tags: this.extractedData.tags.split(' '),
      };
      this.pinService.savePin(toCreatePin).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
