import React, { Fragment, useState, useEffect } from 'react';
import Formurario from './components/Formurario.jsx'
import Cita from './components/Cita.jsx'


function App() {

  //Citas en el local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Agreglo de citas
  const [ citas, guardarCitas ] = useState( citasIniciales );

  //useEffect para realizar ciertas acciones cuando cambia el state
  useEffect( () => { 
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify( [] ));
    }
  }, [citas] );

  //Funcion que tome las citas actuales y agregue una nueva
  const crearCita = cita => {
    guardarCitas([ ...citas, cita ]);
  }

  //Funcion eliminar cita
  const eliminarCita = id => {
    const nuevaCita = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevaCita);
  }

  //Mensaje debajo de "administra tus citas" usando ternario
  const titulo = citas.length === 0 ? 'No hay citas' : 'administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
              <Formurario 
                crearCita={crearCita}
              />
        </div>
        <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
        </div>
    </div>
  </div>
</Fragment>
  );
}

export default App;
