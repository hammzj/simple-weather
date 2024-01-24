import * as utils from "../../../src/components/utils";
import { WeatherCode } from "../../../src/services/open_meteo_api/forecast_api";
import { weatherCodeToText } from "../../../src/components/utils";

describe("Utility functions", function () {
    context(utils.weatherCodeToText.name, function () {
        it("produces a readable name", () => {
            expect(weatherCodeToText(WeatherCode.MAINLY_CLEAR)).to.eq("Mainly clear");
            expect(weatherCodeToText(WeatherCode.THUNDERSTORM)).to.eq("Thunderstorm");
            expect(weatherCodeToText(WeatherCode.DEPOSITING_RIME_FOG)).to.eq("Depositing rime fog");
            expect(weatherCodeToText(-1)).to.eq("N/A");
        });
    });
});
