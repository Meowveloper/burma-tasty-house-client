import { Accordion } from "flowbite-react";
export default function ReportDetailReportedBy() {
    return (
        <>
            <Accordion.Title>
                <span>Reported by</span>
            </Accordion.Title>
            <Accordion.Content>
                <div className="flex items-center space-x-4">
                    <span>Mg Mg</span>
                </div>
            </Accordion.Content>
        </>
    );
}
