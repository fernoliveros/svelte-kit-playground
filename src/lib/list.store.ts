import { writable, type Writable } from 'svelte/store';

export const list: Writable<FernList> = writable([]);

export type ListItem = {
    id: string;
    label: string;
    completed: boolean;
}

export type FernList = ListItem[]
