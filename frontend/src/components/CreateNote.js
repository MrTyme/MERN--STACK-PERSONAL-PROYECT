import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default class CreateNote extends Component {
    
    //estado de los usuarios
    state = {
        users: [],
        userSelected: '',
        title:'',
        content:'',
        //propiedad para almacenar los estados
        date: new Date(),
    }

    //llamado de los usuarios y enlistamiento de la nota
    async componentDidMount(){
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        });
    }

    //creacion de la nota
    onSubmit = async (e) => {
        e.preventDefault();
        //esta constante va a enviar la nota al backend
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        await axios.post('http://localhost:4000/api/notes', newNote);
    
        
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
                            name="UserSelected"
                            onChange = {this.onInputChange}
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
                        required
                        />
                    </div>
                    

                    {/*contenido de la nota */}
                    <div className="form-group">
                            <textarea
                            name="content"
                            className="form-control"
                            placeholder="content"
                            onChange = {this.onInputChange}
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
                        <button type ="submit " className = "btn btn-primary">
                            SAVE
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
