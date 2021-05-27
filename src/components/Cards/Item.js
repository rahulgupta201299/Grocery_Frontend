import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/swiper-bundle.css";
import SwiperCore ,{Navigation,Pagination,Thumbs} from 'swiper';
import Axios from '../../Axios'
SwiperCore.use([Navigation,Pagination,Thumbs])
function Item() {
    const {id}=useParams()
    const [thumbsSwiper,setThumbsSwiper]=useState(null)
    const [item,setItem]=useState('')
    useEffect(()=>{
        Axios.post('/product/EachItem',{id:id}).then(res=>{
            console.log(res.data);
            setItem(res.data)
        })
    },[id])

    const slides=[]
    for(let i=0;i<5;i++){
        slides.push(
            <SwiperSlide key={`slide-${i}`} tag="li" style={{listStyle: 'none'}}><img className="mx-auto" src={`https://i.pinimg.com/564x/3f/f6/93/3ff693d7467146982c3d95824d4743b9.jpg`} /></SwiperSlide>
        )
    }
    const thumbs=[]
    for(let i=0;i<5;i++){
        thumbs.push(
            <SwiperSlide key={`thumb-${i}`} tag="li" style={{listStyle: 'none'}}>
                <img className="mx-auto" src={`https://i.pinimg.com/564x/b7/f4/a9/b7f4a92eac7f9c2b30ca94c408f73157.jpg`} width="150px" height="150px" />
            </SwiperSlide>
        )
    }
    return (
        <div className="bg-white sm:p-20">
            <Swiper style={{paddingInlineStart: '0'}} thumbs={{swiper: thumbsSwiper}} id="main" className="sm:w-4/5 w-full mx-auto items-center" tag="section" wrapperTag="ul" navigation pagination spaceBetween={0} slidesPerView={1}>
                {slides}
            </Swiper>
            <Swiper className="w-full sm:w-1/2" id="thumbs" spaceBetween={0} slidesPerView={3} onSwiper={setThumbsSwiper}>
                {thumbs}
            </Swiper>
            <div className="flex sm:flex-row flex-col">
                <div className="">
                
                </div>
                <div className="flex">
                    <h1>Price</h1>
                </div>
            </div>
        </div>
    )
}

export default Item

/*
<SwiperSlide><img src="https://i.pinimg.com/564x/3f/f6/93/3ff693d7467146982c3d95824d4743b9.jpg" /></SwiperSlide>
                    <SwiperSlide><img src="https://i.pinimg.com/564x/b7/f4/a9/b7f4a92eac7f9c2b30ca94c408f73157.jpg" /></SwiperSlide>
                    <SwiperSlide><img src="https://i.pinimg.com/564x/60/37/43/6037438a8f699e55db62750b688f3217.jpg" /></SwiperSlide>
*/