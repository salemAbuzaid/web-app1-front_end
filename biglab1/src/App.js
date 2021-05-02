//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar.js'
import SideBar from './sidebar.js'
import Container from 'react-bootstrap/Container'
import TaskList from './task_list'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { PlusCircle, PlusCircleFill } from 'react-bootstrap-icons'
import dayjs from 'dayjs'


import createTaskList from './task_list_model.js'
import {useState} from 'react'
import InputForm from './form.js'

let my_task_list = createTaskList();

let filter_list = ["All", "Important", "Today", "Next Week", "Private"]

function App() {


  let [selected, setSelected] = useState(0);
  const chooseFilter = (index) => setSelected(index);
  let [taskAdded, setTaskAdded] = useState(undefined);

  const addTaskToList = (id, description, deadline, important, Private) => my_task_list.CreateAndAddTask(id, description, deadline, important, Private);
  const changeTaskAdded = () => setTaskAdded(t => !t);

  return (
    <Container fluid className="m-0 p-0">

      <Row className="m-0 p-0">
        <Col className="m-0 p-0">
        <NavBar />
        </Col>
      </Row >

      <Row >
        <Col sm={4} className="collapse d-sm-block ml-2 p-0">
          <SideBar filterList = {filter_list} selected = {selected} choose = {chooseFilter}/>
        </Col>
        <Col className="m-1 p-0">
          {selectFilter(selected, taskAdded)}
        </Col>
      </Row>


    <Row className="justify-content-end fixed-bottom m-5">
     <InputForm addTask = {addTaskToList} changeTaskAdded={changeTaskAdded} />
     

    </Row>
    </Container>
  );
}


function selectFilter(selected, taskAdded, changeTaskAdded){


  if (selected === 0)
    return  <TaskList ListOfTasks = {my_task_list.filterAll()} filterName = "All"/>
  else if (selected === 1)
    return  <TaskList ListOfTasks = {my_task_list.filterByImportant()} filterName = "Important" />
  else if (selected === 2)
    return  <TaskList ListOfTasks = {my_task_list.filterByToday()} filterName = "Today"/>
  else if (selected === 3)
    return  <TaskList ListOfTasks = {my_task_list.filterByNextWeek()} filterName = "Next Week"/>
  else if (selected === 4)
    return  <TaskList ListOfTasks = {my_task_list.filterByPrivate()} filterName = "Private"/>

}


export default App;
