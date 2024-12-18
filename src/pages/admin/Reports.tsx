import { Table, Pagination } from "flowbite-react";
import MainTableRow from "../../components/admin/reports/MainTableRow";
import { useState, useMemo, useEffect } from "react";
import IReport from "../../types/IReport";
import axios from '../../utilities/axios';
import IPagination from "../../types/IPagination";
export default function AdminReports() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [ reports , setReports ] = useState<IReport[]>([]);
    const [ pagination, setPagination ] = useState<IPagination | null>(null);
    const fetchReports = useMemo(() => getFetchReportsFunction(setReports, setLoading, setPagination), []);

    useEffect(() => {
        console.log("checking infinite loop from pages/admin/Reports.tsx");
        fetchReports(currentPage);
    }, [fetchReports, currentPage]);
    return (
        <div>
            <div className="text-h1 font-bold mb-6"></div>
            <div className="overflow-x-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell className="max-w-[200px] min-w-[200px]">Reason</Table.HeadCell>
                        <Table.HeadCell>Recipe Title</Table.HeadCell>
                        <Table.HeadCell>Comment</Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {loading ? (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell colSpan={4} className="text-center">
                                    Loading...
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            !!reports.length && reports.map((report : IReport) => (
                                <MainTableRow
                                    key={report._id}
                                    reason={report.body}
                                    recipe_title={report.recipe && typeof report.recipe === "object" ? report.recipe.title : ""}
                                    report_id={report._id ? report._id : ""}
                                ></MainTableRow>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </div>
            { !!pagination && (
                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination currentPage={currentPage} totalPages={pagination.totalPages} onPageChange={onPageChange} showIcons />
                </div>
            )}
        </div>
    );
    function onPageChange(page: number) {
        setCurrentPage(page);
    }
}
function getFetchReportsFunction (setLatestReports : React.Dispatch<React.SetStateAction<IReport[]>>, setLatestReportsLoading : React.Dispatch<React.SetStateAction<boolean>>, setPagination : React.Dispatch<React.SetStateAction<IPagination | null>>) {
  return async function (page : number) {
    try {
      setLatestReportsLoading(true);
      const res = await axios.get(`/admin/reports/with_pagination?page=${page}&limit=5`);
      console.log(res);
      setLatestReports(res.data.data);
      setPagination(res.data.pagination);
    } catch (e) {
      console.log(e);
    } finally {
      setLatestReportsLoading(false);
    }
  }
}
