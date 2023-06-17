import { Criteria } from './criteria.js';
export class Result {
    constructor() {
      this.cost = false;
      this.values = [];
      this.mult = 1;
    }

    getSpeedBonus (character) {
      let bonus = 0;
      for (let i = 0; i < this.values.length; i++) {
        const row = this.values[i];
        if (row.type == 'speed') {
          const criteria = row.criteria;
          let newResult = this.getPerformCopy(i);
          this.addScaling(newResult, criteria, character)
          if (criteria != null) {
            if (criteria.metCriteria(character))
            {
              bonus += newResult.value;
            }
          } else {
            bonus += newResult.value;
          }
        }
      }
      return bonus;
    }

    getRowChance (row, character) {
      if (row.criteria == null) {
        return 1;
      }
      return row.criteria.getTotalChance(character);
    }

    getResultRowDisplayName (i, character) {
      let newResultRow = this.getPerformCopy(i);

      this.addScaling(newResultRow, newResultRow.criteria, character);
      let chance = this.getRowChance(newResultRow, character);
      let add = '';
      if (chance < 1) {
        add += `(${(chance * 100).toFixed(0)}%)`
      }
      if (newResultRow.type == "itemvalue") {
        const im = character.getItemManager()
        return `${Math.abs(newResultRow.value)} ${im.getDisplayName(newResultRow.name)} ${add}`;
      } else if (newResultRow.type == "skillexp") {
        const m = character.getSkillManager()
        return `${Math.abs(newResultRow.value)} ${m.getDisplayName(newResultRow.name)} SXP`;
      } else if (newResultRow.type == "jobexp") {
        const m = character.getJobManager()
        return `${Math.abs(newResultRow.value)} ${m.getDisplayName(newResultRow.name)} JXP`;
      } else if (newResultRow.type == "gainvalue") {
        const m = character.getJobManager()
        return `${Math.abs(newResultRow.value)} ${m.getDisplayName(newResultRow.name)} JXP`;
      }

      return `${Math.abs(newResultRow.value)} ${newResultRow.name}`;
    }

    performSingleResult (resultRow, character) {
      const type = resultRow.type;
      if (type == "itemvalue" || type == "gainvalue") {
        const im = character.getItemManager();
        im.itemAction(resultRow)
      } else if (type == "skillexp") {
        const sm = character.getSkillManager();
        sm.itemAction(resultRow)
      } else if (type == "jobexp") {
        const jm = character.getJobManager();
        jm.itemAction(resultRow);
      }
    }

    addScaling(result, criteria, character) {
      let baseScale = this.getMult();

      if (criteria == null) {
        result.value *= baseScale;
        return;
      }
      baseScale += criteria.getTotalScale(character);
      result.value *= baseScale;
    }

    performResultList (character) {
      const rs = this.getValues();
      for (let i = 0; i < rs.length; i++) {
        const rsm = rs[i]
        const criteria = rsm.criteria;
        let newResult = this.getPerformCopy(i);
        this.addScaling(newResult, criteria, character)

        if (criteria != null) {
          if (criteria.metCriteria(character))
          {
            this.performSingleResult(newResult, character)
          }
        } else {
          this.performSingleResult(newResult, character)
        }
      }
    }

    getPerformCopy (i) {
      const rsm = this.values[i];
      const newRm = {name:rsm.name, type:rsm.type, value:rsm.value, criteria: rsm.criteria}
      return newRm;
    }

    makeCost () {
      this.setCost(true);
    }

    setCost (set) {
      this.cost = set
    }

    isCost () {
      return this.cost
    }

    getMult () {
      return this.mult;
    }

    setMult (value) {
      this.mult = value;
    }

    getValues () {
      return this.values;
    }

    addItemName(name, type, value) {
      const r = {name, type, value, criteria: null};
      this.values.push(r);
    }

    addItemCriteria(name, type, value, criteria) {
      const r = {name, type, value, criteria};
      this.values.push(r);
    }

    addItemChance(name, type, value, chance) {
      const criteria = new Criteria();
      criteria.addItemName('chance', 'chance', chance, 0);
      const r = {name, type, value, criteria};
      this.values.push(r);
    }
  }