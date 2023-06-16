export class JobManager {
    constructor (c) {
      this.jobs = [];
      this.character = c;
      this.initialJobs();
    }

    initialJobs () {
      const a0 = this.createSkill('hobo', 'Hobo');
      this.addSkill(a0);
    }
  }