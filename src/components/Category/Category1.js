import React,{useState,useEffect} from 'react'
import { motion } from "framer-motion"
import { Link, useParams, withRouter } from 'react-router-dom';
import Axios from '../../Axios'
import './Category1.css'
import Card from '../Cards/Card';
function Category1({history}) {
    const [click,setClick]=useState(false)
    const [width,setWidth]=useState(0)
    const {id,subCategory}=useParams()
    const [category,setCategory]=useState([])
    const [subCat,setSubCat]=useState([])
    const [item,setItem]=useState([])
    useEffect(()=>{
        async function fetchPosts(){
            const res=await Axios.get(`/products/${subCategory?subCategory:id}`)
            setItem(res.data)
            return res
        }
     fetchPosts()
    },[subCategory,id])

    useEffect(()=>{
            async function fetchPosts(){
            const res=await Axios.get(`/products/FindsubCategory/${id}`)
            setSubCat(res.data)
            return res
        }
        fetchPosts()
    },[id,subCategory])

// main page category list

    useEffect(()=>{
        async function fetchPosts(){
            const res=await Axios.get("/category")
            setCategory(res.data)
            return res
        }
        fetchPosts()
    },[])
    const updateWindowDimensions = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth)
    };
    useEffect(()=>{
        setWidth(window.innerWidth)
        window.addEventListener('resize', updateWindowDimensions);
    },[])
    let x=">"
    return (
        <div>
            {
                click?(
                    <div className={`bg-gray-600 z-20 fixed ${width>=500?'w-3/5':(width>=360?'w-4/5':'w-full')}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white z-40 cursor-pointer ml-auto mr-0 hover:text-blue-500 transition duration-150 transform hover:rotate-180 hover:scale-125" viewBox="0 0 20 20" onClick={()=>setClick(false)} fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <div className="flex flex-col items-center">
                            <div className="bg-green-400 mt-10 p-3 rounded-full z-40 px-10 sm:px-20 mx-auto text-lg font-bold">All Category</div>
                        </div>
                    </div>
                ):null
            }
            {
                click?(
                    <div className={`bg-gray-600 h-screen relative contain transition duration-150 transform ${width>=500?'w-3/5':(width>=360?'w-4/5':'w-full')} drop-shadow-2xl p-2`}>
                            
                        <div className="flex flex-col pt-40 relative space-y-8 justify-items-center items-center">
                        
                            {
                                category.map((card,i)=>(
                                    <Link key={i} to={`/category/${card.category}`} onClick={()=>setClick(false)} className="bg-blue-500 font-bold rounded-full p-2 sm:px-8 px-4 transition duration-150 transform hover:scale-125 hover:bg-red-500">{card.category}</Link>
                                ))
                            }
                        </div>
                    </div>
                ):null
            }
            {
                !click?(
                    <>
                    <div className="p-2 fixed z-10 bg-purple-400 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setClick(true)} class="h-12 w-12 cursor-pointer rounded-full hover:bg-black hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className={`flex fixed py-2 bg-white z-40 mt-16 ${width>=400?'space-x-10':'space-x-6'} sm:space-x-16 container px-5 w-screen`}>
                {
                    subCat.map((card,i)=>(
                        <div key={i}>
                            <button onClick={()=>{history.push(`/category/${id}/${card}`)}} className="border border-red-300 p-1 px-4 sm:p-2 sm:px-4 rounded-full focus:outline-none font-semibold hover:bg-red-400 hover:text-white" >{card}</button>
                        </div>
                    ))
                }
            </div>
            <div className="flex absolute space-x-2 p-1 pl-4 mt-28 pt-2 container text-gray-500 text-sm">
                <Link to="/" className="hover:text-blue-500 hover:underline"> Home </Link>
                {
                    subCategory?<>
                            <p>{x}</p>
                            <Link to={`/category/${id}`} className="hover:text-blue-500 hover:underline"> {id} </Link>
                            <p>{x}</p>
                            <p>{subCategory}</p>
                        </>:<><p>{x}</p><p>{id}</p></>
                }
                </div>
            <div className={`absolute grid ${width>=670?'grid-cols-3':(width>=440?'grid-cols-2':'grid-cols-1')} w-screen mt-36 mr-auto shadow-lg`}>
                {
                    item.map((card,i)=>(
                        <Card key={i} discount={card.discount} name={card.name} image={card.image} unit={card.unit} price={card.price} />
                    ))
                }
            </div>
            </>
                ):null
            }
            
        </div>
    )
}

export default withRouter(Category1)
