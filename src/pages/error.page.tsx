import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const GenericErrorMessage = () => {
    return (<Box>
        <Typography variant={'h1'}>404 Not Found</Typography>
        <Typography>Sorry, an error occurred.</Typography>
    </Box>);
}

export default function ErrorPage(props) {
    return (
        <Container>
            <GenericErrorMessage/>
        </Container>
    )
};
