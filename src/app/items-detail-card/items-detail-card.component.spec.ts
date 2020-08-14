import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDetailCardComponent } from './items-detail-card.component';

describe('ItemsDetailCardComponent', () => {
  let component: ItemsDetailCardComponent;
  let fixture: ComponentFixture<ItemsDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
