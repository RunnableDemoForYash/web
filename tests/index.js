const Browser = require('zombie');

Browser.localhost(process.env.WEB_HOST);

describe('User visits list page', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/', done);
  });

  const taskName = 'TestTask-' + Math.random();

  describe('adds a task', function() {
    before(function(done) {
      browser
        .fill('[type="text"]', taskName)
        .fire('form', 'submit');
      setTimeout(done, 1000);
    });

    it('should add the task', function() {
      browser.assert.text('.todo-list-item', taskName);
      browser.assert.success();
    });
  });

  describe('complete a task', function () {
    before(function(done) {
      browser
        .query('li.todo-list-item a')
        .click()
      setTimeout(done, 1000);
    });

    it('should add the task', function() {
      if (browser.window.document.getElementsByTagName('li').length !== 0) {
        throw new Error('Expected all tasks to be deleted.')
      }
      browser.assert.success();
    });

  });
});
