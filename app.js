const app = Vue.createApp({
    data() {
        return {
            title: "VueJS To Do App",
            todoText: null,
            todoList: [],
            finishedList: [],
            newTodoId: 1,
            datetime: "14-06-22 / 01:36"
        }
    },
    methods: {
        addTodo() {
            if (this.todoText == null) {
                alert("Bir görev eklemeyi unutmayın.")
            }
            else {
                this.todoList.push({id:this.newTodoId, todo: this.todoText, time: this.currentTime()})
                this.newTodoId++
            }
        },
        removeTodo(id){
            this.todoList = this.todoList.filter(todo => todo.id !== id)
        },
        markAsDone(id){
            for (let index = 0; index < this.todoList.length; index++) {
                const element = this.todoList[index];
                if(element.id == id){
                    this.finishedList.push(element)
                    this.removeTodo(id)
                }
            }
        },
        removeFinished(id){
            this.finishedList = this.finishedList.filter(finished => finished.id !== id)
        },
        currentTime() {
            const current = new Date();
            const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            return time;
        }
    }
}).mount("#app")