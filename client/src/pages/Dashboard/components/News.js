import axios from 'axios';
import React, { useEffect, useState } from 'react'
import XMLParser from 'react-xml-parser';
import './News.css'
export default function News() {
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
        <div>
            {newsData.children &&
                <div>
                    <h2>News headline</h2>
                    <div className="news-dashboard-title">{newsData.children[0].children[9].children[0].value}</div>
                </div>
            }
        </div>
    )
}

