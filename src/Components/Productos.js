import React from "react";
import axios from 'axios';
import "./Navigation.css";
import sort from "./sort.png";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from "reactstrap";
import Navigation from "./Navigation";

/* const data = [
    {
        reference: "AP-903", category: "CATEGORIA 1", size: "M", description: "DESCRIPCION 1", availability: true,
        price: 150000.0, quantity: 10, photography: "https://www.avasoluciones.com/uploads/2021/09/910-006127.jpg"
    },
    {
        reference: "AP-904", category: "CATEGORIA 2", size: "S", description: "DESCRIPCION 2", availability: true,
        price: 150000.0, quantity: 10, photography: "https://www.avasoluciones.com/uploads/2021/09/910-007.jpg"
    }
] */

//Nueva máquina con docker! 129.151.100.76
const Baseurl = "http://129.151.100.76:8080/api/clothe/";
//const Baseurl = "http://129.151.98.9:8080/api/clothe/";
//const Baseurl = "http://localhost:8080/api/clothe/";

class Productos extends React.Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            reference: "",
            category: "",
            size: "",
            description: "",
            availability: "",
            price: "",
            quantity: "",
            photography: "",
            tipoModal: ''
        },
        form2: {
            price2: "",
            description2: ""
        }
    };

    GetAllClothes = () => {
        axios.get(Baseurl + "all").then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    PostNewClothe = async () => {
        await axios.post(Baseurl + "new", this.state.form).then(response => {
            this.modalInsertar();
            this.GetAllClothes();
        }).catch(error => {
            console.log(error.message);
        })
    }

    selectedItem = (item) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                reference: item.reference,
                category: item.category,
                size: item.size,
                description: item.description,
                availability: item.availability,
                price: item.price,
                quantity: item.quantity,
                photography: item.photography
            }
        })
    }

    Update = () => {
        axios.put(Baseurl + "update", this.state.form).then(response => {
            this.modalInsertar();
            this.GetAllClothes();
        }).catch(error => {
            console.log(error.message);
        })
    }

    DeleteItem = () => {
        axios.delete(Baseurl + "delete/" + this.state.form.reference).then(response => {
            this.setState({ modalEliminar: false });
            this.GetAllClothes();
        }).catch(error => {
            console.log(error.message);
        })
    }

    getCatalogoByPrecio = () => {
        axios.get(Baseurl + "price/" + this.state.form2.price2).then(response => {
            /* console.log(response.data); */
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    getCatalogoByDescription = () => {
        axios.get(Baseurl + "description/" + this.state.form2.description2).then(response => {
            /* console.log(this.state.form2.description)
            console.log(response.data); */
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    componentDidMount() {
        this.GetAllClothes();
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
        console.log(this.state.form2.price2);
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    render() {
        const form = this.state.form;
        const form2 = this.state.form2;
        return (
            <>
                <Container>
                    <Navigation />
                    <h2 className="Titulo">Productos</h2>
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <input placeholder="Filtrar por precio" type="text" name="price2" onChange={this.handleChange2} value={form2 ? form2.price2 : ""} />
                                {" "}
                                <button className="btn btn-outline-dark" onClick={this.getCatalogoByPrecio} >
                                    <img src={sort} alt="img" style={{ height: "22px", padding: "0px", margin: "0px" }} />
                                </button>
                            </div>
                            <div className="col">
                                <button className="btn btn-dark" onClick={this.GetAllClothes}>Ver todos los Productos</button>
                            </div>
                            <div className="col">
                                <input placeholder="Filtrar por descripción" type="text" name="description2" onChange={this.handleChange2} value={form2 ? form2.description2 : ""} />
                                {" "}
                                <button className="btn btn-outline-dark" onClick={this.getCatalogoByDescription} >
                                    <img src={sort} alt="img" style={{ height: "22px", padding: "0px", margin: "0px" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Button color="success" onClick={() => { this.setState({ form: null, tipoModal: "insertar" }); this.modalInsertar() }}>Agregar nuevo Producto</Button>
                    <br></br>
                    <Table >
                        <thead>
                            <tr>
                                <th>Referencia</th>
                                <th>Categoria</th>
                                <th>Talla</th>
                                <th>Descripción</th>
                                <th>Disponibilidad</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Fotografia</th>
                            </tr>
                        </thead>
                        <tbody className="cuerpoTabla">
                            {this.state.data.map((elemento) => (
                                <tr>
                                    <td>{elemento.reference}</td>
                                    <td>{elemento.category}</td>
                                    <td>{elemento.size}</td>
                                    <td>{elemento.description}</td>
                                    <td>{elemento.availability ? "Sí" : "No"}</td>
                                    <td>{"$" + new Intl.NumberFormat("en-EN").format(elemento.price)}</td>
                                    <td>{elemento.quantity}</td>
                                    <td><img style={{height: 100}} src={elemento.photography} alt="Foto"></img></td>
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


                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <h3>Agregar Nuevo Producto</h3>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Referencia</label>
                            <input className="form-control" id="reference" name="reference" type="text" onChange={this.handleChange} value={form ? form.reference : ""}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Categoria</label>
                            <input className="form-control" name="category" type="text" onChange={this.handleChange} value={form ? form.category : ""}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Talla</label>
                            <input className="form-control" name="size" type="text" onChange={this.handleChange} value={form ? form.size : ""}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Descripción</label>
                            <input className="form-control" name="description" type="text" onChange={this.handleChange} value={form ? form.description : ""}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Disponibilidad</label>
                            <input className="form-control" name="availability" type="text" list="DisponibilidadList" onChange={this.handleChange} value={form ? form.availability : ""}></input>
                            <datalist id="DisponibilidadList">
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </datalist>
                        </FormGroup>
                        <FormGroup>
                            <label>Precio</label>
                            <input className="form-control" name="price" type="number" onChange={this.handleChange} value={form ? form.price : ""}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Cantidad</label>
                            <input className="form-control" name="quantity" type="number" onChange={this.handleChange} value={form ? form.quantity : ""}></input>
                        </FormGroup>
                        <FormGroup>
                            <label>Fotografia</label>
                            <input className="form-control" name="photography" type="url" onChange={this.handleChange} value={form ? form.photography : ""}></input>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        {
                            this.state.tipoModal === "insertar" ?
                                <Button color="primary" onClick={() => this.PostNewClothe()}>Insertar</Button> :
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

export default Productos;