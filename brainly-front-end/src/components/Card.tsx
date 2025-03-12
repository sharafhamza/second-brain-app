import { IoDocumentTextOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const Card = ({ title, link, type }: CardProps) => {
  return (
    <div
      className={`w-1/3  bg-white p-4 border-slate-200 border rounded-2xl ${
        type === "youtube" && "h-[400px]"
      }`}
    >
      <div className="flex justify-between">
        <div className="flex gap-1.5">
          <IoDocumentTextOutline className="text-2xl text-icon cursor-pointer" />
          <p className="font-medium">{title}</p>
        </div>
        <div className="flex gap-3">
          <IoShareSocialOutline className="text-2xl text-icon cursor-pointer" />
          <AiTwotoneDelete className="text-2xl text-icon cursor-pointer" />
        </div>
      </div>
      <div className="rounded-xl  pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full h-[330px]"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default Card;
