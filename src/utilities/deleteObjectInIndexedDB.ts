async function deleteObjectInIndexedDB(key: string): Promise<void> {
    const request = indexedDB.open("recipeDB");

    request.onupgradeneeded = function (): void {
        const db = request.result;

        // Create the object store if it doesn't exist
        if (!db.objectStoreNames.contains("recipes")) {
            db.createObjectStore("recipes", { keyPath: "key" });
            console.log("Object store 'recipes' created");
        }
    };

    request.onsuccess = function (): void {
        const db = request.result;

        // Make sure the 'recipes' object store exists
        if (!db.objectStoreNames.contains("recipes")) {
            db.createObjectStore("recipes", { keyPath: "key" });
            console.log("Object store 'recipes' created");
        }

        // Start a transaction and get the object store
        const transaction = db.transaction("recipes", "readwrite");
        const store = transaction.objectStore("recipes");

        // Delete the object by its key
        const deleteRequest = store.delete(key);

        deleteRequest.onsuccess = function (): void {
            console.log(`Recipe with key "${key}" deleted successfully`);
        };

        deleteRequest.onerror = function (): void {
            console.error("Error deleting recipe");
        };
    };

    request.onerror = function (event: Event): void {
        console.error("Error opening IndexedDB:", event);
    };
}

export default deleteObjectInIndexedDB;