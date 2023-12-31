import React, { useState, useEffect, useContext } from "react"

//Internal import
import Style from "../styles/searchPage.module.css"
import { Slider, Brand, Loader } from "../components/componentsindex"
import { SearchBar } from "../SearchPage/searchBarIndex"
import { Filter } from "../components/componentsindex"
import { NFTCardTwo, Banner } from "../collectionPage/CollectionIndex"
import images from "../img"

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext"

const searchPage = () => {
    const { fetchNFTs, setError } = useContext(NFTMarketplaceContext)

    const [nfts, setNfts] = useState([])
    const [nftsCopy, setNftsCopy] = useState([])

    useEffect(() => {
        fetchNFTs().then((items) => {
            setNfts(items)
            setNftsCopy(items)
            // console.log(nfts)
        })
    }, [])

    const onHandleSearch = (value) => {
        const filteredNFTs = nfts.filter(({ name }) =>
            name.toLowerCase().includes(value.toLowerCase())
        )

        if (filteredNFTs.length === 0) {
            setNfts(nftsCopy)
        } else {
            setNfts(filteredNFTs)
        }
    }

    const onClearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setNfts(nftsCopy)
        }
    }

    // const collectionArray = [
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_2,
    //     images.nft_image_1,
    //     images.nft_image_3,
    //     images.nft_image_2,
    //     images.nft_image_1,
    // ]

    return (
        <div className={Style.searchPage}>
            <Banner bannerImage={images.creatorbackground2} />
            <SearchBar onHandleSearch={onHandleSearch} onClearSearch={onClearSearch} />
            <Filter />
            {nfts.length === 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
            {/* <NFTCardTwo NFTData={nfts} /> */}
            <Slider />
            <Brand />
        </div>
    )
}

export default searchPage
