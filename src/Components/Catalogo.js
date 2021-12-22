import React from "react";
import logo from "./ALTO TUMERQUE.png"
import sort from "./sort.png"
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";

//Nueva máquina con docker! 129.151.100.76
const Baseurl = "http://129.151.100.76:8080/api/clothe/";
//const Baseurl = "http://129.151.98.9:8080/api/clothe/";
//const Baseurl = "http://localhost:8080/api/clothe/";


class Catalogo extends React.Component {

    state = {
        data: [],
        form: {
            price: ""
        },
        form2: {
            description: ""
        }
    }

    getCatalogo = () => {
        axios.get(Baseurl + "all").then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    componentDidMount() {
        this.getCatalogo();
    }

    getCatalogoByPrecio = () => {
        axios.get(Baseurl + "price/" + this.state.form.price).then(response => {
            /* console.log(response.data); */
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    getCatalogoByDescription = () => {
        axios.get(Baseurl + "description/" + this.state.form2.description).then(response => {
            /* console.log(this.state.form2.description)
            console.log(response.data); */
            this.setState({ data: response.data });
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

    handleChange2 = async e => {
        await this.setState({
            form2: {
                ...this.state.form2,
                [e.target.name]: e.target.value,
            }
        });
    }

    prueba1 = () => {
        console.log(this.state.data);
        this.setState({ data: [] });
    }

    render() {
        const form = this.state.form;
        const form2 = this.state.form2;

        return (
            <Container>
                <Button color="warning" size="sm" ><Link to={"/"}>VOLVER A LOGIN</Link> </Button>
                <h2> <img className="Logo" src={logo} alt="Logo" />Catalogo Alto Turmequé<img className="Logo"
                    src={logo} alt="Logo" /></h2>
                <Container>
                    <div className="row">
                        <div className="col">
                            <input placeholder="Filtrar por precio" type="text" name="price" onChange={this.handleChange} value={form ? form.price : ""} />
                            {" "}
                            <button className="btn btn-outline-dark" onClick={this.getCatalogoByPrecio} >
                                <img src={sort} alt="img" style={{ height: "22px", padding: "0px", margin: "0px" }} />
                            </button>
                        </div>
                        <div className="col">
                            <span style={{color: "black"}}>Contacta un asesor: <a href="https://api.whatsapp.com/send?phone=[57][3197473186]"><img src="https://sherpadigital.es/wp-content/uploads/2017/10/whatsapp-icon-150x150.png" alt="wpp" style={{height: 30}}></img></a></span>
                        </div>
                        <div className="col">
                            <input placeholder="Filtrar por descripción" type="text" name="description" onChange={this.handleChange2} value={form2 ? form2.description : ""} />
                            {" "}
                            <button className="btn btn-outline-dark" onClick={this.getCatalogoByDescription} >
                                <img src={sort} alt="img" style={{ height: "22px", padding: "0px", margin: "0px" }} />
                            </button>
                        </div>
                    </div>
                    <Row>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                            <Button onClick={this.getCatalogo} color="info">Ver Todo el Catalogo</Button>
                        </Col>
                    </Row>

                </Container>
                <Container>
                    <Table>
                        <tr>
                            <th></th>
                            <th>Referencia</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                        </tr>
                        <tbody>
                            {this.state.data.map((producto => {
                                return (
                                    <tr>
                                        <td><img src={producto.photography} style={{ height: "150px", padding: "0px", margin: "0px" }} alt="Foto"></img></td>
                                        <td>{producto.reference}</td>
                                        <td>{producto.description}</td>
                                        <td>{"$" + new Intl.NumberFormat("en-EN").format(producto.price)}</td>
                                    </tr>
                                )
                            }))}
                        </tbody>
                    </Table>
                </Container>
                <footer style={{ marginTop: "50px" }}>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/twentyfour" title="twentyfour">twentyfour</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </footer>
            </Container>
        )
    }
}

export default Catalogo;