import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {setCart,setCartItem} from '../redux/cart/cart-action'
function Card({discount,image,price,name,unit,dispatch,currentCart,currentCartItem}) {
    
    const handleIncButton=()=>{
        let arr=[]
        let array=[]
        let x=true
        if(currentCart){
            for(let i=0;i<currentCart.length;i++){
                array.push(currentCart[i].name)
                if(currentCart[i].name===name && currentCart[i].quantity>=1){
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
            array.push(name)
            arr.push({
                name:name,
                image:image,
                price:price,
                unit:unit,
                discount:discount,
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
    
    return (
        <div className="flex flex-col w-auto h-auto justify-items-start bg-white p-4 border-gray-400 shadow-lg border-2" style={{zIndex:'0'}}>
            <div style={{backgroundColor:'#7CFC00'}} className="mr-auto px-3 text-white">{discount}% off</div>
            <div className="items-center p-3"><img loading="lazy" className="mx-auto bg-cover object-cover cursor-pointer bg-white transition duration-150 transform hover:scale-110" src={image} height="100" width="100" /></div>
            <p className="p-2 text-gray-600 cursor-pointer">{name}</p>
            <p className="px-2 py-1 text-gray-400">{unit}</p>
            <div className="flex justify-between p-2">
                <div className="flex flex-col justify-between">
                    <p>₹{parseInt(price*(1-(discount/100)))}</p><del>₹{price}</del>
                </div>
                {
                    currentCart&&currentCartItem&&currentCartItem.includes(name)?(currentCart.map((card,i)=>(
                        (card.name===name)?(
                            <div key={i} className="flex space-x-1">
                                <button className={`text-red-400 border focus:outline-none border-red-400 rounded-full px-2 mt-2 h-8 hover:bg-red-400 hover:text-white`} onClick={handleIncButton}>+</button>
                                <button className={`text-red-400 border cursor-not-allowed focus:outline-none border-red-400 rounded-full px-4 mt-2 h-8`}>{card.quantity}</button>
                                <button className={`text-red-400 border focus:outline-none border-red-400 rounded-full px-3 mt-2 h-8 hover:bg-red-400 hover:text-white`} onClick={handleDecButton}>-</button>
                            </div>
                        ):null
                    ))):(
                        <button className={`text-red-400 border focus:outline-none border-red-400 rounded-full px-2 mt-2 h-8 hover:bg-red-400 hover:text-white`} onClick={handleIncButton}>
                            Add To Cart
                        </button>
                    )
                }
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>({
    currentCart: state.cart.currentCart,
    currentCartItem: state.cart.currentCartItem
})
export default connect(mapStateToProps, null)(Card)
