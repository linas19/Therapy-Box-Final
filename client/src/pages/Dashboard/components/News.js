import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './News.css'
export default function News() {
    const [newsData, setNewsData] = useState()

    useEffect(() => fetchNews(), [])
    const fetchNews = () => {
        axios.get('/api/news')
        .then(res => {
            setNewsData(res.data)
        })
    }
    return (
        <div>
            {newsData &&
                <div>
                    <h2>News headline</h2>
                    <div className="news-dashboard-title">{newsData.rss.channel[0].item[0].title}</div>
                </div>
            }
        </div>
    )
}

