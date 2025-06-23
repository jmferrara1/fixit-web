import { useState } from "react";

export default function PhotoUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [desc, setDesc] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const fd = new FormData();
    if (file) fd.append("photo", file);
    fd.append("description", desc);
    const res = await fetch("/api/ai/diagnose", { method: "POST", body: fd });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <input className="border p-2" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe issue" />
      <button className="bg-blue-500 text-white px-2" onClick={send}>Send</button>
      {reply && <div className="p-2 bg-gray-100">{reply}</div>}
    </div>
  );
}
