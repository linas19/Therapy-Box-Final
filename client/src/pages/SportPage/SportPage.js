import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import './SportPage.css'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import PageHeading from '../../components/PageHeading/PageHeading';

export default function SportPage() {
    const [inputSelectedTeam, setInputSelectedTeam] = useState('')
    const [sportData, setSportData] = useState('')
    const [losingTeamState, setLosingTeamState] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            axios.get('/api/sport')
                .then(res => {
                    setSportData(Papa.parse(res.data))
                });
            await getLosingTeams()
        }
        fetchData()
    }, [])
    useEffect(() => getLosingTeams(),[inputSelectedTeam, sportData])
    useEffect(() => {
        const fetchSelectedTeam = () => {
            axios({
                url: 'api/currentUser',
                method: 'GET',
                headers: {
                    ["x-access-token"]: localStorage.getItem('x-access-token')
                }
            })
                .then((response) => {
                    console.log('winning: ',response.data.winning_team)
                    setInputSelectedTeam(response.data.winning_team)
                })
                .catch((error) => {
                    console.log(error, 'Not logged in')
                })
        }
        fetchSelectedTeam()
    }, [])
    const getLosingTeams = () => {
        if (sportData.data) {
            const cols = [3, 4, 7]
            const selectedCols = sportData.data.map(r => cols.map(i => r[i - 1]));
            const losingTeams = []
            for (let i = 1; i < selectedCols.length; i++) {
                if (selectedCols[i][0] === inputSelectedTeam && selectedCols[i][2] === "H") {
                    losingTeams.push(selectedCols[i][1])
                } else if (selectedCols[i][1] === inputSelectedTeam && selectedCols[i][2] === "A") {
                    losingTeams.push(selectedCols[i][0])
                }
            }
            setLosingTeamState(losingTeams)
        } else {
            return
        }
    }
    const updateUserWinningTeam = () => {
        const payload = {
            winning_team: inputSelectedTeam,
        };
        axios({
            url: '/api/currentUser',
            method: 'PUT',
            data: payload,
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then(() => {
                console.log('sending')
                getLosingTeams()
            })
            .catch(() => {
                console.log('Todo data not sent')
            })
    }
    return (
        <div className="sport-page-container">
            <PageHeading text="Champion's League Challenge"/>
            <div className="sport-input-container">
                <input className="sport-input" type="text" value={inputSelectedTeam} placeholder="Input winning team" onChange={e => setInputSelectedTeam(e.target.value)} />
                <ButtonComponent text="Click to confirm selection" onClick={updateUserWinningTeam}/>
            </div>
            <div className="sport-page-description">These teams you won against:
                <div className="sport-page-losers">
                    {losingTeamState && losingTeamState.map((x, index) =>
                        <div className="sport-page-loser" key={index}>
                            <div>Team {index+1}:</div>
                            <div>{x}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

