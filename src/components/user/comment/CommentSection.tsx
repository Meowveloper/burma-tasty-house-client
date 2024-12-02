import IRecipe from "../../../types/IRecipe";
import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

interface IProps {
    recipeId: IRecipe["_id"];
}
export default function CommentSection(props: IProps) {
    console.log("recipe id from comment section", props.recipeId);
        console.log("recipe id from comment section", props.recipeId);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        console.log("checking useEffect from App.tsx");
        const newSocket = io("http://localhost:8000");
        socketRef.current = newSocket;
        newSocket.on("connect", () => {
            console.log("connected to socket");
        });
        return () => {
            if (socketRef.current) socketRef.current.close();
        };
    }, []);
    return (
        <div className="w-full rounded-lg border py-2 px-5 my-4">
            <h3 className="font-bold">Discussion</h3>
            <form>
                {/* text area and button */}
                <div className="w-full my-3">
                    <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder="Type Your Comment" required></textarea>
                </div>

                <div className="w-full flex justify-end px-3">
                    <input type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value="Post Comment" />
                </div>
                {/* text area and button end */}

                {/* all comments */}
                <div className="flex flex-col mt-5">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className="rounded-md p-3 my-3 dark:bg-dark-card">
                                <div className="flex gap-3 items-center">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/22263436?v=4"
                                        className="object-cover w-8 h-8 rounded-full 
                                border-2 border-emerald-400  shadow-emerald-400
                                "
                                    />

                                    <h3 className="text-dark-text-highlight font-bold">User name</h3>
                                </div>

                                <p className="mt-2">this is sample commnent</p>
                            </div>
                        ))}
                </div>
                {/* all comments end */}
            </form>
        </div>
    );
}
