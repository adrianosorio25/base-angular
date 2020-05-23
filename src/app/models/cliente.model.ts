export class Cliente {
    constructor(
        public identificacion: number,
        public nombres: string,
        public apellidos: string,
        public email: string,
        public telefono?: number,
        public direccion?: string,
        public _id?: number
    ) {}
}
