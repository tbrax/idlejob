import {welcome} from './welcome.js';  
import {Item} from './item.js';  

export function main () {
    const i = new Item('Cheese')
    console.log(i.getName())
    console.log(welcome('test'))
    document.getElementById("demo").innerHTML = "Test Script";
}