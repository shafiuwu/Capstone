import React, {useState} from "react";
import Navbar from "../../components/Navbar";

const FormularioIntereses = () => {
  const [respuestas, setRespuestas] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: '',
    pregunta5: '',
    pregunta6: '',
    pregunta7: '',
    pregunta8: '',
    pregunta9: '',
    pregunta10: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRespuestas({
      ...respuestas,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(respuestas); // Aquí puedes enviar las respuestas a tu backend
  };

  //style={{ backgroundColor: '#f5f5f5', padding: '20px', textAlign: "center" }}

  return (
    <div style={{ backgroundColor: '#f5f5f5'}}>
    <Navbar />
    <div className="container mt-5 mb-5">
    <h2 className="display-5 text-center" style={{marginBottom: "40px"}}>Formulario de Intereses</h2>
        <div className="card" style={{ "border-radius": "1rem", maxWidth: "800px", margin: "0 auto"}}>
            <div className="card-body">
                
                <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
                    <div className="mb-4">
                        <label className="form-label fs-5">1. ¿Cómo prefieres pasar tu tiempo libre?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta1" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) Haciendo actividades al aire libre</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta1" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) Leyendo un buen libro</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta1" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) Participando en eventos sociales</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta1" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) Aprendiendo algo nuevo</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fs-5">2. ¿Qué te motiva más para ser voluntario?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta2" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) Contribuir al bienestar de la comunidad</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta2" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) Aprender nuevas habilidades</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta2" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) Conocer gente nueva</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta2" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) Pasar tiempo en un ambiente agradable</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fs-5">3. ¿Cuál de estas actividades disfrutas más?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta3" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) Trabajar en proyectos prácticos (ej. jardinería, construcción)</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta3" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) Organizar eventos o actividades</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta3" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) Trabajar con niños o personas mayores</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta3" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) Usar la tecnología para ayudar a otros</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fs-5">4. ¿Cómo te describirías en un grupo?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta4" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) El líder que toma la iniciativa</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta4" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) El que escucha y brinda apoyo</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta4" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) El que aporta ideas creativas</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta4" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) El que organiza y planifica todo</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fs-5">5. ¿Qué tan importante es para ti la flexibilidad en el voluntariado?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta5" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) Muy importante, necesito horarios flexibles</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta5" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) Moderadamente importante, puedo adaptarme a ciertos horarios</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta5" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) No es importante, puedo comprometerme con horarios fijos</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta5" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) Importante, pero me gustaría tener opciones</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fs-5">6. ¿Cómo manejas los desafíos o problemas inesperados?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta6" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) Busco soluciones rápidamente</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta6" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) Consulto a otros antes de actuar</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta6" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) Analizo la situación y luego decido</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta6" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) Trato de mantener la calma y adaptarme</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fs-5">7. ¿Qué tipo de ambiente te resulta más cómodo para trabajar?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta7" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) Al aire libre y en contacto con la naturaleza</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta7" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) En un entorno estructurado y organizado</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta7" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) En un ambiente social y colaborativo</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta7" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) En un lugar donde pueda trabajar en proyectos individuales</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fs-5">8. ¿Cuál es tu principal habilidad que podrías aportar como voluntario?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta8" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) Habilidades manuales o prácticas</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta8" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) Habilidades organizativas y de planificación</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta8" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) Empatía y habilidades de comunicación</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta8" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) Conocimiento técnico o digital</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fs-5">9. ¿Qué tipo de impacto te gustaría tener en tu comunidad?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta9" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) Mejorar el medio ambiente</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta9" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) Ayudar a personas necesitadas</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta9" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) Fomentar la educación y el aprendizaje</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta9" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) Promover la cultura y las artes</label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fs-5">10. ¿Cómo te sientes al trabajar en equipo?</label>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta9" value="A" onChange={handleChange}/>
                        <label className="form-check-label">A) Me encanta colaborar con otros</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta9" value="B" onChange={handleChange}/>
                        <label className="form-check-label">B) Prefiero trabajar solo pero no tengo problema en colaborar</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta9" value="C" onChange={handleChange}/>
                        <label className="form-check-label">C) Disfruto liderar al equipo</label>
                        </div>
                        <div className="form-check">
                        <input type="radio" className="form-check-input" name="pregunta9" value="D" onChange={handleChange}/>
                        <label className="form-check-label">D) Me siento cómodo apoyando a otros en el equipo</label>
                        </div>
                    </div>

                    <div className="pt-4 mb-4">
                      <button type="submit" className="btn btn-dark btn-lg btn-block" style={{ width: '15%' }}>Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </div>
  );
};

export default FormularioIntereses;
