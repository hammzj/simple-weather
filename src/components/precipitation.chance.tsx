import React from "react";
import {Box, Tooltip, Typography} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {NOT_AVAILABLE_TEXT} from "../constants";

export default function PrecipitationChance({precipitation}) {
    return (
        <Tooltip title="Precipitation chance">
            <Box
                id='precipitation'
                display='flex'
                justifyContent='center'
                alignContent='center'
            >
                <WaterDropIcon/>
                <Typography
                    sx={{
                        marginLeft: 1,
                        fontSize: '0.9rem',
                        alignContent: 'right',
                    }}
                >{precipitation ?? NOT_AVAILABLE_TEXT}</Typography>
            </Box>
        </Tooltip>
    )
}
