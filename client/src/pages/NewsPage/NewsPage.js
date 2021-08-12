import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/PageHeading/PageHeading';
import './NewsPage.css'

export default function NewsPage() {
    const [newsData, setNewsData] = useState()
    useEffect(() => fetchNews(), [])
    const fetchNews = () => {
        axios.get('/api/news')
        .then(res => {
            setNewsData(res.data)
        })
    }

    return (
        <div className="news-container">
            <PageHeading text="News" />
                {newsData &&
                    <div className="news-content">
                        <img className="news-image" src={newsData.rss.channel[0].image[0].url[0]} alt="BBC" />
                        <div className="news-title">{newsData.rss.channel[0].item[0].title}</div>
                        <div className="news-description">{newsData.rss.channel[0].item[0].description[0]}</div>
                    </div>
                }
            <div className="news-page-right"></div>
        </div>
    )
}

