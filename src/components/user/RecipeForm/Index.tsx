import { useState } from "react";
import UserRecipeFormTab1 from "./Tab1";
import { motion } from "framer-motion";
import UserRecipeFormTab2 from "./Tab2";
import UserRecipeFormTab3 from "./Tab3";
import UserRecipeFormTab4 from "./Tab4";
import UserRecipeFormTab5 from "./Tab5";
import IRecipe from "../../../types/IRecipe";
import EnumRecipeFormActions from "../../../types/EnumRecipeFormActions";
import UserRecipeFormInstructions from "./Instructions";

type TTabNumber = 1 | 2 | 3 | 4 | 5;
interface IProps {
    action: EnumRecipeFormActions;
    setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
    recipe: IRecipe;
    setRecipe: React.Dispatch<React.SetStateAction<IRecipe>>;
    saveRecipe: () => void;
    formLoading: boolean;
    pageStart: boolean;
    setPageStart: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Index(props: IProps) {
    const [tabNumber, setTabNumber] = useState<TTabNumber>(1);

    return (
        <div className="flex justify-between items-stretch">
            <div className="w-full desktop:w-[55%]">
                <div className="dark:bg-dark-elevate py-3 rounded-normal flex w-full justify-between px-9">
                    <div onClick={changeTab(1)} className={`${tabNumber === 1 ? "dark:bg-dark-card text-dark-text-highlight" : "dark:bg-dark-secondary-card"} h-[25px] w-[25px] leading-[25px] text-center rounded-full cursor-pointer`}>1</div>
                    <div onClick={changeTab(2)} className={`${tabNumber === 2 ? "dark:bg-dark-card text-dark-text-highlight" : "dark:bg-dark-secondary-card"} h-[25px] w-[25px] leading-[25px] text-center rounded-full cursor-pointer`}>2</div>
                    <div onClick={changeTab(3)} className={`${tabNumber === 3 ? "dark:bg-dark-card text-dark-text-highlight" : "dark:bg-dark-secondary-card"} h-[25px] w-[25px] leading-[25px] text-center rounded-full cursor-pointer`}>3</div>
                    <div onClick={changeTab(4)} className={`${tabNumber === 4 ? "dark:bg-dark-card text-dark-text-highlight" : "dark:bg-dark-secondary-card"} h-[25px] w-[25px] leading-[25px] text-center rounded-full cursor-pointer`}>4</div>
                    <div onClick={changeTab(5)} className={`${tabNumber === 5 ? "dark:bg-dark-card text-dark-text-highlight" : "dark:bg-dark-secondary-card"} h-[25px] w-[25px] leading-[25px] text-center rounded-full cursor-pointer`}>5</div>
                </div>

                <div className="dark:bg-dark-secondary-card mt-5 py-3 rounded-normal px-3 tablet:px-6 desktop:px-8">
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 1 ? 1 : 0, height: tabNumber === 1 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                        {tabNumber === 1 && <UserRecipeFormTab1 recipe={props.recipe} setRecipe={props.setRecipe} pageStart={props.pageStart} setPageStart={props.setPageStart}></UserRecipeFormTab1>}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 2 ? 1 : 0, height: tabNumber === 2 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                        {tabNumber === 2 && <UserRecipeFormTab2 recipe={props.recipe} setRecipe={props.setRecipe} pageStart={props.pageStart} setPageStart={props.setPageStart}></UserRecipeFormTab2>}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 3 ? 1 : 0, height: tabNumber === 3 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                        {tabNumber === 3 && <UserRecipeFormTab3 recipe={props.recipe} setRecipe={props.setRecipe} pageStart={props.pageStart} setPageStart={props.setPageStart}></UserRecipeFormTab3>}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 4 ? 1 : 0, height: tabNumber === 4 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                        {tabNumber === 4 && <UserRecipeFormTab4 recipe={props.recipe} setRecipe={props.setRecipe} pageStart={props.pageStart} setPageStart={props.setPageStart}></UserRecipeFormTab4>}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: tabNumber === 5 ? 1 : 0, height: tabNumber === 5 ? "auto" : 0 }} transition={{ duration: 0.3 }}>
                        {tabNumber === 5 && <UserRecipeFormTab5 recipe={props.recipe} setRecipe={props.setRecipe} pageStart={props.pageStart} setPageStart={props.setPageStart}></UserRecipeFormTab5>}
                    </motion.div>
                    <div className="text-center mb-4">
                        <button onClick={previous} className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[60px] rounded-small me-3">
                            Previous
                        </button>
                        <button onClick={next} className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[60px] rounded-small">
                            Next
                        </button>
                    </div>
                    <div className="text-center">
                        <button onClick={props.saveRecipe} className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[60px] rounded-small me-3">
                            {props.formLoading && <div className="recipe-form-loader m-auto"></div>}
                            {!props.formLoading && <span>Save</span>}
                        </button>
                        <button
                            onClick={() => {
                                props.setShowPreview(true);
                            }}
                            className="dark:bg-dark-elevate disabled:bg-dark-bg hover:dark:bg-dark-card w-[140px] h-[60px] rounded-small"
                        >
                            Show Preview
                        </button>
                    </div>
                    <div className="bg-transparent mb-4 w-[95%] mx-auto h-[1px]"></div>
                </div>
            </div>
            <div className="hidden desktop:block desktop:w-[40%]">
               <UserRecipeFormInstructions tabNumber={tabNumber}></UserRecipeFormInstructions> 
            </div>
        </div>
    );

    function next() {
        setTabNumber(prev => {
            if (prev !== 5) return (prev + 1) as TTabNumber;
            else return prev;
        });
    }

    function previous() {
        setTabNumber(prev => {
            if (prev !== 1) return (prev - 1) as TTabNumber;
            else return prev;
        });
    }


    function changeTab(tab: TTabNumber) {
        return function () {
            setTabNumber(tab);
        }
    }
}
