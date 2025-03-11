import { Link } from "react-router-dom";
import { Typography, TypographyProps } from "@mui/material";
import React from "react";

interface TextLinkProps {
    href: string;
    children: any;
    typographyProps?: TypographyProps;
}

export default function TextLink(props: TextLinkProps): React.ReactElement {
    return (
        //Using underline because it's easier to control with Mui
        <Link to={props.href}>
            <Typography {...props.typographyProps} sx={{ color: "primary.contrastText" }}>
                <u>{props.children}</u>
            </Typography>
        </Link>
    );
}
