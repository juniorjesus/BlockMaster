import React from 'react';


function Carousel() {
  

    return (
<div className="container mt-3">
                <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="5000">
                            <img src="https://res.cloudinary.com/ohtico/image/upload/v1631590650/Block-Master-React/peliculas/mulan_zgbw4v.jpg" class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item" data-bs-interval="4000">
                            <img src="https://res.cloudinary.com/ohtico/image/upload/v1631590650/Block-Master-React/peliculas/raya_ayyld8.png" class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://res.cloudinary.com/ohtico/image/upload/v1631590649/Block-Master-React/peliculas/unidos_shkda7.png" class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
    )
}

export default Carousel
