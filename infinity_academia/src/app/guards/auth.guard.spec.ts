import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  let guard: AuthGuard;
  // const executeGuard: CanActivateFn = (...guardParameters) => 
  //     TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        
      ]
    });
    guard = TestBed.inject(AuthGuard);

  });

  it('should allow logged user to access page', () => {
    // expect(executeGuard).toBeTruthy();
    guard.canActivate().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    })
  });
});
