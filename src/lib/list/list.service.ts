
import { list, type ListItem } from "$lib/list/list.store";
import type { Unsubscriber } from "svelte/store";

let intervalId: number
let listUnsub: Unsubscriber
let skipFirst = true
const LIST_NAME = 'fernsList'

export function startPollFernList() {
    intervalId = window.setInterval(() => {
        getFernList()
    }, 10000)

    listUnsub = list.subscribe((list) => {
        if (!skipFirst) setListInLocalStorage(list)
        skipFirst = false
    })
}

export function stopPollFernList() {
    clearInterval(intervalId)

    if (listUnsub) listUnsub();
}

export async function getFernList() {
    try {
        const res = await fetch(`/list`)
        if (!res.ok)
            throw new Error(res.statusText);

        const body = await res.json();
        setListStore(body.todos)
    } catch (_) {
        const localList = getListFromLocalStorage()
        if (localList) setListStore(localList)
    }
}

export async function addListItem(itemLabel: string): Promise<void> {
    const newItem = {
        id: crypto.randomUUID(),
        label: itemLabel,
        completed: false
    }
    addItemToListStore(newItem)
    try {
        const res = await fetch("/list", {
            method: "POST",
            body: JSON.stringify({ newItem }),
        });
        if (!res.ok)
            throw new Error(res.statusText);
    } catch (err) {
        console.error(err);
    }
}

export async function deleteListItem(item: ListItem): Promise<void> {
    removeItemFromListStore(item)
    try {
        const res = await fetch("/list", {
            method: "DELETE",
            body: JSON.stringify({ item }),
        });
        if (!res.ok)
            throw new Error(res.statusText);
    } catch (err) {
        console.error(err);
    }
}

export async function updateListItem(item: ListItem, index: number): Promise<void> {
    updateItemInListStore(item)
    try {
        const res = await fetch("/list", {
            method: "PATCH",
            body: JSON.stringify({ item, index }),
        });
        if (!res.ok)
            throw new Error(res.statusText);
    } catch (err) {
        console.error(err);
    }
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
    const listStr = localStorage.getItem(LIST_NAME)
    if (listStr) {
        return JSON.parse(listStr)
    }
    return null
}

function setListInLocalStorage(list: ListItem[]): void {
    localStorage.setItem(LIST_NAME, JSON.stringify(list))
}
