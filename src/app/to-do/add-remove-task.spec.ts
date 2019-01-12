import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveTask } from './add-remove-task';
import { Task } from './task';

describe('AddRemoveTask', () => {
let service: AddRemoveTask;

  beforeEach(() => {
    service =  new AddRemoveTask(new Array < Task[] >() , new Array<string>());
  });

  afterEach(() => {
    service = null;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

});
