const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
  try {
    // Test de conexión simple
    await prisma.$connect();
    console.log("✅ Conexión a la base de datos exitosa");
    
    // Test de consulta
    const users = await prisma.user.findMany();
    console.log("Usuarios existentes:", users);
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();