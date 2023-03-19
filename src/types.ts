import Block from "./utils/Component";

export type Indexed<T = any> = {
    [key in string]: T;
};

export interface ProfileData {
    img: string,
    name: string,
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string
}

export interface SignupData {
    first_name: string;
    second_name: string;
    email: string;
    login: string;
    password: string;
    phone: string;
}

export interface SigninData {
    login: string;
    password: string;
}

export interface UserData {
    id: number;
    first_name: string;
    second_name: string;
    phone: string;
    display_name: string;
    email: string;
    login: string;
    avatar: string;
}

export interface Chat {
    id: number;
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: {
            first_name: string,
            second_name: string,
            avatar: string,
            email: string,
            login: string,
            phone: string
        },
        time: string,
        content: string
    },
    users?: UserData[];
}

export interface State {
    user?: {
        data?: UserData,
        name?: string,
        error?: string,
        isLoading?: boolean,
        message?: string
    };
    chats?: Chat[];
    selectedChat?: number;
}

export interface BlockConstructable {
    new(props: any): Block;
}

export interface ChatFilter {
    offset?: number,
    limit?: number,
    title?: string
}

export interface ProfileChangingData {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface PasswordData {
    oldPassword: string,
    newPassword: string
}
