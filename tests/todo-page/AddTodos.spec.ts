import { expect, test } from "@playwright/test";
import { TodoPage } from "../../components/TodoPage";
import { DEFAULT_TODOS } from "../../data/constants/default-todos";

let todoPage: TodoPage;

const LETTERS: string = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS: string = '1234567890';
const SPECIAL_CHARACTERS: string = "~`!@#$%^&*'()_+=-\\|<\/>{.}[,]\";:?";
const TODO_TITLE_LENGTH_1: string = 'a';
const TODO_TITLE_LENGTH_2: string = 'bb';
const TODO_TITLE_LENGTH_255: string = 'c'.repeat(255);
const TODO_LIST_50_ITEMS: string[] = Array.from(new Array(50), (val, index) => "Item " + index);

test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
});

test.describe('Add todos', async () => {
    test('Check adding todos with letters / digits / special characters @Smoke', async () => {
        await todoPage.addTodo(LETTERS);
        await todoPage.assertTodoListEqualsTo([LETTERS]);

        await todoPage.addTodo(DIGITS);
        await todoPage.assertTodoListEqualsTo([
            LETTERS,
            DIGITS
        ]);

        await todoPage.addTodo(SPECIAL_CHARACTERS);
        await todoPage.assertTodoListEqualsTo([
            LETTERS,
            DIGITS,
            SPECIAL_CHARACTERS
        ]);
    });

    test('Should be able to create todo with 1, 2, 255 title length @MAT', async () => {
        await todoPage.addTodo(TODO_TITLE_LENGTH_1);
        await todoPage.assertTodoListEqualsTo([TODO_TITLE_LENGTH_1]);

        await todoPage.addTodo(TODO_TITLE_LENGTH_2);
        await todoPage.assertTodoListEqualsTo([
            TODO_TITLE_LENGTH_1,
            TODO_TITLE_LENGTH_2
        ]);

        await todoPage.addTodo(TODO_TITLE_LENGTH_255);
        await todoPage.assertTodoListEqualsTo([
            TODO_TITLE_LENGTH_1,
            TODO_TITLE_LENGTH_2,
            TODO_TITLE_LENGTH_255
        ]);
    });

    test('Should be able to create todo list with 50 items @MAT', async () => {
        await todoPage.addTodos(TODO_LIST_50_ITEMS);
        await todoPage.assertTodoListEqualsTo(TODO_LIST_50_ITEMS);
    });

    test("Empty todo shouldn't be added @AT", async () => {
        await todoPage.addTodo('   ');
        await expect(todoPage.todoList).toBeHidden();
    });

    test('Should be able to add todos with the same title @MAT', async () => {
        await todoPage.addTodos([
            DEFAULT_TODOS[0],
            DEFAULT_TODOS[0]
        ]);
        await todoPage.assertTodoListEqualsTo([
            DEFAULT_TODOS[0],
            DEFAULT_TODOS[0]
        ])
    });
});
