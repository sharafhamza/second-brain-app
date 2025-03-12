import { ReactElement } from "react";

interface itemInterface {
  title: string;
  icon: ReactElement;
}

const SideberItem = ({ title, icon }: itemInterface) => {
  return (
    <div className="w-full rounded-md flex cursor-pointer hover:scale-110 transition-all duration-150 items-center gap-3 hover:bg-slate-100 hover:text-primary  p-3 ">
      {icon}
      <p>{title}</p>
    </div>
  );
};

export default SideberItem;
