import IRecipe from "../../../types/IRecipe";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import IComment from "../../../types/IComment";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "../../../utilities/axios";

interface IProps {
    recipeId: IRecipe["_id"];
}
export default function CommentSection(props: IProps) {
    console.log("recipe id from comment section", props.recipeId);
    console.log("recipe id from comment section", props.recipeId);
    const socketRef = useRef<Socket | null>(null);
    const [newCommentText, setNewCommentText] = useState<string>("");
    const authContext = useContext(AuthContext);

    const [allComments, setAllComments] = useState<IComment[]>([]);

    const fetchAllComments = useMemo(getFetchAllCommentsFunction, [props.recipeId]);
    const connectToSocketAndListenForNewComments = useMemo(getConnectToSocketAndListenForNewComments, [props.recipeId]);

    useEffect(() => {
        console.log("checking infinite loop from CommentSection.tsx");

        // connect to socket and listen for new comments
        connectToSocketAndListenForNewComments();

        // fetch comments for the recipe
        fetchAllComments();

        // clean up function
        return () => {
            if (socketRef.current) socketRef.current.close();
        };

    }, [fetchAllComments, connectToSocketAndListenForNewComments]);

    return (
        <div className="w-full rounded-lg border py-2 px-5 my-4">
            <h3 className="font-bold">Discussion</h3>
            <form onSubmit={handleCommentSubmit}>
                {/* text area and button */}
                <div className="w-full my-3">
                    <textarea onChange={e => setNewCommentText(e.target.value)} value={newCommentText} className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder="Type Your Comment" required></textarea>
                </div>

                <div className="w-full flex justify-end px-3">
                    <input type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value="Post Comment" />
                </div>
                {/* text area and button end */}

                {/* all comments */}

                {allComments.map((item: IComment) => (
                    <div key={item._id} className="flex flex-col mt-5">
                        <div className="rounded-md p-3 my-3 dark:bg-dark-card relative">
                            <div className="flex gap-3 items-center">
                                <img
                                    src={typeof item.user !== "string" && item.user.avatar ? item.user.avatar : "/image-placeholder.jpg"}
                                    className="object-cover w-8 h-8 rounded-full 
                                    border-2 border-emerald-400  shadow-emerald-400
                                    "
                                />

                                <h3 className="text-dark-text-highlight font-bold">{typeof item.user === "string" ? "error" : item.user.name}</h3>
                            </div>

                            <p className="mt-2 ms-2">{item.body}</p>
                            {item.createdAt && (
                                <div className="absolute bottom-2 right-4">
                                    <span className="text-xs text-gray-500">{calculateTimeDifference(item.createdAt)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {/* all comments end */}
            </form>
        </div>
    );

    async function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            if (!authContext.user) return;

            const newComment: IComment = {
                recipe: props.recipeId,
                body: newCommentText,
                user: authContext.user._id,
            };

            if (socketRef.current) socketRef.current.emit("postComment", newComment);

            setNewCommentText("");
        } catch (e) {
            console.log((e as Error).message);
            alert("error posting comment");
        }
    }

    // to use with useMemo hook
    function getConnectToSocketAndListenForNewComments() {
        return function () {
            const backendUrl = import.meta.env.VITE_BACKEND_URL_WITHOUT_API as string;
            const newSocket = io(backendUrl);
            socketRef.current = newSocket;
            socketRef.current.on("connect", () => {
                console.log("connected to socket");
            });

            socketRef.current.on("newComment", data => {
                console.log("new comment", data);
                if ((data as IComment).recipe === props.recipeId) setAllComments(prev => getArrayWithOneMoreComment(data, prev));
            });
        };
    }

    // to use with useMemo hook
    function getFetchAllCommentsFunction() {
        return async function () {
            try {
                const res = await axios.get("/comments/" + props.recipeId);
                console.log("comments", res.data.data);
                setAllComments(res.data.data);
            } catch (e) {
                console.log(e);
            }
        };
    }

    function getArrayWithOneMoreComment(comment: IComment, oldComments: IComment[]) {
        return [comment, ...oldComments];
    }

    function calculateTimeDifference(createdAt: IComment["createdAt"]) {
        const now = new Date();
        if (!createdAt) return "";
        const createdAtDate = new Date(createdAt);
        const timeDifference = now.getTime() - createdAtDate.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
        return "just now";
    }
}
