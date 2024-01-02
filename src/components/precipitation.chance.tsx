import React from "react";
import {Box, Tooltip, Typography} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {NOT_AVAILABLE_TEXT} from "../constants";

export default function PrecipitationChance({precipitation}) {
    return (
        <Tooltip title="Precipitation chance">
            <Box style={{display: "flex", justifyContent: "center", alignContent: 'center'}} id='precipitation'>
                <WaterDropIcon />
                <Typography sx={{
                    marginLeft: 1,
                    fontSize: '0.9rem',
                    align: 'right',
                }}>{precipitation ?? NOT_AVAILABLE_TEXT}</Typography>
            </Box>
        </Tooltip>
    )
}
