import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../models/role.model';

export type UserRole = 'NOLOG' | 'ADOTANTE' | 'TUTOR';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private userRoleSubject = new BehaviorSubject<Role | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  get userRole(): Role | null{
    return this.userRoleSubject.value;
  }

  setUserRole(role: Role | null): void {
    this.userRoleSubject.next(role);
  }

  reset(): void {
    this.userRoleSubject.next(null);
  }
}
