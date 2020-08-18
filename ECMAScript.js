let prices = {
    small: 2.45,
    medium: 2.65,
    large: 2.85,
    extraCream: 0.5,
    syrup: 0.25
}
document.getElementById('sd').innerText += prices.small;
document.getElementById('md').innerText += prices.medium;
document.getElementById('ld').innerText += prices.large;
document.getElementById('ec').innerText += prices.extraCream;
document.getElementById('syp').innerText += prices.syrup;
const getMilkValues = () =>{
    let Drink = document.getElementById('drinkSelector').value;
    document.getElementById('currentDrink').innerText = Drink;
    p = prices.medium;
    document.getElementById('cost').innerText = p;
    if(Drink == "latte" || Drink == "cappuccino" || Drink == "flat white"){
        document.getElementById("milkRow").innerHTML = `<td><Label>Type of Milk: </Label></td>
          <td><select id="milkSelector">
              <option value="whole">Whole</option>
              <option value="skimmed">Skimmed</option>
              <option value="semi-skimmed" selected>Semi-skimmed</option>
              <option value="coconut">Coconut</option>
              <option value="soya">Soya</option>
          </select></td>`;
    }else{
        document.getElementById("milkRow").innerHTML ="";
    }
}
let p = 0;
let overallcost = 0;
let overallOrder = [];
const getPrice = () =>{
     p = document.getElementById('sizeSelector').value
    if(p == "small"){
        p = prices.small;
    }else if(p == "medium"){
        p = prices.medium;
    }else {
        p = prices.large;
    }
    document.getElementById('cost').innerHTML = p;
}
const getExtra = () =>{
    let extra = document.getElementById('extra').value;
    if(extra == "creame"){
        p+=prices.extraCream;
        document.getElementById('cost').innerText = p;
    }
}
const addSypShots = () =>{
    let numberOfShots = document.getElementById('shots').value;
    p+= numberOfShots*prices.syrup;
    document.getElementById('cost').innerText = p;
}
const addToFavourite = () =>{
    let drinkName = document.getElementById('drinkSelector').value;
    if(drinkName !=""){
        document.getElementById('drinkSelectWarning').innerText = "";
        let sizeOfDrink = document.getElementById('sizeSelector').value
        let extra = document.getElementById('extra').value;
        let shots = document.getElementById('shots').value;
        let milk;
        if(document.getElementById('milkSelector')){
            milk = document.getElementById('milkSelector').value;
        }else{
            milk = "";
        }
        let favouriteDrink = {
            NameOFDrink: drinkName,
            SizeOFDrink: sizeOfDrink,
            TypeOFMilk: milk,
            Extras: extra,
            NoOfShots: shots,
            price: p
        };
       
    localStorage.setItem("favouriteDrink" , JSON.stringify(favouriteDrink));
    }else{
        document.getElementById('drinkSelectWarning').innerText = "Please select a valid drink!";
    }
}
document.getElementById('form').addEventListener("click" ,()=>{
    event.preventDefault();
});
let index;
if(localStorage){
    index = JSON.parse(localStorage.getItem("orders"));
}else{
    index = 0;
}
const addToOrder = () =>{
        let drinkName = document.getElementById('drinkSelector').value;
        if(drinkName!=""){
            let sizeOfDrink = document.getElementById('sizeSelector').value
            let extra = document.getElementById('extra').value;
            let shots = document.getElementById('shots').value;
            let milk;
            if(document.getElementById('milkSelector')){
                milk = document.getElementById('milkSelector').value;
            }else{
                milk = "";
            }
            index +=1;
            localStorage.setItem("orders" , JSON.stringify(index));
            let x = JSON.parse(localStorage.getItem("orders"));
            if(x%10 == 0){
                p = 0;
                alert("Your drink is free 😊");
            }else{
                p = p;
            }
            overallcost += p;
            let newDrink = {
                NameOFDrink: drinkName,
                SizeOFDrink: sizeOfDrink,
                TypeOFMilk: milk,
                Extras: extra,
                NoOfShots: shots,
                price: p
            };
            overallOrder.push(newDrink);
            let overallorder =  document.getElementById('overall');
            overallorder.innerText+= newDrink.NameOFDrink +" , ";
            document.getElementById('overallCost').innerText = overallcost;
        document.getElementById('form').reset();
        document.getElementById('currentDrink').innerText = "";
        document.getElementById('cost').innerText = 0;
        document.getElementById('drinkSelectWarning').innerText = "";
        p=0;
        }else{
            document.getElementById('drinkSelectWarning').innerText = "Please select a valid drink!";
        }

}

const placeOrder = () =>{
    overallcost = 0;
    alert("Thankyou for your dear custom. Enjoy your Drink!");
    document.getElementById('currentDrink').innerText = "";
    document.getElementById('cost').innerText = 0;
    document.getElementById('overall').innerText = "";
    document.getElementById('overallCost').innerText = 0;
}

const orderFavourite = () =>{
    let drinks = JSON.parse(localStorage.getItem("favouriteDrink"));
    document.getElementById('overall').innerText += drinks.NameOFDrink +" , ";
    overallcost +=drinks.price; 
    document.getElementById('overallCost').innerText = overallcost;
    index += 1;
    localStorage.removeItem("orders");
    localStorage.setItem("orders" , JSON.stringify(index));
}