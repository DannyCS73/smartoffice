import NavBar from "../../NavBar";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

export default function Validators(){

    const [ticking, setTicking] = useState(true)
    const [count, setCount] = useState(20)
    const [validators, setValidators] = useState([])
    const [recentWinner, setRecentWinner] = useState({
        name: "",
        time: ""
    })

    useEffect(() => {
        if (count === -1) {
            setCount(20)
            most_recent_winner()
        }
        const timer = setTimeout(() => ticking && setCount(count - 1), 1e3)
        return () => clearTimeout(timer)
    }, [count, ticking])

    useEffect(() => {
        if( localStorage.getItem("recent_winner") != null ){
            setRecentWinner(prev => {
                return {
                    name : JSON.parse(localStorage.getItem('recent_winner'))["name"],
                    time: JSON.parse(localStorage.getItem('recent_winner'))["time"]
                }
            })
        }
        most_recent_winner()
        get_validators()
    },[])


    function most_recent_winner(){
        fetch("http://127.0.0.1:8080/most_recent_winner", {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            localStorage.setItem("recent_winner", JSON.stringify(data.message)) 
            setRecentWinner(prev => {
                return {
                    name : data.message.name,
                    time: data.message.time
                }
            })
        })
    }

    function get_validators(){
        fetch("http://127.0.0.1:8080/validators", {
            method: 'GET',
            }).then(res => res.json()).then(data => {
                setValidators(data.validators.map((client) => {
                     return <tr> <td>{client.name}</td><td>{client.staked_amount}</td></tr>
                 }))
            })
    }

    return(
        <div className="custom-container">
            <div> 
                <NavBar />
            </div>    

            <div className="validators-page">
                <div className="timer">
                    <p>auto update in: {count} , refresh to update instantly.</p>

                    <Card>
                        <Card.Header>Last Winning Validator:</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                            <p>
                                {recentWinner.name}
                            </p>
                            <footer className="blockquote-footer">
                                Won at: {recentWinner.time}
                            </footer>
                            </blockquote>
                        </Card.Body>
                        </Card>
                    </div>
                    
                <div className="val-table">
                    <p>List of current validators:</p>
                    <Table striped bordered hover style={{ position: "sticky"}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Staked Amount</th>
                        </tr>
                    </thead>
                        <tbody>
                            {validators}
                        </tbody>
                    </Table>
                    </div>
            </div>
        </div>
        )
}