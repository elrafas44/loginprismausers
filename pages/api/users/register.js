import prisma from "../../../lib/auth";
import { hash } from "bcryptjs"; 

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password } = req.body;

  const hashed = await hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "user",
      },
    });

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: "Usuario ya registrado o error interno" });
  }
}
