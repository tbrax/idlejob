
import {Item} from '/item.js';


function main () {

    const i = Item('Test SCript')

    console.log(i.getName())
    document.getElementById("demo").innerHTML = "Test Script";
}

main();
