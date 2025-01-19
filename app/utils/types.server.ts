export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
};

export type RegisterForm = {
    email: string
    password: string
    firstName: string
    lastName: string
    username: string
}

export type LoginForm = {
    email: string
    password: string
}