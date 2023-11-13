// https://on.cypress.io/configuration
require("./commands");
const chaiColors = require("chai-colors");
const chaiString = require("chai-string");

chai.use(chaiColors);
chai.use(chaiString);
