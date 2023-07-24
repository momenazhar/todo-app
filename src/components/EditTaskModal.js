import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { styled, keyframes } from "styled-components";
import { BaseButton } from "./GlobalStyles";

const EditTaskModal = ({
  setTasks,
  setHistory,
  task,
  setExpandedCategories,
}) => {
  const [open, setOpen] = useState(false);

  function handleEdit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData
      .get("name")
      ?.toLowerCase()
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    const category = formData
      .get("category")
      ?.toLowerCase()
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    const time = new Date().toUTCString();

    if (!name || !category) return;

    setHistory((history) => [
      ...history,
      {
        ...task,
        name: name === task.name ? name : `${task.name} → ${name}`,
        category:
          category === task.category
            ? category
            : `${task.category} → ${category}`,
        time,
        status: "Modified",
      },
    ]);

    setTasks((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...task, name, category } : t))
    );

    // Update the expandedCategories state to include the modified category
    setExpandedCategories((prevExpandedCategories) => ({
      ...prevExpandedCategories,
      [category]: true, // Set the category as expanded
    }));

    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <BaseButton>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.1956 8.00232C14.9835 8.00232 14.7801 8.08658 14.6301 8.23657C14.4801 8.38655 14.3958 8.58998 14.3958 8.80209V13.6007C14.3958 13.8128 14.3116 14.0162 14.1616 14.1662C14.0116 14.3162 13.8082 14.4005 13.5961 14.4005H2.3993C2.18719 14.4005 1.98377 14.3162 1.83378 14.1662C1.6838 14.0162 1.59954 13.8128 1.59954 13.6007V2.40394C1.59954 2.19183 1.6838 1.98841 1.83378 1.83842C1.98377 1.68843 2.18719 1.60417 2.3993 1.60417H7.19791C7.41003 1.60417 7.61345 1.51991 7.76343 1.36993C7.91342 1.21994 7.99768 1.01652 7.99768 0.804405C7.99768 0.592294 7.91342 0.38887 7.76343 0.238884C7.61345 0.0888983 7.41003 0.00463733 7.19791 0.00463733H2.3993C1.76297 0.00463733 1.1527 0.257421 0.70274 0.707377C0.252783 1.15733 0 1.76761 0 2.40394V13.6007C0 14.237 0.252783 14.8473 0.70274 15.2973C1.1527 15.7472 1.76297 16 2.3993 16H13.5961C14.2324 16 14.8427 15.7472 15.2926 15.2973C15.7426 14.8473 15.9954 14.237 15.9954 13.6007V8.80209C15.9954 8.58998 15.9111 8.38655 15.7611 8.23657C15.6111 8.08658 15.4077 8.00232 15.1956 8.00232ZM3.19907 8.61014V12.0012C3.19907 12.2133 3.28333 12.4167 3.43332 12.5667C3.58331 12.7167 3.78673 12.8009 3.99884 12.8009H7.38986C7.49511 12.8015 7.59945 12.7814 7.69689 12.7416C7.79434 12.7018 7.88296 12.6431 7.95769 12.569L13.4921 7.0266L15.7634 4.80325C15.8384 4.7289 15.8979 4.64044 15.9385 4.54298C15.9791 4.44552 16 4.34099 16 4.23541C16 4.12983 15.9791 4.0253 15.9385 3.92784C15.8979 3.83038 15.8384 3.74192 15.7634 3.66758L12.3724 0.23657C12.2981 0.161609 12.2096 0.102111 12.1122 0.0615077C12.0147 0.0209045 11.9102 0 11.8046 0C11.699 0 11.5945 0.0209045 11.497 0.0615077C11.3995 0.102111 11.3111 0.161609 11.2367 0.23657L8.9814 2.49991L3.43101 8.04231C3.35688 8.11704 3.29824 8.20566 3.25844 8.30311C3.21864 8.40055 3.19846 8.50489 3.19907 8.61014ZM11.8046 1.93208L14.0679 4.19542L12.9323 5.33109L10.6689 3.06775L11.8046 1.93208ZM4.79861 8.93805L9.54123 4.19542L11.8046 6.45877L7.06195 11.2014H4.79861V8.93805Z"
              fill="black"
            />
          </svg>
          Modify
        </BaseButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <StyledDialogOverlay />
        <StyledDialogContent>
          <h2>Modifying: {task.name}</h2>
          <StyledForm onSubmit={handleEdit}>
            <StyledName
              name="name"
              type="text"
              defaultValue={task.name}
              placeholder="Insert task name"
              maxLength="32"
            />
            <StyledName
              name="category"
              type="text"
              defaultValue={task.category}
              placeholder="Insert category name"
              maxLength="32"
            />
            <BaseButton type="submit">Modify</BaseButton>
          </StyledForm>
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.6rem;
  border-radius: 1.3rem;
  margin: 1rem 2rem 0rem 0rem;
  background-color: lightblue;
  justify-content: space-between;
`;

const StyledName = styled.input`
  background-color: white;
  border: none;
  outline: none;
  border-radius: 0.7rem;
  padding: 0.2rem 0.8rem;
  height: 2rem;
  width: 100%;
  margin-right: 0.6rem;
  font-size: 1.6rem;
  color: #1f1f1f;
`;

const overlayShow = keyframes`
  from {
    opacity: 0;
  } 
  to {
    opacity: 1;
  }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const StyledDialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const StyledDialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`;

export default EditTaskModal;
