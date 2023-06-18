export class Unlock {
    constructor(name, displayname) {
        this.name = name;
        this.displayname = displayname;
        this.resultonce = null;
        this.resultactive = null;
        this.unlockcriteria = null;
        this.unlocked = false;
    }
}