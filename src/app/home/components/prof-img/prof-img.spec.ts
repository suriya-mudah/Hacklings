import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfImg } from './prof-img';

describe('ProfImg', () => {
  let component: ProfImg;
  let fixture: ComponentFixture<ProfImg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfImg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfImg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
