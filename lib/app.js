/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _commander = __webpack_require__(2);
	
	var _commander2 = _interopRequireDefault(_commander);
	
	var _json2graphql = __webpack_require__(7);
	
	var _json2graphql2 = _interopRequireDefault(_json2graphql);
	
	var _fs = __webpack_require__(4);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_commander2.default.arguments('<file>').option('-o, --output <output>', 'Name of the schema file').action(function (file) {
		_fs2.default.readFile(file, function (err, data) {
			if (err) {
				console.log("ERROR: " + err);
				process.exit();
			}
			var schema = (0, _json2graphql2.default)(JSON.parse(data));
			var fileName = _commander2.default.output || "Schema.js";
			_fs2.default.writeFile(fileName, schema, function (err) {
				if (err) {
					console.log("ERROR: " + err);
					process.exit();
				}
			});
		});
	}).parse(process.argv); //#!/usr/bin/env node
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout.call(null, cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout.call(null, timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout.call(null, drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Module dependencies.
	 */
	
	var EventEmitter = __webpack_require__(3).EventEmitter;
	var spawn = __webpack_require__(4).spawn;
	var readlink = __webpack_require__(5).readlinkSync;
	var path = __webpack_require__(6);
	var dirname = path.dirname;
	var basename = path.basename;
	var fs = __webpack_require__(4);
	
	/**
	 * Expose the root command.
	 */
	
	exports = module.exports = new Command();
	
	/**
	 * Expose `Command`.
	 */
	
	exports.Command = Command;
	
	/**
	 * Expose `Option`.
	 */
	
	exports.Option = Option;
	
	/**
	 * Initialize a new `Option` with the given `flags` and `description`.
	 *
	 * @param {String} flags
	 * @param {String} description
	 * @api public
	 */
	
	function Option(flags, description) {
	  this.flags = flags;
	  this.required = ~flags.indexOf('<');
	  this.optional = ~flags.indexOf('[');
	  this.bool = !~flags.indexOf('-no-');
	  flags = flags.split(/[ ,|]+/);
	  if (flags.length > 1 && !/^[[<]/.test(flags[1])) this.short = flags.shift();
	  this.long = flags.shift();
	  this.description = description || '';
	}
	
	/**
	 * Return option name.
	 *
	 * @return {String}
	 * @api private
	 */
	
	Option.prototype.name = function() {
	  return this.long
	    .replace('--', '')
	    .replace('no-', '');
	};
	
	/**
	 * Check if `arg` matches the short or long flag.
	 *
	 * @param {String} arg
	 * @return {Boolean}
	 * @api private
	 */
	
	Option.prototype.is = function(arg) {
	  return arg == this.short || arg == this.long;
	};
	
	/**
	 * Initialize a new `Command`.
	 *
	 * @param {String} name
	 * @api public
	 */
	
	function Command(name) {
	  this.commands = [];
	  this.options = [];
	  this._execs = {};
	  this._allowUnknownOption = false;
	  this._args = [];
	  this._name = name || '';
	}
	
	/**
	 * Inherit from `EventEmitter.prototype`.
	 */
	
	Command.prototype.__proto__ = EventEmitter.prototype;
	
	/**
	 * Add command `name`.
	 *
	 * The `.action()` callback is invoked when the
	 * command `name` is specified via __ARGV__,
	 * and the remaining arguments are applied to the
	 * function for access.
	 *
	 * When the `name` is "*" an un-matched command
	 * will be passed as the first arg, followed by
	 * the rest of __ARGV__ remaining.
	 *
	 * Examples:
	 *
	 *      program
	 *        .version('0.0.1')
	 *        .option('-C, --chdir <path>', 'change the working directory')
	 *        .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
	 *        .option('-T, --no-tests', 'ignore test hook')
	 *
	 *      program
	 *        .command('setup')
	 *        .description('run remote setup commands')
	 *        .action(function() {
	 *          console.log('setup');
	 *        });
	 *
	 *      program
	 *        .command('exec <cmd>')
	 *        .description('run the given remote command')
	 *        .action(function(cmd) {
	 *          console.log('exec "%s"', cmd);
	 *        });
	 *
	 *      program
	 *        .command('teardown <dir> [otherDirs...]')
	 *        .description('run teardown commands')
	 *        .action(function(dir, otherDirs) {
	 *          console.log('dir "%s"', dir);
	 *          if (otherDirs) {
	 *            otherDirs.forEach(function (oDir) {
	 *              console.log('dir "%s"', oDir);
	 *            });
	 *          }
	 *        });
	 *
	 *      program
	 *        .command('*')
	 *        .description('deploy the given env')
	 *        .action(function(env) {
	 *          console.log('deploying "%s"', env);
	 *        });
	 *
	 *      program.parse(process.argv);
	  *
	 * @param {String} name
	 * @param {String} [desc] for git-style sub-commands
	 * @return {Command} the new command
	 * @api public
	 */
	
	Command.prototype.command = function(name, desc, opts) {
	  opts = opts || {};
	  var args = name.split(/ +/);
	  var cmd = new Command(args.shift());
	
	  if (desc) {
	    cmd.description(desc);
	    this.executables = true;
	    this._execs[cmd._name] = true;
	    if (opts.isDefault) this.defaultExecutable = cmd._name;
	  }
	
	  cmd._noHelp = !!opts.noHelp;
	  this.commands.push(cmd);
	  cmd.parseExpectedArgs(args);
	  cmd.parent = this;
	
	  if (desc) return this;
	  return cmd;
	};
	
	/**
	 * Define argument syntax for the top-level command.
	 *
	 * @api public
	 */
	
	Command.prototype.arguments = function (desc) {
	  return this.parseExpectedArgs(desc.split(/ +/));
	};
	
	/**
	 * Add an implicit `help [cmd]` subcommand
	 * which invokes `--help` for the given command.
	 *
	 * @api private
	 */
	
	Command.prototype.addImplicitHelpCommand = function() {
	  this.command('help [cmd]', 'display help for [cmd]');
	};
	
	/**
	 * Parse expected `args`.
	 *
	 * For example `["[type]"]` becomes `[{ required: false, name: 'type' }]`.
	 *
	 * @param {Array} args
	 * @return {Command} for chaining
	 * @api public
	 */
	
	Command.prototype.parseExpectedArgs = function(args) {
	  if (!args.length) return;
	  var self = this;
	  args.forEach(function(arg) {
	    var argDetails = {
	      required: false,
	      name: '',
	      variadic: false
	    };
	
	    switch (arg[0]) {
	      case '<':
	        argDetails.required = true;
	        argDetails.name = arg.slice(1, -1);
	        break;
	      case '[':
	        argDetails.name = arg.slice(1, -1);
	        break;
	    }
	
	    if (argDetails.name.length > 3 && argDetails.name.slice(-3) === '...') {
	      argDetails.variadic = true;
	      argDetails.name = argDetails.name.slice(0, -3);
	    }
	    if (argDetails.name) {
	      self._args.push(argDetails);
	    }
	  });
	  return this;
	};
	
	/**
	 * Register callback `fn` for the command.
	 *
	 * Examples:
	 *
	 *      program
	 *        .command('help')
	 *        .description('display verbose help')
	 *        .action(function() {
	 *           // output help here
	 *        });
	 *
	 * @param {Function} fn
	 * @return {Command} for chaining
	 * @api public
	 */
	
	Command.prototype.action = function(fn) {
	  var self = this;
	  var listener = function(args, unknown) {
	    // Parse any so-far unknown options
	    args = args || [];
	    unknown = unknown || [];
	
	    var parsed = self.parseOptions(unknown);
	
	    // Output help if necessary
	    outputHelpIfNecessary(self, parsed.unknown);
	
	    // If there are still any unknown options, then we simply
	    // die, unless someone asked for help, in which case we give it
	    // to them, and then we die.
	    if (parsed.unknown.length > 0) {
	      self.unknownOption(parsed.unknown[0]);
	    }
	
	    // Leftover arguments need to be pushed back. Fixes issue #56
	    if (parsed.args.length) args = parsed.args.concat(args);
	
	    self._args.forEach(function(arg, i) {
	      if (arg.required && null == args[i]) {
	        self.missingArgument(arg.name);
	      } else if (arg.variadic) {
	        if (i !== self._args.length - 1) {
	          self.variadicArgNotLast(arg.name);
	        }
	
	        args[i] = args.splice(i);
	      }
	    });
	
	    // Always append ourselves to the end of the arguments,
	    // to make sure we match the number of arguments the user
	    // expects
	    if (self._args.length) {
	      args[self._args.length] = self;
	    } else {
	      args.push(self);
	    }
	
	    fn.apply(self, args);
	  };
	  var parent = this.parent || this;
	  var name = parent === this ? '*' : this._name;
	  parent.on(name, listener);
	  if (this._alias) parent.on(this._alias, listener);
	  return this;
	};
	
	/**
	 * Define option with `flags`, `description` and optional
	 * coercion `fn`.
	 *
	 * The `flags` string should contain both the short and long flags,
	 * separated by comma, a pipe or space. The following are all valid
	 * all will output this way when `--help` is used.
	 *
	 *    "-p, --pepper"
	 *    "-p|--pepper"
	 *    "-p --pepper"
	 *
	 * Examples:
	 *
	 *     // simple boolean defaulting to false
	 *     program.option('-p, --pepper', 'add pepper');
	 *
	 *     --pepper
	 *     program.pepper
	 *     // => Boolean
	 *
	 *     // simple boolean defaulting to true
	 *     program.option('-C, --no-cheese', 'remove cheese');
	 *
	 *     program.cheese
	 *     // => true
	 *
	 *     --no-cheese
	 *     program.cheese
	 *     // => false
	 *
	 *     // required argument
	 *     program.option('-C, --chdir <path>', 'change the working directory');
	 *
	 *     --chdir /tmp
	 *     program.chdir
	 *     // => "/tmp"
	 *
	 *     // optional argument
	 *     program.option('-c, --cheese [type]', 'add cheese [marble]');
	 *
	 * @param {String} flags
	 * @param {String} description
	 * @param {Function|Mixed} fn or default
	 * @param {Mixed} defaultValue
	 * @return {Command} for chaining
	 * @api public
	 */
	
	Command.prototype.option = function(flags, description, fn, defaultValue) {
	  var self = this
	    , option = new Option(flags, description)
	    , oname = option.name()
	    , name = camelcase(oname);
	
	  // default as 3rd arg
	  if (typeof fn != 'function') {
	    if (fn instanceof RegExp) {
	      var regex = fn;
	      fn = function(val, def) {
	        var m = regex.exec(val);
	        return m ? m[0] : def;
	      }
	    }
	    else {
	      defaultValue = fn;
	      fn = null;
	    }
	  }
	
	  // preassign default value only for --no-*, [optional], or <required>
	  if (false == option.bool || option.optional || option.required) {
	    // when --no-* we make sure default is true
	    if (false == option.bool) defaultValue = true;
	    // preassign only if we have a default
	    if (undefined !== defaultValue) self[name] = defaultValue;
	  }
	
	  // register the option
	  this.options.push(option);
	
	  // when it's passed assign the value
	  // and conditionally invoke the callback
	  this.on(oname, function(val) {
	    // coercion
	    if (null !== val && fn) val = fn(val, undefined === self[name]
	      ? defaultValue
	      : self[name]);
	
	    // unassigned or bool
	    if ('boolean' == typeof self[name] || 'undefined' == typeof self[name]) {
	      // if no value, bool true, and we have a default, then use it!
	      if (null == val) {
	        self[name] = option.bool
	          ? defaultValue || true
	          : false;
	      } else {
	        self[name] = val;
	      }
	    } else if (null !== val) {
	      // reassign
	      self[name] = val;
	    }
	  });
	
	  return this;
	};
	
	/**
	 * Allow unknown options on the command line.
	 *
	 * @param {Boolean} arg if `true` or omitted, no error will be thrown
	 * for unknown options.
	 * @api public
	 */
	Command.prototype.allowUnknownOption = function(arg) {
	    this._allowUnknownOption = arguments.length === 0 || arg;
	    return this;
	};
	
	/**
	 * Parse `argv`, settings options and invoking commands when defined.
	 *
	 * @param {Array} argv
	 * @return {Command} for chaining
	 * @api public
	 */
	
	Command.prototype.parse = function(argv) {
	  // implicit help
	  if (this.executables) this.addImplicitHelpCommand();
	
	  // store raw args
	  this.rawArgs = argv;
	
	  // guess name
	  this._name = this._name || basename(argv[1], '.js');
	
	  // github-style sub-commands with no sub-command
	  if (this.executables && argv.length < 3 && !this.defaultExecutable) {
	    // this user needs help
	    argv.push('--help');
	  }
	
	  // process argv
	  var parsed = this.parseOptions(this.normalize(argv.slice(2)));
	  var args = this.args = parsed.args;
	
	  var result = this.parseArgs(this.args, parsed.unknown);
	
	  // executable sub-commands
	  var name = result.args[0];
	  if (this._execs[name] && typeof this._execs[name] != "function") {
	    return this.executeSubCommand(argv, args, parsed.unknown);
	  } else if (this.defaultExecutable) {
	    // use the default subcommand
	    args.unshift(name = this.defaultExecutable);
	    return this.executeSubCommand(argv, args, parsed.unknown);
	  }
	
	  return result;
	};
	
	/**
	 * Execute a sub-command executable.
	 *
	 * @param {Array} argv
	 * @param {Array} args
	 * @param {Array} unknown
	 * @api private
	 */
	
	Command.prototype.executeSubCommand = function(argv, args, unknown) {
	  args = args.concat(unknown);
	
	  if (!args.length) this.help();
	  if ('help' == args[0] && 1 == args.length) this.help();
	
	  // <cmd> --help
	  if ('help' == args[0]) {
	    args[0] = args[1];
	    args[1] = '--help';
	  }
	
	  // executable
	  var f = argv[1];
	  // name of the subcommand, link `pm-install`
	  var bin = basename(f, '.js') + '-' + args[0];
	
	
	  // In case of globally installed, get the base dir where executable
	  //  subcommand file should be located at
	  var baseDir
	    , link = readlink(f);
	
	  // when symbolink is relative path
	  if (link !== f && link.charAt(0) !== '/') {
	    link = path.join(dirname(f), link)
	  }
	  baseDir = dirname(link);
	
	  // prefer local `./<bin>` to bin in the $PATH
	  var localBin = path.join(baseDir, bin);
	
	  // whether bin file is a js script with explicit `.js` extension
	  var isExplicitJS = false;
	  if (exists(localBin + '.js')) {
	    bin = localBin + '.js';
	    isExplicitJS = true;
	  } else if (exists(localBin)) {
	    bin = localBin;
	  }
	
	  args = args.slice(1);
	
	  var proc;
	  if (process.platform !== 'win32') {
	    if (isExplicitJS) {
	      args.unshift(localBin);
	      // add executable arguments to spawn
	      args = (process.execArgv || []).concat(args);
	
	      proc = spawn('node', args, { stdio: 'inherit', customFds: [0, 1, 2] });
	    } else {
	      proc = spawn(bin, args, { stdio: 'inherit', customFds: [0, 1, 2] });
	    }
	  } else {
	    args.unshift(localBin);
	    proc = spawn(process.execPath, args, { stdio: 'inherit'});
	  }
	
	  proc.on('close', process.exit.bind(process));
	  proc.on('error', function(err) {
	    if (err.code == "ENOENT") {
	      console.error('\n  %s(1) does not exist, try --help\n', bin);
	    } else if (err.code == "EACCES") {
	      console.error('\n  %s(1) not executable. try chmod or run with root\n', bin);
	    }
	    process.exit(1);
	  });
	
	  // Store the reference to the child process
	  this.runningCommand = proc;
	};
	
	/**
	 * Normalize `args`, splitting joined short flags. For example
	 * the arg "-abc" is equivalent to "-a -b -c".
	 * This also normalizes equal sign and splits "--abc=def" into "--abc def".
	 *
	 * @param {Array} args
	 * @return {Array}
	 * @api private
	 */
	
	Command.prototype.normalize = function(args) {
	  var ret = []
	    , arg
	    , lastOpt
	    , index;
	
	  for (var i = 0, len = args.length; i < len; ++i) {
	    arg = args[i];
	    if (i > 0) {
	      lastOpt = this.optionFor(args[i-1]);
	    }
	
	    if (arg === '--') {
	      // Honor option terminator
	      ret = ret.concat(args.slice(i));
	      break;
	    } else if (lastOpt && lastOpt.required) {
	      ret.push(arg);
	    } else if (arg.length > 1 && '-' == arg[0] && '-' != arg[1]) {
	      arg.slice(1).split('').forEach(function(c) {
	        ret.push('-' + c);
	      });
	    } else if (/^--/.test(arg) && ~(index = arg.indexOf('='))) {
	      ret.push(arg.slice(0, index), arg.slice(index + 1));
	    } else {
	      ret.push(arg);
	    }
	  }
	
	  return ret;
	};
	
	/**
	 * Parse command `args`.
	 *
	 * When listener(s) are available those
	 * callbacks are invoked, otherwise the "*"
	 * event is emitted and those actions are invoked.
	 *
	 * @param {Array} args
	 * @return {Command} for chaining
	 * @api private
	 */
	
	Command.prototype.parseArgs = function(args, unknown) {
	  var name;
	
	  if (args.length) {
	    name = args[0];
	    if (this.listeners(name).length) {
	      this.emit(args.shift(), args, unknown);
	    } else {
	      this.emit('*', args);
	    }
	  } else {
	    outputHelpIfNecessary(this, unknown);
	
	    // If there were no args and we have unknown options,
	    // then they are extraneous and we need to error.
	    if (unknown.length > 0) {
	      this.unknownOption(unknown[0]);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return an option matching `arg` if any.
	 *
	 * @param {String} arg
	 * @return {Option}
	 * @api private
	 */
	
	Command.prototype.optionFor = function(arg) {
	  for (var i = 0, len = this.options.length; i < len; ++i) {
	    if (this.options[i].is(arg)) {
	      return this.options[i];
	    }
	  }
	};
	
	/**
	 * Parse options from `argv` returning `argv`
	 * void of these options.
	 *
	 * @param {Array} argv
	 * @return {Array}
	 * @api public
	 */
	
	Command.prototype.parseOptions = function(argv) {
	  var args = []
	    , len = argv.length
	    , literal
	    , option
	    , arg;
	
	  var unknownOptions = [];
	
	  // parse options
	  for (var i = 0; i < len; ++i) {
	    arg = argv[i];
	
	    // literal args after --
	    if ('--' == arg) {
	      literal = true;
	      continue;
	    }
	
	    if (literal) {
	      args.push(arg);
	      continue;
	    }
	
	    // find matching Option
	    option = this.optionFor(arg);
	
	    // option is defined
	    if (option) {
	      // requires arg
	      if (option.required) {
	        arg = argv[++i];
	        if (null == arg) return this.optionMissingArgument(option);
	        this.emit(option.name(), arg);
	      // optional arg
	      } else if (option.optional) {
	        arg = argv[i+1];
	        if (null == arg || ('-' == arg[0] && '-' != arg)) {
	          arg = null;
	        } else {
	          ++i;
	        }
	        this.emit(option.name(), arg);
	      // bool
	      } else {
	        this.emit(option.name());
	      }
	      continue;
	    }
	
	    // looks like an option
	    if (arg.length > 1 && '-' == arg[0]) {
	      unknownOptions.push(arg);
	
	      // If the next argument looks like it might be
	      // an argument for this option, we pass it on.
	      // If it isn't, then it'll simply be ignored
	      if (argv[i+1] && '-' != argv[i+1][0]) {
	        unknownOptions.push(argv[++i]);
	      }
	      continue;
	    }
	
	    // arg
	    args.push(arg);
	  }
	
	  return { args: args, unknown: unknownOptions };
	};
	
	/**
	 * Return an object containing options as key-value pairs
	 *
	 * @return {Object}
	 * @api public
	 */
	Command.prototype.opts = function() {
	  var result = {}
	    , len = this.options.length;
	
	  for (var i = 0 ; i < len; i++) {
	    var key = camelcase(this.options[i].name());
	    result[key] = key === 'version' ? this._version : this[key];
	  }
	  return result;
	};
	
	/**
	 * Argument `name` is missing.
	 *
	 * @param {String} name
	 * @api private
	 */
	
	Command.prototype.missingArgument = function(name) {
	  console.error();
	  console.error("  error: missing required argument `%s'", name);
	  console.error();
	  process.exit(1);
	};
	
	/**
	 * `Option` is missing an argument, but received `flag` or nothing.
	 *
	 * @param {String} option
	 * @param {String} flag
	 * @api private
	 */
	
	Command.prototype.optionMissingArgument = function(option, flag) {
	  console.error();
	  if (flag) {
	    console.error("  error: option `%s' argument missing, got `%s'", option.flags, flag);
	  } else {
	    console.error("  error: option `%s' argument missing", option.flags);
	  }
	  console.error();
	  process.exit(1);
	};
	
	/**
	 * Unknown option `flag`.
	 *
	 * @param {String} flag
	 * @api private
	 */
	
	Command.prototype.unknownOption = function(flag) {
	  if (this._allowUnknownOption) return;
	  console.error();
	  console.error("  error: unknown option `%s'", flag);
	  console.error();
	  process.exit(1);
	};
	
	/**
	 * Variadic argument with `name` is not the last argument as required.
	 *
	 * @param {String} name
	 * @api private
	 */
	
	Command.prototype.variadicArgNotLast = function(name) {
	  console.error();
	  console.error("  error: variadic arguments must be last `%s'", name);
	  console.error();
	  process.exit(1);
	};
	
	/**
	 * Set the program version to `str`.
	 *
	 * This method auto-registers the "-V, --version" flag
	 * which will print the version number when passed.
	 *
	 * @param {String} str
	 * @param {String} flags
	 * @return {Command} for chaining
	 * @api public
	 */
	
	Command.prototype.version = function(str, flags) {
	  if (0 == arguments.length) return this._version;
	  this._version = str;
	  flags = flags || '-V, --version';
	  this.option(flags, 'output the version number');
	  this.on('version', function() {
	    process.stdout.write(str + '\n');
	    process.exit(0);
	  });
	  return this;
	};
	
	/**
	 * Set the description to `str`.
	 *
	 * @param {String} str
	 * @return {String|Command}
	 * @api public
	 */
	
	Command.prototype.description = function(str) {
	  if (0 === arguments.length) return this._description;
	  this._description = str;
	  return this;
	};
	
	/**
	 * Set an alias for the command
	 *
	 * @param {String} alias
	 * @return {String|Command}
	 * @api public
	 */
	
	Command.prototype.alias = function(alias) {
	  if (0 == arguments.length) return this._alias;
	  this._alias = alias;
	  return this;
	};
	
	/**
	 * Set / get the command usage `str`.
	 *
	 * @param {String} str
	 * @return {String|Command}
	 * @api public
	 */
	
	Command.prototype.usage = function(str) {
	  var args = this._args.map(function(arg) {
	    return humanReadableArgName(arg);
	  });
	
	  var usage = '[options]'
	    + (this.commands.length ? ' [command]' : '')
	    + (this._args.length ? ' ' + args.join(' ') : '');
	
	  if (0 == arguments.length) return this._usage || usage;
	  this._usage = str;
	
	  return this;
	};
	
	/**
	 * Get the name of the command
	 *
	 * @param {String} name
	 * @return {String|Command}
	 * @api public
	 */
	
	Command.prototype.name = function() {
	  return this._name;
	};
	
	/**
	 * Return the largest option length.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	Command.prototype.largestOptionLength = function() {
	  return this.options.reduce(function(max, option) {
	    return Math.max(max, option.flags.length);
	  }, 0);
	};
	
	/**
	 * Return help for options.
	 *
	 * @return {String}
	 * @api private
	 */
	
	Command.prototype.optionHelp = function() {
	  var width = this.largestOptionLength();
	
	  // Prepend the help information
	  return [pad('-h, --help', width) + '  ' + 'output usage information']
	      .concat(this.options.map(function(option) {
	        return pad(option.flags, width) + '  ' + option.description;
	      }))
	      .join('\n');
	};
	
	/**
	 * Return command help documentation.
	 *
	 * @return {String}
	 * @api private
	 */
	
	Command.prototype.commandHelp = function() {
	  if (!this.commands.length) return '';
	
	  var commands = this.commands.filter(function(cmd) {
	    return !cmd._noHelp;
	  }).map(function(cmd) {
	    var args = cmd._args.map(function(arg) {
	      return humanReadableArgName(arg);
	    }).join(' ');
	
	    return [
	      cmd._name
	        + (cmd._alias ? '|' + cmd._alias : '')
	        + (cmd.options.length ? ' [options]' : '')
	        + ' ' + args
	      , cmd.description()
	    ];
	  });
	
	  var width = commands.reduce(function(max, command) {
	    return Math.max(max, command[0].length);
	  }, 0);
	
	  return [
	    ''
	    , '  Commands:'
	    , ''
	    , commands.map(function(cmd) {
	      var desc = cmd[1] ? '  ' + cmd[1] : '';
	      return pad(cmd[0], width) + desc;
	    }).join('\n').replace(/^/gm, '    ')
	    , ''
	  ].join('\n');
	};
	
	/**
	 * Return program help documentation.
	 *
	 * @return {String}
	 * @api private
	 */
	
	Command.prototype.helpInformation = function() {
	  var desc = [];
	  if (this._description) {
	    desc = [
	      '  ' + this._description
	      , ''
	    ];
	  }
	
	  var cmdName = this._name;
	  if (this._alias) {
	    cmdName = cmdName + '|' + this._alias;
	  }
	  var usage = [
	    ''
	    ,'  Usage: ' + cmdName + ' ' + this.usage()
	    , ''
	  ];
	
	  var cmds = [];
	  var commandHelp = this.commandHelp();
	  if (commandHelp) cmds = [commandHelp];
	
	  var options = [
	    '  Options:'
	    , ''
	    , '' + this.optionHelp().replace(/^/gm, '    ')
	    , ''
	    , ''
	  ];
	
	  return usage
	    .concat(cmds)
	    .concat(desc)
	    .concat(options)
	    .join('\n');
	};
	
	/**
	 * Output help information for this command
	 *
	 * @api public
	 */
	
	Command.prototype.outputHelp = function(cb) {
	  if (!cb) {
	    cb = function(passthru) {
	      return passthru;
	    }
	  }
	  process.stdout.write(cb(this.helpInformation()));
	  this.emit('--help');
	};
	
	/**
	 * Output help information and exit.
	 *
	 * @api public
	 */
	
	Command.prototype.help = function(cb) {
	  this.outputHelp(cb);
	  process.exit();
	};
	
	/**
	 * Camel-case the given `flag`
	 *
	 * @param {String} flag
	 * @return {String}
	 * @api private
	 */
	
	function camelcase(flag) {
	  return flag.split('-').reduce(function(str, word) {
	    return str + word[0].toUpperCase() + word.slice(1);
	  });
	}
	
	/**
	 * Pad `str` to `width`.
	 *
	 * @param {String} str
	 * @param {Number} width
	 * @return {String}
	 * @api private
	 */
	
	function pad(str, width) {
	  var len = Math.max(0, width - str.length);
	  return str + Array(len + 1).join(' ');
	}
	
	/**
	 * Output help information if necessary
	 *
	 * @param {Command} command to output help for
	 * @param {Array} array of options to search for -h or --help
	 * @api private
	 */
	
	function outputHelpIfNecessary(cmd, options) {
	  options = options || [];
	  for (var i = 0; i < options.length; i++) {
	    if (options[i] == '--help' || options[i] == '-h') {
	      cmd.outputHelp();
	      process.exit(0);
	    }
	  }
	}
	
	/**
	 * Takes an argument an returns its human readable equivalent for help usage.
	 *
	 * @param {Object} arg
	 * @return {String}
	 * @api private
	 */
	
	function humanReadableArgName(arg) {
	  var nameOutput = arg.name + (arg.variadic === true ? '...' : '');
	
	  return arg.required
	    ? '<' + nameOutput + '>'
	    : '[' + nameOutput + ']'
	}
	
	// for versions before node v0.8 when there weren't `fs.existsSync`
	function exists(file) {
	  try {
	    if (fs.statSync(file).isFile()) {
	      return true;
	    }
	  } catch (e) {
	    return false;
	  }
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(4)
	  , lstat = fs.lstatSync;
	
	exports.readlinkSync = function (p) {
	  if (lstat(p).isSymbolicLink()) {
	    return fs.readlinkSync(p);
	  } else {
	    return p;
	  }
	};
	
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	//Graphql types
	
	
	var _Templates = __webpack_require__(8);
	
	var _GraphqlTypes = __webpack_require__(9);
	
	var _GraphqlTypes2 = _interopRequireDefault(_GraphqlTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//JS Types
	var jsString = 'string';
	var jsArray = 'array';
	var jsObject = 'object';
	var jsBoolean = 'boolean';
	var jsUndefined = 'undefined';
	var jsNull = 'null';
	var jsNumber = 'number';
	var roots = [];
	
	function GraphQLList(type) {
		return 'new GraphQLList(' + type + ')';
	}
	
	//Get graphql type from value 
	function getType(value) {
		if (value === null) {
			return null;
		}
		if (Array.isArray(value)) {
			var type = getType('', value[0]);
			return GraphQLList(type);
		}
		switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
			case jsBoolean:
				return _GraphqlTypes2.default.GraphQLBoolean;
			case jsString:
				return _GraphqlTypes2.default.GraphQLString;
			case jsNumber:
				return value % 1 == 0 ? _GraphqlTypes2.default.GraphQLInt : _GraphqlTypes2.default.GraphQLFloat;
			case jsObject:
				return _GraphqlTypes2.default.GraphQLObjectType;
		}
		return null;
	}
	
	function getJsType(value) {
		if (value === null) return jsNull;
		if (Array.isArray(value)) {
			return jsArray;
		} else {
			return typeof value === 'undefined' ? 'undefined' : _typeof(value);
		}
	}
	
	var Type = function Type(key, value, parent) {
		_classCallCheck(this, Type);
	
		this.key = key;
		this.jsType = getJsType(value);
		this.type = getType(value);
		this.fields = null;
		this.isList = false;
		this.isCustom = false;
	
		if (this.jsType === jsObject) {
			this.type = createCustomType(key);
			this.isCustom = true;
		}
	
		if (this.jsType === jsArray) {
			this.isList = true;
			this.isCustom = true;
			var firstElemType = getType(value[0]);
			for (var i = 0; i < value.length; i++) {
				var itemType = getType(value[i]);
	
				//IMPROVE THIS - handle in a better way
				if (firstElemType !== itemType) {
					process.exit();
				}
			}
	
			if (firstElemType === _GraphqlTypes2.default.GraphQLObjectType) {
				firstElemType = createCustomType(key);
			}
	
			this.type = firstElemType;
		}
	};
	
	function createSchema(typesHash) {
		for (var key in typesHash) {
			var elem = typesHash[key];
			if (elem.isCustom && elem.fields) {
				var fields = checkList(elem.fields);
				var fieldsSchema = fieldsToScalar(fields);
				elem.fieldsSchema = (0, _Templates.typeTemplate)(elem.type, key, fieldsSchema);
				if (elem.fields) {
					elem.deepSchema = createSchema(elem.fields);
				}
			}
			elem.schema = (0, _Templates.scalarTypeTemplate)(key, elem.type);
		}
		return typesHash;
	}
	
	function fieldsToScalar(fields) {
		var types = [];
		for (var key in fields) {
			var field = fields[key];
			types.push((0, _Templates.scalarTypeTemplate)(key, field.type));
		}
		return types.join(',');
	}
	
	function createCustomType(type) {
		var word = type.split('');
		word = word.map(function (chars) {
			return chars[0].toUpperCase() + chars.slice(1);
		});
		return word.join('') + 'Type';
	}
	
	function createTypesHash(data) {
		var types = Object.assign({});
		var keys = Object.keys(data);
		keys.forEach(function (key) {
			var value = data[key];
			var elem = new Type(key, value);
			if (elem.isCustom) {
				elem.fields = elem.isList ? createTypesHash(value[0], elem) : createTypesHash(value, elem);
			}
			types[key] = elem;
		});
		return types;
	}
	
	function checkList(types) {
		for (var key in types) {
			var elem = types[key];
			if (elem.isList) {
				elem.type = GraphQLList(elem.type);
			}
			types[key] = elem;
		}
		return types;
	}
	
	function createRoot(fields) {
		var allfields = [];
		for (var key in fields) {
			var field = fields[key];
			if (field.isCustom) {
				roots.push(field.fieldsSchema);
				if (field.deepSchema) {
					createRoot(field.deepSchema);
				}
			}
			allfields.push(field.schema);
		}
		var root = (0, _Templates.schemaTemplate)(allfields.join(','), roots);
		return root;
	}
	
	function json2graphql(data) {
		var types = createTypesHash(data);
		types = checkList(types);
		var schema = createSchema(types);
		return createRoot(schema);
	}
	
	exports.default = json2graphql;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var scalarTypeTemplate = exports.scalarTypeTemplate = function scalarTypeTemplate(name, type) {
	  return '\n  ' + name + ': {\n    description: \'enter your description\',\n    type: ' + type + ',\n    // TODO: Implement resolver for ' + name + '\n    //resolve: () => null,\n  }';
	};
	
	var objectTypeTemplate = exports.objectTypeTemplate = function objectTypeTemplate(name, resolve) {
	  return '\n  ' + name + ': {\n    description: \'enter description\',\n    type: ' + name + 'Type,\n    // TODO: Implement resolver for ' + name + 'Type\n    //resolve: () => (' + resolve + '),\n  }';
	};
	
	var typeTemplate = exports.typeTemplate = function typeTemplate(type, name, fields) {
	  return '\nconst ' + type + ' = new GraphQLObjectType({\n  name: \'' + name + '\',\n  fields: () => ({' + fields + '}),\n});';
	};
	
	var schemaTemplate = exports.schemaTemplate = function schemaTemplate(fields, types) {
	  return '\nimport {\n  GraphQLBoolean,\n  GraphQLString,\n  GraphQLInt,\n  GraphQLFloat,\n  GraphQLObjectType,\n  GraphQLSchema,\n  GraphQLID,\n  GraphQLNonNull\n} from \'graphql\';\n\n' + types.join('\n') + '\n\nconst Query = new GraphQLSchema({\n  query: new GraphQLObjectType({\n    name: \'Root\',\n    fields: () => ({' + fields + '})\n  })\n})\n\nexport default Query;\n';
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _keymirror = __webpack_require__(10);
	
	var _keymirror2 = _interopRequireDefault(_keymirror);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GraphqlTypes = (0, _keymirror2.default)({
		GraphQLSchema: null,
		GraphQLObjectType: null,
		GraphQLInt: null,
		GraphQLFloat: null,
		GraphQLString: null,
		GraphQLBoolean: null,
		GraphQLID: null
	});
	
	exports.default = GraphqlTypes;

/***/ },
/* 10 */
/***/ function(module, exports) {

	//https://github.com/wmira/key-mirror
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	module.exports =
	
	/**
	 * Takes in a {key:val} and returns a key:key
	 *  
	 * @param object {key1 : val1 ... keyn:valn}
	 */
	function (obj) {
	    var key;
	    var mirrored = {};
	
	    if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                mirrored[key] = key;
	            }
	        }
	    }
	    return mirrored;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map