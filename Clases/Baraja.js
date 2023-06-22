class Baraja {
    rutas = ['Recursos/el ajolote.jpg', 'Recursos/el alacran.jpg', 'Recursos/el arbol.jpg', 'Recursos/el arpa.jpg', 'Recursos/el camaron.jpg', 'Recursos/el cantarito.jpg', 'Recursos/el cazo.jpg', 'Recursos/el corazon.jpg', 'Recursos/el cotorro.jpg', 'Recursos/el elote.jpg', 'Recursos/el emoji.jpg', 'Recursos/el gallo.jpg', 'Recursos/el gorro.jpg', 'Recursos/el guacamole.jpg', 'Recursos/el mundo.jpg', 'Recursos/el musico.jpg', 'Recursos/el paraguas.jpg', 'Recursos/el pescado.jpg', 'Recursos/el pino.jpg', 'Recursos/el xoloitzcuintle.jpg', 'Recursos/la arana.jpg', 'Recursos/la bota.jpg', 'Recursos/la botella.jpg', 'Recursos/la calavera.jpg', 'Recursos/la campana.jpg', 'Recursos/la chalupa.jpg', 'Recursos/la concha.jpg', 'Recursos/la corona.jpg', 'Recursos/la garza.jpg', 'Recursos/la jaras.jpg', 'Recursos/la luna.jpg', 'Recursos/la maceta.jpg', 'Recursos/la pera.jpg', 'Recursos/la rana.jpg', 'Recursos/la rosa.jpg', 'Recursos/la sandia.jpg', 'Recursos/venado.jpg'];
    nombres = ['el ajolote', 'el alacran', 'el arbol', 'el arpa', 'el camaron', 'el cantarito', 'el cazo', 'el corazon', 'el cotorro', 'el elote', 'el emoji', 'el gallo', 'el gorro', 'el guacamole', 'el mundo', 'el musico', 'el paraguas', 'el pescado', 'el pino', 'el xoloitzcuintle', 'la arana', 'la bota', 'la botella', 'la calavera', 'la campana', 'la chalupa', 'la concha', 'la corona', 'la garza', 'la jaras', 'la luna', 'la maceta', 'la pera', 'la rana', 'la rosa', 'la sandia', 'venado'];
    cartasOcupadas = []
    rutaReverso = 'Recursos/reverso.jpg'
    cartasSeleccionadas=[]
    contadorext=0
    cartasEncontradas=0
    errores=0
    maxerrores=0
    crearBaraja(cant) {
        let rutas2 = this.rutas
        let id = 0
        let random = 0
        let carta={}
        for (let i = 0; i < cant; i++) {
            random = this.randomNumber(0, rutas2.length-1)
            let ruta = rutas2[random]
            let nombre = this.nombres[random]
            for (let j = 0; j < 2; j++) {
                carta = new Carta(id, nombre, ruta, this.rutaReverso)
                this.cartasOcupadas.push(carta)
                id++
            }
        }
        this.maxerrores=cant
        console.log(this.cartasOcupadas)
        this.cartasOcupadas=this.AkimShuffle(this.cartasOcupadas)
        this.imprimirBaraja(this.cartasOcupadas)
    }

    imprimirBaraja(baraja) {
        for (let i = 0; i < baraja.length; i++) {
            console.log(baraja[i])
        }
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    AkimShuffle(temp) {
        let random;
        let temp2=[]
        let max = temp.length
        for (let i = 0; i < max; i++) {
            random = this.randomNumber(0, temp.length - 1)
            temp2.push(temp[random])
            temp.splice(random, 1);
        }
        return temp2
    }
    compararCartas1(){
        let max=this.cartasSeleccionadas.length
        if(this.cartasSeleccionadas[0].nombre===this.cartasSeleccionadas[1].nombre){
            alert('correcto')
            this.cartasSeleccionadas[0].cartaLock()
            this.cartasSeleccionadas[1].cartaLock()


            return true
        }else{
            this.errores++
            if(this.errores>=this.maxerrores){
                alert("te quedaste sin intentos")
            }
        }

        return false

    }
    compararCartas2(){
        let max=this.cartasSeleccionadas.length
        if(this.cartasSeleccionadas[0].nombre===this.cartasSeleccionadas[1].nombre){
            alert('correcto')
            this.cartasSeleccionadas[0].cartaLock()
            this.cartasSeleccionadas[1].cartaLock()
            this.cartasEncontradas=this.finalJuego()

            return true
        }else{

        }

        return false

    }

    revisarEstado(arreglo){
        let max=arreglo.length;
        let contador=0;
        for(let i=0;i<max;i++){
            if(arreglo[i].estado==='arriba')
                contador++;
        }
        return contador;
    }
    mensaje(){
        alert("presiona para continuar")
    }
}