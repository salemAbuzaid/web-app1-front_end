import ListGroup from 'react-bootstrap/ListGroup'
import {useState} from 'react';
import {Link, Redirect, useLocation} from 'react-router-dom';

const SideBar = function (props) {

    return (
        <ListGroup variant="flush" className="trans ml-2">
            {props.filterList.map(
                (name, index) =>
                    <ListLine
                        name={name} key={index} index={index}
                        selected={index === props.selected} choose={props.choose}
                        pageName={props.pagesList[index]}>
                    </ListLine>
            )}
        </ListGroup>
    )
}

function ListLine(props) {
    let [bgColor, setBgColor] = useState("");

    return (
    <Link to = {"/"+props.pageName} style={{ textDecoration: 'none' }}>
    
    <ListGroup.Item
        onMouseOver={(ev) => {
            if (!ev.target.classList.contains("active"))
                setBgColor("primary");
        }}
        onMouseLeave={(ev) => {

            setBgColor("")
        }}
        onClick={() => {
            props.choose(props.index);
            setBgColor("");
        }}
        variant={bgColor} action
        className={props.selected ? "active" : ""}>{props.name}</ListGroup.Item>
        </Link>
    )
}


export default SideBar


