"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddPostForm.module.css";

const Select = ({ value = [], title, name, onChange, values }) => {
  return (
    <div>
      <p>{title || name}</p>
      {values.map(el => (
        <button
          type="button"
          className={styles.select_button}
          key={el}
          style={{ opacity: value.includes(el) ? 1 : 0.3 }}
          onClick={() =>
            onChange({ target: { value: [...new Set([...value, el])], name } })
          }
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default function AddPostForm({ title, fields = [] }) {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    const data = await fetch("/api/newPost", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const json = await data.json();
    console.log("data", json);
    if (json.result) router.refresh();
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{title}</h3>
      {fields.map(field =>
        field.type === "select" ? (
          <Select
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ) : (
          <input
            key={field.name}
            value={formData[field.name]}
            {...field}
            placeholder={field.placeholder || field.name}
            onChange={handleChange}
          />
        )
      )}
      <button type="Submit">Submit</button>
    </form>
  );
}
