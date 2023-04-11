import { Locator, expect, test } from "@playwright/test";
import { TodoPage } from "../../components/TodoPage";
import { DEFAULT_TODOS } from "../../data/constants/default-todos";
import { styles } from "../../data/constants/styles";

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
});

test.describe('Item list', async () => {
    test("Shouldn't be able to change items order by drag-n-drop @AT", async ({ page }) => {
        await todoPage.addTodos(DEFAULT_TODOS);
        await page.dragAndDrop(`li:has-text("${DEFAULT_TODOS[0]}")`, `li:has-text("${DEFAULT_TODOS[2]}")`);
        await todoPage.assertTodoListEqualsTo(DEFAULT_TODOS);
    });

    test('Items should be displayed in the the correct state after page reloading @MAT', async ({ page }) => {
        await todoPage.addTodos(DEFAULT_TODOS);
        await todoPage.markAsCompleted(DEFAULT_TODOS[0]);
        await page.reload();
        await todoPage.assertTodoListEqualsTo(DEFAULT_TODOS);
        await expect(todoPage.getTodoItemLabel(DEFAULT_TODOS[0])).toHaveCSS(styles.completedTodo.style, styles.completedTodo.value);
    });
});
