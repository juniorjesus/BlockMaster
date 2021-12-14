import React, { Component } from 'react'
import axios from 'axios'
import md5 from 'md5'
import {Link} from 'react-router-dom'

const URL = 'https://frontend-geeks.herokuapp.com/usuarios';
export default class Login extends Component {
    constructor() {
            super();
            this.state = {
                form: {
                    username: "",
                    password: ""
                }
            }
    }
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion = async () => {
        await axios.get(URL,{params:{username:this.state.form.username}})
        .then((response) =>{return response.data})
        .then((response) =>{
                    if (response.length) {
                axios.get(URL,{params:{username:this.state.form.username, password:md5(this.state.form.password)}})
                .then((response) =>{return response.data})
                .then((response) =>{
                if (response.length) {
                    console.log(response[0])
                let lengthResponse = response[0]
                alert(`Bienvenido ${lengthResponse.nombre} ${lengthResponse.primer_apellido}`)
                localStorage.setItem('TipoUsuario', lengthResponse.tipoUsuario);
                localStorage.setItem('idUsuario', lengthResponse.id);
                localStorage.setItem('Nombre', lengthResponse.nombre);
                localStorage.setItem('Foto', lengthResponse.foto);
                this.props.history.push('/navbar');
                }else{
                    alert(`Clave incorrecta`)
                }
            })
            } else {
                
                alert('usuario no registrado')
            }

        })
    }
    invitado = () => {
        localStorage.setItem('Invitado',true);
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('Invitado',false);
        this.iniciarSesion()
    }
    render() {

        return (
            <div className="container">
            
            <form className="form-signin" onSubmit={this.handleSubmit}>
            <img 
                    className="fadeimg "
                    src="https://res.cloudinary.com/dky22nhv5/image/upload/v1631157616/logo_jqmfzn.png" 
                    id="icon" 
                    alt="User Icon" 
                    width="200px"
                    
                    />
                <h1 className="h4 mb-3 font-weight-normal"style={{color:"#fff", margin:"10px"}}>
                    Inicio de sesión
                </h1>

                <input
                    type="email"
                    id="inputEmail"
                    className="form-control mt-1"
                    placeholder="Email"
                    required=""
                    onChange={this.handleChange}
                    name ="username"
                />

                <input
                    type="Password"
                    id="inputPassword"
                    className="form-control mt-1"
                    placeholder="Contreña"
                    required=""
                    onChange={this.handleChange}
                    name ="password"
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Login
                </button>

                <div className="networks">
                    <p>Login with social networks</p>

                    <div className="google-btn btn-primary">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                  <Link
                    to="/registro"
                    className="Link"
                   >
                    Crear una nueva cuenta
                </Link>
                <Link
                    to="/navbar"
                    className="Link"
                    onClick={this.invitado}
                   >
                    Ingresar como invitado
                </Link>
            </form>
        </div>
        )
    }
}