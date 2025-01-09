import type { IconType } from "../icon";

export type TFilledRadio = {
    checked: boolean;
    onChange: (checked: boolean, key: string) => void;
    disabled?: boolean;
    label: string;
    name: string;
    icon?: IconType;
    variant: "primary" | "secondary" | "default" | "no_border";
    theme?: string;
};
