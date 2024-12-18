import { Accordion } from "flowbite-react";
import { useContext } from "react";
import { ReportDetailContext } from "../../../pages/admin/ReportDetail";
export default function ReportDetailReason() {
    const reportDetailContext = useContext(ReportDetailContext);
    return (
        <>
            <Accordion.Title>
                <span>Reason</span>
            </Accordion.Title>
            <Accordion.Content>
                <span>
                    {reportDetailContext.report?.body || "Unknown"}
                </span>
            </Accordion.Content>
        </>
    );
}
