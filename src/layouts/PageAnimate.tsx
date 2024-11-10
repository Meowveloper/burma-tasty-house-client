import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
    children : ReactNode;
}
export default function PageAnimate(props : Props) {
    const location = useLocation();
    return (
        <AnimatePresence>
            <motion.div key={location.pathname} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }}>
                {props.children}
            </motion.div>
        </AnimatePresence>
    );
}
