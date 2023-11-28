import { cookies } from "next/headers"
const Curso = async () => {
    const testcookies = cookies().get('token')
    let UserInfo = {email: "", nombre:"", apellido:""}

    if (testcookies)
        await fetch('https://authmodule.localfix.mx/api/user', {
        //fetch('http://localhost:3000/api/user',{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${testcookies.value}`
            }
        })
            .then((response) => response.json())
            .then((userInfo) => {
                console.log(userInfo)
                UserInfo.email = userInfo.email
                UserInfo.nombre = userInfo.nombre
                UserInfo.apellido = userInfo.apellido
            }).catch((error) => {
                console.log(error)

            })
    console.log("Cookies: " + JSON.stringify(testcookies))

    return (<>
        <div>
            prueba eventos
            <p>Email: {UserInfo.email}</p>
            <p>Nombre: {UserInfo.nombre}</p>
            <p>Apellido: {UserInfo.apellido}</p>
        </div>
    </>)
}



export default Curso