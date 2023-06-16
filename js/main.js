// import {welcome} from './welcome.js';  
import {Item} from './item.js';  
// import { ItemManager } from './itemmanager.js';
import { Character } from './character.js';

function gameLoop () {
    c.tick(.1);
}
const c = new Character();

function setupGame () {
    c.displayItems();
}

export function main () {
    // const i = new Item('Cheese')
    setupGame();
    var interval = setInterval(gameLoop, 100);
    // addItems();
    // const ij = JSON.stringify(i);
    // console.log(ij)
    // document.getElementById("demo").innerHTML = "Test Script";
}