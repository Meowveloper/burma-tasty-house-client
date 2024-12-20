import { Accordion } from "flowbite-react"
import { ReportDetailContext } from "../../../pages/admin/ReportDetail"
import { useContext } from "react";
export default function ReportDetailComment() {
    const reportDetailContext = useContext(ReportDetailContext);

    const comment = reportDetailContext.report?.comment;
    if (!comment)
        return (
            <>
                <Accordion.Title>
                    Reported Comment
                </Accordion.Title>
                <Accordion.Content>
                    <span className="text-white font-bold">Comment deleted or this is not a comment report</span>
                </Accordion.Content>
            </>
        );
    return (
        <>
            <Accordion.Title>
                Reported Comment
            </Accordion.Title>
            <Accordion.Content>
                <span className="text-white font-bold">{typeof comment === "string" ? 'comment deleted or this is not a comment report' : comment.body}</span>
            </Accordion.Content>
        </>
    )
}
