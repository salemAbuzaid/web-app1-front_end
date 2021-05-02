import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {useState} from 'react';


const TaskList = function (props) {

    //const [ListOfTasks, setListOfTasks] = useState(props.ListOfTasks);

    return (
        <ListGroup variant="flush" className="trans mr-3">
            <h2>Filter: {props.filterName}</h2>

            {props.ListOfTasks.map((task =>
                    <TaskRow taskDescription={task.description} taskDeadline={task.deadline} key={task.id}
                    />
            ))
            }

        </ListGroup>

    )

}


function TaskRow(props) {
    let [bgColor, setBgColor] = useState("");
    // let [checked,setChecked] = useState("");
    let [checked, setChecked] = useState(false);
    //state ? setChecked(""):setChecked("checked");
    return (
        <ListGroup.Item variant={bgColor}
                        onMouseOver={() => setBgColor("primary")}
                        onMouseLeave={() => setBgColor("")}
                        onClick={() => setChecked(prevState => !prevState)}>
            <Form.Group controlId="formBasicCheckbox">
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label={props.taskDescription} checked={checked}/>
                    </Col>
                    <Col sm={2} className="justify-content-end">
                        {props.taskDeadline.format("DD/MM/YYYY")}
                    </Col>
                </Row>
            </Form.Group>
        </ListGroup.Item>
    );
}

export default TaskList






