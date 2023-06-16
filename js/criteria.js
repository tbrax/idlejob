export class Criteria {
    constructor() {
      this.cost = false;
      this.values = [];
    }

    checkCompare(itemvalue, v) {
      const checkvale = v.value
      if (v.compare == '>') {
        return itemvalue > checkvale
      }

      if (v.compare == '>=') {
        return itemvalue >= checkvale
      }

      if (v.compare == '<') {
        return itemvalue < checkvale
      }

      if (v.compare == '<=') {
        return itemvalue <= checkvale
      }

      if (v.compare == '=') {
        return itemvalue = checkvale
      }

      return true
    }

    metSingleCriteria(character, v) {
      if (v.type == 'itemvalue') {
        const im = character.getItemManager()
        return this.checkCompare(im.getItemValue(v.name), v)
      } else if (v.type == 'joblevel') {
        const im = character.getJobManager()
        return this.checkCompare(im.getSkillLevel(v.name), v)
      }
      return true
    }

    metCriteria(character) {
      for (let i = 0; i < this.values.length; i++) {
        const v = this.values[i]
        const met = this.metSingleCriteria(character, v)
        if (!met) {
          return false
        }
      }
      return true
    }

    addItemName(name, type, value, compare) {
      const r = {name, type, value, compare};
      this.values.push(r);
    }
  }