import { useNavigate } from "react-router-dom";
import CountUpCard from "../../components/admin/home/CountUpCard";
import ReportCard from "../../components/admin/home/ReportCard";
import { Badge } from "flowbite-react";
import { EnumAdminRoutes } from "../../types/EnumRoutes";
import { CarouselComponent } from "../../components/admin/home/Carousel";

export default function AdminHome() {
  const navigate = useNavigate();
    return (
        <div>
            <div className="text-h1 font-bold mb-6">Command Center of Burma Tasty House Admins</div>
            <div className="mb-6">
                <div className="text-h2 font-bold mb-4">Your Application's Growth</div>
                <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-5 gap-7">
                    <CountUpCard end={100} duration={3} text={"Users"}></CountUpCard>
                    <CountUpCard end={100} duration={3} text={"Recipes"}></CountUpCard>
                    <CountUpCard end={100} duration={3} text={"Comments"}></CountUpCard>
                    <CountUpCard end={100} duration={3} text={"Reports"}></CountUpCard>
                </div>
            </div>
            <div className="mb-6">
              <CarouselComponent></CarouselComponent>
            </div>
            <div>
                <div className="mb-4 flex justify-start items-center gap-4">
                  <div className="text-h2 font-bold">
                    Latest Reports
                  </div>
                  <Badge size="sm" onClick={() => navigate(EnumAdminRoutes.Reports)} color="warning">See All Reports</Badge>
                </div>
                <div className="mb-6 grid justify-items-center gap-4 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
                  <ReportCard recipe_id="12345" comment_id="12345" recipe_title="Recipe Title" comment_body="Comment Body" report_body="Report Body" report_id="12345" />
                  <ReportCard recipe_id="12345" comment_id="12345" recipe_title="Recipe Title" comment_body="Comment Body" report_body="Report Body" report_id="12345" />
                  <ReportCard recipe_id="12345" comment_id="12345" recipe_title="Recipe Title" comment_body="Comment Body" report_body="Report Body" report_id="12345" />
                </div>
            </div>
        </div>
    );
}
