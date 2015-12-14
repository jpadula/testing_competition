/**
 * Created by Martin on 21/11/14.
 */

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['signIn.test.js'],
  multiCapabilities: [
    /*{
      browserName: 'firefox'
    },*/
    {
      browserName: 'chrome'
    }/*,
    {
      browserName: 'safari'
    }*/
  ],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 195000
  }
};