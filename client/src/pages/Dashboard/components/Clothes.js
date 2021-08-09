import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './Clothes.css'

export default function Clothes() {
    const [clothesData, setClothesData] = useState()
    const [clotheLabels, setClotheLabels] = useState([])
    const [clotheValues, setClotheValues] = useState([])
    const data = {
        labels: clotheLabels,
        datasets: [
            {
                label: '# of Votes',
                data: clotheValues,
                backgroundColor: [
                    'black',
                    'green',
                    'blue',
                    'purple',
                    'yellow',
                    'pink',
                    'orange'
                ],
                borderWidth: 0,
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        responsive: false,
        plugins: {
            legend: {
                display: false,
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [clothesData])
    const fetchData = () => {
        if (!clothesData) {
            axios.get('/api/clothes')
                .then(res => {
                    // console.log('res', res.data.payload)
                    setClothesData(res.data.payload)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            createChart()
        }
    }
    const createChart = () => {
        if (clothesData) {
            const counts = {};
            clothesData.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
            let result = clothesData.map(a => a.clothe);
            result.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
            const labels = Object.keys(counts)
            const values = Object.values(counts)
            labels.shift()
            values.shift()
            setClotheLabels(labels)
            setClotheValues(values)
        }
    }
    return (
            <div className="pie-chart-container">
                <Pie data={data} options={options} height={120} width={120} />
            </div>
    )
}