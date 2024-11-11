class GeneralValidators {
    public static isText(text: string): boolean
    {
        return /[a-zA-Z]/.test(text);
    }

    public static greaterThanOrEqualTextLength(text : string, length : number) : boolean 
    {
        return text.length >= length;
    }

    public static isImageByExtension(fileName: string): boolean
    {
        const allowedExtensions : string[] = ["jpg", "jpeg", "png", "svg"];
        const fileExtension : string | undefined = fileName.split(".").pop()?.toLowerCase();
        return fileExtension ? allowedExtensions.includes(fileExtension) : false;
    }

    public static isVideoByExtension(fileName : string) : boolean 
    {
        const allowedExtensions : string[] = ["mp4", "MP4"];
        const fileExtension : string | undefined = fileName.split(".").pop()?.toLowerCase();
        return fileExtension ? allowedExtensions.includes(fileExtension) : false;
    }


    public static lessThanOrEqualFileSize (file : File, size : number) 
    {
        const fileSizeInMb = file.size / (1024 * 1024);
        return fileSizeInMb <= size;
    }
}

export default GeneralValidators;
