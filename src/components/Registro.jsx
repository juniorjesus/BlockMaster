import React, { Component } from "react";
import axios from "axios";
import md5 from "md5";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import {fileUpload} from '../helpers/fileUpload';

const baseUrl = "https://appmoviesoscar.herokuapp.com/usuario/";

export default class Registro extends Component {

    constructor() {
        super();
        this.state = {
             data: [],
             modalInsertar: false,
            form: {
                id: '',
                primer_apellido: '',
                segundo_apellido: '',
                nombre: '',
                username: '',
                password: '',
                foto:'',
                tipoUsuario:'',
                validar: "",
                clavPre: "2030"
            }
        }
    }
    handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }
    modalInsertar2 = () => {
        this.setState({modalInsertar: false})
    }
    modalInsertar = () => {
        this.setState({modalInsertar: true})
    }
    handleFileChange = (e) => {
        const file = e.target.files[0];
        fileUpload(file)
        .then(response => {
            
            document.getElementById('image').value = response;
            
        }).catch(error => {
            console.log(error.message)
        })
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }
      
    handleSubmit = (e) => {
        e.preventDefault();
        this.modalInsertar2()
        this.valida();
       document.getElementById("formulario").reset();
    }

    RegistroUsuario = async () => {
        await axios.post(baseUrl, {
            id: uuid,
            primer_apellido: this.state.form.primer_apellido,
            segundo_apellido: this.state.form.segundo_apellido,
            nombre: this.state.form.nombre,
            username: this.state.form.username,
            password: md5(this.state.form.password),
            foto: this.state.form.foto,
            tipoUsuario:this.state.form.tipoUsuario,
        }).then(response => {
            swal({
                title: "!Usuario Registrado!",
                icon: "success",
                button: "Finalizar",
                });
            
            this.props.history.push('/');
        }).catch(error => {
            console.log(error.message);
        })
        
    }

    valida = async (e) => {
        
    await axios.get(baseUrl,{params:{username:this.state.form.username}})
    .then((response) =>{return response.data})
    .then((response) =>{
        console.log(response.username)
        if (response.length) {
            swal({
                title: "!Usuario Registrado!",
                icon: "warning",
                button: "Intentar de nuevo",
                });
        }else{
            if(this.state.modalInsertar){
            if(this.state.form.validar === this.state.form.clavPre){
            this.RegistroUsuario();
            }else{
                swal({
                    title: "!Clave de registro como administrador es incorrecta!",
                    icon: "warning",
                    button: "Intentar de nuevo",
                    });
            }}else{
                this.RegistroUsuario();
            }
        }
    })
}
    render() {
        return(
            <div className="Registro py-5 container text-center">

                <form id = "formulario" className="form-entrar" onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">
                        ¡Registrate con nosotros!
                    </h1>
                    <div className="fadeIn first ">
                    <img 
                    className="fadeimg "
                    src="https://res.cloudinary.com/dky22nhv5/image/upload/v1631157616/logo_jqmfzn.png" 
                    id="icon" 
                    alt="User Icon" 
                    width="200px"
                    
                    />
                    <h3 className="h3">Crea una cuenta</h3>
                </div>
                           <input 
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{display:'none'}}
                            onChange={this.handleFileChange}
                            />
                        <button className="btn btn-success" 
                            onClick={this.handlePictureClick}  style={{marginTop: "-5px"}}
                            >Foto de perfil</button>

                        <input 
                            type="text"
                            name="foto"
                            style={{marginLeft: "5px"}}
                            id="image"
                            onBlur={this.handleChange}
                            onChange={this.handleChange}
                            required
                            />
                       
                <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        placeholder="nombre"
                        required=""
                        onChange={this.handleChange}
                    />
                    
                    <input
                        type="text"
                        placeholder="Primer Apellido"
                        name="primer_apellido"
                        className="form-control"
                        autoComplete="off"
                        onChange={this.handleChange}
                    />

                    <input
                        type="text"
                        placeholder="Segundo Apellido"
                        name="segundo_apellido"
                        className="form-control"
                        autoComplete="off"
                        onChange={this.handleChange}
                        required=""

                    />

                    <input
                        type="email"
                        name="username"
                        className="form-control"
                        placeholder="Email"
                        required=""
                        onChange={this.handleChange}
                    />

                    <input
                        type="Password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required=""
                        onChange={this.handleChange}
                    />
                                  <div required="" className="form-group">
                        <p>Tipo registro</p>
                        <label title="Seleccione una opción" className="radiobox">
                          <input
                            name="tipoUsuario"
                            value="usuario"
                            type="radio"
                            required
                            active
                            className="input-radio"
                            onChange={this.handleChange}
                            onClick={this.modalInsertar2}
                          /> Usuario</label>
                
                       <label
                        title="Seleccione una opción" className="radiobox">
                        <input
                            name="tipoUsuario"
                            value="administrador"
                            type="radio"
                            required=""
                            className="input-radio"
                            onChange={this.handleChange}
                            onClick={this.modalInsertar}
                        /> Administrador</label>
                     </div>
                     <input
                        hidden={ this.state.modalInsertar?  false : true}
                        type="Password"
                        name="validar"
                        className="form-control"
                        placeholder="Password"
                        required=""
                        onChange={this.handleChange}
                    />
                    <br />
        
                    <button
                        type="submit"
                        
                        className="btn btn-primary btn-block mb-1"
                    >
                        Registrar
                    </button>
                    <br />
                    <Link
                    to="/"
                    className="Link"
                   >
                    Ir al incio de sesion
                </Link>
    
                </form>
            </div>
        )
    }
}
