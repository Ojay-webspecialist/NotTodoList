import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-77025-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const notodoListInDB = ref(database, "notodoList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const notodolistEl = document.getElementById("notodo-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    
    inputValue=== "" ? "": push(notodoListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(notodoListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearnotodolistEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemTonotodolistEl(currentItem)
        }    
    } else {
        notodolistEl.innerHTML = "No items here... yet"
    }
})

function clearnotodolistEl() {
    notodolistEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemTonotodolistEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `notodoList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    notodolistEl.append(newEl)
}