import { Card } from "flowbite-react";
import IRecipe from "../../../types/IRecipe";
import IComment from "../../../types/IComment";
import { useNavigate } from "react-router-dom";
import { EnumAdminRoutes } from "../../../types/EnumRoutes";
interface IProps {
    recipe_id : IRecipe["_id"];
    comment_id? : IComment["_id"] | null;
    recipe_title : IRecipe["title"];
    comment_body? : IComment["body"] | null; 
    report_body : string;
    report_id : string;
}
export default function ReportCard({recipe_id, comment_id, recipe_title, comment_body, report_body, report_id } : IProps) {
    const navigate = useNavigate();
    console.log(recipe_id);
    console.log(report_id);
    return (
        <Card onClick={handleCardClick} className="w-full">
            {(comment_id && comment_body) ? (
                <div>
                    <span>On the comment</span>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ comment_body }</h5>
                    <span>of the recipe</span>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ recipe_title }</h5>
                </div>
            ) : (
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ recipe_title }</h5>
            )}
            <div className="text-h3 mt-3 font-bold text-gray-700">
                Reason of Report : <span className="text-wrap break-words text-white font-normal">{ report_body }</span>
            </div>
        </Card>
    );

    function handleCardClick () {
            navigate(EnumAdminRoutes.Reports);
    }
}
