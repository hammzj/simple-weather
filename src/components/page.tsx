import React from 'react';
import {Box, Container} from '@mui/material'
import BottomNavBar from "./bottom.nav.bar";
import TopNavBar from "./top.nav.bar";

export default function Page({
                                 children,
                                 renderTopNavBar = true,
                                 renderBottomNavBar = true,
                                 ...props
                             }): React.ReactElement {
    return (
        <Container
            sx={{
                marginTop: 3,
                marginBottom: 3,
                ...props.sx
            }}
            {...props}>
            {renderTopNavBar && <TopNavBar/>}
            <Box
                id='page-content'
                sx={{paddingTop: 1, paddingBottom: 1}}>
                {children}
            </Box>
            {renderBottomNavBar && <BottomNavBar/>}
        </Container>
    )
}
