import { isPlatformBrowser } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

export type UserRole = 'admin' | 'empleado' | 'cliente' | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'minimarket-libros-role';
  private readonly roleSignal = signal<UserRole>(null);

  readonly role = computed(() => this.roleSignal());
  readonly isAuthenticated = computed(() => this.roleSignal() !== null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const storedRole = localStorage.getItem(this.storageKey) as UserRole;

      if (storedRole === 'admin' || storedRole === 'empleado' || storedRole === 'cliente') {
        this.roleSignal.set(storedRole);
      }
    }
  }

  login(role: Exclude<UserRole, null>) {
    this.roleSignal.set(role);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, role);
    }
  }

  logout() {
    this.roleSignal.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
    }
  }
}