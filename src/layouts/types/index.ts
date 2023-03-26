import type { FC, HTMLProps } from "react";
import type { Children } from "types";

export interface MainLayoutProps extends HTMLProps<HTMLDivElement> {
    children: Children;
    title: string;
    pageDescription?: string;
    withoutNavbar?: boolean;
    contentClassName?: string;
    withoutFooter?: boolean;
}
export type MainLayoutType = FC<MainLayoutProps>;
export interface GeneralLayoutProps extends HTMLProps<HTMLDivElement> {
    children: Children;
    title?: string;
    pageDescription?: string;
    rightSide?: JSX.Element;
    rightSideClasses?: string;
}
export type GeneralLayoutType = FC<GeneralLayoutProps>;
