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
        <Container{...props}>
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
