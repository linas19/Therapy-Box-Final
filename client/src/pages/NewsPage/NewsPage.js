import axios from 'axios';
import React, { useEffect, useState } from 'react'
import XMLParser from 'react-xml-parser';
import PageHeading from '../../components/PageHeading/PageHeading';
import './NewsPage.css'

export default function NewsPage() {
    const [newsData, setNewsData] = useState('')
    useEffect(() => {
        axios.get('/api/news', {
            "Content-Type": "application/xml; charset=utf-8"
        })
            .then(res => {
                const jsonDataFromXml = new XMLParser().parseFromString(res.data);
                setNewsData(jsonDataFromXml)
            })
    }, [])

    return (
        <div className="news-container">
            <PageHeading text="News" />
                {newsData.children &&
                    <div className="news-content">
                        <img className="news-image" src={newsData.children[0].children[3].children[0].value} alt="BBC" />
                        <div className="news-title">{newsData.children[0].children[9].children[0].value}</div>
                        <div className="news-description">{newsData.children[0].children[9].children[1].value}</div>
                    </div>
                }
            <div className="news-page-right"></div>
        </div>
    )
}

