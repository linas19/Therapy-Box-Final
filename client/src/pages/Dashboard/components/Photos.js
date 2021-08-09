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
        })
            .then((response) => {
                console.log('res', response.data)
                setPhotos(response.data)
            })
            .catch((error) => {
                console.log(error, 'No photos')
            })
    }

    return (
        <div>
            {!photos && <div>Click here to create your photos list!</div>}
            {photos &&
                <div className="dashboard-photos-container">
                    {photos[0] &&
                        <div className="dashboard-photo-container">
                            <img className="dashboard-photo" src={photos[0].url} alt="S3" />
                        </div>}
                    {photos[0] &&
                        <div className="dashboard-photo-container">
                            <img className="dashboard-photo" src={photos[0].url} alt="S3" />
                        </div>}
                    {photos[0] &&
                        <div className="dashboard-photo-container">
                            <img className="dashboard-photo" src={photos[0].url} alt="S3" />
                        </div>}
                    {photos[0] &&
                        <div className="dashboard-photo-container">
                            <img className="dashboard-photo" src={photos[0].url} alt="S3" />
                        </div>}
                </div>}

        </div>
    )
}

