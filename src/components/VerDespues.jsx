import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import MasTardeCard from './MasTardeCard';

function VerDespues() {
    const [data, setData] = useState([])
    useEffect(() => {
        let dataVer =JSON.parse(localStorage.getItem('MasTarde'))
      setData(dataVer)
    
    }, [])
 
    return (
        <> 
     <Link to="/navbar"><span style={{ float: 'right',fontSize:"34px", fontWeight:"bold", color:"white", marginTop:"30px", marginRight:"3rem", cursor: 'pointer' }}>Volver</span></Link>
            <br/>
            <br/>
            <br/>
            <br/>
         <div style={{padding: "20px",display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
            {

                data.map((img, index) => {

                    return (
                       
                        <MasTardeCard
                            key={index}
                            dat2={img}
                        />    
                         )
                })
            }
                   
                    </div>
 

    </>
    )
}

export default VerDespues
