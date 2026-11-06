'use client';

import LoginPageComponent from "../../../components/appComponents/LoginPage/LoginPage";
import { FadeScaleContainer } from "../../../components/layout/SlidingAuthLayout";
import { FadeTransition } from "../../../components/uiComponents/FadeTransition/FadeTransition";
import { HeaderNavbar } from "../../../components/uiComponents/HeaderNavbar";
import { MeshBackgroundWrapper } from "../../../components/uiComponents/MeshBackground/MeshBackground.styles";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    return (
        <FadeTransition show={true} duration="0.3s">
            <MeshBackgroundWrapper onClick={() => {}}>
                <HeaderNavbar visible={true} sessionBtn="Join" onCtaClick={()=> router.replace("/join-session")}/>
                <FadeScaleContainer $visible={true} $transitionDuration="0.75s" $maxWidth="100%">
                    <LoginPageComponent />
                </FadeScaleContainer>
            </MeshBackgroundWrapper>
        </FadeTransition>
    );
}