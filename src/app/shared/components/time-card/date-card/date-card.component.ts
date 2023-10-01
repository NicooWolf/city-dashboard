import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-date-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss'],
})
export class DateCardComponent {
  @Input() capitalTimeDayData: Date = new Date();
  @Input() datePipeProps: string[] = [];
  @Input() timeClassProps: { timeClass: string; props?: string } = {
    timeClass: '',
    props: '',
  };
  @Input() hasParagraph: boolean = true;

  constructor() {}
}
