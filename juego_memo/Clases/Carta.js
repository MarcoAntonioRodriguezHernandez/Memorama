class Carta {
    id = 0
    nombre = ''
    caraDelantera = ''
    caraTrasera = ''
    caraActual = ''
    estado = 'abajo'
    encontrada = false

    constructor(id, nombre, caraDelantera, caraTrasera) {
        this.id = id;
        this.nombre = nombre;
        this.caraDelantera = caraDelantera;
        this.caraTrasera = caraTrasera;
        this.caraActual = caraTrasera
    }

    verificarEstado() {
        if(this.encontrada===false){
            if (this.estado === 'abajo') {
                this.caraActual = this.getDelantera()
                this.estado = 'arriba'
            } else {
                this.caraActual = this.getTrasera()
                this.estado='abajo'

            }
        }
        return this.getActual()
    }

    getId() {
        return this.id
    }

    getNombre() {
        return this.nombre
    }

    getDelantera() {
        return this.caraDelantera
    }

    getTrasera() {
        return this.caraTrasera
    }

    getActual() {
        return this.caraActual
    }
    cartaLock(){
        this.caraTrasera=this.caraDelantera
        this.caraActual=this.caraDelantera
        this.encontrada=true
        this.estado='encontrado'

    }
}