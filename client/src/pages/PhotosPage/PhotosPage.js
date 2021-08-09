

import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function PhotosPage() {
    const [photos, setPhotos] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        const formData  = new FormData();
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
            <div>
                <div>Photos</div>
                {photos.length !== 0 &&
                        photos.map((photos) =>
                            <div key={photos._id}>
                                <img src={photos.url} height={280} width={280} alt="Uploaded img"/>
                                <div>{photos.url}</div>
                            </div>
                        )
                    }
                <input type="file" onChange={handleFileInput} />
                <button onClick={() => handleUpload(selectedFile)}>Upload image</button>
            </div>

        </div>
    )
}

