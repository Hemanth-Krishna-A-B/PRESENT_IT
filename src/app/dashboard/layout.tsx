'use client';

import { useState } from "react";
import { MeshBackgroundWrapper } from "../../../components/uiComponents/MeshBackground/MeshBackground.styles";
import { Home, BarChart2, Settings, User } from "lucide-react"; 
import { FlexBox } from "../../../components/layout/FlexBox";
import { SideNavbar, NavItem } from "../../../components/uiComponents/Sidebar/Sidebar"; // Added NavItem import
import { FadeTransition } from "../../../components/uiComponents/FadeTransition/FadeTransition";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
    // State to track active sidebar navigation item
    const [activeId, setActiveId] = useState<string>("home");

    // Define your navigation items
    const mainNavItems: NavItem[] = [
        { id: "home", icon: <Home size={20} />, label: "Home" },
        { id: "analytics1", icon: <BarChart2 size={20} />, label: "Analytics" },
        { id: "analytics2", icon: <BarChart2 size={20} />, label: "Analytics" },
        { id: "analytics3", icon: <BarChart2 size={20} />, label: "Analytics" },
    ];

    const secondaryNavItems: NavItem[] = [
        { id: "settings", icon: <Settings size={20} />, label: "Settings" },
    ];

    return (
        <FadeTransition>
            
            {/* Outer Container */}
            <FlexBox 
                width="100vw" 
                height="100vh" 
                direction="row" 
                // padding="8px" 
                // gap="8px"        
            >
                
                
                <FlexBox 
                    width="70px" 
                    height="100%" 
                    background="transparent"
                    radius="30px"
                    margin="5px"
                >
                    <SideNavbar
                        mainItems={mainNavItems}
                        secondaryItems={secondaryNavItems}
                        activeId={activeId}
                        onSelect={(id: string) => {
                            setActiveId(id);
                            console.log("Selected nav item:", id);
                        }}
                    />
                </FlexBox>

                {/* 2. Main Right Stack Container (Top Bar + Center Content) */}
                <FlexBox 
                    flex="1" 
                    height="99%" 
                    direction="column" 
                    gap="10px"
                    padding="5px"
                    margin="5px"
                
                    
    
                >
                    {/* Top Bar Container */}
                    <FlexBox 
                        width="99.5%" 
                        height="60px" 
                        background="rgba(255, 165, 0, 0.1)" 
                        padding="10px 20px" 
                        align="center" 
                        justify="space-between"
                        radius="30px"
                    >
                        <span>Top Bar / Header</span>
                    </FlexBox>

                    <FlexBox 
                        flex="1" 
                        width="99.5%"
                        background="rgba(128, 0, 128, 0.05)" 
                        padding="20px" 
                        style={{ overflowY: "auto" }}
                        radius="30px"
                    >
                        {children}
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        {/* </MeshBackgroundWrapper> */}
        </FadeTransition>
    );
}