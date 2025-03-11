// https://on.cypress.io/configuration
import "./commands";
import chaiColors from "chai-colors";
import { OpenMeteoWeatherForecastAPI } from "../../src/services/open_meteo_api";
import SimpleWeatherAPI from "../../src/services/api";

chai.use(chaiColors);
// chai.use(chaiString);
