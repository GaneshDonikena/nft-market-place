import React, { useState, useEffect } from "react"
import { BsFillAlarmFill, BsFillCalendarDateFill, BsCalendar3 } from "react-icons/bs"

//Internal import
import Style from "./Collection.module.css"
import DaysComponents from "./DaysComponents/DaysComponents"
import images from "../../img"

function Collection() {
    const [popular, setPopular] = useState(true)
    const [following, setFollowing] = useState(false)
    const [news, setNews] = useState(false)

    const CardArray = [
        {
            background: images.creatorbackground1,
            user: images.user1,
        },
        {
            background: images.creatorbackground2,
            user: images.user2,
        },
        {
            background: images.creatorbackground3,
            user: images.user3,
        },
        {
            background: images.creatorbackground4,
            user: images.user4,
        },
        {
            background: images.creatorbackground5,
            user: images.user5,
        },
        {
            background: images.creatorbackground6,
            user: images.user6,
        },
        {
            background: images.creatorbackground7,
            user: images.user7,
        },
        {
            background: images.creatorbackground8,
            user: images.user8,
        },
    ]
    const FollowingArray = [
        {
            background: images.creatorbackground1,
            user: images.user1,
        },
        {
            background: images.creatorbackground2,
            user: images.user2,
        },
        {
            background: images.creatorbackground3,
            user: images.user3,
        },
        {
            background: images.creatorbackground4,
            user: images.user4,
        },
        {
            background: images.creatorbackground5,
            user: images.user5,
        },
        {
            background: images.creatorbackground6,
            user: images.user6,
        },
        {
            background: images.creatorbackground7,
            user: images.user7,
        },
    ]
    const NewsArray = [
        {
            background: images.creatorbackground1,
            user: images.user1,
        },
        {
            background: images.creatorbackground2,
            user: images.user2,
        },
        {
            background: images.creatorbackground3,
            user: images.user3,
        },
        {
            background: images.creatorbackground4,
            user: images.user4,
        },
        {
            background: images.creatorbackground5,
            user: images.user5,
        },
    ]

    const openPopular = () => {
        if (!popular) {
            setPopular(true)
            setFollowing(false)
            setNews(false)
        }
    }

    const openFollower = () => {
        if (!following) {
            setPopular(false)
            setFollowing(true)
            setNews(false)
        }
    }

    const openNews = () => {
        if (!news) {
            setPopular(false)
            setFollowing(false)
            setNews(true)
        }
    }

    return (
        <div className={Style.collection}>
            <div className={Style.collection_title}>
                <h2>Top List Creators</h2>
                <div className={Style.collection_collections}>
                    <div className={Style.collection_collections_btn}>
                        <button onClick={() => openPopular()}>
                            <BsFillAlarmFill /> 24 hours
                        </button>
                        <button onClick={() => openFollower()}>
                            <BsCalendar3 /> Last 7 days
                        </button>
                        <button onClick={() => openNews()}>
                            <BsFillCalendarDateFill /> Last 30 days
                        </button>
                    </div>
                </div>
            </div>
            {popular && (
                <div className={Style.collection_box}>
                    {CardArray.map((el, i) => (
                        <DaysComponents key={i + 1} el={el} />
                    ))}
                </div>
            )}

            {following && (
                <div className={Style.collection_box}>
                    {FollowingArray.map((el, i) => (
                        <DaysComponents key={i + 1} el={el} />
                    ))}
                </div>
            )}

            {news && (
                <div className={Style.collection_box}>
                    {NewsArray.map((el, i) => (
                        <DaysComponents key={i + 1} el={el} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Collection
