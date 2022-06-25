const app = Vue.createApp({
    data() {
        return {
            title: "VueJS To Do App",
            todoText: null,
            todoList: [],
            finishedList: [],
            newTodoId: 1,
            todoIdList: []
        }
    },
    mounted() {
        let localNewTodoId = localStorage.getItem('newTodoId')
        if (localNewTodoId == null) localStorage.setItem('newTodoId', 1)
        let localTodoList = JSON.parse(localStorage.getItem('todoList'))
        if (localTodoList == null) localStorage.setItem('todoList', JSON.stringify([]))
        else if (localTodoList.length != 0) {
            JSON.parse(localStorage.getItem('todoList')).forEach(element => {
                this.todoList.push(element)
            });
        }
        let localFinishedList = JSON.parse(localStorage.getItem('finishedList'))
        if (localFinishedList == null) localStorage.setItem('finishedList', JSON.stringify([]))
        else if (localFinishedList.length != 0) {
            JSON.parse(localStorage.getItem('finishedList')).forEach(element => {
                this.finishedList.push(element)
            });
        }
    },
    methods: {
        addTodo() {
            if (this.todoText == null) {
                alert("Bir görev eklemeyi unutmayın.")
            }
            else {
                this.newTodoId = localStorage.getItem('newTodoId')
                let todoData = { id: this.newTodoId, todo: this.todoText, time: this.currentTime() }
                this.todoList.push(todoData)
                let localTodoList = JSON.parse(localStorage.getItem('todoList'))
                localTodoList.push(todoData)
                localStorage.setItem('todoList', JSON.stringify(localTodoList))
                this.newTodoId++
                localStorage.setItem('newTodoId', this.newTodoId)
                this.todoText = null
            }
        },
        removeTodo(id) {
            let localTodoList = JSON.parse(localStorage.getItem('todoList'))
            localTodoList = localTodoList.filter(todo => todo.id !== id)
            localStorage.setItem('todoList', JSON.stringify(localTodoList))
            this.todoList = localTodoList
        },
        markAsDone(id) {
            for (let index = 0; index < this.todoList.length; index++) {
                const element = this.todoList[index];
                if (element.id == id) {
                    this.finishedList.push(element)
                    this.removeTodo(id)
                    let localFinishedList = JSON.parse(localStorage.getItem('finishedList'))
                    localFinishedList.push(element)
                    localStorage.setItem('finishedList', JSON.stringify(localFinishedList))
                }
            }
        },
        removeFinished(id) {
            this.finishedList = this.finishedList.filter(finished => finished.id !== id)
            let localFinishedList = JSON.parse(localStorage.getItem('finishedList')).filter(finished => finished.id !== id)
            localStorage.setItem('finishedList', JSON.stringify(localFinishedList))
        },
        currentTime() {
            const current = new Date();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            return time;
        }
    }
}).mount("#app")