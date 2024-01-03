import {Link} from "react-router-dom";
import {Typography, TypographyProps} from "@mui/material";
import React from "react";

interface TextLinkProps {
    href: string;
    children: any;
    typographyProps?: TypographyProps;
}

const typographyStyle = {
    color: 'primary.contrastText',
    "&:before": {
        color: "#000000",
        textDecoration: "underline #000000"
    },
    "&:after": {
        color: "#000000",
        textDecoration: "underline #000000"
    }
};

export default function TextLink(props: TextLinkProps): React.ReactElement {
    return (
        <Link to={props.href}>
            <Typography {...props.typographyProps} sx={typographyStyle}>{props.children}</Typography>
        </Link>);
}
