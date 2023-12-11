import React from "react";
import {Typography} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import {NOT_AVAILABLE_TEXT} from "./constants";

export default function PrecipitationItem({precipitation, ...props}) {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <WaterDropIcon/>
            <Typography id='precipitation-item'>{precipitation ?? NOT_AVAILABLE_TEXT}</Typography>
        </div>
    )
}
