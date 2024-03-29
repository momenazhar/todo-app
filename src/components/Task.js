import styled from "styled-components";
import EditTaskModal from "./EditTaskModal";
import { BaseH2, BaseButton } from "./GlobalStyles";

const Task = ({ task, setTasks, setHistory, setExpandedCategories }) => {
  const deleteHandler = () => {
    const time = new Date().toUTCString();
    setHistory((history) => [...history, { ...task, time, status: "Deleted" }]);
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  };

  const doneHandler = () => {
    const time = new Date().toUTCString();

    setHistory((history) => [
      ...history,
      { ...task, time, status: "Completed" },
    ]);

    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  };

  return (
    <StyledDiv>
      <StyledName>{task.name}</StyledName>
      <InnerDiv>
        <BaseButton
          onClick={doneHandler}
          style={{
            backgroundColor: "var(--color-green)",
            color: "white",
            border: "0.1rem solid var(--color-lightgreen)",
          }}
        >
          <svg
            width="19"
            height="14"
            viewBox="0 0 19 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.57257 14C6.39436 14.0002 6.21786 13.9646 6.05322 13.8953C5.88859 13.826 5.73906 13.7244 5.61323 13.5962L0.402898 8.30438C0.275729 8.17669 0.174666 8.02473 0.105523 7.85723C0.0363797 7.68974 0.000519988 7.51001 5.61335e-06 7.32839C-0.000508762 7.14677 0.0343325 6.96683 0.102526 6.79894C0.170719 6.63104 0.270919 6.47849 0.397363 6.35006C0.523808 6.22163 0.674002 6.11985 0.83931 6.05059C1.00462 5.98132 1.18178 5.94592 1.3606 5.94644C1.53942 5.94695 1.71638 5.98336 1.8813 6.05358C2.04622 6.12379 2.19585 6.22643 2.32157 6.35558L6.57257 10.673L16.6859 0.401564C16.9405 0.144029 17.2853 -0.000389174 17.6447 7.87687e-07C18.004 0.000390749 18.3486 0.145557 18.6026 0.403644C18.8567 0.66173 18.9996 1.01165 19 1.37663C19.0004 1.74161 18.8581 2.09182 18.6045 2.35041L7.53192 13.5963C7.40608 13.7245 7.25655 13.8261 7.09191 13.8954C6.92727 13.9647 6.75078 14.0002 6.57257 14Z"
              fill="white"
            />
          </svg>
          <span>Mark as Done</span>
        </BaseButton>
        <EditTaskModal
          task={task}
          setTasks={setTasks}
          setHistory={setHistory}
          setExpandedCategories={setExpandedCategories}
        />
        <BaseButton
          onClick={deleteHandler}
          style={{
            backgroundColor: "var(--color-red)",
            color: "white",
            border: "0.1rem solid var(--color-lightred)",
          }}
        >
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.22222 14.4C6.45797 14.4 6.68406 14.3052 6.85076 14.1364C7.01746 13.9676 7.11111 13.7387 7.11111 13.5V8.1C7.11111 7.8613 7.01746 7.63239 6.85076 7.4636C6.68406 7.29482 6.45797 7.2 6.22222 7.2C5.98647 7.2 5.76038 7.29482 5.59368 7.4636C5.42698 7.63239 5.33333 7.8613 5.33333 8.1V13.5C5.33333 13.7387 5.42698 13.9676 5.59368 14.1364C5.76038 14.3052 5.98647 14.4 6.22222 14.4ZM15.1111 3.6H11.5556V2.7C11.5556 1.98392 11.2746 1.29716 10.7745 0.790812C10.2744 0.284464 9.59613 0 8.88889 0H7.11111C6.40387 0 5.72559 0.284464 5.22549 0.790812C4.7254 1.29716 4.44444 1.98392 4.44444 2.7V3.6H0.888889C0.653141 3.6 0.427048 3.69482 0.260349 3.8636C0.0936505 4.03239 0 4.26131 0 4.5C0 4.73869 0.0936505 4.96761 0.260349 5.1364C0.427048 5.30518 0.653141 5.4 0.888889 5.4H1.77778V15.3C1.77778 16.0161 2.05873 16.7028 2.55883 17.2092C3.05892 17.7155 3.7372 18 4.44444 18H11.5556C12.2628 18 12.9411 17.7155 13.4412 17.2092C13.9413 16.7028 14.2222 16.0161 14.2222 15.3V5.4H15.1111C15.3469 5.4 15.573 5.30518 15.7397 5.1364C15.9064 4.96761 16 4.73869 16 4.5C16 4.26131 15.9064 4.03239 15.7397 3.8636C15.573 3.69482 15.3469 3.6 15.1111 3.6ZM6.22222 2.7C6.22222 2.46131 6.31587 2.23239 6.48257 2.0636C6.64927 1.89482 6.87536 1.8 7.11111 1.8H8.88889C9.12464 1.8 9.35073 1.89482 9.51743 2.0636C9.68413 2.23239 9.77778 2.46131 9.77778 2.7V3.6H6.22222V2.7ZM12.4444 15.3C12.4444 15.5387 12.3508 15.7676 12.1841 15.9364C12.0174 16.1052 11.7913 16.2 11.5556 16.2H4.44444C4.2087 16.2 3.9826 16.1052 3.81591 15.9364C3.64921 15.7676 3.55556 15.5387 3.55556 15.3V5.4H12.4444V15.3ZM9.77778 14.4C10.0135 14.4 10.2396 14.3052 10.4063 14.1364C10.573 13.9676 10.6667 13.7387 10.6667 13.5V8.1C10.6667 7.8613 10.573 7.63239 10.4063 7.4636C10.2396 7.29482 10.0135 7.2 9.77778 7.2C9.54203 7.2 9.31594 7.29482 9.14924 7.4636C8.98254 7.63239 8.88889 7.8613 8.88889 8.1V13.5C8.88889 13.7387 8.98254 13.9676 9.14924 14.1364C9.31594 14.3052 9.54203 14.4 9.77778 14.4Z"
              fill="white"
            />
          </svg>
          <span>Delete</span>
        </BaseButton>
      </InnerDiv>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  width: 100%;
  border-radius: 1.3rem;
  background-color: var(--color-lightwhite);
  border: 0.2rem solid var(--color-darkwhite);
  filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.2));
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
  transition: 0.2s;
  &:hover {
    background-color: var(--color-midgray);
  }
  @media only screen and (width < 768px) {
    button {
      padding: 0.4rem 0.2rem 0.4rem 0.4rem;
      span {
        display: none;
      }
      svg {
        display: block;
      }
    }
  }
`;

const InnerDiv = styled.div`
  margin-left: auto;
  margin-right: 0;
  display: flex;
  flex-direction: row;
`;

const StyledName = styled(BaseH2)`
  @media only screen and (width < 768px) {
    font-size: 1.3rem;
  }
`;

export default Task;
