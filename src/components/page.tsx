import React from 'react';
import {Box, Container} from '@mui/material'
import BottomNavBar from "./bottom.nav.bar";
import TopNavBar from "./top.nav.bar";

export default function Page({children, renderTopNavBar = true, ...props}): React.ReactElement {
    return (<Container {...props}>
            <Box padding='2em'>
                {renderTopNavBar && <TopNavBar/>}
                {children}
            </Box>
            <BottomNavBar/>
        </Container>
    )
}
