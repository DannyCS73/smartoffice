import React, { useEffect, useState } from "react";

import { Typography, Card } from "@mui/material";
import { Sparklines, SparklinesLine } from 'react-sparklines';

function BlocksMinedGraph(){

    return (
        <div>
            <Card className="widget" sx={{ minWidth: 275 , minHeight: 325, maxHeight: 325, overflow: "scroll"}}>  
                <Typography variant="h5" className="graph-title">Tokens Earned</Typography>
                <div style={{"display" : "flex"}}>
                  <Sparklines data={[0, 1, 0, 0, 1, 0, 1, 0,1,1]} height={40}>
                    <SparklinesLine color="blue" />
                  </Sparklines>
                </div>
                
              

                <div style={{"margin":"auto", "textAlign":"center"}}>
                </div>
            </Card>
        </div>
    )
}

export default BlocksMinedGraph;