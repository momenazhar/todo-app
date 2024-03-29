import styled from "styled-components";
import { BaseH2, BaseButton } from "./GlobalStyles";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import "./tooltip.css";

const HistoryTask = ({ task, setTasks, setHistory }) => {
  const restoreHandler = () => {
    setTasks((tasks) => [...tasks, task]);

    setHistory((history) =>
      history.filter((t) => !(t.status === "Deleted" && t.id === task.id))
    );
  };

  const undoHandler = () => {
    setTasks((tasks) => [...tasks, task]);
    setHistory((history) =>
      history.filter((t) => !(t.status === "Completed" && t.id === task.id))
    );
  };

  return (
    <>
      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <StyledDiv
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 100, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.15,
              }}
            >
              <StyledName>{task.name}</StyledName>
              <StyledCategory>{task.category}</StyledCategory>
              <InnerDiv>
                <StyledH3>
                  {task.status} • {task.time}
                </StyledH3>
                {task.status === "Deleted" && (
                  <BaseButton
                    onClick={restoreHandler}
                    style={{
                      backgroundColor: "var(--color-blue)",
                      color: "white",
                      border: "0.1rem solid var(--color-lightblue)",
                    }}
                  >
                    <StyledSVG
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.7022 5.2H14.3007C14.4057 5.20003 14.5097 5.17935 14.6068 5.13916C14.7038 5.09896 14.792 5.04004 14.8662 4.96574C14.9405 4.89145 14.9994 4.80325 15.0396 4.70618C15.0797 4.60911 15.1004 4.50506 15.1004 4.4V0.8C15.1004 0.587827 15.0161 0.384344 14.8662 0.234314C14.7162 0.0842854 14.5128 0 14.3007 0C14.0886 0 13.8852 0.0842854 13.7353 0.234314C13.5853 0.384344 13.501 0.587827 13.501 0.8V2.19682C13.0465 1.76533 12.5409 1.38697 11.9936 1.07098C10.7776 0.368962 9.39828 -0.000409203 7.99433 4.45979e-06C6.59037 0.000418123 5.21127 0.370602 3.99568 1.07334C2.78009 1.77607 1.77086 2.78659 1.06946 4.00328C0.36806 5.21998 -0.000788445 6.59997 1.26542e-06 8.0045C0.000790976 9.40904 0.371191 10.7886 1.07396 12.0045C1.77673 13.2204 2.7871 14.2298 4.00347 14.9312C5.21985 15.6325 6.59937 16.0012 8.00332 16C10.1234 15.9976 12.156 15.1539 13.6552 13.6542C15.1543 12.1544 15.9976 10.121 16 8C16 7.78783 15.9158 7.58434 15.7658 7.43431C15.6158 7.28429 15.4124 7.2 15.2003 7.2C14.9882 7.2 14.7848 7.28429 14.6349 7.43431C14.4849 7.58434 14.4007 7.78783 14.4007 8C14.4028 9.55038 13.8415 11.0487 12.8213 12.2158C11.8012 13.3829 10.3918 14.1393 8.85566 14.344C7.31949 14.5488 5.7613 14.188 4.47131 13.3288C3.18133 12.4696 2.24749 11.1706 1.84375 9.67372C1.44001 8.17688 1.59388 6.58425 2.27671 5.19247C2.95954 3.8007 4.12477 2.70467 5.55537 2.10854C6.98596 1.51241 8.58439 1.45681 10.0529 1.95211C11.0424 2.28585 11.9275 2.85437 12.6376 3.6H10.7022C10.4901 3.6 10.2867 3.68428 10.1367 3.83431C9.98678 3.98434 9.90253 4.18783 9.90253 4.4C9.90253 4.61217 9.98678 4.81565 10.1367 4.96568C10.2867 5.11571 10.4901 5.2 10.7022 5.2Z"
                        fill="white"
                      />
                    </StyledSVG>
                    <span>Restore</span>
                  </BaseButton>
                )}
                {task.status === "Completed" && (
                  <BaseButton
                    onClick={undoHandler}
                    style={{
                      backgroundColor: "var(--color-orange)",
                      color: "white",
                      border: "0.1rem solid var(--color-lightorange)",
                    }}
                  >
                    <StyledSVG
                      width="24"
                      height="16"
                      viewBox="0 0 24 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.7221 7.26857L17.7226 0.41143C17.6097 0.282421 17.4685 0.178673 17.3088 0.107563C17.1491 0.0364531 16.9749 -0.000271158 16.7986 1.50728e-06H3.59971C2.64501 1.50728e-06 1.72941 0.361225 1.05433 1.00421C0.379254 1.64719 0 2.51926 0 3.42857V12.5714C0 13.4807 0.379254 14.3528 1.05433 14.9958C1.72941 15.6388 2.64501 16 3.59971 16H16.7986C16.9749 16.0003 17.1491 15.9635 17.3088 15.8924C17.4685 15.8213 17.6097 15.7176 17.7226 15.5886L23.7221 8.73143C23.9017 8.52607 24 8.26726 24 8C24 7.73274 23.9017 7.47393 23.7221 7.26857ZM16.2347 13.7143H3.59971C3.28147 13.7143 2.97627 13.5939 2.75125 13.3796C2.52622 13.1652 2.39981 12.8745 2.39981 12.5714V3.42857C2.39981 3.12547 2.52622 2.83478 2.75125 2.62045C2.97627 2.40612 3.28147 2.28572 3.59971 2.28572H16.2347L21.2383 8L16.2347 13.7143ZM12.851 4.90286C12.7394 4.79574 12.6067 4.71072 12.4605 4.6527C12.3143 4.59468 12.1574 4.5648 11.999 4.5648C11.8406 4.5648 11.6838 4.59468 11.5376 4.6527C11.3914 4.71072 11.2586 4.79574 11.1471 4.90286L9.59922 6.38857L8.05135 4.90286C7.8254 4.68765 7.51895 4.56675 7.19942 4.56675C6.87988 4.56675 6.57343 4.68765 6.34748 4.90286C6.12154 5.11806 5.9946 5.40994 5.9946 5.71429C5.9946 5.86498 6.02577 6.0142 6.08631 6.15343C6.14686 6.29265 6.23561 6.41916 6.34748 6.52571L7.90736 8L6.34748 9.47429C6.23502 9.58053 6.14575 9.70693 6.08484 9.8462C6.02392 9.98547 5.99256 10.1348 5.99256 10.2857C5.99256 10.4366 6.02392 10.586 6.08484 10.7252C6.14575 10.8645 6.23502 10.9909 6.34748 11.0971C6.45903 11.2043 6.59174 11.2893 6.73796 11.3473C6.88418 11.4053 7.04101 11.4352 7.19942 11.4352C7.35782 11.4352 7.51465 11.4053 7.66087 11.3473C7.80709 11.2893 7.9398 11.2043 8.05135 11.0971L9.59922 9.61143L11.1471 11.0971C11.2586 11.2043 11.3914 11.2893 11.5376 11.3473C11.6838 11.4053 11.8406 11.4352 11.999 11.4352C12.1574 11.4352 12.3143 11.4053 12.4605 11.3473C12.6067 11.2893 12.7394 11.2043 12.851 11.0971C12.9634 10.9909 13.0527 10.8645 13.1136 10.7252C13.1745 10.586 13.2059 10.4366 13.2059 10.2857C13.2059 10.1348 13.1745 9.98547 13.1136 9.8462C13.0527 9.70693 12.9634 9.58053 12.851 9.47429L11.2911 8L12.851 6.52571C12.9634 6.41947 13.0527 6.29307 13.1136 6.1538C13.1745 6.01453 13.2059 5.86516 13.2059 5.71429C13.2059 5.56342 13.1745 5.41404 13.1136 5.27477C13.0527 5.1355 12.9634 5.0091 12.851 4.90286Z"
                        fill="white"
                      />
                    </StyledSVG>
                    <span>Undo</span>
                  </BaseButton>
                )}
                {task.status === "Completed" ? (
                  <StyledSVG
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 0C6.3 0 0 6.3 0 14C0 21.7 6.3 28 14 28C21.7 28 28 21.7 28 14C28 6.3 21.7 0 14 0ZM19.88 11.62L13.16 18.34C12.6 18.9 11.76 18.9 11.2 18.34L8.12 15.26C7.56 14.7 7.56 13.86 8.12 13.3C8.68 12.74 9.52 12.74 10.08 13.3L12.18 15.4L17.92 9.66C18.48 9.1 19.32 9.1 19.88 9.66C20.44 10.22 20.44 11.06 19.88 11.62Z"
                      fill="var(--color-lightgreen)"
                    />
                  </StyledSVG>
                ) : task.status === "Deleted" ? (
                  <StyledSVG
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 0C6.3 0 0 6.3 0 14C0 21.7 6.3 28 14 28C21.7 28 28 21.7 28 14C28 6.3 21.7 0 14 0ZM19.18 17.22C19.74 17.78 19.74 18.62 19.18 19.18C18.62 19.74 17.78 19.74 17.22 19.18L14 15.96L10.78 19.18C10.22 19.74 9.38 19.74 8.82 19.18C8.26 18.62 8.26 17.78 8.82 17.22L12.04 14L8.82 10.78C8.26 10.22 8.26 9.38 8.82 8.82C9.38 8.26 10.22 8.26 10.78 8.82L14 12.04L17.22 8.82C17.78 8.26 18.62 8.26 19.18 8.82C19.74 9.38 19.74 10.22 19.18 10.78L15.96 14L19.18 17.22Z"
                      fill="var(--color-lightred)"
                    />
                  </StyledSVG>
                ) : task.status === "Modified" ? (
                  <StyledSVG
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28ZM8.00002 20.0012V16.6101C7.9994 16.5049 8.01958 16.4005 8.05938 16.3031C8.09918 16.2057 8.15782 16.117 8.23195 16.0423L13.7823 10.4999L16.0377 8.23657C16.112 8.16161 16.2005 8.10211 16.2979 8.06151C16.3954 8.0209 16.4999 8 16.6055 8C16.7111 8 16.8156 8.0209 16.9131 8.06151C17.0106 8.10211 17.099 8.16161 17.1734 8.23657L20.5644 11.6676C20.6393 11.7419 20.6988 11.8304 20.7394 11.9278C20.78 12.0253 20.8009 12.1298 20.8009 12.2354C20.8009 12.341 20.78 12.4455 20.7394 12.543C20.6988 12.6404 20.6393 12.7289 20.5644 12.8032L18.293 15.0266L12.7586 20.569C12.6839 20.6431 12.5953 20.7018 12.4978 20.7416C12.4004 20.7814 12.2961 20.8015 12.1908 20.8009H8.79978C8.58767 20.8009 8.38425 20.7167 8.23426 20.5667C8.08427 20.4167 8.00002 20.2133 8.00002 20.0012ZM18.8689 12.1954L16.6055 9.93208L15.4698 11.0677L17.7332 13.3311L18.8689 12.1954ZM14.3422 12.1954L9.59955 16.938V19.2014H11.8629L16.6055 14.4588L14.3422 12.1954Z"
                      fill="var(--color-lightblue)"
                    />
                  </StyledSVG>
                ) : task.status === "Created" ? (
                  <StyledSVG
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.9115 4.0885C18.4602 -1.36283 9.53982 -1.36283 4.0885 4.0885C-1.36283 9.53982 -1.36283 18.4602 4.0885 23.9115C9.53982 29.3628 18.4602 29.3628 23.9115 23.9115C29.3628 18.4602 29.3628 9.53982 23.9115 4.0885ZM15.3876 19.9469C15.3876 20.7398 14.7929 21.3345 14 21.3345C13.2071 21.3345 12.6124 20.7398 12.6124 19.9469V15.3876H8.0531C7.26018 15.3876 6.66549 14.7929 6.66549 14C6.66549 13.2071 7.26018 12.6124 8.0531 12.6124H12.6124V8.0531C12.6124 7.26018 13.2071 6.66549 14 6.66549C14.7929 6.66549 15.3876 7.26018 15.3876 8.0531V12.6124H19.9469C20.7398 12.6124 21.3345 13.2071 21.3345 14C21.3345 14.7929 20.7398 15.3876 19.9469 15.3876H15.3876V19.9469Z"
                      fill="var(--color-lightblue)"
                    />
                  </StyledSVG>
                ) : null}
              </InnerDiv>
            </StyledDiv>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              {task.status} • {task.time}
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
};

const StyledCategory = styled.h3`
  color: white;
  margin-block: auto;
  margin-inline: 0.2rem;
  background-color: var(--color-darkcyan);
  padding-inline: 0.8rem;
  padding-block: 0.3rem;
  font-size: 1rem;
  border-radius: 12px;
  outline: 0.1rem solid var(--color-midcyan);
  outline-offset: 0.1rem;
  filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.2));
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
  @media only screen and (width < 768px) {
    font-size: 0.8rem;
  }
`;

const StyledSVG = styled.svg`
  width: auto;
  height: 1rem;
  margin-inline: 0.5rem;
  filter: drop-shadow(1px 1px 0px rgba(0, 0, 0, 0.2));
`;

const StyledDiv = styled(motion.div)`
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
  color: var(--color-lightcyan);
  margin-left: auto;
  margin-right: 0;
  padding-inline: 0rem;
  display: flex;
  align-items: center;
`;

const StyledName = styled(BaseH2)`
  @media only screen and (width < 768px) {
    font-size: 1.3rem;
    text-shadow: 0.4px 0.4px 0px rgba(0, 0, 0, 0.2);
  }
`;

const StyledH3 = styled.h3`
  margin-inline: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  @media only screen and (width < 768px) {
    font-size: 0.5rem;
    text-shadow: 0.4px 0.4px 0px rgba(0, 0, 0, 0.2);
    display: none;
  }
`;

export default HistoryTask;
