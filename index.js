// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
const input = document.getElementById("state-input")
const button = document.getElementById("fetch-alerts")
const errorMessage = document.getElementById("error-message")
const displayAlert = document.getElementById("alerts-display")
button.addEventListener("click",()=>{
    const state = input.value.toUpperCase()
    fetchWeatherAlerts(state)
})
// Your code here!
function fetchWeatherAlerts(state){
    displayAlert.innerHTML=""
    errorMessage.textContent =""
    errorMessage.classList.remove("hidden")
    if(!state){
        showErrormessage("please enter a state abbreviation")
        return
    }

fetch(`https://api.weather.gov/alerts/active?area=${state}`,)
.then(response=>{
    if (!response.ok){
        throw new Error("failed to fetch weather alert")
    }
    return response.json()
})
.then(data=>{
displayAlertsData(data)
input.value=""

errorMessage.textContent=""
errorMessage.classList.add("hidden")
})
.catch((errorObject)=>{
    showErrormessage(errorObject.message)
    
})
}
function displayAlertsData(data){


displayAlert.innerHTML=""

const summary = document.createElement("h2")
summary.textContent = `${data.title}: ${data.features.length}`
displayAlert.appendChild(summary)
 const ul = document.createElement("ul")

data.features.forEach(alert=>{
    const li = document.createElement("li")
    li.textContent = alert.properties.headline
    ul.appendChild(li)
  
})
  displayAlert.appendChild(ul)
}
function showErrormessage(message){
errorMessage.textContent = message
errorMessage.classList.add("hidden")
errorMessage.classList.remove("hidden")
}