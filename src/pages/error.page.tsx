import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import Page from "../components/page";
import TextLink from "../components/text.link";
import PATHS from "../routes/paths";

const GenericErrorMessage = (): React.ReactElement => {
    return (<Stack
        alignItems="center"
        direction='column'
        justifyContent='center'
        spacing={5}
    >
        <Typography variant={'h1'}>404: Not Found</Typography>
        <Typography>Sorry, an error occurred.</Typography>
        <TextLink href={PATHS.INDEX}>Go back to home page</TextLink>
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
}
