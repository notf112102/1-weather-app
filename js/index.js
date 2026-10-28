let temp = document.getElementById("temp"); 
let city_name_inp = document.getElementById("city_name_inp");
let name_city = document.getElementById("name_city");  
let humidity = document.getElementById("humidity"); 
let wind_speed = document.getElementById("wind_speed"); 
let start = document.getElementById("start"); 
let key = "6bce9fdbb06cb2db1ae7c5e73688e70f"; 
let name = "new york"
let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}&units=metric`; 
window.onload = async() => {
    let obj = await fetch(url); 
    obj = await obj.json();
}
async function changes(){
    let val = city_name_inp.value;
    name = val;
    let err = false;  
    url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}&units=metric`;
    let obj; 
    try {
        obj = await fetch(url); 
        city_name_inp.value = "";
    }
    catch(e){
        console.log(e);
        err = true; 
    }
    if(!err){
        obj = await obj.json(); 
        temp.textContent = `${Math.round(obj.main.temp)}°c`;
        name_city.textContent = obj.name; 
        humidity.textContent = `${obj.main.humidity}%`; 
        wind_speed.textContent = `${obj.wind.speed} km/h`;
        let img_value;
        switch (obj.weather[0].main) {
            case "Clear": img_value = "clear.jpg"; break; 
            case "Clouds": img_value = "cloud.png"; break; 
            case "Drizzle": img_value = "drizzle.png"; break; 
            case "Mist": img_value = "mist.jpg"; break; 
            case "Rain": img_value = "rain.jpg"; break; 
            default: img_value = "snow.png"
        } 
        let img = document.getElementById("img"); 
        img.src = "./imgs/" + img_value; 
    }
}
start.addEventListener("click", changes); 
city_name_inp.addEventListener("keydown", function(event){
    if(event.key === "Enter") changes(); 
})