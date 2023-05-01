import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { OpenAIApi, Configuration } from "openai";
import InputChat from "./InputChat";
import ChatAdminBot from "./ChatAdminBot";
import ChatClient from "./ChatClient";

const apiKey = "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";
const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

type OutputItem = { type: string; responseAi: string };

function ChatBot() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputItem[]>([]);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: input,
        max_tokens: 200,
      });

      console.log("response", response);
      const responseAi = response.data.choices[0].text;
      setOutput([
        ...output,
        { type: "user", responseAi: input },
        { type: "bot", responseAi: responseAi },
      ] as OutputItem[]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("output:...", output);

  return (
    <div>
      <div className="header" style={{}}>
        <div>
          <h3>Brian Chox</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <div className="badge"></div>
            active
          </div>
        </div>
        <div className="btns">
          <button className="btn">
            <BiDotsHorizontalRounded />
          </button>
          <button className="btn">
            <AiOutlineClose />
          </button>
        </div>
      </div>
      <div className="chat">
        {output.length === 0 ? (
          <div
            style={{
              width: "100%",
              height: "50vh",
            }}
          ></div>
        ) : (
          <>
            {output?.map((item, index) => (
              <div key={index}>
                {item.type === "user" ? (
                  <div>
                    <ChatClient chatYou={item?.responseAi} />
                  </div>
                ) : (
                  <div>
                    <ChatAdminBot chatBot={item?.responseAi} />
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        <InputChat
          handleSubmit={handleSubmit}
          inputText={input}
          setInputText={setInput}
        />
      </div>
    </div>
  );
}

export default ChatBot;
