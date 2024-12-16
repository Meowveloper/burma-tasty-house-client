interface IProps {
  className? : string;
}
import { Button } from "flowbite-react";
export default function ReportDetailButtonGroup(props : IProps) {
  return (
    <div className={props.className || ''}>
        <div className="space-y-4">
            <Button color="info">Delete Comment</Button>
            <Button color="warning">Delete Recipe</Button>
            <Button color="failure">Ban User Who Commented</Button>
            <Button color="failure">Ban User Who Created Recipe</Button>
        </div>
    </div>
  )
}
