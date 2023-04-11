import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TodoPage extends BasePage {
    readonly url: string;
    readonly newTodoField: Locator;
    readonly clearCompletedButton: Locator;
    readonly counter: Locator;
    readonly todoList: Locator;

    constructor(page: Page) {
        super(page);

        this.url = process.env.TODO_APP_URL!;
        this.newTodoField = page.locator('.new-todo');
        this.clearCompletedButton = page.locator('.clear-completed');
        this.counter = page.locator('.todo-count');
        this.todoList = page.locator('.todo-list');
    }

    getTodoItem(todo: string): Locator {
        return this.todoList.getByRole('listitem').filter({ hasText: todo });
    }

    getTodoItemLabel(todo: string): Locator {
        return this.getTodoItem(todo).locator('label');
    }

    getTodoItemCheckBox(todo: string): Locator {
        return this.getTodoItem(todo).getByRole('checkbox');
    }

    getTodoItemRemoveButton(todo: string): Locator {
        return this.getTodoItem(todo).getByRole('button');
    }

    getTodoItemEditField(todo: string): Locator {
        return this.getTodoItem(todo).getByRole('textbox');
    }

    async open(): Promise<void> {
        await this.page.goto(this.url);
    }

    async addTodo(todo: string): Promise<void> {
        await this.newTodoField.fill(todo);
        await this.page.keyboard.press('Enter');
    }

    async addTodos(todos: string[]): Promise<void> {
        for (const todo of todos) {
            await this.addTodo(todo);
        }
    }

    async markAsCompleted(todos: string | string[]): Promise<void> {
        if (typeof todos === 'string') {
            await this.getTodoItemCheckBox(todos).check();
        } else {
            for (const listitem of todos) {
                await this.getTodoItemCheckBox(listitem).check();
            }
        }
    }

    async unmarkCompleted(todo: string): Promise<void> {
        await this.getTodoItemCheckBox(todo).uncheck();
    }

    async removeTodo(todo: string): Promise<void> {
        const todoItem = this.getTodoItem(todo);
        await todoItem.hover();
        await todoItem.getByRole('button').click();
    }

    async assertTodoListEqualsTo(todoList: string[]): Promise<void> {
        await expect(this.todoList.getByRole('listitem')).toHaveText(todoList);
    }

    async clearCompleted(): Promise<void> {
        await this.clearCompletedButton.click();
    }

    async editTodo(currentTodo: string, newTodo: string): Promise<void> {
        const currentTodoItem = this.getTodoItem(currentTodo);

        await currentTodoItem.dblclick();
        await currentTodoItem.getByRole('textbox').fill(newTodo);
        await this.page.keyboard.press('Enter');
    }
}
