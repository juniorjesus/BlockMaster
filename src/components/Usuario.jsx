import axios from 'axios';
import { fileUpload } from '../helpers/fileUpload';
import React, { useEffect, useRef, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { Avatar } from '@material-ui/core';
import { Link } from "react-router-dom";


const url = "https://appmoviesoscar.herokuapp.com/usuario/";


function Usuario() {

    const [modalInsertar, setTipoModalInsertar] = useState(false);
    const [modalEliminar, setTipoModalEliminar] = useState(false);
   
    const [tipoModal, setTipoModal] = useState("");
    console.log(tipoModal)
    const [usuario, setUsuario] = useState([]);
    console.log(usuario.id)
    const idUsAct = 1;
    const searchref = useRef()
    const [values, setValues] = useState({
        id: '',
        nombre: '',
        username: '',
        password: '',
        primer_apellido: '',
        segundo_apellido: '',
    })
    const { id, primer_apellido, segundo_apellido, nombre, username, foto, tipoUsuario, password } = values;

    const modalInsertar1 = () => {
        setTipoModalInsertar(!modalInsertar)
    }
    const peticionGet = async () => {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        let modificar = data.find(user => user.id === idUsAct)

        setUsuario(modificar)
    }
    const seleccionar = (usuario) => {
        setTipoModal('actualizar')
        console.log(usuario)
        setValues({
            nombre: usuario.nombre,
            primer_apellido: usuario.primer_apellido,
            segundo_apellido: usuario.segundo_apellido,
            username: usuario.username,
            password: usuario.password,
            foto: usuario.foto,
        
        })
        console.log(usuario)
    }

    const peticionPut = async () => {
        await axios.put(url + id, values)
            .then(response => {
                modalInsertar1();
                peticionGet();
            }).catch(error => {
                console.log(error.message);
            })
    }
    const handleChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
        console.log(values);
    }
    const peticionDelete = async () => {
        await axios.delete(url + id)
            .then(response => {
                setTipoModalEliminar(false);
                peticionGet();
            }).catch(error => {
                console.log(error.message);
            })
    }
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        fileUpload(file)
            .then(response => {
                document.getElementById('image').value = response;
                values.imagen = response;

            }).catch(error => {
                console.log(error.message)
            })

    }


    useEffect((url) => {
        peticionGet(url)
    }, []);


    return (
        <div className="App">
          <Link to="/navbar"><span style={{ float: 'right',fontSize:"34px", fontWeight:"bold", color:"white", marginTop:"30px", marginRight:"15rem", cursor: 'pointer' }}>x</span></Link>
            <br/>
            <br/>
            <Avatar
                alt=""
                src={foto ? foto : "/static/images/avatar/1.jpg"}
                style={{ margin: "3rem auto", display: "flex", alignItems: "center", width: 160, height: 160, cursor: 'pointer' }}
            />
            <div style={{margin: "3rem auto", textAlign:"center", alignItems: "center"}}>
            <div>
            <h1>{usuario.nombre}</h1>
            <h1>{usuario.primer_apellido}</h1> 
            <h1>{usuario.segundo_apellido}</h1>
            <h1>{usuario.username}</h1>
            <h1>{tipoUsuario}</h1>
            </div>
            <button className="btn btn-primary m-2"
                onClick={() => { seleccionar(usuario); modalInsertar1() }}><BiEdit /> Editar Usuario</button>
          
            <button className="btn btn-danger m-2"
                onClick={() => { seleccionar(); setTipoModalEliminar(true) }}><RiDeleteBin5Line /> Eliminar Usuario</button>
            </div>
            <Modal isOpen={modalInsertar}>
                <ModalHeader style={{ display: 'block' }}>
                    <span onClick={() => { modalInsertar1(); setValues({}) }} style={{ float: 'right', cursor: 'pointer' }}>x</span>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                    <input className="form-control" ref={searchref} required type="text" name="id" id="id" readOnly hidden onChange={handleChange} value={values ? id : ''} />
                    <input 
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{display:'none'}}
                            onChange={handleFileChange}
                            />
                        <button className="btn btn-success" 
                            onClick={handlePictureClick}  style={{marginTop: "-5px"}}
                            >Foto de perfil</button>

                        <input 
                            type="text"
                            name="foto"
                            style={{marginLeft: "5px"}}
                            id="image"
                            onBlur={handleChange}
                            onChange={handleChange}
                            value={values ? foto:''}
                            required
                            />
                      <br />
                      <br />
                    <label htmlFor="nombre">Nombre</label>
                     <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        required=""
                        value={values ? nombre : ''}
                        onChange={handleChange}
                    />   <br />
                    <label htmlFor="primer_apellido">Primer Apellido</label>
                    <input
                        type="text"
                        value={values ? primer_apellido: ''}
                        name="primer_apellido"
                        className="form-control"
                        autoComplete="off"
                        onChange={handleChange}
                    />   <br />
                    <label htmlFor="segundo_apellido">Segundo Apellido</label>
                    <input
                        type="text"
                        value={values ? segundo_apellido : ''} 
                        name="segundo_apellido"
                        className="form-control"
                        autoComplete="off"
                        onChange={handleChange}
                        required=""

                    />  <br />
                    <label htmlFor="username">Correo Electronico</label>
                    <input
                        type="email"
                        name="username"
                        className="form-control"
                        value={values ? username : ''} 
                        required=""
                        onChange={handleChange}
                    /> <br />
                     <label htmlFor="Password">Contraseña</label>
                    <input
                        type="Password"
                        name="password"
                        className="form-control"
                        value={values ? password : ''} 
                        required=""
                        onChange={handleChange}
                    /> <br />
                     <label htmlFor="tipoUsuario">tipo de Usuario</label>
                       <input
                        type="text"
                        name="tipoUsuario"
                        className="form-control"
                        readOnly
                        value={values ? tipoUsuario : ''} 
                        required=""
                        onChange={handleChange}
                    />
                    <br />
                    </div>

                </ModalBody>
                <ModalFooter>

                    <button className="btn btn-primary"
                        onClick={() => { peticionPut() }}>
                        Actualizar
                    </button>
                    <button className="btn btn-danger"
                        onClick={() => { modalInsertar1(); setValues({}) }}
                    >
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    Está seguro de eliminar su usuario
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger"
                        onClick={peticionDelete}>Sí</button>
                    <button className="btn btn-secundary"
                        onClick={() => setTipoModalEliminar(false)}>No</button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

export default Usuario
