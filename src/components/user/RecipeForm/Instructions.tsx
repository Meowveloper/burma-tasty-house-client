import { motion } from "framer-motion";
type TTabNumber = 1 | 2 | 3 | 4 | 5;
interface IProps {
    tabNumber: TTabNumber;
}
export default function Instructions({ tabNumber }: IProps) {
    return (
        <div className="w-full dark:bg-dark-secondary-card p-3 rounded-normal">
            <div className="px-5 py-6">
                {/* tab 1 */}
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 1 ? 1 : 0, height: tabNumber === 1 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                    <div>
                        {/* title */}
                        <div>
                            <div className="text-h1 font-bold dark:text-dark-text-highlight">Title</div>
                            <div className="mt-4">
                                The title of your recipe, make it short and simple, catchy and unique.
                            </div>
                        </div>
                        {/* title end */}
                        <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div> {/* horizontal line */}

                        {/* image */}
                        <div>
                            <div className="text-h1 font-bold dark:text-dark-text-highlight">Image</div>
                            <div className="mt-4">
                                Main cover image of your recipe. You should add your final result of the recipe. 
                            </div>
                        </div>
                        {/* image end */}
                        <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div> {/* horizontal line */}

                        {/* description */}
                        <div>
                            <div className="text-h1 font-bold dark:text-dark-text-highlight">Description</div>
                            <div className="mt-4">
                                A brief description of your recipe. 
                            </div>
                        </div>
                        {/* description end */}
                        <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div> {/* horizontal line */}

                        {/* preparation_time */}
                        <div>
                            <div className="text-h1 font-bold dark:text-dark-text-highlight">Preparation Time</div>
                            <div className="mt-4">
                               Estimated total time required to prepare your recipe.
                            </div>
                        </div>
                        {/* preparation_time end */}
                        <div className="dark:bg-dark-border my-4 w-[95%] mx-auto h-[1px]"></div> {/* horizontal line */}

                        {/* difficulty_level */}
                        <div>
                            <div className="text-h1 font-bold dark:text-dark-text-highlight">Difficulty Level</div>
                            <div className="mt-4">
                               Select the difficulty level of your recipe. How much cooking experience would it need to prepare your recipe?
                            </div>
                        </div>
                        {/* difficulty_level end */}
                    </div>
                </motion.div>
                {/* tab 1 end */}

                {/* tab 2 */}
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 2 ? 1 : 0, height: tabNumber === 2 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                    <div>
                        {/* tags */}
                        <div>
                            <div className="text-h1 font-bold dark:text-dark-text-highlight">Tags</div>
                            <div className="mt-4">
                               Select the tags of your recipe. The tags should be related to your recipe so that users can find your recipe easily.
                            </div>
                        </div>
                        {/* tags end */}
                    </div>
                </motion.div>
                {/* tab 2 end */}

                {/* tab 3 */}
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 3 ? 1 : 0, height: tabNumber === 3 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                    <div>
                        {/* ingredients */}
                        <div>
                            <div className="text-h1 font-bold dark:text-dark-text-highlight">Ingredients</div>
                            <div className="mt-4">
                                Add the ingredients that will be necessary to prepare your recipe.
                            </div>
                        </div>
                        {/* ingredients end */}
                    </div>
                </motion.div>
                {/* tab 3 end */}

                {/* tab 4 */}
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 4 ? 1 : 0, height: tabNumber === 4 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                    <div>
                        {/* steps */}
                        <div>
                            <div className="text-h1 font-bold dark:text-dark-text-highlight">Steps</div>
                            <div className="mt-4">
                                A step by step guide to prepare your recipe.
                            </div>
                        </div>
                        {/* steps end */}
                    </div>
                </motion.div>
                {/* tab 4 end */}

                {/* tab 5 */}
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 5 ? 1 : 0, height: tabNumber === 5 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                    <div>
                        {/* video */}
                        <div>
                            <div className="text-h1 font-bold dark:text-dark-text-highlight">Video</div>
                            <div className="mt-4">
                                A tutorial video of how to prepare your recipe.
                            </div>
                        </div>
                        {/* video end */}
                    </div>
                </motion.div>
                {/* tab 5 end */}
            </div>
        </div>
    );
}
