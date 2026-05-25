document.addEventListener('DOMContentLoaded', () => {
    const minovia = document.querySelector('.minovia')
    const grid = document.querySelector('.grid')

    let gravedad = 0.9;
    let Esculturasdebotero = false;
    let isgayover = false;
    let puntuacion = 0;
    let vidas = 3;
    let pausado = false;

    function control(tecla) {
        if (tecla.code == 'Space') {
            if (pausado) {
                reanudar(); 
                return;
            }
            if (!Esculturasdebotero && !isgayover) {
                jump();
            }
        }
        if (tecla.key == 'c') {
            trans();
        }
        if (tecla.key == 'v') {
            humanizar();
        }
    }

    function trans() {
        minovia.style.backgroundImage = "url('./')"
        minovia.style.height = '180px'
    }

    function humanizar() {
        minovia.style.backgroundImage = "url('./sonic.png')"
        minovia.style.height = '200px'
    }

    function actualizar() {
        document.querySelector('.puntuacion').textContent = 'Puntos: ' + puntuacion;
        document.querySelector('.vidas').textContent = 'Vidas: ' + '❤️'.repeat(vidas);
    }

    let position = 0;

    function jump() {
        Esculturasdebotero = true;
        let count = 0;

        let puja = setInterval(function () {
            if (count == 20) {
                clearInterval(puja);

                let baixa = setInterval(function () {
                    if (count == 0) {
                        clearInterval(baixa);
                        Esculturasdebotero = false;
                        position = 0;
                        minovia.style.bottom = "0px";
                        return;
                    }
                    position -= 15;
                    count--;
                    position = position * gravedad;
                    minovia.style.bottom = position + 'px';
                }, 20)

                return;
            }
            position += 50;
            position = position * gravedad;
            count++;
            minovia.style.bottom = position + 'px';
        }, 20)
    }

    function perderVida() {
        vidas--;
        actualizar();

        if (vidas <= 0) {
    
            isgayover = true;
            while (grid.firstChild) {
                grid.removeChild(grid.lastChild);
            }
            let msg = document.createElement('div');
            msg.textContent = 'GAME OVER';
            msg.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:48px; color:white; font-weight:bold;';
            grid.appendChild(msg);
        } else {
            
            pausado = true;
            Esculturasdebotero = false;
            position = 0;
            minovia.style.bottom = '0px';

            let msg = document.createElement('div');
            msg.classList.add('msgPausa');
            msg.textContent = 'Vidas restantes: ' + vidas + ' — Pulsa ESPACIO para continuar';
            msg.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:28px; color:white; font-weight:bold; text-align:center;';
            grid.appendChild(msg);
        }
    }

    function reanudar() {
        pausado = false;

       
        const msg = grid.querySelector('.msgPausa');
        if (msg) msg.remove();

       
        GenOBs();
        GenOBj();
    }

    function GenOBs() {
        if (isgayover || pausado) return;

        let posicio = 1800;
        let ramdomTime = Math.random() * 3000;

        let obs = document.createElement('div');
        obs.classList.add("gris");
        obs.style.left = posicio + 'px';
        grid.appendChild(obs);

        let mueve = setInterval(function () {
            if (pausado || isgayover) { 
                clearInterval(mueve);
                obs.remove();
                return;
            }

            if (posicio > 40 && posicio < 70 && position < 60) {
                clearInterval(mueve);
                obs.remove();
                perderVida(); 
                return;
            }

            posicio -= 15;
            obs.style.left = posicio + 'px';

            if (posicio < -50) {
                clearInterval(mueve);
                obs.remove();
            }
        }, 20)

        setTimeout(GenOBs, ramdomTime);
    }

    function GenOBj() {
        if (isgayover || pausado) return;

        let posicio = 1800;
        let ramdomTime = Math.random() * 3000;

        const obj = document.createElement('div');
        obj.classList.add("super");
        obj.style.left = posicio + 'px';
        obj.style.bottom = '220px';
        grid.appendChild(obj);

        let mueve = setInterval(function () {
            if (isgayover || pausado) { 
                clearInterval(mueve);
                obj.remove();
                return;
            }

            if (posicio > 30 && posicio < 80 && position > 170) {
                clearInterval(mueve);
                obj.remove();
                puntuacion++;
                actualizar();
                return;
            }
            

            posicio -= 15;
            obj.style.left = posicio + 'px';

            if (posicio < -50) {
                clearInterval(mueve);
                obj.remove();
            }
        }, 20)

        setTimeout(GenOBj, ramdomTime);
    }

    actualizar();
    GenOBj();
    GenOBs();

    document.addEventListener('keydown', control);
})
