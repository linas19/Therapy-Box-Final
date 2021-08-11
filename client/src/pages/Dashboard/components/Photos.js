import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Photos.css'

export default function Photos() {
    const [photos, setPhotos] = useState([])
    useEffect(() => fetchPhotos(), [])
    const fetchPhotos = () => {
        axios({
            url: '/api/photos',
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem('x-access-token')
            }
        })
            .then((response) => {
                setPhotos(response.data)
            })
            .catch((error) => {
                console.log(error, 'Not logged in to get photos')
            })
    }

    return (
        <div>
            {photos.length === 0 && <div>Click here to create your photos list!</div>}
            {photos.length > 0 &&
                <div className="dashboard-photos-container">
                    {photos[0] &&
                        <div className="dashboard-photo-container">
                            <div style={{backgroundImage: `url(${photos[0].url})`,backgroundRepeat: "no-repeat",backgroundSize: "80px", backgroundPosition: "center", height: "50px", width: "80px", border: "solid yellow 2px"}}></div>
                        </div>}
                    {photos[1] &&
                        <div className="dashboard-photo-container">
                            <div style={{backgroundImage: `url(${photos[1].url})`,backgroundRepeat: "no-repeat",backgroundSize: "80px", backgroundPosition: "center", height: "50px", width: "80px", border: "solid yellow 2px"}}></div>
                        </div>}
                    {photos[2] &&
                        <div className="dashboard-photo-container">
                            <div style={{backgroundImage: `url(${photos[2].url})`,backgroundRepeat: "no-repeat",backgroundSize: "80px", backgroundPosition: "center", height: "50px", width: "80px", border: "solid yellow 2px"}}></div>
                        </div>}
                    {photos[3] &&
                        <div className="dashboard-photo-container">
                            <div style={{backgroundImage: `url(${photos[3].url})`,backgroundRepeat: "no-repeat",backgroundSize: "80px", backgroundPosition: "center", height: "50px", width: "80px", border: "solid yellow 2px"}}></div>
                        </div>}
                </div>}

        </div>
    )
}

