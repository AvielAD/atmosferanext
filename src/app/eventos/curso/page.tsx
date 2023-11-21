'use client'
import { useEffect, useState } from "react"

const Curso = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(null);
    
    useEffect( ()=>{
        fetch('https://authmodule.localfix.mx/api/user',{
            method: 'GET',
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((userInfo)=>{
            console.log(userInfo)
            setIsLoading(false)
        }).catch(()=>{

        })
    },[])


    return (<>
        <div>
            prueba eventos
        </div>
    </>)
}



export default Curso