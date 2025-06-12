import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

interface Ubicacion {
  codUbica: number;
  nomUbica: string;
  codTipoUbica: number;
  ubicaSup: number | null;
}

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  correoValidado = false;
  codigoEnviado = false;

  // Arreglo jerárquico de ubicaciones por tipo
  ubicaciones: { [nivel: number]: Ubicacion[] } = {};
  todasUbicaciones: Ubicacion[] = [];
  seleccionados: { [nivel: number]: number } = {}; // codUbica seleccionados por nivel

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      user: ['', [Validators.required, Validators.maxLength(6)]],
      fechaRegistro: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      codUbica: ['', Validators.required], // Provincia (último nivel)
      codigo: ['']
    });

    this.cargarUbicaciones();
  }

  cargarUbicaciones(): void {
    this.userService.getUbicaciones().subscribe(data => {
      this.todasUbicaciones = data.map((row: any) => ({
        codUbica: +row[0],
        ubicaSup: row[4] !== null ? +row[4] : null,
        codTipoUbica: +row[2],
        nomUbica: row[3]
      }));

      // Inicial: cargar solo países (tipo 1)
      this.ubicaciones[1] = this.todasUbicaciones.filter(u => u.codTipoUbica === 1);
    });
  }

  onSelectNivel(nivel: number, event: Event): void {
    const valor = Number((event.target as HTMLSelectElement).value);
    this.seleccionados[nivel] = valor;

    // Limpiar niveles siguientes
    for (let n = nivel + 1; n <= 5; n++) {
      this.ubicaciones[n] = [];
      delete this.seleccionados[n];
    }

    // Buscar hijos para el siguiente nivel
    const siguiente = nivel + 1;
    const hijos = this.todasUbicaciones.filter(
      u => u.codTipoUbica === siguiente && u.ubicaSup === valor
    );
    if (hijos.length > 0) {
      this.ubicaciones[siguiente] = hijos;
    }

    // Si es provincia, actualizar codUbica final
    if (siguiente === 6 && valor) {
      this.registerForm.get('codUbica')?.setValue(valor);
    } else {
      this.registerForm.get('codUbica')?.setValue('');
    }
  }

  validarCorreo(): void {
    const email = this.registerForm.get('email')?.value;
    if (!email) {
      alert('Por favor ingresa un correo antes de validar.');
      return;
    }

    this.userService.sendValidationCode(email).subscribe({
      next: () => {
        this.codigoEnviado = true;
        alert('Código enviado al correo.');
      },
      error: () => {
        alert('Error al enviar el código.');
      }
    });
  }

  verificarCodigo(): void {
    const email = this.registerForm.get('email')?.value;
    const codigo = this.registerForm.get('codigo')?.value;

    if (!codigo) {
      alert('Ingresa el código recibido.');
      return;
    }

    this.userService.verifyCode(email, codigo).subscribe({
      next: res => {
        if (res.validado) {
          this.correoValidado = true;
          alert('Correo validado correctamente.');
        } else {
          alert('Código incorrecto.');
        }
      },
      error: () => {
        alert('Error al verificar código.');
      }
    });
  }

  onSubmit(): void {
  if (!this.registerForm.valid || !this.correoValidado) {
    alert('Completa el formulario y valida tu correo antes de enviar.');
    return;
  }

  const data = { ...this.registerForm.value };
  delete data.codigo;

  this.userService.registerUser(data).subscribe({
    next: () => {
      alert('Usuario registrado con éxito.');
      this.registerForm.reset();
      this.correoValidado = false;
      this.codigoEnviado = false;
      this.ubicaciones = { 1: this.ubicaciones[1] }; // mantener países
      this.seleccionados = {};
    },
    error: (err) => {
      alert(err.message); // ← muestra mensaje personalizado desde backend
    }
  });
}
}
