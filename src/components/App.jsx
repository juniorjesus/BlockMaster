import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';


function App({ setMenosValor, setAll, setMasValor, setsearch }) {
    const url = "https://crud-hooks-frontd.herokuapp.com/peliculas/";
    const [peli, setPeli] = useState([])
    const [end, setEnd] = useState(20)
    let noFind = "";
    let noFind2 = "";
    
    const peticionGet = async (url1) => {
        const res = await fetch(url1);
        const data = await res.json();
        setPeli(data)
    }

    useEffect(() => {

        console.log(setsearch)
        window.scroll({ top: 0 })
        setEnd(20)

        console.log("entro")
        peticionGet(url)


    }, [setMenosValor, setAll, setMasValor, setsearch])

    let peli2 = peli
    if (setsearch && setsearch !== '') {

        setsearch = setsearch.toLowerCase();
        peli2 = peli.filter(movie => movie.title.toLowerCase().includes(setsearch));
           if(!peli2.length){
        console.log("no encontre")
        noFind="https://res.cloudinary.com/djbaqvlnn/image/upload/v1639429249/block-master/buscar_xsyvmf_wtcez7.png"
        noFind2=`No se encontraron resultados para "${setsearch}"`;
        }
    }
 
    let peli1 = peli2;

    if (setMasValor) {
        
        console.log("entro mas")
        peli1 = peli2.filter(fil => fil.vote_average >= 7)

    }
    if (setMenosValor) {
        console.log("entro menos")
        peli1 = peli2.filter(fil => fil.vote_average < 7)
        
    }

    console.log(end)
    console.log(peli)
    let peliImp = peli1.slice(0, end)

    
    return (
        <> 
            <InfiniteScroll
                dataLength={peliImp.length}
                next={() => setEnd(end + 2)}
                hasMore={true}
            >
             <div style={{padding: "20px",display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
                {

                    peliImp.map((img, index) => {

                        return (
                           
                            <Card
                                key={index}
                                data152={img}
                            />    
                             )
                    })
                }
                       
                        </div>
        
      
            </InfiniteScroll>

            <img style={{ margin: "auto", display: "flex", width:"420px", height: "330px"}} src={noFind} alt="" />
           <h1 style={{ width:"100%",margin: "0 auto", display: "flex", justifyContent: "center",textalign: "center"}}>{noFind2}</h1>
         
        </>
    )
}

export default App


