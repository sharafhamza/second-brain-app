import { FiX } from "react-icons/fi";
import { Input } from "./Input";
import Button from "./Button";

type CreateModelProps = {
  open: boolean;
  onClose: () => void; // onClose is a function that doesn't return anything (void)
};

export const CreateModel = ({ open, onClose }: CreateModelProps) => {
  return (
    <div>
      <div>
        {open && (
          <div>
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
              <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded fixed">
                  <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer">
                      <FiX />
                    </div>
                  </div>
                  <div>
                    <Input placeholder={"Title"} />
                    <Input placeholder={"Link"} />
                  </div>
                  {/* <div>
                    <h1>Type</h1>
                    <div className="flex gap-1 justify-center pb-2">
                      <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Youtube)
                                }}></Button>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                    setType(ContentType.Twitter)
                                }}></Button>
                    </div>
                  </div> */}
                  <div className="flex justify-center">
                    <Button variant="primary" title="Submit" />
                  </div>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
