import { expect, test } from "@playwright/test";
import { TodoPage } from "../../components/TodoPage";
import { DEFAULT_TODOS } from "../../data/constants/default-todos";

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
});

test.describe('Remove todos', async () => {
    test('Remove not completed todos @Smoke', async () => {
        const todos = [...DEFAULT_TODOS, '4th todo'];
        await todoPage.addTodos(todos);
        await todoPage.removeTodo(todos[1]);
        await todoPage.assertTodoListEqualsTo([
            todos[0], 
            todos[2],
            todos[3]
        ]);

        await todoPage.removeTodo(todos[0]);
        await todoPage.assertTodoListEqualsTo([
            todos[2],
            todos[3]
        ]);

        await todoPage.removeTodo(todos[3]);
        await todoPage.assertTodoListEqualsTo([todos[2]]);

        await todoPage.removeTodo(todos[2]);
        await expect(todoPage.todoList).toBeHidden();
    });

    test('Remove completed todo @MAT', async () => {
        await todoPage.addTodo(DEFAULT_TODOS[0]);
        await todoPage.markAsCompleted(DEFAULT_TODOS[0]);
        await todoPage.removeTodo(DEFAULT_TODOS[0]);
        await expect(todoPage.todoList).toBeHidden();
    });
});
