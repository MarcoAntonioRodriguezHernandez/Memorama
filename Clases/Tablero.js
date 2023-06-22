class Tablero {
    tamanio = 0
    eleccion=1
    opc=0
    jugadores=[]
    turno=0
    crearTablero() {
        this.opc=parseInt(prompt("que modo desea jugar \n1.-un jugador\n2.-dos jugadores"))
        for(let i=1;i<=this.opc;i++){
            let jugador=new Jugador(prompt("nombre del jugador"),i)
            this.jugadores.push(jugador)
        }
        if(this.opc===1)
        this.eleccion=parseInt(prompt("que modo desea jugar \n1.-con intentos\n2.-sin intentos"))
        this.tamanio = parseInt(prompt("ingrese la cantidad de pares de cartas que desea memorizar"))
        let baraja = new Baraja()
        baraja.crearBaraja(this.tamanio)
        this.crearHTML(baraja)
    }
    crearHTML(baraja) {
        let jugadores=this.jugadores
        let max = baraja.cartasOcupadas.length
        let tablero = document.createElement('div')
        let divp = document.createElement('div')
        divp.classList += ' row align-items-start'
        tablero.classList += ' tablero container'
        tablero.setAttribute("id", "tab1")
        for (let i = 0; i < max; i++) {
            let ocupable = baraja.cartasOcupadas[i]
            let carta = document.createElement('div')
            carta.classList += ' carta col-1-6 col-md-3'
            carta.setAttribute("id", "cart" + ocupable.id)
            let img = document.createElement('img')
            img.classList += ' imagen'
            img.setAttribute("id", "cartimg" + ocupable.id)
            img.src = ocupable.verificarEstado()
            let eleccion=this.eleccion
            let opc=this.opc
            setTimeout(() => {
                img.src=ocupable.verificarEstado()
                
            }, "5000");
            

            img.addEventListener('click', function () {
                
                let obj = document.getElementById('cartimg' + ocupable.id)
                if (baraja.contadorext <= 2) {
                    obj.src = ocupable.verificarEstado()
                    baraja.cartasSeleccionadas.unshift(ocupable)
                    setTimeout(() => {
                        baraja.contadorext = baraja.revisarEstado(baraja.cartasOcupadas)
                        if (baraja.contadorext === 2) {
                            
                            if(eleccion===1){
                                if (baraja.compararCartas1()===false){
                                    let img1 = document.getElementById('cartimg' + baraja.cartasSeleccionadas[0].id)
                                    let img2 = document.getElementById('cartimg' + baraja.cartasSeleccionadas[1].id)
                                    
                                    
                                        img1.src = baraja.cartasSeleccionadas[0].verificarEstado()
                                        img2.src = baraja.cartasSeleccionadas[1].verificarEstado()
                                    
                                    baraja.cartasSeleccionadas = []

                                }else{
                                    jugadores[baraja.turnoActual].sumarPuntuacion(10)
                                }
                            }else{
                                if (baraja.compararCartas2()===false){
                                    let img1 = document.getElementById('cartimg' + baraja.cartasSeleccionadas[0].id)
                                    let img2 = document.getElementById('cartimg' + baraja.cartasSeleccionadas[1].id)
                                    
                                        img1.src = baraja.cartasSeleccionadas[0].verificarEstado()
                                        
                                        img2.src = baraja.cartasSeleccionadas[1].verificarEstado()
                                    
                                    baraja.cartasSeleccionadas = []

                                }else{
                                    jugadores[baraja.turnoActual].sumarPuntuacion(10)
                                }
                            }

                            baraja.cartasSeleccionadas = []

                            if(baraja.turnoActual===1||jugadores.length!==1) baraja.turnoActual=0
                            else baraja.turnoActual=1
                            for(let i=0;i<jugadores.length;i++){
                            jugadores[i].darPuntuacion()
                            }
                        }
                    }, "2000");

                } else {

                }

            });

            carta.appendChild(img)
            divp.appendChild(carta)

        }
        tablero.appendChild(divp)


        document.body.appendChild(tablero)

    }


}