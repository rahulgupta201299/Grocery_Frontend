import React,{useState,useEffect} from 'react'
import PhoneLogin from './PhoneLogin'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import { SetPhone,SetDeliveryAddress } from '../redux/user/user-action'
import DeliveryAddress from './DeliveryAddress'
import Axios from '../../Axios'
function Checkout({currentPhone,dispatch,currentAddress,currentUser}) {
    const [phone,setPhone]=useState(false)
    const [address,setAddress]=useState(false)
    useEffect(()=>{
        if(currentUser){
            Axios.get(`/user/address?name=${currentUser.email}`).then(res=>{
                let arr=res.data
                //console.log(arr)
                if(arr.message){
                    if(arr.Address){
                        //console.log(arr)
                        dispatch(SetDeliveryAddress({
                            deliveryAddress:arr.Address,
                            deliveryPin: arr.Pincode
                        }))
                    }
                }
            })
            Axios.get(`/user/phone?name=${currentUser.email}`).then(res=>{
                let arr=res.data
                console.log(arr)
                if(arr.message){
                    if(arr.phone){
                        dispatch(SetPhone(arr.phone))
                    }
                }
            })
        }
    },[currentUser])
    const handleEditPhone=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to add a new number?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change!',
            cancelButtonText: 'No, cancel!',
        }).then(res=>{
            if(res.value){
                dispatch(SetPhone(null))
            }
        })
    }
    const handleEditAddress=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to fill your address again!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change!',
            cancelButtonText: 'No, cancel!',
        }).then(res=>{
            if(res.value){
                dispatch(SetDeliveryAddress(null))
            }
        })
    }
    return (
        <div className="bg-white mx-auto w-full sm:w-4/5 lg:w-1/2 mt-10 rounded-lg p-2">
            {
                !currentPhone?(
                    <div className="flex cursor-pointer" onClick={()=>setPhone(!phone)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400 text-lg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <h1 className="font-bold pl-3 sm:pl-10 my-auto">Verify your phone Number</h1>
                    </div>
                ):(
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 my-auto flex-shrink-0 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <div className="flex flex-col">
                            <h2 className="pl-3 sm:pl-10 my-auto">{currentPhone}</h2>
                            <div className="flex sm:space-x-4 space-x-1">
                                <h1 className="font-bold pl-3 sm:pl-10 my-auto">Phone Number Verified</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleEditPhone} className="h-6 w-6 cursor-pointer text-blue-600 transition duration-150 transform hover:scale-125" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                !currentPhone&&phone?<PhoneLogin />:null
            }
            <hr className="mt-5 pb-5" />
                {
                    currentAddress?(
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 my-auto flex-shrink-0 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            <div className="flex flex-col">
                                <div className="flex sm:space-x-4 space-x-1">
                                    <h1 className="font-bold pl-3 sm:pl-10 my-auto">Delivery Address</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleEditAddress} className="h-6 w-6 cursor-pointer text-blue-600 transition duration-150 transform hover:scale-125" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <p className="pl-3 sm:pl-10 my-auto break-all sm:break-normal">{currentAddress.deliveryAddress}</p>
                                <p className="pl-3 sm:pl-10 my-auto">{currentAddress.deliveryPin}</p>
                            </div>
                        </div>
                    ):(
                        <div className="flex cursor-pointer" onClick={()=>setAddress(!address)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400 text-lg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            <h1 className="font-bold pl-3 sm:pl-10 my-auto">Delivery Address</h1>
                        </div>
                    )
                }
                
            {
                !currentAddress&&address? <DeliveryAddress />:null
            }
            <hr className="mt-5 pb-5" />
        </div>
    )
}

const mapStateToProps=(state)=>({
    currentPhone: state.user.currentPhone,
    currentAddress: state.user.currentAddress,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps,null)(Checkout)
