import PrecipitationChance from '../../../src/components/precipitation.chance';
import PrecipitationChanceObject from '../../page_objects/components/precipitation.chance.object'
import {NOT_AVAILABLE_TEXT} from "../../../src/components/constants";


describe(PrecipitationChance.name, function () {
    it('has an icon', function () {
        cy.mount(<PrecipitationChance/>);
        const pio = new PrecipitationChanceObject();

        pio.svg.should('exist');
    });

    it('has hover text to describe the icon', function () {
        cy.mount(<PrecipitationChance/>);
        const pio = new PrecipitationChanceObject();

        pio.container.trigger('mouseover');

        cy.get(`.MuiTooltip-tooltip`).should('contain.text', 'Precipitation chance');
    });

    it('displays the chance for precipitation', function () {
        const pio = new PrecipitationChanceObject();

        cy.mount(<PrecipitationChance precipitation='2 inch'/>);
        pio._assertValue('2 inch');

        cy.mount(<PrecipitationChance precipitation='0.5 inch'/>);
        pio._assertValue('0.5 inch');
    });

    it('displays default text when there is no data provided', function () {
        cy.mount(<PrecipitationChance/>);
        const pio = new PrecipitationChanceObject();

        pio._assertValue(NOT_AVAILABLE_TEXT);
    });
})
