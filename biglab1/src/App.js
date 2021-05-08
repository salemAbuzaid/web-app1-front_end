import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './js/navbar.js'
import SideBar from './js/sidebar.js'
import Container from 'react-bootstrap/Container'
import TaskList from './js/task_list'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import createTaskList from './js/task_list_model.js'
import { useState } from 'react'
import InputForm from './js/form.js'

let my_task_list = createTaskList();

let filter_list = ["All", "Important", "Today", "Next Week", "Private"]
let pages_list = ["All", "Important", "Today", "NextWeek", "Private"]

function App() {

  let [selected, setSelected] = useState(0);
  const chooseFilter = (index) => setSelected(index);
  let [taskAdded, setTaskAdded] = useState(undefined);

  const addTaskToList = (id, description, deadline, important, Private) => my_task_list.CreateAndAddTask(id, description, deadline, important, Private);
  const changeTaskAdded = () => setTaskAdded(t => !t);
  const deleteTaskFromList = (id) => my_task_list.DeleteTask(id);
  const modifyTaskInList = (id, description, deadline, important, Private) => my_task_list.ModifyTask(id, description, deadline, important, Private);

  return (

    <Router>

      <Container fluid className="m-0 p-0">

        <Row className="m-0 p-0">
          <Col className="m-0 p-0">
            <NavBar />
          </Col>
        </Row >
          {/*<Redirect to="/All"/>*/}

        <Row>

          <Switch>
            <Route exact path="/"
              render={() => <Redirect to="/All" />} />


            <Route path="/All" exact render={() =>
              <>
                <Col sm={4} className="collapse d-sm-block ml-2 p-0">
                  <SideBar filterList={filter_list} selected={0} choose={chooseFilter} pagesList={pages_list} />
                </Col>
                <Col className="p-3">
                  <TaskList ListOfTasks={my_task_list.filterAll()} filterName="All" deleteTask={deleteTaskFromList}
                    changeTaskAdded={changeTaskAdded} modifyTask={modifyTaskInList} />
                </Col>
              </>
            } />
            <Route path="/Important" render={() =>
              <>
                <Col sm={4} className="collapse d-sm-block ml-2 p-0">
                  <SideBar filterList={filter_list} selected={1} choose={chooseFilter} pagesList={pages_list} />
                </Col>
                <Col className="p-3">
                  <TaskList ListOfTasks={my_task_list.filterByImportant()} filterName="Important" deleteTask={deleteTaskFromList}
                    changeTaskAdded={changeTaskAdded} modifyTask={modifyTaskInList} />
                </Col>
              </>
            } />
            <Route path="/Today" render={() =>
              <>
                <Col sm={4} className="collapse d-sm-block ml-2 p-0">
                  <SideBar filterList={filter_list} selected={2} choose={chooseFilter} pagesList={pages_list} />
                </Col>
                <Col className="p-3">
                  <TaskList ListOfTasks={my_task_list.filterByToday()} filterName="Today" deleteTask={deleteTaskFromList}
                    changeTaskAdded={changeTaskAdded} modifyTask={modifyTaskInList} />
                </Col>
              </>
            } />
            <Route path="/NextWeek" render={() =>
              <>
                <Col sm={4} className="collapse d-sm-block ml-2 p-0">
                  <SideBar filterList={filter_list} selected={3} choose={chooseFilter} pagesList={pages_list} />
                </Col>
                <Col className="p-3">
                  <TaskList ListOfTasks={my_task_list.filterByNextWeek()} filterName="Next Week" deleteTask={deleteTaskFromList}
                    changeTaskAdded={changeTaskAdded} modifyTask={modifyTaskInList} />
                </Col>
              </>
            } />
            <Route path="/Private" render={() =>
              <>
                <Col sm={4} className="collapse d-sm-block ml-2 p-0">
                  <SideBar filterList={filter_list} selected={4} choose={chooseFilter} pagesList={pages_list} />
                </Col>
                <Col className="p-3">
                  <TaskList ListOfTasks={my_task_list.filterByPrivate()} filterName="Private" deleteTask={deleteTaskFromList}
                    changeTaskAdded={changeTaskAdded} modifyTask={modifyTaskInList} />
                </Col>
              </>
            } />

              <Route path="/" exact render={() =>
                  <>
                      <Col sm={4} className="collapse d-sm-block ml-2 p-0">
                          <SideBar filterList={filter_list} selected={0} choose={chooseFilter} pagesList={pages_list} />
                      </Col>
                      <Col className="m-1 p-0">
                          <TaskList ListOfTasks={my_task_list.filterAll()} filterName="All" deleteTask={deleteTaskFromList}
                                    changeTaskAdded={changeTaskAdded} modifyTask={modifyTaskInList} />
                      </Col>
                  </>
              } />
          </Switch>
        </Row>
        <Row className="justify-content-end fixed-bottom m-5">
          <InputForm addTask={addTaskToList} changeTaskAdded={changeTaskAdded} />
        </Row>
      </Container>
    </Router>
  );
}

export default App;
