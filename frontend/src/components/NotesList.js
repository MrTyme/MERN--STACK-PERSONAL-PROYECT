import React, { Component } from 'react'
import axios from 'axios';
import { format } from 'timeago.js';


export default class NotesList extends Component {
    
    state = {
        notes: [],
    }

    //impresion por pantalla
    componentDidMount(){
        this.getNotes()
    }

    //obtencion de datos
    async getNotes(){
        const res = await axios.get('http://localhost:4000/api/notes');
        this.setState({notes: res.data});
    }

    deleteNote = async (id) => {
        await axios.delete('http://localhost:4000/api/notes/' + id);
        //elimina y vuelve a llamar las notas para imprimir por pantalla
        this.getNotes();
    }
    
    render() {
        return (
            <div className="row">
                {/*creacion de las listas de notas*/}
                {
                    //recorrido del arreglo de las notas
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id} >
                            <div className="card">
                                <div className="card-header">
                                    <h5>{note.title}</h5>
                                </div>

                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p>{note.author}</p>
                                    <p>{format(note.date)}</p>
                                </div>

                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note.id)}>
                                        DELETE
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
