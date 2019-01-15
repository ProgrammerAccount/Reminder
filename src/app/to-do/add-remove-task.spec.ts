import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManager } from './add-remove-task';
import { Task } from './task';

describe('TaskManager', () => {
let service: TaskManager;

  beforeEach(() => {
  });

  afterEach(() => {
    service = null;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

});
