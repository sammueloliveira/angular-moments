import { TestBed } from '@angular/core/testing';

import { MensagemService } from './message.service';

describe('MensagemService', () => {
  let service: MensagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
