const $formulario = document.querySelector("#formulario");
const $textoNegrita = document.querySelector("#texto-negrita");

const CANTIDAD_CLASES = 19;
const PARTES_CLASE_18 = 5;
const PARTES_CLASE_19 = 3;

const inicializar = () => {
    for (let i = 1; i <= CANTIDAD_CLASES; i++) {
        if (i < 18) {
            crearDivClase($formulario, `clase ${i}: `);
        } else if (i === 18) {
            for (let j = 1; j <= PARTES_CLASE_18; j++) {
                crearDivClase($formulario, `clase ${i} parte ${j}: `);
            }
        } else if (i === 19) {
            for (let j = 1; j <= PARTES_CLASE_19; j++) {
                crearDivClase($formulario, `clase ${i} parte ${j}: `);
            }
        }
    }

    crearInputSubmit($formulario);
};

const crearDivClase = ($elemento, textoLabel) => {
    const textoInputs = ["Horas", "Minutos", "Segundos"];

    /* Creo un div que envolvera al laber y los 3 inputs, le doy clase div-clase */
    const $divClase = document.createElement("div");
    $divClase.className = "div-clase";

    /* Creo label, le doy clase label-clase*/
    /* Luego defino su texto que me lo pasa la funcion inicializar */
    /* Lo convierto en hijo de $divClase */
    const $labelClase = document.createElement("label");
    $labelClase.className = "label-clase";
    $labelClase.innerText = textoLabel;
    $divClase.appendChild($labelClase);

    for (const slot of textoInputs) {
        /* Creo input, le doy clase input-clase y defino el type como number */
        /* Defino el placeholder en base a textoInputs */
        /* Dependiendo de si es el input de las horas, minutos o segundos */
        /* Lo convierto en hijo de $divClase */
        const $inputClase = document.createElement("input");
        $inputClase.className = "input-clase";
        $inputClase.setAttribute("type", "number");
        $inputClase.setAttribute("placeholder", slot);
        $divClase.appendChild($inputClase);
    }

    /* Conviero a $divClase en hijo de $elemento, que en este caso es el formulario */
    $elemento.appendChild($divClase);
};

const crearInputSubmit = ($elemento) => {
    /* Creo $inputSubmit, le doy clase submit-formulario */
    /* Defino el type como submit, define su texto (value) como Calcular */
    const $inputSubmit = document.createElement("input");
    $inputSubmit.className = "submit-formulario";
    $inputSubmit.setAttribute("type", "submit");
    $inputSubmit.setAttribute("value", "Calcular");

    $inputSubmit.onclick = () => {
        obtenerTiempoVideos();
        /* Hago que suba hasta que se vea el texto donde esta el elemento strong */
        $textoNegrita.scrollIntoView();

        return false;
    };

    /* Conviero a $inputSubmit en hijo de $elemento, que en este caso es el formulario */
    $elemento.appendChild($inputSubmit);
};

const obtenerTiempoVideos = () => {
    let totalHoras = 0;
    let totalMinutos = 0;
    let totalSegundos = 0;

    for (const div of $formulario.childNodes) {
        /* Si el hijo de formulario es el boton de submit */
        /* Hago que con continue pase a la siguiente iteracion del bucle */
        /* sin terminar esta */
        if (div.className === "submit-formulario") continue;

        for (const input of div.childNodes) {
            /* Si el hijo del div es el label */
            /* Hago que con continue pase a la siguiente iteracion del bucle */
            /* sin terminar esta */
            if (input.className === "label-clase") continue;

            /* Convierto cada input.value a number porque devuelve string */
            if (input.placeholder === "Horas") {
                totalHoras += Number(input.value);
            } else if (input.placeholder === "Minutos") {
                totalMinutos += Number(input.value);
            } else if (input.placeholder === "Segundos") {
                totalSegundos += Number(input.value);
            }
        }
    }

    return calcularTiempoVideos(totalHoras, totalMinutos, totalSegundos);
};

const calcularTiempoVideos = (totalHoras, totalMinutos, totalSegundos) => {
    const MINUTOS_POR_HORA = 60;
    const SEGUNDOS_POR_HORA = 60;

    let Horas = Math.floor(totalHoras + totalMinutos / MINUTOS_POR_HORA);
    let Minutos = Math.floor(
        (totalMinutos + totalSegundos / SEGUNDOS_POR_HORA) % MINUTOS_POR_HORA
    );
    let Segundos = Math.floor(totalSegundos % SEGUNDOS_POR_HORA);

    $textoNegrita.innerText = `El tiempo total de video es ${Horas} horas, ${Minutos} minutos y ${Segundos} segundos.`;
};

/* Creo todos los elementos */
inicializar();
