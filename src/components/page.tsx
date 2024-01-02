import React from 'react';
import {Box, Container} from '@mui/material'
import BottomNavBar from "./bottom.nav.bar";
import TopNavBar from "./top.nav.bar";

export default function Page({children, renderTopNavBar = true, ...props}): React.ReactElement {
    return (
        <Container
            {...props}>
            <Box
                id='page-content'
                sx={{
                paddingTop: 1,
                paddingBottom: 1,
            }
            }>
                {renderTopNavBar && <TopNavBar/>}
                {children}
            </Box>
            <BottomNavBar/>
        </Container>
    )
}
