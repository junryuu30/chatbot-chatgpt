import React from "react";

type ChatAdminBotProps = {
  chatBot: string;
};

function ChatAdminBot({ chatBot }: ChatAdminBotProps) {
  return (
    <div style={{ padding: "20px" }}>
      <div className="chat-client">
        <div>
          <img
            src="https://preview.keenthemes.com/metronic8/react/demo1/media/avatars/300-25.jpg"
            alt="profile"
            className="profile"
          />
        </div>
        <div>
          <h3 style={{ padding: "5px" }}>
            Admin Bot{" "}
            <span style={{ fontSize: "16px", color: "gray" }}>2 min</span>
          </h3>
        </div>
      </div>
      <div className="card-client">
        <h3>
          {chatBot}
          {/* .......... How likely are you to recommend our company to your friends
          and family ? */}
        </h3>
      </div>
    </div>
  );
}

export default ChatAdminBot;
