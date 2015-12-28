/**
 * Created by Martin on 21/11/14.
 */

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['base.test.js'],
  multiCapabilities: [
    {
      browserName: 'firefox'
    },
    {
      browserName: 'safari'
    },
    {
      browserName: 'chrome'
    }
  ],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 195000
  }
};