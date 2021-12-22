import React from "react";
import { Link } from 'react-router-dom';
import "./Login.css"
import logo from "./ALTO TUMERQUE.png"
import { Button } from "react-bootstrap";
import axios from "axios";


class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            userEmail: "",
            contra: "",
            url: "http://129.151.100.76:8080/api/user/",
            //url: "http://localhost:8080/api/user/"
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /**
     * Solo para testeos
     */
    onSubmitForm() {
        alert(this.state.userEmail)
        alert(this.state.contra);
        let nombre = this.state.url + this.state.userEmail + "/" + this.state.contra;
        alert(nombre);
    }

    GetExistUser = () => {
        axios.get(this.state.url + "emailexist/" + this.state.userEmail).then(response => {
            let existe = response.data;
            return existe;
        })
    }

    GetTheUser = () => {
        axios.get(this.state.url + this.state.userEmail + "/" + this.state.contra).then(response => {
            console.log(response.data["name"]);
            if (response.data["name"] != null) {
                if(response.data["type"] === "ASE"){
                    alert("Bienvenido Asesor " + response.data["name"]);
                    sessionStorage.setItem('user',JSON.stringify(response.data));
                    window.location.href = "/home";
                } else if (response.data["type"] === "COORD") {
                    alert("Bienvenido Coordinador " + response.data["name"]);
                    sessionStorage.setItem('user',JSON.stringify(response.data));
                    window.location.href = "/home";
                } else {
                    alert("Bienvenido " + response.data["name"]);
                    sessionStorage.setItem('user',JSON.stringify(response.data));
                    window.location.href = "/home";
                }
            } else {
                alert("No existe un usuario");
            }
        })
    }

    validarUsuario=()=>{
        let vali = this.GetExistUser();
        if(vali === true){
            this.GetTheUser();            
        }else{
            alert("No existe un usuario");
        }
    }

    render() {

        return (
            <div>
                <h1> <img className="Logo" src={logo} alt="Logo" /> Alto Turmequé LTDA <img className="Logo"
                    src={logo} alt="Logo" /></h1>




                <div className="autenticar">



                    <form>
                        <table>
                            <tr>
                                <td><span className="Text"> E-mail </span></td>
                                <td>
                                    <input type="email" id="userEmail" name="userEmail" value={this.state.userEmail} onChange={this.onInputchange} className="form-control" required />
                                </td>
                            </tr>
                            <tr>
                                <td><span className="Text"> Contraseña</span></td>
                                <td><input type="password" name="contra" id="contra" value={this.state.contra} onChange={this.onInputchange} autocomplete="off" className="form-control" pattern=".{6,}"
                                required /></td>
                            </tr>
                        </table>
                        <br />
                        <div className="Center">
                            <Button onClick={this.GetTheUser} variant="info" size="sm">Ingresar</Button>
                        </div>
                        <p className="textRedirect">¿No tienes una cuenta?<Link to='/NewAccount'>Crea tu cuenta aquí</Link></p>
                        <br/>
                        <p className="textRedirect"><Link to='/Catalogo'>VER CATALOGO</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;