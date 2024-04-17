if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    let taskInput = document.querySelector("#taskinput")
    let taskList = document.querySelector("#tasklist")

    taskInput.addEventListener("focus", () => {
        recognition.start()
    })
    recognition.onresult = (event) => {
        let translate = event.results[0][0].transcript
        taskInput.value = translate
        addTask()
    }

    function addTask() {
        let taskText = taskInput.value.trim()
        if (taskText !== "") {
            let taskItem = document.createElement("li")
            taskItem.innerHTML = `<span>${taskText}</span><button class="delete-btn" onclick="deleteTask(this)">Delete</button>`
            taskList.appendChild(taskItem)
            taskInput.value = ""
            taskInput.focus()
        }
        recognition.onend = () => {
            recognition.stop()
        }

    }
    
    function deleteTask(e) {
        let liParent=e.parentNode
        taskList.removeChild(liParent)
    }

} else {
    alert("your browser cant access mike...")
}