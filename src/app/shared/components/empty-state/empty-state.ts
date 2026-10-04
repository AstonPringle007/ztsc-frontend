import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyStateComponent {

  icon = input<string>('inbox');

  title = input<string>('No data found');

  message = input<string>(
    'There are no records available to display.'
  );

  actionLabel = input<string>('');

  actionClick = output<void>();

  onAction(): void {
    this.actionClick.emit();
  }
}