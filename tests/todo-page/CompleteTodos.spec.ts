import { expect, test } from "@playwright/test";
import { TodoPage } from "../../components/TodoPage";
import { DEFAULT_TODOS } from "../../data/constants/default-todos";
import { styles } from "../../data/constants/styles";

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
});

test.describe('Complete todos', async () => {
    test('Mark/unmark todos as completed @Smoke', async () => {
        await todoPage.addTodos(DEFAULT_TODOS);
        for (const todo of DEFAULT_TODOS) {
            await todoPage.markAsCompleted(todo);
            await expect(todoPage.getTodoItemCheckBox(todo)).toBeChecked();
            await expect(todoPage.getTodoItemLabel(todo)).toHaveCSS(styles.completedTodo.style, styles.completedTodo.value);
        }

        for (const todo of DEFAULT_TODOS) {
            await todoPage.unmarkCompleted(todo);
            await expect(todoPage.getTodoItemCheckBox(todo)).not.toBeChecked();
            await expect(todoPage.getTodoItemLabel(todo)).not.toHaveCSS(styles.completedTodo.style, styles.completedTodo.value);
        }
    });
});
