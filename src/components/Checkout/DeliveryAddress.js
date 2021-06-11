import React,{useState,useEffect} from 'react'
import '../Category/Category1.css'
import geocoder from 'geocoder'
import Swal from 'sweetalert2'
import Axios from '../../Axios'
import {connect} from 'react-redux'
import {SetDeliveryAddress} from '../redux/user/user-action'
import { withRouter } from 'react-router'
function DeliveryAddress({dispatch,history,currentAddress,currentUser}) {
    const [latitude,setLatitude]=useState('')
    const [longitude,setLongitude]=useState('')
    const [width,setWidth]=useState(0)
    const [err,setErr]=useState('')
    const [Address,setAddress]=useState('')
    const [Pin,setPin]=useState('')
    const updateWindowDimensions = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth)
    };
    
    useEffect(()=>{
        setWidth(window.innerWidth)
        window.addEventListener('resize', updateWindowDimensions);
    },[])
    navigator.geolocation.watchPosition(
        data=>{
            //console.log(data)
            setLatitude(data.coords.latitude)
            setLongitude(data.coords.longitude)
            //coordinates.push([data.coords.latitude,data.coords.longitude])
        },
        error=>console.log(error),{
            enableHighAccuracy: true
        }
    )
    const handleClick=()=>{
        if(Address.length<=5){
            setErr('Enter a valid Address!')
            return ;
        }
        if(Pin.length!==6){
            setErr('Enter a valid pincode!')
            return ;
        }
        let isnum = /^\d+$/.test(Pin);
        if(!isnum){
            setErr('Enter a valid pincode!')
            return ;
        }
        if(!currentUser){
            history.push("/user/login")
            return ;
        }
        setErr('')
        const data={
            email: currentUser.email,
            address: Address,
            pincode: Pin
        }
        Axios.post("/user/address",data).then(res=>{
            dispatch(SetDeliveryAddress({
                deliveryAddress: Address,
                deliveryPin: Pin 
            }))
        })
        Swal.fire({
            icon: 'success',
            title: 'Delivery Address successfully added!',
        })
    }
    
    return (
        <div className="mx-auto flex flex-col justify-items-start space-y-4 pl-12 sm:pl-20 pt-4">
            {
                err?<p className="text-red-500">{err}</p>:null
            }
            <textarea className="border-black border-2 p-1 h-20 rounded-md sm:w-4/5 contain" onChange={(e)=>setAddress(e.target.value)} />
            <div className={`flex ${width<=350?'flex-col space-y-4': 'flex-row space-x-4'}`}>
                <input className="border-black border-2 rounded-md p-1 px-1" placeholder="Pincode" onChange={(e)=>setPin(e.target.value)} />
                <div className="flex mx-auto">
                    <button className="bg-green-300 p-1 px-4 rounded-md hover:bg-black hover:text-white font-semibold transition duration-150 transform hover:scale-90" onClick={handleClick}>Add</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>({
    currentAddress: state.user.currentAddress,
    currentUser: state.user.currentUser
})

export default withRouter(connect(mapStateToProps,null)(DeliveryAddress))
