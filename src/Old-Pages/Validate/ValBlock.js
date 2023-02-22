import Card from 'react-bootstrap/Card';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';

export default function ValBlock(props){

        const [format, setFormat] = useState()
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        
        useEffect(() => {
            var block_len = props.block.length;
            var id = 0
            setFormat(props.block.map((item) => {
                id++ 
                if (block_len === id){
                    return (item )
                }
                return (item + ", ")
            }))
        },[])


        return (
            <>
                <Card className="text-center">
                <Card.Header>Block : {props.id}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div className='val-block-text'>
                            {format}
                        </div>
                    </Card.Text>
                    <Spinner animation='border' role='status'>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <div>
                            Mining Block
                        </div>
                    {/* <Button onClick={handleShow} variant="primary">Validate Block</Button> */}
                </Card.Body>
                <Card.Footer className="text-muted">Created at: {props.time}</Card.Footer>
                </Card>
        
                </>
          );
}