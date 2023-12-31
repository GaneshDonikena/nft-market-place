import React from "react"
import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md"
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
    TiArrowSortedDown,
    TiArrowSortedUp,
} from "react-icons/ti"

//Internal import
import Style from "./Form.module.css"
import { Button } from "../../components/componentsindex"

const Form = () => {
    return (
        <div className={Style.Form}>
            <div className={Style.Form_box}>
                <form action="#">
                    <div className={Style.Form_box_input}>
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            placeholder="Ganesh bhai"
                            className={Style.Form_box_input_userName}
                        />
                    </div>

                    <div className={Style.Form_box_input}>
                        <label htmlFor="email">Email</label>
                        <div className={Style.Form_box_input_box}>
                            <div className={Style.Form_box_input_box_icon}>
                                <HiOutlineMail />
                            </div>
                            <input type="text" placeholder="Email*" />
                        </div>
                    </div>

                    <div className={Style.Form_box_input}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="6"
                            placeholder="something about yourself in few words"
                        />
                    </div>

                    <div className={Style.Form_box_input}>
                        <label htmlFor="website">Website</label>
                        <div className={Style.Form_box_input_box}>
                            <div className={Style.Form_box_input_box_icon}>
                                <MdOutlineHttp />
                            </div>

                            <input type="text" placeholder="website" />
                        </div>
                    </div>

                    <div className={Style.Form_box_input_social}>
                        <div className={Style.Form_box_input}>
                            <label htmlFor="facebook">Facebook</label>
                            <div className={Style.Form_box_input_box}>
                                <div className={Style.Form_box_input_box_icon}>
                                    <TiSocialFacebook />
                                </div>
                                <input type="text" placeholder="http://ganeshbhai" />
                            </div>
                        </div>
                        <div className={Style.Form_box_input}>
                            <label htmlFor="Twitter">Twitter</label>
                            <div className={Style.Form_box_input_box}>
                                <div className={Style.Form_box_input_box_icon}>
                                    <TiSocialTwitter />
                                </div>
                                <input type="text" placeholder="http://ganeshbhai" />
                            </div>
                        </div>
                        <div className={Style.Form_box_input}>
                            <label htmlFor="Instagram">Instagram</label>
                            <div className={Style.Form_box_input_box}>
                                <div className={Style.Form_box_input_box_icon}>
                                    <TiSocialInstagram />
                                </div>
                                <input type="text" placeholder="http://ganeshbhai" />
                            </div>
                        </div>
                    </div>

                    <div className={Style.Form_box_input}>
                        <label htmlFor="wallet">Wallet address</label>
                        <div className={Style.Form_box_input_box}>
                            <div className={Style.Form_box_input_box_icon}>
                                <MdOutlineHttp />
                            </div>
                            <input
                                type="text"
                                placeholder="0xEA674fdDe714fd979de3EdF0F56AA9716B898e"
                            />
                            <div className={Style.Form_box_input_box_icon}>
                                <MdOutlineContentCopy />
                            </div>
                        </div>
                    </div>

                    <div className={Style.Form_box_btn}>
                        <Button
                            btnName="upload profile"
                            handleClick={() => {}}
                            classStyle={Style.button}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form
