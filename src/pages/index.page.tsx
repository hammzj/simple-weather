import React from "react";
import Page from '../components/page';
import LocationSearchForm from "../components/location.search.form";

export default function IndexPage(): React.ReactElement {
    return (
        <Page>
            <LocationSearchForm/>
        </Page>
    )
};
