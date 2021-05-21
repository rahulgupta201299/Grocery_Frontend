import React,{useState,useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {MenuIcon, SearchIcon} from '@heroicons/react/solid'
import Swal from 'sweetalert2'
import swal from 'sweetalert';
import {connect} from 'react-redux'
import {setUser} from '../redux/user/user-action'
import Cart from './Cart'
import OtpInput from 'react-otp-input'
import {setCartClick} from '../redux/click/click-action'
function Navbar({history,currentCart,dispatch,currentClick,currentUser}) {
    const [small,setSmall]=useState(false)
    const [click,setClick]=useState(true)
    const [otp,setOTP]=useState('')
    const [phone,setPhone]=useState('')
    const updateWindowDimensions = () => {
        const newWidth = window.innerWidth;
        if(newWidth<=640) setSmall(true);
        else{
            setSmall(false);
            setClick(true);
        }
    };
    const nav=[{
        name: 'Profile',
        link: 'abcd',
    },{
        name: 'Profile',
        link: 'abcd',
    }]
    useEffect(()=>{
        if(window.innerWidth<=640) setSmall(true);
        else{
            setSmall(false);
            setClick(true);
        }
        window.addEventListener('resize', updateWindowDimensions);
    },[])
    const Logout=()=>{
        setClick(true)
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sign Out'
          }).then((result) => {
            if (result.value) {
              dispatch(setUser(null))
              Swal.fire({
                icon: 'success',
                title: 'Logged Out',
                text:'You are successfully logged out',
              })
            }
          })
    }
    return (
        <div className="pb-16 top-0">
        <div className="bg-gray-900 h-16 flex z-50 justify-between fixed items-center w-screen">
            <div className="flex text-gray-50 m-4 cursor-pointer" onClick={()=>{history.push('/')}}>logo</div>
            <div className="flex flex-grow">
                <SearchIcon className="h-6 flex bg-white absolute m-2" />
                <input className="flex-grow rounded-full h-10 focus:outline-none pl-10 p-2 w-4/5" type="search" placeholder="Search" />
            </div>
            {
                small?(
                <div className="flex space-x-0 mr-4">
                    {
                        click?(
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white bg-gray-900 m-2 cursor-pointer" viewBox="0 0 20 20" fill="currentColor" onClick={()=>setClick(false)}>
                                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                            </svg>
                            ):(
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white bg-gray-900 m-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={()=>setClick(true)}>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white my-auto cursor-pointer transition duration-150 transform hover:scale-125" viewBox="0 0 20 20" fill="currentColor" onClick={()=>dispatch(setCartClick(true))}>
                         <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    {
                        currentCart&&currentCart.length!==0?(
                            <button className="bg-white h-7 w-7 text-sm font-bold cursor-not-allowed focus:outline-none text-red-500 rounded-full p-0">
                                {currentCart.length}
                            </button>
                        ):null
                    }
                    </div>
                ):(
                    <div className="flex space-x-8 justify-flex-end text-lg text-gray-50 m-6">
                        {
                            nav.map((card,i)=>(
                                <Link key={i} to={`/${card.link}`}>{card.name}</Link>
                            ))
                        }
                        {
                            currentUser&&currentUser.login?(
                                <button className="bg-white text-black rounded-full px-3 mb-2 my-auto hover:bg-blue-500 transition duration-150 transform hover:scale-110 focus:outline-none" onClick={Logout}>Sign Out</button>
                            ):(
                                <button className="bg-green-400 rounded-full px-3 mb-2 my-auto hover:bg-green-300 transition duration-150 transform hover:scale-110 focus:outline-none" onClick={()=>history.push('/user/login')}>Login</button>
                            )
                        }

                        <div className="flex space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 cursor-pointer transition duration-150 transform hover:scale-125" viewBox="0 0 20 20" fill="currentColor" onClick={()=>dispatch(setCartClick(true))}>
                             <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        {
                            currentCart && currentCart.length!==0?(
                                <button className="bg-white h-7 w-7 text-sm font-bold cursor-not-allowed focus:outline-none text-red-500 rounded-full p-0">
                                    {currentCart.length}
                                </button>
                            ):null
                        }
                        </div>
                    </div>
                )
            }
        </div>
        <Cart />
        {
                !click?(
                        <div style={{zIndex: '80'}} className="items-center fixed w-full mt-16 flex flex-col space-y-8 bg-gray-200">
                            {
                                nav.map((card,i)=>(
                                    <Link key={i} to={`/${card.link}`} className="bg-blue-500 px-20 py-1 rounded-full text-lg mt-4 transition duration-150 transform hover:scale-110" onClick={()=>setClick(true)}>{card.name}</Link>
                                ))
                            }
                            {
                                currentUser&&currentUser.login?(
                                    <button className="bg-blue-500 px-20 py-1 rounded-full text-lg mt-4 transition duration-150 transform hover:scale-110 focus:outline-none" onClick={Logout}>Sign Out</button>
                                ):(
                                    <button className="bg-blue-500 px-20 py-1 rounded-full text-lg mt-4 transition duration-150 transform hover:scale-110 focus:outline-none" onClick={()=>{history.push('/user/login');setClick(true);}}>Login</button>
                                )
                            }
                        </div>
                ):null
            }
        </div>
    )
}
const mapStateToProps=(state)=>({
    currentCart: state.cart.currentCart,
    currentClick: state.click.currentClick,
    currentUser: state.user.currentUser
})
export default withRouter(connect(mapStateToProps,null)(Navbar))

/*

<div className="flex flex-col space-y-4 mx-auto justify-items-center">
                <h1 className="text-blue-400 font-bold text-2xl">Login with Mobile No.</h1>
                <h1 className="text-gray-600 text-md font-semibold">Enter the number</h1>
                <input onChange={(e)=>setPhone(e.target.value)} className="focus:outline-none rounded-full w-4/5 align-middle ring-2 ring-offset-gray-900 p-2 items-center py-2 mx-auto" type="phone"placeholder="Phone Number" />
            </div>
*/