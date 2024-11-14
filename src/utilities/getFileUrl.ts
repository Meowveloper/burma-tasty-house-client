function getFileUrl(file: File | string | null) {
    if (file instanceof File) {
        return URL.createObjectURL(file);
    }
    return typeof file === "string" ? file : null;
}

export default getFileUrl;
