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
        let localTodoList = JSON.parse(localStorage.getItem('todoList'))
        if (localTodoList == null) return localStorage.setItem('todoList', JSON.stringify([]))
        if (localTodoList.length != 0) {
            JSON.parse(localStorage.getItem('todoList')).forEach(element => {
                this.todoList.push(element)    
            });
        }
    },
    methods: {
        async addTodo() {
            if (this.todoText == null) {
                alert("Bir görev eklemeyi unutmayın.")
            }
            else {
                let todoData = { id: this.newTodoId, todo: this.todoText, time: this.currentTime() }
                this.todoList.push(todoData)
                let localTodoList = JSON.parse(localStorage.getItem('todoList'))
                localTodoList.push(todoData)
                localStorage.setItem('todoList', JSON.stringify(localTodoList))
                this.newTodoId++
                this.todoText = null
            }
        },
        removeTodo(id) {
            let localTodoList = JSON.parse(localStorage.getItem('todoList'))
            localTodoList = localTodoList.filter(todo => todo.id !== id)
            localStorage.setItem('todoList',JSON.stringify(localTodoList))
            this.todoList = localTodoList
        },
        markAsDone(id) {
            for (let index = 0; index < this.todoList.length; index++) {
                const element = this.todoList[index];
                if (element.id == id) {
                    this.finishedList.push(element)
                    this.removeTodo(id)
                }
            }
        },
        removeFinished(id) {
            this.finishedList = this.finishedList.filter(finished => finished.id !== id)
        },
        currentTime() {
            const current = new Date();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            return time;
        }
    }
}).mount("#app")