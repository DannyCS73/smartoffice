import { useEffect, useState } from "react";
import NavBar from "../../NavBar";
import Block from "./Block";
import Row from 'react-bootstrap/Row';

export default function Blockchain(){

    const [bc, setBc] = useState([])


    useEffect( () => {
        fetch("http://127.0.0.1:8080/blockchain", {
            method: 'GET',
            }).then(res => res.json()).then(data => {
                setBc(data.blockchain.map((block) => {
                    return ( 
                    <div>
                        <Block 
                                index = {block.index}
                                hash = {block.hash}
                                previous_hash = {block.previous_hash}
                                timestamp = {block.timestamp}
                                validator = {block.validator}
                                />
                    </div>
                    )
                }))
            })
    },[])

    return(
        <div className="custom-container">
            <div> 
                <NavBar />
            </div>
            <div className="blocks">
                    {bc}
            </div>
        </div>
        )
}