import { Locator, expect, test } from "@playwright/test";
import { TodoPage } from "../../components/TodoPage";
import { DEFAULT_TODOS } from "../../data/constants/default-todos";

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
});

test.describe('Counter', async () => {
    test('Items left count should be changed by adding/removing todos @MAT', async () => {
        await todoPage.addTodo(DEFAULT_TODOS[0]);
        await expect(todoPage.counter).toHaveText('1 item left');
        
        await todoPage.addTodo(DEFAULT_TODOS[1]);
        await expect(todoPage.counter).toHaveText('2 items left');

        await todoPage.addTodo(DEFAULT_TODOS[2]);
        await expect(todoPage.counter).toHaveText('3 items left');   

        await todoPage.removeTodo(DEFAULT_TODOS[0]);
        await expect(todoPage.counter).toHaveText('2 items left');

        await todoPage.removeTodo(DEFAULT_TODOS[1]);
        await expect(todoPage.counter).toHaveText('1 item left');
    });

    test('Items left count should be changed by marking/unmarking todos as completed @MAT', async () => {
        await todoPage.addTodos(DEFAULT_TODOS);
        await todoPage.markAsCompleted(DEFAULT_TODOS[0]);
        await expect(todoPage.counter).toHaveText('2 items left');

        await todoPage.markAsCompleted(DEFAULT_TODOS[1]);
        await expect(todoPage.counter).toHaveText('1 item left');

        await todoPage.markAsCompleted(DEFAULT_TODOS[2]);
        await expect(todoPage.counter).toHaveText('0 items left');

        await todoPage.unmarkCompleted(DEFAULT_TODOS[0]);
        await expect(todoPage.counter).toHaveText('1 item left');

        await todoPage.unmarkCompleted(DEFAULT_TODOS[1]);
        await expect(todoPage.counter).toHaveText('2 items left');

        await todoPage.unmarkCompleted(DEFAULT_TODOS[2]);
        await expect(todoPage.counter).toHaveText('3 items left');
    });
});
