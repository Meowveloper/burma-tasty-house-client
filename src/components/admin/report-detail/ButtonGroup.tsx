import axios from "../../../utilities/axios";
import { Spinner } from "flowbite-react";
interface IProps {
    className?: string;
}
import { Button } from "flowbite-react";
import { useContext, useState } from "react";
import { ReportDetailContext } from "../../../pages/admin/ReportDetail";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { EnumAdminRoutes } from "../../../types/EnumRoutes";
export default function ReportDetailButtonGroup(props: IProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const reportDetailContext = useContext(ReportDetailContext);
    const navigate: NavigateFunction = useNavigate();
    if (!reportDetailContext.report) return <></>;
    const comment_id: string | undefined = typeof reportDetailContext.report.comment === "string" ? reportDetailContext.report.comment : reportDetailContext.report.comment?._id;
    const recipe_id: string | undefined = typeof reportDetailContext.report.recipe === "string" ? reportDetailContext.report.recipe : reportDetailContext.report.recipe?._id;
    const report_id: string | undefined = reportDetailContext.report._id;

    const { delete_comment, delete_recipe, delete_report } = get_button_handler_functions(setLoading);

    return (
        <div className={props.className || ""}>
            {loading && <Spinner className="mb-4" size="lg" aria-label="Default status example" />}
            <div className="space-y-4">
                <Button
                    onClick={() => {
                        delete_comment(comment_id, reportDetailContext.change_comment_from_object_to_id);
                    }}
                    color="warning"
                >
                    Delete Comment
                </Button>
                <Button
                    onClick={() => {
                        delete_recipe(recipe_id, reportDetailContext.change_recipe_from_object_to_id);
                    }}
                    color="failure"
                >
                    Delete Recipe
                </Button>
                <Button
                    onClick={() => {
                        delete_report(report_id, () => {
                            navigate(EnumAdminRoutes.Reports);
                        });
                    }}
                    color="info"
                >
                    Delete This Report
                </Button>
            </div>
        </div>
    );
}

function get_button_handler_functions(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    return {
        delete_comment: async function (comment_id: string | undefined, callback: () => void) {
            if (!comment_id) return;
            const is_confirm = window.confirm("Are you sure you want to delete this comment?");
            if (!is_confirm) return;
            try {
                setLoading(true);
                const result = await axios.delete(`/admin/comments?comment_id=${comment_id}`);
                console.log(result);
                if (result.status === 200) callback();
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        },

        delete_recipe: async function (recipe_id: string | undefined, callback: () => void) {
            if (!recipe_id) return;
            const is_confirm = window.confirm("Are you sure you want to delete this recipe?");
            if (!is_confirm) return;
            try {
                setLoading(true);
                const result = await axios.delete(`/admin/recipes?recipe_id=${recipe_id}`);
                console.log(result);
                if (result.status === 200) callback();
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        },

        delete_report: async function (report_id: string | undefined, callback: () => void) {
            if (!report_id) return;
            const is_confirm = window.confirm("Are you sure you want to delete this report?");
            if (!is_confirm) return;
            try {
                setLoading(true);
                const result = await axios.delete(`/admin/reports?report_id=${report_id}`);
                console.log(result);
                if (result.status === 200) callback();
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        },
    };
}
