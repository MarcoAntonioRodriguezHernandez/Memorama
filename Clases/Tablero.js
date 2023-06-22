class Tablero {
    tamanio = 0
    eleccion=1

    crearTablero() {
        this.tamanio = parseInt(prompt("ingrese la cantidad de pares de cartas que desea memorizar"))
        this.eleccion=parseInt(prompt("que modo desea jugar \n1.-con intentos\n2.-sin intentos"))
        let baraja = new Baraja()
        baraja.crearBaraja(this.tamanio)
        this.crearHTML(baraja)
    }

    crearHTML(baraja) {
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
            setTimeout(() => {
                img.src=ocupable.verificarEstado()
            }, "5000");
            let eleccion=this.eleccion
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
                                    this.cartasEncontradas=this.finalJuego()
                                }
                            }else{
                                if (baraja.compararCartas2()===false){
                                    let img1 = document.getElementById('cartimg' + baraja.cartasSeleccionadas[0].id)
                                    let img2 = document.getElementById('cartimg' + baraja.cartasSeleccionadas[1].id)
                                    img1.src = baraja.cartasSeleccionadas[0].verificarEstado()
                                    img2.src = baraja.cartasSeleccionadas[1].verificarEstado()
                                    baraja.cartasSeleccionadas = []

                                }else{
                                    this.cartasEncontradas=this.finalJuego()
                                }
                            }

                            baraja.cartasSeleccionadas = []
                        }
                    }, "1000");

                } else {

                }

            });

            carta.appendChild(img)
            divp.appendChild(carta)

        }
        tablero.appendChild(divp)


        document.body.appendChild(tablero)

    }
    finalJuego(baraja){
        let contador=0
        for(let i=0;i<baraja.cartasOcupadas.length;i++){
            if(baraja.cartasOcupadas[i].encontrada===true){
                contador++
                if(contador===baraja.cartasOcupadas.length){
                    alert('ganaste')
                    this.crearTablero()
                }

            }
        }
        return contador
    }
}