# Todo list test project
Let me introduce you Playwright-based test automation project covering main functionality of the lightweight [Todo List application](https://todomvc.com/examples/angular2/)

## Quick guide
1. Clone repository
`git clone https://github.com/r-matyushenko/todo-list-tests.git`
2. Install dependencies
`npm install`
3. Install browsers
`npx playwright install`
4. Run tests 
`npx playwright test`
5. Show report
`npx playwright show-report`

## Overivew 
### Test model
You can find [test documentation](https://docs.google.com/spreadsheets/d/1h7LteA-yQJfsi1oQ12hHfLoRnH3ZhU5G/edit?usp=sharing&ouid=105004597368983873079&rtpof=true&sd=true) in a simple excel sheet. It's the Test Survey that consists of test cases which are grouped by functionality (e.g. Add todo, Remove todo, etc.). Test specifications containing autotests implementation in the project itself are divided to the separate files according to the test groups in the Test Survey.
Expected results in the Test Survey may contain single result in case it's the final result / common result for all steps, or several results if specific check required on the certain step (you'll see them numerated).

Also, tests are divided by **Test type**, that actually points to the depth of the check:
- *Smoke* - Checks of the *core functionality* (positive cases);
- *MAT (Minimal Acceptance Test)* - Checks of *all functionality* on *valid data*, that system should accept and process (positive cases);
- *AT (Acceptance Test)* - Check of *all functionality* on *invalid data*, that system shouldn't accept (negative cases);

Autotests have the tags in the title according to their *Test types* in order to filter them when running.

### Project description
#### Stack
Test project based on [Playwright](https://playwright.dev/) + [Typescript](https://www.typescriptlang.org/)
Playwright has been chosen as it's:
- Easy to install
- Easy to use 
- Has all required tools in order to implement the task (such as mechanism to interact with web elements, assertions library, built-in reporter, can execute tests against different browsers, etc.)

#### Patterns used
The project is designed according to **POM (Page Object Model)**. 
*TodoPage* that is used in test consists of Web Elements and methods which handle interaction with the page, or perform complex repeated assertions.
It keeps everything needed for scripts development in one object, reduces code duplication and makes it easy to maintain.

#### Project structure
- **components** that contain POMs *BasePage* and *TodoPage*;
- **data** that contain constants values which are common for some tests;
- **tests** folder that contain test specifications with the tests grouped by functionality;
- **package.json** containing dependencies;
- **playwright.config.ts** containing Playwright configuration;
- **.env** containing environment variables.

#### Running tests
Tests can be launched either from command line or using VScode extension.
In order to run tests browsers or browser engines must be installed (see Quick Guide at the very beginning).

##### Running via command line
- Run all tests:
    `npx playwright test`
- Run certain specs
    `npx playwright test AddTodos ClearCompleted`
- Run by tag
    `npx playwright test -g '@Smoke|@MAT'` - runs Smoke and MAT tests
    `npx playwright test -g '@AT'` - runs @AT tests only
- Run certain tests
    `npx playwright test -g "add a todo item"`
- Run in headed mode (headless by default, can be changed in config, or specified as the option)
    `npx playwright test --headed`
- Run in debug mode
    `npx playwright test --debug`

See more options in [docs](https://playwright.dev/docs/running-tests)

##### Running via VScode extension:
See [plugin documentation](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).

#### Configuration
Test project configuration is stored in *playwright.config.ts*. Some major points to be mentioned are:

- **Browsers**. The project is configured for running tests on *Chromium*. If other browsers needed they can be enabled in config file by uncommenting *projects* properties.
- **Parallelism**. All tests run in parallel. In order to change parallelism mechanism need to change *fullyParallel*, *workers* properties in config file, or enable/disable it for specific test specs. By default the number of workers = half of the number of logical CPU cores. See [docs](https://playwright.dev/docs/test-parallel) for more info.
- **Reporter**. Playwright has built-in reporter that generates html-report at the end of each run in the *playwright-report* folder. It contains thorough info about test runs, including results, API traces, screenshots (on failure), errors, etc.

For more details see [documentation](https://playwright.dev/docs/test-configuration)
