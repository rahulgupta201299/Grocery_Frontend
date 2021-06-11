import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import swal from 'sweetalert'
import {auth} from './Firebase'
import firebase from './Firebase'
import {connect} from 'react-redux'
import {SetPhone} from '../redux/user/user-action'
import Axios from '../../Axios'
import { withRouter } from 'react-router'
//import OtpInput from 'react-otp-input'
function PhoneLogin({dispatch,history,currentUser}) {
    const [width,setWidth]=useState(0)
    const [click,setClick]=useState(false)
    const [phone,setPhone]=useState('')
    const [err,setErr]=useState('')
    const updateWindowDimensions = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth)
    };
    useEffect(()=>{
        setWidth(window.innerWidth)
        window.addEventListener('resize', updateWindowDimensions);
    },[])
    const setUpRecaptcha=()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              handleSMS()
            },
            'expired-callback':(err)=>{
                console.log(err)
            },
            defaultCountry: "IN",
          });
       }
    const handleSMS=(e)=>{
        if(click){
            return;
        }
        if(phone.length!==10){
            setErr('Please Enter a valid mobile number')
            return ;
        }
        if(!currentUser){
            history.push("/user/login")
            return ;
        }
        setErr('')
        setClick(true)
        e.preventDefault()
        setUpRecaptcha()
        //recaptchaVerifier.clear()
        //let appVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container')
        var phoneNumber = "+91"+phone
        var appVerifier = window.recaptchaVerifier;
        auth.signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              Swal.fire({
                  title: 'Verify OTP',
                  text: 'Enter the otp here',
                  input: 'text', 
                  confirmButtonText: `Verify`,
              }).then(res=>{
                  console.log(res.value)
                  if(res.value.length===6){
                    confirmationResult.confirm(res.value).then(function(result){
                        // User signed in successfully.
                        //console.log(result.user)
                        console.log(result.user.phoneNumber)
                        const data={
                            email:currentUser.email,
                            phone:result.user.phoneNumber
                        }
                        Axios.post("/user/phone",data).then(res=>{
                            dispatch(SetPhone(result.user.phoneNumber))
                        })
                        swal({
                            title: "OTP Verified!",
                            text: "You mobile no. is verified! Proceed further and fill all remaining details!",
                            icon:"success",
                        })
                    }).catch(function (error) {
                    // User couldn't sign in (bad verification code?)
                    // ...
                        swal({
                            title:"Not Verified",
                            text:"Incorrect or Bad Verification Code",
                            icon: "warning"
                        }).then(res1=>{
                            window.location.reload()
                        })
                    });
                  }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Incorrect OTP',
                    })
                  }
              })
            
                
        }).catch(function (error) {
        // Error; SMS not sent
        // ...
        swal({
            title:"Some error Occured. Try Again Later!",
            text:"SMS not sent. Retry!",
            icon: "warning",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Retry",   
        }).then(res1=>{
            window.location.reload()
        })
        });
    }
    
    return (
        <div className="mx-auto flex flex-col justify-items-start space-y-4 pl-12 sm:pl-20 pt-4">
            <p className="text-red-500">{err}</p>
            <input className={`focus:outline-none border ${width<=350?'w-full':'w-4/5'} md:w-1/2 border-black rounded-lg p-1 px-2 focus-within:ring-blue-500`} text="phone" placeholder="mobile no." onChange={(e)=>setPhone(e.target.value)} />
            <button className={`bg-blue-500 rounded-lg ${width<=450?'w-1/2':'w-1/4'} text-white font-semibold focus:outline-none ${click?'cursor-not-allowed disabled':'hover:bg-blue-300 transition duration-150 transform hover:scale-110'} p-2 px-2`} onClick={handleSMS}>
                {
                    click?(
                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ): 'Send OTP'
                }
            </button>
           <div id="recaptcha-container"></div>
        </div>
    )
}

const mapStateToProps =(state)=>({
    currentPhone: state.user.currentPhone,
    currentUser: state.user.currentUser
})

export default withRouter(connect(mapStateToProps)(PhoneLogin))

/*
Swal.fire({
                title: 'Enter the Verification Code',
                input: 'text',
                showCancelButton: true
            }).then(result=>{
                if(result.value.length===6){
                    e.confirm.code.then(res=>{
                        console.log(res.user)
                    }).catch(err=>{
                        Swal.fire({
                            icon: 'error',
                            text: err
                        })
                    })
                }else{
                    Swal.fire({
                        icon: 'error'
                    })
                }
            })
*/

/*
click?(
                <OtpInput
                     value={otp}
                     onChange={(e)=>setOTP(e)}
                     numInputs={6}
                     separator={<span>-</span>}
                     isInputNum={true}
                     isInputNum={true}
                     shouldAutoFocus={true}
                     className="w-10"
                 />
               ):(
                <input className={`focus:outline-none border ${width<=350?'w-full':'w-4/5'} md:w-1/2 border-black rounded-lg p-1 px-2 focus-within:ring-blue-500`} text="phone" placeholder="mobile no." onChange={(e)=>setPhone(e.target.value)} />
               )
*/