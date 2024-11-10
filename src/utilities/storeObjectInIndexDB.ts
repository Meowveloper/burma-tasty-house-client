import IRecipe from "../types/IRecipe";

function storeObjectInIndexedDB(data: IRecipe) {
    if (Object.keys(data).length === 0) return;
    const recipeData = { ...data, key: "recipe" };
    const request = indexedDB.open("recipeDB", 1);

    request.onupgradeneeded = function () {
        const db = request.result;
        if (!db.objectStoreNames.contains("recipes")) {
            db.createObjectStore("recipes", { keyPath: "key" }); // Change keyPath to a string
        }
    };

    request.onsuccess = function () {
        const db = request.result;
        const transaction = db.transaction("recipes", "readwrite");
        const store = transaction.objectStore("recipes");

        // Use '0' as a fixed key or any unique string
        const putRequest = store.put(recipeData); // Store the recipe with a fixed key
        putRequest.onsuccess = function () {
            console.log("Recipe updated successfully");
        };
    };

    request.onerror = function (event) {
        console.error("Error opening IndexedDB:", event);
    };
}

export default storeObjectInIndexedDB;
