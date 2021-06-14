import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/swiper-bundle.css";
import SwiperCore ,{Navigation,Pagination,Thumbs} from 'swiper';
import Axios from '../../Axios'
import {setCart,setCartItem} from '../redux/cart/cart-action'
import {connect} from 'react-redux'
SwiperCore.use([Navigation,Pagination,Thumbs])
function Item({currentCart,dispatch,currentCartItem}) {
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
    if(item){
        let j=0
        slides.push(
            <SwiperSlide key={`slide-${j}`} tag="li" style={{listStyle: 'none'}}><img className="mx-auto sm:mt-10 md:mt-40" loading="lazy" src={item[0].image}  width="400px" height="400px"/></SwiperSlide>
        )
        j=1
        for(let el of item[0].MoreImages){
            slides.push(
                <SwiperSlide key={`slide-${j}`} tag="li" style={{listStyle: 'none'}}><img className="mx-auto" loading="lazy" src={el}  /></SwiperSlide>
            )
            j++
        }
    }
    const thumbs=[]
    if(item){
        let j=0
        slides.push(
            <SwiperSlide key={`slide-${j}`} tag="li" style={{listStyle: 'none'}}><img className="mx-auto mt-20" src={item[0].image} width="400px" height="400px" /></SwiperSlide>
        )
        j=1
        for(let el of item[0].MoreImages){
            thumbs.push(
                <SwiperSlide key={`thumb-${j}`} tag="li" style={{listStyle: 'none'}}>
                    <img className="mx-auto" src={el} width="150px" height="150px" />
                </SwiperSlide>
            )
            j++
        }
    }
    const handleIncButton=()=>{
        let arr=[]
        let array=[]
        let x=true
        if(currentCart){
            for(let i=0;i<currentCart.length;i++){
                array.push(currentCart[i].name)
                if(currentCart[i].name===item[0].name && currentCart[i].quantity>=1){
                    arr.push({
                        name:currentCart[i].name,
                        image:currentCart[i].image,
                        price:currentCart[i].price,
                        unit:currentCart[i].unit,
                        discount:currentCart[i].discount,
                        quantity:currentCart[i].quantity+1
                    })
                    x=false
                }
                else if(currentCart[i].quantity>=1){
                    arr.push({
                        name:currentCart[i].name,
                        image:currentCart[i].image,
                        price:currentCart[i].price,
                        unit:currentCart[i].unit,
                        discount:currentCart[i].discount,
                        quantity:currentCart[i].quantity
                    })
                }
            }
        }
        if(x){
            array.push(item[0].name)
            arr.push({
                name:item[0].name,
                image:item[0].image,
                price:item[0].price,
                unit:item[0].unit,
                discount:item[0].discount,
                quantity:1
            })
        }
        dispatch(setCart(arr))
        dispatch(setCartItem(array))
    }
    const handleDecButton=()=>{
        let arr=[]
        let array=[]
        if(currentCart){
            for(let i=0;i<currentCart.length;i++){
                if(currentCart[i].name===item[0].name && currentCart[i].quantity>=1){
                    if(currentCart[i].quantity===1){
                        ;
                    }
                    else{
                        array.push(currentCart[i].name)
                        arr.push({
                            name:currentCart[i].name,
                            image:currentCart[i].image,
                            price:currentCart[i].price,
                            unit:currentCart[i].unit,
                            discount:currentCart[i].discount,
                            quantity:currentCart[i].quantity-1
                        })
                    }
                }
                else if(currentCart[i].quantity>=1){
                    array.push(currentCart[i].name)
                    arr.push({
                        name:currentCart[i].name,
                        image:currentCart[i].image,
                        price:currentCart[i].price,
                        unit:currentCart[i].unit,
                        discount:currentCart[i].discount,
                        quantity:currentCart[i].quantity
                    })
                }
            }
        }
        dispatch(setCart(arr))
        dispatch(setCartItem(array))
    }
    return (
        <div className="bg-white sm:p-20">
            <Swiper style={{paddingInlineStart: '0'}} thumbs={{swiper: thumbsSwiper}} id="main" className="sm:w-4/5 w-full mx-auto items-center" tag="section" wrapperTag="ul" navigation pagination spaceBetween={0} slidesPerView={1}>
                {slides}
            </Swiper>
            <Swiper className="w-full sm:w-1/2" id="thumbs" spaceBetween={0} slidesPerView={3} onSwiper={setThumbsSwiper}>
                {thumbs}
            </Swiper>
            {
                item?(
                    <div className="flex md:flex-row-reverse flex-col md:mt-0 mt-10">
                        <div className="flex flex-col space-y-2 flex-1 items-center">
                            <p className="font-semibold mx-auto text-lg sm:text-md text-black bg-green-400 p-1">{item[0].discount}% discount</p>
                            <h1 className="font-bold xl:text-4xl md:text-xl lg:text-2xl sm:text-lg text-2xl">{item[0].name}</h1>
                            <p className="text-gray-400 text-lg font-semibold">Product MRP: <del>₹ {item[0].price}</del></p>
                            <p className="text-gray-700 font-semibold text-lg">Selling Price: ₹ {parseInt(item[0].price*(1-(item[0].discount/100)))}</p>
                            <p className="text-gray-500 text-lg font-semibold">Available in: {item[0].unit}</p>
                            {
                                currentCart&&currentCartItem&&currentCartItem.includes(item[0].name)?(currentCart.map((card,i)=>(
                                    (card.name===item[0].name)?(
                                        <div key={i} className="flex space-x-1">
                                            <button className={`text-white border bg-red-400 focus:outline-none border-red-400 rounded-full px-4 mt-2 h-10 text-2xl hover:bg-blue-500 font-bold`} onClick={handleIncButton}>+</button>
                                            <button className={`text-white font-bold text-2xl bg-red-500 border cursor-not-allowed focus:outline-none border-red-400 rounded-full px-8 mt-2 h-10`}>{card.quantity}</button>
                                            <button className={`text-white border bg-red-400 focus:outline-none border-red-400 rounded-full px-4 mt-2 h-10 text-2xl hover:bg-blue-500 font-bold`} onClick={handleDecButton}>-</button>
                                        </div>
                                    ):null
                                ))):(
                                    <button className={`text-white font-bold border focus:outline-none border-black bg-red-500 rounded-xl px-10 mt-2 h-12 hover:bg-blue-500`} onClick={handleIncButton}>
                                        Add To Cart
                                    </button>
                                )
                            }
                        </div>
                        <div className="flex flex-col flex-1 mx-auto p-2">
                            {
                                item.map((card,i)=>(
                                    <div key={i} className="flex flex-col space-y-2">
                                        {
                                            card.Information.map((cards,j)=>(
                                                <div key={j} classNamae="flex flex-row justify-between">
                                                    {
                                                        j%2==0?(
                                                            <div className="flex">
                                                                <h2 className="text-black text-md font-semibold">{cards}:</h2>
                                                            </div>
                                                        ):null
                                                    }
                                                    {
                                                        j&1?(
                                                            <div className="flex">
                                                                <p classNAme="text-gray-400">{cards}</p>
                                                            </div>
                                                        ):null
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ):null
            }
        </div>
    )
}

const mapStateToProps=(state)=>({
    currentCart: state.cart.currentCart,
    currentCartItem: state.cart.currentCartItem
})

export default connect(mapStateToProps,null)(Item)

/*
<SwiperSlide><img src="https://i.pinimg.com/564x/3f/f6/93/3ff693d7467146982c3d95824d4743b9.jpg" /></SwiperSlide>
                    <SwiperSlide><img src="https://i.pinimg.com/564x/b7/f4/a9/b7f4a92eac7f9c2b30ca94c408f73157.jpg" /></SwiperSlide>
                    <SwiperSlide><img src="https://i.pinimg.com/564x/60/37/43/6037438a8f699e55db62750b688f3217.jpg" /></SwiperSlide>
*/
/*
Description
Nutrient Value & Benefits
Storage Tips
Shelf Life
Storage Temperature (degC)
*/