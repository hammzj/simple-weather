import React from "react";
import { Divider, Link as MuiLink, Stack, Typography } from "@mui/material";
import Page from "../components/page";
import {
    CC_LICENSE_LINK,
    CYPRESS_IO_HOMEPAGE,
    GITHUB_AUTHOR_LINK,
    GITHUB_REPOSITORY_LINK,
    MATERIAL_UI_HOMEPAGE,
    NODEJS_HOMEPAGE,
    OPEN_METEO_HOMEPAGE,
    REACT_DEV_HOMEPAGE,
    PLAIN_TEXT_SPORTS_HOMEPAGE,
    TYPESCRIPT_HOMEPAGE,
} from "../constants";

const PageLink = ({ href, text }) => {
    //Using underline because it's easier to control with Mui
    return (
        <MuiLink sx={{ color: "primary.contrastText" }} href={href}>
            <u>{text}</u>
        </MuiLink>
    );
};

export default function AboutPage(): React.ReactElement {
    return (
        <Page>
            <Stack
                direction='column'
                textAlign='start'
                justifyContent='center'
                alignItems='center'
                padding='1em'>
                <Typography variant='h1' paddingBottom='0.5em'>
                    About
                </Typography>
                <Stack direction='column' spacing={2}>
                    <Typography>
                        <b>Simple Weather</b> was built for two reasons: as a way for me to practice
                        and maintain my web development skills using current frameworks and
                        full-stack development techniques, and to provide a clear implementation of
                        weather forecast data. The website is composed using simple design to convey
                        only necessary information while being easy to navigate. There are many web
                        applications today that are cluttered with competing content, like empty
                        spaces filled with animated advertisements, chatbot notifications, popup
                        dialogs on page loads, and options hidden behind many menus. It can be a
                        distracting experience that requires a strong focus in order to find the
                        desired information. Therefore, I tried to go back to the basics with a
                        comfortable style in this application.
                    </Typography>

                    <Typography>
                        I'd like to give thanks to{" "}
                        <PageLink text='plaintextsports.com' href={PLAIN_TEXT_SPORTS_HOMEPAGE} />{" "}
                        from "CodeIsTheEnd" for serving as inspiration as well. It is a wonderful
                        representation of using a simple design to provide sports updates.
                    </Typography>

                    <Divider />

                    <Typography>
                        This website frontend uses{" "}
                        <PageLink text='Node-js' href={NODEJS_HOMEPAGE} />,{" "}
                        <PageLink text='TypeScript' href={TYPESCRIPT_HOMEPAGE} />,{" "}
                        <PageLink text='React' href={REACT_DEV_HOMEPAGE} />,{" "}
                        <PageLink text='Material UI' href={MATERIAL_UI_HOMEPAGE} />, and is tested
                        with <PageLink text='Cypress' href={CYPRESS_IO_HOMEPAGE} />. The backend
                        services utilize the{" "}
                        <PageLink text='Open-Meteo API' href={OPEN_METEO_HOMEPAGE} />, licensed
                        under the{" "}
                        <PageLink
                            text='Attribution 4.0 International (CC BY 4.0)'
                            href={CC_LICENSE_LINK}
                        />{" "}
                        which pulls from various weather models across the world. Take note that the
                        API may only update the data in intervals ranging between fifteen minutes up
                        to an hour, so please check their homepage to see refresh rates of their
                        forecasting sources.
                    </Typography>

                    <Typography>
                        I hope that this website provides a very fluid and relaxed experience.
                    </Typography>

                    <Divider />

                    <Typography>
                        For any information about this website or to report issues, please respond
                        through{" "}
                        <PageLink
                            text='the issue tracker on the repository'
                            href={GITHUB_REPOSITORY_LINK}
                        />{" "}
                        or to me at my{" "}
                        <PageLink text='GitHub profile, @hammzj' href={GITHUB_AUTHOR_LINK} />.
                    </Typography>
                </Stack>
            </Stack>
        </Page>
    );
}
