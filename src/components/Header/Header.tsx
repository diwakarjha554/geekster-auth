'use client';

import { useRouter } from "next/navigation";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useCallback, useState } from "react";
import { ThemeColorToggle } from "../ui/theme-color-toggle";
import { ThemeModeToggle } from "../ui/theme-mode-toggle";
import { AlignJustify } from "lucide-react";



const Header = () => {

    const router = useRouter();
    const handleLogoRoute = useCallback(() => {
        router.push('/');
    }, [router]);

    const [isOpen, setIsOpen] = useState(false);
    const handleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                    <AlignJustify className="md:hidden relative" onClick={handleMenu}/> 
                    <div className="hidden md:flex gap-3">
                        <ThemeColorToggle />
                        <ThemeModeToggle />
                    </div>
                </div>

                {isOpen && (
                    <div className="bg-secondary z-50 absolute right-4 top-12 sm:hidden rounded flex p-2 gap-2 shadow-md">
                        <ThemeColorToggle />
                        <ThemeModeToggle />
                    </div>
                )}

            </Container>
        </Section>
    )
}

export default Header;
