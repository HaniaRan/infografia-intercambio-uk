/* ==========================================================================
   1. SISTEMA DE PESTAÑAS INTERACTIVAS (BLOQUE DERECHO)
   ========================================================================== */

// Añadimos 'event' como parámetro para que el navegador sepa qué botón se cliqueó
function switchTab(tabName, event) {
    // 1. Quitamos la clase 'active' de todos los botones para que dejen de brillar
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 2. Hacemos brillar el botón correcto
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // 3. Seleccionamos el cuadro de texto donde se muestra la lista
    const display = document.getElementById('tab-display');
    
    // 4. Cambiamos el contenido HTML dependiendo de la pestaña seleccionada
    if (tabName === 'academia') {
        display.innerHTML = `
            <ul class="stats-list">
                <li><strong>Misión: El Método Británico</strong> - Adaptación exitosa a formato de <i>Lectures</i>, tutoriales y trabajo asíncrono.</li>
                <li><strong>Lectura de Alta Densidad</strong> - Escritura de ensayos basados en el análisis profundo de textos clásicos.</li>
                <li><strong>Argumentos Filosóficos</strong> - Dominio de argumentos lógicos y defensa de posturas filosóficas en <i>Tutorials</i>.</li>
                <li><strong>Inglés Académico Reforzado</strong> - Mejora en confianza y fluidez en la comunicación académica.</li>
            </ul>
        `;
    } else if (tabName === 'npcs') {
        display.innerHTML = `
            <ul class="stats-list">
                <li><strong>Multiculturalidad Desbloqueada:</strong> Descubrimiento empírico de que, detrás de diferentes idiomas y fronteras, podemos tneer más cosas en común de las que creemos.</li>
                <li><strong>Embajada Gastronómica:</strong> Se compartió la cultura mexicana mediante la preparación de tacos y tortillas para aliados internacionales.</li>
                <li><strong>Políglota Principiante:</strong> Absorción de modismos y frases cotidianas en los idiomas nativos de mis compañeros.</li>
                <li><strong>Red Global:</strong> Amistades consolidadas con aliados de Escocia, Alemania, Noruega, Canadá, EUA, Nigeria y Union Island.</li>
            </ul>
        `;
    } else if (tabName === 'logros') {
        display.innerHTML = `
            <ul class="stats-list">
                <li><strong>Rey Cultural:</strong> 10 Shows/Eventos asistidos (6 Inglaterra, 2 Gales, 2 Escocia).</li>
                <li><strong>Logística de Guerrilla:</strong> Sobrevivir mudanzas con maletas pesadas y noches en aeropuertos.</li>
                <li><strong>Hito de Salud:</strong> Uso del seguro médico en el extranjero (Estado: Sobreviviente).</li>
                <li><strong>Inmersión en las Artes:</strong>Auditoría cultural voluntaria mediante visitas constantes a museos, galerías locales, obras de teatro y shows de comedia británica.</li>
            </ul>
        `;
    }
}


/* ==========================================================================
   CONEXIÓN INVENTARIO -> PANEL DERECHO (HOVER EFFECTS)
   ========================================================================== */

let originalTabContent = "";
let lastActiveButton = null; 

document.addEventListener("DOMContentLoaded", function() {
    const slots = document.querySelectorAll('.item-slot');
    const display = document.getElementById('tab-display');

    const itemLore = {
        brujula: `
            <ul class="stats-list">
                <li class="highlight"><strong>[ÍTEM: BRÚJULA MEJORADA]</strong></li>
                <li><strong>Instinto de Navegación:</strong> Nivel Avanzado. Capacidad de orientarse en ciudades nuevas a pie y en transporte público sin depender constantemente de la pantalla.</li>
                <li><strong>Logística Desbloqueada:</strong> Dominio de transbordos rápidos en trenes de UK y optimización de rutas.</li>
            </ul>
        `,
        libro: `
            <ul class="stats-list">
                <li class="highlight"><strong>[COMPETENCIA: METODOLOGÍA LINGÜÍSTICA]</strong></li>
                <li><strong>Glosario Técnico Expandido:</strong> Incorporación de terminología científica avanzada para el estudio de física, impartido estrictamente en inglés británico.</li>
                <li><strong>Comprensión Auditiva:</strong> Inmunidad al shock lingüístico y descifrado inmediato de variantes dialectales y acentos regionales complejos.</li>
            </ul>
        `,
        abrigo: `
            <ul class="stats-list">
                <li class="highlight"><strong>[INDICADOR: ADAPTACIÓN Y RESILIENCIA]</strong></li>
                <li><strong>Resistencia Climática Extrema:</strong> Inmunidad contra el viento helado y la lluvia escocesa.</li>
                <li><strong>Rendimiento Físico:</strong> Capacidad de realizar senderismo prolongado y acumular +20,000 pasos diarios sin importar el pronóstico.</li>
                <li><strong>Logro:</strong> Primera nevada registrada con éxito.</li>
            </ul>
        `,
        tacos: `
            <ul class="stats-list">
                <li class="highlight"><strong>[HABILIDAD: DINÁMICAS MULTICULTURALES]</strong></li>
                <li><strong>Diplomacia Cultural:</strong> Producción de platillos tradicionales mexicanos desde cero en entornos compartidos como herramienta clave de integración comunitaria.</li>
                <li><strong>Rompiendo el Molde:</strong> Mitigación activa de sesgos culturales y facilitación de espacios de diálogo intercultural entre estudiantes internacionales.</li>
            </ul>
        `,
        madera: `
            <ul class="stats-list">
                <li class="highlight"><strong>[PROYECTO: DESTREZA MANUAL (WOODCARVING)]</strong></li>
                <li><strong>Integración Activa:</strong> Integración exitosa en la comunidad local a través del club de Woodcarving.</li>
                <li><strong>Enfoque Cognitivo:</strong> Desarrollo de habilidades motrices finas, control de precisión, paciencia operativa y gestión del estrés académico mediante actividades de manufactura manual.</li>
            </ul>
        `
    };

    slots.forEach(slot => {
        slot.addEventListener('mouseenter', function() {
            const itemName = this.getAttribute('data-item');
            
            if (itemLore[itemName]) {
                if (!originalTabContent) {
                    originalTabContent = display.innerHTML;
                }

                lastActiveButton = document.querySelector('.tab-btn.active');
                if (lastActiveButton) {
                    lastActiveButton.classList.remove('active');
                }

                display.innerHTML = itemLore[itemName];
            }
        });

        slot.addEventListener('mouseleave', function() {
            if (originalTabContent) {
                display.innerHTML = originalTabContent;
                originalTabContent = ""; 
                
                if (lastActiveButton) {
                    lastActiveButton.classList.add('active');
                    lastActiveButton = null;
                }
            }
        });
    });
});

/* ==========================================================================
   INICIALIZACIÓN DEL ENTORNO GRÁFICO Y MAPA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        inicializarTablero();
    }, 60);
});

// Guardamos la referencia de los marcadores en una variable global interna de este bloque
let marcadoresMapa = {};

function inicializarTablero() {
    // ----------------------------------------------------------------------
    // A. INSTANCIACIÓN DEL MAPA CENTRAL (Leaflet.js)
    // ----------------------------------------------------------------------
    const map = L.map('uk-map', {
        zoomControl: true,
        scrollWheelZoom: false 
    }).setView([54.5, -3.5], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);

    const ciudades = {
        Aberdeen: [57.1497, -2.0943],
        Stonehaven: [56.9635, -2.2117],
        Inverness: [57.4778, -4.2247],
        Edimburgo: [55.9533, -3.1883],
        Londres: [51.5074, -0.1278],
        Oxford: [51.7520, -1.2577],
        Cardiff: [51.4816, -3.1791],
        Swansea: [51.6214, -3.9436],
        Treorchy: [51.6565, -3.5061]
    };

    const geoMarkerOptions = {
        radius: 4,
        fillColor: '#00f2ff',
        color: '#00f2ff', 
        weight: 2,
        opacity: 1,
        fillOpacity: 0.6,
        className: 'map-marker'
    };

    for (let ciudad in ciudades) {
        let opciones = { ...geoMarkerOptions };
        let esBase = (ciudad === 'Aberdeen');
        if (esBase) {
            opciones.color = '#fff'; 
            opciones.fillColor = '#fff';
            opciones.radius = 6;
        }
        marcadoresMapa[ciudad.toLowerCase()] = L.circleMarker(ciudades[ciudad], opciones)
            .addTo(map)
            .bindPopup(`<strong>${esBase ? 'BASE PRINCIPAL' : 'SUB-MISIÓN COMPLETADA'}</strong><br>${ciudad}`);
    }

    // ----------------------------------------------------------------------
    // B. GRÁFICA 1: PASOS REALES + SENSOR INTERACTIVO DEL MAPA
    // ----------------------------------------------------------------------
    const ctxSteps = document.getElementById('stepsChart').getContext('2d');
    new Chart(ctxSteps, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12', 'Sem 13', 'Sem 14', 'Sem 15', 'Sem 16', 'Sem 17', 'Sem 18'],
            datasets: [{
                label: 'Pasos Promedio',
                data: [10117, 3503, 3414, 5115, 3473, 4519, 10873, 9103, 7294, 6070, 17769, 10654, 10312, 6513, 4714, 6929, 11885, 17544],
                borderColor: '#00f2ff', 
                backgroundColor: 'rgba(0, 242, 255, 0.05)',
                borderWidth: 2,
                tension: 0.2, 
                pointBackgroundColor: '#fff',
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8b949e' } },
                x: { grid: { display: false }, ticks: { color: '#8b949e' } }
            },
            plugins: { legend: { display: false } },
            
            // CONEXIÓN VISUAL CON EL MAPA
            onHover: (event, chartElements) => {
                // 1. Resetear todos los marcadores a su estado original oscuro
                for (let llave in marcadoresMapa) {
                    let marker = marcadoresMapa[llave];
                    marker.setStyle({
                        color: llave === 'aberdeen' ? '#fff' : '#00f2ff',
                        fillColor: llave === 'aberdeen' ? '#fff' : '#00f2ff',
                        weight: 2
                    });
                    
                    let el = marker.getElement();
                    if (el) {
                        el.setAttribute('class', 'leaflet-interactive map-marker');
                    }
                }

                // 2. Si el cursor se posa sobre un punto, iluminamos las ciudades clave
                if (chartElements.length > 0) {
                    const index = chartElements[0].index;

                    switch(index) {
                        case 0:  iluminarNodos(['londres', 'swansea', 'aberdeen']); break;
                        case 6:  iluminarNodos(['aberdeen', 'stonehaven']); break;
                        case 10: iluminarNodos(['aberdeen', 'edimburgo', 'cardiff', 'treorchy', 'londres']); break;
                        case 11: iluminarNodos(['oxford', 'londres']); break;
                        case 12: iluminarNodos(['londres', 'edimburgo', 'aberdeen']); break;
                        case 14: iluminarNodos(['aberdeen', 'edimburgo']); break;
                        case 15: iluminarNodos(['aberdeen', 'stonehaven']); break;
                        case 16: iluminarNodos(['aberdeen', 'inverness']); break;
                        case 17: iluminarNodos(['aberdeen', 'londres']); break;
                        default: iluminarNodos(['aberdeen']); break;
                    }
                }
            }
        }
    });

    // ----------------------------------------------------------------------
    // C. GRÁFICA 2: MATRIZ DE HABILIDADES INTERNACIONALES (CON HOVER SEGURO)
    // ----------------------------------------------------------------------
    const ctxRadar = document.getElementById('radarChart').getContext('2d');
    
    // Diccionario para cambiar las siglas por los nombres completos en el Tooltip
    const labelsCompletas = {
        'ACA': 'Excelencia Académica',
        'RES': 'Resiliencia Urbana',
        'COM': 'Comunicación Multilingüe',
        'CUL': 'Inmersión Cultural',
        'DIP': 'Diplomacia e Intercambio'
    };

    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            // Solo dejamos las siglas limpias con emojis para el HUD exterior
            labels: ['🎭 ACA', '🛡️ RES', '🗣️ COM', '🏰 CUL', '🌮 DIP'],
            datasets: [{
                data: [9, 7, 9, 10, 8],
                backgroundColor: 'rgba(0, 242, 255, 0.1)',
                borderColor: '#00f2ff',
                borderWidth: 2,
                pointBackgroundColor: '#00f2ff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { 
                        color: '#8b949e', 
                        font: { family: 'Share Tech Mono', size: 11 } 
                    },
                    ticks: { display: false, stepSize: 1 }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#161f2e',
                    titleColor: '#00f2ff',
                    bodyColor: '#fff',
                    borderColor: '#00f2ff',
                    borderWidth: 1,
                    titleFont: { family: 'Share Tech Mono', size: 12 },
                    bodyFont: { family: 'Share Tech Mono', size: 11 },
                    displayColors: false,
                    callbacks: {
                        // Aquí interceptamos el título del recuadro flotante
                        title: function(context) {
                            // Limpiamos el emoji para buscar solo la sigla (ej. 'ACA')
                            const labelOriginal = context[0].label;
                            const sigla = labelOriginal.replace(/[^\w]/g, '').trim(); 
                            
                            // Si encuentra el nombre largo lo pone, si no, deja el original
                            return labelsCompletas[sigla] || labelOriginal;
                        }
                    }
                }
            }
        }
    });

    // ----------------------------------------------------------------------
    // D. GRÁFICA 3: DISTRIBUCIÓN DE TIEMPO
    // ----------------------------------------------------------------------
    const ctxDonut = document.getElementById('donutChart').getContext('2d');
    new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['Estudio e Investigación Autónoma', 'Inmersión Cultural e Histórica', 'Logística y Desplazamiento', 'Intercambio Comunitario y Social'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    'rgba(0, 242, 255, 0.8)',
                    'rgba(0, 242, 255, 0.5)',
                    'rgba(0, 242, 255, 0.3)',
                    'rgba(0, 242, 255, 0.1)'
                ],
                borderColor: '#121820',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#161f2e',
                    titleColor: '#00f2ff',
                    bodyColor: '#fff',
                    borderColor: '#00f2ff',
                    borderWidth: 1,
                    titleFont: { family: 'Share Tech Mono' },
                    bodyFont: { family: 'Share Tech Mono' }
                }
            }
        }
    });
}

// Función auxiliar global para encender los nodos del mapa al hacer hover
function iluminarNodos(listaCiudades) {
    listaCiudades.forEach((ciudadId, posicion) => {
        const marker = marcadoresMapa[ciudadId];
        if (marker) {
            marker.setStyle({
                color: '#fff',
                fillColor: '#fff',
                weight: 4
            });
            
            let el = marker.getElement();
            if (el) {
                el.setAttribute('class', `leaflet-interactive map-marker marker-active bounce-${posicion + 1}`);
            }
        }
    });
}
// Función para apagar la pantalla de bienvenida y revelar el juego
function iniciarHUD() {
    const modal = document.getElementById('intro-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400); // Espera a que termine la animación de desvanecimiento
    }
}

/* ==========================================================================
   6. LÓGICA DEL BOTÓN DE CONTINUAR (CIERRE DE LA CAMPAÑA)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {
    // Buscamos el botón "CONTINUE >" dentro de la barra inferior
    const continueBtn = document.querySelector('.bottom-panel .continue-btn');
    const display = document.getElementById('tab-display');

    if (continueBtn && display) {
        continueBtn.addEventListener('click', function() {
            // Removemos temporalmente las luces de las pestañas para denotar el apagado
            const buttons = document.querySelectorAll('.tab-btn');
            buttons.forEach(btn => btn.classList.remove('active'));

            // Inyectamos el mensaje final de éxito en el panel derecho
            display.innerHTML = `
                <div style="text-align: center; padding: 20px 10px; font-family: 'Share Tech Mono', monospace;">
                    <h3 class="highlight" style="font-size: 1.3rem; margin-bottom: 15px; letter-spacing: 1px;">
                        [ CAMPAÑA CONCLUIDA CON ÉXITO ]
                    </h3>
                    <p style="font-size: 0.9rem; line-height: 1.6; color: #c9d1d9; margin-bottom: 20px;">
                        Todos los sectores de intercambio han sido explorados y se registraron en la base de datos.
                    </p>
                    <div style="border-top: 1px solid rgba(0, 242, 255, 0.2); margin: 15px 0;"></div>
                    <p class="highlight" style="font-size: 1rem; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">
                        ¡Gracias por revisar el reporte!
                    </p>
                </div>
            `;
        });
    }
});