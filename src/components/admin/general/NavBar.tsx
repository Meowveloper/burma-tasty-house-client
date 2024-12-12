import { Button } from "flowbite-react";
import { useMemo, useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import SideDrawerBody from "./SideDrawerBody";
import { useLocation } from "react-router-dom";

export default function AdminNavBar() {
  const [isOpen, setIsOpen] = useState(true);

  const location = useLocation();
  const path = location.pathname;
  const handleClose = useMemo(() => () => { setIsOpen(false) }, []);
  useEffect(() => {
    console.log('changed', path);
    handleClose();
  }, [path, handleClose]);

  return (
    <>
      <div className="flex items-center justify-between w-full border-b border-dark-border py-5 px-3 tablet:px-7 desktop:px-10">
        <Button onClick={() => setIsOpen(true)} color="dark">
            <FiMenu></FiMenu>
        </Button>
      </div>

      <SideDrawerBody isOpen={isOpen} handleClose={handleClose}></SideDrawerBody>
    </>
  );

}
