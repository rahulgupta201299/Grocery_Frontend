import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import Axios from '../../Axios'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

function Payment({currentUser,currentCart,currentPhone,history,value,currentAddress,currentTotalAmount,dod}) {
    const [paymentID,setPaymentID]=useState('')
    let str=dod.toString().split(" ")[1]+" "+dod.toString().split(" ")[2]+" "+dod.toString().split(" ")[3]
    function loadScript(src){
        return new Promise((resolve)=>{
            const script=document.createElement('script')
            script.src=src
            document.body.appendChild(script)
            script.onload = ()=>{
                resolve(true)
            }
            script.onerror=()=>{
                resolve(false)
            }
        })
    }
    async function displayRazorpay(){
        let items=[]
        for(let i of items){
            items.push({
                name: i.name,
                quantity: i.quantity,
                unit: i.unit
            })
        }
        const res=await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!res){
            alert('Razorpay SDK failed to load. Are you online?')
            return ;
        }
        
        const data={
            name: currentUser.name,
            email: currentUser.email,
            contact: currentPhone,
            items: items,
            dod: str,
            totalAmount: currentTotalAmount+49,
            PaymentOnline: true
        }
        Axios.post('/razorpay',{amount:data.totalAmount}).then(res=>{
            setPaymentID(res.data.id)
        })
        var options = {
            amount: (data.totalAmount*100).toString(),
            key: "rzp_test_fmJ4Q7BPc7enum",
            name: "GroceryHunt",
            description: "Test Transaction",
            order_id: paymentID,
            handler: function (response){
                Axios.post("/user/payment",data).then(res=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Payment Is Received And Your Order Has Been Placed!',
                        text: 'Thank You for shopping with us, your order will be delivered soon!'
                    }).then(res1=>{
                        history.push('/myAccount');
                    })
                })
            },
            prefill: {
                name: currentUser.name,
                email: currentUser.email,
                contact: currentPhone
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const PaymentObject=new window.Razorpay(options)
        PaymentObject.open()
    }
    const displayRazorpay1=()=>{
        if(!currentAddress||!currentPhone||!value){
            Swal.fire({
                icon: 'error',
                title: 'All the above details are mandatory',
                text: 'Please fill all the above details to proceed for payment'
            })
            return ;
        }
        if(!currentTotalAmount&&currentTotalAmount===0){
            history.push('/');
            return ;
        }
        Axios.post('/payment/pendingcheck',{email:currentUser.email}).then(res=>{
            if(res.data.pending){
                Swal.fire({
                    icon: 'error',
                    title: 'Your Order is pending!',
                    text: `Can't place an order before the delivery of the previous one!`
                })
            }else{
                displayRazorpay()
            }
        })
    }
    const handleCOD=()=>{
        let items=[]
        for(let i of items){
            items.push({
                name: i.name,
                quantity: i.quantity,
                unit: i.unit
            })
        }
        const data={
            name: currentUser.name,
            email: currentUser.email,
            contact: currentPhone,
            items: items,
            dod: str,
            totalAmount: currentTotalAmount+49,
            PaymentOnline: false
        }
        Swal.fire({
            icon: 'warning',
            title: 'Do you want to place your order on Cash on Delivery?',
            text: 'Delivery boy will collect cash from your door step and deliver your items!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cash On Delivery'
        }).then(res=>{
            if(res.value){
                Axios.post("/user/payment",data).then(res=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Order Has Been Placed!',
                        text: 'Thank You for shopping with us, your order will be delivered soon!'
                    }).then(res1=>{
                        history.push('/myAccount');
                    })
                }).catch(err=>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                        text: 'Failed, Please Try Again Later!'
                    })
                })
            }
        })
    }
    const handleCOD1=()=>{
        if(!currentAddress||!currentPhone||!value){
            Swal.fire({
                icon: 'error',
                title: 'All the above details are mandatory',
                text: 'Please fill all the above details to proceed for payment'
            })
            return ;
        }
        if(!currentTotalAmount&&currentTotalAmount===0){
            history.push('/');
            return ;
        }
        Axios.post('/payment/pendingcheck',{email:currentUser.email}).then(res=>{
            if(res.data.pending){
                Swal.fire({
                    icon: 'error',
                    title: 'Your Order is pending!',
                    text: `Can't place an order before the delivery of the previous one!`
                })
            }else{
                handleCOD()
            }
        })
    }
    return (
        <div style={{marginLeft:"20%"}} className="mx-auto flex-col space-y-2 mt-4 items-center">
            <button className="bg-green-400 mx-auto rounded-full p-2 w-4/5 sm:w-3/5 font-bold transition duration-150 transform hover:scale-110 hover:text-white hover:bg-black focus:outline-none" onClick={displayRazorpay1} >Payment</button>
            <p style={{marginLeft:"29%"}} className="font-semibold">Or</p>
            <button className="bg-green-400 mx-auto rounded-full p-2 w-4/5 sm:w-3/5 font-bold transition duration-150 transform hover:scale-110 hover:text-white hover:bg-black focus:outline-none" onClick={handleCOD1} >Cash On Delivery</button>
        </div>
    )
}
const mapStateToProps=(state)=>({
    currentUser: state.user.currentUser,
    currentPhone: state.user.currentPhone,
    currentAddress: state.user.currentAddress,
    currentTotalAmount: state.cart.currentTotalAmount,
    currentCart: state.cart.currentCart
})
export default withRouter(connect(mapStateToProps,null)(Payment))
