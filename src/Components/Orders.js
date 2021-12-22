import React from 'react'
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

//Nueva máquina con docker! 129.151.100.76
const Baseurl = "http://129.151.100.76:8080/api/order/";
//const Baseurl= "http://129.151.98.9:8080/api/order/";
//const Baseurl= "http://localhost:8080/api/order/";

class Orders extends React.Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            name: "",
            category: "",
            price: "",
            description: "",
            photography:"",
            quantity: "",
            tipomodal: ""
        }
    };

    GetOrders = () => {
        let user = JSON.parse(sessionStorage.user);
        axios.get(Baseurl + "zona/" + user.zone).then(response=>{
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }


    //PENDIENTE
    selectedItem = (item) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                name: item.reference,
                category: item.category,
                description: item.description,
                price: item.price,
                photography : item.photography,
                quantity : item.quantity
            }
        })
        console.log(this.state.form);
    }


    prueba1 = () => {
        console.log(this.state.data[0].id);
    }

    DeleteOrder = () =>{
        axios.delete(Baseurl + "delete/" + this.state.data[0].id).then(response => {
            this.setState({ modalEliminar: false });
            this.GetOrders();
        }).catch(error => {
            console.log(error.message);
        })
    }

    DeleteItem = () =>{
        axios.delete(Baseurl + "delete/" + this.state.data[0].id).then(response => {
            this.setState({ modalEliminar: false });
            this.GetOrders();
        }).catch(error => {
            console.log(error.message);
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    componentDidMount() {
        this.GetOrders();
    }

    render() {
        const form = this.state.form;
        return (
            <>
                
                <button className='btn btn-danger btn-sm' style={{float: "left"}} onClick={this.DeleteOrder}>
                    Borrar pedido
                </button>
                <h2>Orden de Pedido</h2>
                <Table>
                    <tr>
                    {/*     <th>Agregar</th>
                        <th>Eliminar</th> */}
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Foto</th>
                        <th>Cantidad</th>
                    </tr>
                    <tbody id="tablaOrden">
                        {this.state.data.map((elemento) => (
                            Object.entries(elemento.products).map(([key, value]) => {
                                return (
                                    <tr>
                                        { console.log(elemento.products[key]) }
                                        {/* <td><Button color="info" onClick={() => { this.selectedItem(elemento.products[key]); this.modalInsertar() }}>Editar</Button></td> {"  "}
                                        <td><Button color="danger" onClick={() => { this.selectedItem(elemento.products[key]); this.setState({ modalEliminar: true }) }}>Eliminar</Button></td> */}
                                        <td>{value.reference}</td>
                                        <td>{value.category}</td>
                                        <td>{value.description}</td>
                                        <td>{value.price}</td>
                                        <td>{value.photography}</td>
                                        <td>{value.quantity}</td>
                                    </tr>
                                )
                            })
                        ))}
                    </tbody>
                </Table>


                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <h3>Editar Orden</h3>
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

export default Orders;
