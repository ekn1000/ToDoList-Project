import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons";
import { Button, Slide } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

const TodoItems = ({ todos, onDelete, onChange }) => {
  const [isShowButton, setIsShowButton] = useState(false);
  const ref = useRef(null);

  const startingPosition = () => ref.current && (ref.current.scrollTop = 0);

  const checkScroll = () => {
    if (ref.current) {
      setIsShowButton(ref.current.scrollTop > 80);
    }
  };

  return (
    <section className="relative">
      <div
        ref={ref}
        onScroll={checkScroll}
        className="overflow-y-auto h-60 scroll-smooth"
      >
        <AnimatePresence>
          {todos.map((todo, i) => {
            return (
              <TodoItem
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={todo.id}
                todo={todo}
                onChange={onChange}
                onDelete={onDelete}
                i={i}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <div
        className={`absolute transition-all bottom-2 right-20 ${
          isShowButton ? "opacity-100" : "opacity-0"
        }`}
      >
        <Slide
          // direction="up"
          direction="up"
          in={isShowButton}
          container={ref.current}
        >
          <Button
            variant="contained"
            onClick={startingPosition}
            sx={{
              fontSize: "18px",
              borderRadius: "100%",
              padding: "16px 0",
            }}
          >
            <FontAwesomeIcon icon={faArrowUpShortWide} />
          </Button>
        </Slide>
      </div>
    </section>
  );
};

export default TodoItems;
