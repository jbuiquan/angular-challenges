import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { CardImageDirective } from './card-image.directive';
import { CardItemDirective } from './card-item.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      @if (imageContent) {
        <ng-container
          [ngTemplateOutlet]="imageContent.templateRef"></ng-container>
      }
      <section>
        @for (item of list; track item.id) {
          <app-list-item>
            @if (itemContent) {
              <ng-container
                [ngTemplateOutlet]="itemContent.templateRef"
                [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
            }
            <button (click)="delete.emit(item.id)">
              <img class="h-5" src="assets/svg/trash.svg" />
            </button>
          </app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() list: CardType[] | null = null;
  @Input() customClass = '';

  @Output() add = new EventEmitter();
  @Output() delete = new EventEmitter<number>();

  @ContentChild(CardImageDirective) imageContent!: CardImageDirective | null;
  @ContentChild(CardItemDirective) itemContent!: CardItemDirective;
}
