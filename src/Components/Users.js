import React from "react";
import axios from 'axios';
import sort from "./sort.png";
import Navigation from './Navigation'
import "./Navigation.css"
import { Table, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

//Primero probare con data traida del ejemplo
/* const data = [
    {
        id: 1, identification: "123", name: "Damian", birthtDay: "1989-06-19T05:00:00.000+00:00",
        monthBirthtDay: "06", address: "123", cellPhone: "3197473186", email: "dami@gmail.com",
        password: "qwerty", zone: "ZONA 7", type: "ASE"
    },
    {
        id: 3, identification: "46669989", name: "BLODY MARRY", birthtDay: "1996-11-15T05:00:00.000+00:00",
        monthBirthtDay: "11", address: "CR 34-45", cellPhone: "3174565625", email: "stellez@gmail.com",
        password: "Demo123.", zone: "ZONA 2", type: "ASE"
    },
    {
        id: 6, identification: "213456789", name: "PEDRO CAPAROSA", birthtDay: "1966-02-15T05:00:00.000+00:00",
        monthBirthtDay: "02", address: "CR 34-45", cellPhone: "3168965645", email: "pcaparosa@gmail.com",
        password: "Demo123.", zone: "ZONA 1", type: "ASE"
    }
] */

//Nueva máquina con docker! 129.151.100.76
const Baseurl = "http://129.151.100.76:8080/api/user/";
//const Baseurl = "http://129.151.98.9:8080/api/user/";
//const Baseurl = "http://localhost:8080/api/user/";


class Users extends React.Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
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
            zone: "",
            type: "",
            tipoModal: ''
        },
        form2: {
            fechacumple: ""
        }
    };

    /**
     * Método GET con Axios para obtener el listado de usuarios
     */
    GetAllUsers = () => {
        axios.get(Baseurl + "all").then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    PostNewUser = async () => {
        delete this.state.form.id;
        await axios.post(Baseurl + "new", this.state.form).then(response => {
            this.modalInsertar();
            this.GetAllUsers();
        }).catch(error => {
            console.log(error.message);
        })
    }

    selectedItem = (item) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: item.id,
                identification: item.identification,
                name: item.name,
                birthtDay: item.birthtDay,
                monthBirthtDay: item.monthBirthtDay,
                address: item.address,
                cellPhone: item.cellPhone,
                email: item.email,
                password: item.password,
                zone: item.zone,
                type: item.type
            }
        })
    }

    Update = () => {
        axios.put(Baseurl + "update", this.state.form).then(response => {
            this.modalInsertar();
            this.GetAllUsers();
        }).catch(error => {
            console.log(error.message);
        })
    }

    DeleteItem = () => {
        axios.delete(Baseurl + "delete/" + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.GetAllUsers();
        }).catch(error => {
            console.log(error.message);
        })
    }

    getPorMesDeCumple = () => {
        axios.get(Baseurl + "birthday/" + this.state.form2.fechacumple).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    componentDidMount() {
        this.GetAllUsers();
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    handleChange2 = async e => {
        await this.setState({
            form2: {
                ...this.state.form2,
                [e.target.name]: e.target.value,
            }
        });
    }

    prueba1 = () => {
        console.log(this.state.form2.fechacumple)
    }

    /**
     * Me creé esta función para parsear la fecha en formato legible y bonito
     * @param {} fecha 
     * @returns 
     */
    parsearFecha = (fecha) => {
        let date = new Date(fecha).toISOString().split('T')[0];
        //console.log(date);
        return date;
    }

    render() {
        const form = this.state.form; //pa ahorrarme el esfuerzo
        const form2 = this.state.form2;
        return (
            <>
                <Container>
                    <Navigation />
                    <h3 className="Titulo">Usuarios</h3>
                    <br></br>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label>Filtro</label>
                                <input style={{size:50}} list="meses" placeholder="Por mes de Cumpleaños" type="text" name="fechacumple" onChange={this.handleChange2} value={form2 ? form2.fechacumple : ""} />
                                <datalist id="meses">
                                    <option value="01">Enero</option>
                                    <option value="02">Febrero</option>
                                    <option value="03">Marzo</option>
                                    <option value="04">Abril</option>
                                    <option value="05">Mayo</option>
                                    <option value="06">Junio</option>
                                    <option value="07">Julio</option>
                                    <option value="08">Agosto</option>
                                    <option value="09">Septiembre</option>
                                    <option value="10">Octubre</option>
                                    <option value="12">Noviembre</option>
                                    <option value="12">Diciembre</option>
                                </datalist>
                                {" "}
                                <button className="btn btn-outline-dark" onClick={this.getPorMesDeCumple} >
                                    <img src={sort} alt="img" style={{ height: "22px", padding: "0px", margin: "0px" }} />
                                </button>
                            </div>
                            <div className="col">
                                <button className="btn btn-dark" onClick={this.GetAllUsers}>Ver todos los Usuarios</button>
                            </div>
                        </div>
                    </div>
                    <Button color="success" onClick={() => { this.setState({ form: null, tipoModal: "insertar" }); this.modalInsertar() }}>Agregar nuevo usuario</Button>
                    <br></br>
                    <Table className="table-responsive">
                        <thead>
                            <tr>
                                <th>Identificación</th>
                                <th>Nombre</th>
                                <th>Cumpleaños</th>
                                <th>Mes</th>
                                <th>Dirección</th>
                                <th>Celular</th>
                                <th>E-mail</th>
                                <th>Password</th>
                                <th>Zona</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody className="cuerpoTabla">
                            {this.state.data.map((elemento) => (
                                <tr>
                                    <td>{elemento.identification}</td>
                                    <td>{elemento.name}</td>
                                    <td>{this.parsearFecha(elemento.birthtDay)}</td>
                                    <td>{elemento.monthBirthtDay}</td>
                                    <td>{elemento.address}</td>
                                    <td>{elemento.cellPhone}</td>
                                    <td>{elemento.email}</td>
                                    <td>{elemento.password}</td>
                                    <td>{elemento.zone}</td>
                                    <td>{elemento.type}</td>
                                    <td><Button color="info" onClick={() => { this.selectedItem(elemento); this.modalInsertar() }}>Editar</Button></td> {"  "}
                                    <td><Button color="danger" onClick={() => { this.selectedItem(elemento); this.setState({ modalEliminar: true }) }}>Eliminar</Button></td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    <footer style={{ marginTop: "80px" }}>
                        <div>Icons made by <a href="https://www.flaticon.com/authors/twentyfour" title="twentyfour">twentyfour</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </footer>
                </Container>



                {
                    //ESTE ES EL MODAL PARA INSERTAR UNO NUEVO
                }
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <h3>Insertar Nuevo Usuario</h3>
                    </ModalHeader>

                    <ModalBody>
                        <div>
                            <label>Identificación</label>
                            <input className="form-control" name="identification" type="text" onChange={this.handleChange} value={form ? form.identification : ""}></input>
                            <br />
                            <label>Nombre</label>
                            <input className="form-control" name="name" type="text" onChange={this.handleChange} value={form ? form.name : ""} ></input>
                            <br />
                            <label>Fecha Nacimiento</label>
                            <input className="form-control" name="birthtDay" type="date" onChange={this.handleChange} value={form ? form.birthtDay : ""}></input>
                            <br />
                            <label>Mes</label>
                            <input className="form-control" name="monthBirthtDay" type="text" list="meses" onChange={this.handleChange} value={form ? form.monthBirthtDay : ""}></input>
                            <br />
                            <label>Dirección</label>
                            <input className="form-control" name="address" type="text" onChange={this.handleChange} value={form ? form.address : ""}></input>
                            <br />
                            <label>Celular</label>
                            <input className="form-control" name="cellPhone" type="tel" list="DisponibilidadList" onChange={this.handleChange} value={form ? form.cellPhone : ""} ></input>
                            <br />
                            <label>E-mail</label>
                            <input className="form-control" name="email" type="email" onChange={this.handleChange} value={form ? form.email : ""}></input>
                            <br />
                            <label>Password</label>
                            <input className="form-control" name="password" type="password" minLength={6} onChange={this.handleChange} value={form ? form.password : ""}></input>
                            <br />
                            <label>Zona</label>
                            <input className="form-control" name="zone" type="text" list="ZonasTurmeque" onChange={this.handleChange} value={form ? form.zone : ""}></input>
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
                            <br />
                            <label>Tipo</label>
                            <input className="form-control" name="type" type="text" list="RolList" onChange={this.handleChange} value={form ? form.type : ""}></input>
                            <datalist id="RolList">
                                <option value="COORD">Coordinador</option>
                                <option value="ASE">Asesor Comercial</option>
                                <option value="ADMIN">Administrador</option>
                            </datalist>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {
                            this.state.tipoModal === "insertar" ?
                                <Button color="primary" onClick={() => this.PostNewUser()}>Insertar</Button> :
                                <Button color="primary" onClick={() => this.Update()}>actualizar</Button>
                        }
                        <Button color="danger" onClick={() => this.modalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

                {
                    //MODAL PARA ELIMINAR!
                }
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Desea eliminar el registro: {form && form.name}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.DeleteItem()}>Sí</Button>
                        <Button color="info" onClick={() => this.setState({ modalEliminar: false })}>No</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Users;
