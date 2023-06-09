/** @format */

import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { INCREASE_SCORES, Z_INDEX_ITEMS } from "../redux/actions";
import { motion } from "framer-motion";
const correct = "w-full h-[120px] border-green-400 border-[5px]";
const wrong = "w-full h-[120px] border-red-400 border-[5px]";
const normal = "w-full h-[120px] border-purple-400 border-[5px]";
const Items = ({ question, index, z, show }) => {
  const correct = question.correct;
  const [color, setColor] = useState(normal);
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.scores);
  let checkCorrect = (answers) => {
    switch (answers) {
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
    }
  };

  const handleClick = (e, id) => {
    const item = document.querySelector(".items");
    const answers = document.querySelectorAll(".answers");
    e.target.className = "";
    if (correct === id) {
      dispatch(INCREASE_SCORES(scores + 1));
      e.target.classList.add(
        "answers",
        "w-full",
        "h-[120px]",
        "border-green-400",
        "border-[5px]",
        "text-green-400",
        "p-[10px]"
      );
    } else {
      e.target.classList.add(
        "answers",
        "w-full",
        "h-[120px]",
        "border-red-400",
        "border-[5px]",
        "text-red-400",
        "text-red-400",
        "p-[10px]"
      );
      answers[checkCorrect(correct)].className = "";
      answers[checkCorrect(correct)].classList.add(
        "answers",
        "w-full",
        "h-[120px]",
        "border-green-400",
        "border-[5px]",
        "text-green-400",
        "p-[10px]"
      );
    }
    setTimeout(() => {
      item.remove();
      dispatch(Z_INDEX_ITEMS(index + 1));
    }, 700);
  };

  return (
    <div
      className="items w-full h-full bg-white flex flex-col justify-between rounded-xl flex-none absolute left-0 bottom-0 max-h-[120%]"
      style={{
        zIndex: z,
        display: show === index ? "flex" : "none",
      }}
    >
      <div className="w-full h-[40%] flex-none border rounded-lg shadow-2xl p-[20px] relative flex flex-col">
        <motion.div
          className="w-full text-[16px] mt-[50px]"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
        >
          {" "}
          {"Câu " + index + ": "} {question.name}
        </motion.div>
      </div>
      <div className="w-full h-[60%] flex flex-col gap-[20px] mt-5">
        {question.answers.map((item, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            initial={{ opacity: 0, y: 100 }}
            key={item.id}
            id={item.id}
            className="w-full h-[120px] border-purple-400 border-[5px] answers p-[10px]"
            style={{
              fontSize: "12px",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
            onClick={(e) => handleClick(e, item.id)}
          >
            {item.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default memo(Items);
