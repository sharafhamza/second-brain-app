import { AiOutlineYoutube } from "react-icons/ai";
import SideberItem from "./SideberItem";
import { BsTwitterX } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";

import { LuBrain } from "react-icons/lu";

const Sideber = () => {
  return (
    <div className="bg-main-bg">
      <div className="w-[15%] bg-white pl-9 h-screen absolute left-0 top-0 border-r-slate-300 border-r-2">
        <div className="flex items-center gap-3 my-4 mb-8">
          <LuBrain className="text-primary text-4xl" />
          <h2 className="text-2xl font-bold">Second Brain</h2>
        </div>

        <SideberItem
          title="Twitter"
          icon={<BsTwitterX className="text-lg" />}
        />
        <SideberItem
          title="Youtube"
          icon={<AiOutlineYoutube className="text-2xl" />}
        />
        <SideberItem
          title="Documents"
          icon={<IoDocumentTextOutline className="text-2xl" />}
        />
        <SideberItem
          title="Links"
          icon={<IoLinkSharp className="text-2xl" />}
        />
        <SideberItem title="Tags" icon={<FaHashtag className="text-2xl" />} />
      </div>
    </div>
  );
};

export default Sideber;
