// Función para guardar registros por día (Actualizada para incluir Nombre)
async function guardarRegistroDiario(datos) {
    try {
        // Obtenemos la fecha actual en formato YYYY-MM-DD
        const hoy = new Date().toISOString().split('T')[0];

        // Aseguramos que el nombre viaje en el reporte diario. 
        // Si no viene en los datos, verificamos si existe de forma global o ponemos un valor por defecto.
        const nombreCliente = datos.nombre || (typeof nombreClienteActivo !== 'undefined' ? nombreClienteActivo : "Cliente VIP/Antiguo");

        // Referencia a la subcolección del día
        // Esto creará en Firebase: ventas (colección) -> 2026-05-10 (doc) -> registros (subcolección)
        const docRef = await db.collection("ventas").doc(hoy).collection("registros").add({
            ...datos,
            nombre: nombreCliente, // Forzamos el guardado del nombre en el reporte diario
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log("Registro guardado con éxito en el reporte diario, ID:", docRef.id);
    } catch (error) {
        console.error("Error al guardar el reporte diario en Firebase:", error);
    }
}
