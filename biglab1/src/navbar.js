import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'
import { PersonCircle} from 'react-bootstrap-icons'
import {CardChecklist} from 'react-bootstrap-icons'
//import { Link } from 'react-router-dom';

const NavBar = function () {

    return (

        <Navbar bg="info" expand="lg">

            <CardChecklist color="white" size={50} className="mr-5"/>
            <Navbar.Brand href="#home">ToDo Manager</Navbar.Brand>

            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Form inline className="mr-3">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant = "outline-light" >Search</Button>
                </Form>
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                <Navbar.Brand>Barack Obama</Navbar.Brand>
                <a href="#">
                    < PersonCircle color="white" size={50}/>
                </a>
            </Navbar.Collapse>

        </Navbar>

    );
}

export default NavBar






