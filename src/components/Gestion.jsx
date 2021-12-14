import axios from 'axios';
import {fileUpload} from '../helpers/fileUpload';
import React, { useState } from 'react'
import { ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


import uuid from 'react-uuid';
import { Link } from 'react-router-dom';



function Gestion() {
    const url = "https://crud-hooks-frontd.herokuapp.com/peliculas/";
    const [values, setValues] = useState({
        id: uuid,
        title: '',
        poster_path: '',
        vote_average: '',
        overview: '',
        release_date: '',
        original_language: '',
        triler: '',
       
    })

    const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    fileUpload(file)
    .then(response => {
        
        document.getElementById('image').value = response;
        
    }).catch(error => {
        console.log(error.message)
    })
    }
    const handleChange = ({target}) => {
          setValues({
            ...values,
            [target.name]: target.value
          })
          console.log(values);
    }

    const cancel = () => {
    document.getElementById("formulario").reset();
    
    }

  
    const handleSubmit = (e) => {
    e.preventDefault();
    peticionPost()
   document.getElementById("formulario").reset();
   
    }
    const peticionPost = async () => {
    await axios.post(url,values)
    .then(response => {
      console.log(response);
      
    })
    .catch(error => {
       console.log(error.message)
    })
 }


    return (
        <>
        <Link to="/navbar"> <span style={{float: 'right', marginRight:"50px",fontSize: "36px",cursor: 'pointer',color:"white"}}>x</span></Link>  
         <img 
              className="fadeimg "
                    src="https://res.cloudinary.com/dky22nhv5/image/upload/v1631157616/logo_jqmfzn.png" 
                    id="icon" 
                    style={{margin:"40px auto"}}
                    alt="User Icon" 
                    width="200px"
                    />
         
                    <ModalHeader style={{ display: 'block'}}>
                       
                    </ModalHeader>
                    <ModalBody>
                    <form id="formulario" style={{width: "70%", margin:"auto"}}>
          
                        <div className="form-group">
                        <input 
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{display:'none'}}
                            onChange={handleFileChange}
                            />
                        <button className="btn btn-success" 
                            onClick={handlePictureClick}  style={{marginTop: "-5px"}}
                            >Imagen</button>
                      
                        <input 
                            type="text"
                            name="poster_path"
                            style={{marginLeft: "5px"}}
                            id="image"
                            onBlur={handleChange}
                            onChange={handleChange}
                            required
                            />
                         <br/>
                              <label htmlFor="title">Titulo</label>                              
                        <input className="form-control" type="text" required name="title"  onChange={handleChange} />
                            <br/>
                            <label htmlFor="overview">Descripción</label>
                        <input className="form-control" type="text" required name="overview" onChange={handleChange} />   
                            <br/>
                            <label htmlFor="vote_average">Valoración</label>
                        <input className="form-control" type="text" required name="vote_average"  onChange={handleChange} />
                            <br/>
                            <label htmlFor="release_date">Fecha de estreno</label>
                        <input className="form-control" type="text" required name="release_date"  onChange={handleChange} />
                            <br/>
                            <label htmlFor="original_language">lenguaje original</label>
                        <input className="form-control" type="text" required name="original_language"  onChange={handleChange} />
                            <br/>
                            <label htmlFor="triler">Trailer</label>
                        <input className="form-control" type="text" required name="triler"  onChange={handleChange} />
                            <br/>
                      </div>
                      </form>
                    </ModalBody>
                   
                    <ModalFooter>
                       
                        <button className="btn btn-primary" 
                        onClick={handleSubmit}>
                            Actualizar
                        </button>
                        <Link to="/navbar">    <button className="btn btn-danger"
                         onClick={cancel}
                           >
                            Cancelar
                        </button></Link>
                    </ModalFooter>
         

         </>
   
    )
}

export default Gestion
