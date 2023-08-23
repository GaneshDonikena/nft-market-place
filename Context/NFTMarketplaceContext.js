import React, { useState, useEffect } from "react"
import Web3Modal from "web3modal"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import axios from "axios"
import { create as ipfsHttpClient } from "ipfs-http-client"

const projectId = "2TZNENLfY48U4YuP5CiXRCvTyU5"
const projectSecretKey = "ec4be79e42082c64d01b37c74fc61766"
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`
const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
})
const subdomain = "https://ganesh-nft-marketplace.infura-ipfs.io"

//Internal import
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants"

//Fetching smart contract
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider)

//---CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
    try {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = fetchContract(signer)
        return contract
    } catch (error) {
        console.log("Something went wrong while connecting with contract", error)
    }
}

export const NFTMarketplaceContext = React.createContext()

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect, and sell NFTs"

    //---USESTATE
    const [error, setError] = useState("")
    const [openError, setOpenError] = useState(false)
    const [currentAccount, setCurrentAccount] = useState("")
    const router = useRouter()

    //---CHECK IF WALLET IS CONNECTED
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return setOpenError(true), setError("install metamask")

            const accounts = await window.ethereum.request({ method: "eth_accounts" })

            if (accounts.length) {
                setCurrentAccount(accounts[0])
            } else {
                setError("No account found")
                setOpenError(true)
            }
        } catch (error) {
            setError("Something wrong while connecting to wallet")
            setOpenError(true)
        }
    }

    useEffect(() => {
        checkIfWalletConnected()
    }, [])

    //-connect wallet function
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return setOpenError(true), setError("install metamask")
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

            setCurrentAccount(accounts[0])
            // window.location.reload()
        } catch (error) {
            setError("Error while connecting to wallet")
            setOpenError(true)
        }
    }

    //--Upload to ipfs function
    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file })
            const url = `${subdomain}/ipfs/${added.path}`
            return url
        } catch (error) {
            setError("error uploading to ipfs")
            setOpenError(true)
        }
    }

    //-Create NFT function
    const createNFT = async (name, price, image, description, router) => {
        if (!name || !description || !price || !image)
            return setError("Data is missing"), setOpenError(true)

        const data = JSON.stringify({ name, description, image })

        try {
            const added = await client.add(data)
            const url = `${subdomain}/ipfs/${added.path}`
            await createSale(url, price)
            router.push("/searchPage")
        } catch (error) {
            setError("Error while creating NFT")
            setOpenError(true)
        }
    }

    //--Create sale FUNCTION
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice, "ether")
            const contract = await connectingWithSmartContract()
            const listingPrice = await contract.getListingPrice()
            const transaction = !isReselling
                ? await contract.createToken(url, price, { value: listingPrice.toString() })
                : await contract.resellToken(id, price, { value: listingPrice.toString() })
            await transaction.wait()
            console.log(transaction)
        } catch (error) {
            setError("error while creating sale")
            setOpenError(true)
        }
    }

    //-FetchNFTS function
    const fetchNFTs = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider)
            const data = await contract.fetchMarketItems()

            //console.log(data)

            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId)

                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI, {})

                    const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether")

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    }
                })
            )

            return items
        } catch (error) {
            setError("Error while fetching nfts")
            setOpenError(true)
        }
    }

    useEffect(() => {
        fetchNFTs()
    }, [])

    //-Fetch my NFT or Listed NFT
    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
            const contract = await connectingWithSmartContract()
            const data =
                type === "fetchItemsListed"
                    ? await contract.fetchItemsListed()
                    : await contract.fetchMyNFTs()
            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId)
                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI)
                    const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether")

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    }
                })
            )
            return items
        } catch (error) {
            setError("Error while fetching listed NFTs")
            setOpenError(true)
        }
    }

    useEffect(() => {
        fetchMyNFTsOrListedNFTs()
    }, [])

    //--Buys NFTs function
    const buyNFT = async (nft) => {
        try {
            const contract = await connectingWithSmartContract()
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether")

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            })

            await transaction.wait()
            router.push("/author")
        } catch (error) {
            setError("Error while buying NFT")
            setOpenError(true)
        }
    }

    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                createSale,
                currentAccount,
                titleData,
                setOpenError,
                openError,
                error,
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    )
}
