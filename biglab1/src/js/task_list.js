import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useState } from 'react';
import { Trash, PencilSquare, StarFill, Star, Lock, LockFill } from 'react-bootstrap-icons'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'

const TaskList = function (props) {

    return (
        <ListGroup variant="flush" className="trans mr-3">
            <h2>Filter: {props.filterName}</h2>

            {props.ListOfTasks.map((task =>
                <TaskRow taskDescription={task.description} id={task.id} taskDeadline={task.deadline} key={task.id} deleteTask={props.deleteTask}
                    taskAdded={props.taskAdded} changeTaskAdded={props.changeTaskAdded} taskImportant={task.important}
                    taskPrivate={task.Private} modifyTask={props.modifyTask}
                />
            ))
            }

        </ListGroup>

    )

}


function TaskRow(props) {
    let [bgColor, setBgColor] = useState("");
    let [checked, setChecked] = useState(false);

    let [showForm, setShowForm] = useState(false);

    const handleCloseForm = () => {
        setShowForm(false);
        setBgColor("");
    }
    const handleShowForm = () => setShowForm(true);

    const handleDeleteTask = function () {
        props.deleteTask(props.id);
        props.changeTaskAdded();
    }

    return (

        <ListGroup.Item variant={bgColor}
            onMouseOver={() => setBgColor("primary")}
            onMouseLeave={() => setBgColor("")}

               onClick={() => setChecked(prevState => !prevState)} >

            <Form.Group controlId="formBasicCheckbox">
                <Row   >
                    <Col xs ={0.8} >
                        <Form.Check type="checkbox" checked={checked} />
                    </Col>
                    <Col xs  >
                        <Form.Text style={{ fontSize: 14 }} > {props.taskDescription} </Form.Text>
                    </Col>
                    <Col xs ={1}  >
                        {props.taskImportant ? <StarFill color="blue" /> : <Star color="blue"  />}
                        {props.taskPrivate ? <LockFill  color="blue" /> : <Lock color="blue" />}
                    </Col>
                    <Col xs ={1.7} >
                 
                        {props.taskDeadline.format("DD/MM/YYYY")}
                      
                    </Col>
                    <Col xs ={1} className="mr-5" onClick={e => e.stopPropagation()}>
                        <a href="#" >
                            < Trash  color="blue" href="#" onClick={handleDeleteTask} />
                            < PencilSquare  color="blue" onClick={handleShowForm} />
                            <Modal show={showForm} onHide={handleCloseForm}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modify task</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    {<ModifyTaskForm addTask={props.addTask} handleCloseForm={handleCloseForm}
                                        changeTaskAdded={props.changeTaskAdded} taskDescription={props.taskDescription} taskDeadline={props.taskDeadline}
                                        taskImportant={props.taskImportant} taskPrivate={props.taskPrivate} modifyTask={props.modifyTask}
                                        id={props.id} />}

                                </Modal.Body>
                            </Modal>
                        </a>
                    </Col>
                </Row>

            </Form.Group>
        </ListGroup.Item>
    );
}


function ModifyTaskForm(props) {

    const myHandleSubmit = (values) => {
        props.modifyTask(props.id, values.formDescription, dayjs(values.formDate), values.formImportant, values.formPrivate);
        props.changeTaskAdded();
        props.handleCloseForm();
    };


    const formik = useFormik({
        initialValues: {
            formDescription: props.taskDescription,
            formDate: props.taskDeadline.format("YYYY-MM-DD"),
            formPrivate: props.taskPrivate,
            formImportant: props.taskImportant,
        },
        validationSchema: Yup.object({
            formDescription: Yup.string().required('Required field'),
            formDate: Yup.date().required('Required field'),
        }),
        onSubmit: myHandleSubmit,
    });


    return (
        <Form onSubmit={formik.handleSubmit}>

            <Form.Group controlID='validationFormik02' >
                <Form.Label>Description</Form.Label>
                <Form.Control id="formDescription" type='text' value={formik.values.formDescription} onChange={formik.handleChange} isInvalid={formik.touched.formDescription && formik.errors.formDescription} />
                <Form.Control.Feedback type="invalid">{formik.errors.formDescription}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlID='selectedDate' >
                <Form.Label>Date</Form.Label>
                <Form.Control id="formDate" type='date' value={formik.values.formDate} onChange={formik.handleChange} isInvalid={formik.touched.formDate && formik.errors.formDate} />
                <Form.Control.Feedback type="invalid">{formik.errors.formDate}</Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Check id="formPrivate" type="checkbox" defaultChecked={formik.values.formPrivate} label="Private"
                                     onClick={() => formik.setFieldValue('formPrivate', !formik.values.formPrivate)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Check id="formImportant" type="checkbox" defaultChecked={formik.values.formImportant} label="Important" 
                                    onClick={() => formik.setFieldValue('formImportant', !formik.values.formImportant)} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={{ offset: 2 }}>
                    <Button type="submit">Save</Button>
                </Col>
                <Col xs={{ offset: 1 }}>
                    <Button variant='secondary' onClick={props.handleCloseForm}>Cancel</Button>
                </Col>
            </Row>
        </Form>

    )

}




export default TaskList






