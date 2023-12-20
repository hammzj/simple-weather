import React from "react";
import {RouterProvider} from "react-router-dom";
import "./App.css";
import router from "./routes/router";

export default function App() {
    return (
        <>
            <div>
                <RouterProvider router={router}/>
            </div>
        </>
    );
}

