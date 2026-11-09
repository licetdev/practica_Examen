const visor = document.getElementById("visor");
const botones = [
    document.getElementById("rotar"),
    document.getElementById("acercar"),
    document.getElementById("alejar"),
    document.getElementById("restablecer")
];
const botonRotar = botones[0];
const botonAcercar = botones[1];
const botonAlejar = botones[2];
const botonRestablecer = botones[3];
const estadoTexto = document.getElementById("estado-texto");
const estadoModelo = document.getElementById("estado-modelo");
const mensajeCarga = document.getElementById("mensaje-carga");
const mensajeError = document.getElementById("mensaje-error");

if (!(visor instanceof HTMLElement) || botones.some((boton) => !(boton instanceof HTMLButtonElement))) {
    console.error("No se pudo inicializar el visor: faltan elementos requeridos.");
} else {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        visor.removeAttribute("autoplay");
    }

    const establecerEstado = (texto, estado) => {
        estadoTexto.textContent = texto;
        estadoModelo.dataset.estado = estado;
    };

    const alCargar = () => {
        establecerEstado("Modelo listo", "listo");
        mensajeCarga.hidden = true;
        botones.forEach((boton) => {
            boton.disabled = false;
        });
    };

    visor.addEventListener("load", alCargar);
    if (visor.loaded) {
        alCargar();
    }

    visor.addEventListener("error", (event) => {
        establecerEstado("Error de carga", "error");
        mensajeCarga.hidden = true;
        mensajeError.hidden = false;
        console.error("No se pudo cargar el modelo 3D:", event);
    });

    botonRotar.addEventListener("click", () => {
        const rotando = visor.hasAttribute("auto-rotate");
        visor.toggleAttribute("auto-rotate", !rotando);
        botonRotar.classList.toggle("activo", !rotando);
        botonRotar.setAttribute("aria-pressed", String(!rotando));
        botonRotar.setAttribute(
            "aria-label",
            rotando ? "Activar rotación automática" : "Detener rotación automática"
        );
    });

    botonAcercar.addEventListener("click", () => {
        const orbit = visor.getCameraOrbit();
        const nuevoRadio = Math.max(0.08, orbit.radius * 0.8);
        visor.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${nuevoRadio}m`;
    });

    botonAlejar.addEventListener("click", () => {
        const orbit = visor.getCameraOrbit();
        const nuevoRadio = Math.min(0.8, orbit.radius * 1.25);
        visor.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${nuevoRadio}m`;
    });

    botonRestablecer.addEventListener("click", () => {
        visor.removeAttribute("auto-rotate");
        botonRotar.classList.remove("activo");
        botonRotar.setAttribute("aria-pressed", "false");
        botonRotar.setAttribute("aria-label", "Activar rotación automática");
        visor.cameraOrbit = "25deg 72deg 0.22m";
        visor.cameraTarget = "auto";
        visor.fieldOfView = "30deg";
    });
}
