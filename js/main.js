var homeList = document.getElementsByClassName("col");

window.onload = function(){
    $(".filter").each(function(){
        $(this).hide();
    });
  };

function showFilter(){
    $(".filter").toggle();
}

function validation(element){
    var re = new RegExp(/^[A-Za-z]+$/);
    var message = "";
    var validation = false;
    
    if(element.value !=="" && !element.value.match(re)){
        message = "only alphabetics are allowed";
        validation = true;
    }

    if(validation){
        element.classList.add("is-invalid");
        var div = document.createElement('div');
        var t = document.createTextNode(message);
        div.appendChild(t);
        div.classList.add("invalid-feedback");
        element.appendChild(div);
    }else{
        if(element.classList.contains("is-invalid")){
            element.classList.remove("is-invalid");
        }

    }
}


document.getElementById("searchBtn").addEventListener("click", search);
function search(){
    var sarch = document.getElementById("searchForm").value;
    var location = document.getElementById("searchLocation").value.toLowerCase();
    
   
    //display all Properties
    for (const key in homeList) {
        if (Object.hasOwnProperty.call(homeList, key)) {
            const element = homeList[key];
                element.style.display="block";
        }
    }
    
    //filter properties with seach form
    if(location !== null && location !== ""){
        for (const key in homeList) {
            if (Object.hasOwnProperty.call(homeList, key)) {
                const element = homeList[key];
                var homeLoc = element.querySelector("#location").innerText.toLowerCase();
                if(!homeLoc.startsWith(location)){
                    element.style.display="none";
                }
            }
        }
    }
}

//filter by status
document.getElementById("status").addEventListener("change", filter);

//filter by bedrooms number's
document.getElementById("bed").addEventListener("change", filter);

//filter by bathrooms number's
document.getElementById("bath").addEventListener("change", filter);

//filter by price
document.getElementById("price").addEventListener("change", filter);

//filter by containing swimming pool
document.getElementById("pool").addEventListener("change", checkBoxFilter);
function filter(){
    var status = document.getElementById("status").value;
    var beds = document.getElementById("bed").value;
    var baths = document.getElementById("bath").value;
    var price = document.getElementById("price").value;
    

    if(status !== ""){
        return filterbyStatus(status);
    }
    if(beds !== ""){
        return filterbyBed(beds);
    }
    if(baths !== ""){
        return filterbyBath(baths);
    }
    if(price !== ""){
        return filterbyPrice(price);
    }
    search();

}

function checkBoxFilter(){
    var checkedValue = document.getElementById("pool").checked;
    if(checkedValue){
        for (const key in homeList) {
            if (Object.hasOwnProperty.call(homeList, key)) {
                const element = homeList[key];
                var containsSwimmingPool = element.querySelector("#swim");
                if(containsSwimmingPool === null){
                    element.style.display="none";
                }
            }
        }
    }else{
        search();
    }
}

//not implemented yet
function filterbyStatus(status){
    search();

    for (const key in homeList) {
        if (Object.hasOwnProperty.call(homeList, key)) {
            const element = homeList[key];
            var statusValue = element.querySelector(".rubber").innerText.split(" ")[1];
            if(status  !== statusValue.toLowerCase()){
                element.style.display="none";
            }
        }
    }
}

function filterbyBed(beds){
    search();
    for (const key in homeList) {
        if (Object.hasOwnProperty.call(homeList, key)) {
            const element = homeList[key];
            var bedsNb = element.querySelector("#bed").innerText.split(" ")[0];
            if(beds !== "4+" && bedsNb !== beds){
                element.style.display="none";
            }
            if(beds === "4+" && bedsNb < beds){
                element.style.display="none"; 
            }
        }
    }
}

function filterbyBath(baths){
    search();
    for (const key in homeList) {
        if (Object.hasOwnProperty.call(homeList, key)) {
            const element = homeList[key];
            var bathsNb = element.querySelector("#bath").innerText.split(" ")[0];
            if(bathsNb !== baths){
                element.style.display="none";
            }
        }
    }
}

function filterbyPrice(price){
    search();
     //display all Properties
     for (const key in homeList) {
        if (Object.hasOwnProperty.call(homeList, key)) {
            const element = homeList[key];
                element.style.display="block";
        }
    }

    for (const key in homeList) {
        if (Object.hasOwnProperty.call(homeList, key)) {
            const element = homeList[key];
            var homePrice = element.querySelector("#price").innerText.substring(1);
            var priceTab = price.split(" - ");
            if(!(priceTab[0] < homePrice &&  priceTab[1] > homePrice)){
                element.style.display="none";
            }
            if(priceTab[0].trim() === "1,000,000" && homePrice > priceTab[0].trim()){
                element.style.display="block";
            }
        }
    }
}