import chaiColors from "chai-colors";
import {MemoryRouter} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {lightTheme as baseTheme} from "../../src/theme";
import {mount} from "cypress/react18";
import "../../src/fonts";
import "../../src/index.css";
import "../../src/weather_icons/index.jsx";
import "./commands";

chai.use(chaiColors);

Cypress.Commands.add("mount", (component, options = {}) => {
    const { routerProps = { initialEntries: ["/"] }, theme, ...mountOptions } = options;
    //Default to base theme if not given
    const wrapped = (
        <MemoryRouter {...routerProps}>
            <ThemeProvider theme={theme ?? baseTheme}>
                <CssBaseline />
                {component}
            </ThemeProvider>
        </MemoryRouter>
    );

    // Wrap any parent components needed
    // ie: return mount(<MyProvider>{component}</MyProvider>, options)
    return mount(wrapped, mountOptions);
});
