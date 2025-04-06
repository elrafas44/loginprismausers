export default function Home() {
  return (
    <div style={styles.home}>
      <h1>Página principal</h1>
      <p>Bienvenido al sistema de gestión de usuarios.</p>
    </div>
  );
}

const styles = {
  home: {
    textAlign: "center",
    marginTop: "50px",
  },
};
