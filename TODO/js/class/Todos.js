
/* import { Task } from './Task.js';

class Todos {
    #tasks = [];
    #backend_url = '';

    constructor(url) {
        this.#backend_url = url;
    }

    getTasks = () => {
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.#readJson(json)
                resolve(this.#tasks);
            }, error => {
                reject(error);
            })
        })
    }

    #readJson = (tasksAsJson) => {
        if (!Array.isArray(tasksAsJson)) {
            console.error("Tasks data is not in the expected format.");
            return;
        }
        console.log(tasksAsJson) // troubleshooting  message
        tasksAsJson.forEach(node => {
            const task = new Task(node.id, node.description);
            this.#tasks.push(task);
        });
    }

    #addToArray = (id, text) => {
        const task = new Task(id, text);
        this.#tasks.push(task);
        return task;
    }
    
    removeTask = (id) => {  
        return new  Promise(async(resolve, reject) => {
            fetch(this.#backend_url + "/delete/" + id, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((json) => {
                this.#removeFromArray(id)
                resolve(json.id)
            }, error => {
                reject(error);
            })
        })
    }
    
    #removeFromArray = (id) => {
        const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id);
        this.#tasks =  arrayWithoutRemoved
    }
    addTask = (text) => {
        return new Promise(async(resolve, reject) => {
            const json = JSON.stringify({description: text});
            fetch(this.#backend_url + "/new", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then((response) => response.json())
            .then((json) => {
                resolve(this.#addToArray(json.id, text));

            }, error => {
                reject(error);
        })
    })
  }
}

export { Todos }  */

import { Task } from './Task.js';

class Todos {
    #tasks = [];
    #backend_url = '';

    constructor(url) {
        this.#backend_url = url;
    }

    getTasks = () => {
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url)
            .then((response) => response.json())
            .then((json) => {
                this.#readJson(json)
                resolve(this.#tasks);
            }, error => {
                reject(error);
            })
        })
    }

    #readJson = (tasksAsJson) => {
        tasksAsJson.forEach(node => {
            const task = new Task(node.id, node.description);
            this.#tasks.push(task);
        });
    }

    #addToArray = (id, text) => {
        const task = new Task(id, text);
        this.#tasks.push(task);
        return task;
    }

    addTask = (text) => {
        return new Promise(async(resolve, reject) => {
            const json = JSON.stringify({description: text});
            fetch(this.#backend_url + "/new", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then((response) => response.json())
            .then((json) => {
                resolve(this.#addToArray(json.id, text));

            }, error => {
                reject(error);
            })
    })
}

    removeTask = (id) => {
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url + "/delete/" + id, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((json) => {
                this.#removeFromArray(id);
                resolve(json.id);
            }, error => {
                console.error('Error:', error);
                reject(error);
            })
        })
    }

    #removeFromArray = (id) => {
        const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id);
        this.#tasks = arrayWithoutRemoved;
        // return id;
    }

}

export { Todos }