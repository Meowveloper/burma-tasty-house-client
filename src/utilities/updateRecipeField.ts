
function updateObjectFields <T, K extends keyof T>(object : T, field : K, value : T[K]) : T {
    return {...object, [field] : value};
}

export default updateObjectFields;