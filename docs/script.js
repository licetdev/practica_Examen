
const visor = document.getElementById("visor");

const botonRotar = document.getElementById("rotar");
const botonAcercar = document.getElementById("acercar");
const botonAlejar = document.getElementById("alejar");
const botonRestablecer = document.getElementById("restablecer");

// ROTACIÓN AUTOMÁTICA
botonRotar.addEventListener("click", function () {

    if (visor.hasAttribute("auto-rotate")) {

        visor.removeAttribute("auto-rotate");
        botonRotar.classList.remove("activo");

    } else {

        visor.setAttribute("auto-rotate", "");
        botonRotar.classList.add("activo");

    }

});

// ACERCAR
botonAcercar.addEventListener("click", function () {

    const orbit = visor.getCameraOrbit();

    const nuevoRadio = Math.max(
        0.5,
        orbit.radius * 0.8
    );

    visor.cameraOrbit =
        `${orbit.theta}rad ${orbit.phi}rad ${nuevoRadio}m`;

});

// ALEJAR
botonAlejar.addEventListener("click", function () {

    const orbit = visor.getCameraOrbit();

    const nuevoRadio = Math.min(
        8,
        orbit.radius * 1.25
    );

    visor.cameraOrbit =
        `${orbit.theta}rad ${orbit.phi}rad ${nuevoRadio}m`;

});

// RESTABLECER
botonRestablecer.addEventListener("click", function () {

    visor.removeAttribute("auto-rotate");

    botonRotar.classList.remove("activo");

    visor.cameraOrbit = "0deg 75deg 2.5m";
    visor.cameraTarget = "auto";
    visor.fieldOfView = "30deg";

});
