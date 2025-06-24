import React, { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";
import { useSession, signIn } from "next-auth/react";

export default function ChatWindow() {
  const { data: session, status } = useSession();
  const [msgs, setMsgs] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [planId, setPlanId] = useState<string | null>(null);
  const bottom = useRef<HTMLDivElement>(null);

  const send = async () => {
    if (!session) return signIn();
    let pid = planId;
    if (!pid) {
      const resp = await fetch("/api/plans/create", { method: "POST" });
      const data = await resp.json();
      pid = data.planId;
      setPlanId(pid);
    }
    setMsgs([...msgs, { role: "user", content: input }]);
    const res = await fetch("/api/ai/diagnose", {
      method: "POST",
      body: JSON.stringify({ description: input, planId: pid }),
    });
    const { reply } = await res.json();
    setMsgs(m => [...m, { role: "assistant", content: reply }]);
    setInput("");
  };

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  if (status === "loading")
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  if (!session) return <div>Please sign in to chat.</div>;

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
