// import {welcome} from './welcome.js';  
import {Item} from './item.js';  
// import { ItemManager } from './itemmanager.js';
import { Character } from './character.js';
import { CharacterManager } from './charactermanager.js';
function gameLoop () {
    // c.tick(.1);
    cm.tick(.1);
}
// const c = new Character();
const cm = new CharacterManager();

export function main () {
    // const i = new Item('Cheese')
    var interval = setInterval(gameLoop, 100);
    // addItems();
    // const ij = JSON.stringify(i);
    // console.log(ij)
    // document.getElementById("demo").innerHTML = "Test Script";
}