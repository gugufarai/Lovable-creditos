"use client";
import { useState } from "react";

export default function Home() {
  const [repo, setRepo] = useState("");
  const [prompt, setPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [status, setStatus] = useState("");

  async function executar() {
    setStatus("⏳ A IA está a trabalhar...");

    const res = await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo, prompt, systemPrompt })
    });

    const data = await res.json();
    setStatus(data.message);
  }

  return (
    <main style={{ padding: 30, maxWidth: 900 }}>
      <h1>AI GitHub Updater</h1>

      <input
        type="text"
        placeholder="Link do repositório GitHub"
        value={repo}
        onChange={e => setRepo(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <textarea
        placeholder="O que a IA deve mudar no projeto"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ width: "100%", height: 120, marginBottom: 10 }}
      />

      <textarea
        placeholder="Como a IA deve funcionar (regras)"
        value={systemPrompt}
        onChange={e => setSystemPrompt(e.target.value)}
        style={{ width: "100%", height: 120, marginBottom: 10 }}
      />

      <button onClick={executar}>
        Executar IA + Commit no GitHub
      </button>

      <p>{status}</p>
    </main>
  );
}
