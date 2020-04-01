import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindNearComponent } from './find-near.component';

describe('FindNearComponent', () => {
  let component: FindNearComponent;
  let fixture: ComponentFixture<FindNearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindNearComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindNearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
