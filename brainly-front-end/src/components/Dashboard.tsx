import Sideber from "./Sideber";
import Card from "./Card";
import Button from "./Button";
import PlusIcon from "./icons/PlusIcon";
import ShareIcons from "./icons/ShareIcons";
import { useState } from "react";
import { CreateModel } from "./createModel";
const Dashboard = () => {
  const [open, setOnClose] = useState(false);
  return (
    <div className="bg-slate-100">
      <Sideber />
      <CreateModel open={open} onClose={() => setOnClose(false)} />
      <div className="ml-[18%] mr-[4%] h-screen">
        <div className="flex justify-between items-center pt-4 mb-6">
          <h2 className="font-bold text-3xl">All Notes</h2>
          <div className="flex">
            <Button
              onClick={() => setOnClose(true)}
              title="Add Content"
              icon={<PlusIcon />}
              variant="primary"
            />
            <Button
              title="Share Brain"
              icon={<ShareIcons />}
              variant="secondary"
            />
          </div>
        </div>
        <div className="flex gap-10 ">
          <Card
            title="Web 3 stuff"
            type="twitter"
            link="https://x.com/jacques_web3/status/1849197399815635268"
          />
          <Card
            title="About Jobs"
            type="youtube"
            link="https://www.youtube.com/watch?v=IYRN2nxw1hA"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
