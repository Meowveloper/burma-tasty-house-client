import { Table } from "flowbite-react";

interface IProps {
    reason: string;
    recipe_title: string;
    comment_body?: string | null;
    report_id: string;
}
export default function MainTableRow(props: IProps) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-wrap font-medium text-gray-900 dark:text-white min-w-[200px] max-w-[200px] text-justify">{props.reason}</Table.Cell>
            <Table.Cell>{props.recipe_title}</Table.Cell>
            <Table.Cell>{props.comment_body ? props.comment_body : "-"}</Table.Cell>
            <Table.Cell>
                <div className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">View</div>
            </Table.Cell>
        </Table.Row>
    );
}
