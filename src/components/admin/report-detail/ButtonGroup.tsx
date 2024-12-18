interface IProps {
  className? : string;
}
import { Button } from "flowbite-react";
import { useContext } from "react";
import { ReportDetailContext } from "../../../pages/admin/ReportDetail";
export default function ReportDetailButtonGroup(props : IProps) {
  const reportDetailContext = useContext(ReportDetailContext);
  
  return (
    <div className={props.className || ''}>
        <div className="space-y-4">
            <Button onClick={deleteComment} color="info">Delete Comment</Button>
            <Button color="warning">Delete Recipe</Button>
            <Button color="failure">Ban User Who Commented</Button>
            <Button color="failure">Ban User Who Created Recipe</Button>
        </div>
    </div>
  );
function deleteComment() {
  console.log(reportDetailContext.report);
}
}


