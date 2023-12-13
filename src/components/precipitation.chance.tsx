import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {NOT_AVAILABLE_TEXT} from "./constants";

export default function PrecipitationChance({precipitation}) {
    return (
        <Tooltip title="Precipitation chance">
            <div style={{display: "flex", justifyContent: "center"}} id='precipitation'>
                <WaterDropIcon/>
                <Typography sx={{fontSize: '0.9rem'}}>{precipitation ?? NOT_AVAILABLE_TEXT}</Typography>
            </div>
        </Tooltip>
    )
}
