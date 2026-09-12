// Referencia a la pantalla y expresion que se va construyendo con los clics.
const pantalla = document.querySelector('#pantalla');
let expresion = '';

// Funciones que realizan las operaciones matematicas disponibles.
function sumar(numero1, numero2) {
    return numero1 + numero2;
}

function restar(numero1, numero2) {
    return numero1 - numero2;
}

function multiplicar(numero1, numero2) {
    return numero1 * numero2;
}

function dividir(numero1, numero2) {
    if (numero2 === 0) {
        throw new Error('No se puede dividir entre cero');
    }

    return numero1 / numero2;
}

// Patron reutilizable para reconocer numeros enteros o decimales, incluso negativos.
const NUMERO = String.raw`-?\d+(?:\.\d+)?`;

// Valida una expresion formada por un numero, un operador y otro numero.
const REGEX_OPERACION = new RegExp(
    `^(?<num1>${NUMERO})(?<operador>[+*/-])(?<num2>${NUMERO})$`
);

function resolverOperacion(operacion) {
    // Separa los dos numeros y el operador usando los grupos con nombre.
    const match = operacion.match(REGEX_OPERACION);

    // Si la expresion no cumple el formato esperado, se informa del error.
    if (!match) {
        throw new Error('Operación no válida');
    }

    const { num1, operador, num2 } = match.groups;
    const numero1 = Number(num1);
    const numero2 = Number(num2);

    // Selecciona la funcion matematica segun el operador encontrado.
    switch (operador) {
        case '+':
            return sumar(numero1, numero2);
        case '-':
            return restar(numero1, numero2);
        case '*':
            return multiplicar(numero1, numero2);
        case '/':
            return dividir(numero1, numero2);
        default:
            throw new Error('Operador no válido');
    }
}

// Escucha los clics de todos los botones y procesa el valor de data-valor.
document.querySelectorAll('button').forEach((boton) => {
    boton.addEventListener('click', () => {
        const valor = boton.dataset.valor;

        // C borra la expresion actual y restablece la pantalla.
        if (valor === 'C') {
            expresion = '';
            pantalla.value = '0';
            return;
        }

        // = intenta resolver la expresion y muestra el resultado o un error.
        if (valor === '=') {
            try {
                expresion = String(resolverOperacion(expresion));
                pantalla.value = expresion;
            } catch {
                expresion = '';
                pantalla.value = 'Error';
            }
            return;
        }

        // Los numeros, operadores y el punto se agregan a la expresion.
        expresion += valor;
        pantalla.value = expresion;
    });
});
