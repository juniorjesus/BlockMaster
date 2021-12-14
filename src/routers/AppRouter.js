import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Gestion from '../components/Gestion';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import Registro from '../components/Registro';
import Tarjeta from '../components/Tarjeta';
import Usuario from '../components/Usuario';
import VerDespues from '../components/VerDespues';



export default class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/registro" exact component={Registro} />
                    <Route path="/navbar" exact component={Navbar} />
                    <Route path="/usuario" exact component={Usuario} />
                    <Route path="/tarjeta" exact component={Tarjeta} />
                    <Route path="/gestion" exact component={Gestion} />
                    <Route path="/verdespues" exact component={VerDespues} />
                </Switch>
            </Router>
        )
    }
}
