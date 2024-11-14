
function updateObjectFields <T, K extends keyof T>(object : T) : (field : K) => (value : T[K]) => T {
    console.log('original in the highest function of updateObjectFieldFunction', object);
    return function (field : K) {
        return function (value : T[K]) {
            console.log('original in the updateObjectFieldFunction', object);
            return { ...object, [field]: value };
        }
    }
}

export default updateObjectFields;