import React , {useState, useEffect} from "react";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Typography } from "@mui/material";
import {MdDashboard, MdVerifiedUser, MdMenu} from "react-icons/md";
import {FaUser, FaInfoCircle, FaWallet, FaLock} from "react-icons/fa";
import {HiCube} from "react-icons/hi";
import {IoLogOut} from "react-icons/io5";
import {AiOutlineMenuUnfold, AiOutlineMenuFold} from "react-icons/ai"
import {useNavigate} from "react-router-dom";
import { GrConnectivity } from "react-icons/gr";

export default function NavBar(){
    const { collapseSidebar } = useProSidebar();
    const [collapsed, setCollapsed] = useState(false)
    const [name, setName] = useState()

    let navigate = useNavigate(); 

    function navToDashBoard(){
      navigate('/dashboard')
    }

    function navToLogOn(){
        navigate('/')
    }

    function navToValidators(){
        navigate('/validators')
    }


    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("USER")).company_id)
        fetch(`http://127.0.0.1:8081/clients/${JSON.parse(localStorage.getItem("USER")).user_id}`, {
            method: "GET"
        }).then(res => res.json()).then(data => {
            setName(data.name)
        })
    },[])

    return (
        <div>
            <div style={{ display: 'flex', height: '100%'}}>
            <Sidebar>
                <div className={collapsed ? "menu" : "menu-collapsed"}>
                    <button className="button" 
                    onClick={() => {
                        setCollapsed(prev => !prev)
                        collapseSidebar()
                        }}>
                    { collapsed ? <i> <AiOutlineMenuUnfold /> </i> : <i> <AiOutlineMenuFold/> </i>}
                    </button>
                </div>

                <Menu className="menu-item">
                    <MenuItem icon={<MdDashboard/>} onClick={navToDashBoard}> 
                        Company Dashboard 
                    </MenuItem>
                    <MenuItem icon={<FaWallet/>}>
                        Company Wallet
                    </MenuItem>
                    <SubMenu label="Blockchain" icon={<HiCube/>}>
                        <MenuItem icon={<MdVerifiedUser/>} onClick={navToValidators}> 
                                Validators
                        </MenuItem>
                        <MenuItem icon={<FaInfoCircle/>}> 
                            FAQ
                        </MenuItem>
                    </SubMenu>
                    <SubMenu label= {name} icon={<FaUser/>}> 
                        <MenuItem icon={<FaLock/>}>
                            Change Password
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<IoLogOut/>} onClick={navToLogOn}> 
                        Log Out 
                    </MenuItem>
                </Menu>
            </Sidebar>
            </div>
        </div>
    )
}