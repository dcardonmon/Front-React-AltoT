import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css"

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg py-md-0 py-0 fixed-top navbar-dark bg-dark">
                <ul className="menu-horizontal">
                    <li><span className="text-white">ALTO TURMEQUE</span></li>
                    <li>
                        <span>Home</span>
                        <ul className="menu-vertical">
                            <li><Link to="/Home">Ir al Home</Link></li>
                        </ul>
                    </li>
                    <li>
                        <span>Productos</span>
                        <ul className="menu-vertical">
                            <li><Link to="/Productos">Ver Productos</Link></li>
                        </ul>
                    </li>
                    <li>
                        <span>Usuarios</span>
                        <ul className="menu-vertical">
                            <li><Link to="/Users">Ver Usuarios</Link></li>
                        </ul>
                    </li>                
                </ul>
            </nav>
        )
    }
}

export default Navigation;