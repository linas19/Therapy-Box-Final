import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './Clothes.css'

export default function Clothes() {
    const [clothesDataDone, setClothesDataDone] = useState({
        labels: '',
        values: null
    })
    const data = {
        labels: clothesDataDone.labels,
        datasets: [
            {
                label: '# of Votes',
                data: clothesDataDone.values,
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
    const createChart =
        (data) => {
            const counts = {};
            data.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
            let result = data.map(a => a.clothe);
            result.forEach((x) => { counts[x] = (counts[x] || 0) + 1 });
            const labels = Object.keys(counts)
            const values = Object.values(counts)
            labels.shift()
            values.shift()
            const updateClothesData = { labels: labels, values: values }
            setClothesDataDone(updateClothesData)
        }

    useEffect(() => {
        const fetchData = () => {
            axios.get('/api/clothes')
                .then(res => {
                    createChart(res.data.payload)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchData()
    }, [setClothesDataDone])

    return (
        <div className="pie-chart-container">
            <Pie data={data} options={options} height={120} width={120} />
        </div>
    )
}