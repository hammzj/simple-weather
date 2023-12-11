import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {NOT_AVAILABLE_TEXT} from "./constants";

export default function PrecipitationItem({precipitation, ...props}) {
    return (
        <Tooltip title="Precipitation" id='precipitation'>
            <div style={{display: "flex", justifyContent: "center"}}>
                <WaterDropIcon/>
                <Typography>{precipitation ?? NOT_AVAILABLE_TEXT}</Typography>
            </div>
        </Tooltip>
    )
}
