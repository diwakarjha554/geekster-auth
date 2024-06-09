'use client';

import { useRouter } from "next/navigation";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useCallback } from "react";
import { ThemeColorToggle } from "../ui/theme-color-toggle";
import { ThemeModeToggle } from "../ui/theme-mode-toggle";



const Header = () => {

    const router = useRouter();
    const handleLogoRoute = useCallback(() => {
        router.push('/');
    }, [router]);

    return (
        <Section
            className={`w-full fixed top-0 z-40 py-3 border-b-[1px] bg-background`}
        >
            <Container
                className={`lg:relative flex flex-row items-center justify-between gap-3 lg:gap-0`}
            >

                <div
                    onClick={handleLogoRoute}
                    className="cursor-pointer"
                >
                    <span className="text-2xl font-[500] text-primary">Geekster Auth</span>
                </div>

                <div
                    className={`flex items-center gap-3`}
                >
                    <ThemeColorToggle />
                    <ThemeModeToggle />
                </div>

            </Container>
        </Section>
    )
}

export default Header;
