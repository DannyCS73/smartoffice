import NavBar from "../../NavBar";
import { useState, useEffect } from "react";
import ValBlock from "./ValBlock"
import Row from 'react-bootstrap/Row';

export default function Validate(){

    const [blocks, setBlocks] = useState() 

    useEffect(() => {
        get_blocks_to_validate()
    },[])

    function get_blocks_to_validate(){
        fetch(`http://127.0.0.1:8080/blocks_to_mine/${JSON.parse(localStorage.getItem('user_id'))}`, {
            method: 'GET',
            }).then(res => res.json()).then(data => {
                console.log(data.blocks)
                var count = 0
                setBlocks(data.blocks.map((block) => {
                    count = count + 1
                    return (<ValBlock id={count} block={block.data} time={block.time}/>)
                }))
            })
    }

    return(
        <div className="custom-container">
            <div> 
                <NavBar />
            </div>
            <div className="blocks-div">
                <Row xs={1} md={4} className="g-4">
                    {blocks}
                </Row>
            </div>
            </div>
        )
}