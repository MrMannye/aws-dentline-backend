// Tipo para la tabla de dentistas
export interface Dentista {
	id_dentista: number;
	nombre: string;
	especializacion: string;
	telefono: string;
	email: string;
	numero_tarjeta: string;
	cuenta_clabe: string;
	wallet_address: string;
}

// Tipo para la tabla de pacientes
export interface Paciente {
	id_paciente: number;
	nombre: string;
	profesion: string;
	edad: number;
	estado_civil: string;
	fecha_nacimiento: Date;
	direccion: string;
	telefono: string;
	email: string;
	id_dentista: number; // Relación con el dentista
}

// Tipo para la tabla de signos vitales
export interface SignosVitales {
	id_signos: number;
	id_paciente: number;
	tipo_sangre: string;
	estatura: number;
	peso: number;
	pulso: number;
	presion: number;
	temperatura: number;
}

// Tipo para la tabla de citas
export interface Cita {
	id_cita: number;
	id_paciente: number;
	id_dentista: number;
	fecha_cita: Date;
	motivo: string;
}

export interface CitaRecap {
	nombre: string;
	telefono: string;
	email: string;
	fecha_cita: Date;
	motivo: string;
	costo_total: number;
	abono: number;
	observaciones: string;
}

// Tipo para la tabla de tratamientos
export interface Tratamiento {
	id_tratamiento: number;
	nombre: string;
	descripcion: string;
	costo: number;
}

// Tipo para la tabla de citas_tratamientos
export interface CitaTratamiento {
	id_cita_tratamiento: number;
	id_cita: number;
	id_tratamiento: number;
	dientes: string;
	precio: number;
	motivo: string;
}

// Tipo para la tabla de expediente médico
export interface ExpedienteMedico {
	id_expediente: number;
	id_paciente: number;
	id_cita_tratamiento: number;
	tratamientos_previos: string;
}

// Ejemplo de cómo se pueden agrupar los tipos
export interface SistemaClinico {
	dentistas: Dentista[];
	pacientes: Paciente[];
	signosVitales: SignosVitales[];
	citas: Cita[];
	tratamientos: Tratamiento[];
	citasTratamientos: CitaTratamiento[];
	expedientesMedicos: ExpedienteMedico[];
}
