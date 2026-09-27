// URL de tu Google Sheet publicada como .CSV
const urlPlanilla = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQoviW18RIaTxsQn0-kCtEfOdQl0WXrhzSWjkObP4TeJVObuZSAJOMgISLPsMjQ5SJMJmMsInDX9lJi/pub?output=csv';

async function obtenerPrecioDesdeExcel() {
  try {
    // 1. Vamos a buscar los datos a internet
    const respuesta = await fetch(urlPlanilla);
    const datosRaw = await respuesta.text();
    
    // 2. Convertimos el texto del Excel en filas y columnas limpias
    const filas = datosRaw.split('\n').map(fila => fila.split(','));
    
    // 3. Supongamos que tu precio está en la Fila 2, Columna 2 de la planilla
    const precioActualizado = filas[0][1]; 
    
    // 4. Modificamos el HTML con el nuevo precio de la nube
    document.getElementById('precio-combo').innerText = precioActualizado;
    
  } catch (error) {
    console.error("No se pudo actualizar el precio automáticamente:", error);
    // En caso de error de internet, dejamos un precio por defecto para que no quede vacío
    document.getElementById('precio-combo').innerText = "$22.50";
  }
}

// Ejecuta la función apenas abre la pantalla del local
obtenerPrecioDesdeExcel();

// Sincronización continua: Revisa la planilla automáticamente cada 10 segundos (10000 ms)
setInterval(obtenerPrecioDesdeExcel, 15000);
