import React, { Component } from 'react'
import axios from 'axios';


export default class CreateUser extends Component {
    
    //estado de la app
    state = {
        //lista de usuarios
        users: [],
        //creacion de nuevo usuario
        username: ''
    }


    //llamada a la direccion de la base de datos
    componentDidMount(){
        //llamada al metodo que se crea los usuarios
        this.getUsers();
    }

    //creacion de usuarios
    getUsers = async () => {
        //solicitud de datos al servidor.
        //para ello usamos el comando fetch()
        //el cual nos pemite hacer peticiones al servidor desde el F.E
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({users: res.data});

        //en nuestro caso haremos uso de la libreria axios
    }


    //escucha de tipeo de usuario y guarda el testo en el input
    onChangeUsername = (e) => {
        //recepcion de un evento
        //en este caso cuando el nuevo usuario tipea
        //en username
        this.setState({
            username: e.target.value
        });
    }


    //enlistamiento de usuarios
    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users', {
            username: this.state.username,
        });
        //metodo que cancela la funcion reiniciar el formulario
        //cada que se agrega un objeto nuevo

        //limpieza del input por pantalla
        this.setState({username: ''});

        //envio de usuario a la lista impresa en pantalla
        this.getUsers();
    }

    //eliminacion de usuarios desde el DB
    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id)
        this.getUsers();
    }

    
    render() {
        return (
            //impresion por pantalla
            //en el primer div creamos el cuerpo de la nota
            //con un form.
            //en el segundo div creamos la toma de datos
            //para mostrar por pantalla.
            <div className= "row">
                <div className="col-md-4">
                    <div className="card card-body">
                        
                        <h3>Create New User</h3>
                        <form onSubmit = {this.onSubmit}>
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control" 
                                value= {this.state.username}
                                onChange={this.onChangeUsername}
                                />
                            </div>

                            <button type = "submit" className="btn btn-primary">
                                SAVE
                            </button>
                        </form>

                    </div>
                </div>


                <div className="col-md-8">
                    <ul className="list-group">
                        {//enlistamiento de datos por consola
                            this.state.users.map(user => 
                            (<li 
                                className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick = {() => {
                                    this.deleteUser(user._id);
                                }}
                            >
                                    {user.username}
                            </li>))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
