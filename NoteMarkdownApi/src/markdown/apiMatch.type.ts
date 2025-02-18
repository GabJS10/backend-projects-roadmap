export type Match = {
    message: string;
    replacements: {
        value: string;
    }[];
    context: {
        text: string;
    };
}