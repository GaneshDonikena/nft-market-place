import React from "react"
import Image from "next/image"

//Internal import
import Style from "./Service.module.css"
import images from "../../img"

const Service = () => {
    return (
        <div className={Style.Service}>
            <div className={Style.service_box}>
                <div className={Style.service_box_item}>
                    <Image src={images.service1} alt="Filter & Discover" width={100} height={100} />
                    <p className={Style.service_box_item_step}>
                        <span>Step 1</span>
                    </p>
                    <h3>Filter & Discover</h3>
                    <p>connect with wallet, discover, buy NFTs, sell your NFTs and earn money</p>
                </div>
                <div className={Style.service_box_item}>
                    <Image src={images.service2} alt="Connect wallet" width={100} height={100} />
                    <p className={Style.service_box_item_step}>
                        <span>Step 2</span>
                    </p>
                    <h3>Connect wallet</h3>
                    <p>connect with wallet, discover, buy NFTs, sell your NFTs and earn money</p>
                </div>
                <div className={Style.service_box_item}>
                    <Image src={images.service3} alt="Start trading" width={100} height={100} />
                    <p className={Style.service_box_item_step}>
                        <span>Step 3</span>
                    </p>
                    <h3>Start trading</h3>
                    <p>connect with wallet, discover, buy NFTs, sell your NFTs and earn money</p>
                </div>
                <div className={Style.service_box_item}>
                    <Image src={images.service3} alt="Start trading" width={100} height={100} />
                    <p className={Style.service_box_item_step}>
                        <span>Step 3</span>
                    </p>
                    <h3>Start trading</h3>
                    <p>connect with wallet, discover, buy NFTs, sell your NFTs and earn money</p>
                </div>
            </div>
        </div>
    )
}

export default Service
