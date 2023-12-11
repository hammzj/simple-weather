import React from "react";
import {Typography} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

export default function PrecipitationItem({precipitation, ...props}) {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <WaterDropIcon/>
            <Typography id='precipitation-item'>{precipitation}</Typography>
        </div>
    )
}
