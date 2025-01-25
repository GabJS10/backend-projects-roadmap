type status = "todo" | "in progress" | "done";

type Tasks = {
    id: number;
    title: string;
    description: string;
    status: status;
    createdAt: string;
    updatedAt?: string;
}

export type { Tasks };