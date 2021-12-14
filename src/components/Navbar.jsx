import { makeStyles, Drawer, IconButton, Divider, Avatar} from '@material-ui/core';
import React from 'react'

import CancelIcon from '@material-ui/icons/Cancel';
import { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom'
import App from './App';
import  Carousel  from './Carousel';





const Navbar = () => {
    const classes = useStyles();
    const [search, setSearch] = useState('')
    const searchref = useRef()
    const [masValor, setMasValor] = useState(false)
    const [all, setAll] = useState(false)
    const [menosValor, setMenosValor] = useState(false)
    const [open, setOpen] = useState(false);
    const [ediAct, setEdiAct] = useState(false);
    const [ediAct2, setEdiAct2] = useState(false);
    const [foto, setFoto] = useState("");
    const [nombre, setNombre] = useState("");
    const [ediAct1, setEdiAct1] = useState("Todas las peliculas")

    const handleSubmit = (e) => {
        e.preventDefault()

    }
    const handleInputChange = (e,) => {
        setSearch(e.target.value)
        console.log(search)

    }
    function menosF() {
        setMenosValor(true)
        setMasValor(false)
        setAll(false)
        setEdiAct1("Peliculas menos valoradas")
    }
    function allF() {
        setAll(true)
        setMenosValor(false)
        setMasValor(false)
        setEdiAct1("Todas las peliculas")
    }
    function masF() {
        setMasValor(true)
        setMenosValor(false)
        setAll(false)
        setEdiAct1("Peliculas más valoradas")
    }
  
     const clear = () => {
        localStorage.clear()
         }
    
    useEffect(() => {
        searchref.current.focus()
        let editor = localStorage.getItem('TipoUsuario')   
        let editor2 = localStorage.getItem('Invitado')  
        setFoto(localStorage.getItem('Foto'))
        setNombre(localStorage.getItem('Nombre'))
       

        console.log(ediAct2)
        if (editor2 === "true") {
            setEdiAct2(true)
        } else {
            setEdiAct2(false)
        }

        if (editor === "administrador") {
            setEdiAct(true)
        } else {
            setEdiAct(false)
        }
    }, [ediAct2] )


    return (

        <>


            <div position="sticky" style={{marginBottom:"1rem"}} className={classes.toolbar}>

                <img src="https://res.cloudinary.com/djbaqvlnn/image/upload/v1639338870/block-master/block_master_iy5cqs.png" className={classes.logo} alt="Logo" />

                <label
                    onClick={allF}
                    className={classes.lin}
                >Todas</label>
                <label
                    className={classes.lin}
                    onClick={masF}
                >Mas valoradas</label>
                <label
                    className={classes.lin}
                    onClick={menosF}
                >Menos valoradas</label>
                <form 
               
                onSubmit={handleSubmit}>
                    <input
                        name="search"
                        ref={searchref}
                        placeholder="Buscar"
                        value={search}
                        onChange={handleInputChange}
                        className={classes.inBusca}
                    />
                </form>
               
                <Avatar
                   hidden={ediAct2 ? true : false }
                    alt=""
                    className={classes.logo}
                    onClick={() => setOpen(true)}
                    src={foto?foto:"/static/images/avatar/1.jpg"}
                    style={{marginTop:".5rem", width: 60, height: 60, cursor: 'pointer'}}
                />
                <h1
                hidden={ediAct2 ? true : false }
                className={classes.logo}
                onClick={() => setOpen(true)}
                style={{marginLeft:".5rem", marginTop:".9rem",textAlign:"center", color:"white", width: 66, fontSize: "22px", cursor: 'pointer' }}
                >hola {nombre}!</h1>
                 <Link
                 hidden={ediAct2 ? false : true }
                 onCkicl={clear}
                            to="/"
                            >
                    Iniciar Seción
                        </Link>
            </div>


            <Drawer anchor="right" open={open} onClose={() => setOpen(false)} className={classes.menul}>
                <IconButton onClick={() => setOpen(false)} className={classes.close}>
                    <CancelIcon fontSize="large" />
                </IconButton>
                <Divider />
                {
                    <>
                    
                        <Link
                            to="/usuario"
                            className={classes.menul2}
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-64}>
                            <span>
                            </span>
                            Mi perfil
                        </Link>

                        <Link
                            to="/verdespues"
                            className={classes.menul2}
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-64}>
                            <span>
                            </span>
                            Mi lista de peliculas
                        </Link>

                        <Link
                            hidden={ediAct ? false : true}
                            to="/gestion"
                            className={classes.menul2}
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-64}>
                            <span>
                            </span>
                            Gestion de peliculas
                        </Link>

                        <Link
                            to="/"
                            className={classes.menul2}
                            onClick={clear}
                            spy={true}
                            smooth={true}
                            duration={500}
                            offset={-64}>
                            <span>
                            </span>
                            Cerrar Sesión
                        </Link>
                    </>
                }
            </Drawer>
            <Carousel />
            <h1 style={{fontSize: "50px",marginTop:"30px",marginLeft:"40px", color: "white"}}>{ediAct1}</h1>
            <App
                setMenosValor={menosValor}
                setAll={all}
                setMasValor={masValor}
                setsearch={search}
            />
             
        </>
    )
}


const useStyles = makeStyles((theme) => ({

    toolbar: {
        zIndex: 100,
        display: "flex",
        backgroundColor: "#0F0E17",
        alignItems: "center",
        "& img": {
            height: '4rem',
            width: "8rem",
            margin: "auto 1rem",
            marginTop:"1rem",
        },
       
    },
    inBusca: {
       disply: 'flex',
       margin: "auto 1.5rem",
       marginTop:"1rem",
       width: "28rem"
    },


    lin: {
        color: "#fff",
        fontSize: "1.4rem",
        fontWeight: 'bold',
        margin: "auto 1.5rem",
        marginTop:"1.8rem",
        display: "block",
        
        "&:hover": {
            cursor: "pointer",
            color: "yellow",
            paddingTop: "5px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: ".8rem",
            marginLeft: theme.spacing(1),
        },

    },


    listbottom: {
        fontSize: "17px",

        display: "block",
        color: "#fff",
        width: "7vw",

        radiusBorder: "50%",
        position: "absolute",
        top: 0,
        right: 30,

    },
    menul2: {
        color: "blue",
        width: "30vw",
        [theme.breakpoints.down("sm")]: {
            width: "60vw",
        },
    },
    menul: {

        "& a": {
            margin: theme.spacing(5, 0, 0, 4),
            fontSize: "1.4rem",
            color: "#333",
            fontWeight: "bold",
        },
        "& a:hover": {
            color: "tomato",
            cursor: "pointer",
        }

    },
    close: {
        color: "red",
        position: "absolute",
        top: 0,
        right: 10,
    }
}))

export default Navbar

