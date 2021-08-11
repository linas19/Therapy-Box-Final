

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddPhotosComponent from '../../components/AddPhotosComponent/AddPhotosComponent';
import PageHeading from '../../components/PageHeading/PageHeading';
import './PhotosPage.css'

export default function PhotosPage() {
    const [photos, setPhotos] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = async (e) => {
        setSelectedFile(e.target.files[0]);
        await handleUpload(selectedFile)
    }

    const handleUpload = (file) => {
        const formData = new FormData();
        formData.append('image', file);

        axios.post('/api/photos', formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': localStorage.getItem('x-access-token')
            }
        })
            .then((response) => {
                setPhotos([...photos, response.data]);
                setSelectedFile(null);
            })
            .catch((error) => {
                console.log(error, 'Not logged in to get photos')
            })
    }

    useEffect(() => fetchPhotos(), [selectedFile])
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
    const deletePhoto = (id) => {
        console.log('DELETE id', id)
    }

    return (
        <div className="photos-page-container">
            <PageHeading  text="Photos"/>
            <div className="photos-list">
                <div>
                    <AddPhotosComponent onChange={handleFileInput} />
                    {selectedFile !== null && <button onClick={() => handleUpload(selectedFile)}>Upload image</button>}
                </div>
                {photos.length !== 0 &&
                    photos.map((photos) =>
                        <div className="photos-list-container" key={photos._id}>
                            <div style={{backgroundImage: `url(${photos.url})`,backgroundRepeat: "no-repeat",backgroundSize: "280px", backgroundPosition: "center", height: "280px", width: "280px", border: "solid yellow 2px"}}></div>
                        </div>
                    )
                }
            </div>
        </div>

    )
}

