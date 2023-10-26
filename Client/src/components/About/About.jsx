import styles from './About.module.css'; // importa los estilos CSS del archivo "About.module.css"

const About = () => {   //define un componente funcional de React llamado "About".
  return (
    <div className={styles.aboutContainer}> {/*elemento div se le asigna la clase CSS del objeto styles */}
      <h2 className={styles.title}>Mi Perfil</h2> {/*elemento encabezado (h2) con la clase CSS title del objeto styles. */}
      <p className={styles.description}> {/*párrafo (p) con la clase CSS description del objeto styles */}
        ¡Hola! Soy Viri U.M. y estoy desarrollando esta aplicación como parte de un proyecto.
      </p>
    </div>
  );
}

export default About //Exporta el componente "About" para ser importado y utilizado en otros lugares de la aplicación.