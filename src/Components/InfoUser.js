import React from "react";
import "./Login.css"


class InfoUser extends React.Component {
    render() {
        const elUsuario = JSON.parse(sessionStorage.user);


        return (
            <div id="infoUser">
                <h2>Mi perfil</h2>
                <table>
                    <tr>
                        <th>Identificación</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Perfil</th>
                        <th>Zona</th>
                    </tr>
                    <tbody id="tablaAsesor">
                        <tr>
                            <td>{elUsuario.identification} </td>
                            <td>{elUsuario.name} </td>
                            <td>{elUsuario.email} </td>
                            <td>{elUsuario.type} </td>
                            <td>{elUsuario.zone} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default InfoUser;