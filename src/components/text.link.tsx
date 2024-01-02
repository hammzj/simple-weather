import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import React from "react";

export default function TextLink({href, children}) {
    return (<Link to={href}>
        <Typography
            sx={{
                color: 'primary.contrastText',
                "&:before": {
                    color: "#000000",
                    textDecoration: "underline #000000"
                },
                "&:after": {
                    color: "#000000",
                    textDecoration: "underline #000000"
                }
            }}
        >{children}</Typography>
    </Link>)
}
