import React from "react";

type ChatClientProps = {
  chatYou: string;
};

function ChatClient({ chatYou }: ChatClientProps) {
  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div className="chat-admin">
            <div>
              <h3 style={{ padding: "5px" }}>
                <span
                  style={{ fontSize: "16px", color: "gray", margin: "10px" }}
                >
                  2 min
                </span>
                You{" "}
              </h3>
            </div>
            <div>
              <img
                src="https://preview.keenthemes.com/metronic8/react/demo1/media/avatars/300-1.jpg"
                alt="profile"
                className="profile"
              />
            </div>
          </div>
        </div>
        <div className="card-admin">
          <h3>
            {/* Hey there, we’re just writing to let you know that you’ve been
            subscribed to a repository on GitHub...... */}
            {chatYou}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ChatClient;
