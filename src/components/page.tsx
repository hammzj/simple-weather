import React from 'react';
import {Box, Container} from '@mui/material'

export default function Page({children, ...props}): React.ReactElement {
    return (<Container {...props}>
            <Box>
                {children}
            </Box>
        </Container>
    )
}
