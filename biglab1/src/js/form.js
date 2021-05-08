
import { PlusCircleFill } from 'react-bootstrap-icons'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


function InputForm(props) {
    let [showForm, setShowForm] = useState(false);

    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    return (
        <>

            <a action href="#">
                <PlusCircleFill href="#" color="blue" size={40} onClick={handleShowForm} />
            </a>
            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Insert new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {<TaskForm addTask={props.addTask} handleCloseForm={handleCloseForm} changeTaskAdded={props.changeTaskAdded} />}

                </Modal.Body>
            </Modal>
        </>
    );
}


function TaskForm(props) {

    const myHandleSubmit = (values) => {
        //event.preventDefault();
        // VALIDATE !!!

        props.addTask(1, values.formDescription, dayjs(values.formDate), values.formImportant, values.formPrivate);
        props.changeTaskAdded();
        props.handleCloseForm();
    };


    const formik = useFormik({
        initialValues: {
            formDescription: '',
            formDate: undefined,
            formPrivate: undefined,
            formImportant: undefined,
        },
        validationSchema: Yup.object({
            formDescription: Yup.string().required('Required field'),
            formDate: Yup.date().required('Required field'),
        }),
        onSubmit: myHandleSubmit,
    });


    return (
        <Form onSubmit={formik.handleSubmit}>

            <Form.Group controlID='validationFormik01' >
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
                        <Form.Check id="formPrivate" type="checkbox" label="Private" onClick={formik.handleChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Check id="formImportant" type="checkbox" label="Important" onClick={formik.handleChange} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col sm={{ offset: 2 }}>
                    <Button type="submit">Save</Button>
                </Col>
                <Col sm={{ offset: 1 }}>
                    <Button variant='secondary' onClick={props.handleCloseForm}>Cancel</Button>
                </Col>
            </Row>
        </Form>

    )

}

export default InputForm
