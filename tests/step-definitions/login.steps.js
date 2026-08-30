const { createBdd } = require('playwright-bdd');
const logger = require('../utils/logger.js');

const { Given } = createBdd();

Given('The user logged into SuiteCRM', async ({  }) => {
    logger.info('User is already authenticated via SuiteCRM setup flow');
    //logged in through fixures auth setup
});