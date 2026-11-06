'use client';

import { useRouter } from 'next/navigation';
import JoinSessionPage from "../../../components/appComponents/JoinSessionPage/JoinSessionPage";
import { PageWrapper } from "../../../components/layout/SlidingAuthLayout";
import { FadeTransition } from "../../../components/uiComponents/FadeTransition/FadeTransition";
import { HeaderNavbar } from "../../../components/uiComponents/HeaderNavbar";

export default function JoinSession() {
    const router = useRouter();
    return (
        <FadeTransition show={true} duration="0.4s">
            <PageWrapper>
                <HeaderNavbar sessionBtn="Login" visible={true} onCtaClick={()=> router.replace("/login")}/>
                    <JoinSessionPage />
            </PageWrapper>
        </FadeTransition>
    )
}