import { ReactNode, useRef, useState } from "react";
import axios from "../../../utilities/axios";
import IRecipe from "../../../types/IRecipe";
import IComment from "../../../types/IComment";
declare module "react" {
    interface ButtonHTMLAttributes<T> extends React.HTMLAttributes<T> {
        popovertarget?: string;
        popovertargetaction?: "show" | "hide" | "toggle";
    }

    interface HTMLAttributes<T> extends React.DOMAttributes<T> {
        popover?: "auto" | "manual";
    }
}
interface IProps {
    children: ReactNode;
    recipeId: IRecipe["_id"];
    commentId?: IComment["_id"];
}
export default function ReportPopUp(props: IProps) {
    const [body, setBody] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const popOverDiv = useRef<HTMLDivElement>(null);

    return (
        <div>
            <button type="button" popovertarget="report-popover" popovertargetaction="show">
                {props.children}
            </button>

            <div ref={popOverDiv} id="report-popover" popover="manual" className="fixed top-0 left-0 w-full h-full bg-transparent">
                <div className="bg-white p-5 shadow-md shadow-gray-300 rounded-small w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex justify-between items-center mb-5">
                        <div className="text-h3 font-bold">Reason of report</div>
                        {!loading && (
                            <button type="button" popovertarget="report-popover" popovertargetaction="hide" className="text-gray-500 text-h2 font-bold">
                                x
                            </button>
                        )}
                    </div>
                    <textarea onChange={e => setBody(e.target.value)} value={body} className="bg-gray-200 p-5 rounded-small" rows={10} cols={20}></textarea>
                    <div>{body.length} / 1000</div>
                    <div className="mt-4 text-center">
                        {!loading ? (
                            <button onClick={submitForm} className="px-4 py-2 cursor-pointer rounded-small bg-green-400">
                                Submit
                            </button>
                        ) : (
                            <button className="px-4 py-2 cursor-pointer rounded-small bg-green-400">loading...</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    async function submitForm() {
        if (!body) return;
        if (body.length > 1000) return;
        try {
            setLoading(true);
            const res = await axios.post("/reports", {
                body,
                recipeId: props.recipeId,
                commentId: props.commentId ? props.commentId : null,
            });
            setBody("");
            popOverDiv.current?.togglePopover();
            console.log(res);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
}
