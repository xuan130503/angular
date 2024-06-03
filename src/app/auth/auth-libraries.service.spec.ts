import { TestBed } from '@angular/core/testing';

import { AuthLibrariesService } from './auth-libraries.service';

describe('AuthLibrariesService', () => {
  let service: AuthLibrariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLibrariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
