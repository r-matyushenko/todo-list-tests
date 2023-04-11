import { Locator, expect, test } from "@playwright/test";
import { TodoPage } from "../../components/TodoPage";
import { DEFAULT_TODOS } from "../../data/constants/default-todos";
import { styles } from "../../data/constants/styles";

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
});

test.describe('Edit todo', async () => {
    test('Edit not completed todo @Smoke', async () => {
        const updatedTodo = DEFAULT_TODOS[0].concat('_NEW');
        await todoPage.addTodos(DEFAULT_TODOS);
        await todoPage.editTodo(DEFAULT_TODOS[0], updatedTodo);
        await todoPage.assertTodoListEqualsTo([
            updatedTodo,
            DEFAULT_TODOS[1],
            DEFAULT_TODOS[2]
        ]);
    });

    test('Edit completed todo @MAT', async () => {
        const updatedTodo = DEFAULT_TODOS[0].concat('_NEW');
        await todoPage.addTodo(DEFAULT_TODOS[0]);
        await todoPage.markAsCompleted(DEFAULT_TODOS[0]);
        await todoPage.editTodo(DEFAULT_TODOS[0], updatedTodo);
        await todoPage.assertTodoListEqualsTo([updatedTodo]);
        await expect(todoPage.getTodoItemCheckBox(updatedTodo)).toBeChecked();
        await expect(todoPage.getTodoItemLabel(updatedTodo)).toHaveCSS(styles.completedTodo.style, styles.completedTodo.value);
    });

    test('Exit edit mode by pressing ESC/clicking outside Edit box @MAT', async ({ page }) => {
        const todoItemElement: Locator = todoPage.getTodoItem(DEFAULT_TODOS[0]);

        await todoPage.addTodos(DEFAULT_TODOS);
        await todoItemElement.dblclick();
        await todoItemElement.getByRole('textbox').click();
        await page.keyboard.press('Escape');
        await expect(todoItemElement.getByRole('textbox')).toBeHidden();
        await todoPage.assertTodoListEqualsTo(DEFAULT_TODOS);

        await todoItemElement.dblclick();
        await todoItemElement.getByRole('textbox').click();
        await todoPage.newTodoField.click();
        await expect(todoItemElement.getByRole('textbox')).toBeHidden();
        await todoPage.assertTodoListEqualsTo(DEFAULT_TODOS);
    });

    test("Edit textbox shouldn't appear by a single click @AT", async () => {
        await todoPage.addTodo(DEFAULT_TODOS[0]);
        await todoPage.getTodoItem(DEFAULT_TODOS[0]).click();
        await expect(todoPage.todoList.getByRole('textbox')).toBeHidden();
    });

    test('Edit todo to an empty value should remove todo @AT', async () => {
        await todoPage.addTodo(DEFAULT_TODOS[0]);
        await todoPage.editTodo(DEFAULT_TODOS[0], '   ');
        await expect(todoPage.todoList).toBeHidden();
    });

    test('Mark as completed/Remove controls should be hidden in "Edit" mode @MAT', async () => {
        await todoPage.addTodo(DEFAULT_TODOS[0]);
        await todoPage.getTodoItem(DEFAULT_TODOS[0]).dblclick();
        await expect(todoPage.getTodoItemRemoveButton(DEFAULT_TODOS[0])).toBeHidden();
        await expect(todoPage.getTodoItemCheckBox(DEFAULT_TODOS[0])).toBeHidden();
    });
});
