import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import React from "react";

export default function TextLink({href, children}) {
    return (<Link to={href}>
        <Typography
            sx={{color: 'black', textDecorationColor: 'black'}}
        >{children}</Typography>
    </Link>)
}
