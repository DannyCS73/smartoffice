import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export default function Block(props){
    return(
        <Card style={{ width: '18rem', height:'16rem' }}>
        <Card.Header>Block {props.index}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Index: {props.index}</ListGroup.Item>
          <ListGroup.Item>Hash : {props.hash}</ListGroup.Item>
          <ListGroup.Item>Previous Hash: {props.previous_hash}</ListGroup.Item>
          <ListGroup.Item>Timestamp: {props.timestamp}</ListGroup.Item>
          <ListGroup.Item>Validator: {props.validator}</ListGroup.Item>
        </ListGroup>
      </Card>
    )
}