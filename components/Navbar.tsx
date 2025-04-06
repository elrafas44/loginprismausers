import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/">Inicio</Link>
      {!session && <Link href="/login">Login</Link>}
      {!session && <Link href="/register">Register</Link>}
      {session && <Link href="/dashboard">Dashboard</Link>}
      {session && <button onClick={() => signOut()}>Cerrar sesión</button>}
    </nav>
  );
}
