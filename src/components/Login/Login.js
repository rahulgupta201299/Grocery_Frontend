import React,{useState,useEffect} from 'react'
import { GoogleLogin } from 'react-google-login';
import { Link ,withRouter} from 'react-router-dom';
import {setUser} from '../redux/user/user-action'
import {connect} from 'react-redux'
import Axios from '../../Axios'
import Swal from 'sweetalert2'
function Login({dispatch,currentUser,history}) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [err,setErr]=useState('')
    const [code,setCode]=useState('')
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
        if(currentUser){
            setEmail(currentUser.email)
        }
    },[currentUser])
    const Login=()=>{
        if(!email.length||email.indexOf('@')===-1){
            setErr('Enter a valid Email');
            return ;
        }
        if(password.length<8){
            setErr('Please enter the correct password!')
            return ;
        }
        setErr('')
        const data={
            email:email,
            password:password
        }
        Axios.post('/user/login',data).then(res=>{
            if(!res.data.account){
                Swal.fire({
                    icon: 'error',
                    title: res.data.message
                })
                history.push('/user/signup')
                return;
            }
            if(!res.data.password){
                setErr('Incorrect password. Try Again!')
                return ;
            }
            if(!res.data.verified){
                dispatch(setUser({
                    name:res.data.name,
                    email:res.data.email,
                    verified: res.data.verified,
                    code: res.data.rand.toString(),
                    login:false
                }))
                Swal.fire({
                    icon: 'warning',
                    title: 'please verify the email and login!'
                })
                return ;
            }
            dispatch(setUser({
                name:res.data.name,
                email:res.data.email,
                verified:res.data.verified,
                login: true
            }))
            Swal.fire({
                icon: 'success',
                title:'You are logged in'
            })
            history.push('/')
        }).catch(()=>{
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong'
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
            })
            history.push('/')
        }).catch(()=>{
            Swal.fire({
                icon: 'warning',
                title: 'Something went wrong...'
            })
        })
    }
    const handleResendCode=()=>{
        const data={
            email:currentUser.email
        }
        Axios.post("/user/resendcode",data).then(res=>{
            dispatch(setUser({
                name:res.data.name,
                email:res.data.email,
                login:false,
                verified: false,
                code: res.data.rand.toString()
            }))
            Swal.fire({
                icon: 'success',
                title: 'Verification code has been sent to your Email!'
            })
        }).catch(()=>{
            Swal.fire({
                icon: 'warning',
                title: 'Something went wrong...'
            })
        })
    }
    const handleCode=(e)=>{
        console.log(currentUser.code,code)
        if(currentUser.code===code){
            const data={
                email:currentUser.email
            }
            Axios.post('/user/verificationCode',data).then(res=>{
                console.log(res.data.name,res.data.email)
                dispatch(setUser({
                    name:res.data.name,
                    email:res.data.email,
                    verified:true,
                    login: false
                }))
                Swal.fire({
                    icon: 'success',
                    title: 'You are verified!',
                    text: 'Please Login!',
                })
                e.preventDefault()
            }).catch(()=>{
                Swal.fire({
                    icon: 'warning',
                    title: 'Something went wrong...'
                })
            })
            setErr('')
        }else{
            setErr('Verification code did not match. Please try again!')
        }
    }
    return (
        <div className={`antialiased font-sans bg-white bg-gradient-to-r from-orange-800 via-red-700 to-yellow-600`}>

            <div className={`bg-white mb-12 sm:w-full md:max-w-xl lg:max-w-2xl mx-auto ${width>=330?'p-8':''} md:p-12 rounded-lg shadow-2xl`}>
                <section className="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-5">
                    <h3 className="font-bold text-2xl">Login</h3>
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
                            <input className="w-full py-2 px-3 text-black leading-normal rounded" type="email" placeholder="E-mail Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="relative border rounded mb-4 shadow appearance-none label-floating">
                            <input className="w-full py-2 px-3 text-black leading-normal rounded" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            
                        </div>
                        {
                            currentUser&&!currentUser.verified?(
                                <div className="flex flex-col space-y-2 sm:space-x-8">
                                    <div className="flex flex-grow">
                                        <input className="w-full py-2 px-3 text-black leading-normal rounded" type="text" placeholder="code" value={code} onChange={(e)=>setCode(e.target.value)} />
                                    </div>
                                    <div className="flex sm:w-1/2 space-x-4">
                                        <button className="bg-green-500 w-full p-1 text-white hover:bg-green-300 rounded-md sm:rounded-full" onClick={handleCode}>Verify</button>
                                        <button className="bg-green-500 w-full p-1 text-white hover:bg-green-300 rounded-md sm:rounded-full" onClick={handleResendCode}>Resend_Code</button>
                                    </div>
                                </div>
                            ):null
                        }
                        <div className="flex flex-wrap py-4 items-center justify-evenly">
                            <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-12 text-center align-baseline">
                                <button className="bg-black hover:bg-white hover:text-black text-white w-full py-2 px-4 rounded" type="button" onClick={Login}>Login</button>
                            </div>  
                        </div> 
                        
                        <div className="flex flex-col space-y-4 mx-auto justify-items-center">
                            <div className="mx-auto text-white text-md">Or Continue With</div>
                        
                        <hr />
                        <div className="mx-auto">
                        {/* <GoogleLogin
                            clientId="177141942485-mbmruj6ns91r1e8eh02vnm05m3gonop8.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /> */}
                        </div>
                        </div>
                    </div>
                </section>

                    <div className="xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-5 my-5 pb-4">
                        <p className="text-black">
                            Don't have an account? <Link to="/user/signup" className="font-bold hover:underline">Register here</Link>.
                        </p>
                    </div>
                </div>
            </div>
    )
}
const mapStateToProps=state=>({
    currentUser:state.user.currentUser
})

export default withRouter(connect(mapStateToProps,null)(Login))