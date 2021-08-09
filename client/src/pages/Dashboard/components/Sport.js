import React, { useState } from 'react'
import axios from 'axios'
import './Sport.css'

export default function Sport() {
    const [team, setTeam] = useState()
    axios({
        url: 'api/currentUser',
        method: 'GET',
        headers: {
            ["x-access-token"]: localStorage.getItem('x-access-token')
        }
    })
        .then((response) => {
            setTeam(response.data.winning_team)
        })
        .catch((error) => {
            console.log(error, 'Not logged in')
        })
    return (
        <div className="sport-container">
            {!team && <div>Click here to select your favourite team!</div>}
            {team && <div>Your favourite team is {team}</div>}
        </div>
    )
}

