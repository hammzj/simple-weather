import React from "react";
import {Box, Typography} from "@mui/material";

interface MessageProps {
    boxProps?: any;
    typographyProps?: any;
    value: string | number;
}

export default function Message(props: MessageProps): React.ReactElement {
    return (
        <Box alignContent='center' justifyContent='center' {...props.boxProps}>
            <Typography align='center' {...props.typographyProps}>{props.value}</Typography>
        </Box>
    )
}
