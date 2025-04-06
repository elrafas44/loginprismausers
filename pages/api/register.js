import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password, role = "user" } = req.body;

  try {
    // Espera a que se resuelva la promesa de bcrypt.hash
    const hashedPassword = await hash(password, 10); // Usar await aquí

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    console.log("User created:", user);  // Agregar un log para mostrar los detalles del usuario creado

    res.status(201).json(user);
  } catch (err) {
    console.error("Error details:", err); // Asegúrate de que se imprima el error completo
    console.error("Error stack:", err.stack); // Esto imprime la traza del error
    if (err.code === 'P2002') {
      // Si el error es por duplicado de email
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
}
