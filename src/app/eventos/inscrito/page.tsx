'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Inscrito = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetch('https://atmosferaform.localfix.mx/inscripcion/inscritos', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((userInfo) => {
        console.log(userInfo)
        setIsLoading(false)
      }).catch(() => {

      })
  }, [])

  console.log("status", status);
  console.log("session",JSON.stringify(session));
  return (<>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>)
}

export default Inscrito