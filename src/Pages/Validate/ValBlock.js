import Card from 'react-bootstrap/Card';
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
                        <div className='custom-container'>
                            {format}
                        </div>
                    </Card.Text>
                    <Button onClick={handleShow} variant="primary">Validate Block</Button>
                </Card.Body>
                <Card.Footer className="text-muted">Created at: {props.time}</Card.Footer>
                </Card>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Confirm Validation.</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to validate this block? This action will permanently add this block to the blockchain.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Validate
                </Button>
                </Modal.Footer>
                </Modal>
                </>
          );
}