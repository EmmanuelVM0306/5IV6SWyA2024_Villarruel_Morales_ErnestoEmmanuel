const desplazamientoCifrar = document.getElementById("desplazamiento-cifrar");
const textoCifrar = document.getElementById("texto-cifrar");
const textoCifrado = document.getElementById("texto-cifrado");
const desplazamientoDescifrar = document.getElementById("desplazamiento-descifrar");
const textoDescifrar = document.getElementById("texto-descifrar");
const textoDescifrado = document.getElementById("texto-descifrado");


function cifrado() {

    const textoIngresado = textoCifrar.value;
    const valorDesplazamiento = obtenerValorDesplazamiento(desplazamientoCifrar);

    if (valorDesplazamiento === null) {
        textoCifrado.value = "Valor de desplazamiento no válido";
        return;
    }


    textoCifrado.value = textoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase());
        let valorEntero = c.toLowerCase().charCodeAt(0);

        if (valorEntero >= 97 && valorEntero <= 122) {
            valorEntero = (valorEntero - 97 + valorDesplazamiento) % 26 + 97;
        } else if (valorEntero >= 48 && valorEntero <= 57) {
            valorEntero = (valorEntero - 48 + valorDesplazamiento) % 10 + 48;
        }

        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}

function obtenerValorDesplazamiento(inputDesplazamiento) {
    const valorDesplazamiento = inputDesplazamiento.value.trim();
    
    if (valorDesplazamiento.match(/^[0-9]+$/)) {

        return parseInt(valorDesplazamiento);
    } else if (valorDesplazamiento.match(/^[a-zA-Z]$/)) {
        return valorDesplazamiento.toLowerCase().charCodeAt(0) - 97;
    }

    return null; 
}


textoCifrar.addEventListener("input", cifrado);
desplazamientoCifrar.addEventListener("input", cifrado);

function descifrado() {
    const textoCifradoIngresado = textoDescifrar.value;
    const valorDesplazamiento = obtenerValorDesplazamiento(desplazamientoDescifrar);

    if (valorDesplazamiento === null) {
        textoDescifrado.value = "Valor de desplazamiento no válido";
        return;
    }

    textoDescifrado.value = textoCifradoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase());
        let valorEntero = c.toLowerCase().charCodeAt(0);

        if (valorEntero >= 97 && valorEntero <= 122) {
            valorEntero = (valorEntero - 97 - valorDesplazamiento + 26) % 26 + 97;
        } else if (valorEntero >= 48 && valorEntero <= 57) {
            valorEntero = (valorEntero - 48 - valorDesplazamiento + 10) % 10;
            if (valorEntero < 0) {
                valorEntero += 10;
            }
            valorEntero += 48;
        }

        let descifrado = String.fromCharCode(valorEntero);
        return mayus ? descifrado.toUpperCase() : descifrado;
    }).join('');
}

textoDescifrar.addEventListener("input", descifrado);
desplazamientoDescifrar.addEventListener("input", descifrado);
