import React from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { HiArrowUpTray } from "react-icons/hi2";

type InputChatProps = {
  // handleSubmit: (React.SyntheticEvent<HTMLFormElement>)=>Promise<void>;
  handleSubmit: any;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};

function InputChat({ handleSubmit, inputText, setInputText }: InputChatProps) {
  console.log(inputText);
  return (
    <div className="input-all">
      <form style={{ width: "80%" }} onSubmit={handleSubmit}>
        <input
          placeholder="Type a Message"
          className="input-chat"
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="btn-chat">
          <div>
            <MdOutlineAttachFile />
            <HiArrowUpTray />
          </div>
          <button className="btn-send" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputChat;
