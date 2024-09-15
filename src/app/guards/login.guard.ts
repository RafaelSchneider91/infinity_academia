import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  return true;
};
