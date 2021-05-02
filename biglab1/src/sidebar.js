import ListGroup from 'react-bootstrap/ListGroup'
import {useState} from 'react';


const SideBar = function (props) {

    //const [selected, setSelected] = useState(props.selected);


    return (
        <ListGroup variant="flush" className="trans ml-2">
            {props.filterList.map(
                (name, index) =>
                    <ListLine
                        name={name} key={index} index={index}
                        selected={index === props.selected} choose={props.choose}>
                    </ListLine>
            )}
        </ListGroup>
    )

}


function ListLine(props) {
    let [bgColor, setBgColor] = useState("")

    return <ListGroup.Item
        onMouseOver={(ev) => {
            if (!ev.target.classList.contains("active"))
                setBgColor("primary")
        }}
        onMouseLeave={(ev) => {

            setBgColor("")
        }}
        onClick={() => {
            props.choose(props.index)
        }}
        variant={bgColor} action
        className={props.selected ? "active" : ""}>{props.name}</ListGroup.Item>

}


export default SideBar


