export class Criteria {
    constructor() {
      this.values = [];
      this.scale = [];
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

    getSingleScale (i, character, add) {
      const row = this.scale[i];
      if (row == undefined) {
        return 0;
      }
      if (row.add == add) {
        if (row.type == 'joblevel') {
          const j = character.getJobManager().getSkillLevel(row.name);
          return j * row.value;
        } else if (row.type == 'itemvalue') {
          const j = character.getItemManager().getItemValue(row.name);
          // const j = character.getJobManager().getSkillLevel(row.name);
          return j * row.value;
        } else if (row.type == 'skilllevel') {
          const j = character.getSkillManager().getSkillLevel(row.name);
          return j * row.value;
        }
      }
      return 0;
    }

    getTotalScale (character) {
      let scaleVal = 0;
      for (let i = 0; i < this.scale.length; i++) {
        const add = this.getSingleScale(i, character, 'value');
        scaleVal += add;
      }
      return scaleVal;
    }

    getTotalChance (character) {
      let chance = 1;
      for (let i = 0; i < this.values.length; i++) {
        const row = this.values[i];
        if (row.type == 'chance') {
          chance *= row.value;
        }
      }
      return chance + this.chanceBonus(character);
    }

    random0To1 () {
      return Math.random();
    }

    chanceBonus (character) {
      let chance = 0;
      for (let i = 0; i < this.scale.length; i++) {
        const row = this.scale[i];
        if (row.add == 'chance') {
          const add = this.getSingleScale(i, character, 'chance');
          chance += (add * row.value);
        }
      }
      return chance;
    }

    luckBasedChance (chance, character) {
      const chanceMade = chance + this.chanceBonus(character);
      if (this.random0To1() < chanceMade * this.characterChanceBonus(character)) {
        return true;
      }
      return false;
    }

    characterChanceBonus (character) {
      return 1;
    }

    metSingleCriteria(character, v) {
      if (v.type == 'itemvalue') {
        const im = character.getItemManager()
        return this.checkCompare(im.getItemValue(v.name), v)
      } else if (v.type == 'itemmaxvalue') {
        const im = character.getItemManager()
        return this.checkCompare(im.getItemMaxValue(v.name), v)
      } else if (v.type == 'joblevel') {
        const im = character.getJobManager()
        return this.checkCompare(im.getSkillLevel(v.name), v)
      } else if (v.type == 'chance') {
        return this.luckBasedChance(v.value, character);
      } else if (v.type == 'skilllevel') {
        const im = character.getSkillManager()
        return this.checkCompare(im.getSkillLevel(v.name), v);
      } else if (v.type == 'totaljoblevel') {
        const im = character.getJobManager()
        return this.checkCompare(im.totalSkillLevel(), v)
      } else if (v.type == 'totalskilllevel') {
        const im = character.getSkillManager()
        return this.checkCompare(im.totalSkillLevel(), v)
      }
      return true
    }

    metCriteria(character) {
      for (let i = 0; i < this.values.length; i++) {
        const v = this.values[i];
        const met = this.metSingleCriteria(character, v)
        if (!met) {
          return false
        }
      }
      return true
    }

    metCriteriaDisplay(character) {
      for (let i = 0; i < this.values.length; i++) {
        const v = this.values[i];
        const met = this.metSingleCriteria(character, v)
        if (!met) {
          if (v.type != 'chance') {
            return false;
          }
          
        }
      }
      return true
    }

    addItemName(name, type, value, compare='') {
      const r = {name, type, value, compare};
      this.values.push(r);
    }

    addScaleName(name, type, value) {
      const r = {name, type, value, add:'value'};
      this.scale.push(r);
    }

    addScaleAdd(name, type, value, add) {
      const r = {name, type, value, add};
      this.scale.push(r);
    }
  }