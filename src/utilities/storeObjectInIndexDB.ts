import IRecipe from "../types/IRecipe";

async function storeObjectInIndexedDB(data: IRecipe) {
    if (Object.keys(data).length === 0) return;
    const recipeData = { ...data, key: "recipe" };
    const request = indexedDB.open("recipeDB");

    request.onupgradeneeded = function () {
        const db = request.result;

        // Create the object store if it doesn't exist
        if (!db.objectStoreNames.contains("recipes")) {
            db.createObjectStore("recipes", { keyPath: "key" });
            console.log("Object store 'recipes' created");
        }
    };

    request.onsuccess = function () {
        const db = request.result;

        // const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("recipes")) {
            db.createObjectStore("recipes", { keyPath: "key" });
            console.log("Object store 'recipes' created");
        }

        // Now that we are sure the object store exists, we can proceed
        const transaction = db.transaction("recipes", "readwrite");
        const store = transaction.objectStore("recipes");

        if (!store) {
            db.createObjectStore("recipes", { keyPath: "key" });
            console.log("Object store 'recipes' created");
            transaction.objectStore("recipes");
        }

        const putRequest = store.put(recipeData);
        putRequest.onsuccess = function () {
            console.log("Recipe updated successfully");
        };

        putRequest.onerror = function () {
            console.error("Error updating recipe");
        };
    };

    request.onerror = function (event) {
        console.error("Error opening IndexedDB:", event);
    };
}

export default storeObjectInIndexedDB;
