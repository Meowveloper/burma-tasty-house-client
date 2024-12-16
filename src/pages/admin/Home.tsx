import { useNavigate } from "react-router-dom";
import CountUpCard from "../../components/admin/home/CountUpCard";
import ReportCard from "../../components/admin/home/ReportCard";
import { Badge } from "flowbite-react";
import { EnumAdminRoutes } from "../../types/EnumRoutes";
import { CarouselComponent } from "../../components/admin/home/Carousel";
import axios from '../../utilities/axios';
import React, { useState, useMemo, useEffect } from "react";


interface IStatistics {
  total_recipes : number;
  total_users : number;
  total_comments: number;
  total_reports : number;
}

export default function AdminHome() {
  const navigate = useNavigate();

  const [ statisticsLoading, setStatisticsLoading ] = useState<boolean>(false);
  const [ statistics, setStatistics ] = useState<IStatistics>({} as IStatistics);

  const [ carouselLoading, setCarouselLoading ] = useState<boolean>(false);
  const [ carouselImages, setCarouselImages ] = useState<Array<string | undefined>>([]);

  const fetchStatistics = useMemo(() => getFetchStatisticsFunction(setStatisticsLoading, setStatistics), []);
  const fetchCarouselImages = useMemo(() => getFetchCarouselImagesFunction(setCarouselLoading, setCarouselImages), []);

  useEffect(() => {
    console.log("checking infinite loop from pages/admin/Home.tsx");
    fetchStatistics();
    fetchCarouselImages();
  }, [fetchStatistics, fetchCarouselImages]);
    return (
        <div>
            <div className="text-h1 font-bold mb-6">Command Center of Burma Tasty House Admins</div>
            <div className="mb-6">
                <div className="text-h2 font-bold mb-4">Your Application's Growth</div>
                { !statisticsLoading ? (
                  <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-5 gap-7">
                      <CountUpCard end={statistics.total_users} duration={4} text={"Users"}></CountUpCard>
                      <CountUpCard end={statistics.total_recipes} duration={4} text={"Recipes"}></CountUpCard>
                      <CountUpCard end={statistics.total_comments} duration={4} text={"Comments"}></CountUpCard>
                      <CountUpCard end={statistics.total_reports} duration={4} text={"Reports"}></CountUpCard>
                  </div>
                ) : (
                  <div>Loading.....</div>
                ) }
            </div>
            <div className="mb-6">
              { !carouselLoading ? (
                <CarouselComponent images={carouselImages}></CarouselComponent>
              ) : (
                <div>Loading.....</div>
              ) }
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

function getFetchStatisticsFunction(setStatisticsLoading : React.Dispatch<React.SetStateAction<boolean>>, setStatistics : React.Dispatch<React.SetStateAction<IStatistics>>) {
  return async function () {
    try {
      setStatisticsLoading(true);
      const res = await axios.get("/admin/statistics");      
      console.log(res);
      setStatistics(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setStatisticsLoading(false);
    }
  }
}

function getFetchCarouselImagesFunction(setCarouselLoading : React.Dispatch<React.SetStateAction<boolean>>, setCarouselImages : React.Dispatch<React.SetStateAction<Array<string | undefined>>>) {
  return async function () {
    try {
      setCarouselLoading(true);
      const res = await axios.get("/admin/get_latest_5_recipes_images");
      console.log(res);
      setCarouselImages(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setCarouselLoading(false);
    }
  }
}

