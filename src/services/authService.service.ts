// src/app/services/auth.service.ts
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegistroRequest, UsuarioResponse } from '../interfaces/auth.interfaces';

export type UserRole = 'admin' | 'empleado' | 'cliente' | null;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly API = 'http://localhost:8080/api/v1/auth';

  private readonly tokenKey = 'bm-token';
  private readonly userKey  = 'bm-user';

  private readonly tokenSignal  = signal<string | null>(null);
  private readonly usuarioSignal = signal<UsuarioResponse | null>(null);

  readonly isAuthenticated = computed(() => this.tokenSignal() !== null);

  // Mapea rol numérico al string que usa tu navbar
  readonly role = computed<UserRole>(() => {
    const rol = this.usuarioSignal()?.rol;
    if (rol === 3) return 'admin';
    if (rol === 2) return 'empleado';
    if (rol === 1) return 'cliente';
    return null;
  });

  readonly usuario = computed(() => this.usuarioSignal());
  readonly token   = computed(() => this.tokenSignal());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const token  = localStorage.getItem(this.tokenKey);
      const raw    = localStorage.getItem(this.userKey);
      if (token && raw) {
        this.tokenSignal.set(token);
        this.usuarioSignal.set(JSON.parse(raw));
      }
    }
  }

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API}/login`, request).pipe(
      tap(res => this.persistSession(res))
    );
  }

  register(request: RegistroRequest) {
    return this.http.post<LoginResponse>(`${this.API}/register`, request).pipe(
      tap(res => this.persistSession(res))
    );
  }

  logout() {
    this.tokenSignal.set(null);
    this.usuarioSignal.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
  }

  private persistSession(res: LoginResponse) {
    this.tokenSignal.set(res.token);
    this.usuarioSignal.set(res.usuario);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, res.token);
      localStorage.setItem(this.userKey, JSON.stringify(res.usuario));
    }
  }
}