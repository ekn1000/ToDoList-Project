import { useState } from "react";
import DeleteAlert from "../../modal_alert/DeleteAlert";
import { Fade, Tooltip } from "@mui/material";
import { motion } from 'framer-motion';

const TodoItem = ({ todo, onChange, onDelete, i }) => {
  const [isDelete, setIsDelete] = useState(false)

  return (
    <>
      {!isDelete &&
        <motion.section
          className={`${todo.isCompleted
            ? 'bg-gray-600 text-white border-l'
            : 'hover:text-gray-950 hover:border-l-neutral-700 text-gray-500'
            }  grid grid-cols-[auto,30px] items-center justify-between whitespace-pre-line break-all py-4 px-2 text-xl duration-300 border-2 rounded-2xl mt-3 mx-3`}
          initial={{ x: '-100%' }} // Initial position (left of the screen)
          animate={{ x: 0 }} // Animate to the center (0)
          transition={{ delay: i * 0.02, duration: 0.1, type: 'linear' }} // Delay and linear animation
        >
          <label className={`${todo.isCompleted ? 'line-through' : 'none'} cursor-pointer select-none`}>
            <input
              className="invisible"
              variant="filled"
              type="checkbox"
              checked={todo.isCompleted}
              onChange={(e) => {
                onChange({
                  ...todo,
                  isCompleted: e.target.checked,
                });
              }}
            />
            {todo.text}
          </label>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Delete"
          >
            <button
              checked={isDelete}
              className="border-0 mx-auto float-right bg-transparent cursor-pointer text-base transition-all duration-400 ease-in-out hover:rotate-180"
              style={{
                color: todo.isCompleted ? '#fff' : '#888',
              }}
              onClick={() => todo.isCompleted && setIsDelete(true)}
            >
              X
            </button>
          </Tooltip>
        </motion.section>
      }
      {
        isDelete &&
        <DeleteAlert
          onComplete={() => onDelete(todo)}
          onCancel={() => setIsDelete(false)}
        />
      }
    </>
  )
}
export default TodoItem

