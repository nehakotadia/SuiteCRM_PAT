const logger = require('../utils/logger.js');

class OpportunitiesPage {
  constructor(page) {
    this.page = page;
    this.logger = logger;
  }

  async openOpportunitiesModule() {
    this.logger.info('Opening Opportunities module');
  }
}

module.exports = { OpportunitiesPage };
