import React , {useState} from "react";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Typography } from "@mui/material";
import {MdDashboard, MdVerifiedUser, MdMenu} from "react-icons/md";
import {FaUser, FaInfoCircle, FaWallet} from "react-icons/fa";
import {HiCube} from "react-icons/hi";
import {IoLogOut} from "react-icons/io5";
import {AiOutlineMenuUnfold, AiOutlineMenuFold} from "react-icons/ai"
import {useNavigate} from "react-router-dom";

export default function NavBar(){
    const { collapseSidebar } = useProSidebar();
    const [collapsed, setCollapsed] = useState(false)

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
                    <SubMenu label="Blockchain" icon={<HiCube/>}>
                        <MenuItem icon={<FaWallet/>}> 
                            Company Wallet
                        </MenuItem>
                        <MenuItem icon={<MdVerifiedUser/>} onClick={navToValidators}> 
                                Validators
                        </MenuItem>
                        <MenuItem icon={<FaInfoCircle/>}> 
                            FAQ
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<FaUser/>}> 
                        User Profile 
                    </MenuItem>
                    <MenuItem icon={<IoLogOut/>} onClick={navToLogOn}> 
                        Log Out 
                    </MenuItem>
                </Menu>
            </Sidebar>
            </div>
        </div>
    )
}