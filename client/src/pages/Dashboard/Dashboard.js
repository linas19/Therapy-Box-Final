import React, { useState, useEffect } from 'react';
import CardContainer from '../../components/CardContainer/CardContainer';
import './Dashboard.css'
import { logout } from '../../utils';
import Weather from './components/Weather';
import axios from 'axios';
import News from './components/News';
import Clothes from './components/Clothes';
import Sport from './components/Sport';
import Tasks from './components/Tasks';
import Photos from './components/Photos';
import CornerImage from '../../components/CornerImage/CornerImage';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const buttonLogout = () => {
    logout()
    window.location.reload(true);
}

export default function Dashboard() {
    const [username, setUsername] = useState('')
    const fetchUser = () => {
        axios({
            url: 'api/currentUser',
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem('x-access-token')
            }
        })
            .then((response) => {
                setUsername(response.data.username)
            })
            .catch((error) => {
                console.log(error, 'Not logged in')
            })
    }
    useEffect(() => fetchUser(), [])

    return (
        <div className="dashboard-container">
            <div className="dashboard-top">
                <CornerImage />
                <div className="dashboard-title">Good day {username}</div>
                <ButtonComponent onClick={buttonLogout} text="Logout" />
            </div>
            <div className="card-container">
                <CardContainer title="Weather" clickable={false}>
                    {/* <Weather /> */}
                </CardContainer>
                <CardContainer title="News" link="/news" clickable={true}>
                    {/* <News /> */}
                </CardContainer>
                <CardContainer title="Sport" link="/sport" clickable={true}>
                    {/* <Sport /> */}
                </CardContainer>
                <CardContainer title="Photos" link="/photos" clickable={true}>
                    {/* <Photos /> */}
                </CardContainer>
                <CardContainer title="Tasks" link="/tasks" clickable={true}>
                    {/* <Tasks /> */}
                </CardContainer>
                <CardContainer title="Clothes">
                    <Clothes />
                </CardContainer>
            </div>
        </div>
    )
}