'use client';
import { useState } from "react";
import { Home, BarChart2, Settings, User, Paperclip, PaperclipIcon, NotebookText, FileDatabase, MonitorCog, Cast, UserRoundCog } from "lucide-react"; 
import { FlexBox } from "../../../components/layout/FlexBox";
import { SideNavbar, NavItem } from "../../../components/uiComponents/Sidebar/Sidebar";
import { FadeTransition } from "../../../components/uiComponents/FadeTransition/FadeTransition";
import { StylishToggleButton } from "../../../components/appComponents/StylishToggleButton/StylishToggleButton";
import { Label } from "../../../components/uiComponents/Label";
import { MeshBackgroundWrapper } from "../../../components/uiComponents/MeshBackground/MeshBackground.styles";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
    // State to track active sidebar navigation item
    const [activeId, setActiveId] = useState<string>("home");

    // Define your navigation items
    const mainNavItems: NavItem[] = [
        { id: "Home", icon: <Home size={20} />, label: "Home"},
        { id: "analytics1", icon: <NotebookText  size={20} />, label: "Generate Docuements" },
        { id: "analytics2", icon: <FileDatabase size={20} />, label: "Saved Documents" },
        { id: "analytics3", icon: <BarChart2 size={20} />, label: "Analytics" },
        { id: "analytics3", icon: <Settings size={20} />, label: "General Settings" },
    ];

    const secondaryNavItems: NavItem[] = [
        { id: "settings1", icon: <MonitorCog size={20} />, label: "Current Session Settings" },
        { id: "settings2", icon: <Cast size={20} />, label: "Shared Documents" },
        { id: "settings3", icon: <UserRoundCog size={20} />, label: "User Management" },
    ];

    return (
        <MeshBackgroundWrapper>
        <FadeTransition>
            
            {/* Outer Container - Locked to viewport without causing window scrollbars */}
            <FlexBox 
                width="100%" 
                height="100vh" 
                direction="row" 
                padding="6px"
                gap="6px"
                overflow="hidden"
            >
                {/* 1. Sidebar Container */}
                <FlexBox 
                    width="70px" 
                    height="100%" 
                    background="transparent"
                    radius="30px"
                    flex-shrink="0"
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
                    height="100%" 
                    direction="column" 
                    gap="10px"
                    padding="6px"
                    overflow="hidden"
                >
                    {/* Top Bar Container */}
                    <FlexBox 
                        width="100%" 
                        height="60px" 
                        padding="10px 20px" 
                        align="center" 
                        justify="space-between"
                        radius="24px"
                        flex-shrink="0"
                    >   <Label>Hello! hemanthkrishnabiju@gmail.com</Label>
                        <StylishToggleButton/>
                    </FlexBox>

                    {/* Main Content Area Container */}
                    <FlexBox 
                        flex="1" 
                        width="100%"
                        direction="column"
                        radius="24px"
                        overflow="visible" 
                        style={{ minHeight: 0 }}
                    >
                        {children}
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FadeTransition>
    </MeshBackgroundWrapper>
    );
}