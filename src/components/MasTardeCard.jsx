import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function MasTardeCard({ dat2 }) {
    const [borrar, setBorrar] = useState([])
    
    const { title, id, poster_path, vote_average, overview, backdrop_path, release_date, triler, original_language } = dat2;
  
    let pelidata =[]

    const imgclick = () => {
        let login = {
            id,
            title,
            poster_path,  
            vote_average, 
            overview, 
            backdrop_path, 
            release_date, 
            original_language,
            triler
        }
    
        pelidata.push(login);
        localStorage.setItem('Pelidata',JSON.stringify(pelidata));
        
    }
    const close = () => {
        let borrador = borrar.find(dataB => dataB.id === id)
        let index = borrar.indexOf(borrador)
        if(borrador){
            borrar.splice(index, 1);
            localStorage.setItem('MasTarde',JSON.stringify(borrar));
            window.location.reload();
        }
    }
    useEffect(() => {
        let dataDespues = JSON.parse(localStorage.getItem('MasTarde'))
        setBorrar(dataDespues)
    }, [])
    
        

   
    return (
        <>

            <div  key={id}>
            <span onClick={close} style={{position:"absolute", fontSize:"23px", fontWeight:"bold", color:"red", marginTop:"19px", marginLeft:"12.8rem", cursor: 'pointer' }}>X</span>
                <Link
                    to="/tarjeta"
                >
               
                    <img style={{ margin: "20px", width:"220px", height: "330px"}} src={poster_path} alt="" onClick={imgclick} />
                </Link>
                <h1 style={{position:"absolute", marginLeft:"20px", marginTop:"-20rem",backgroundColor:"rgba(7, 6, 6, 0.862)",paddingTop:"10px", padding:"auto",color:"orange", fontWeight: "bold",width:"90px", height: "44px",borderBottomRightRadius:"50px", fontSize: "18px",borderTopRightRadius:"50px",border:"2px solid"}} 
               ><img style={{marginRight:"7px", marginTop:"-5px",marginLeft:"14px", width:"20px", height: "20px"}} src="https://res.cloudinary.com/dky22nhv5/image/upload/v1631941923/Imagen4_m4urtc.png" alt=""/>{vote_average}</h1>
            </div>

        </>
    )
}

export default MasTardeCard
