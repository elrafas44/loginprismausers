import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [role, setRole] = useState('user');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formWithRole = { ...form, role };

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formWithRole),
    });

    if (res.ok) router.push("/login");
    else alert("Error al registrarse");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        style={styles.input}
        placeholder="Nombre"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        style={styles.input}
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        style={styles.input}
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        style={styles.input}
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit" style={styles.button}>Registrarse</button>
    </form>
  );
}

const styles = {
  form: {
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
