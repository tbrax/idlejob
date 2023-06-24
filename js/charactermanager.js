import { Character } from './character.js';
export class CharacterManager {
    constructor() {
        this.c = new Character();
        this.setupInterface();
        this.setupGame();
    }
    
    getCurrentCharacter() {
        return this.c
    }

    createHandler (thisclass) {
        return function () {
          thisclass.exportCharacter();
        };
      }

    exportCharacter () {
        const c = this.getCurrentCharacter().getCharacterExport()
        console.log(c)
    }

    setupInterface () {
        const b0 = document.getElementById('saveButton');
        b0.onclick = this.createHandler(this);
    }

    setupGame () {
        this.getCurrentCharacter().displayItems();
    }

    tick(time) {
        this.getCurrentCharacter().tick(time);
    }
}