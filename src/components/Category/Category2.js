import React,{useState,useEffect} from 'react'
import Card from '../Cards/Card';
import Axios from '../../Axios'
import {connect} from 'react-redux'
import {SetSearch} from '../redux/click/click-action'
import './Category1.css'
import { Link, useParams, withRouter } from 'react-router-dom';
function Category2({history,dispatch,currentSearch}) {
    const [width,setWidth]=useState(0)
    const {id,subCategory}=useParams()
    const [category,setCategory]=useState([])
    const [subCat,setSubCat]=useState([])
    const [item,setItem]=useState([])
    
    useEffect(()=>{
        async function fetchPosts(){
            const res=await Axios.get(`/products/${subCategory?subCategory:id}`)
            if(id!=="search"){
                setItem(res.data)
            }
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

    useEffect(()=>{
        if(currentSearch){
            setItem(currentSearch)
            console.log("yes")
            dispatch(SetSearch(null))
        }
    },[currentSearch])

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
        <div className="bg-white">
            <div className="fixed z-10 mx-auto p-3 pl-20 bg-green-400 w-full">Category</div>
            <div className="fixed flex flex-col h-screen contain w-64 ml-0 items-center justify-items-center font-bold ">
                <div className="absolute z-0 mx-auto mt-16 mb-16">
                    {
                        subCat.map((card,i)=>(
                            <div key={i}>
                                <div className="p-3 cursor-pointer transition duration-150 transform hover:scale-110 hover:text-blue-500" onClick={()=>history.push(`/category/${id}/${card}`)}>{card}</div>
                                <hr className="border-1 border-black w-full"/>
                            </div>
                        ))
                    }
                    <br/>
                </div>
            </div>
            <div className="ml-64 flex flex-col">
            <div className="fixed z-10 w-full bg-green-300 flex space-x-4 xl:space-x-8 xl:pl-4 justify-items-center">
                    {
                        category.map((card,i)=>(
                            width>1200?(i<5?(<div key={i} className="cursor-pointer p-3 hover:bg-blue-50" onClick={()=>history.push(`/category/${card.category}`)}>{card.category}</div>):null):
                            (width>=1000?(i<3?(<div key={i} className="cursor-pointer p-3 hover:bg-blue-50" onClick={()=>history.push(`/category/${card.category}`)}>{card.category}</div>):null):(i<2?(<div key={i} className="cursor-pointer p-3 hover:bg-blue-50" onClick={()=>history.push(`/category/${card.category}`)}>{card.category}</div>):null))
                            
                        ))
                    }
                    <select name="More" className="bg-green-300 text-black focus:outline-none cursor-pointer hover:bg-blue-50 w-20" onChange={event =>history.push(`/category/${event.target.value}`)}>
                    <option disabled selected hidden>More</option>
                    {
                        category.map((card,i)=>(
                            width>1200?(i>=5?(<option value={card.category}>{card.category}</option>):null):
                            (width>=1000?(i>=3?(<option value={card.category}>{card.category}</option>):null):(i>=2?(<option value={card.category}>{card.category}</option>):null))
                        ))
                    }
                    </select>
                </div>
                <div className="flex space-x-2 p-1 pl-4 mt-12 text-gray-500 text-sm ">
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
                <div className={`grid ${width<=950?'grid-cols-2':'grid-cols-3'} contain xl:grid-cols-4 mr-auto shadow-lg w-full`} >
                {
                    item.map((card,i)=>(
                        <Card key={i} discount={card.discount} name={card.name} image={card.image} unit={card.unit} price={card.price} category={category} subCategory={subCat} id={card._id} />
                    ))
                }
            </div>
            </div>
        </div>
    )
}

const mapStateToProps=state=>({
    currentSearch: state.click.currentSearch
})

export default withRouter(connect(mapStateToProps,null)(Category2))
