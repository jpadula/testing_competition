var SignInPage = function() {
  
  var username = element(by.model('username'));
  var password = element(by.binding('password'));
  return {
    init : function() {
      browser.get('http://localhost:3000/#!/signin');
    },
    login: function(username,password){
      element(by.id('username')).sendKeys('jpadula');
      element(by.id('password')).sendKeys('jpadula');
      element(by.id('signInBtn')).click();
    }
  }
};

describe('KALI PROJECT', function() {
  
  it('should sign in', function() {
    var signinPage = new SignInPage();
    browser.sleep(1500);
    signinPage.init();
    browser.sleep(1500);
    signinPage.login("jpadula","jpadula");

/*
    var competitionPage = new CompetitionPage();
    competitionPage.goToCreate();
    
    competitionPage.createFailedCompetitionCompetition();
    //expect...
    
    competitionPage.createSuccessCompetitionCompetition();
    //expect...
*/

    
    browser.sleep(90000); // to let you see the result

  });
});
    /*
    browser.sleep(1000); // to let you see the result
    element(by.model('loginForm.username')).sendKeys('martin');
    element(by.model('loginForm.password')).sendKeys('1234');

    browser.sleep(1500); // to let you see the result

    element(by.id('signInButton')).click();
    var projects = element.all(by.repeater('prj in ownerSet'));

    //expect(projects.count()).toEqual(9);
    browser.sleep(1500); // to let you see the result

    // create projects
    element(by.id('userProjects_createProject')).click();


    element(by.model('data.projectname')).sendKeys('aNewE2E_project');
    element(by.model('data.description')).sendKeys('A test project for e2e');
    element(by.model('data.language')).sendKeys('C');
    browser.sleep(1500);
    element(by.model('data.language')).sendKeys('C++');
    browser.sleep(1000);
    element(by.model('data.language')).sendKeys('Haskell');
    browser.sleep(1000);
    element(by.model('data.language')).sendKeys('Java');
    browser.sleep(1000);
    element(by.id('projectNew_createButton')).click();

    browser.sleep(3000);

    browser.get('http://localhost:9000/users/martin');
    var projects2 = element.all(by.repeater('prj in ownerSet'));
    //expect(projects2.count()).toEqual(10);
    browser.sleep(1500);

    // Testing a project
    browser.get('http://localhost:9000/projects/11');
    element(by.id('compileButton')).click();

    var output = element(by.binding('output'));
    //expect(output.getText()).toBe('Compilation successful');


    browser.sleep(3000); // to let you see the result


    element(by.id('projectButton')).click();
    element(by.id('addFileButton')).click();

    browser.sleep(3000); // to let you see the result

    element(by.model('data.nodeName')).sendKeys('Other.java');
    element(by.id('okAddFileNameButton')).click();

    element.all(by.repeater('node in node.children')).then(function (items) {
      expect(items.length).toBe(4);
      expect(items[1].getText()).toBe('Main.java');
      expect(items[2].getText()).toBe('Other.java');
      expect(items[3].getText()).toBe('codeboard.json (h)');


      // open class Application.java
      browser.actions().doubleClick(items[1]).perform();
*/
/*
      //Change content of class Application.java using the Ace editor
      var divInput0 = $('div.ace_content');
      var inputElm0 = $('textarea.ace_text-input');
      browser.actions().doubleClick(divInput0).perform();
      //browser.sleep(20000); // to let you see the result

      inputElm0.sendKeys(protractor.Key.ENTER);
      inputElm0.sendKeys(protractor.Key.UP);
      inputElm0.sendKeys(protractor.Key.UP);
      inputElm0.sendKeys(protractor.Key.ENTER);
      inputElm0.sendKeys(protractor.Key.ENTER);
      inputElm0.sendKeys(protractor.Key.UP);
      inputElm0.sendKeys('\t\tOther o = new Other();\n');
*/
/*
      element(by.id('compileButton')).click();
      browser.sleep(4000); // to let you see the result


      // open class Other.java
      browser.actions().doubleClick(items[2]).perform();
      browser.sleep(1000); // to let you see the result

      //Change content of class Other.java using the Ace editor
      var divInput = $('div.ace_content');
      var inputElm = $('textarea.ace_text-input');
      browser.actions().doubleClick(divInput).perform();
      inputElm.sendKeys('public class Other {\n');
      browser.sleep(500); // to let you see the result
      inputElm.sendKeys('//This is Martin testing Codeboard\n');
      inputElm.sendKeys('public Other() {\n');
      inputElm.sendKeys('sayHello();');

      element(by.id('compileButton')).click();
      browser.sleep(4000); // to let you see the result

      inputElm.sendKeys(protractor.Key.DOWN);
      inputElm.sendKeys(protractor.Key.ENTER);
      inputElm.sendKeys(protractor.Key.ENTER);
      inputElm.sendKeys('//Prints a hello message using Codeboard.io\n');
      inputElm.sendKeys('public void sayHello() {\n');
      inputElm.sendKeys('System.out.print("Hello");\n');
      inputElm.sendKeys('sayChair();');
      element(by.id('compileButton')).click();
      browser.sleep(3000); // to let you see the result

      inputElm.sendKeys(protractor.Key.DOWN);
      inputElm.sendKeys(protractor.Key.ENTER);
      inputElm.sendKeys(protractor.Key.ENTER);
      inputElm.sendKeys('//Prints hello to Chair SE\n');
      inputElm.sendKeys('public void sayChair() {\n');
      inputElm.sendKeys('System.out.print(" Chair");\n');
      inputElm.sendKeys('saySe();');
      element(by.id('compileButton')).click();

      inputElm.sendKeys(protractor.Key.DOWN);
      inputElm.sendKeys(protractor.Key.ENTER);
      inputElm.sendKeys(protractor.Key.ENTER);
      inputElm.sendKeys('//Prints SE\n');
      inputElm.sendKeys('public void saySe() {\n');
      inputElm.sendKeys('System.out.print(" SE!");');
      element(by.id('compileButton')).click();
      browser.sleep(3000); // to let you see the result
      var output = element(by.binding('output'));
      expect(output.getText()).toBe('Compilation successful');
      browser.sleep(3000); // to let you see the result


      element(by.id('runButton')).click();
      browser.sleep(15000); // to let you see the result

        //browser.get('http://localhost:9000/');
        //(element(by.buttonText('Stay on tis Page'))).click();
        //browser.driver.Alert.accept()
        //  .then(function() {

        //  });

    });


    //browser.get('http://localhost:9000/projects/5');
    //element(by.id('compileButton')).click();
    //element(by.id('runButton')).click();

    //browser.get('http://localhost:9000/projects/6');
    //element(by.id('compileButton')).click();
    //element(by.id('runButton')).click();

    //browser.get('http://localhost:9000/projects/7');
    //element(by.id('compileButton')).click();
    //element(by.id('runButton')).click();

    //expect(browser.getTitle()).toEqual('Super Calculator');
    //var todoList = element.all(by.repeater('todo in todos'));
    //expect(todoList.count()).toEqual(3);
    //expect(todoList.get(2).getText()).toEqual('write a protractor test');
  });
*/
/*
   it('create an account', function() {
   browser.get('http://localhost:9000/signup');

   element(by.model('data.username')).sendKeys('martinnew');
   element(by.model('data.password')).sendKeys('1234');
   element(by.model('data.passwordConfirm')).sendKeys('1234');
   element(by.model('data.email')).sendKeys('martinNew@ethz.ch');

   element(by.id('signup_create')).click();

   var projects = element.all(by.repeater('prj in ownerSet'));
   expect(projects.count()).toEqual(0);


   browser.driver.sleep(10000)
   .then(function() {

   });

   });
*/