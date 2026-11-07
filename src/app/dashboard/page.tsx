"use client"

import Slider from "../../../components/appComponents/ImageSlider/ImageSlider";
import UserResources from "../../../components/appComponents/UserResources/UserResources";
import { FlexBox } from "../../../components/layout/FlexBox";
import ActiveUsers from "../../../components/uiComponents/ActiveUsers/ActiveUsers";

export default function Dashboard() {
    return (
        <FlexBox direction="column" height="100%" width="100%" gap="12px" overflow="visible">
            {/* Top Row (60% height) */}
            <FlexBox direction="row" height="60%" width="100%" gap="12px" overflow="visible">
                <FlexBox
                    direction="column"
                    background="#6bbd07"
                    height="100%"
                    width="70%"
                    radius="24px"
                >
                    <Slider />
                </FlexBox>

                <FlexBox
                    direction="column"
                    height="100%"
                    width="30%"
                    overflow="visible"
                >
                    <ActiveUsers />
                </FlexBox>
            </FlexBox>

            {/* Bottom Row (40% height) */}
            <FlexBox direction="row" height="40%" width="100%" gap="12px">
                <FlexBox
                    direction="column"
                    background="#6bbd07"
                    height="100%"
                    width="40%"
                    radius="24px"
                    padding="20px"
                >
                    {/* Modal Popup Component */}

                </FlexBox>
                <FlexBox
                    direction="column"
                    background="#07bdbd"
                    height="100%"
                    width="60%"
                    radius="24px"
                >
                    <UserResources />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    );
}