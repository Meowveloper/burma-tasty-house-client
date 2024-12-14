import { Table, Pagination } from "flowbite-react";
import MainTableRow from "../../components/admin/reports/MainTableRow";
import { useState } from "react";
export default function AdminReports() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    console.log("set loading", setLoading);
    const example_reason_string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam laboriosam et necessitatibus distinctio voluptatibus nihil debitis, sint optio voluptates deleniti facere suscipit non ex ducimus, minus accusamus adipisci maxime itaque.";
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
                            <>
                                <MainTableRow reason={example_reason_string} recipe_title="Recipe Title" comment_body="Comment Body" report_id="12345"></MainTableRow>
                                <MainTableRow reason="Spam" recipe_title="Recipe Title" comment_body="Comment Body" report_id="12345"></MainTableRow>
                                <MainTableRow reason="Spam" recipe_title="Recipe Title" comment_body="Comment Body" report_id="12345"></MainTableRow>
                            </>
                        )}
                    </Table.Body>
                </Table>
            </div>
            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} showIcons />
            </div>
        </div>
    );
    function onPageChange(page: number) {
        setCurrentPage(page);
    }
}
