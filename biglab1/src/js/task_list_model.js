import dayjs from 'dayjs';

function TaskModel(id, description, deadline, important = false, Private = false) {
    this.id = id;
    this.description = description;
    this.important = important;
    this.Private = Private;
    this.deadline = deadline;

    this.isImportant = () => { return this.important; }
    this.isPrivate   = () => { return this.Private;   }

    /** 
     * Function to check if a date is today. Returns true if the date is today, false otherwise.
     * @param {*} date the javascript Date to be checked
     */
    this.isToday =  () => {
        const comparisonTemplate = 'YYYY-MM-DD';
        const now = dayjs();
        return this.deadline && (this.deadline.format(comparisonTemplate) === now.format(comparisonTemplate));
    }

    /** 
     * Function to check if a date is yesterday. Returns true if the date is yesterday, false otherwise.
     * @param {*} date the javascript Date to be checked
     */
     this.isYesterday = () => {
        const comparisonTemplate = 'YYYY-MM-DD';
        const yesterday = dayjs().subtract(1, 'day');
        return this.deadline && (this.deadline.format(comparisonTemplate) === yesterday.format(comparisonTemplate));
    }

    /** 
     * Function to check if a date is tomorrow. Returns true if the date is tomorrow, false otherwise.
     * @param {*} date the javascript Date to be checked
     */
    this.isTomorrow = () => {
        const comparisonTemplate = 'YYYY-MM-DD';
        const tomorrow = dayjs().add(1, 'day');
        return this.deadline && (this.deadline.format(comparisonTemplate) === tomorrow.format(comparisonTemplate));
    }

    /**
     * Function to check if a date is in the next week. Returns true if the date is in the next week, false otherwise.
     * @param {*} date the javascript Date to be checked
     */
     this.isNextWeek = () => {
         const tomorrow = dayjs().add(1, 'day');
         const nextWeek = dayjs().add(7, 'day');
         const ret = this.deadline && ( !this.deadline.isBefore(tomorrow,'day') && !this.deadline.isAfter(nextWeek,'day') );
         console.dir(this.deadline);
         console.log(ret);
         return ret;
     }

};

const TaskListModel = function () {

    let task_list = [];
    let lastID = 0;

    return {

        GetList: function () {
            return task_list;
        },

        AddTask: function (new_task) {
            new_task.id = lastID;
            lastID += 1;
            task_list.push(new_task);
        },

        CreateAndAddTask(id, description, deadline, important = false, Private = false){
            let new_task = new TaskModel(id, description, deadline, important, Private);
            new_task.id = lastID;
            lastID += 1;
            task_list.push(new_task);
        },

        DeleteTask: function(id){
            let index = 0;
            for (let element of task_list){
                if (element.id === id)
                    break;
                index += 1;
            }
            
            if (index < task_list.length) {
                task_list.splice(index, 1);
            }
        },

        ModifyTask: function(id, description, deadline, important, Private){
            let index = 0;
            for (let element of task_list){
                if (element.id === id)
                    break;
                index += 1;
            }

            if (index < task_list.length){
                task_list[index].description = description;
                task_list[index].deadline = deadline;
                task_list[index].important = important;
                task_list[index].Private = Private;
            }

        },

        filterAll: function(){
            return task_list.filter( () => true);
        },
    
        filterByImportant:function() {
            return task_list.filter((task) => task.isImportant());
        },
    
        filterByToday : function() {
            return task_list.filter( (task) => task.isToday() );
        },
    
        filterByNextWeek:function() {
            return task_list.filter( (task) => task.isNextWeek() );
        },
    
        filterByPrivate: function() {
            return task_list.filter( (task) => task.isPrivate() );
        }
    };
};

const createTaskList = function () {

    let task1 = new TaskModel(0, "Call home", dayjs('2021-05-25'), true, true);
    let task2 = new TaskModel(0, "Buy some groceries", dayjs('2021-05-10'), false, false);
    let task3 = new TaskModel(0, "Read books", dayjs('2021-05-26'), true, false);
    let task4 = new TaskModel(0, "Watch a movie", dayjs('2021-05-11'), false, true);
    let task5 = new TaskModel(0, "Sleep tight", dayjs('2021-05-12'), false, true);
    let task6 = new TaskModel(0, "Workout", dayjs('2021-05-29'), false, true);
    let task7 = new TaskModel(0, "Listen to bad music", dayjs('2021-05-30'), true, true);
    let task8 = new TaskModel(0, "Study Web Applications", dayjs('2021-05-15'), false, true);
    let task9 = new TaskModel(0, "Go for a run", dayjs('2021-05-06'), false, true);
    let task10 = new TaskModel(0, "Watch the football game", dayjs('2021-05-14'), false, true);
    let task11 = new TaskModel(0, "Take a shower", dayjs('2021-05-06'), false, true);


    let my_task_list = TaskListModel();
    my_task_list.AddTask(task1);
    my_task_list.AddTask(task2);
    my_task_list.AddTask(task3);
    my_task_list.AddTask(task4);
    my_task_list.AddTask(task5);
    my_task_list.AddTask(task6);
    my_task_list.AddTask(task7);
    my_task_list.AddTask(task8);
    my_task_list.AddTask(task9);
    my_task_list.AddTask(task10);
    my_task_list.AddTask(task11);

    return my_task_list;

}

export default createTaskList

