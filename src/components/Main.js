import React,{useState,useEffect} from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import Axios from '../Axios'
function Main() {
    const [category,setCategory]=useState([])
    const [width,setWidth]=useState(0)
    const updateWindowDimensions = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth)
    };
    
    useEffect(()=>{
        setWidth(window.innerWidth)
        window.addEventListener('resize', updateWindowDimensions);
    },[])
    useEffect(()=>{
        async function fetchPosts(){
            const res=await Axios.get("/category")
            setCategory(res.data)
            return res
        }
        fetchPosts()
    },[])
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3500,
        cssEase: "linear"
      };
    return (
        <div>
            <Slider {...settings}>
                <div>
                    <img loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUAfqkxGqCxKB263yzZMhm1ViKX_QUIWILg&usqp=CAU" className="w-full object-cover bg-cover bg-no-repeat h-64 sm:h-96" />
                </div>
                <div>
                    <img loading="lazy" src="https://image.shutterstock.com/image-vector/sale-tags-set-vector-badges-600w-1389638366.jpg" className="w-full object-cover bg-cover bg-no-repeat h-64 sm:h-96" />
                </div>
            </Slider>
            <div className="flex justify-flex-start flex-col space-x-1 sm:m-10 m-2 mt-8 bg-white shadow-lg">
                <h2 className="flex items-center pl-4 sm:pl-10 pt-5 text-black font-bold text-2xl sm:text-4xl">Shop By Category</h2>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2 lg:px-10 items-center m-10">
                    {
                        category.map((card,i)=>(
                            <Link key={i} to={`/category/${card.category}`} className={`flex space-x-auto items-center lg:px-10 justify-between px-4 py-2 rounded-lg border-solid border-2 border-black hover:bg-black hover:text-white transtion duration-150 transform hover:scale-110 ${width<=370?'text-sm':'text-lg'} sm:text-xl lg:text-2xl font-bold`}>
                                <div className="flex">
                                    <img loading="lazy" src={card.image} className={`lg:h-20 md:h-14 ${width<=370?'max-h-14':'h-20'} object-cover rounded-full`} />
                                </div>
                                <div className="flex flex-col space-y-1 px-6">
                                    <span>{card.category}</span>
                                    <span className="text-green-500 text-sm">{card.discount}% off</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Main
