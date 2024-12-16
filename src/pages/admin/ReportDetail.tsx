import { Accordion } from "flowbite-react";
import ReportDetailReason from "../../components/admin/report-detail/Reason";
import ReportDetailReportedBy from "../../components/admin/report-detail/ReportedBy";
import ReportDetailRecipe from "../../components/admin/report-detail/Recipe";
import React, { createContext, useEffect, useMemo, useState } from "react";
import ReportDetailComment from "../../components/admin/report-detail/Comment";
import { Alert } from "flowbite-react";
import ReportDetailButtonGroup from "../../components/admin/report-detail/ButtonGroup";

interface IReportDetailContext {
    nuller: null;
}
export const ReportDetailContext = createContext<IReportDetailContext>({} as IReportDetailContext);

export default function AdminReportDetail() {
    const [contextValue, setContextValue] = useState<IReportDetailContext>({} as IReportDetailContext);
    const [ showAlert, setShowAlert ] = useState<boolean>(true);
    const makeReportDetailContext = useMemo(() => getMakeReportDetailContextFunction(null), []);

    useEffect(() => {
        console.log("checking infinite loop from pages/admin/ReportDetail");
        setContextValue(makeReportDetailContext());
    }, [makeReportDetailContext]);
    return (
        <ReportDetailContext.Provider value={contextValue}>
            <div>
                <div className="text-h2 font-bold mb-4">Report Detail</div>
                { (showAlert) && (
                    <Alert color="warning" onDismiss={() => { handleAlertDismiss(setShowAlert); }} className="mb-4">
                        <span className="font-medium">Info alert! | </span> This is a <span className="font-bold uppercase">comment report</span>. That means the user reported the comment on the recipe, not the recipe itself.
                    </Alert>
                ) }

                <Accordion collapseAll>
                    {/* reason */}
                    <Accordion.Panel>
                        <ReportDetailReason></ReportDetailReason>
                    </Accordion.Panel>
                    {/* reason end */}

                    {/* reporter */}
                    <Accordion.Panel>
                        <ReportDetailReportedBy></ReportDetailReportedBy>
                    </Accordion.Panel>
                    {/* reporter end */}

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
            </div>
        </ReportDetailContext.Provider>
    );
}

function getMakeReportDetailContextFunction(nuller: null) {
    return function (): IReportDetailContext {
        return {
            nuller,
        };
    };
}

function handleAlertDismiss (setShowAlert: React.Dispatch<React.SetStateAction<boolean>>) {
    const result = window.confirm("Are you sure you understand the alert and you won't delete the recipe unless necessary??");
    if(result) setShowAlert(false);
    else setShowAlert(true);
}
