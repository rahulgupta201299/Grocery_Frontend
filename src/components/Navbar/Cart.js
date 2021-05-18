import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { setCartClick } from '../redux/click/click-action'
import {setCart,setCartItem} from '../redux/cart/cart-action'
import './Cart.css'
import swal from 'sweetalert'
import { withRouter } from 'react-router'
function Cart({currentClick,dispatch,currentCart,history}) {
    const FreeDelivery=800
    const DeliveryCharge=49
    const [width,setWidth]=useState(0)
    const [TotalPrice,setTotalPrice]=useState(0)
    const [DiscountedPrice,setDiscountedPrice]=useState(0)
    const [TotalSaving,setTotalSaving]=useState(0)
    const update=()=>{
        setWidth(window.innerWidth)
    }
    useEffect(()=>{
        setWidth(window.innerWidth)
        window.addEventListener('resize',update)
    },[])
    useEffect(()=>{
        let x=0,y=0,z=0
        if(currentCart){
            for(let i=0;i<currentCart.length;i++){
                x+=((parseInt(currentCart[i].price*(1-(currentCart[i].discount/100)))))*currentCart[i].quantity
                y+=((currentCart[i].price*currentCart[i].discount)/100)*currentCart[i].quantity
                z+=currentCart[i].price*currentCart[i].quantity
            }
            setDiscountedPrice(x)
            setTotalPrice(z)
            setTotalSaving(Math.round(y))
        }
    },[currentCart])
    const handleIncButton=(name)=>{
        let arr=[]
        let array=[]
        if(currentCart){
            for(let i=0;i<currentCart.length;i++){
                array.push(currentCart[i].name)
                if(currentCart[i].name===name){
                    arr.push({
                        name:currentCart[i].name,
                        image:currentCart[i].image,
                        price:currentCart[i].price,
                        unit:currentCart[i].unit,
                        discount:currentCart[i].discount,
                        quantity:currentCart[i].quantity+1
                    })
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
        dispatch(setCart(arr))
        dispatch(setCartItem(array))
    }
    const handleDecButton=(name)=>{
        let arr=[]
        let array=[]
        if(currentCart){
            for(let i=0;i<currentCart.length;i++){
                if(currentCart[i].name===name && currentCart[i].quantity>=1){
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
    const handleKnowMore=()=>{
        let x=FreeDelivery-DiscountedPrice
        swal({
            icon: FreeDelivery>DiscountedPrice?'warning':'success',
            title: 'Delivery Charges',
            text: FreeDelivery>DiscountedPrice?`Depends Upon the Location of Delivery. The best you can do is Shop for more ₹${x} amount to get free delivery!`: `Hurrah! No delivery charges as you shopped for more than or equal to ₹${FreeDelivery}`
        })
    }

    return (
        <div>
            {
                currentClick?(
                    <div style={{zIndex:"60"}} className="flex flex-col fixed scrolling z-50 mt-16 cart h-screen">
                        <div style={{zIndex:"70"}} className="cart fixed mr-0">
                            <div className="flex bg-black p-4 text-white">
                                <p className="my-auto text-lg">My Cart</p>
                                <div className="flex-grow"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 cursor-pointer transition duration-150 transform hover:scale-125" viewBox="0 0 20 20" fill="currentColor" onClick={()=>dispatch(setCartClick(false))}>
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        {
                            currentCart&&currentCart.length?<button style={{position: "fixed",bottom:"2px",right: "0",zIndex:"70"}} className="bg-red-400 cartButton w-1/2 rounded-xl p-3 mx-auto text-white transition duration-150 transform hover:scale-95 focus:outline-none hover:bg-red-300 font-bold">Proceed To Checkout</button>:
                            <button style={{position: "fixed",bottom:"2px",right: "0",zIndex:"70"}} className="bg-red-400 cartButton w-1/2 rounded-xl p-3 mx-auto text-white transition duration-150 transform hover:scale-95 focus:outline-none hover:bg-red-300 font-bold" onClick={()=>{history.push("/");dispatch(setCartClick(false))}}>Start Shopping</button>
                        }
                        {
                            !(currentCart&&currentCart.length)?(<div  style={{zIndex:"70",marginLeft:"10%"}} className="mt-24 fixed text-black font-bold text-md sm:text-lg"><p>No items Added Yet</p></div>):null
                        }
                        {
                            currentCart&&currentCart.length?(
                                <div style={{zIndex:"70"}} className="fixed cartButton justify-between bg-white p-2 mt-16 flex flex-col">
                                    <div className="flex sm:pt-2 justify-between ">
                                        <div className="flex items-center"><p className={`text-gray-600 ${width>=250?'text-lg':'text-sm'}`}>Sub Total</p></div>
                                        <div className="flex items-center"><p className={`text-gray-600 ${width>=250?'text-lg':'text-sm'}`}>₹{DiscountedPrice+((FreeDelivery>DiscountedPrice)?DeliveryCharge:0)}</p></div>
                                    </div>
                                    <div className="flex justify-between ">
                                        <div className="flex flex-col items-start">
                                        <div className="flex items-center"><p className="text-gray-600 text-sm">{DiscountedPrice<FreeDelivery?'Delivery Charges':'Free Delivery'}</p></div>
                                        <div className="flex items-center"><button className="text-xs text-red-600 focus:outline-none hover:text-blue-500" onClick={handleKnowMore}>To know more</button></div>
                                        </div>
                                        <div className="flex items-center"><p className="text-red-600 text-sm">{DiscountedPrice<FreeDelivery?`+ ₹${DeliveryCharge}`:'+ 0'}</p></div>
                                    </div>
                                    <hr className="mt-2" />
                                    <div className="flex justify-between ">
                                        <div className="flex items-center"><p className={`text-gray-600 ${width>=300?'text-lg':(width<=250?'text-sm':'text-md')}`}>Your Total Savings</p></div>
                                        <div className="flex items-center"><p className={`text-red-600 ${width>=300?'text-lg':(width<=250?'text-sm':'text-md')}`}>₹{TotalSaving} ({((TotalSaving/TotalPrice)*100).toPrecision(2)}%)</p></div>
                                    </div>
                                </div>
                            ):null
                        }
                        <div className={`mt-48 pt-1 w-full ${(currentCart&&currentCart.length)?'bg-white':''} absolute flex flex-col h-screen space-x-1 scrolling`}>
                                {
                                    currentCart&&currentCart.map((card,i)=>(
                                        <div key={i} className="flex p-1 space-x-1 sm:space-x-2">
                                            <div className="flex p-2 py-4"><img className="h-14 w-14 rounded-full" src={card.image} /></div>
                                            <div className="flex flex-grow flex-col">
                                                <div className="flex"><p className="bg-green-200 text-green-500 text-xs sm:text-sm">{card.discount}% off</p></div>
                                                <div className="flex"><p className="text-gray-500 sm:text-md text-sm font-semibold">{card.name}</p></div>
                                                <div className="flex items-center"><p className="text-gray-500 text-xs sm:text-sm font-semibold">{card.unit}</p></div>
                                                <div className="flex justify-between">
                                                    <div className="flex space-x-1 pt-1">
                                                        <button className="h-6 w-6 font-bold rounded-full focus:outline-none bg-white border border-red-400 text-red-400 hover:bg-red-400 hover:text-white" onClick={()=>handleIncButton(card.name)}>+</button>
                                                        <p className="text-black">{card.quantity}</p>
                                                        <button className="h-6 w-6 font-bold rounded-full focus:outline-none bg-white border border-red-400 text-red-400 hover:bg-red-400 hover:text-white" onClick={()=>handleDecButton(card.name)}>-</button>
                                                    </div>
                                                    <div className="flex items-center"><p className="text-gray-500 text-sm font-semibold">₹{parseInt(card.price*(1-card.discount/100))}</p></div>
                                                </div>
                                                <hr className="mt-2 border-1 border-gray-700"/>
                                            </div>
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

const mapStateToProps = state =>({
    currentCart: state.cart.currentCart,
    currentClick: state.click.currentClick
})

export default withRouter(connect(mapStateToProps,null)(Cart))
