import React from "react"
import { TbLocation } from "react-icons/tb"
import { FiLogOut } from "react-icons/fi"
import mainimg from '../inputs/images/walmart-store.jpg';
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import data from "../inputs/history"


export default function HomePage() {
    const [page, setPage] = React.useState(0);
    const navigate = useNavigate();

    

    
    function handlePageNav(event){
        if(event.target.name === 'next'){
            if(page === 0){
                setPage(0);
            }
            if(page !== 0){
                setPage(prev => prev - 1);
            }
        }
        else{
            if(page === 2){
                setPage(2);
            }
            if(page !== 2){
                setPage(prev => prev + 1);
            }
        }
    }
    return (
        
        <div className="home-page">
            <div className="heading-section">
                <div>
                    <h1 className = "home-heading">AN APPLICATION TO NAVIGATE THROUGH WALMART STORE</h1>
                    <p className="home-caption">KNOW ABOUT US</p>   
                </div>
                <div className="home-nav">
                    <li onClick={() => navigate('/navigation')} className="navigate">Navigate
                        <TbLocation className="nav-icon" />
                    </li>
                    
                </div>
            </div>

            {page === 0 &&

                <div className="home-body-section">

                    <div>
                        <div className="page-navs">
                            <span>{data[0].heading}</span>
                            {/* <div>
                                <button name = "prev" onClick = {handlePageNav} className="page-nav">{'>'}</button>
                                <button name = "next" onClick = {handlePageNav} className="page-nav">{'<'}</button>
                            </div> */}
                        </div>
                        <p>
                            {data[0].content}
                        </p>
                    </div>
                    <div className="aside-section">
                        <img className="aside-image" src={data[0].image[0]} alt="" />
                        <img className="aside-image" src={data[0].image[1]} alt="" />
                    </div>
                </div>
            }

            {page === 1 &&

                <div className="home-body-section">

                    <div>
                        <div className="page-navs">
                            <span>{data[1].heading}</span>
                            <div>
                                <button name = "prev" onClick = {handlePageNav} className="page-nav">{'>'}</button>
                                <button name = "next" onClick = {handlePageNav} className="page-nav">{'<'}</button>
                            </div>
                        </div>
                        <p>
                            {data[1].content}
                        </p>
                    </div>
                    <div className="aside-section">
                        <img className="aside-image" src={data[1].image[0]} alt="" />
                        <iframe title="title" style={{marginTop:"25px"}} width="332px" height="200px" src="https://www.youtube.com/embed/TlkPpfAAoug" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            }

            {page === 2 &&

                <div className="home-body-section">

                    <div>
                        <div className="page-navs">
                            <span>{data[2].heading}</span>
                            <div>
                                <button name = "prev" onClick = {handlePageNav} className="page-nav">{'>'}</button>
                                <button name = "next" onClick = {handlePageNav} className="page-nav">{'<'}</button>
                            </div>
                        </div>
                        <p>
                            {data[2].content}
                        </p>
                    </div>
                    <div className="aside-section">
                        <img className="aside-image" src={data[2].image[0]} alt="" />
                        <img className="aside-image" src={data[2].image[1]} alt="" />
                    </div>
                </div>
            }
        </div>
    )
}