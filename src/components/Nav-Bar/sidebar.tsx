import React , {useState} from "react";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Typography } from "@mui/material";
import {MdDashboard, MdVerifiedUser, MdMenu} from "react-icons/md";
import {FaUser, FaInfoCircle} from "react-icons/fa";
import {HiCube} from "react-icons/hi";
import {IoLogOut} from "react-icons/io5";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai"

export default function NavBar(){
    const { collapseSidebar } = useProSidebar();
    const [collapsed, setCollapsed] = useState(false)

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
                    { collapsed ? <i> < AiFillCaretRight/> </i> : <i> <AiFillCaretLeft/> </i>}
                    </button>
                </div>

                <Menu className="menu-item">
                    <MenuItem icon={<MdDashboard/>}> 
                        Company Dashboard 
                    </MenuItem>
                    <MenuItem icon={<FaUser/>}> 
                        User Profile 
                    </MenuItem>
                    <SubMenu label="Blockchain" icon={<HiCube/>}>
                        <MenuItem icon={<MdVerifiedUser/>}> 
                                Validators
                        </MenuItem>
                        <MenuItem icon={<FaInfoCircle/>}> 
                            FAQ
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<IoLogOut/>}> 
                        Log Out 
                    </MenuItem>

                </Menu>
            </Sidebar>
            </div>
        </div>
    )
}