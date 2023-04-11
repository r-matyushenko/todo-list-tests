import { expect, test } from "@playwright/test";
import { TodoPage } from "../../components/TodoPage";
import { DEFAULT_TODOS } from "../../data/constants/default-todos";

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
});

test.describe('Clear completed', async () => {
    test('Clear completed should remove completed todos @Smoke', async () => {
        await todoPage.addTodos(DEFAULT_TODOS);
        await todoPage.markAsCompleted(DEFAULT_TODOS[1]);
        await todoPage.clearCompleted();
        await todoPage.assertTodoListEqualsTo([
            DEFAULT_TODOS[0],
            DEFAULT_TODOS[2]
        ]); 
        
        await todoPage.markAsCompleted([
            DEFAULT_TODOS[0],
            DEFAULT_TODOS[2]
        ]);
        await todoPage.clearCompleted();
        await expect(todoPage.todoList).toBeHidden();
    });

    test("Shouldn't be able to clear completed if no items are marked as completed @AT", async () => {
        await todoPage.addTodo(DEFAULT_TODOS[0]);
        await expect(todoPage.clearCompletedButton).toBeHidden();
    });
});
