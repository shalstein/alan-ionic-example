import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestPage } from './my-test.page';

describe('MyTestPage', () => {
  let component: MyTestPage;
  let fixture: ComponentFixture<MyTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
