import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Modal,   ModalHeader } from 'reactstrap';
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';


function Tarjeta() {

    const [modalInsertar, setTipoModalInsertar] = useState(false);
    const [stateTaks, setStateTaks] = useState([])
    const [vid, setVid] = useState([])
    const classes = useStyles();
    let verDespues= [];
    let comprobar1 = JSON.parse(localStorage.getItem('MasTarde'));
    if( comprobar1 !== null){
        verDespues  = JSON.parse(localStorage.getItem('MasTarde'));
        console.log(verDespues)
    }
    const { title, poster_path, overview, vote_average, release_date, original_language,id} = stateTaks;



    const peticionGet = async (id) => {

        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`);
        const data = await res.json();
        const data1 = data.results;
        const data2 = data1[0]
        setVid(data2.key)
    }

    const guarda = () => {
        let guardaPeli = {
            title, 
            poster_path, overview,  
            release_date, 
            original_language,
            vote_average,
            id
        }

        verDespues.push(guardaPeli)
        localStorage.setItem('MasTarde', JSON.stringify(verDespues))
    }
    const handleMasTarde = () => {
        let verificar = JSON.parse(localStorage.getItem("MasTarde"))
        if(verificar && verificar.length){
            let verifica = verificar.find(ver => ver.id === id)
            if(!verifica){
                guarda()
                alert("pelicula agregada")
            }else{alert("la pelicula ya esta en su lista")}
        }else{
            guarda()
            alert("pelicula agregada")
        }
       
    }

    const modalInsertar1 = () => {
        setTipoModalInsertar(!modalInsertar)
    }
    const handleVer = () => {
        modalInsertar1()
    }
    

    useEffect(() => {
        let dataLocal = JSON.parse(localStorage.getItem('Pelidata'));
        setStateTaks(dataLocal[0])
        let dataId = dataLocal[0]
        const { id } = dataId
        peticionGet(id)
    }, [])

    let muestraVideo = `https://www.youtube.com/watch?v=${vid}`
    return (
        <div >
  
            <div className={classes.cont2}>
                <div className={classes.img}>
                    <img
                        src={poster_path}
                        alt=""
                        className="img-thumbnail animate__animated animate__fadeInLeft"
                    />
                </div>
                <div className={classes.cont}>
                <h1 className={classes.title}>{title}</h1>
                <p className={classes.over}>{overview}</p>
                <h2 className={classes.idioma}>{release_date} - Idioma: {original_language}</h2>
              <div className={classes.btm}>
                <button
                       className="btn btn-outline-info"
                        onClick={handleVer}
                    >
                        Ver Trailer
                    </button>
                    <button
                       className="btn btn-outline-primary  m-4"
                        onClick={handleMasTarde}
                    >
                        Ver Despues
                    </button>

                    <button
                       className="btn btn-outline-primary  m-4"
                        onClick={handleMasTarde}
                    >
                        Remover
                    </button>
                    <Link
                     to="/navbar"> 

                               

                   <button
                    
                   
                        className="btn btn-outline-danger"
                   
                    >
                        Volver
                    </button>
                    </Link>
                </div>
                </div>

            </div>
  
            <Modal className={classes.contModal} isOpen={modalInsertar}>
            <div style={{ width:700, backgroundColor: 'white', display: 'block'}}>
                <ModalHeader style={{ display: 'block'}}>
                    <span onClick={() => { modalInsertar1() }} style={{ float: 'right',fontSize:"22px", fontWeight:"bold", cursor: 'pointer' }}>x</span>
                </ModalHeader>
                <ReactPlayer
                style={{ display: 'flex',margin: '40px auto ',alignItems: 'center'}}
                    url={muestraVideo}
                    controls= {true}
                    playing= {true}
                />
            </div>
            </Modal>
           
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    title:{
        color:"white",
        
    },
    contModal:{
        width: "900px",
    },
    cont:{
        margin:"3rem",
        padding:"1rem",
        color:"white",
    },
    img:{
        width: "400px",
        margin: "20px",
        marginLeft: "8rem"
    },
    cont2: {
    display: "grid", 
    gridTemplateColumns: "1fr 1fr",
    }
}))
export default Tarjeta
