// Función para guardar registros por día
async function guardarRegistroDiario(datos) {
    try {
        // Obtenemos la fecha actual en formato YYYY-MM-DD
        const hoy = new Date().toISOString().split('T')[0];

        // Referencia a la subcolección del día
        // Esto creará en Firebase: ventas (colección) -> 2026-05-10 (doc) -> registros (subcolección)
        const docRef = await db.collection("ventas").doc(hoy).collection("registros").add({
            ...datos,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log("Registro guardado con éxito, ID:", docRef.id);
    } catch (error) {
        console.error("Error al guardar en Firebase:", error);
    }
}
