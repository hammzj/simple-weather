import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import Page from "../components/page";

const GenericErrorMessage = (): React.ReactElement => {
    return (<Stack
        alignItems="center"
        direction='column'
        justifyContent='center'
    >
        <Typography variant={'h1'}>404 Not Found</Typography>
        <Typography>Sorry, an error occurred.</Typography>
    </Stack>);
}

export default function ErrorPage(): React.ReactElement {
    return (
        <Page renderTopNavBar={false}>
            <Box justifyContent='flex'
                 margin={3}>
                <GenericErrorMessage/>
            </Box>
        </Page>
    )
};
