import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface TipoUbica {
  codTipoUbica: number;
  descTipoUbica: string;
}

interface Ubicacion {
  codUbica: number;
  nomUbica: string;
  tipoUbica: number;
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

  tiposUbicacion: TipoUbica[] = [
    { codTipoUbica: 1, descTipoUbica: 'País' },
    { codTipoUbica: 2, descTipoUbica: 'Departamento' },
    { codTipoUbica: 3, descTipoUbica: 'Ciudad' },
    { codTipoUbica: 4, descTipoUbica: 'Área' },
    { codTipoUbica: 5, descTipoUbica: 'Provincia' }
  ];

  ubicaciones: Ubicacion[] = [
    { codUbica: 57, nomUbica: 'Colombia', tipoUbica: 1 },
    { codUbica: 1, nomUbica: 'E.U', tipoUbica: 1 },
    { codUbica: 34, nomUbica: 'España', tipoUbica: 1 },
    { codUbica: 54, nomUbica: 'Argentina', tipoUbica: 1 },
    { codUbica: 5, nomUbica: 'Antioquia', tipoUbica: 2 },
    { codUbica: 81, nomUbica: 'Arauca', tipoUbica: 2 },
    { codUbica: 11, nomUbica: 'Bogotá D.C.', tipoUbica: 2 },
    { codUbica: 15, nomUbica: 'Boyacá', tipoUbica: 2 },
    { codUbica: 25, nomUbica: 'Cundinamarca', tipoUbica: 2 },
    { codUbica: 205, nomUbica: 'Alabama', tipoUbica: 4 },
    { codUbica: 907, nomUbica: 'Alaska', tipoUbica: 4 },
    { codUbica: 209, nomUbica: 'California', tipoUbica: 4 }
  ];

  ubicacionesFiltradas: Ubicacion[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      user: ['', [Validators.required, Validators.maxLength(6)]],
      fechaRegistro: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      tipoUbica: ['', [Validators.required]],
      codUbica: ['', [Validators.required]]
    });
  }

  onTipoUbicaChange(event: Event): void {
    const selectedTipo = Number((event.target as HTMLSelectElement).value);
    this.ubicacionesFiltradas = this.ubicaciones.filter(
      u => u.tipoUbica === selectedTipo
    );
    this.registerForm.get('codUbica')?.setValue('');
  }

  validarCorreo(): void {
    const email = this.registerForm.get('email')?.value;
    if (!email) {
      alert('⚠️ Por favor ingresa un correo antes de validar.');
      return;
    }

    setTimeout(() => {
      this.correoValidado = true;
      alert('✅ Correo validado correctamente (simulado)');
    }, 500);
  }

  onSubmit(): void {
    if (!this.registerForm.valid || !this.correoValidado) {
      alert('Completa el formulario y valida tu correo antes de enviar.');
      return;
    }

    console.log('🟢 Usuario registrado:', this.registerForm.value);
    alert('✅ Usuario registrado con éxito (simulado)');
    this.registerForm.reset();
    this.correoValidado = false;
    this.ubicacionesFiltradas = [];
  }
}
