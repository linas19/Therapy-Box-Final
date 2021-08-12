import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import './SportPage.css'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import PageHeading from '../../components/PageHeading/PageHeading';

export default function SportPage() {
    const [inputSelectedTeam, setInputSelectedTeam] = useState('')
    // const [loading, setLoading] = useState(false)
    const [losingTeamState, setLosingTeamState] = useState([])
    const [displayedSelectedTeam, setDisplayedSelectedTeam] = useState('')

    useEffect(() => {
        const fetchSelectedTeam = () => {
            axios({
                url: 'api/currentUser',
                method: 'GET',
                headers: {
                    "x-access-token": localStorage.getItem('x-access-token')
                }
            })
                .then((response) => {
                    axios.get('/api/sport')
                        .then(res => {
                            const cols = [3, 4, 7]
                            const data = Papa.parse(res.data)
                            const selectedCols = data.data.map(r => cols.map(i => r[i - 1]));
                            const losingTeams = []
                            for (let i = 1; i < selectedCols.length; i++) {
                                if (selectedCols[i][0] === response.data.winning_team && selectedCols[i][2] === "H") {
                                    losingTeams.push(selectedCols[i][1])
                                } else if (selectedCols[i][1] === response.data.winning_team && selectedCols[i][2] === "A") {
                                    losingTeams.push(selectedCols[i][0])
                                }
                            }
                            setLosingTeamState(losingTeams)
                            setDisplayedSelectedTeam(response.data.winning_team)
                        })
                        .catch((error) => {
                            console.log(error, 'Not logged in')
                        })
                })
        }
        fetchSelectedTeam()
    }, [inputSelectedTeam, displayedSelectedTeam])

    const updateUserWinningTeam = () => {
        setDisplayedSelectedTeam(inputSelectedTeam)
        const payload = {
            winning_team: inputSelectedTeam,
        };
        axios({
            url: '/api/currentUser',
            method: 'PUT',
            data: payload,
            headers: {
                "x-access-token": localStorage.getItem('x-access-token')
            }
        })
            .then(() => {
                console.log('sending senected team')
            })
            .catch(() => {
                console.log('Todo data not sent')
            })
    }
    return (
        <div className="sport-page-container">
            <PageHeading text="Champion's League Challenge" />
            <div className="sport-input-container">
                <input className="sport-input" type="text" value={inputSelectedTeam} placeholder="Input winning team" onChange={e => setInputSelectedTeam(e.target.value)} />
                
                <ButtonComponent text="Click to follow team" onClick={updateUserWinningTeam} />
            </div>

            {losingTeamState.length === 0 && <div>Enter a correct team name to get data on the team!</div>}
            {losingTeamState.length !== 0 &&
                <div>
                    <div className="sport-page-description">You are following: <h2>{displayedSelectedTeam}</h2></div>
                    <div className="sport-page-description">These teams {displayedSelectedTeam} won against: </div>
                    <div className="loser-list">
                        {losingTeamState.length !== 0 && losingTeamState.map((x, index) =>
                            <div className="sport-page-loser" key={index}>
                                <div>Team {index + 1}:</div>
                                <div>{x}</div>
                            </div>
                        )}
                    </div>
                </div>}
        </div>
    )
}

