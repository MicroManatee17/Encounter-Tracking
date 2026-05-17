import { useState } from "react";

export default function AddAreaForm({ onAdd }: any) {
  const [name, setName] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name);
        setName("");
      }}
    >
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Area name"
      />
      <button>Add Area</button>
    </form>
  );
}