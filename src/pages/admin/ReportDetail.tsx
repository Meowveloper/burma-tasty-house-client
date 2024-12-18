import { Accordion } from "flowbite-react";
import ReportDetailReason from "../../components/admin/report-detail/Reason";
import ReportDetailRecipe from "../../components/admin/report-detail/Recipe";
import React, { createContext, useEffect, useMemo, useState } from "react";
import ReportDetailComment from "../../components/admin/report-detail/Comment";
import { Alert } from "flowbite-react";
import ReportDetailButtonGroup from "../../components/admin/report-detail/ButtonGroup";
import axios from "../../utilities/axios";
import { useParams } from "react-router-dom";
import IReport from "../../types/IReport";

export interface IReportDetailContext {
    report: IReport | null;
}
export const ReportDetailContext = createContext<IReportDetailContext>({} as IReportDetailContext);

export default function AdminReportDetail() {
    const params = useParams();
    const report_id = params.id;

    const [report, setReport] = useState<IReport | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchReport = useMemo(() => getFetchReportFunction(setReport, setLoading), []);

    useEffect(() => {
        console.log("checking infinite loop from pages/admin/ReportDetail");
        fetchReport(report_id);
    }, [report_id, fetchReport]);
    return (
        <ReportDetailContext.Provider value={{ report: report }}>
            <div>
                <div className="text-h2 font-bold mb-4">Report Detail</div>
                { loading || !report ? (
                    <div>Loading.....</div>
                ) : (
                    <>
                        {calculate_if_comment_report(report) && showAlert && (
                            <Alert
                                color="warning"
                                onDismiss={() => {
                                    handleAlertDismiss(setShowAlert);
                                }}
                                className="mb-4"
                            >
                                <span className="font-medium">Info alert! | </span> This is a <span className="font-bold uppercase">comment report</span>. That means the user reported the comment on the recipe, not the recipe itself.
                            </Alert>
                        )}

                        <Accordion collapseAll>
                            {/* reason */}
                            <Accordion.Panel>
                                <ReportDetailReason></ReportDetailReason>
                            </Accordion.Panel>
                            {/* reason end */}


                            {/* recipe */}
                            <Accordion.Panel>
                                <ReportDetailRecipe></ReportDetailRecipe>
                            </Accordion.Panel>
                            {/* recipe end */}

                            {/* recipe */}
                            <Accordion.Panel>
                                <ReportDetailComment></ReportDetailComment>
                            </Accordion.Panel>
                            {/* recipe end */}
                        </Accordion>

                        <ReportDetailButtonGroup className="mt-4"></ReportDetailButtonGroup>
                    </>
                )}
            </div>
        </ReportDetailContext.Provider>
    );
}

function handleAlertDismiss(setShowAlert: React.Dispatch<React.SetStateAction<boolean>>) {
    const result = window.confirm("Are you sure you understand the alert and you won't delete the recipe unless necessary??");
    if (result) setShowAlert(false);
    else setShowAlert(true);
}

function calculate_if_comment_report(report: IReport | null) : boolean {
    if(!report || !report.comment) return false;
    if(typeof report.comment === "string") return true;
    else return ('_id' in report.comment);
}

function getFetchReportFunction(setReport: React.Dispatch<React.SetStateAction<IReport | null>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return async function (report_id: string | undefined) {
        try {
            setLoading(true);
            if (!report_id) throw new Error("report id not found");
            const result = await axios.get(`/admin/reports/show?report_id=${report_id}`);
            setReport(result.data.data);
            console.log(result);
        } catch (e) {
            console.log(e);
            setReport(null);
        } finally {
            setLoading(false);
        }
    };
}
