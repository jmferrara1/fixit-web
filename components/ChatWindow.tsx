import React, { useState, useEffect, useRef } from "react";

export default function ChatWindow() {
  const [msgs, setMsgs] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const bottom = useRef<HTMLDivElement>(null);

  const send = async () => {
    setMsgs([...msgs, { role: "user", content: input }]);
    const res = await fetch("/api/ai/diagnose", {
      method: "POST",
      body: JSON.stringify({ description: input }),
    });
    const { reply } = await res.json();
    setMsgs(m => [...m, { role: "assistant", content: reply }]);
    setInput("");
  };

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span className="inline-block bg-gray-200 rounded p-2">{m.content}</span>
          </div>
        ))}
        <div ref={bottom} />
      </div>
      <div className="p-4 border-t">
        <input
          className="w-full p-2 border rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
        />
      </div>
    </div>
  );
}
