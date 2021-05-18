import React,{useState,useEffect} from 'react'
import Category1 from './Category1';
import Category2 from './Category2';
import Axios from '../../Axios'
function Category() {
    const [width,setWidth]=useState(0)
    const updateWindowDimensions = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth)
    };
    
    useEffect(()=>{
        setWidth(window.innerWidth)
        window.addEventListener('resize', updateWindowDimensions);
    },[])
    
    return (
        <div>
            {
                width>=830?<Category2 />:<Category1 />
            }
        </div>
    )
}

export default Category
