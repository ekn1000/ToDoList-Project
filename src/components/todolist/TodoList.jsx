import { useState } from "react";
import TodoFooter from "./footer/TodoFooter";
import TodoForm from "./form/TodoForm";
import TodoItems from "./items/TodoItems";
import { data } from "../../data/data.js";

const TodoList = () => {
    const [todos, setTodos] = useState(data);

    return (
        <section className="bg-white rounded-lg leading-[3] mt-[6rem] max-w-full">
            <div className="w-[700px]">
                <TodoForm
                    onAdd={(text) => {
                        setTodos([{
                            id: Math.random(),
                            text: text,
                            isCompleted: false,
                        }, ...todos]);
                    }} />
                <TodoItems
                    todos={todos}
                    onDelete={(todo) => {
                        setTodos(todos.filter((prev) => prev.id !== todo.id));
                    }}
                    onChange={(newTodo) => {
                        setTodos(
                            todos.map((todo) => {
                                return todo.id === newTodo.id ? newTodo : todo;
                            })
                        );
                    }} />
                <TodoFooter
                    todos={todos}
                    onClearCompleted={() => {
                        setTodos(todos.filter((todo) => !todo.isCompleted));
                    }} />
            </div>
        </section>
    );
};

export default TodoList;
