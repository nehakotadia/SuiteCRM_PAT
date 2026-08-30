const logger = require('../utils/logger.js');

class LeadsPage {
  constructor(page) {
    this.page = page;
    this.logger = logger;
  }

  async openLeadsModule() {
    this.logger.info('Opening Leads module');
  }
}

module.exports = { LeadsPage };
