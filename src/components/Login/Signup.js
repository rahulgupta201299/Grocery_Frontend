import React,{useState,useEffect} from 'react'
import Axios from '../../Axios'
import Swal from 'sweetalert2'
import swal from '@sweetalert/with-react';
import { GoogleLogin } from 'react-google-login';
import PhoneLogin from './phoneLogin';
import { Link, withRouter } from 'react-router-dom';
import {setUser} from '../redux/user/user-action'
import {connect} from 'react-redux'
function Signup({currentUser,dispatch,history}) {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [err,setErr]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [click,setClick]=useState('')
    const Register=()=>{
        if(!email.length||email.indexOf('@')===-1){
            setErr('Enter a valid Email');
            return ;
        }
        if(password.length<8){
            if(!password){
                setErr('Please enter the password!')
                return ;
            }
            setErr('Password  should be at least 8 characters')
            return;
        }
        if(password!==confirmPassword){
            setErr('Password and ConfirmPassword did not match. Retry!')
            return ;
        }
        setErr('')
        const data={
            name: name,
            email:email,
            password:password
        }
        Axios.post('/user/register',data).then(res=>{
            if(!res.data.account){
                dispatch(setUser({
                    name:res.data.name,
                    email:res.data.email,
                    verified: res.data.verified,
                    code: res.data.rand.toString(),
                    login:false
                }))
                Swal.fire({
                    icon: 'success',
                    title: res.data.message
                })
                history.push('/user/login')
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: res.data.message
                })
                history.push('/user/login')
            }
        }).catch(()=>{
            Swal.fire({
                icon: 'warning',
                title: 'Something went wrong...'
            })
        })
    }
    const responseGoogle=(res)=>{
        const data={
            tokenID:res.tokenId
        }
        Axios.post("/api/googlelogin",data).then(res=>{
            dispatch(setUser({
                name:res.data.name,
                email: res.data.email,
                verified: true,
                login: true
            }))
            Swal.fire({
                icon: 'success',
                title: 'You are logged in!',
                button: 'Explore'
            })
            history.push('/')
        }).catch(()=>{
            Swal.fire({
                icon: 'warning',
                title: 'Something went wrong...'
            })
        })
    }
    return (
        <div className="antialiased font-sans bg-white bg-gradient-to-r from-orange-800 via-red-700 to-yellow-600">

            <div className="bg-white mb-12 sm:w-full md:max-w-xl lg:max-w-2xl mx-auto p-8 md:p-12 rounded-lg shadow-2xl">
                <section className="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-5">
                    <h3 className="font-bold text-2xl">Register</h3>
                    {/*<p className="text-gray-600 pt-2">Insert text here.</p>*/}
                </section>

                {
                    err?(
                        <section className="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-5">
                            <ul>
                            <li className="text-sm text-red-500">{err}</li>
                            </ul>
                        </section>
                    ):null
                }

                <section className="bg-gray-800 rounded-lg py-5 mx-auto">
                    <div className="text-sm m-8 xs:p-4 sm:p-4 md:p-8 lg:p-8">

                        <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                            <input className="w-full py-2 px-3 text-black leading-normal rounded" type="text" placeholder="Name" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                            <input className="w-full py-2 px-3 text-black leading-normal rounded" type="email" placeholder="E-mail Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                            <input className="w-full py-2 px-3 text-black leading-normal rounded" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            
                        </div>
                        <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                            <input className="w-full py-2 px-3 text-black leading-normal rounded" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                            
                        </div>
                        
                        <div className="flex flex-wrap py-2 items-center justify-evenly">
                            <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-12 text-center align-baseline">
                                <button className="bg-black hover:bg-white hover:text-black text-white w-full py-2 px-4 rounded" type="button" onClick={Register}>Register</button>
                            </div>  
                        </div> 
                        
                        <div className="flex flex-col space-y-4 mx-auto justify-items-center">
                            <div className="mx-auto text-white text-md">Or Continue With</div>
                        
                        <hr />
                        <div className="mx-auto">
                        <GoogleLogin
                            clientId="177141942485-mbmruj6ns91r1e8eh02vnm05m3gonop8.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            
                            cookiePolicy={'single_host_origin'}
                        />
                        </div>
                        </div>
                    </div>
                </section>

                    <div className="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-5 my-5">
                        <p className="text-black">
                            Already have an account? <Link to="/user/login" className="font-bold hover:underline">Login here</Link>.
                        </p>
                    </div>
                </div>
            </div>
    )
}
const mapStateToProps=state=>({
    currentUser: state.user.currentUser
})

export default withRouter(connect(mapStateToProps,null)(Signup))

/*
<div className="">
            <h1>Login With Google</h1>
            <GoogleLogin
                clientId="177141942485-mbmruj6ns91r1e8eh02vnm05m3gonop8.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <br/>
            <button className="bg-green-500 px-5 py-2 text-white hover:bg-black " onClick={handleSMS}>Sms</button>
        </div>
        */