
import { list, type ListItem } from "$lib/list.store";

export async function getFernList() {
    try {
        const res = await fetch(`/list`);
        const body = await res.json();
        setListStore(body.todos)
    } catch (err) {
        console.error(err);
        return
    }
}

export async function addListItem(itemLabel: string, offline: boolean): Promise<void> {
    const newItem = {
        id: crypto.randomUUID(),
        label: itemLabel,
        completed: false
    }
    try {
        await fetch("/list", {
            method: "POST",
            body: JSON.stringify({ newItem }),
        });
        addItemToListStore(newItem)
    } catch (err) {
        console.error(err);
    }
}

export async function deleteListItem(item: ListItem, offline: boolean): Promise<void> {
    try {
        await fetch("/list", {
            method: "DELETE",
            body: JSON.stringify({ item }),
        });
        removeItemFromListStore(item)
    } catch (err) {
        console.error(err);
    }
}

export async function updateListItem(item: ListItem, index: number, offline: boolean): Promise<void> {
    try {
        await fetch("/list", {
            method: "PATCH",
            body: JSON.stringify({ item, index }),
        });
        updateItemInListStore(item)
    } catch (err) {
        console.error(err);
    }
}

function setListStore(newList: ListItem[]): void {
    list.set(newList)
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