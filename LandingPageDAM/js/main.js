let boton = document.getElementById("icono");
let enlaces = document.getElementById("enlaces");
let contador = 0;

boton.addEventListener("click", function(e) {
    e.preventDefault();
    if (contador == 0) {
        enlaces.className = ("enlaces dos")
        contador = 1;
    } else {
        enlaces.classList.remove("dos")
        enlaces.className = ("enlaces uno")
        contador = 0;
    }
})

document.addEventListener('keydown',function(evento){
	if (evento.keyCode == 32){
		console.log("salta");
		if (nivel.muerto==false) {
			saltar();
		}
		else{
			nivel.velocidad = 9;
			caja.velocidad= 0;
			planta.x = ancho +100;
			caja.x = ancho +100;
			nivel.puntuacion = 0;
			nivel.muerto = false;
		}
		

	} 
});

var ImgMario, ImgPlanta, ImgCaja, ImgFondo;

function cargarImagenes(){
	ImgMario = new Image();
	ImgPlanta = new Image();
	ImgFondo = new Image();
	ImgCaja = new Image();
	ImgMario.src = 'img/SuperMario/mario.png';
	ImgPlanta.src = 'img/SuperMario/planta.jpg';
	ImgFondo.src = 'img/SuperMario/fondo.jpg';
	ImgCaja.src = 'img/SuperMario/caja.png';
}
/*Creamos las imagenes */

var canvas, ctx;


function inicializada(){
	canvas = document.getElementById('canvas');
	ctx =   canvas.getContext('2d');  
	cargarImagenes();
}

var ancho=700;
var alto =300;

function borraCanvas(){
	canvas.width = ancho;
	canvas.height = alto;
}

function dibujaMario(){
	ctx.drawImage(ImgMario,0,0,600,747,mario.x,mario.y,50,50);	 
}

function dibujaPlanta(){
    ctx.drawImage(ImgPlanta,0,0,67,68,planta.x, planta.y,38,75);
}

function dibujaCaja(){ 
	ctx.drawImage(ImgCaja,0,0,1524,1836,caja.x, caja.y,37,37);
}
function dibujaFondo(){
	ctx.drawImage(ImgFondo,fondo.x,0,700,300,0,fondo.y,700,300);
}

var suelo = 200;
var mario = { x:100,y:200, vy:0, gravedad:2, salto:20 , vymax:9, saltando:false};
var nivel = {velocidad:9, puntuacion:0, muerto:false};
var planta= {x:300 , y: suelo -4};
var caja = {x:400,y:100};
var fondo = {x:0, y:0};

function gravedad(){
	if (mario.saltando== true) {
		if (mario.y - mario.vy - mario.gravedad> suelo) {
			mario.saltando = false;
			mario.vy = 0;
			mario.y =suelo;
		}
		else{
		mario.vy-= mario.gravedad;
		mario.y -=mario.vy;
    	}
   }
}
function saltar(){
	mario.saltando= true;
	mario.vy = mario.salto;
}
function logicaPlanta(){
	if (planta.x < -100) {
		planta.x = ancho +100;
		nivel.puntuacion++;
	}
	else{
		planta.x -= nivel.velocidad;
		}
}
function logicaCaja(){
	
	if (caja.x == mario.x && mario.y>100 ){
		nivel.puntuacion=nivel.puntuacion+5;
		caja.x == 90;
	}

	if (caja.x < -100) {
		caja.x = ancho +100;
		
	}
	else{
		caja.x -= nivel.velocidad;
		}
}

function logicaFondo(){
	if (fondo.x >700) {
		fondo.x=0;
	}
	else{
	 fondo.x +=nivel.velocidad;
	}

}
function colision (){
	if (planta.x >=100 && planta.x <=150) {
		if (mario.y >= suelo-25) {
			nivel.muerto = true;
			nivel.velocidad=0;
			planta.velocidad=0;
			caja.velocidad=0;


		}
	}
}
function puntuacion (){
	ctx.font = "30px impact";
	ctx.fillStyle = "#555555";
	ctx.fillText(`${nivel.puntuacion}`,600,50);

	if (nivel.muerto == true) {
		ctx.font = "60px impact";
		ctx.fillText("Has matado a Mario",140,150);
	}
}

var FPS=50;
setInterval(function(){
	principal();
},1000/FPS);

function principal(){
	borraCanvas();
	gravedad();
	colision();
	logicaPlanta();
	logicaFondo();
	logicaCaja(); 
	dibujaFondo();
    dibujaCaja();
    dibujaPlanta();
    dibujaMario();
    puntuacion();
}
  var mapa = [0,0,0,0,0,0,0,0,0,];  // Creamos un array con las 9 posiciones disponibles
    var jugador = 1; // Creamos otra variable, esta la usaremos como juhador
    function dibujar(){
        for(i=0; i<9; i++){
            if (mapa[i]==0) {
                document.getElementById("c"+i).style = "background-color: white";
            }
             if (mapa[i]==1) {
                document.getElementById("c"+i).style = "background-color: red";
            }
             if (mapa[i]==2) {
                document.getElementById("c"+i).style = "background-color: aqua";
            }
        }
    }
        // Esta funcion llamada dibujar, se encarga de poner el color en la celda 
        // que hemos clickado, el jugador1  tiñe el div de rojo mientras que el
        // jugador2 lo tiñe de azul, la posicion 0 es la predeterminada y saldra blanca 



        function pcelda(celda){
            if (mapa[celda]==0) {
                if (jugador==1) {
                    mapa[celda]=1;
                    jugador =2; 
                }else{
                    mapa[celda] = 2;
                    jugador = 1;
                }
            }else{
                window.alert("no puedes pintar sobre una casilla pintada");
            }
        //En esta ocasion la funcion pcelda se encarga de ir cambiando el jugador cada vez que hacemos un click


            dibujar();
            var r = ganador();
            switch(r){
                case 0:
                break;
                case 1:
                window.alert("gano el rojo");
                break;
                case 2:
                window.alert("gano el azul");
                break;
                case 3:
                window.alert("EMPATE");
                break;
            }
                // este switch se encarga de mandar un mensaje indicando quien ha ganado 
        }


        function ganador(){
            var numespacios = 0;
            for (i = 0; i < 9; i++) {
                if (mapa[i] == 0) 
                    numespacios++;
            }
            // Comprobar horizontalmente si hay 3 casillas del mismo color
            if (mapa[0] == mapa[1] && mapa[1] == mapa[2] && mapa[0] != 0) return mapa [0];
            if (mapa[3] == mapa[4] && mapa[4] == mapa[5] && mapa[3] != 0) return mapa [3];
            if (mapa[6] == mapa[7] && mapa[7] == mapa[8] && mapa[6] != 0) return mapa [6];
             // Comprobar Verticalmente si hay 3 casillas del mismo color
            if (mapa[0] == mapa[3] && mapa[3] == mapa[6] && mapa[0] != 0) return mapa [0];
            if (mapa[1] == mapa[4] && mapa[4] == mapa[7] && mapa[1] != 0) return mapa [1];
            if (mapa[2] == mapa[5] && mapa[5] == mapa[8] && mapa[2] != 0) return mapa [2];
             // Comprobar Diagonalmente si hay 3 casillas del mismo color
            if (mapa[0] == mapa[4] && mapa[4] == mapa[8] && mapa[0] != 0) return mapa [0];
            if (mapa[2] == mapa[4] && mapa[4] == mapa[6] && mapa[2] != 0) return mapa [2];

            if (numespacios >0) {
                return 0;
            }else{
                return 3;
            }
        }