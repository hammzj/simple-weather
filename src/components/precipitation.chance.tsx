import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { NOT_AVAILABLE_TEXT } from "../constants";

export default function PrecipitationChance({ precipitation }) {
    return (
        <Tooltip title='Precipitation chance'>
            <Box id='precipitation' display='flex' justifyContent='center' alignContent='center'>
                <i className={`wi wi-raindrop`} />
                <Typography
                    sx={{
                        marginLeft: 1.2,
                        fontSize: "0.9rem",
                        alignContent: "right",
                    }}>
                    {precipitation ?? NOT_AVAILABLE_TEXT}
                </Typography>
            </Box>
        </Tooltip>
    );
}
