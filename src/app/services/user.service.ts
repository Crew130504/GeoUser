// src/app/services/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Validar correo: envía código al correo del usuario
  sendValidationCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/validar-correo`, { email });
  }

  // Verificar código que ingresó el usuario
  verifyCode(email: string, codigo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verificar-codigo`, { email, codigo });
  }

  // Registrar usuario
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, data);
  }

  // Obtener tipos de ubicación
  getTiposUbicacion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tipoubica`);
  }

  // Obtener ubicaciones por tipo
  getUbicacionesPorTipo(tipo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ubicaciones/tipo/${tipo}`);
  }
  //Ubicaciones 
  getUbicaciones(): Observable<any> {
  return this.http.get(`${this.apiUrl}/ubicaciones`);
}

}
