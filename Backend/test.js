// test.js
const { getConnection } = require('./db');

async function testConnection() {
  try {
    const connection = await getConnection();

    // Ejecutamos una consulta de prueba
    const result = await connection.execute(`SELECT * FROM "TIPOUBICA"`);

    console.log("Resultados:");
    console.table(result.rows);

    await connection.close();
  } catch (err) {
    console.error("Error en testConnection:", err.message);
  }
}

testConnection();
