
import { browser } from "$app/env";
import { list, type ListItem } from "$lib/list/list.store";
import type { Unsubscriber } from "svelte/store";

let skipFirst = true
const LIST_NAME = 'fernsList'

export function subToFernList(): Unsubscriber {
    return list.subscribe((val: ListItem[]) => {
        if (!skipFirst) {
            setListInLocalStorage(val)
        }
        skipFirst = false
    })
}

export async function getFernList() {
    const localList = getListFromLocalStorage()
    if (localList) { setListStore(localList) }
    else {
        try {
            const res = await fetch(`/list`)
            if (!res.ok)
                throw new Error(res.statusText);

            const body = await res.json();
            return body.list
        } catch (err) {
            console.error(err);
            return []
        }
    }
}

export async function pushFernList(listVal: ListItem[]) {
    try {
        const res = await fetch("/list", {
            method: "POST",
            body: JSON.stringify(listVal),
        });
        if (!res.ok)
            throw new Error(res.statusText);
    } catch (err) {
        console.error(err);
    }
}

export async function pullFernList() {
    try {
        const res = await fetch(`/list`)
        if (!res.ok)
            throw new Error(res.statusText);

        const body = await res.json();
        setListStore(body.list)
    } catch (err) {
        console.error(err);
    }
}

export async function addListItem(itemLabel: string): Promise<void> {
    const newItem = {
        id: crypto.randomUUID(),
        label: itemLabel,
        completed: false,
        category: ''
    }
    addItemToListStore(newItem)
}

export async function deleteListItem(item: ListItem): Promise<void> {
    removeItemFromListStore(item)
}

export async function updateListItem(item: ListItem, index: number): Promise<void> {
    updateItemInListStore(item)
}

function setListStore(newList: ListItem[]): void {
    if (newList) list.set(newList)
}

function addItemToListStore(newItem: ListItem): void {
    list.update((oldList: ListItem[]) => {
        oldList.push(newItem);
        return oldList;
    });

}

function removeItemFromListStore(itemToDelete: ListItem): void {
    list.update((oldList: ListItem[]) => {
        const newList = oldList.filter((item: ListItem) => {
            return item.id !== itemToDelete.id;
        });
        return newList;
    });
}

function updateItemInListStore(updatedItem: ListItem): void {
    list.update((oldList: ListItem[]) => {
        let oldItem = oldList.find((item: ListItem) => {
            return item.id !== updatedItem.id;
        });
        oldItem = updatedItem
        return oldList;
    });
}

export function getListFromLocalStorage(): ListItem[] | null {
    if (browser) {
        const listStr = localStorage.getItem(LIST_NAME)
        if (listStr) {
            return JSON.parse(listStr)
        }
    }
    return null
}

function setListInLocalStorage(list: ListItem[]): void {
    if (browser) {
        localStorage.setItem(LIST_NAME, JSON.stringify(list))
    }
}
