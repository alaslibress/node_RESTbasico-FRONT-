import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [nombre, setNombre] = useState('');
    const [inputNombre, setInputNombre] = useState('');

    useEffect(() => {
        fetch('/api/saludo')
            .then(res => res.json())
            .then(data => setNombre(data.nombre))
            .catch(error => console.log(error));
    }, []);

    const agregarNombre = async () => {
        const respuesta = await fetch('/api/saludo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: inputNombre })
        });
        const data = await respuesta.json();
        setNombre(data.nombre);
        setInputNombre(''); //Esto lo he añadido yo para limpiar el nombre después de enviarlo
    };

    return (
        <div className="container">
            <h1>Hola</h1>
            <h2>Con el nombre: <span className="nombre-destacado">{nombre}</span></h2>

            <form onSubmit={(e) => {
                e.preventDefault();
                agregarNombre();
            }}>
                <label htmlFor="nombre">Ingresa tu nombre de pardillo aquí:</label>
                <input
                    type="text"
                    id="nombre"
                    value={inputNombre}
                    onChange={(e) => setInputNombre(e.target.value)}
                    placeholder="Escribe tu nombre..."
                    required
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default App