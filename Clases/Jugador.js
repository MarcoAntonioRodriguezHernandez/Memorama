class Jugador{
    nombre=''
    puntuacion=0
    id=0
    constructor(nombre,id) {
        this.id=id
        this.nombre=nombre
    }
    sumarPuntuacion(puntos){
        this.puntuacion+=puntos
    }
    darPuntuacion(){
        alert("el jugador "+this.nombre+" tiene "+this.puntuacion+" puntos")
    }
}