import React from "react";
import axios from 'axios';
import "./Login.css"
import { Link } from 'react-router-dom';
import logo from "./ALTO TUMERQUE.png"
import { Button } from "react-bootstrap";

//Nueva máquina con docker! 129.151.100.76
const posturl = "http://129.151.100.76:8080/api/user/new";
//const posturl = "http://129.151.98.9:8080/api/user/new";
//const posturl = "http://localhost:8080/api/user/new";


class NewAccount extends React.Component {

    state = {
        data: [],
        form: {
            id: "",
            identification: "",
            name: "",
            birthtDay: "",
            monthBirthtDay: "",
            address: "",
            cellPhone: "",
            email: "",
            password: "",
            password2: "",
            zone: "",
            type: ""
        }
    }

    validarContras = () => {
        if (this.state.form.password.length >= 6 && this.state.form.password2.length >= 6) {
            if (this.state.form.password === this.state.form.password2) {                
                this.PostNewUser();
            } else {
                alert("contraseñas no concuerdan");
            }
        } else {
            console.log("Las contraseñas deben tener mínimo 6 caracteres");
        }
    }

    PostNewUser = async () => {
        await axios.post(posturl, this.state.form).then(response => {
            console.log(response.data);
            alert("Usuario creado exitosamente");
            window.location.href = "/"
        }).catch(error => {
            console.log(error.message);
        })
    }


    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    render() {
        const form = this.state.form;
        return (
            <div className="NewAccount">
                <h1> <img className="Logo" src={logo} alt="Logo" /> Alto Turmequé LTDA <img class="Logo"
                    src={logo} alt="Logo" /></h1>


                <p className="SubtFunction">Crear Cuenta</p>

                <div className="autenticar">

                    <form>
                        <table>
                            <tr>
                                <td><label for="name">Nombre</label></td>
                                <td><input type="text" name="name" id="name" className="form-control" onChange={this.handleChange} value={form.name} required /></td>
                            </tr>
                            <tr>
                                <td><label for="identification">Identificación</label></td>
                                <td><input type="text" name="identification" id="identification" className="form-control" onChange={this.handleChange} value={form.identification} required /></td>
                            </tr>
                            <tr>
                                <td><label for="birthtDay">Fecha nacimiento</label></td>
                                <td><input type="date" name="birthtDay" id="birthtDay" className="form-control" onChange={this.handleChange} value={form.birthtDay} required /></td>
                            </tr>
                            <tr>
                                <td><label for="monthBirthtDay">Mes nacimiento</label></td>
                                <td><input type="text" name="monthBirthtDay" id="monthBirthtDay" className="form-control" list="meses" onChange={this.handleChange} value={form.monthBirthtDay} required /></td>
                                <datalist id="meses">
                                    <option value="1">Enero</option>
                                    <option value="2">Febrero</option>
                                    <option value="3">Marzo</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Mayo</option>
                                    <option value="6">Junio</option>
                                    <option value="7">Julio</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Septiembre</option>
                                    <option value="10">Octubre</option>
                                    <option value="12">Noviembre</option>
                                    <option value="12">Diciembre</option>
                                </datalist>
                            </tr>
                            <tr>
                                <td><label for="address">Dirección</label></td>
                                <td><input type="text" name="address" id="address" className="form-control" onChange={this.handleChange} value={form.address} required /></td>
                            </tr>
                            <tr>
                                <td><label for="cellPhone">Celular</label></td>
                                <td><input type="tel" name="cellPhone" id="cellPhone" className="form-control" pattern="[0-9]{10}"
                                    maxlength="10" placeholder="ex: 1234567890" required onChange={this.handleChange} value={form.cellPhone} /></td>
                            </tr>
                            <tr>
                                <td><label for="email">E-mail</label></td>
                                <td><input type="email" name="email" id="email" className="form-control" onChange={this.handleChange} value={form.email} required /></td>
                            </tr>
                            <tr>
                                <td><label for="zone">Zona</label></td>
                                <td><input type="text" name="zone" id="zone" className="form-control" list="ZonasTurmeque" onChange={this.handleChange} value={form.zone} required />
                                </td>
                                <datalist id="ZonasTurmeque">
                                    <option value="ZONA 1">NORTE</option>
                                    <option value="ZONA 2">NORORIENTAL</option>
                                    <option value="ZONA 3">SAN FRANCISCO</option>
                                    <option value="ZONA 4">OCCIDENTAL</option>
                                    <option value="ZONA 5">GARCÍA ROVIRA</option>
                                    <option value="ZONA 6">LA CONCORDIA</option>
                                    <option value="ZONA 7">LA CIUDADELA</option>
                                    <option value="ZONA 8">SUR OCCIDENTE</option>
                                    <option value="ZONA 9">LA PEDREGOSA</option>
                                    <option value="ZONA 10">PROVENZA</option>
                                    <option value="ZONA 11">SUR</option>
                                    <option value="ZONA 12">CABECERA DEL LLANO</option>
                                    <option value="ZONA 13">ORIENTAL</option>
                                    <option value="ZONA 14">MORRORICO</option>
                                    <option value="ZONA 15">CENTRO</option>
                                    <option value="ZONA 16">LAGOS DEL CACIQUE</option>
                                    <option value="ZONA 17">MUTIS</option>
                                </datalist>
                            </tr>
                            <tr>
                                <td><label for="type">Tipo o Rol</label></td>
                                <td><input type="text" name="type" id="type" className="form-control" list="RolList" onChange={this.handleChange} value={form.type} required /></td>
                                <datalist id="RolList">
                                    <option value="COORD">Coordinador</option>
                                    <option value="ASE">Asesor Comercial</option>
                                </datalist>
                            </tr>

                            <tr>
                                <td><label for="password">Contraseña</label></td>
                                <td><input type="password" name="password" id="password" className="form-control" minLength={6} onChange={this.handleChange} value={form.password} required /></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <p id="alertContra">La contraseña debe tener mínimo 6 caracteres</p>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="password2">Confirmar tu contraseña</label></td>
                                <td><input type="password" name="password2" id="password2" className="form-control" minLength={6} onChange={this.handleChange} value={form.password2} required /></td>
                            </tr>
                        </table>
                        <br />
                        <div className="Center">
                            <Button variant="info" size="sm" onClick={() => { this.validarContras() }}>Crear</Button>
                        </div>
                    </form>
                    <p className="textRedirect">¿ya tienes una cuenta?<Link to='/'>Crea tu cuenta aquí</Link></p>
                </div>
            </div>

        )
    }
}

export default NewAccount;