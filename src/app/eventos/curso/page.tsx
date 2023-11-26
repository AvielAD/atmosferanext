'use client'
import axios from "axios";
import { useEffect, useState } from "react"

const instanceAxios = axios.create({
    baseURL: 'https://authmodule.localfix.mx',
    //baseURL: 'http://localhost:3000',
    withCredentials: true
})
const Curso = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect( ()=>{

         instanceAxios.get('/api/user').then((data)=>{
                console.log(data)
         }).catch((error)=>{

         })
/*
        fetch('https://authmodule.localfix.mx/api/user',{
        //fetch('http://localhost:3000/api/user',{
            method: 'GET',
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((userInfo)=>{
            console.log(userInfo)
            setIsLoading(false)
        }).catch(()=>{

        })*/
    },[])


    return (<>
        <div>
            prueba eventos
        </div>
    </>)
}



export default Curso