import React from 'react'
import Swal from 'sweetalert2'
import firebase from './Firebase'
function phoneLogin() {
    const setUpRecaptcha=()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
            'callback': function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              handleSMS();
            },
            'expired-callback':()=>{
                console.log("Response expired. Please solve reCAPTCHA again.")
            }
          });
       }
    const handleSMS=()=>{
        setUpRecaptcha()
        let recaptcha=window.recaptchaVerifier
        let number= '+919163277940'
        firebase.auth().signInWithPhoneNumber(number,recaptcha).then(e=>{
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
        })
    }
    return (
        <div>
            <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                <input className="w-full py-2 px-3 text-black leading-normal rounded" type="phone" placeholder="Enter Mobile No." id="name"  />
            </div>
            <div className="flex flex-wrap py-2 items-center justify-evenly">
                <div id="recaptcha" className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-12 text-center align-baseline">
                    <button id="recaptcha" className="bg-blue-500 hover:bg-white hover:text-black items-center text-white w-full py-2 px-4 rounded" type="button" onClick={handleSMS}>
                        Get OTP  
                    </button>
                </div>  
            </div>
            
        </div>
    )
}

export default phoneLogin
