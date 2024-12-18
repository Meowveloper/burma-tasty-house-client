import { Accordion } from "flowbite-react";
import { useContext } from "react";
import { ReportDetailContext } from "../../../pages/admin/ReportDetail";
import { Badge } from "flowbite-react";
import { Table } from "flowbite-react";
import ITag from "../../../types/ITag";
import IStep from "../../../types/IStep";
export default function ReportDetailRecipe() {
    const reportDetailContext = useContext(ReportDetailContext);
    console.log("testing", reportDetailContext.report?.recipe);
    const recipe = reportDetailContext.report?.recipe;
    if (!recipe)
        return (
            <>
                <Accordion.Title>
                    <span>Reported Recipe</span>
                </Accordion.Title>
                <Accordion.Content>
                    <span className="text-white font-bold">No Data</span>
                </Accordion.Content>
            </>
        );
    if (typeof recipe === "string")
        return (
            <>
                <Accordion.Title>
                    <span>Reported Recipe</span>
                </Accordion.Title>
                <Accordion.Content>
                    {/* _id */}
                    <Accordion.Panel>
                        <Accordion.Title>ID</Accordion.Title>
                        <Accordion.Content>
                            <span className="text-white font-bold">{recipe}</span>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* _id end */}
                </Accordion.Content>
            </>
        );
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
                            <span className="text-white font-bold">{recipe._id}</span>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* _id end */}

                    {/* title */}
                    <Accordion.Panel>
                        <Accordion.Title>Title</Accordion.Title>
                        <Accordion.Content>
                            <span className="text-white font-bold">{recipe.title}</span>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* title end */}

                    {/* image */}
                    <Accordion.Panel>
                        <Accordion.Title>Cover Image</Accordion.Title>
                        <Accordion.Content>
                            <img src={recipe.image ? (typeof recipe.image === "string" ? recipe.image : URL.createObjectURL(recipe.image)) : "/image-placeholder.jpg"} alt="" className="w-full desktop:w-[50%] mx-auto" />
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* image end */}

                    {/* description */}
                    <Accordion.Panel>
                        <Accordion.Title>Description</Accordion.Title>
                        <Accordion.Content>
                            <span className="text-white font-bold">{recipe.description}</span>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* description end */}

                    {/* preparation time & difficulty level */}
                    <Accordion.Panel>
                        <Accordion.Title>Preparation Time & Difficulty Level</Accordion.Title>
                        <Accordion.Content className="space-y-2">
                            <div>
                                Preparation time - <span className="text-white font-bold">{recipe.preparation_time} min</span>
                            </div>
                            <div>
                                Difficulty Level - <span className="text-white font-bold">{recipe.difficulty_level} out of 10</span>
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* preparation time & difficulty level end */}

                    {/* tags */}
                    {recipe.tags.length ? (
                        <Accordion.Panel>
                            <Accordion.Title>Tags</Accordion.Title>
                            <Accordion.Content className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {recipe.tags.map((item: ITag | string) => (
                                        <Badge key={typeof item === "string" ? item : item._id} title="" className="text-[1rem] break-words text-wrap max-w-full overflow-hidden whitespace-nowrap">
                                            {typeof item === "string" ? item : item.name}
                                        </Badge>
                                    ))}
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                    ) : (
                        <></>
                    )}
                    {/* tags end */}

                    {/* ingredients */}
                    {recipe.ingredients.length ? (
                        <Accordion.Panel>
                            <Accordion.Title>Ingredients</Accordion.Title>
                            <Accordion.Content className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {recipe.ingredients.map((item: string, i) => (
                                        <Badge key={i} title="" color="warning" className="text-[1rem] break-words text-wrap max-w-full overflow-hidden whitespace-nowrap">
                                            {item}
                                        </Badge>
                                    ))}
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                    ) : (
                        <></>
                    )}
                    {/* ingredients end */}

                    {/* posted by */}
                    <Accordion.Panel>
                        <Accordion.Title>Posted By</Accordion.Title>
                        <Accordion.Content>
                            <span className="text-white font-bold">{typeof recipe.user === "string" ? recipe.user : recipe.user.name}</span>
                        </Accordion.Content>
                    </Accordion.Panel>
                    {/* posted by end */}

                    {/* steps */}
                    {recipe.steps.length ? (
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
                                            { recipe.steps.map((item : IStep | string) => (
                                                <Table.Row key={typeof item === "string" ? item : item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                    <Table.Cell>
                                                        {(typeof item === "string" || !item.image) ? (
                                                            <span></span>
                                                        ) : (
                                                            <a href={typeof item.image === "string" ? item.image : URL.createObjectURL(item.image)} target="_blank">
                                                                <img src={typeof item.image === "string" ? item.image : URL.createObjectURL(item.image)} />
                                                            </a>
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>{typeof item === "string" ? item : item.sequence_number}</Table.Cell>
                                                    <Table.Cell className="font-medium text-gray-900 dark:text-white max-w-[200px] text-wrap break-words">
                                                        {typeof item === "string" ? item : item.description}
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </div>
                            </Accordion.Content>
                        </Accordion.Panel>
                    ) : (
                        <></>
                    )}
                    {/* steps end */}

                    {/* video */}
                        <Accordion.Panel>
                            <Accordion.Title>Tutorial Video</Accordion.Title>
                            {recipe.video ? (
                                <Accordion.Content>
                                    <video className="w-full desktop:w-[50%] mx-auto" controls>
                                        <source src={typeof recipe.video === 'string' ? recipe.video : URL.createObjectURL(recipe.video)}></source>
                                    </video>
                                </Accordion.Content>
                            ) : (
                                <Accordion.Content>
                                    <span className="">No video</span>
                                </Accordion.Content>
                            )}
                        </Accordion.Panel>
                    {/* video end */}
                </Accordion>
            </Accordion.Content>
        </>
    );
}
