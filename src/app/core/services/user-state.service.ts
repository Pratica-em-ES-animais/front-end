import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'NOLOG' | 'ADOTANTE' | 'TUTOR';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private userRoleSubject = new BehaviorSubject<UserRole>('NOLOG');
  userRole$ = this.userRoleSubject.asObservable();

  get userRole(): UserRole {
    return this.userRoleSubject.value;
  }

  setUserRole(role: UserRole): void {
    this.userRoleSubject.next(role);
  }

  reset(): void {
    this.userRoleSubject.next('NOLOG');
  }
}
