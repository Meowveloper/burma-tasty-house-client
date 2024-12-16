import { Accordion } from "flowbite-react";
import { useContext } from "react";
import { ReportDetailContext } from "../../../pages/admin/ReportDetail";
import { Badge } from "flowbite-react";
import { Table } from "flowbite-react";
export default function ReportDetailRecipe() {
    const reportDetailContext = useContext(ReportDetailContext);
    console.log("testing", reportDetailContext.nuller);
    return (
        <>
            <Accordion.Title>
                <span>Reported Recipe</span>
            </Accordion.Title>
            <Accordion.Content>
                <Accordion collapseAll>
                    {/* _id */}
                    <Accordion.Panel>
                        <Accordion.Title>ID</Accordion.Title>
                        <Accordion.Content>
                            <span className="text-white font-bold">12345</span>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* _id end */}

                    {/* title */}
                    <Accordion.Panel>
                        <Accordion.Title>Title</Accordion.Title>
                        <Accordion.Content>
                            <span className="text-white font-bold">How to bake a cake</span>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* title end */}

                    {/* image */}
                    <Accordion.Panel>
                        <Accordion.Title>Cover Image</Accordion.Title>
                        <Accordion.Content>
                            <img src="/image-placeholder.jpg" alt="" className="w-full desktop:w-[50%] mx-auto" />
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* image end */}

                    {/* description */}
                    <Accordion.Panel>
                        <Accordion.Title>Description</Accordion.Title>
                        <Accordion.Content>
                            <span className="text-white font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis temporibus, eius officia voluptates rerum molestias a deserunt natus at quidem, delectus, sunt fugit autem. Ad recusandae soluta eligendi explicabo optio.</span>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* description end */}

                    {/* preparation time & difficulty level */}
                    <Accordion.Panel>
                        <Accordion.Title>Preparation Time & Difficulty Level</Accordion.Title>
                        <Accordion.Content className="space-y-2">
                            <div>
                                Preparation time - <span className="text-white font-bold">30 min</span>
                            </div>
                            <div>
                                Difficulty Level - <span className="text-white font-bold">3 out of 10</span>
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* preparation time & difficulty level end */}

                    {/* tags */}
                    <Accordion.Panel>
                        <Accordion.Title>Tags</Accordion.Title>
                        <Accordion.Content className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                <Badge title="" className="text-[1rem] break-words text-wrap max-w-full overflow-hidden whitespace-nowrap">
                                    Tag 1
                                </Badge>
                                <Badge title="" className="text-[1rem] break-words text-wrap max-w-full overflow-hidden whitespace-nowrap">
                                    Tag 1
                                </Badge>
                                <Badge title="" className="text-[1rem] break-words text-wrap max-w-full overflow-hidden whitespace-nowrap">
                                    Tag 1
                                </Badge>
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* tags end */}

                    {/* ingredients */}
                    <Accordion.Panel>
                        <Accordion.Title>Ingredients</Accordion.Title>
                        <Accordion.Content className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                <Badge title="" color="warning" className="text-[1rem] break-words text-wrap max-w-full overflow-hidden whitespace-nowrap">
                                    Tag 1
                                </Badge>
                                <Badge title="" color="warning" className="text-[1rem] break-words text-wrap max-w-full overflow-hidden whitespace-nowrap">
                                    Tag 1
                                </Badge>
                                <Badge title="" color="warning" className="text-[1rem] break-words text-wrap max-w-full overflow-hidden whitespace-nowrap">
                                    Tag 1
                                </Badge>
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* ingredients end */}

                    {/* posted by */}
                    <Accordion.Panel>
                        <Accordion.Title>Posted By</Accordion.Title>
                        <Accordion.Content>
                            <span className="text-white font-bold">Ko Kyaw G</span>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* posted by end */}

                    {/* steps */}
                    <Accordion.Panel>
                        <Accordion.Title>Steps</Accordion.Title>
                        <Accordion.Content>
                            <div className="overflow-x-auto">
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>Image</Table.HeadCell>
                                        <Table.HeadCell>Sequence Number</Table.HeadCell>
                                        <Table.HeadCell>Description</Table.HeadCell>
                                    </Table.Head>

                                    <Table.Body className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>
                                                <img src="/image-placeholder.jpg" alt="" />
                                            </Table.Cell>
                                            <Table.Cell>1</Table.Cell>
                                            <Table.Cell className="font-medium text-gray-900 dark:text-white max-w-[200px] text-wrap break-words">lorem alsdjd adkdidfjdka akdfja;dfajk adkfiekd asdungkdfah adklajdf</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* steps end */}

                    {/* video */}
                    <Accordion.Panel>
                        <Accordion.Title>Tutorial Video</Accordion.Title>
                        <Accordion.Content>
                            <video className="w-full desktop:w-[50%] mx-auto" controls>
                                <source src="https://res.cloudinary.com/dvsrz6mfy/video/upload/v1731688476/burma-tasty-house-production/xpcmgduxny0n7sjxgezz.mp4"></source>
                            </video>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* video end */}
                </Accordion>
            </Accordion.Content>
        </>
    );
}
