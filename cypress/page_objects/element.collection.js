import {isNil} from "lodash";

const clone = (original) => Object.assign(Object.create(Object.getPrototypeOf(original)), original);

/**
 * Base class for describing page objects and components, which have a collection of element selectors
 */
export default class ElementCollection {
    /**
     * @param baseContainerFn {function} This is a function to return the base selector that defines the container of the component/page.
     * From this element, everything else can be found from within it
     */
    constructor(baseContainerFn = () => cy.get(`html`)) {
        this._baseContainerFn = baseContainerFn;
    }

    /**
     * When an instance of this ElementCollection is scoped within another ElementCollection,
     * and multiples components of this type exist with that scope,
     * testing on any elements or even scoped ElementCollections (also using `.within()` within the child
     * is not possible without supplying an index.
     * Due to issues with cypress `.within()` function,
     * it will try to act upon every instance of the base container selector found, and therefore produce a Cypress error.
     *
     * Therefore, when needing to test a given instance of this scoped ElementCollection, set its `_scopedIndex` first.
     *
     * @param i {number}
     *
     * @example <summary>Multiple returned instances from a single parent</summary>
     const wvco = new WeatherViewContainerObject();
     //25 entries
     for (const [i, {mapped}] of hourly_weather.entries()) {
                const precipitationProbability = mapped.precipitation_probability || NOT_AVAILABLE_TEXT;

                //Produces ~25 instances of a WeatherSummaryAccordion within itself
                wvco.HourlyWeatherSummaryAccordion((hwsa) => {
                    hwsa.scopedIndex = i;

                    //Tests this element correctly since they're set within the scope of the child ElementCollection's container
                    hwsa.temperature.should('have.text', mapped.temperature);

                    //This would fail unless we set the scopedIndex, since it utilizes a `.within()` function
                    hwsa.WeatherIconObject(function (wio) {
                        wio.svg.should('exist');
                    });

                    //This would also fail
                    hwsa.PrecipitationChanceObject((pio) => {
                        pio._assertValue(precipitationProbability);
                    });
                });
                cy.wait(50);
            }
     });
     */
    set scopedIndex(i) {
        this._scopedIndex = i;
    }

    /**
     * This allows the `_baseContainerFn` to be chained, allowing to scope the instances of the base containers returned to a smaller set
     * of instances or even just an individual element. Useful for finding a single button from a list using its text, for example
     *
     * @param newBaseContainerFn {function} `function(origBaseContainerFn)` Chain off of the originalBaseContainerFn in the method body
     *
     * @example
     *     //Select only the button(s) with the specified button text
     *     if (buttonText) {
            this._buttonText = buttonText;
            this.updateBaseContainerFunction = (origFn) => {
                return origFn
                    .contains('span', this._buttonText)
                    .parents(this.#BASE_CONTAINER_ID);
                 }
            }
     */
    set updateBaseContainerFunction(newBaseContainerFn) {
        const origBaseContainerFn = this._baseContainerFn;
        delete this._baseContainerFn();
        this._baseContainerFn = () => newBaseContainerFn(origBaseContainerFn);
    }

    /**
     * Rerturns the base container. When `_scopedIndex` is set, then it will select the `i` indexed container.
     * @return {*}
     */
    get container() {
        return (!isNil(this._scopedIndex)) ?
            this._baseContainerFn().eq(this._scopedIndex) :
            this._baseContainerFn();
    }

    /**
     * Useful for when we need to test multiple scoped or indexed ElementCollection instances by setting `_scopedIndex`.
     * for creating element chains. "Cloning" the original allows us to avoid circular dependencies.
     * @return clonedSelf {ElementCollection}
     * @example <summary>Testing two different ElementCollection instances</summary>
     *      wvco.HourlyWeatherSummaryAccordionObject((obj) => {
            const firstAccordion = clone(obj);
            firstAccordion._scopedIndex = 0;

            const secondAccordion = clone(obj);
            secondAccordion._scopedIndex = 1;

            firstAccordion.container.should('have.class', 'Mui-expanded');
            secondAccordion.should('have.not.class', 'Mui-expanded');
        });
     * @private
     */
    __clone() {
        return clone(this);
    }
}
