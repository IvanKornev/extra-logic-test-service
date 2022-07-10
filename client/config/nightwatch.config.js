const { getClientFolder } = require('./_get-paths');

module.exports = {
  src_folders: [
    getClientFolder('src', 'pages', 'tests'),
  ],
  custom_assertions_path: '',
  plugins: [],
  globals_path : '',
  webdriver: {},
  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'https://nightwatchjs.org',
      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },
      desiredCapabilities: {
        browserName : 'firefox'
      },
      webdriver: {
        start_process: true,
        server_path: ''
      }
    },
    firefox: {
      desiredCapabilities : {
        browserName : 'firefox',
        alwaysMatch: {
          acceptInsecureCerts: true,
          'moz:firefoxOptions': {
          }
        }
      },
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [],
      }
    },

    chrome: {
      desiredCapabilities : {
        browserName : 'chrome',
        'goog:chromeOptions' : {
          w3c: true,
          args: []
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
      }
    },

    edge: {
      desiredCapabilities : {
        browserName : 'MicrosoftEdge',
        'ms:edgeOptions' : {
          w3c: true,
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
      }
    },
    'cucumber-js': {
      src_folders: ['examples/cucumber-js/features/step_definitions'],
      test_runner: {
        type: 'cucumber',
        options: {
          feature_path: 'node_modules/nightwatch/examples/cucumber-js/*/*.feature',
        }
      }
    },
    browserstack: {
      selenium: {
        host: 'hub.browserstack.com',
        port: 443
      },
      desiredCapabilities: {
        'bstack:options' : {
          userName: '${BROWSERSTACK_USERNAME}',
          accessKey: '${BROWSERSTACK_ACCESS_KEY}',
        }
      },
      disable_error_log: true,
      webdriver: {
        timeout_options: {
          timeout: 15000,
          retry_attempts: 3
        },
        keep_alive: true,
        start_process: false
      }
    },

    'browserstack.local': {
      extends: 'browserstack',
      desiredCapabilities: {
        'browserstack.local': true
      }
    },
    'browserstack.chrome': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions : {
          w3c: true
        }
      }
    },
    'browserstack.firefox': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'firefox'
      }
    },
    'browserstack.ie': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'internet explorer',
        browserVersion: '11.0'
      }
    },
    'browserstack.safari': {
      extends: 'browserstack',
      desiredCapabilities: {
        browserName: 'safari'
      }
    },
    'browserstack.local_chrome': {
      extends: 'browserstack.local',
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    'browserstack.local_firefox': {
      extends: 'browserstack.local',
      desiredCapabilities: {
        browserName: 'firefox'
      }
    },
    saucelabs: {
      selenium: {
        host: 'ondemand.saucelabs.com',
        port: 443
      },
      desiredCapabilities: {
        'sauce:options' : {
          username: '${SAUCE_USERNAME}',
          accessKey: '${SAUCE_ACCESS_KEY}',
          screenResolution: '1280x1024',
        }
      },
      disable_error_log: false,
      webdriver: {
        start_process: false
      }
    },
    'saucelabs.chrome': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'chrome',
        browserVersion: 'latest',
        javascriptEnabled: true,
        acceptSslCerts: true,
        timeZone: 'London',
        chromeOptions : {
          w3c: true
        }
      }
    },
    'saucelabs.firefox': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'firefox',
        browserVersion: 'latest',
        javascriptEnabled: true,
        acceptSslCerts: true,
        timeZone: 'London'
      }
    },
    selenium_server: {
      selenium: {
        start_process: true,
        port: 4444,
        server_path: '',
        command: 'standalone',
      },
      webdriver: {
        start_process: false,
        default_path_prefix: '/wd/hub'
      }
    },
    'selenium.chrome': {
      extends: 'selenium_server',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions : {
          w3c: true
        }
      }
    },
    'selenium.firefox': {
      extends: 'selenium_server',
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
        }
      }
    }
  }
};
