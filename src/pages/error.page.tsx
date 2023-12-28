import React from "react";
import {Box, Typography} from "@mui/material";
import Page from "../components/page";

const GenericErrorMessage = (): React.ReactElement => {
    return (<Box>
        <Typography variant={'h1'}>404 Not Found</Typography>
        <Typography>Sorry, an error occurred.</Typography>
    </Box>);
}

export default function ErrorPage(): React.ReactElement {
    return (
        <Page>
            <GenericErrorMessage/>
        </Page>
    )
};
