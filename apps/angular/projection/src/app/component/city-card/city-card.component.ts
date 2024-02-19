import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardImageDirective } from '../../ui/card/card-image.directive';
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      (add)="onAdd()"
      (delete)="onDelete($event)"
      customClass="bg-light-green">
      <ng-template appCardImage>
        <img src="assets/img/city.png" width="200px" />
      </ng-template>
      <ng-template appCardItem let-item>
        {{ item.name }}
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, CardImageDirective, CardItemDirective],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => (this.cities = s));
  }

  onAdd() {
    this.store.addOne(randomCity());
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }
}
