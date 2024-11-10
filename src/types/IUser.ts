
interface IUser {
    _id : string; 
    name : string;
    email : string;
    password : string;
    avatar? : string;
    role : boolean;
    recipes? : string;
    comments? : string;
}

export default IUser;