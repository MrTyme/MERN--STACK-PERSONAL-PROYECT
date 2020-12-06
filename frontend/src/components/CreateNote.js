import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default class CreateNote extends Component {
    
    //estado de los usuarios
    state = {
        users: [],
        userSelected: '',
        //propiedad para almacenar los estados
        title:'',
        content:'',
        date: new Date(),
        editing: false,
        //id del objeto a alterar
        _id: '',
    }

    //llamado de los usuarios y enlistamiento de la nota
    async componentDidMount(){
        const res = await axios.get('http://localhost:4000/api/users');
        //confirmacion del usuario eh invocacion de la funcion por usuario
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        });


        //actualizacion de la nota
        if (this.props.match.params.id) {
            //peticion get de una nota especifica
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            console.log(res.data);
            //propiedad que nos permitira alterar el formulario creado
            this.setState({
                title: res.data.title,
                content: res.data.content,
                data:new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.match.params.id
            });
        }
    }

    //creacion de la nota y actualizacion
    onSubmit = async (e) => {
        e.preventDefault();
        //esta constante va a enviar la nota al backend
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        
        
        //validacion para actualizar la actualizacion
        if (this.state.editing) {
            //si se valida con put se agrega lo alterado
            //pero se debe recibir el id del objeto a manipular
            await axios.put('http://localhost:4000/api/notes/'+ this.state._id, newNote);
        }else{
            //caso contrario se conserva
            await axios.post('http://localhost:4000/api/notes', newNote);
        }
        
        //redirecion a la vista de notas:
        window.location.href = '/';
    }

    //escucha la informacion del objeto
    onInputChange = (e) => {
        this.setState({
            //usamos un array que por cada name me modifique el estado completo
            [e.target.name]: e.target.value
        });
    }

    //manipulacion de las fechas
    onchangeDate = (date) => {
        this.setState({date});
    }

    
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a note</h4>

                    {/*SELECT USER*/}
                    <div className="from-group">
                        <select
                            className="form-control"
                            name="userSelected"
                            onChange = {this.onInputChange}
                            value = {this.state.userSelected}
                        >
                            {
                                //recorrido de los usuarios
                                this.state.users.map(user => 
                                    <option key = {user} value = {user}>
                                        {user}
                                    </option>
                                )
                            }
                        </select>
                    </div>

                    {/*titulo de la nota a crear */}
                    <div className="form-group">
                        <input 
                        type = "text" 
                        className = "form-control" 
                        placeholder="Title" 
                        name = "title"
                        onChange = {this.onInputChange}
                        value = {this.state.title}
                        required
                        />
                    </div>
                    

                    {/*contenido de la nota */}
                    <div className="form-group">
                            <textarea
                            name="content"
                            className= "form-control"
                            placeholder="Content"
                            onChange = {this.onInputChange}
                            value = {this.state.content}
                            required
                            >

                            </textarea>
                    </div>

                    {/*creacion de la fecha de la nota */}
                    <div className="form-group">
                        <DatePicker  
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onchangeDate}
                        />
                    </div>


                    <form onSubmit = {this.onSubmit}>
                        <button type ="submit" 
                        className = "btn btn-primary">
                            SAVE
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
