!(function() {
  "use strict";
  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise, SuppressedError, Symbol */  function __decorate(decorators, target, key, desc) {
    var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))((function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        var value;
        result.done ? resolve(result.value) : (value = result.value, value instanceof P ? value : new P((function(resolve) {
          resolve(value);
        }))).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    }));
  }
  /**
   * A class which provides a reliable callback using either
   * a Web Worker, or if that isn't supported, falls back to setTimeout.
   */  function copyFromChannel(audioBuffer, 
  // @todo There is currently no way to define something like { [ key: number | string ]: Float32Array }
  parent, key, channelNumber, bufferOffset) {
    if ("function" == typeof audioBuffer.copyFromChannel) 
    // The byteLength will be 0 when the ArrayBuffer was transferred.
    0 === parent[key].byteLength && (parent[key] = new Float32Array(128)), audioBuffer.copyFromChannel(parent[key], channelNumber, bufferOffset); else {
      const channelData = audioBuffer.getChannelData(channelNumber);
      // The byteLength will be 0 when the ArrayBuffer was transferred.
            if (0 === parent[key].byteLength) parent[key] = channelData.slice(bufferOffset, bufferOffset + 128); else {
        const slicedInput = new Float32Array(channelData.buffer, bufferOffset * Float32Array.BYTES_PER_ELEMENT, 128);
        parent[key].set(slicedInput);
      }
    }
  }
  function divide(a, b) {
    const denominator = b[0] * b[0] + b[1] * b[1];
    return [ (a[0] * b[0] + a[1] * b[1]) / denominator, (a[1] * b[0] - a[0] * b[1]) / denominator ];
  }
  function evaluatePolynomial(coefficient, z) {
    let result = [ 0, 0 ];
    for (let i = coefficient.length - 1; i >= 0; i -= 1) b = z, result = [ (a = result)[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0] ], 
    result[0] += coefficient[i];
    var a, b;
    return result;
  }
  /**
   * Test if the given value is an instanceof AudioParam
   */
  function isAudioParam(arg) {
    return isAnyAudioParam(arg);
  }
  /**
   * Test if the given value is an instanceof AudioNode
   */  function isAudioNode(arg) {
    return isAnyAudioNode(arg);
  }
  /**
   * Test if the arg is instanceof an OfflineAudioContext
   */  function isOfflineAudioContext(arg) {
    return isAnyOfflineAudioContext(arg);
  }
  /**
   * Test if the arg is an instanceof AudioContext
   */  function isAudioContext(arg) {
    return isAnyAudioContext(arg);
  }
  /**
   * Test if the arg is instanceof an AudioBuffer
   */  
  /**
   * Test if the arg is undefined
   */
  function isUndef(arg) {
    return void 0 === arg;
  }
  /**
   * Test if the arg is not undefined
   */  function isDefined(arg) {
    return void 0 !== arg;
  }
  /**
   * Test if the arg is a function
   */  
  /**
   * Test if the argument is a number.
   */
  function isNumber(arg) {
    return "number" == typeof arg;
  }
  /**
   * Test if the given argument is an object literal (i.e. `{}`);
   */  function isObject(arg) {
    return "[object Object]" === Object.prototype.toString.call(arg) && arg.constructor === Object;
  }
  /**
   * Test if the argument is a boolean.
   */  
  /**
   * Test if the argument is an Array
   */
  function isArray(arg) {
    return Array.isArray(arg);
  }
  /**
   * Test if the argument is a string.
   */  function isString(arg) {
    return "string" == typeof arg;
  }
  /**
   * Some objects should not be merged
   */  function noCopy(key, arg) {
    return "value" === key || isAudioParam(arg) || isAudioNode(arg) || (function(arg) {
      return arg instanceof audioBufferConstructor;
    })(arg);
  }
  /**
   * Recursively merge an object
   * @param target the object to merge into
   * @param sources the source objects to merge
   */  function deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) for (const key in source) noCopy(key, source[key]) ? target[key] = source[key] : isObject(source[key]) ? (target[key] || Object.assign(target, {
      [key]: {}
    }), deepMerge(target[key], source[key])) : Object.assign(target, {
      [key]: source[key]
    });
    // @ts-ignore
        return deepMerge(target, ...sources);
  }
  /**
   * Returns true if the two arrays have the same value for each of the elements
   */  
  /**
   * Convert an args array into an object.
   * @internal
   */
  function optionsFromArguments(defaults, argsArray, keys = [], objKey) {
    const opts = {};
    const args = Array.from(argsArray);
    // if the first argument is an object and has an object key
        if (isObject(args[0]) && objKey && !Reflect.has(args[0], objKey)) {
      Object.keys(args[0]).some((key => Reflect.has(defaults, key))) || (
      // merge that key
      deepMerge(opts, {
        [objKey]: args[0]
      }), 
      // remove the obj key from the keys
      keys.splice(keys.indexOf(objKey), 1), 
      // shift the first argument off
      args.shift());
    }
    if (1 === args.length && isObject(args[0])) deepMerge(opts, args[0]); else for (let i = 0; i < keys.length; i++) isDefined(args[i]) && (opts[keys[i]] = args[i]);
    return deepMerge(defaults, opts);
  }
  /**
   * Return this instances default values by calling Constructor.getDefaults()
   */  
  /**
   * Returns the fallback if the given object is undefined.
   * Take an array of arguments and return a formatted options object.
   * @internal
   */
  function defaultArg(given, fallback) {
    return isUndef(given) ? fallback : given;
  }
  /**
   * Assert that the statement is true, otherwise invoke the error.
   * @param statement
   * @param error The message which is passed into an Error
   */
  function assert(statement, error) {
    if (!statement) throw new Error(error);
  }
  /**
   * Make sure that the given value is within the range
   */  function assertRange(value, gte, lte = 1 / 0) {
    if (!(gte <= value && value <= lte)) throw new RangeError(`Value must be within [${gte}, ${lte}], got: ${value}`);
  }
  /**
   * Warn if the context is not running.
   */  function assertContextRunning(context) {
    // add a warning if the context is not started
    context.isOffline || "running" === context.state || warn('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.');
  }
  /**
   * If it is currently inside a scheduled callback
   */  
  /**
   * Notify that the following block of code is occurring inside a Transport callback.
   */
  function enterScheduledCallback(insideCallback) {
    isInsideScheduledCallback = insideCallback;
  }
  /**
   * Make sure that a time was passed into
   */  
  /**
   * Warn anything
   */
  function warn(...args) {
    defaultLogger.warn(...args);
  }
  /**
   * Create a new AudioContext
   */  
  /**
   * Test if A is greater than B
   */
  function GT(a, b) {
    return a > b + EPSILON;
  }
  /**
   * Test if A is greater than or equal to B
   */  function GTE(a, b) {
    return GT(a, b) || EQ(a, b);
  }
  /**
   * Test if A is less than B
   */  function LT(a, b) {
    return a + EPSILON < b;
  }
  /**
   * Test if A is less than B
   */  function EQ(a, b) {
    return Math.abs(a - b) < EPSILON;
  }
  /**
   * Clamp the value within the given range
   */  
  /**
   * Used internally to setup a new Context
   */
  function onContextInit(cb) {
    notifyNewContext.push(cb);
  }
  /**
   * Invoke any classes which need to also be initialized when a new context is created.
   */  
  /**
   * Used internally to tear down a Context
   */
  function onContextClose(cb) {
    notifyCloseContext.push(cb);
  }
  /**
   * Equal power gain scale. Good for cross-fading.
   * @param  percent (0-1)
   */
  /**
   * Convert decibels into gain.
   */
  function dbToGain(db) {
    return Math.pow(10, db / 20);
  }
  /**
   * Convert gain to decibels.
   */  function gainToDb(gain) {
    return Math.log(gain) / Math.LN10 * 20;
  }
  /**
   * Convert an interval (in semitones) to a frequency ratio.
   * @param interval the number of semitones above the base note
   * @example
   * Tone.intervalToFrequencyRatio(0); // 1
   * Tone.intervalToFrequencyRatio(12); // 2
   * Tone.intervalToFrequencyRatio(-12); // 0.5
   */  function intervalToFrequencyRatio(interval) {
    return Math.pow(2, interval / 12);
  }
  /**
   * The Global [concert tuning pitch](https://en.wikipedia.org/wiki/Concert_pitch) which is used
   * to generate all the other pitch values from notes. A4's values in Hertz.
   */  
  /**
   * Convert a frequency value to a MIDI note.
   * @param frequency The value to frequency value to convert.
   * @example
   * Tone.ftom(440); // returns 69
   */
  function ftom(frequency) {
    return Math.round((
    /**
   * Convert a frequency to a floating point midi value
   */
    function(frequency) {
      return 69 + 12 * Math.log2(frequency / A4);
    }
    /**
   * Convert a MIDI note to frequency value.
   * @param  midi The midi number to convert.
   * @return The corresponding frequency value
   * @example
   * Tone.mtof(69); // 440
   */)(frequency));
  }
  /**
   * Make the property not writable using `defineProperty`. Internal use only.
   */
  function readOnly(target, property) {
    isArray(property) ? property.forEach((str => readOnly(target, str))) : Object.defineProperty(target, property, {
      enumerable: !0,
      writable: !1
    });
  }
  /**
   * Make an attribute writeable. Internal use only.
   */  function writable(target, property) {
    isArray(property) ? property.forEach((str => writable(target, str))) : Object.defineProperty(target, property, {
      writable: !0
    });
  }
  /**
   * Returns the default system-wide {@link Context}
   * @category Core
   */
  function getContext() {
    return globalContext === dummyContext && hasAudioContext && (
    /**
   * Set the default audio context
   * @param context
   * @param disposeOld Pass `true` if you don't need the old context to dispose it.
   * @category Core
   */
    function(context, disposeOld = !1) {
      disposeOld && globalContext.dispose();
      globalContext = isAudioContext(context) ? new Context(context) : isOfflineAudioContext(context) ? new OfflineContext(context) : context;
    }
    /**
   * Log Tone.js + version in the console.
   */)(new Context), globalContext;
  }
  //-------------------------------------
  // CONNECTIONS
  //-------------------------------------
  /**
   * connect together all of the arguments in series
   * @param nodes
   */
  function connectSeries(...nodes) {
    const first = nodes.shift();
    nodes.reduce(((prev, current) => (prev instanceof ToneAudioNode ? prev.connect(current) : isAudioNode(prev) && connect(prev, current), 
    current)), first);
  }
  /**
   * Connect two nodes together so that signal flows from the
   * first node to the second. Optionally specify the input and output channels.
   * @param srcNode The source node
   * @param dstNode The destination node
   * @param outputNumber The output channel of the srcNode
   * @param inputNumber The input channel of the dstNode
   */  function connect(srcNode, dstNode, outputNumber = 0, inputNumber = 0) {
    // resolve the input of the dstNode
    for (assert(isDefined(srcNode), "Cannot connect from undefined node"), assert(isDefined(dstNode), "Cannot connect to undefined node"), 
    (dstNode instanceof ToneAudioNode || isAudioNode(dstNode)) && assert(dstNode.numberOfInputs > 0, "Cannot connect to node with no inputs"), 
    assert(srcNode.numberOfOutputs > 0, "Cannot connect from node with no outputs"); dstNode instanceof ToneAudioNode || dstNode instanceof Param; ) isDefined(dstNode.input) && (dstNode = dstNode.input);
    for (;srcNode instanceof ToneAudioNode; ) isDefined(srcNode.output) && (srcNode = srcNode.output);
    // make the connection
        isAudioParam(dstNode) ? srcNode.connect(dstNode, outputNumber) : srcNode.connect(dstNode, outputNumber, inputNumber);
  }
  /**
   * Disconnect a node from all nodes or optionally include a destination node and input/output channels.
   * @param srcNode The source node
   * @param dstNode The destination node
   * @param outputNumber The output channel of the srcNode
   * @param inputNumber The input channel of the dstNode
   */  function disconnect(srcNode, dstNode, outputNumber = 0, inputNumber = 0) {
    // resolve the destination node
    if (isDefined(dstNode)) for (;dstNode instanceof ToneAudioNode; ) dstNode = dstNode.input;
    // resolve the src node
        for (;!isAudioNode(srcNode); ) isDefined(srcNode.output) && (srcNode = srcNode.output);
    isAudioParam(dstNode) ? srcNode.disconnect(dstNode, outputNumber) : isAudioNode(dstNode) ? srcNode.disconnect(dstNode, outputNumber, inputNumber) : srcNode.disconnect();
  }
  /**
   * A thin wrapper around the Native Web Audio GainNode.
   * The GainNode is a basic building block of the Web Audio
   * API and is useful for routing audio and adjusting gains.
   * @category Core
   * @example
   * return Tone.Offline(() => {
   * 	const gainNode = new Tone.Gain(0).toDestination();
   * 	const osc = new Tone.Oscillator(30).connect(gainNode).start();
   * 	gainNode.gain.rampTo(1, 0.1);
   * 	gainNode.gain.rampTo(0, 0.4, 0.2);
   * }, 0.7, 1);
   */  
  /**
   * When connecting from a signal, it's necessary to zero out the node destination
   * node if that node is also a signal. If the destination is not 0, then the values
   * will be summed. This method insures that the output of the destination signal will
   * be the same as the source signal, making the destination signal a pass through node.
   * @param signal The output signal to connect from
   * @param destination the destination to connect to
   * @param outputNum the optional output number
   * @param inputNum the input number
   */
  function connectSignal(signal, destination, outputNum, inputNum) {
    (destination instanceof Param || isAudioParam(destination) || destination instanceof Signal && destination.override) && (
    // cancel changes
    destination.cancelScheduledValues(0), 
    // reset the value
    destination.setValueAtTime(0, 0), 
    // mark the value as overridden
    destination instanceof Signal && (destination.overridden = !0)), connect(signal, destination, outputNum, inputNum);
  }
  /**
   * Volume is a simple volume node, useful for creating a volume fader.
   *
   * @example
   * const vol = new Tone.Volume(-12).toDestination();
   * const osc = new Tone.Oscillator().connect(vol).start();
   * @category Component
   */  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  /** 
   * Generate Sine, Triangle, Square and Sawtooth waveforms.
   * @class Oscillator
   * @constructor
   * @param {Number} [frequency] frequency defaults to 440Hz
   * @param {String} [type] type of oscillator. Options:
   *                        'sine' (default), 'triangle',
   *                        'sawtooth', 'square'
   * @example
   * <div>
   * <code>
   * let osc, playing, freq, amp;
   *
   * function setup() {
   *   describe("a sketch that demonstrates the frequency and amplitude parameters of an oscillator.");
   *   let cnv = createCanvas(100, 100);
   *   cnv.mousePressed(playOscillator);
   *   osc = new Oscillator();
   * }
   *
   * function draw() {
   *   background(220)
   *   freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
   *   //amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
   *   text('tap to play', 20, 20);
   *   text('freq: ' + freq, 20, 40);
   *   //text('amp: ' + amp, 20, 60);
   *
   *   if (playing) {
   *     // smooth the transitions by 0.1 seconds
   *     osc.freq(freq);
   *     //osc.amp(amp);
   *   }
   * }
   *
   * function playOscillator() {
   *   // starting an oscillator on a user gesture will enable audio
   *   // in browsers that have a strict autoplay policy.
   *   osc.start();
   *   playing = true;
   * }
   *
   * function mouseReleased() {
   *   // ramp amplitude to 0 over 0.5 seconds
   *   //osc.amp(0, 0.5);
   *   playing = false;
   * }
   * </code> 
   * </div>
   */  
  /**
   * Convert the time to seconds and assert that the time is in between the two
   * values when being set.
   */
  function timeRange(min, max = 1 / 0) {
    const valueMap = new WeakMap;
    return function(target, propertyKey) {
      Reflect.defineProperty(target, propertyKey, {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return valueMap.get(this);
        },
        set: function(newValue) {
          assertRange(this.toSeconds(newValue), min, max), valueMap.set(this, newValue);
        }
      });
    };
  }
  /**
   * Envelope is an [ADSR](https://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope)
   * envelope generator. Envelope outputs a signal which
   * can be connected to an AudioParam or Tone.Signal.
   * ```
   *           /\
   *          /  \
   *         /    \
   *        /      \
   *       /        \___________
   *      /                     \
   *     /                       \
   *    /                         \
   *   /                           \
   * ```
   * @example
   * return Tone.Offline(() => {
   * 	const env = new Tone.Envelope({
   * 		attack: 0.1,
   * 		decay: 0.2,
   * 		sustain: 0.5,
   * 		release: 0.8,
   * 	}).toDestination();
   * 	env.triggerAttackRelease(0.5);
   * }, 1.5, 1);
   * @category Component
   */  class Ticker {
    constructor(callback, type, updateInterval, contextSampleRate) {
      this._callback = callback, this._type = type, this._minimumUpdateInterval = Math.max(128 / (contextSampleRate || 44100), .001), 
      this.updateInterval = updateInterval, 
      // create the clock source for the first time
      this._createClock();
    }
    /**
       * Generate a web worker
       */    _createWorker() {
      const blob = new Blob([ 
      /* javascript */ `\n\t\t\t// the initial timeout time\n\t\t\tlet timeoutTime =  ${(1e3 * this._updateInterval).toFixed(1)};\n\t\t\t// onmessage callback\n\t\t\tself.onmessage = function(msg){\n\t\t\t\ttimeoutTime = parseInt(msg.data);\n\t\t\t};\n\t\t\t// the tick function which posts a message\n\t\t\t// and schedules a new tick\n\t\t\tfunction tick(){\n\t\t\t\tsetTimeout(tick, timeoutTime);\n\t\t\t\tself.postMessage('tick');\n\t\t\t}\n\t\t\t// call tick initially\n\t\t\ttick();\n\t\t\t` ], {
        type: "text/javascript"
      });
      const blobUrl = URL.createObjectURL(blob);
      const worker = new Worker(blobUrl);
      worker.onmessage = this._callback.bind(this), this._worker = worker;
    }
    /**
       * Create a timeout loop
       */    _createTimeout() {
      this._timeout = setTimeout((() => {
        this._createTimeout(), this._callback();
      }), 1e3 * this._updateInterval);
    }
    /**
       * Create the clock source.
       */    _createClock() {
      if ("worker" === this._type) try {
        this._createWorker();
      } catch (e) {
        // workers not supported, fallback to timeout
        this._type = "timeout", this._createClock();
      } else "timeout" === this._type && this._createTimeout();
    }
    /**
       * Clean up the current clock source
       */    _disposeClock() {
      this._timeout && clearTimeout(this._timeout), this._worker && (this._worker.terminate(), 
      this._worker.onmessage = null);
    }
    /**
       * The rate in seconds the ticker will update
       */    get updateInterval() {
      return this._updateInterval;
    }
    set updateInterval(interval) {
      var _a;
      this._updateInterval = Math.max(interval, this._minimumUpdateInterval), "worker" === this._type && (null === (_a = this._worker) || void 0 === _a || _a.postMessage(1e3 * this._updateInterval));
    }
    /**
       * The type of the ticker, either a worker or a timeout
       */    get type() {
      return this._type;
    }
    set type(type) {
      this._disposeClock(), this._type = type, this._createClock();
    }
    /**
       * Clean up
       */    dispose() {
      this._disposeClock();
    }
  }
  const createExtendedExponentialRampToValueAutomationEvent = (value, endTime, insertTime) => ({
    endTime: endTime,
    insertTime: insertTime,
    type: "exponentialRampToValue",
    value: value
  });
  const createExtendedLinearRampToValueAutomationEvent = (value, endTime, insertTime) => ({
    endTime: endTime,
    insertTime: insertTime,
    type: "linearRampToValue",
    value: value
  });
  const createSetValueAutomationEvent = (value, startTime) => ({
    startTime: startTime,
    type: "setValue",
    value: value
  });
  const createSetValueCurveAutomationEvent = (values, startTime, duration) => ({
    duration: duration,
    startTime: startTime,
    type: "setValueCurve",
    values: values
  });
  const getTargetValueAtTime = (time, valueAtStartTime, {startTime: startTime, target: target, timeConstant: timeConstant}) => target + (valueAtStartTime - target) * Math.exp((startTime - time) / timeConstant);
  const isExponentialRampToValueAutomationEvent = automationEvent => "exponentialRampToValue" === automationEvent.type;
  const isLinearRampToValueAutomationEvent = automationEvent => "linearRampToValue" === automationEvent.type;
  const isAnyRampToValueAutomationEvent = automationEvent => isExponentialRampToValueAutomationEvent(automationEvent) || isLinearRampToValueAutomationEvent(automationEvent);
  const isSetValueAutomationEvent = automationEvent => "setValue" === automationEvent.type;
  const isSetValueCurveAutomationEvent = automationEvent => "setValueCurve" === automationEvent.type;
  const getValueOfAutomationEventAtIndexAtTime = (automationEvents, index, time, defaultValue) => {
    const automationEvent = automationEvents[index];
    return void 0 === automationEvent ? defaultValue : isAnyRampToValueAutomationEvent(automationEvent) || isSetValueAutomationEvent(automationEvent) ? automationEvent.value : isSetValueCurveAutomationEvent(automationEvent) ? automationEvent.values[automationEvent.values.length - 1] : getTargetValueAtTime(time, getValueOfAutomationEventAtIndexAtTime(automationEvents, index - 1, automationEvent.startTime, defaultValue), automationEvent);
  };
  const getEndTimeAndValueOfPreviousAutomationEvent = (automationEvents, index, currentAutomationEvent, nextAutomationEvent, defaultValue) => void 0 === currentAutomationEvent ? [ nextAutomationEvent.insertTime, defaultValue ] : isAnyRampToValueAutomationEvent(currentAutomationEvent) ? [ currentAutomationEvent.endTime, currentAutomationEvent.value ] : isSetValueAutomationEvent(currentAutomationEvent) ? [ currentAutomationEvent.startTime, currentAutomationEvent.value ] : isSetValueCurveAutomationEvent(currentAutomationEvent) ? [ currentAutomationEvent.startTime + currentAutomationEvent.duration, currentAutomationEvent.values[currentAutomationEvent.values.length - 1] ] : [ currentAutomationEvent.startTime, getValueOfAutomationEventAtIndexAtTime(automationEvents, index - 1, currentAutomationEvent.startTime, defaultValue) ];
  const isCancelAndHoldAutomationEvent = automationEvent => "cancelAndHold" === automationEvent.type;
  const isCancelScheduledValuesAutomationEvent = automationEvent => "cancelScheduledValues" === automationEvent.type;
  const getEventTime = automationEvent => isCancelAndHoldAutomationEvent(automationEvent) || isCancelScheduledValuesAutomationEvent(automationEvent) ? automationEvent.cancelTime : isExponentialRampToValueAutomationEvent(automationEvent) || isLinearRampToValueAutomationEvent(automationEvent) ? automationEvent.endTime : automationEvent.startTime;
  const getExponentialRampValueAtTime = (time, startTime, valueAtStartTime, {endTime: endTime, value: value}) => valueAtStartTime === value ? value : 0 < valueAtStartTime && 0 < value || valueAtStartTime < 0 && value < 0 ? valueAtStartTime * (value / valueAtStartTime) ** ((time - startTime) / (endTime - startTime)) : 0;
  const getLinearRampValueAtTime = (time, startTime, valueAtStartTime, {endTime: endTime, value: value}) => valueAtStartTime + (time - startTime) / (endTime - startTime) * (value - valueAtStartTime);
  const getValueCurveValueAtTime = (time, {duration: duration, startTime: startTime, values: values}) => ((values, theoreticIndex) => {
    const lowerIndex = Math.floor(theoreticIndex);
    const upperIndex = Math.ceil(theoreticIndex);
    return lowerIndex === upperIndex ? values[lowerIndex] : (1 - (theoreticIndex - lowerIndex)) * values[lowerIndex] + (1 - (upperIndex - theoreticIndex)) * values[upperIndex];
  })(values, (time - startTime) / duration * (values.length - 1));
  const isSetTargetAutomationEvent = automationEvent => "setTarget" === automationEvent.type;
  class AutomationEventList {
    constructor(defaultValue) {
      this._automationEvents = [], this._currenTime = 0, this._defaultValue = defaultValue;
    }
    [Symbol.iterator]() {
      return this._automationEvents[Symbol.iterator]();
    }
    add(automationEvent) {
      const eventTime = getEventTime(automationEvent);
      if (isCancelAndHoldAutomationEvent(automationEvent) || isCancelScheduledValuesAutomationEvent(automationEvent)) {
        const index = this._automationEvents.findIndex((currentAutomationEvent => isCancelScheduledValuesAutomationEvent(automationEvent) && isSetValueCurveAutomationEvent(currentAutomationEvent) ? currentAutomationEvent.startTime + currentAutomationEvent.duration >= eventTime : getEventTime(currentAutomationEvent) >= eventTime));
        const removedAutomationEvent = this._automationEvents[index];
        if (-1 !== index && (this._automationEvents = this._automationEvents.slice(0, index)), 
        isCancelAndHoldAutomationEvent(automationEvent)) {
          const lastAutomationEvent = this._automationEvents[this._automationEvents.length - 1];
          if (void 0 !== removedAutomationEvent && isAnyRampToValueAutomationEvent(removedAutomationEvent)) {
            if (void 0 !== lastAutomationEvent && isSetTargetAutomationEvent(lastAutomationEvent)) throw new Error("The internal list is malformed.");
            const startTime = void 0 === lastAutomationEvent ? removedAutomationEvent.insertTime : isSetValueCurveAutomationEvent(lastAutomationEvent) ? lastAutomationEvent.startTime + lastAutomationEvent.duration : getEventTime(lastAutomationEvent);
            const startValue = void 0 === lastAutomationEvent ? this._defaultValue : isSetValueCurveAutomationEvent(lastAutomationEvent) ? lastAutomationEvent.values[lastAutomationEvent.values.length - 1] : lastAutomationEvent.value;
            const value = isExponentialRampToValueAutomationEvent(removedAutomationEvent) ? getExponentialRampValueAtTime(eventTime, startTime, startValue, removedAutomationEvent) : getLinearRampValueAtTime(eventTime, startTime, startValue, removedAutomationEvent);
            const truncatedAutomationEvent = isExponentialRampToValueAutomationEvent(removedAutomationEvent) ? createExtendedExponentialRampToValueAutomationEvent(value, eventTime, this._currenTime) : createExtendedLinearRampToValueAutomationEvent(value, eventTime, this._currenTime);
            this._automationEvents.push(truncatedAutomationEvent);
          }
          if (void 0 !== lastAutomationEvent && isSetTargetAutomationEvent(lastAutomationEvent) && this._automationEvents.push(createSetValueAutomationEvent(this.getValue(eventTime), eventTime)), 
          void 0 !== lastAutomationEvent && isSetValueCurveAutomationEvent(lastAutomationEvent) && lastAutomationEvent.startTime + lastAutomationEvent.duration > eventTime) {
            const duration = eventTime - lastAutomationEvent.startTime;
            const ratio = (lastAutomationEvent.values.length - 1) / lastAutomationEvent.duration;
            const length = Math.max(2, 1 + Math.ceil(duration * ratio));
            const fraction = duration / (length - 1) * ratio;
            const values = lastAutomationEvent.values.slice(0, length);
            if (fraction < 1) for (let i = 1; i < length; i += 1) {
              const factor = fraction * i % 1;
              values[i] = lastAutomationEvent.values[i - 1] * (1 - factor) + lastAutomationEvent.values[i] * factor;
            }
            this._automationEvents[this._automationEvents.length - 1] = createSetValueCurveAutomationEvent(values, lastAutomationEvent.startTime, duration);
          }
        }
      } else {
        const index = this._automationEvents.findIndex((currentAutomationEvent => getEventTime(currentAutomationEvent) > eventTime));
        const previousAutomationEvent = -1 === index ? this._automationEvents[this._automationEvents.length - 1] : this._automationEvents[index - 1];
        if (void 0 !== previousAutomationEvent && isSetValueCurveAutomationEvent(previousAutomationEvent) && getEventTime(previousAutomationEvent) + previousAutomationEvent.duration > eventTime) return !1;
        const persistentAutomationEvent = isExponentialRampToValueAutomationEvent(automationEvent) ? createExtendedExponentialRampToValueAutomationEvent(automationEvent.value, automationEvent.endTime, this._currenTime) : isLinearRampToValueAutomationEvent(automationEvent) ? createExtendedLinearRampToValueAutomationEvent(automationEvent.value, eventTime, this._currenTime) : automationEvent;
        if (-1 === index) this._automationEvents.push(persistentAutomationEvent); else {
          if (isSetValueCurveAutomationEvent(automationEvent) && eventTime + automationEvent.duration > getEventTime(this._automationEvents[index])) return !1;
          this._automationEvents.splice(index, 0, persistentAutomationEvent);
        }
      }
      return !0;
    }
    flush(time) {
      const index = this._automationEvents.findIndex((currentAutomationEvent => getEventTime(currentAutomationEvent) > time));
      if (index > 1) {
        const remainingAutomationEvents = this._automationEvents.slice(index - 1);
        const firstRemainingAutomationEvent = remainingAutomationEvents[0];
        isSetTargetAutomationEvent(firstRemainingAutomationEvent) && remainingAutomationEvents.unshift(createSetValueAutomationEvent(getValueOfAutomationEventAtIndexAtTime(this._automationEvents, index - 2, firstRemainingAutomationEvent.startTime, this._defaultValue), firstRemainingAutomationEvent.startTime)), 
        this._automationEvents = remainingAutomationEvents;
      }
    }
    getValue(time) {
      if (0 === this._automationEvents.length) return this._defaultValue;
      const indexOfNextEvent = this._automationEvents.findIndex((automationEvent => getEventTime(automationEvent) > time));
      const nextAutomationEvent = this._automationEvents[indexOfNextEvent];
      const indexOfCurrentEvent = (-1 === indexOfNextEvent ? this._automationEvents.length : indexOfNextEvent) - 1;
      const currentAutomationEvent = this._automationEvents[indexOfCurrentEvent];
      if (void 0 !== currentAutomationEvent && isSetTargetAutomationEvent(currentAutomationEvent) && (void 0 === nextAutomationEvent || !isAnyRampToValueAutomationEvent(nextAutomationEvent) || nextAutomationEvent.insertTime > time)) return getTargetValueAtTime(time, getValueOfAutomationEventAtIndexAtTime(this._automationEvents, indexOfCurrentEvent - 1, currentAutomationEvent.startTime, this._defaultValue), currentAutomationEvent);
      if (void 0 !== currentAutomationEvent && isSetValueAutomationEvent(currentAutomationEvent) && (void 0 === nextAutomationEvent || !isAnyRampToValueAutomationEvent(nextAutomationEvent))) return currentAutomationEvent.value;
      if (void 0 !== currentAutomationEvent && isSetValueCurveAutomationEvent(currentAutomationEvent) && (void 0 === nextAutomationEvent || !isAnyRampToValueAutomationEvent(nextAutomationEvent) || currentAutomationEvent.startTime + currentAutomationEvent.duration > time)) return time < currentAutomationEvent.startTime + currentAutomationEvent.duration ? getValueCurveValueAtTime(time, currentAutomationEvent) : currentAutomationEvent.values[currentAutomationEvent.values.length - 1];
      if (void 0 !== currentAutomationEvent && isAnyRampToValueAutomationEvent(currentAutomationEvent) && (void 0 === nextAutomationEvent || !isAnyRampToValueAutomationEvent(nextAutomationEvent))) return currentAutomationEvent.value;
      if (void 0 !== nextAutomationEvent && isExponentialRampToValueAutomationEvent(nextAutomationEvent)) {
        const [startTime, value] = getEndTimeAndValueOfPreviousAutomationEvent(this._automationEvents, indexOfCurrentEvent, currentAutomationEvent, nextAutomationEvent, this._defaultValue);
        return getExponentialRampValueAtTime(time, startTime, value, nextAutomationEvent);
      }
      if (void 0 !== nextAutomationEvent && isLinearRampToValueAutomationEvent(nextAutomationEvent)) {
        const [startTime, value] = getEndTimeAndValueOfPreviousAutomationEvent(this._automationEvents, indexOfCurrentEvent, currentAutomationEvent, nextAutomationEvent, this._defaultValue);
        return getLinearRampValueAtTime(time, startTime, value, nextAutomationEvent);
      }
      return this._defaultValue;
    }
  }
  const ACTIVE_AUDIO_NODE_STORE = new WeakSet;
  const AUDIO_NODE_CONNECTIONS_STORE = new WeakMap;
  const AUDIO_NODE_STORE = new WeakMap;
  const AUDIO_PARAM_CONNECTIONS_STORE = new WeakMap;
  const AUDIO_PARAM_STORE = new WeakMap;
  const CONTEXT_STORE = new WeakMap;
  const EVENT_LISTENERS = new WeakMap;
  const CYCLE_COUNTERS = new WeakMap;
  // This clunky name is borrowed from the spec. :-)
    const NODE_NAME_TO_PROCESSOR_CONSTRUCTOR_MAPS = new WeakMap;
  const NODE_TO_PROCESSOR_MAPS = new WeakMap;
  const handler = {
    construct: () => handler
  };
  /*
   * This massive regex tries to cover all the following cases.
   *
   * import './path';
   * import defaultImport from './path';
   * import { namedImport } from './path';
   * import { namedImport as renamendImport } from './path';
   * import * as namespaceImport from './path';
   * import defaultImport, { namedImport } from './path';
   * import defaultImport, { namedImport as renamendImport } from './path';
   * import defaultImport, * as namespaceImport from './path';
   */
  const IMPORT_STATEMENT_REGEX = /^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/;
 // tslint:disable-line:max-line-length
    const splitImportStatements = (source, url) => {
    const importStatements = [];
    let sourceWithoutImportStatements = source.replace(/^[\s]+/, "");
    let result = sourceWithoutImportStatements.match(IMPORT_STATEMENT_REGEX);
    for (;null !== result; ) {
      const unresolvedUrl = result[1].slice(1, -1);
      const importStatementWithResolvedUrl = result[0].replace(/([\s]+)?;?$/, "").replace(unresolvedUrl, new URL(unresolvedUrl, url).toString());
      importStatements.push(importStatementWithResolvedUrl), sourceWithoutImportStatements = sourceWithoutImportStatements.slice(result[0].length).replace(/^[\s]+/, ""), 
      result = sourceWithoutImportStatements.match(IMPORT_STATEMENT_REGEX);
    }
    return [ importStatements.join(";"), sourceWithoutImportStatements ];
  };
  const verifyParameterDescriptors = parameterDescriptors => {
    if (void 0 !== parameterDescriptors && !Array.isArray(parameterDescriptors)) throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.");
  };
  const verifyProcessorCtor = processorCtor => {
    if (!(constructible => {
      try {
        new new Proxy(constructible, handler);
      } catch {
        return !1;
      }
      return !0;
    })(processorCtor)) throw new TypeError("The given value for processorCtor should be a constructor.");
    if (null === processorCtor.prototype || "object" != typeof processorCtor.prototype) throw new TypeError("The given value for processorCtor should have a prototype.");
  };
  const getValueForKey = (map, key) => {
    const value = map.get(key);
    if (void 0 === value) throw new Error("A value with the given key could not be found.");
    return value;
  };
  const pickElementFromSet = (set, predicate) => {
    const matchingElements = Array.from(set).filter(predicate);
    if (matchingElements.length > 1) throw Error("More than one element was found.");
    if (0 === matchingElements.length) throw Error("No element was found.");
    const [matchingElement] = matchingElements;
    return set.delete(matchingElement), matchingElement;
  };
  const deletePassiveInputConnectionToAudioNode = (passiveInputs, source, output, input) => {
    const passiveInputConnections = getValueForKey(passiveInputs, source);
    const matchingConnection = pickElementFromSet(passiveInputConnections, (passiveInputConnection => passiveInputConnection[0] === output && passiveInputConnection[1] === input));
    return 0 === passiveInputConnections.size && passiveInputs.delete(source), matchingConnection;
  };
  const getEventListenersOfAudioNode = audioNode => getValueForKey(EVENT_LISTENERS, audioNode);
  const setInternalStateToActive = audioNode => {
    if (ACTIVE_AUDIO_NODE_STORE.has(audioNode)) throw new Error("The AudioNode is already stored.");
    ACTIVE_AUDIO_NODE_STORE.add(audioNode), getEventListenersOfAudioNode(audioNode).forEach((eventListener => eventListener(!0)));
  };
  const isAudioWorkletNode = audioNode => "port" in audioNode;
  const setInternalStateToPassive = audioNode => {
    if (!ACTIVE_AUDIO_NODE_STORE.has(audioNode)) throw new Error("The AudioNode is not stored.");
    ACTIVE_AUDIO_NODE_STORE.delete(audioNode), getEventListenersOfAudioNode(audioNode).forEach((eventListener => eventListener(!1)));
  };
  // Set the internalState of the audioNode to 'passive' if it is not an AudioWorkletNode and if it has no 'active' input connections.
    const setInternalStateToPassiveWhenNecessary = (audioNode, activeInputs) => {
    !isAudioWorkletNode(audioNode) && activeInputs.every((connections => 0 === connections.size)) && setInternalStateToPassive(audioNode);
  };
  const DEFAULT_OPTIONS$j = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    fftSize: 2048,
    maxDecibels: -30,
    minDecibels: -100,
    smoothingTimeConstant: .8
  };
  const isOwnedByContext = (nativeAudioNode, nativeContext) => nativeAudioNode.context === nativeContext;
  const testAudioBufferCopyChannelMethodsOutOfBoundsSupport = nativeAudioBuffer => {
    try {
      nativeAudioBuffer.copyToChannel(new Float32Array(1), 0, -1);
    } catch {
      return !1;
    }
    return !0;
  };
  const createIndexSizeError = () => new DOMException("", "IndexSizeError");
  const wrapAudioBufferGetChannelDataMethod = audioBuffer => {
    var getChannelData;
    audioBuffer.getChannelData = (getChannelData = audioBuffer.getChannelData, channel => {
      try {
        return getChannelData.call(audioBuffer, channel);
      } catch (err) {
        if (12 === err.code) throw createIndexSizeError();
        throw err;
      }
    });
  };
  const DEFAULT_OPTIONS$i = {
    numberOfChannels: 1
  };
  const MOST_NEGATIVE_SINGLE_FLOAT = -34028234663852886e22;
  const MOST_POSITIVE_SINGLE_FLOAT = -MOST_NEGATIVE_SINGLE_FLOAT;
  const isActiveAudioNode = audioNode => ACTIVE_AUDIO_NODE_STORE.has(audioNode);
  const DEFAULT_OPTIONS$h = {
    buffer: null,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    // Bug #149: Safari does not yet support the detune AudioParam.
    loop: !1,
    loopEnd: 0,
    loopStart: 0,
    playbackRate: 1
  };
  const getAudioNodeConnections = audioNode => getValueForKey(AUDIO_NODE_CONNECTIONS_STORE, audioNode);
  const getAudioParamConnections = audioParam => getValueForKey(AUDIO_PARAM_CONNECTIONS_STORE, audioParam);
  const deactivateActiveAudioNodeInputConnections = (audioNode, trace) => {
    const {activeInputs: activeInputs} = getAudioNodeConnections(audioNode);
    activeInputs.forEach((connections => connections.forEach((([source]) => {
      trace.includes(audioNode) || deactivateActiveAudioNodeInputConnections(source, [ ...trace, audioNode ]);
    }))));
    const audioParams = (audioNode => "playbackRate" in audioNode)(audioNode) ? [ 
    // Bug #149: Safari does not yet support the detune AudioParam.
    audioNode.playbackRate ] : isAudioWorkletNode(audioNode) ? Array.from(audioNode.parameters.values()) : (audioNode => "frequency" in audioNode && "gain" in audioNode)(audioNode) ? [ audioNode.Q, audioNode.detune, audioNode.frequency, audioNode.gain ] : (audioNode => "offset" in audioNode)(audioNode) ? [ audioNode.offset ] : (audioNode => !("frequency" in audioNode) && "gain" in audioNode)(audioNode) ? [ audioNode.gain ] : (audioNode => "detune" in audioNode && "frequency" in audioNode && !("gain" in audioNode))(audioNode) ? [ audioNode.detune, audioNode.frequency ] : (audioNode => "pan" in audioNode)(audioNode) ? [ audioNode.pan ] : [];
    for (const audioParam of audioParams) {
      const audioParamConnections = getAudioParamConnections(audioParam);
      void 0 !== audioParamConnections && audioParamConnections.activeInputs.forEach((([source]) => deactivateActiveAudioNodeInputConnections(source, trace)));
    }
    isActiveAudioNode(audioNode) && setInternalStateToPassive(audioNode);
  };
  const deactivateAudioGraph = context => {
    deactivateActiveAudioNodeInputConnections(context.destination, []);
  };
  const isAudioNode$1 = audioNodeOrAudioParam => "context" in audioNodeOrAudioParam;
  const isAudioNodeOutputConnection = outputConnection => isAudioNode$1(outputConnection[0]);
  const insertElementInSet = (set, element, predicate, ignoreDuplicates) => {
    for (const lmnt of set) if (predicate(lmnt)) {
      if (ignoreDuplicates) return !1;
      throw Error("The set contains at least one similar element.");
    }
    return set.add(element), !0;
  };
  const addActiveInputConnectionToAudioParam = (activeInputs, source, [output, eventListener], ignoreDuplicates) => {
    insertElementInSet(activeInputs, [ source, output, eventListener ], (activeInputConnection => activeInputConnection[0] === source && activeInputConnection[1] === output), ignoreDuplicates);
  };
  const addPassiveInputConnectionToAudioParam = (passiveInputs, [source, output, eventListener], ignoreDuplicates) => {
    const passiveInputConnections = passiveInputs.get(source);
    void 0 === passiveInputConnections ? passiveInputs.set(source, new Set([ [ output, eventListener ] ])) : insertElementInSet(passiveInputConnections, [ output, eventListener ], (passiveInputConnection => passiveInputConnection[0] === output), ignoreDuplicates);
  };
  const isNativeAudioNodeFaker = nativeAudioNodeOrNativeAudioNodeFaker => "inputs" in nativeAudioNodeOrNativeAudioNodeFaker;
  const connectNativeAudioNodeToNativeAudioNode = (nativeSourceAudioNode, nativeDestinationAudioNode, output, input) => {
    if (isNativeAudioNodeFaker(nativeDestinationAudioNode)) {
      const fakeNativeDestinationAudioNode = nativeDestinationAudioNode.inputs[input];
      return nativeSourceAudioNode.connect(fakeNativeDestinationAudioNode, output, 0), 
      [ fakeNativeDestinationAudioNode, output, 0 ];
    }
    return nativeSourceAudioNode.connect(nativeDestinationAudioNode, output, input), 
    [ nativeDestinationAudioNode, output, input ];
  };
  const deleteActiveInputConnection = (activeInputConnections, source, output) => {
    for (const activeInputConnection of activeInputConnections) if (activeInputConnection[0] === source && activeInputConnection[1] === output) return activeInputConnections.delete(activeInputConnection), 
    activeInputConnection;
    return null;
  };
  const deleteEventListenerOfAudioNode = (audioNode, eventListener) => {
    if (!getEventListenersOfAudioNode(audioNode).delete(eventListener)) throw new Error("Missing the expected event listener.");
  };
  const deletePassiveInputConnectionToAudioParam = (passiveInputs, source, output) => {
    const passiveInputConnections = getValueForKey(passiveInputs, source);
    const matchingConnection = pickElementFromSet(passiveInputConnections, (passiveInputConnection => passiveInputConnection[0] === output));
    return 0 === passiveInputConnections.size && passiveInputs.delete(source), matchingConnection;
  };
  const disconnectNativeAudioNodeFromNativeAudioNode = (nativeSourceAudioNode, nativeDestinationAudioNode, output, input) => {
    isNativeAudioNodeFaker(nativeDestinationAudioNode) ? nativeSourceAudioNode.disconnect(nativeDestinationAudioNode.inputs[input], output, 0) : nativeSourceAudioNode.disconnect(nativeDestinationAudioNode, output, input);
  };
  const getNativeAudioNode = audioNode => getValueForKey(AUDIO_NODE_STORE, audioNode);
  const getNativeAudioParam = audioParam => getValueForKey(AUDIO_PARAM_STORE, audioParam);
  const isPartOfACycle = audioNode => CYCLE_COUNTERS.has(audioNode);
  const isPassiveAudioNode = audioNode => !ACTIVE_AUDIO_NODE_STORE.has(audioNode);
  const testAudioNodeDisconnectMethodSupport = (nativeAudioContext, nativeAudioWorkletNodeConstructor) => new Promise((resolve => {
    /*
           * This bug existed in Safari up until v14.0.2. Since AudioWorklets were not supported in Safari until v14.1 the presence of the
           * constructor for an AudioWorkletNode can be used here to skip the test.
           */
    if (null !== nativeAudioWorkletNodeConstructor) resolve(!0); else {
      const analyzer = nativeAudioContext.createScriptProcessor(256, 1, 1);
 // tslint:disable-line deprecation
            const dummy = nativeAudioContext.createGain();
      // Bug #95: Safari does not play one sample buffers.
            const ones = nativeAudioContext.createBuffer(1, 2, 44100);
      const channelData = ones.getChannelData(0);
      channelData[0] = 1, channelData[1] = 1;
      const source = nativeAudioContext.createBufferSource();
      source.buffer = ones, source.loop = !0, source.connect(analyzer).connect(nativeAudioContext.destination), 
      source.connect(dummy), source.disconnect(dummy), 
      // tslint:disable-next-line:deprecation
      analyzer.onaudioprocess = event => {
        const chnnlDt = event.inputBuffer.getChannelData(0);
 // tslint:disable-line deprecation
                Array.prototype.some.call(chnnlDt, (sample => 1 === sample)) ? resolve(!0) : resolve(!1), 
        source.stop(), analyzer.onaudioprocess = null, // tslint:disable-line:deprecation
        source.disconnect(analyzer), analyzer.disconnect(nativeAudioContext.destination);
      }, source.start();
    }
  }));
  const visitEachAudioNodeOnce = (cycles, visitor) => {
    const counts = new Map;
    for (const cycle of cycles) for (const audioNode of cycle) {
      const count = counts.get(audioNode);
      counts.set(audioNode, void 0 === count ? 1 : count + 1);
    }
    counts.forEach(((count, audioNode) => visitor(audioNode, count)));
  };
  const isNativeAudioNode$1 = nativeAudioNodeOrAudioParam => "context" in nativeAudioNodeOrAudioParam;
  const addConnectionToAudioParamOfAudioContext = (source, destination, output, isOffline) => {
    const {activeInputs: activeInputs, passiveInputs: passiveInputs} = getAudioParamConnections(destination);
    const {outputs: outputs} = getAudioNodeConnections(source);
    const eventListeners = getEventListenersOfAudioNode(source);
    const eventListener = isActive => {
      const nativeAudioNode = getNativeAudioNode(source);
      const nativeAudioParam = getNativeAudioParam(destination);
      if (isActive) {
        const partialConnection = deletePassiveInputConnectionToAudioParam(passiveInputs, source, output);
        addActiveInputConnectionToAudioParam(activeInputs, source, partialConnection, !1), 
        isOffline || isPartOfACycle(source) || nativeAudioNode.connect(nativeAudioParam, output);
      } else {
        const partialConnection = ((activeInputs, source, output) => pickElementFromSet(activeInputs, (activeInputConnection => activeInputConnection[0] === source && activeInputConnection[1] === output)))(activeInputs, source, output);
        addPassiveInputConnectionToAudioParam(passiveInputs, partialConnection, !1), isOffline || isPartOfACycle(source) || nativeAudioNode.disconnect(nativeAudioParam, output);
      }
    };
    return !!insertElementInSet(outputs, [ destination, output ], (outputConnection => outputConnection[0] === destination && outputConnection[1] === output), !0) && (eventListeners.add(eventListener), 
    isActiveAudioNode(source) ? addActiveInputConnectionToAudioParam(activeInputs, source, [ output, eventListener ], !0) : addPassiveInputConnectionToAudioParam(passiveInputs, [ source, output, eventListener ], !0), 
    !0);
  };
  const deleteInputsOfAudioNode = (source, isOffline, destination, output, input) => {
    const [listener, isActive] = ((source, destination, output, input) => {
      const {activeInputs: activeInputs, passiveInputs: passiveInputs} = getAudioNodeConnections(destination);
      const activeInputConnection = deleteActiveInputConnection(activeInputs[input], source, output);
      if (null === activeInputConnection) return [ deletePassiveInputConnectionToAudioNode(passiveInputs, source, output, input)[2], !1 ];
      return [ activeInputConnection[2], !0 ];
    })(source, destination, output, input);
    if (null !== listener && (deleteEventListenerOfAudioNode(source, listener), !isActive || isOffline || isPartOfACycle(source) || disconnectNativeAudioNodeFromNativeAudioNode(getNativeAudioNode(source), getNativeAudioNode(destination), output, input)), 
    isActiveAudioNode(destination)) {
      const {activeInputs: activeInputs} = getAudioNodeConnections(destination);
      setInternalStateToPassiveWhenNecessary(destination, activeInputs);
    }
  };
  const deleteInputsOfAudioParam = (source, isOffline, destination, output) => {
    const [listener, isActive] = ((source, destination, output) => {
      const {activeInputs: activeInputs, passiveInputs: passiveInputs} = getAudioParamConnections(destination);
      const activeInputConnection = deleteActiveInputConnection(activeInputs, source, output);
      if (null === activeInputConnection) return [ deletePassiveInputConnectionToAudioParam(passiveInputs, source, output)[1], !1 ];
      return [ activeInputConnection[2], !0 ];
    })(source, destination, output);
    null !== listener && (deleteEventListenerOfAudioNode(source, listener), !isActive || isOffline || isPartOfACycle(source) || getNativeAudioNode(source).disconnect(getNativeAudioParam(destination), output));
  };
  class ReadOnlyMap {
    constructor(parameters) {
      this._map = new Map(parameters);
    }
    get size() {
      return this._map.size;
    }
    entries() {
      return this._map.entries();
    }
    forEach(callback, thisArg = null) {
      return this._map.forEach(((value, key) => callback.call(thisArg, value, key, this)));
    }
    get(name) {
      return this._map.get(name);
    }
    has(name) {
      return this._map.has(name);
    }
    keys() {
      return this._map.keys();
    }
    values() {
      return this._map.values();
    }
  }
  const DEFAULT_OPTIONS$g = {
    channelCount: 2,
    // Bug #61: The channelCountMode should be 'max' according to the spec but is set to 'explicit' to achieve consistent behavior.
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    parameterData: {},
    processorOptions: {}
  };
  const copyToChannel = (audioBuffer, parent, key, channelNumber, bufferOffset) => {
    "function" == typeof audioBuffer.copyToChannel ? 
    // The byteLength will be 0 when the ArrayBuffer was transferred.
    0 !== parent[key].byteLength && audioBuffer.copyToChannel(parent[key], channelNumber, bufferOffset) : 
    // The byteLength will be 0 when the ArrayBuffer was transferred.
    0 !== parent[key].byteLength && audioBuffer.getChannelData(channelNumber).set(parent[key], bufferOffset);
  };
  const createNestedArrays = (x, y) => {
    const arrays = [];
    for (let i = 0; i < x; i += 1) {
      const array = [];
      const length = "number" == typeof y ? y : y[i];
      for (let j = 0; j < length; j += 1) array.push(new Float32Array(128));
      arrays.push(array);
    }
    return arrays;
  };
  const processBuffer = async (proxy, renderedBuffer, nativeOfflineAudioContext, options, outputChannelCount, processorConstructor, exposeCurrentFrameAndCurrentTime) => {
    // Ceil the length to the next full render quantum.
    // Bug #17: Safari does not yet expose the length.
    const length = null === renderedBuffer ? 128 * Math.ceil(proxy.context.length / 128) : renderedBuffer.length;
    const numberOfInputChannels = options.channelCount * options.numberOfInputs;
    const numberOfOutputChannels = outputChannelCount.reduce(((sum, value) => sum + value), 0);
    const processedBuffer = 0 === numberOfOutputChannels ? null : nativeOfflineAudioContext.createBuffer(numberOfOutputChannels, length, nativeOfflineAudioContext.sampleRate);
    if (void 0 === processorConstructor) throw new Error("Missing the processor constructor.");
    const audioNodeConnections = getAudioNodeConnections(proxy);
    const audioWorkletProcessor = await ((nativeOfflineAudioContext, proxy) => {
      const nodeToProcessorMap = getValueForKey(NODE_TO_PROCESSOR_MAPS, nativeOfflineAudioContext);
      const nativeAudioWorkletNode = getNativeAudioNode(proxy);
      return getValueForKey(nodeToProcessorMap, nativeAudioWorkletNode);
    })(nativeOfflineAudioContext, proxy);
    const inputs = createNestedArrays(options.numberOfInputs, options.channelCount);
    const outputs = createNestedArrays(options.numberOfOutputs, outputChannelCount);
    const parameters = Array.from(proxy.parameters.keys()).reduce(((prmtrs, name) => ({
      ...prmtrs,
      [name]: new Float32Array(128)
    })), {});
    for (let i = 0; i < length; i += 128) {
      if (options.numberOfInputs > 0 && null !== renderedBuffer) for (let j = 0; j < options.numberOfInputs; j += 1) for (let k = 0; k < options.channelCount; k += 1) copyFromChannel(renderedBuffer, inputs[j], k, k, i);
      void 0 !== processorConstructor.parameterDescriptors && null !== renderedBuffer && processorConstructor.parameterDescriptors.forEach((({name: name}, index) => {
        copyFromChannel(renderedBuffer, parameters, name, numberOfInputChannels + index, i);
      }));
      for (let j = 0; j < options.numberOfInputs; j += 1) for (let k = 0; k < outputChannelCount[j]; k += 1) 
      // The byteLength will be 0 when the ArrayBuffer was transferred.
      0 === outputs[j][k].byteLength && (outputs[j][k] = new Float32Array(128));
      try {
        const potentiallyEmptyInputs = inputs.map(((input, index) => 0 === audioNodeConnections.activeInputs[index].size ? [] : input));
        const activeSourceFlag = exposeCurrentFrameAndCurrentTime(i / nativeOfflineAudioContext.sampleRate, nativeOfflineAudioContext.sampleRate, (() => audioWorkletProcessor.process(potentiallyEmptyInputs, outputs, parameters)));
        if (null !== processedBuffer) for (let j = 0, outputChannelSplitterNodeOutput = 0; j < options.numberOfOutputs; j += 1) {
          for (let k = 0; k < outputChannelCount[j]; k += 1) copyToChannel(processedBuffer, outputs[j], k, outputChannelSplitterNodeOutput + k, i);
          outputChannelSplitterNodeOutput += outputChannelCount[j];
        }
        if (!activeSourceFlag) break;
      } catch (error) {
        proxy.dispatchEvent(new ErrorEvent("processorerror", {
          colno: error.colno,
          filename: error.filename,
          lineno: error.lineno,
          message: error.message
        }));
        break;
      }
    }
    return processedBuffer;
  };
  const DEFAULT_OPTIONS$f = {
    Q: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    detune: 0,
    frequency: 350,
    gain: 0,
    type: "lowpass"
  };
  const DEFAULT_OPTIONS$e = {
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
    numberOfInputs: 6
  };
  const DEFAULT_OPTIONS$d = {
    channelCount: 6,
    channelCountMode: "explicit",
    channelInterpretation: "discrete",
    numberOfOutputs: 6
  };
  const DEFAULT_OPTIONS$c = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    offset: 1
  };
  const DEFAULT_OPTIONS$b = {
    buffer: null,
    channelCount: 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers",
    disableNormalization: !1
  };
  const detachArrayBuffer = arrayBuffer => {
    const {port1: port1, port2: port2} = new MessageChannel;
    return new Promise((resolve => {
      const closeAndResolve = () => {
        port2.onmessage = null, port1.close(), port2.close(), resolve();
      };
      port2.onmessage = () => closeAndResolve();
      try {
        port1.postMessage(arrayBuffer, [ arrayBuffer ]);
      } catch {
        // Ignore errors.
      } finally {
        closeAndResolve();
      }
    }));
  };
  const DEFAULT_OPTIONS$a = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    delayTime: 0,
    maxDelayTime: 1
  };
  const getOutputAudioNodeAtIndex = (createIndexSizeError, outputAudioNodes, output) => {
    const outputAudioNode = outputAudioNodes[output];
    if (void 0 === outputAudioNode) throw createIndexSizeError();
    return outputAudioNode;
  };
  const DEFAULT_OPTIONS$9 = {
    attack: .003,
    channelCount: 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers",
    knee: 30,
    ratio: 12,
    release: .25,
    threshold: -24
  };
  const DEFAULT_OPTIONS$8 = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    gain: 1
  };
  const createInvalidStateError = () => new DOMException("", "InvalidStateError");
  const createInvalidAccessError = () => new DOMException("", "InvalidAccessError");
  const DEFAULT_OPTIONS$7 = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  };
  // This implementation as shamelessly inspired by source code of
  // tslint:disable-next-line:max-line-length
  // {@link https://chromium.googlesource.com/chromium/src.git/+/master/third_party/WebKit/Source/platform/audio/IIRFilter.cpp|Chromium's IIRFilter}.
  const filterBuffer = (feedback, feedbackLength, feedforward, feedforwardLength, minLength, xBuffer, yBuffer, bufferIndex, bufferLength, input, output) => {
    const inputLength = input.length;
    let i = bufferIndex;
    for (let j = 0; j < inputLength; j += 1) {
      let y = feedforward[0] * input[j];
      for (let k = 1; k < minLength; k += 1) {
        const x = i - k & bufferLength - 1;
 // tslint:disable-line:no-bitwise
                y += feedforward[k] * xBuffer[x], y -= feedback[k] * yBuffer[x];
      }
      for (let k = minLength; k < feedforwardLength; k += 1) y += feedforward[k] * xBuffer[i - k & bufferLength - 1];
 // tslint:disable-line:no-bitwise
            for (let k = minLength; k < feedbackLength; k += 1) y -= feedback[k] * yBuffer[i - k & bufferLength - 1];
 // tslint:disable-line:no-bitwise
            xBuffer[i] = input[j], yBuffer[i] = y, i = i + 1 & bufferLength - 1, // tslint:disable-line:no-bitwise
      output[j] = y;
    }
    return i;
  };
  const DEFAULT_OPTIONS$6 = {
    channelCount: 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  };
  const testPromiseSupport = nativeContext => {
    // This 12 numbers represent the 48 bytes of an empty WAVE file with a single sample.
    const uint32Array = new Uint32Array([ 1179011410, 40, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 4, 0 ]);
    try {
      // Bug #1: Safari requires a successCallback.
      const promise = nativeContext.decodeAudioData(uint32Array.buffer, (() => {}));
      return void 0 !== promise && (promise.catch((() => {})), !0);
    } catch {
      // Ignore errors.
    }
    return !1;
  };
  const assignNativeAudioNodeOption = (nativeAudioNode, options, option) => {
    const value = options[option];
    void 0 !== value && value !== nativeAudioNode[option] && (nativeAudioNode[option] = value);
  };
  const assignNativeAudioNodeOptions = (nativeAudioNode, options) => {
    assignNativeAudioNodeOption(nativeAudioNode, options, "channelCount"), assignNativeAudioNodeOption(nativeAudioNode, options, "channelCountMode"), 
    assignNativeAudioNodeOption(nativeAudioNode, options, "channelInterpretation");
  };
  const testAnalyserNodeGetFloatTimeDomainDataMethodSupport = nativeAnalyserNode => "function" == typeof nativeAnalyserNode.getFloatTimeDomainData;
  const assignNativeAudioNodeAudioParamValue = (nativeAudioNode, options, audioParam) => {
    const value = options[audioParam];
    void 0 !== value && value !== nativeAudioNode[audioParam].value && (nativeAudioNode[audioParam].value = value);
  };
  const wrapAudioScheduledSourceNodeStartMethodNegativeParameters = nativeAudioScheduledSourceNode => {
    var start;
    nativeAudioScheduledSourceNode.start = (start = nativeAudioScheduledSourceNode.start, 
    (when = 0, offset = 0, duration) => {
      if ("number" == typeof duration && duration < 0 || offset < 0 || when < 0) throw new RangeError("The parameters can't be negative.");
      // @todo TypeScript cannot infer the overloaded signature with 3 arguments yet.
            start.call(nativeAudioScheduledSourceNode, when, offset, duration);
    });
  };
  const wrapAudioScheduledSourceNodeStopMethodNegativeParameters = nativeAudioScheduledSourceNode => {
    var stop;
    nativeAudioScheduledSourceNode.stop = (stop = nativeAudioScheduledSourceNode.stop, 
    (when = 0) => {
      if (when < 0) throw new RangeError("The parameter can't be negative.");
      stop.call(nativeAudioScheduledSourceNode, when);
    });
  };
  const computeBufferSize = (baseLatency, sampleRate) => null === baseLatency ? 512 : Math.max(512, Math.min(16384, Math.pow(2, Math.round(Math.log2(baseLatency * sampleRate)))));
  const createAudioWorkletProcessorPromise = async (processorConstructor, audioWorkletNodeOptions) => {
    const clonedAudioWorkletNodeOptions = await (audioWorkletNodeOptions => new Promise(((resolve, reject) => {
      const {port1: port1, port2: port2} = new MessageChannel;
      port1.onmessage = ({data: data}) => {
        port1.close(), port2.close(), resolve(data);
      }, port1.onmessageerror = ({data: data}) => {
        port1.close(), port2.close(), reject(data);
      }, 
      // This will throw an error if the audioWorkletNodeOptions are not clonable.
      port2.postMessage(audioWorkletNodeOptions);
    })))(audioWorkletNodeOptions);
    return new processorConstructor(clonedAudioWorkletNodeOptions);
  };
  const createNativeBiquadFilterNode = (nativeContext, options) => {
    const nativeBiquadFilterNode = nativeContext.createBiquadFilter();
    return assignNativeAudioNodeOptions(nativeBiquadFilterNode, options), assignNativeAudioNodeAudioParamValue(nativeBiquadFilterNode, options, "Q"), 
    assignNativeAudioNodeAudioParamValue(nativeBiquadFilterNode, options, "detune"), 
    assignNativeAudioNodeAudioParamValue(nativeBiquadFilterNode, options, "frequency"), 
    assignNativeAudioNodeAudioParamValue(nativeBiquadFilterNode, options, "gain"), assignNativeAudioNodeOption(nativeBiquadFilterNode, options, "type"), 
    nativeBiquadFilterNode;
  };
  const createNativeChannelSplitterNode = (nativeContext, options) => {
    const nativeChannelSplitterNode = nativeContext.createChannelSplitter(options.numberOfOutputs);
    // Bug #96: Safari does not have the correct channelCount.
    // Bug #29: Safari does not have the correct channelCountMode.
    // Bug #31: Safari does not have the correct channelInterpretation.
        return assignNativeAudioNodeOptions(nativeChannelSplitterNode, options), 
    // Bug #29, #30, #31, #32, #96 & #97: Only Chrome, Edge & Firefox partially support the spec yet.
    (channelSplitterNode => {
      const channelCount = channelSplitterNode.numberOfOutputs;
      // Bug #97: Safari does not throw an error when attempting to change the channelCount to something other than its initial value.
            Object.defineProperty(channelSplitterNode, "channelCount", {
        get: () => channelCount,
        set: value => {
          if (value !== channelCount) throw createInvalidStateError();
        }
      }), 
      // Bug #30: Safari does not throw an error when attempting to change the channelCountMode to something other than explicit.
      Object.defineProperty(channelSplitterNode, "channelCountMode", {
        get: () => "explicit",
        set: value => {
          if ("explicit" !== value) throw createInvalidStateError();
        }
      }), 
      // Bug #32: Safari does not throw an error when attempting to change the channelInterpretation to something other than discrete.
      Object.defineProperty(channelSplitterNode, "channelInterpretation", {
        get: () => "discrete",
        set: value => {
          if ("discrete" !== value) throw createInvalidStateError();
        }
      });
    })(nativeChannelSplitterNode), nativeChannelSplitterNode;
  };
  const interceptConnections = (original, interceptor) => (original.connect = interceptor.connect.bind(interceptor), 
  original.disconnect = interceptor.disconnect.bind(interceptor), original);
  const createNativeDelayNode = (nativeContext, options) => {
    const nativeDelayNode = nativeContext.createDelay(options.maxDelayTime);
    return assignNativeAudioNodeOptions(nativeDelayNode, options), assignNativeAudioNodeAudioParamValue(nativeDelayNode, options, "delayTime"), 
    nativeDelayNode;
  };
  const createNativeGainNode = (nativeContext, options) => {
    const nativeGainNode = nativeContext.createGain();
    return assignNativeAudioNodeOptions(nativeGainNode, options), assignNativeAudioNodeAudioParamValue(nativeGainNode, options, "gain"), 
    nativeGainNode;
  };
  const createNativeScriptProcessorNode = (nativeContext, bufferSize, numberOfInputChannels, numberOfOutputChannels) => nativeContext.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels) // tslint:disable-line deprecation
  ;
  const createNotSupportedError = () => new DOMException("", "NotSupportedError");
  const DEFAULT_OPTIONS$5 = {
    numberOfChannels: 1
  };
  const DEFAULT_OPTIONS$4 = {
    channelCount: 2,
    channelCountMode: "max",
    // This attribute has no effect for nodes with no inputs.
    channelInterpretation: "speakers",
    // This attribute has no effect for nodes with no inputs.
    detune: 0,
    frequency: 440,
    periodicWave: void 0,
    type: "sine"
  };
  const DEFAULT_OPTIONS$3 = {
    channelCount: 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers",
    coneInnerAngle: 360,
    coneOuterAngle: 360,
    coneOuterGain: 0,
    distanceModel: "inverse",
    maxDistance: 1e4,
    orientationX: 1,
    orientationY: 0,
    orientationZ: 0,
    panningModel: "equalpower",
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    refDistance: 1,
    rolloffFactor: 1
  };
  const DEFAULT_OPTIONS$2 = {
    disableNormalization: !1
  };
  const DEFAULT_OPTIONS$1 = {
    channelCount: 2,
    /*
       * Bug #105: The channelCountMode should be 'clamped-max' according to the spec but is set to 'explicit' to achieve consistent
       * behavior.
       */
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
    pan: 0
  };
  const DEFAULT_OPTIONS = {
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers",
    curve: null,
    oversample: "none"
  };
  const getFirstSample = (audioBuffer, buffer, channelNumber) => 
  // Bug #5: Safari does not support copyFromChannel() and copyToChannel().
  void 0 === audioBuffer.copyFromChannel ? audioBuffer.getChannelData(channelNumber)[0] : (audioBuffer.copyFromChannel(buffer, channelNumber), 
  buffer[0]);
  const isDCCurve = curve => {
    if (null === curve) return !1;
    const length = curve.length;
    return length % 2 != 0 ? 0 !== curve[Math.floor(length / 2)] : curve[length / 2 - 1] + curve[length / 2] !== 0;
  };
  const overwriteAccessors = (object, property, createGetter, createSetter) => {
    let prototype = object;
    for (;!prototype.hasOwnProperty(property); ) prototype = Object.getPrototypeOf(prototype);
    const {get: get, set: set} = Object.getOwnPropertyDescriptor(prototype, property);
    Object.defineProperty(object, property, {
      get: createGetter(get),
      set: createSetter(set)
    });
  };
  const setValueAtTimeUntilPossible = (audioParam, value, startTime) => {
    try {
      audioParam.setValueAtTime(value, startTime);
    } catch (err) {
      if (9 !== err.code) throw err;
      setValueAtTimeUntilPossible(audioParam, value, startTime + 1e-7);
    }
  };
  const testAudioScheduledSourceNodeStartMethodNegativeParametersSupport = nativeContext => {
    const nativeAudioBufferSourceNode = nativeContext.createOscillator();
    try {
      nativeAudioBufferSourceNode.start(-1);
    } catch (err) {
      return err instanceof RangeError;
    }
    return !1;
  };
  const testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport = nativeContext => {
    const nativeAudioBuffer = nativeContext.createBuffer(1, 1, 44100);
    const nativeAudioBufferSourceNode = nativeContext.createBufferSource();
    nativeAudioBufferSourceNode.buffer = nativeAudioBuffer, nativeAudioBufferSourceNode.start(), 
    nativeAudioBufferSourceNode.stop();
    try {
      return nativeAudioBufferSourceNode.stop(), !0;
    } catch {
      return !1;
    }
  };
  const testAudioScheduledSourceNodeStopMethodNegativeParametersSupport = nativeContext => {
    const nativeAudioBufferSourceNode = nativeContext.createOscillator();
    try {
      nativeAudioBufferSourceNode.stop(-1);
    } catch (err) {
      return err instanceof RangeError;
    }
    return !1;
  };
  const wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls = (nativeAudioScheduledSourceNode, nativeContext) => {
    const nativeGainNode = nativeContext.createGain();
    nativeAudioScheduledSourceNode.connect(nativeGainNode);
    const disconnectGainNode = (disconnect => () => {
      // @todo TypeScript cannot infer the overloaded signature with 1 argument yet.
      disconnect.call(nativeAudioScheduledSourceNode, nativeGainNode), nativeAudioScheduledSourceNode.removeEventListener("ended", disconnectGainNode);
    })(nativeAudioScheduledSourceNode.disconnect);
    nativeAudioScheduledSourceNode.addEventListener("ended", disconnectGainNode), interceptConnections(nativeAudioScheduledSourceNode, nativeGainNode), 
    nativeAudioScheduledSourceNode.stop = (stop => {
      let isStopped = !1;
      return (when = 0) => {
        if (isStopped) try {
          stop.call(nativeAudioScheduledSourceNode, when);
        } catch {
          nativeGainNode.gain.setValueAtTime(0, when);
        } else stop.call(nativeAudioScheduledSourceNode, when), isStopped = !0;
      };
    })(nativeAudioScheduledSourceNode.stop);
  };
  const wrapEventListener = (target, eventListener) => event => {
    const descriptor = {
      value: target
    };
    return Object.defineProperties(event, {
      currentTarget: descriptor,
      target: descriptor
    }), "function" == typeof eventListener ? eventListener.call(target, event) : eventListener.handleEvent.call(target, event);
  };
  const addActiveInputConnectionToAudioNode = (insertElementInSet => (activeInputs, source, [output, input, eventListener], ignoreDuplicates) => {
    insertElementInSet(activeInputs[input], [ source, output, eventListener ], (activeInputConnection => activeInputConnection[0] === source && activeInputConnection[1] === output), ignoreDuplicates);
  })(insertElementInSet);
  const addPassiveInputConnectionToAudioNode = (insertElementInSet => (passiveInputs, input, [source, output, eventListener], ignoreDuplicates) => {
    const passiveInputConnections = passiveInputs.get(source);
    void 0 === passiveInputConnections ? passiveInputs.set(source, new Set([ [ output, input, eventListener ] ])) : insertElementInSet(passiveInputConnections, [ output, input, eventListener ], (passiveInputConnection => passiveInputConnection[0] === output && passiveInputConnection[1] === input), ignoreDuplicates);
  })(insertElementInSet);
  const deleteActiveInputConnectionToAudioNode = (pickElementFromSet => (activeInputs, source, output, input) => pickElementFromSet(activeInputs[input], (activeInputConnection => activeInputConnection[0] === source && activeInputConnection[1] === output)))(pickElementFromSet);
  const audioNodeTailTimeStore = new WeakMap;
  const getAudioNodeTailTime = (audioNodeTailTimeStore => audioNode => {
    var _a;
    return null !== (_a = audioNodeTailTimeStore.get(audioNode)) && void 0 !== _a ? _a : 0;
  })(audioNodeTailTimeStore);
  const cacheTestResult = (ongoingTests = new Map, testResults = new WeakMap, (tester, test) => {
    const cachedTestResult = testResults.get(tester);
    if (void 0 !== cachedTestResult) return cachedTestResult;
    const ongoingTest = ongoingTests.get(tester);
    if (void 0 !== ongoingTest) return ongoingTest;
    try {
      const synchronousTestResult = test();
      return synchronousTestResult instanceof Promise ? (ongoingTests.set(tester, synchronousTestResult), 
      synchronousTestResult.catch((() => !1)).then((finalTestResult => (ongoingTests.delete(tester), 
      testResults.set(tester, finalTestResult), finalTestResult)))) : (testResults.set(tester, synchronousTestResult), 
      synchronousTestResult);
    } catch {
      return testResults.set(tester, !1), !1;
    }
  });
  var ongoingTests, testResults;
  const window$1 = "undefined" == typeof window ? null : window;
  const createNativeAnalyserNode = ((cacheTestResult, createIndexSizeError) => (nativeContext, options) => {
    const nativeAnalyserNode = nativeContext.createAnalyser();
    // Bug #37: Firefox does not create an AnalyserNode with the default properties.
        // Bug #118: Safari does not throw an error if maxDecibels is not more than minDecibels.
    if (assignNativeAudioNodeOptions(nativeAnalyserNode, options), !(options.maxDecibels > options.minDecibels)) throw createIndexSizeError();
    return assignNativeAudioNodeOption(nativeAnalyserNode, options, "fftSize"), assignNativeAudioNodeOption(nativeAnalyserNode, options, "maxDecibels"), 
    assignNativeAudioNodeOption(nativeAnalyserNode, options, "minDecibels"), assignNativeAudioNodeOption(nativeAnalyserNode, options, "smoothingTimeConstant"), 
    // Bug #36: Safari does not support getFloatTimeDomainData() yet.
    cacheTestResult(testAnalyserNodeGetFloatTimeDomainDataMethodSupport, (() => testAnalyserNodeGetFloatTimeDomainDataMethodSupport(nativeAnalyserNode))) || (nativeAnalyserNode => {
      nativeAnalyserNode.getFloatTimeDomainData = array => {
        const byteTimeDomainData = new Uint8Array(array.length);
        nativeAnalyserNode.getByteTimeDomainData(byteTimeDomainData);
        const length = Math.max(byteTimeDomainData.length, nativeAnalyserNode.fftSize);
        for (let i = 0; i < length; i += 1) array[i] = .0078125 * (byteTimeDomainData[i] - 128);
        return array;
      };
    })(nativeAnalyserNode), nativeAnalyserNode;
  })(cacheTestResult, createIndexSizeError);
  const getAudioNodeRenderer = (getAudioNodeConnections => audioNode => {
    const audioNodeConnections = getAudioNodeConnections(audioNode);
    if (null === audioNodeConnections.renderer) throw new Error("Missing the renderer of the given AudioNode in the audio graph.");
    return audioNodeConnections.renderer;
  })(getAudioNodeConnections);
  const renderInputsOfAudioNode = ((getAudioNodeConnections, getAudioNodeRenderer, isPartOfACycle) => async (audioNode, nativeOfflineAudioContext, nativeAudioNode) => {
    const audioNodeConnections = getAudioNodeConnections(audioNode);
    await Promise.all(audioNodeConnections.activeInputs.map(((connections, input) => Array.from(connections).map((async ([source, output]) => {
      const audioNodeRenderer = getAudioNodeRenderer(source);
      const renderedNativeAudioNode = await audioNodeRenderer.render(source, nativeOfflineAudioContext);
      const destination = audioNode.context.destination;
      isPartOfACycle(source) || audioNode === destination && isPartOfACycle(audioNode) || renderedNativeAudioNode.connect(nativeAudioNode, output, input);
    })))).reduce(((allRenderingPromises, renderingPromises) => [ ...allRenderingPromises, ...renderingPromises ]), []));
  })(getAudioNodeConnections, getAudioNodeRenderer, isPartOfACycle);
  const createAnalyserNodeRenderer = ((createNativeAnalyserNode, getNativeAudioNode, renderInputsOfAudioNode) => () => {
    const renderedNativeAnalyserNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeAnalyserNode = renderedNativeAnalyserNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeAnalyserNode ? Promise.resolve(renderedNativeAnalyserNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeAnalyserNode = getNativeAudioNode(proxy);
          // If the initially used nativeAnalyserNode was not constructed on the same OfflineAudioContext it needs to be created again.
                    if (!isOwnedByContext(nativeAnalyserNode, nativeOfflineAudioContext)) {
            const options = {
              channelCount: nativeAnalyserNode.channelCount,
              channelCountMode: nativeAnalyserNode.channelCountMode,
              channelInterpretation: nativeAnalyserNode.channelInterpretation,
              fftSize: nativeAnalyserNode.fftSize,
              maxDecibels: nativeAnalyserNode.maxDecibels,
              minDecibels: nativeAnalyserNode.minDecibels,
              smoothingTimeConstant: nativeAnalyserNode.smoothingTimeConstant
            };
            nativeAnalyserNode = createNativeAnalyserNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeAnalyserNodes.set(nativeOfflineAudioContext, nativeAnalyserNode), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeAnalyserNode), 
          nativeAnalyserNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(createNativeAnalyserNode, getNativeAudioNode, renderInputsOfAudioNode);
  const getNativeContext = (contextStore = CONTEXT_STORE, context => {
    const nativeContext = contextStore.get(context);
    if (void 0 === nativeContext) throw createInvalidStateError();
    return nativeContext;
  });
  var contextStore;
  const nativeOfflineAudioContextConstructor = (window => null === window ? null : window.hasOwnProperty("OfflineAudioContext") ? window.OfflineAudioContext : window.hasOwnProperty("webkitOfflineAudioContext") ? window.webkitOfflineAudioContext : null)(window$1);
  const isNativeOfflineAudioContext = (nativeOfflineAudioContextConstructor => anything => null !== nativeOfflineAudioContextConstructor && anything instanceof nativeOfflineAudioContextConstructor)(nativeOfflineAudioContextConstructor);
  const audioParamAudioNodeStore = new WeakMap;
  const eventTargetConstructor = (wrapEventListener => class {
    constructor(_nativeEventTarget) {
      this._nativeEventTarget = _nativeEventTarget, this._listeners = new WeakMap;
    }
    addEventListener(type, listener, options) {
      if (null !== listener) {
        let wrappedEventListener = this._listeners.get(listener);
        void 0 === wrappedEventListener && (wrappedEventListener = wrapEventListener(this, listener), 
        "function" == typeof listener && this._listeners.set(listener, wrappedEventListener)), 
        this._nativeEventTarget.addEventListener(type, wrappedEventListener, options);
      }
    }
    dispatchEvent(event) {
      return this._nativeEventTarget.dispatchEvent(event);
    }
    removeEventListener(type, listener, options) {
      const wrappedEventListener = null === listener ? void 0 : this._listeners.get(listener);
      this._nativeEventTarget.removeEventListener(type, void 0 === wrappedEventListener ? null : wrappedEventListener, options);
    }
  })(wrapEventListener);
  const nativeAudioContextConstructor = (window => null === window ? null : window.hasOwnProperty("AudioContext") ? window.AudioContext : window.hasOwnProperty("webkitAudioContext") ? window.webkitAudioContext : null)(window$1);
  const isNativeAudioContext = (nativeAudioContextConstructor => anything => null !== nativeAudioContextConstructor && anything instanceof nativeAudioContextConstructor)(nativeAudioContextConstructor);
  const isNativeAudioNode = (window => anything => null !== window && "function" == typeof window.AudioNode && anything instanceof window.AudioNode)(window$1);
  const isNativeAudioParam = (window => anything => null !== window && "function" == typeof window.AudioParam && anything instanceof window.AudioParam)(window$1);
  const nativeAudioWorkletNodeConstructor = (window => null === window ? null : window.hasOwnProperty("AudioWorkletNode") ? window.AudioWorkletNode : null)(window$1);
  const audioNodeConstructor = ((addAudioNodeConnections, addConnectionToAudioNode, cacheTestResult, createIncrementCycleCounter, createIndexSizeError, createInvalidAccessError, createNotSupportedError, decrementCycleCounter, detectCycles, eventTargetConstructor, getNativeContext, isNativeAudioContext, isNativeAudioNode, isNativeAudioParam, isNativeOfflineAudioContext, nativeAudioWorkletNodeConstructor) => class extends eventTargetConstructor {
    constructor(context, isActive, nativeAudioNode, audioNodeRenderer) {
      super(nativeAudioNode), this._context = context, this._nativeAudioNode = nativeAudioNode;
      const nativeContext = getNativeContext(context);
      // Bug #12: Safari does not support to disconnect a specific destination.
            isNativeAudioContext(nativeContext) && !0 !== cacheTestResult(testAudioNodeDisconnectMethodSupport, (() => testAudioNodeDisconnectMethodSupport(nativeContext, nativeAudioWorkletNodeConstructor))) && (nativeAudioNode => {
        const connections = new Map;
        nativeAudioNode.connect = (connect => (destination, output = 0, input = 0) => {
          const returnValue = isNativeAudioNode$1(destination) ? connect(destination, output, input) : connect(destination, output);
          // Save the new connection only if the calls to connect above didn't throw an error.
                    const connectionsToDestination = connections.get(destination);
          return void 0 === connectionsToDestination ? connections.set(destination, [ {
            input: input,
            output: output
          } ]) : connectionsToDestination.every((connection => connection.input !== input || connection.output !== output)) && connectionsToDestination.push({
            input: input,
            output: output
          }), returnValue;
        })(nativeAudioNode.connect.bind(nativeAudioNode)), nativeAudioNode.disconnect = (disconnect => (destinationOrOutput, output, input) => {
          if (disconnect.apply(nativeAudioNode), void 0 === destinationOrOutput) connections.clear(); else if ("number" == typeof destinationOrOutput) for (const [destination, connectionsToDestination] of connections) {
            const filteredConnections = connectionsToDestination.filter((connection => connection.output !== destinationOrOutput));
            0 === filteredConnections.length ? connections.delete(destination) : connections.set(destination, filteredConnections);
          } else if (connections.has(destinationOrOutput)) if (void 0 === output) connections.delete(destinationOrOutput); else {
            const connectionsToDestination = connections.get(destinationOrOutput);
            if (void 0 !== connectionsToDestination) {
              const filteredConnections = connectionsToDestination.filter((connection => connection.output !== output && (connection.input !== input || void 0 === input)));
              0 === filteredConnections.length ? connections.delete(destinationOrOutput) : connections.set(destinationOrOutput, filteredConnections);
            }
          }
          for (const [destination, connectionsToDestination] of connections) connectionsToDestination.forEach((connection => {
            isNativeAudioNode$1(destination) ? nativeAudioNode.connect(destination, connection.output, connection.input) : nativeAudioNode.connect(destination, connection.output);
          }));
        })(nativeAudioNode.disconnect);
      })(nativeAudioNode), AUDIO_NODE_STORE.set(this, nativeAudioNode), EVENT_LISTENERS.set(this, new Set), 
      "closed" !== context.state && isActive && setInternalStateToActive(this), addAudioNodeConnections(this, audioNodeRenderer, nativeAudioNode);
    }
    get channelCount() {
      return this._nativeAudioNode.channelCount;
    }
    set channelCount(value) {
      this._nativeAudioNode.channelCount = value;
    }
    get channelCountMode() {
      return this._nativeAudioNode.channelCountMode;
    }
    set channelCountMode(value) {
      this._nativeAudioNode.channelCountMode = value;
    }
    get channelInterpretation() {
      return this._nativeAudioNode.channelInterpretation;
    }
    set channelInterpretation(value) {
      this._nativeAudioNode.channelInterpretation = value;
    }
    get context() {
      return this._context;
    }
    get numberOfInputs() {
      return this._nativeAudioNode.numberOfInputs;
    }
    get numberOfOutputs() {
      return this._nativeAudioNode.numberOfOutputs;
    }
    // tslint:disable-next-line:invalid-void
    connect(destination, output = 0, input = 0) {
      // Bug #174: Safari does expose a wrong numberOfOutputs for MediaStreamAudioDestinationNodes.
      if (output < 0 || output >= this._nativeAudioNode.numberOfOutputs) throw createIndexSizeError();
      const nativeContext = getNativeContext(this._context);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      if (isNativeAudioNode(destination) || isNativeAudioParam(destination)) throw createInvalidAccessError();
      if (isAudioNode$1(destination)) {
        const nativeDestinationAudioNode = getNativeAudioNode(destination);
        try {
          const connection = connectNativeAudioNodeToNativeAudioNode(this._nativeAudioNode, nativeDestinationAudioNode, output, input);
          const isPassive = isPassiveAudioNode(this);
          (isOffline || isPassive) && this._nativeAudioNode.disconnect(...connection), "closed" !== this.context.state && !isPassive && isPassiveAudioNode(destination) && setInternalStateToActive(destination);
        } catch (err) {
          // Bug #41: Safari does not throw the correct exception so far.
          if (12 === err.code) throw createInvalidAccessError();
          throw err;
        }
        // Bug #164: Only Firefox detects cycles so far.
        if (addConnectionToAudioNode(this, destination, output, input, isOffline)) {
          const cycles = detectCycles([ this ], destination);
          visitEachAudioNodeOnce(cycles, createIncrementCycleCounter(isOffline));
        }
        return destination;
      }
      const nativeAudioParam = getNativeAudioParam(destination);
      /*
               * Bug #73, #147 & #153: Safari does not support to connect an input signal to the playbackRate AudioParam of an
               * AudioBufferSourceNode. This can't be easily detected and that's why the outdated name property is used here to identify
               * Safari. In addition to that the maxValue property is used to only detect the affected versions below v14.0.2.
               */      if ("playbackRate" === nativeAudioParam.name && 1024 === nativeAudioParam.maxValue) throw createNotSupportedError();
      try {
        this._nativeAudioNode.connect(nativeAudioParam, output), (isOffline || isPassiveAudioNode(this)) && this._nativeAudioNode.disconnect(nativeAudioParam, output);
      } catch (err) {
        // Bug #58: Safari doesn't throw an InvalidAccessError yet.
        if (12 === err.code) throw createInvalidAccessError();
        throw err;
      }
      // Bug #164: Only Firefox detects cycles so far.
      if (addConnectionToAudioParamOfAudioContext(this, destination, output, isOffline)) {
        const cycles = detectCycles([ this ], destination);
        visitEachAudioNodeOnce(cycles, createIncrementCycleCounter(isOffline));
      }
    }
    disconnect(destinationOrOutput, output, input) {
      let destinations;
      const nativeContext = getNativeContext(this._context);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      if (void 0 === destinationOrOutput) destinations = ((source, isOffline) => {
        const audioNodeConnectionsOfSource = getAudioNodeConnections(source);
        const destinations = [];
        for (const outputConnection of audioNodeConnectionsOfSource.outputs) isAudioNodeOutputConnection(outputConnection) ? deleteInputsOfAudioNode(source, isOffline, ...outputConnection) : deleteInputsOfAudioParam(source, isOffline, ...outputConnection), 
        destinations.push(outputConnection[0]);
        return audioNodeConnectionsOfSource.outputs.clear(), destinations;
      })(this, isOffline); else if ("number" == typeof destinationOrOutput) {
        if (destinationOrOutput < 0 || destinationOrOutput >= this.numberOfOutputs) throw createIndexSizeError();
        destinations = ((source, isOffline, output) => {
          const audioNodeConnectionsOfSource = getAudioNodeConnections(source);
          const destinations = [];
          for (const outputConnection of audioNodeConnectionsOfSource.outputs) outputConnection[1] === output && (isAudioNodeOutputConnection(outputConnection) ? deleteInputsOfAudioNode(source, isOffline, ...outputConnection) : deleteInputsOfAudioParam(source, isOffline, ...outputConnection), 
          destinations.push(outputConnection[0]), audioNodeConnectionsOfSource.outputs.delete(outputConnection));
          return destinations;
        })(this, isOffline, destinationOrOutput);
      } else {
        if (void 0 !== output && (output < 0 || output >= this.numberOfOutputs)) throw createIndexSizeError();
        if (isAudioNode$1(destinationOrOutput) && void 0 !== input && (input < 0 || input >= destinationOrOutput.numberOfInputs)) throw createIndexSizeError();
        if (destinations = ((source, isOffline, destination, output, input) => {
          const audioNodeConnectionsOfSource = getAudioNodeConnections(source);
          return Array.from(audioNodeConnectionsOfSource.outputs).filter((outputConnection => !(outputConnection[0] !== destination || void 0 !== output && outputConnection[1] !== output || void 0 !== input && outputConnection[2] !== input))).map((outputConnection => (isAudioNodeOutputConnection(outputConnection) ? deleteInputsOfAudioNode(source, isOffline, ...outputConnection) : deleteInputsOfAudioParam(source, isOffline, ...outputConnection), 
          audioNodeConnectionsOfSource.outputs.delete(outputConnection), outputConnection[0])));
        })(this, isOffline, destinationOrOutput, output, input), 0 === destinations.length) throw createInvalidAccessError();
      }
      // Bug #164: Only Firefox detects cycles so far.
            for (const destination of destinations) {
        const cycles = detectCycles([ this ], destination);
        visitEachAudioNodeOnce(cycles, decrementCycleCounter);
      }
    }
  })((audioNodeConnectionsStore = AUDIO_NODE_CONNECTIONS_STORE, (audioNode, audioNodeRenderer, nativeAudioNode) => {
    const activeInputs = [];
    for (let i = 0; i < nativeAudioNode.numberOfInputs; i += 1) activeInputs.push(new Set);
    audioNodeConnectionsStore.set(audioNode, {
      activeInputs: activeInputs,
      outputs: new Set,
      passiveInputs: new WeakMap,
      renderer: audioNodeRenderer
    });
  }), ((addActiveInputConnectionToAudioNode, addPassiveInputConnectionToAudioNode, connectNativeAudioNodeToNativeAudioNode, deleteActiveInputConnectionToAudioNode, disconnectNativeAudioNodeFromNativeAudioNode, getAudioNodeConnections, getAudioNodeTailTime, getEventListenersOfAudioNode, getNativeAudioNode, insertElementInSet, isActiveAudioNode, isPartOfACycle, isPassiveAudioNode) => {
    const tailTimeTimeoutIds = new WeakMap;
    return (source, destination, output, input, isOffline) => {
      const {activeInputs: activeInputs, passiveInputs: passiveInputs} = getAudioNodeConnections(destination);
      const {outputs: outputs} = getAudioNodeConnections(source);
      const eventListeners = getEventListenersOfAudioNode(source);
      const eventListener = isActive => {
        const nativeDestinationAudioNode = getNativeAudioNode(destination);
        const nativeSourceAudioNode = getNativeAudioNode(source);
        if (isActive) {
          const partialConnection = deletePassiveInputConnectionToAudioNode(passiveInputs, source, output, input);
          addActiveInputConnectionToAudioNode(activeInputs, source, partialConnection, !1), 
          isOffline || isPartOfACycle(source) || connectNativeAudioNodeToNativeAudioNode(nativeSourceAudioNode, nativeDestinationAudioNode, output, input), 
          isPassiveAudioNode(destination) && setInternalStateToActive(destination);
        } else {
          const partialConnection = deleteActiveInputConnectionToAudioNode(activeInputs, source, output, input);
          addPassiveInputConnectionToAudioNode(passiveInputs, input, partialConnection, !1), 
          isOffline || isPartOfACycle(source) || disconnectNativeAudioNodeFromNativeAudioNode(nativeSourceAudioNode, nativeDestinationAudioNode, output, input);
          const tailTime = getAudioNodeTailTime(destination);
          if (0 === tailTime) isActiveAudioNode(destination) && setInternalStateToPassiveWhenNecessary(destination, activeInputs); else {
            const tailTimeTimeoutId = tailTimeTimeoutIds.get(destination);
            void 0 !== tailTimeTimeoutId && clearTimeout(tailTimeTimeoutId), tailTimeTimeoutIds.set(destination, setTimeout((() => {
              isActiveAudioNode(destination) && setInternalStateToPassiveWhenNecessary(destination, activeInputs);
            }), 1e3 * tailTime));
          }
        }
      };
      return !!insertElementInSet(outputs, [ destination, output, input ], (outputConnection => outputConnection[0] === destination && outputConnection[1] === output && outputConnection[2] === input), !0) && (eventListeners.add(eventListener), 
      isActiveAudioNode(source) ? addActiveInputConnectionToAudioNode(activeInputs, source, [ output, input, eventListener ], !0) : addPassiveInputConnectionToAudioNode(passiveInputs, input, [ source, output, eventListener ], !0), 
      !0);
    };
  })(addActiveInputConnectionToAudioNode, addPassiveInputConnectionToAudioNode, connectNativeAudioNodeToNativeAudioNode, deleteActiveInputConnectionToAudioNode, disconnectNativeAudioNodeFromNativeAudioNode, getAudioNodeConnections, getAudioNodeTailTime, getEventListenersOfAudioNode, getNativeAudioNode, insertElementInSet, isActiveAudioNode, isPartOfACycle, isPassiveAudioNode), cacheTestResult, ((cycleCounters, disconnectNativeAudioNodeFromNativeAudioNode, getAudioNodeConnections, getNativeAudioNode, getNativeAudioParam, isActiveAudioNode) => isOffline => (audioNode, count) => {
    const cycleCounter = cycleCounters.get(audioNode);
    if (void 0 === cycleCounter) {
      if (!isOffline && isActiveAudioNode(audioNode)) {
        const nativeSourceAudioNode = getNativeAudioNode(audioNode);
        const {outputs: outputs} = getAudioNodeConnections(audioNode);
        for (const output of outputs) if (isAudioNodeOutputConnection(output)) {
          const nativeDestinationAudioNode = getNativeAudioNode(output[0]);
          disconnectNativeAudioNodeFromNativeAudioNode(nativeSourceAudioNode, nativeDestinationAudioNode, output[1], output[2]);
        } else {
          const nativeDestinationAudioParam = getNativeAudioParam(output[0]);
          nativeSourceAudioNode.disconnect(nativeDestinationAudioParam, output[1]);
        }
      }
      cycleCounters.set(audioNode, count);
    } else cycleCounters.set(audioNode, cycleCounter + count);
  })(CYCLE_COUNTERS, disconnectNativeAudioNodeFromNativeAudioNode, getAudioNodeConnections, getNativeAudioNode, getNativeAudioParam, isActiveAudioNode), createIndexSizeError, createInvalidAccessError, createNotSupportedError, ((connectNativeAudioNodeToNativeAudioNode, cycleCounters, getAudioNodeConnections, getNativeAudioNode, getNativeAudioParam, getNativeContext, isActiveAudioNode, isNativeOfflineAudioContext) => (audioNode, count) => {
    const cycleCounter = cycleCounters.get(audioNode);
    if (void 0 === cycleCounter) throw new Error("Missing the expected cycle count.");
    const nativeContext = getNativeContext(audioNode.context);
    const isOffline = isNativeOfflineAudioContext(nativeContext);
    if (cycleCounter === count) {
      if (cycleCounters.delete(audioNode), !isOffline && isActiveAudioNode(audioNode)) {
        const nativeSourceAudioNode = getNativeAudioNode(audioNode);
        const {outputs: outputs} = getAudioNodeConnections(audioNode);
        for (const output of outputs) if (isAudioNodeOutputConnection(output)) {
          const nativeDestinationAudioNode = getNativeAudioNode(output[0]);
          connectNativeAudioNodeToNativeAudioNode(nativeSourceAudioNode, nativeDestinationAudioNode, output[1], output[2]);
        } else {
          const nativeDestinationAudioParam = getNativeAudioParam(output[0]);
          nativeSourceAudioNode.connect(nativeDestinationAudioParam, output[1]);
        }
      }
    } else cycleCounters.set(audioNode, cycleCounter - count);
  })(connectNativeAudioNodeToNativeAudioNode, CYCLE_COUNTERS, getAudioNodeConnections, getNativeAudioNode, getNativeAudioParam, getNativeContext, isActiveAudioNode, isNativeOfflineAudioContext), ((audioParamAudioNodeStore, getAudioNodeConnections, getValueForKey) => function detectCycles(chain, nextLink) {
    const audioNode = isAudioNode$1(nextLink) ? nextLink : getValueForKey(audioParamAudioNodeStore, nextLink);
    if ((audioNode => "delayTime" in audioNode)(audioNode)) return [];
    if (chain[0] === audioNode) return [ chain ];
    if (chain.includes(audioNode)) return [];
    const {outputs: outputs} = getAudioNodeConnections(audioNode);
    return Array.from(outputs).map((outputConnection => detectCycles([ ...chain, audioNode ], outputConnection[0]))).reduce(((mergedCycles, nestedCycles) => mergedCycles.concat(nestedCycles)), []);
  })(audioParamAudioNodeStore, getAudioNodeConnections, getValueForKey), eventTargetConstructor, getNativeContext, isNativeAudioContext, isNativeAudioNode, isNativeAudioParam, isNativeOfflineAudioContext, nativeAudioWorkletNodeConstructor);
  var audioNodeConnectionsStore;
  const analyserNodeConstructor = ((audionNodeConstructor, createAnalyserNodeRenderer, createIndexSizeError, createNativeAnalyserNode, getNativeContext, isNativeOfflineAudioContext) => class extends audionNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$j,
        ...options
      };
      const nativeAnalyserNode = createNativeAnalyserNode(nativeContext, mergedOptions);
      super(context, !1, nativeAnalyserNode, isNativeOfflineAudioContext(nativeContext) ? createAnalyserNodeRenderer() : null), 
      this._nativeAnalyserNode = nativeAnalyserNode;
    }
    get fftSize() {
      return this._nativeAnalyserNode.fftSize;
    }
    set fftSize(value) {
      this._nativeAnalyserNode.fftSize = value;
    }
    get frequencyBinCount() {
      return this._nativeAnalyserNode.frequencyBinCount;
    }
    get maxDecibels() {
      return this._nativeAnalyserNode.maxDecibels;
    }
    set maxDecibels(value) {
      // Bug #118: Safari does not throw an error if maxDecibels is not more than minDecibels.
      const maxDecibels = this._nativeAnalyserNode.maxDecibels;
      if (this._nativeAnalyserNode.maxDecibels = value, !(value > this._nativeAnalyserNode.minDecibels)) throw this._nativeAnalyserNode.maxDecibels = maxDecibels, 
      createIndexSizeError();
    }
    get minDecibels() {
      return this._nativeAnalyserNode.minDecibels;
    }
    set minDecibels(value) {
      // Bug #118: Safari does not throw an error if maxDecibels is not more than minDecibels.
      const minDecibels = this._nativeAnalyserNode.minDecibels;
      if (this._nativeAnalyserNode.minDecibels = value, !(this._nativeAnalyserNode.maxDecibels > value)) throw this._nativeAnalyserNode.minDecibels = minDecibels, 
      createIndexSizeError();
    }
    get smoothingTimeConstant() {
      return this._nativeAnalyserNode.smoothingTimeConstant;
    }
    set smoothingTimeConstant(value) {
      this._nativeAnalyserNode.smoothingTimeConstant = value;
    }
    getByteFrequencyData(array) {
      this._nativeAnalyserNode.getByteFrequencyData(array);
    }
    getByteTimeDomainData(array) {
      this._nativeAnalyserNode.getByteTimeDomainData(array);
    }
    getFloatFrequencyData(array) {
      this._nativeAnalyserNode.getFloatFrequencyData(array);
    }
    getFloatTimeDomainData(array) {
      this._nativeAnalyserNode.getFloatTimeDomainData(array);
    }
  })(audioNodeConstructor, createAnalyserNodeRenderer, createIndexSizeError, createNativeAnalyserNode, getNativeContext, isNativeOfflineAudioContext);
  const audioBufferStore = new WeakSet;
  const nativeAudioBufferConstructor = (window => null === window ? null : window.hasOwnProperty("AudioBuffer") ? window.AudioBuffer : null)(window$1);
  const convertNumberToUnsignedLong = (unit32Array = new Uint32Array(1), value => (unit32Array[0] = value, 
  unit32Array[0]));
  var unit32Array;
  const wrapAudioBufferCopyChannelMethods = ((convertNumberToUnsignedLong, createIndexSizeError) => audioBuffer => {
    audioBuffer.copyFromChannel = (destination, channelNumberAsNumber, bufferOffsetAsNumber = 0) => {
      const bufferOffset = convertNumberToUnsignedLong(bufferOffsetAsNumber);
      const channelNumber = convertNumberToUnsignedLong(channelNumberAsNumber);
      if (channelNumber >= audioBuffer.numberOfChannels) throw createIndexSizeError();
      const audioBufferLength = audioBuffer.length;
      const channelData = audioBuffer.getChannelData(channelNumber);
      const destinationLength = destination.length;
      for (let i = bufferOffset < 0 ? -bufferOffset : 0; i + bufferOffset < audioBufferLength && i < destinationLength; i += 1) destination[i] = channelData[i + bufferOffset];
    }, audioBuffer.copyToChannel = (source, channelNumberAsNumber, bufferOffsetAsNumber = 0) => {
      const bufferOffset = convertNumberToUnsignedLong(bufferOffsetAsNumber);
      const channelNumber = convertNumberToUnsignedLong(channelNumberAsNumber);
      if (channelNumber >= audioBuffer.numberOfChannels) throw createIndexSizeError();
      const audioBufferLength = audioBuffer.length;
      const channelData = audioBuffer.getChannelData(channelNumber);
      const sourceLength = source.length;
      for (let i = bufferOffset < 0 ? -bufferOffset : 0; i + bufferOffset < audioBufferLength && i < sourceLength; i += 1) channelData[i + bufferOffset] = source[i];
    };
  })(convertNumberToUnsignedLong, createIndexSizeError);
  const wrapAudioBufferCopyChannelMethodsOutOfBounds = (convertNumberToUnsignedLong => audioBuffer => {
    audioBuffer.copyFromChannel = (copyFromChannel => (destination, channelNumberAsNumber, bufferOffsetAsNumber = 0) => {
      const bufferOffset = convertNumberToUnsignedLong(bufferOffsetAsNumber);
      const channelNumber = convertNumberToUnsignedLong(channelNumberAsNumber);
      if (bufferOffset < audioBuffer.length) return copyFromChannel.call(audioBuffer, destination, channelNumber, bufferOffset);
    })(audioBuffer.copyFromChannel), audioBuffer.copyToChannel = (copyToChannel => (source, channelNumberAsNumber, bufferOffsetAsNumber = 0) => {
      const bufferOffset = convertNumberToUnsignedLong(bufferOffsetAsNumber);
      const channelNumber = convertNumberToUnsignedLong(channelNumberAsNumber);
      if (bufferOffset < audioBuffer.length) return copyToChannel.call(audioBuffer, source, channelNumber, bufferOffset);
    })(audioBuffer.copyToChannel);
  })(convertNumberToUnsignedLong);
  const audioBufferConstructor = ((audioBufferStore, cacheTestResult, createNotSupportedError, nativeAudioBufferConstructor, nativeOfflineAudioContextConstructor, testNativeAudioBufferConstructorSupport, wrapAudioBufferCopyChannelMethods, wrapAudioBufferCopyChannelMethodsOutOfBounds) => {
    let nativeOfflineAudioContext = null;
    return class AudioBuffer {
      constructor(options) {
        if (null === nativeOfflineAudioContextConstructor) throw new Error("Missing the native OfflineAudioContext constructor.");
        const {length: length, numberOfChannels: numberOfChannels, sampleRate: sampleRate} = {
          ...DEFAULT_OPTIONS$i,
          ...options
        };
        null === nativeOfflineAudioContext && (nativeOfflineAudioContext = new nativeOfflineAudioContextConstructor(1, 1, 44100))
        /*
               * Bug #99: Firefox does not throw a NotSupportedError when the numberOfChannels is zero. But it only does it when using the
               * factory function. But since Firefox also supports the constructor everything should be fine.
               */;
        const audioBuffer = null !== nativeAudioBufferConstructor && cacheTestResult(testNativeAudioBufferConstructorSupport, testNativeAudioBufferConstructorSupport) ? new nativeAudioBufferConstructor({
          length: length,
          numberOfChannels: numberOfChannels,
          sampleRate: sampleRate
        }) : nativeOfflineAudioContext.createBuffer(numberOfChannels, length, sampleRate);
        // Bug #99: Safari does not throw an error when the numberOfChannels is zero.
                if (0 === audioBuffer.numberOfChannels) throw createNotSupportedError();
        // Bug #5: Safari does not support copyFromChannel() and copyToChannel().
        // Bug #100: Safari does throw a wrong error when calling getChannelData() with an out-of-bounds value.
                /*
               * This does violate all good pratices but it is necessary to allow this AudioBuffer to be used with native
               * (Offline)AudioContexts.
               */
        return "function" != typeof audioBuffer.copyFromChannel ? (wrapAudioBufferCopyChannelMethods(audioBuffer), 
        wrapAudioBufferGetChannelDataMethod(audioBuffer)) : cacheTestResult(testAudioBufferCopyChannelMethodsOutOfBoundsSupport, (() => testAudioBufferCopyChannelMethodsOutOfBoundsSupport(audioBuffer))) || wrapAudioBufferCopyChannelMethodsOutOfBounds(audioBuffer), 
        audioBufferStore.add(audioBuffer), audioBuffer;
      }
      static [Symbol.hasInstance](instance) {
        return null !== instance && "object" == typeof instance && Object.getPrototypeOf(instance) === AudioBuffer.prototype || audioBufferStore.has(instance);
      }
    };
  })(audioBufferStore, cacheTestResult, createNotSupportedError, nativeAudioBufferConstructor, nativeOfflineAudioContextConstructor, (nativeAudioBufferConstructor => () => {
    if (null === nativeAudioBufferConstructor) return !1;
    try {
      new nativeAudioBufferConstructor({
        length: 1,
        sampleRate: 44100
      });
 // tslint:disable-line:no-unused-expression
        } catch {
      return !1;
    }
    return !0;
  })(nativeAudioBufferConstructor), wrapAudioBufferCopyChannelMethods, wrapAudioBufferCopyChannelMethodsOutOfBounds);
  const addSilentConnection = (createNativeGainNode => (nativeContext, nativeAudioScheduledSourceNode) => {
    const nativeGainNode = createNativeGainNode(nativeContext, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "discrete",
      gain: 0
    });
    nativeAudioScheduledSourceNode.connect(nativeGainNode).connect(nativeContext.destination);
    const disconnect = () => {
      nativeAudioScheduledSourceNode.removeEventListener("ended", disconnect), nativeAudioScheduledSourceNode.disconnect(nativeGainNode), 
      nativeGainNode.disconnect();
    };
    nativeAudioScheduledSourceNode.addEventListener("ended", disconnect);
  })(createNativeGainNode);
  const renderInputsOfAudioParam = ((getAudioNodeRenderer, getAudioParamConnections, isPartOfACycle) => async (audioParam, nativeOfflineAudioContext, nativeAudioParam) => {
    const audioParamConnections = getAudioParamConnections(audioParam);
    await Promise.all(Array.from(audioParamConnections.activeInputs).map((async ([source, output]) => {
      const audioNodeRenderer = getAudioNodeRenderer(source);
      const renderedNativeAudioNode = await audioNodeRenderer.render(source, nativeOfflineAudioContext);
      isPartOfACycle(source) || renderedNativeAudioNode.connect(nativeAudioParam, output);
    })));
  })(getAudioNodeRenderer, getAudioParamConnections, isPartOfACycle);
  const connectAudioParam = (renderInputsOfAudioParam => (nativeOfflineAudioContext, audioParam, nativeAudioParam) => renderInputsOfAudioParam(audioParam, nativeOfflineAudioContext, nativeAudioParam))(renderInputsOfAudioParam);
  const createNativeAudioBufferSourceNode = ((addSilentConnection, cacheTestResult, testAudioBufferSourceNodeStartMethodConsecutiveCallsSupport, testAudioBufferSourceNodeStartMethodOffsetClampingSupport, testAudioBufferSourceNodeStopMethodNullifiedBufferSupport, testAudioScheduledSourceNodeStartMethodNegativeParametersSupport, testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport, testAudioScheduledSourceNodeStopMethodNegativeParametersSupport, wrapAudioBufferSourceNodeStartMethodOffsetClampling, wrapAudioBufferSourceNodeStopMethodNullifiedBuffer, wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls) => (nativeContext, options) => {
    const nativeAudioBufferSourceNode = nativeContext.createBufferSource();
    return assignNativeAudioNodeOptions(nativeAudioBufferSourceNode, options), assignNativeAudioNodeAudioParamValue(nativeAudioBufferSourceNode, options, "playbackRate"), 
    assignNativeAudioNodeOption(nativeAudioBufferSourceNode, options, "buffer"), 
    // Bug #149: Safari does not yet support the detune AudioParam.
    assignNativeAudioNodeOption(nativeAudioBufferSourceNode, options, "loop"), assignNativeAudioNodeOption(nativeAudioBufferSourceNode, options, "loopEnd"), 
    assignNativeAudioNodeOption(nativeAudioBufferSourceNode, options, "loopStart"), 
    // Bug #69: Safari does allow calls to start() of an already scheduled AudioBufferSourceNode.
    cacheTestResult(testAudioBufferSourceNodeStartMethodConsecutiveCallsSupport, (() => testAudioBufferSourceNodeStartMethodConsecutiveCallsSupport(nativeContext))) || (nativeAudioBufferSourceNode => {
      nativeAudioBufferSourceNode.start = (start => {
        let isScheduled = !1;
        return (when = 0, offset = 0, duration) => {
          if (isScheduled) throw createInvalidStateError();
          start.call(nativeAudioBufferSourceNode, when, offset, duration), isScheduled = !0;
        };
      })(nativeAudioBufferSourceNode.start);
    })(nativeAudioBufferSourceNode), 
    // Bug #154 & #155: Safari does not handle offsets which are equal to or greater than the duration of the buffer.
    cacheTestResult(testAudioBufferSourceNodeStartMethodOffsetClampingSupport, (() => testAudioBufferSourceNodeStartMethodOffsetClampingSupport(nativeContext))) || wrapAudioBufferSourceNodeStartMethodOffsetClampling(nativeAudioBufferSourceNode), 
    // Bug #162: Safari does throw an error when stop() is called on an AudioBufferSourceNode which has no buffer assigned to it.
    cacheTestResult(testAudioBufferSourceNodeStopMethodNullifiedBufferSupport, (() => testAudioBufferSourceNodeStopMethodNullifiedBufferSupport(nativeContext))) || wrapAudioBufferSourceNodeStopMethodNullifiedBuffer(nativeAudioBufferSourceNode, nativeContext), 
    // Bug #44: Safari does not throw a RangeError yet.
    cacheTestResult(testAudioScheduledSourceNodeStartMethodNegativeParametersSupport, (() => testAudioScheduledSourceNodeStartMethodNegativeParametersSupport(nativeContext))) || wrapAudioScheduledSourceNodeStartMethodNegativeParameters(nativeAudioBufferSourceNode), 
    // Bug #19: Safari does not ignore calls to stop() of an already stopped AudioBufferSourceNode.
    cacheTestResult(testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport, (() => testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport(nativeContext))) || wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls(nativeAudioBufferSourceNode, nativeContext), 
    // Bug #44: Only Firefox does not throw a RangeError yet.
    cacheTestResult(testAudioScheduledSourceNodeStopMethodNegativeParametersSupport, (() => testAudioScheduledSourceNodeStopMethodNegativeParametersSupport(nativeContext))) || wrapAudioScheduledSourceNodeStopMethodNegativeParameters(nativeAudioBufferSourceNode), 
    // Bug #175: Safari will not fire an ended event if the AudioBufferSourceNode is unconnected.
    addSilentConnection(nativeContext, nativeAudioBufferSourceNode), nativeAudioBufferSourceNode;
  })(addSilentConnection, cacheTestResult, (nativeContext => {
    const nativeAudioBufferSourceNode = nativeContext.createBufferSource();
    nativeAudioBufferSourceNode.start();
    try {
      nativeAudioBufferSourceNode.start();
    } catch {
      return !0;
    }
    return !1;
  }), (nativeContext => {
    const nativeAudioBufferSourceNode = nativeContext.createBufferSource();
    const nativeAudioBuffer = nativeContext.createBuffer(1, 1, 44100);
    nativeAudioBufferSourceNode.buffer = nativeAudioBuffer;
    try {
      nativeAudioBufferSourceNode.start(0, 1);
    } catch {
      return !1;
    }
    return !0;
  }), (nativeContext => {
    const nativeAudioBufferSourceNode = nativeContext.createBufferSource();
    nativeAudioBufferSourceNode.start();
    try {
      nativeAudioBufferSourceNode.stop();
    } catch {
      return !1;
    }
    return !0;
  }), testAudioScheduledSourceNodeStartMethodNegativeParametersSupport, testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport, testAudioScheduledSourceNodeStopMethodNegativeParametersSupport, (nativeAudioBufferSourceNode => {
    var start;
    nativeAudioBufferSourceNode.start = (start = nativeAudioBufferSourceNode.start, 
    (when = 0, offset = 0, duration) => {
      const buffer = nativeAudioBufferSourceNode.buffer;
      // Bug #154: Safari does not clamp the offset if it is equal to or greater than the duration of the buffer.
            const clampedOffset = null === buffer ? offset : Math.min(buffer.duration, offset);
      // Bug #155: Safari does not handle the offset correctly if it would cause the buffer to be not be played at all.
            null !== buffer && clampedOffset > buffer.duration - .5 / nativeAudioBufferSourceNode.context.sampleRate ? start.call(nativeAudioBufferSourceNode, when, 0, 0) : start.call(nativeAudioBufferSourceNode, when, clampedOffset, duration);
    });
  }), (overwriteAccessors => (nativeAudioBufferSourceNode, nativeContext) => {
    const nullifiedBuffer = nativeContext.createBuffer(1, 1, 44100);
    null === nativeAudioBufferSourceNode.buffer && (nativeAudioBufferSourceNode.buffer = nullifiedBuffer), 
    overwriteAccessors(nativeAudioBufferSourceNode, "buffer", (get => () => {
      const value = get.call(nativeAudioBufferSourceNode);
      return value === nullifiedBuffer ? null : value;
    }), (set => value => set.call(nativeAudioBufferSourceNode, null === value ? nullifiedBuffer : value)));
  })(overwriteAccessors), wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls);
  const renderAutomation = ((getAudioParamRenderer, renderInputsOfAudioParam) => (nativeOfflineAudioContext, audioParam, nativeAudioParam) => (getAudioParamRenderer(audioParam).replay(nativeAudioParam), 
  renderInputsOfAudioParam(audioParam, nativeOfflineAudioContext, nativeAudioParam)))((getAudioParamConnections => audioParam => {
    const audioParamConnections = getAudioParamConnections(audioParam);
    if (null === audioParamConnections.renderer) throw new Error("Missing the renderer of the given AudioParam in the audio graph.");
    return audioParamConnections.renderer;
  })(getAudioParamConnections), renderInputsOfAudioParam);
  const createAudioBufferSourceNodeRenderer = ((connectAudioParam, createNativeAudioBufferSourceNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode) => () => {
    const renderedNativeAudioBufferSourceNodes = new WeakMap;
    let start = null;
    let stop = null;
    return {
      set start(value) {
        start = value;
      },
      set stop(value) {
        stop = value;
      },
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeAudioBufferSourceNode = renderedNativeAudioBufferSourceNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeAudioBufferSourceNode ? Promise.resolve(renderedNativeAudioBufferSourceNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeAudioBufferSourceNode = getNativeAudioNode(proxy);
          /*
               * If the initially used nativeAudioBufferSourceNode was not constructed on the same OfflineAudioContext it needs to be created
               * again.
               */          const nativeAudioBufferSourceNodeIsOwnedByContext = isOwnedByContext(nativeAudioBufferSourceNode, nativeOfflineAudioContext);
          if (!nativeAudioBufferSourceNodeIsOwnedByContext) {
            const options = {
              buffer: nativeAudioBufferSourceNode.buffer,
              channelCount: nativeAudioBufferSourceNode.channelCount,
              channelCountMode: nativeAudioBufferSourceNode.channelCountMode,
              channelInterpretation: nativeAudioBufferSourceNode.channelInterpretation,
              // Bug #149: Safari does not yet support the detune AudioParam.
              loop: nativeAudioBufferSourceNode.loop,
              loopEnd: nativeAudioBufferSourceNode.loopEnd,
              loopStart: nativeAudioBufferSourceNode.loopStart,
              playbackRate: nativeAudioBufferSourceNode.playbackRate.value
            };
            nativeAudioBufferSourceNode = createNativeAudioBufferSourceNode(nativeOfflineAudioContext, options), 
            null !== start && nativeAudioBufferSourceNode.start(...start), null !== stop && nativeAudioBufferSourceNode.stop(stop);
          }
          return renderedNativeAudioBufferSourceNodes.set(nativeOfflineAudioContext, nativeAudioBufferSourceNode), 
          nativeAudioBufferSourceNodeIsOwnedByContext ? 
          // Bug #149: Safari does not yet support the detune AudioParam.
          await connectAudioParam(nativeOfflineAudioContext, proxy.playbackRate, nativeAudioBufferSourceNode.playbackRate) : 
          // Bug #149: Safari does not yet support the detune AudioParam.
          await renderAutomation(nativeOfflineAudioContext, proxy.playbackRate, nativeAudioBufferSourceNode.playbackRate), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeAudioBufferSourceNode), 
          nativeAudioBufferSourceNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, createNativeAudioBufferSourceNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode);
  const createAudioParam = ((addAudioParamConnections, audioParamAudioNodeStore, audioParamStore, createAudioParamRenderer, createCancelAndHoldAutomationEvent, createCancelScheduledValuesAutomationEvent, createExponentialRampToValueAutomationEvent, createLinearRampToValueAutomationEvent, createSetTargetAutomationEvent, createSetValueAutomationEvent, createSetValueCurveAutomationEvent, nativeAudioContextConstructor, setValueAtTimeUntilPossible) => (audioNode, isAudioParamOfOfflineAudioContext, nativeAudioParam, maxValue = null, minValue = null) => {
    // Bug #196 Only Safari sets the defaultValue to the initial value.
    const defaultValue = nativeAudioParam.value;
    const automationEventList = new AutomationEventList(defaultValue);
    const audioParamRenderer = isAudioParamOfOfflineAudioContext ? createAudioParamRenderer(automationEventList) : null;
    const audioParam = {
      get defaultValue() {
        return defaultValue;
      },
      get maxValue() {
        return null === maxValue ? nativeAudioParam.maxValue : maxValue;
      },
      get minValue() {
        return null === minValue ? nativeAudioParam.minValue : minValue;
      },
      get value() {
        return nativeAudioParam.value;
      },
      set value(value) {
        nativeAudioParam.value = value, 
        // Bug #98: Firefox & Safari do not yet treat the value setter like a call to setValueAtTime().
        audioParam.setValueAtTime(value, audioNode.context.currentTime);
      },
      cancelAndHoldAtTime(cancelTime) {
        // Bug #28: Firefox & Safari do not yet implement cancelAndHoldAtTime().
        if ("function" == typeof nativeAudioParam.cancelAndHoldAtTime) null === audioParamRenderer && automationEventList.flush(audioNode.context.currentTime), 
        automationEventList.add(createCancelAndHoldAutomationEvent(cancelTime)), nativeAudioParam.cancelAndHoldAtTime(cancelTime); else {
          const previousLastEvent = Array.from(automationEventList).pop();
          null === audioParamRenderer && automationEventList.flush(audioNode.context.currentTime), 
          automationEventList.add(createCancelAndHoldAutomationEvent(cancelTime));
          const currentLastEvent = Array.from(automationEventList).pop();
          nativeAudioParam.cancelScheduledValues(cancelTime), previousLastEvent !== currentLastEvent && void 0 !== currentLastEvent && ("exponentialRampToValue" === currentLastEvent.type ? nativeAudioParam.exponentialRampToValueAtTime(currentLastEvent.value, currentLastEvent.endTime) : "linearRampToValue" === currentLastEvent.type ? nativeAudioParam.linearRampToValueAtTime(currentLastEvent.value, currentLastEvent.endTime) : "setValue" === currentLastEvent.type ? nativeAudioParam.setValueAtTime(currentLastEvent.value, currentLastEvent.startTime) : "setValueCurve" === currentLastEvent.type && nativeAudioParam.setValueCurveAtTime(currentLastEvent.values, currentLastEvent.startTime, currentLastEvent.duration));
        }
        return audioParam;
      },
      cancelScheduledValues: cancelTime => (null === audioParamRenderer && automationEventList.flush(audioNode.context.currentTime), 
      automationEventList.add(createCancelScheduledValuesAutomationEvent(cancelTime)), 
      nativeAudioParam.cancelScheduledValues(cancelTime), audioParam),
      exponentialRampToValueAtTime(value, endTime) {
        // Bug #45: Safari does not throw an error yet.
        if (0 === value) throw new RangeError;
        // Bug #187: Safari does not throw an error yet.
                if (!Number.isFinite(endTime) || endTime < 0) throw new RangeError;
        const currentTime = audioNode.context.currentTime;
        return null === audioParamRenderer && automationEventList.flush(currentTime), 
        // Bug #194: Firefox does not implicitly call setValueAtTime() if there is no previous event.
        0 === Array.from(automationEventList).length && (automationEventList.add(createSetValueAutomationEvent(defaultValue, currentTime)), 
        nativeAudioParam.setValueAtTime(defaultValue, currentTime)), automationEventList.add(createExponentialRampToValueAutomationEvent(value, endTime)), 
        nativeAudioParam.exponentialRampToValueAtTime(value, endTime), audioParam;
      },
      linearRampToValueAtTime(value, endTime) {
        const currentTime = audioNode.context.currentTime;
        return null === audioParamRenderer && automationEventList.flush(currentTime), 
        // Bug #195: Firefox does not implicitly call setValueAtTime() if there is no previous event.
        0 === Array.from(automationEventList).length && (automationEventList.add(createSetValueAutomationEvent(defaultValue, currentTime)), 
        nativeAudioParam.setValueAtTime(defaultValue, currentTime)), automationEventList.add(createLinearRampToValueAutomationEvent(value, endTime)), 
        nativeAudioParam.linearRampToValueAtTime(value, endTime), audioParam;
      },
      setTargetAtTime: (target, startTime, timeConstant) => (null === audioParamRenderer && automationEventList.flush(audioNode.context.currentTime), 
      automationEventList.add(createSetTargetAutomationEvent(target, startTime, timeConstant)), 
      nativeAudioParam.setTargetAtTime(target, startTime, timeConstant), audioParam),
      setValueAtTime: (value, startTime) => (null === audioParamRenderer && automationEventList.flush(audioNode.context.currentTime), 
      automationEventList.add(createSetValueAutomationEvent(value, startTime)), nativeAudioParam.setValueAtTime(value, startTime), 
      audioParam),
      setValueCurveAtTime(values, startTime, duration) {
        // Bug 183: Safari only accepts a Float32Array.
        const convertedValues = values instanceof Float32Array ? values : new Float32Array(values);
        /*
                   * Bug #152: Safari does not correctly interpolate the values of the curve.
                   * @todo Unfortunately there is no way to test for this behavior in a synchronous fashion which is why testing for the
                   * existence of the webkitAudioContext is used as a workaround here.
                   */        if (null !== nativeAudioContextConstructor && "webkitAudioContext" === nativeAudioContextConstructor.name) {
          const endTime = startTime + duration;
          const sampleRate = audioNode.context.sampleRate;
          const firstSample = Math.ceil(startTime * sampleRate);
          const lastSample = Math.floor(endTime * sampleRate);
          const numberOfInterpolatedValues = lastSample - firstSample;
          const interpolatedValues = new Float32Array(numberOfInterpolatedValues);
          for (let i = 0; i < numberOfInterpolatedValues; i += 1) {
            const theoreticIndex = (convertedValues.length - 1) / duration * ((firstSample + i) / sampleRate - startTime);
            const lowerIndex = Math.floor(theoreticIndex);
            const upperIndex = Math.ceil(theoreticIndex);
            interpolatedValues[i] = lowerIndex === upperIndex ? convertedValues[lowerIndex] : (1 - (theoreticIndex - lowerIndex)) * convertedValues[lowerIndex] + (1 - (upperIndex - theoreticIndex)) * convertedValues[upperIndex];
          }
          null === audioParamRenderer && automationEventList.flush(audioNode.context.currentTime), 
          automationEventList.add(createSetValueCurveAutomationEvent(interpolatedValues, startTime, duration)), 
          nativeAudioParam.setValueCurveAtTime(interpolatedValues, startTime, duration);
          const timeOfLastSample = lastSample / sampleRate;
          timeOfLastSample < endTime && setValueAtTimeUntilPossible(audioParam, interpolatedValues[interpolatedValues.length - 1], timeOfLastSample), 
          setValueAtTimeUntilPossible(audioParam, convertedValues[convertedValues.length - 1], endTime);
        } else null === audioParamRenderer && automationEventList.flush(audioNode.context.currentTime), 
        automationEventList.add(createSetValueCurveAutomationEvent(convertedValues, startTime, duration)), 
        nativeAudioParam.setValueCurveAtTime(convertedValues, startTime, duration);
        return audioParam;
      }
    };
    return audioParamStore.set(audioParam, nativeAudioParam), audioParamAudioNodeStore.set(audioParam, audioNode), 
    addAudioParamConnections(audioParam, audioParamRenderer), audioParam;
  })((audioParamConnectionsStore = AUDIO_PARAM_CONNECTIONS_STORE, (audioParam, audioParamRenderer) => {
    audioParamConnectionsStore.set(audioParam, {
      activeInputs: new Set,
      passiveInputs: new WeakMap,
      renderer: audioParamRenderer
    });
  }), audioParamAudioNodeStore, AUDIO_PARAM_STORE, (automationEventList => ({
    replay(audioParam) {
      for (const automationEvent of automationEventList) if ("exponentialRampToValue" === automationEvent.type) {
        const {endTime: endTime, value: value} = automationEvent;
        audioParam.exponentialRampToValueAtTime(value, endTime);
      } else if ("linearRampToValue" === automationEvent.type) {
        const {endTime: endTime, value: value} = automationEvent;
        audioParam.linearRampToValueAtTime(value, endTime);
      } else if ("setTarget" === automationEvent.type) {
        const {startTime: startTime, target: target, timeConstant: timeConstant} = automationEvent;
        audioParam.setTargetAtTime(target, startTime, timeConstant);
      } else if ("setValue" === automationEvent.type) {
        const {startTime: startTime, value: value} = automationEvent;
        audioParam.setValueAtTime(value, startTime);
      } else {
        if ("setValueCurve" !== automationEvent.type) throw new Error("Can't apply an unknown automation.");
        {
          const {duration: duration, startTime: startTime, values: values} = automationEvent;
          audioParam.setValueCurveAtTime(values, startTime, duration);
        }
      }
    }
  })), (cancelTime => ({
    cancelTime: cancelTime,
    type: "cancelAndHold"
  })), (cancelTime => ({
    cancelTime: cancelTime,
    type: "cancelScheduledValues"
  })), ((value, endTime) => ({
    endTime: endTime,
    type: "exponentialRampToValue",
    value: value
  })), ((value, endTime) => ({
    endTime: endTime,
    type: "linearRampToValue",
    value: value
  })), ((target, startTime, timeConstant) => ({
    startTime: startTime,
    target: target,
    timeConstant: timeConstant,
    type: "setTarget"
  })), createSetValueAutomationEvent, createSetValueCurveAutomationEvent, nativeAudioContextConstructor, setValueAtTimeUntilPossible);
  var audioParamConnectionsStore;
  const audioBufferSourceNodeConstructor = ((audioNodeConstructor, createAudioBufferSourceNodeRenderer, createAudioParam, createInvalidStateError, createNativeAudioBufferSourceNode, getNativeContext, isNativeOfflineAudioContext, wrapEventListener) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$h,
        ...options
      };
      const nativeAudioBufferSourceNode = createNativeAudioBufferSourceNode(nativeContext, mergedOptions);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      const audioBufferSourceNodeRenderer = isOffline ? createAudioBufferSourceNodeRenderer() : null;
      super(context, !1, nativeAudioBufferSourceNode, audioBufferSourceNodeRenderer), 
      this._audioBufferSourceNodeRenderer = audioBufferSourceNodeRenderer, this._isBufferNullified = !1, 
      this._isBufferSet = null !== mergedOptions.buffer, this._nativeAudioBufferSourceNode = nativeAudioBufferSourceNode, 
      this._onended = null, 
      // Bug #73: Safari does not export the correct values for maxValue and minValue.
      this._playbackRate = createAudioParam(this, isOffline, nativeAudioBufferSourceNode.playbackRate, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT);
    }
    get buffer() {
      return this._isBufferNullified ? null : this._nativeAudioBufferSourceNode.buffer;
    }
    set buffer(value) {
      // Bug #72: Only Chrome & Edge do not allow to reassign the buffer yet.
      if (this._nativeAudioBufferSourceNode.buffer = value, null !== value) {
        if (this._isBufferSet) throw createInvalidStateError();
        this._isBufferSet = !0;
      }
    }
    get loop() {
      return this._nativeAudioBufferSourceNode.loop;
    }
    set loop(value) {
      this._nativeAudioBufferSourceNode.loop = value;
    }
    get loopEnd() {
      return this._nativeAudioBufferSourceNode.loopEnd;
    }
    set loopEnd(value) {
      this._nativeAudioBufferSourceNode.loopEnd = value;
    }
    get loopStart() {
      return this._nativeAudioBufferSourceNode.loopStart;
    }
    set loopStart(value) {
      this._nativeAudioBufferSourceNode.loopStart = value;
    }
    get onended() {
      return this._onended;
    }
    set onended(value) {
      const wrappedListener = "function" == typeof value ? wrapEventListener(this, value) : null;
      this._nativeAudioBufferSourceNode.onended = wrappedListener;
      const nativeOnEnded = this._nativeAudioBufferSourceNode.onended;
      this._onended = null !== nativeOnEnded && nativeOnEnded === wrappedListener ? value : nativeOnEnded;
    }
    get playbackRate() {
      return this._playbackRate;
    }
    start(when = 0, offset = 0, duration) {
      if (this._nativeAudioBufferSourceNode.start(when, offset, duration), null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.start = void 0 === duration ? [ when, offset ] : [ when, offset, duration ]), 
      "closed" !== this.context.state) {
        setInternalStateToActive(this);
        const resetInternalStateToPassive = () => {
          this._nativeAudioBufferSourceNode.removeEventListener("ended", resetInternalStateToPassive), 
          isActiveAudioNode(this) && setInternalStateToPassive(this);
        };
        this._nativeAudioBufferSourceNode.addEventListener("ended", resetInternalStateToPassive);
      }
    }
    stop(when = 0) {
      this._nativeAudioBufferSourceNode.stop(when), null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.stop = when);
    }
  })(audioNodeConstructor, createAudioBufferSourceNodeRenderer, createAudioParam, createInvalidStateError, createNativeAudioBufferSourceNode, getNativeContext, isNativeOfflineAudioContext, wrapEventListener);
  const audioDestinationNodeConstructor = ((audioNodeConstructor, createAudioDestinationNodeRenderer, createIndexSizeError, createInvalidStateError, createNativeAudioDestinationNode, getNativeContext, isNativeOfflineAudioContext, renderInputsOfAudioNode) => class extends audioNodeConstructor {
    constructor(context, channelCount) {
      const nativeContext = getNativeContext(context);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      const nativeAudioDestinationNode = createNativeAudioDestinationNode(nativeContext, channelCount, isOffline);
      super(context, !1, nativeAudioDestinationNode, isOffline ? createAudioDestinationNodeRenderer(renderInputsOfAudioNode) : null), 
      this._isNodeOfNativeOfflineAudioContext = isOffline, this._nativeAudioDestinationNode = nativeAudioDestinationNode;
    }
    get channelCount() {
      return this._nativeAudioDestinationNode.channelCount;
    }
    set channelCount(value) {
      // Bug #52: Chrome, Edge & Safari do not throw an exception at all.
      // Bug #54: Firefox does throw an IndexSizeError.
      if (this._isNodeOfNativeOfflineAudioContext) throw createInvalidStateError();
      // Bug #47: The AudioDestinationNode in Safari does not initialize the maxChannelCount property correctly.
            if (value > this._nativeAudioDestinationNode.maxChannelCount) throw createIndexSizeError();
      this._nativeAudioDestinationNode.channelCount = value;
    }
    get channelCountMode() {
      return this._nativeAudioDestinationNode.channelCountMode;
    }
    set channelCountMode(value) {
      // Bug #53: No browser does throw an exception yet.
      if (this._isNodeOfNativeOfflineAudioContext) throw createInvalidStateError();
      this._nativeAudioDestinationNode.channelCountMode = value;
    }
    get maxChannelCount() {
      return this._nativeAudioDestinationNode.maxChannelCount;
    }
  })(audioNodeConstructor, (renderInputsOfAudioNode => {
    const renderedNativeAudioDestinationNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeAudioDestinationNode = renderedNativeAudioDestinationNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeAudioDestinationNode ? Promise.resolve(renderedNativeAudioDestinationNode) : (async (proxy, nativeOfflineAudioContext) => {
          const nativeAudioDestinationNode = nativeOfflineAudioContext.destination;
          return renderedNativeAudioDestinationNodes.set(nativeOfflineAudioContext, nativeAudioDestinationNode), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeAudioDestinationNode), 
          nativeAudioDestinationNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  }), createIndexSizeError, createInvalidStateError, ((createNativeGainNode, overwriteAccessors) => (nativeContext, channelCount, isNodeOfNativeOfflineAudioContext) => {
    const nativeAudioDestinationNode = nativeContext.destination;
    // Bug #132: Safari does not have the correct channelCount.
        if (nativeAudioDestinationNode.channelCount !== channelCount) try {
      nativeAudioDestinationNode.channelCount = channelCount;
    } catch {
      // Bug #169: Safari throws an error on each attempt to change the channelCount.
    }
    // Bug #83: Safari does not have the correct channelCountMode.
        isNodeOfNativeOfflineAudioContext && "explicit" !== nativeAudioDestinationNode.channelCountMode && (nativeAudioDestinationNode.channelCountMode = "explicit"), 
    // Bug #47: The AudioDestinationNode in Safari does not initialize the maxChannelCount property correctly.
    0 === nativeAudioDestinationNode.maxChannelCount && Object.defineProperty(nativeAudioDestinationNode, "maxChannelCount", {
      value: channelCount
    });
    // Bug #168: No browser does yet have an AudioDestinationNode with an output.
    const gainNode = createNativeGainNode(nativeContext, {
      channelCount: channelCount,
      channelCountMode: nativeAudioDestinationNode.channelCountMode,
      channelInterpretation: nativeAudioDestinationNode.channelInterpretation,
      gain: 1
    });
    return overwriteAccessors(gainNode, "channelCount", (get => () => get.call(gainNode)), (set => value => {
      set.call(gainNode, value);
      try {
        nativeAudioDestinationNode.channelCount = value;
      } catch (err) {
        // Bug #169: Safari throws an error on each attempt to change the channelCount.
        if (value > nativeAudioDestinationNode.maxChannelCount) throw err;
      }
    })), overwriteAccessors(gainNode, "channelCountMode", (get => () => get.call(gainNode)), (set => value => {
      set.call(gainNode, value), nativeAudioDestinationNode.channelCountMode = value;
    })), overwriteAccessors(gainNode, "channelInterpretation", (get => () => get.call(gainNode)), (set => value => {
      set.call(gainNode, value), nativeAudioDestinationNode.channelInterpretation = value;
    })), Object.defineProperty(gainNode, "maxChannelCount", {
      get: () => nativeAudioDestinationNode.maxChannelCount
    }), 
    // @todo This should be disconnected when the context is closed.
    gainNode.connect(nativeAudioDestinationNode), gainNode;
  })(createNativeGainNode, overwriteAccessors), getNativeContext, isNativeOfflineAudioContext, renderInputsOfAudioNode);
  const createBiquadFilterNodeRenderer = ((connectAudioParam, createNativeBiquadFilterNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode) => () => {
    const renderedNativeBiquadFilterNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeBiquadFilterNode = renderedNativeBiquadFilterNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeBiquadFilterNode ? Promise.resolve(renderedNativeBiquadFilterNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeBiquadFilterNode = getNativeAudioNode(proxy);
          /*
               * If the initially used nativeBiquadFilterNode was not constructed on the same OfflineAudioContext it needs to be created
               * again.
               */          const nativeBiquadFilterNodeIsOwnedByContext = isOwnedByContext(nativeBiquadFilterNode, nativeOfflineAudioContext);
          if (!nativeBiquadFilterNodeIsOwnedByContext) {
            const options = {
              Q: nativeBiquadFilterNode.Q.value,
              channelCount: nativeBiquadFilterNode.channelCount,
              channelCountMode: nativeBiquadFilterNode.channelCountMode,
              channelInterpretation: nativeBiquadFilterNode.channelInterpretation,
              detune: nativeBiquadFilterNode.detune.value,
              frequency: nativeBiquadFilterNode.frequency.value,
              gain: nativeBiquadFilterNode.gain.value,
              type: nativeBiquadFilterNode.type
            };
            nativeBiquadFilterNode = createNativeBiquadFilterNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeBiquadFilterNodes.set(nativeOfflineAudioContext, nativeBiquadFilterNode), 
          nativeBiquadFilterNodeIsOwnedByContext ? (await connectAudioParam(nativeOfflineAudioContext, proxy.Q, nativeBiquadFilterNode.Q), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.detune, nativeBiquadFilterNode.detune), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.frequency, nativeBiquadFilterNode.frequency), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.gain, nativeBiquadFilterNode.gain)) : (await renderAutomation(nativeOfflineAudioContext, proxy.Q, nativeBiquadFilterNode.Q), 
          await renderAutomation(nativeOfflineAudioContext, proxy.detune, nativeBiquadFilterNode.detune), 
          await renderAutomation(nativeOfflineAudioContext, proxy.frequency, nativeBiquadFilterNode.frequency), 
          await renderAutomation(nativeOfflineAudioContext, proxy.gain, nativeBiquadFilterNode.gain)), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeBiquadFilterNode), 
          nativeBiquadFilterNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, createNativeBiquadFilterNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode);
  const setAudioNodeTailTime = (audioNodeTailTimeStore => (audioNode, tailTime) => audioNodeTailTimeStore.set(audioNode, tailTime))(audioNodeTailTimeStore);
  const biquadFilterNodeConstructor = ((audioNodeConstructor, createAudioParam, createBiquadFilterNodeRenderer, createInvalidAccessError, createNativeBiquadFilterNode, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$f,
        ...options
      };
      const nativeBiquadFilterNode = createNativeBiquadFilterNode(nativeContext, mergedOptions);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      super(context, !1, nativeBiquadFilterNode, isOffline ? createBiquadFilterNodeRenderer() : null), 
      // Bug #80: Safari does not export the correct values for maxValue and minValue.
      this._Q = createAudioParam(this, isOffline, nativeBiquadFilterNode.Q, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT), 
      // Bug #78: Firefox & Safari do not export the correct values for maxValue and minValue.
      this._detune = createAudioParam(this, isOffline, nativeBiquadFilterNode.detune, 1200 * Math.log2(MOST_POSITIVE_SINGLE_FLOAT), -1200 * Math.log2(MOST_POSITIVE_SINGLE_FLOAT)), 
      // Bug #77: Firefox & Safari do not export the correct value for minValue.
      this._frequency = createAudioParam(this, isOffline, nativeBiquadFilterNode.frequency, context.sampleRate / 2, 0), 
      // Bug #79: Firefox & Safari do not export the correct values for maxValue and minValue.
      this._gain = createAudioParam(this, isOffline, nativeBiquadFilterNode.gain, 40 * Math.log10(MOST_POSITIVE_SINGLE_FLOAT), MOST_NEGATIVE_SINGLE_FLOAT), 
      this._nativeBiquadFilterNode = nativeBiquadFilterNode, 
      // @todo Determine a meaningful tail-time instead of just using one second.
      setAudioNodeTailTime(this, 1);
    }
    get detune() {
      return this._detune;
    }
    get frequency() {
      return this._frequency;
    }
    get gain() {
      return this._gain;
    }
    get Q() {
      return this._Q;
    }
    get type() {
      return this._nativeBiquadFilterNode.type;
    }
    set type(value) {
      this._nativeBiquadFilterNode.type = value;
    }
    getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
      // Bug #189: Safari does throw an InvalidStateError.
      try {
        this._nativeBiquadFilterNode.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);
      } catch (err) {
        if (11 === err.code) throw createInvalidAccessError();
        throw err;
      }
      // Bug #68: Safari does not throw an error if the parameters differ in their length.
            if (frequencyHz.length !== magResponse.length || magResponse.length !== phaseResponse.length) throw createInvalidAccessError();
    }
  })(audioNodeConstructor, createAudioParam, createBiquadFilterNodeRenderer, createInvalidAccessError, createNativeBiquadFilterNode, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime);
  const monitorConnections = ((insertElementInSet, isNativeAudioNode) => (nativeAudioNode, whenConnected, whenDisconnected) => {
    const connections = new Set;
    return nativeAudioNode.connect = (connect => (destination, output = 0, input = 0) => {
      const wasDisconnected = 0 === connections.size;
      if (isNativeAudioNode(destination)) 
      // @todo TypeScript cannot infer the overloaded signature with 3 arguments yet.
      return connect.call(nativeAudioNode, destination, output, input), insertElementInSet(connections, [ destination, output, input ], (connection => connection[0] === destination && connection[1] === output && connection[2] === input), !0), 
      wasDisconnected && whenConnected(), destination;
      connect.call(nativeAudioNode, destination, output), insertElementInSet(connections, [ destination, output ], (connection => connection[0] === destination && connection[1] === output), !0), 
      wasDisconnected && whenConnected();
    })(nativeAudioNode.connect), nativeAudioNode.disconnect = (disconnect => (destinationOrOutput, output, input) => {
      const wasConnected = connections.size > 0;
      if (void 0 === destinationOrOutput) disconnect.apply(nativeAudioNode), connections.clear(); else if ("number" == typeof destinationOrOutput) {
        // @todo TypeScript cannot infer the overloaded signature with 1 argument yet.
        disconnect.call(nativeAudioNode, destinationOrOutput);
        for (const connection of connections) connection[1] === destinationOrOutput && connections.delete(connection);
      } else {
        isNativeAudioNode(destinationOrOutput) ? 
        // @todo TypeScript cannot infer the overloaded signature with 3 arguments yet.
        disconnect.call(nativeAudioNode, destinationOrOutput, output, input) : 
        // @todo TypeScript cannot infer the overloaded signature with 2 arguments yet.
        disconnect.call(nativeAudioNode, destinationOrOutput, output);
        for (const connection of connections) connection[0] !== destinationOrOutput || void 0 !== output && connection[1] !== output || void 0 !== input && connection[2] !== input || connections.delete(connection);
      }
      const isDisconnected = 0 === connections.size;
      wasConnected && isDisconnected && whenDisconnected();
    })(nativeAudioNode.disconnect), nativeAudioNode;
  })(insertElementInSet, isNativeAudioNode);
  const wrapChannelMergerNode = ((createInvalidStateError, monitorConnections) => (nativeContext, channelMergerNode) => {
    // Bug #15: Safari does not return the default properties.
    channelMergerNode.channelCount = 1, channelMergerNode.channelCountMode = "explicit", 
    // Bug #16: Safari does not throw an error when setting a different channelCount or channelCountMode.
    Object.defineProperty(channelMergerNode, "channelCount", {
      get: () => 1,
      set: () => {
        throw createInvalidStateError();
      }
    }), Object.defineProperty(channelMergerNode, "channelCountMode", {
      get: () => "explicit",
      set: () => {
        throw createInvalidStateError();
      }
    });
    // Bug #20: Safari requires a connection of any kind to treat the input signal correctly.
    const audioBufferSourceNode = nativeContext.createBufferSource();
    monitorConnections(channelMergerNode, (() => {
      const length = channelMergerNode.numberOfInputs;
      for (let i = 0; i < length; i += 1) audioBufferSourceNode.connect(channelMergerNode, 0, i);
    }), (() => audioBufferSourceNode.disconnect(channelMergerNode)));
  })(createInvalidStateError, monitorConnections);
  const createNativeChannelMergerNode = ((nativeAudioContextConstructor, wrapChannelMergerNode) => (nativeContext, options) => {
    const nativeChannelMergerNode = nativeContext.createChannelMerger(options.numberOfInputs);
    /*
           * Bug #20: Safari requires a connection of any kind to treat the input signal correctly.
           * @todo Unfortunately there is no way to test for this behavior in a synchronous fashion which is why testing for the existence of
           * the webkitAudioContext is used as a workaround here.
           */    return null !== nativeAudioContextConstructor && "webkitAudioContext" === nativeAudioContextConstructor.name && wrapChannelMergerNode(nativeContext, nativeChannelMergerNode), 
    assignNativeAudioNodeOptions(nativeChannelMergerNode, options), nativeChannelMergerNode;
  })(nativeAudioContextConstructor, wrapChannelMergerNode);
  const createChannelMergerNodeRenderer = ((createNativeChannelMergerNode, getNativeAudioNode, renderInputsOfAudioNode) => () => {
    const renderedNativeAudioNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeAudioNode = renderedNativeAudioNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeAudioNode ? Promise.resolve(renderedNativeAudioNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeAudioNode = getNativeAudioNode(proxy);
          // If the initially used nativeAudioNode was not constructed on the same OfflineAudioContext it needs to be created again.
                    if (!isOwnedByContext(nativeAudioNode, nativeOfflineAudioContext)) {
            const options = {
              channelCount: nativeAudioNode.channelCount,
              channelCountMode: nativeAudioNode.channelCountMode,
              channelInterpretation: nativeAudioNode.channelInterpretation,
              numberOfInputs: nativeAudioNode.numberOfInputs
            };
            nativeAudioNode = createNativeChannelMergerNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeAudioNodes.set(nativeOfflineAudioContext, nativeAudioNode), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeAudioNode), 
          nativeAudioNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(createNativeChannelMergerNode, getNativeAudioNode, renderInputsOfAudioNode);
  const channelMergerNodeConstructor = ((audioNodeConstructor, createChannelMergerNodeRenderer, createNativeChannelMergerNode, getNativeContext, isNativeOfflineAudioContext) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$e,
        ...options
      };
      super(context, !1, createNativeChannelMergerNode(nativeContext, mergedOptions), isNativeOfflineAudioContext(nativeContext) ? createChannelMergerNodeRenderer() : null);
    }
  })(audioNodeConstructor, createChannelMergerNodeRenderer, createNativeChannelMergerNode, getNativeContext, isNativeOfflineAudioContext);
  const createChannelSplitterNodeRenderer = ((createNativeChannelSplitterNode, getNativeAudioNode, renderInputsOfAudioNode) => () => {
    const renderedNativeAudioNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeAudioNode = renderedNativeAudioNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeAudioNode ? Promise.resolve(renderedNativeAudioNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeAudioNode = getNativeAudioNode(proxy);
          // If the initially used nativeAudioNode was not constructed on the same OfflineAudioContext it needs to be created again.
                    if (!isOwnedByContext(nativeAudioNode, nativeOfflineAudioContext)) {
            const options = {
              channelCount: nativeAudioNode.channelCount,
              channelCountMode: nativeAudioNode.channelCountMode,
              channelInterpretation: nativeAudioNode.channelInterpretation,
              numberOfOutputs: nativeAudioNode.numberOfOutputs
            };
            nativeAudioNode = createNativeChannelSplitterNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeAudioNodes.set(nativeOfflineAudioContext, nativeAudioNode), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeAudioNode), 
          nativeAudioNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(createNativeChannelSplitterNode, getNativeAudioNode, renderInputsOfAudioNode);
  const channelSplitterNodeConstructor = ((audioNodeConstructor, createChannelSplitterNodeRenderer, createNativeChannelSplitterNode, getNativeContext, isNativeOfflineAudioContext, sanitizeChannelSplitterOptions) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = sanitizeChannelSplitterOptions({
        ...DEFAULT_OPTIONS$d,
        ...options
      });
      super(context, !1, createNativeChannelSplitterNode(nativeContext, mergedOptions), isNativeOfflineAudioContext(nativeContext) ? createChannelSplitterNodeRenderer() : null);
    }
  })(audioNodeConstructor, createChannelSplitterNodeRenderer, createNativeChannelSplitterNode, getNativeContext, isNativeOfflineAudioContext, (options => ({
    ...options,
    channelCount: options.numberOfOutputs
  })));
  const createNativeConstantSourceNodeFaker = ((addSilentConnection, createNativeAudioBufferSourceNode, createNativeGainNode, monitorConnections) => (nativeContext, {offset: offset, ...audioNodeOptions}) => {
    const audioBuffer = nativeContext.createBuffer(1, 2, 44100);
    const audioBufferSourceNode = createNativeAudioBufferSourceNode(nativeContext, {
      buffer: null,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
      loop: !1,
      loopEnd: 0,
      loopStart: 0,
      playbackRate: 1
    });
    const gainNode = createNativeGainNode(nativeContext, {
      ...audioNodeOptions,
      gain: offset
    });
    // Bug #5: Safari does not support copyFromChannel() and copyToChannel().
        const channelData = audioBuffer.getChannelData(0);
    // Bug #95: Safari does not play or loop one sample buffers.
        channelData[0] = 1, channelData[1] = 1, audioBufferSourceNode.buffer = audioBuffer, 
    audioBufferSourceNode.loop = !0;
    const nativeConstantSourceNodeFaker = {
      get bufferSize() {},
      get channelCount() {
        return gainNode.channelCount;
      },
      set channelCount(value) {
        gainNode.channelCount = value;
      },
      get channelCountMode() {
        return gainNode.channelCountMode;
      },
      set channelCountMode(value) {
        gainNode.channelCountMode = value;
      },
      get channelInterpretation() {
        return gainNode.channelInterpretation;
      },
      set channelInterpretation(value) {
        gainNode.channelInterpretation = value;
      },
      get context() {
        return gainNode.context;
      },
      get inputs() {
        return [];
      },
      get numberOfInputs() {
        return audioBufferSourceNode.numberOfInputs;
      },
      get numberOfOutputs() {
        return gainNode.numberOfOutputs;
      },
      get offset() {
        return gainNode.gain;
      },
      get onended() {
        return audioBufferSourceNode.onended;
      },
      set onended(value) {
        audioBufferSourceNode.onended = value;
      },
      addEventListener: (...args) => audioBufferSourceNode.addEventListener(args[0], args[1], args[2]),
      dispatchEvent: (...args) => audioBufferSourceNode.dispatchEvent(args[0]),
      removeEventListener: (...args) => audioBufferSourceNode.removeEventListener(args[0], args[1], args[2]),
      start(when = 0) {
        audioBufferSourceNode.start.call(audioBufferSourceNode, when);
      },
      stop(when = 0) {
        audioBufferSourceNode.stop.call(audioBufferSourceNode, when);
      }
    };
    // Bug #175: Safari will not fire an ended event if the AudioBufferSourceNode is unconnected.
    return addSilentConnection(nativeContext, audioBufferSourceNode), monitorConnections(interceptConnections(nativeConstantSourceNodeFaker, gainNode), (() => audioBufferSourceNode.connect(gainNode)), (() => audioBufferSourceNode.disconnect(gainNode)));
  })(addSilentConnection, createNativeAudioBufferSourceNode, createNativeGainNode, monitorConnections);
  const createNativeConstantSourceNode = ((addSilentConnection, cacheTestResult, createNativeConstantSourceNodeFaker, testAudioScheduledSourceNodeStartMethodNegativeParametersSupport, testAudioScheduledSourceNodeStopMethodNegativeParametersSupport) => (nativeContext, options) => {
    // Bug #62: Safari does not support ConstantSourceNodes.
    if (void 0 === nativeContext.createConstantSource) return createNativeConstantSourceNodeFaker(nativeContext, options);
    const nativeConstantSourceNode = nativeContext.createConstantSource();
    return assignNativeAudioNodeOptions(nativeConstantSourceNode, options), assignNativeAudioNodeAudioParamValue(nativeConstantSourceNode, options, "offset"), 
    // Bug #44: Safari does not throw a RangeError yet.
    cacheTestResult(testAudioScheduledSourceNodeStartMethodNegativeParametersSupport, (() => testAudioScheduledSourceNodeStartMethodNegativeParametersSupport(nativeContext))) || wrapAudioScheduledSourceNodeStartMethodNegativeParameters(nativeConstantSourceNode), 
    // Bug #44: Only Firefox does not throw a RangeError yet.
    cacheTestResult(testAudioScheduledSourceNodeStopMethodNegativeParametersSupport, (() => testAudioScheduledSourceNodeStopMethodNegativeParametersSupport(nativeContext))) || wrapAudioScheduledSourceNodeStopMethodNegativeParameters(nativeConstantSourceNode), 
    // Bug #175: Safari will not fire an ended event if the ConstantSourceNode is unconnected.
    addSilentConnection(nativeContext, nativeConstantSourceNode), nativeConstantSourceNode;
  })(addSilentConnection, cacheTestResult, createNativeConstantSourceNodeFaker, testAudioScheduledSourceNodeStartMethodNegativeParametersSupport, testAudioScheduledSourceNodeStopMethodNegativeParametersSupport);
  const createConstantSourceNodeRenderer = ((connectAudioParam, createNativeConstantSourceNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode) => () => {
    const renderedNativeConstantSourceNodes = new WeakMap;
    let start = null;
    let stop = null;
    return {
      set start(value) {
        start = value;
      },
      set stop(value) {
        stop = value;
      },
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeConstantSourceNode = renderedNativeConstantSourceNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeConstantSourceNode ? Promise.resolve(renderedNativeConstantSourceNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeConstantSourceNode = getNativeAudioNode(proxy);
          /*
               * If the initially used nativeConstantSourceNode was not constructed on the same OfflineAudioContext it needs to be created
               * again.
               */          const nativeConstantSourceNodeIsOwnedByContext = isOwnedByContext(nativeConstantSourceNode, nativeOfflineAudioContext);
          if (!nativeConstantSourceNodeIsOwnedByContext) {
            const options = {
              channelCount: nativeConstantSourceNode.channelCount,
              channelCountMode: nativeConstantSourceNode.channelCountMode,
              channelInterpretation: nativeConstantSourceNode.channelInterpretation,
              offset: nativeConstantSourceNode.offset.value
            };
            nativeConstantSourceNode = createNativeConstantSourceNode(nativeOfflineAudioContext, options), 
            null !== start && nativeConstantSourceNode.start(start), null !== stop && nativeConstantSourceNode.stop(stop);
          }
          return renderedNativeConstantSourceNodes.set(nativeOfflineAudioContext, nativeConstantSourceNode), 
          nativeConstantSourceNodeIsOwnedByContext ? await connectAudioParam(nativeOfflineAudioContext, proxy.offset, nativeConstantSourceNode.offset) : await renderAutomation(nativeOfflineAudioContext, proxy.offset, nativeConstantSourceNode.offset), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeConstantSourceNode), 
          nativeConstantSourceNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, createNativeConstantSourceNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode);
  const constantSourceNodeConstructor = ((audioNodeConstructor, createAudioParam, createConstantSourceNodeRendererFactory, createNativeConstantSourceNode, getNativeContext, isNativeOfflineAudioContext, wrapEventListener) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$c,
        ...options
      };
      const nativeConstantSourceNode = createNativeConstantSourceNode(nativeContext, mergedOptions);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      const constantSourceNodeRenderer = isOffline ? createConstantSourceNodeRendererFactory() : null;
      super(context, !1, nativeConstantSourceNode, constantSourceNodeRenderer), this._constantSourceNodeRenderer = constantSourceNodeRenderer, 
      this._nativeConstantSourceNode = nativeConstantSourceNode, 
      /*
               * Bug #62 & #74: Safari does not support ConstantSourceNodes and does not export the correct values for maxValue and minValue
               * for GainNodes.
               */
      this._offset = createAudioParam(this, isOffline, nativeConstantSourceNode.offset, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT), 
      this._onended = null;
    }
    get offset() {
      return this._offset;
    }
    get onended() {
      return this._onended;
    }
    set onended(value) {
      const wrappedListener = "function" == typeof value ? wrapEventListener(this, value) : null;
      this._nativeConstantSourceNode.onended = wrappedListener;
      const nativeOnEnded = this._nativeConstantSourceNode.onended;
      this._onended = null !== nativeOnEnded && nativeOnEnded === wrappedListener ? value : nativeOnEnded;
    }
    start(when = 0) {
      if (this._nativeConstantSourceNode.start(when), null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.start = when), 
      "closed" !== this.context.state) {
        setInternalStateToActive(this);
        const resetInternalStateToPassive = () => {
          this._nativeConstantSourceNode.removeEventListener("ended", resetInternalStateToPassive), 
          isActiveAudioNode(this) && setInternalStateToPassive(this);
        };
        this._nativeConstantSourceNode.addEventListener("ended", resetInternalStateToPassive);
      }
    }
    stop(when = 0) {
      this._nativeConstantSourceNode.stop(when), null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.stop = when);
    }
  })(audioNodeConstructor, createAudioParam, createConstantSourceNodeRenderer, createNativeConstantSourceNode, getNativeContext, isNativeOfflineAudioContext, wrapEventListener);
  const createNativeConvolverNode = ((createNotSupportedError, overwriteAccessors) => (nativeContext, options) => {
    const nativeConvolverNode = nativeContext.createConvolver();
    // Bug #113: Safari does allow to set the channelCount to a value larger than 2.
    if (assignNativeAudioNodeOptions(nativeConvolverNode, options), 
    // The normalize property needs to be set before setting the buffer.
    options.disableNormalization === nativeConvolverNode.normalize && (nativeConvolverNode.normalize = !options.disableNormalization), 
    assignNativeAudioNodeOption(nativeConvolverNode, options, "buffer"), options.channelCount > 2) throw createNotSupportedError();
    // Bug #114: Safari allows to set the channelCountMode to 'max'.
    if (overwriteAccessors(nativeConvolverNode, "channelCount", (get => () => get.call(nativeConvolverNode)), (set => value => {
      if (value > 2) throw createNotSupportedError();
      return set.call(nativeConvolverNode, value);
    })), "max" === options.channelCountMode) throw createNotSupportedError();
    return overwriteAccessors(nativeConvolverNode, "channelCountMode", (get => () => get.call(nativeConvolverNode)), (set => value => {
      if ("max" === value) throw createNotSupportedError();
      return set.call(nativeConvolverNode, value);
    })), nativeConvolverNode;
  })(createNotSupportedError, overwriteAccessors);
  const createConvolverNodeRenderer = ((createNativeConvolverNode, getNativeAudioNode, renderInputsOfAudioNode) => () => {
    const renderedNativeConvolverNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeConvolverNode = renderedNativeConvolverNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeConvolverNode ? Promise.resolve(renderedNativeConvolverNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeConvolverNode = getNativeAudioNode(proxy);
          // If the initially used nativeConvolverNode was not constructed on the same OfflineAudioContext it needs to be created again.
                    if (!isOwnedByContext(nativeConvolverNode, nativeOfflineAudioContext)) {
            const options = {
              buffer: nativeConvolverNode.buffer,
              channelCount: nativeConvolverNode.channelCount,
              channelCountMode: nativeConvolverNode.channelCountMode,
              channelInterpretation: nativeConvolverNode.channelInterpretation,
              disableNormalization: !nativeConvolverNode.normalize
            };
            nativeConvolverNode = createNativeConvolverNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeConvolverNodes.set(nativeOfflineAudioContext, nativeConvolverNode), 
          isNativeAudioNodeFaker(nativeConvolverNode) ? await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeConvolverNode.inputs[0]) : await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeConvolverNode), 
          nativeConvolverNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(createNativeConvolverNode, getNativeAudioNode, renderInputsOfAudioNode);
  const convolverNodeConstructor = ((audioNodeConstructor, createConvolverNodeRenderer, createNativeConvolverNode, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$b,
        ...options
      };
      const nativeConvolverNode = createNativeConvolverNode(nativeContext, mergedOptions);
      super(context, !1, nativeConvolverNode, isNativeOfflineAudioContext(nativeContext) ? createConvolverNodeRenderer() : null), 
      this._isBufferNullified = !1, this._nativeConvolverNode = nativeConvolverNode, null !== mergedOptions.buffer && setAudioNodeTailTime(this, mergedOptions.buffer.duration);
    }
    get buffer() {
      return this._isBufferNullified ? null : this._nativeConvolverNode.buffer;
    }
    set buffer(value) {
      // Bug #115: Safari does not allow to set the buffer to null.
      if (this._nativeConvolverNode.buffer = value, null === value && null !== this._nativeConvolverNode.buffer) {
        const nativeContext = this._nativeConvolverNode.context;
        this._nativeConvolverNode.buffer = nativeContext.createBuffer(1, 1, nativeContext.sampleRate), 
        this._isBufferNullified = !0, setAudioNodeTailTime(this, 0);
      } else this._isBufferNullified = !1, setAudioNodeTailTime(this, null === this._nativeConvolverNode.buffer ? 0 : this._nativeConvolverNode.buffer.duration);
    }
    get normalize() {
      return this._nativeConvolverNode.normalize;
    }
    set normalize(value) {
      this._nativeConvolverNode.normalize = value;
    }
  })(audioNodeConstructor, createConvolverNodeRenderer, createNativeConvolverNode, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime);
  const createDelayNodeRenderer = ((connectAudioParam, createNativeDelayNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode) => maxDelayTime => {
    const renderedNativeDelayNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeDelayNode = renderedNativeDelayNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeDelayNode ? Promise.resolve(renderedNativeDelayNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeDelayNode = getNativeAudioNode(proxy);
          // If the initially used nativeDelayNode was not constructed on the same OfflineAudioContext it needs to be created again.
                    const nativeDelayNodeIsOwnedByContext = isOwnedByContext(nativeDelayNode, nativeOfflineAudioContext);
          if (!nativeDelayNodeIsOwnedByContext) {
            const options = {
              channelCount: nativeDelayNode.channelCount,
              channelCountMode: nativeDelayNode.channelCountMode,
              channelInterpretation: nativeDelayNode.channelInterpretation,
              delayTime: nativeDelayNode.delayTime.value,
              maxDelayTime: maxDelayTime
            };
            nativeDelayNode = createNativeDelayNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeDelayNodes.set(nativeOfflineAudioContext, nativeDelayNode), 
          nativeDelayNodeIsOwnedByContext ? await connectAudioParam(nativeOfflineAudioContext, proxy.delayTime, nativeDelayNode.delayTime) : await renderAutomation(nativeOfflineAudioContext, proxy.delayTime, nativeDelayNode.delayTime), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeDelayNode), 
          nativeDelayNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, createNativeDelayNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode);
  const delayNodeConstructor = ((audioNodeConstructor, createAudioParam, createDelayNodeRenderer, createNativeDelayNode, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$a,
        ...options
      };
      const nativeDelayNode = createNativeDelayNode(nativeContext, mergedOptions);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      super(context, !1, nativeDelayNode, isOffline ? createDelayNodeRenderer(mergedOptions.maxDelayTime) : null), 
      this._delayTime = createAudioParam(this, isOffline, nativeDelayNode.delayTime), 
      setAudioNodeTailTime(this, mergedOptions.maxDelayTime);
    }
    get delayTime() {
      return this._delayTime;
    }
  })(audioNodeConstructor, createAudioParam, createDelayNodeRenderer, createNativeDelayNode, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime);
  const createNativeDynamicsCompressorNode = (createNotSupportedError => (nativeContext, options) => {
    const nativeDynamicsCompressorNode = nativeContext.createDynamicsCompressor();
    // Bug #108: Safari allows a channelCount of three and above.
    if (assignNativeAudioNodeOptions(nativeDynamicsCompressorNode, options), options.channelCount > 2) throw createNotSupportedError();
    // Bug #109: Only Chrome and Firefox disallow a channelCountMode of 'max'.
        if ("max" === options.channelCountMode) throw createNotSupportedError();
    return assignNativeAudioNodeAudioParamValue(nativeDynamicsCompressorNode, options, "attack"), 
    assignNativeAudioNodeAudioParamValue(nativeDynamicsCompressorNode, options, "knee"), 
    assignNativeAudioNodeAudioParamValue(nativeDynamicsCompressorNode, options, "ratio"), 
    assignNativeAudioNodeAudioParamValue(nativeDynamicsCompressorNode, options, "release"), 
    assignNativeAudioNodeAudioParamValue(nativeDynamicsCompressorNode, options, "threshold"), 
    nativeDynamicsCompressorNode;
  })(createNotSupportedError);
  const createDynamicsCompressorNodeRenderer = ((connectAudioParam, createNativeDynamicsCompressorNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode) => () => {
    const renderedNativeDynamicsCompressorNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeDynamicsCompressorNode = renderedNativeDynamicsCompressorNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeDynamicsCompressorNode ? Promise.resolve(renderedNativeDynamicsCompressorNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeDynamicsCompressorNode = getNativeAudioNode(proxy);
          /*
               * If the initially used nativeDynamicsCompressorNode was not constructed on the same OfflineAudioContext it needs to be
               * created again.
               */          const nativeDynamicsCompressorNodeIsOwnedByContext = isOwnedByContext(nativeDynamicsCompressorNode, nativeOfflineAudioContext);
          if (!nativeDynamicsCompressorNodeIsOwnedByContext) {
            const options = {
              attack: nativeDynamicsCompressorNode.attack.value,
              channelCount: nativeDynamicsCompressorNode.channelCount,
              channelCountMode: nativeDynamicsCompressorNode.channelCountMode,
              channelInterpretation: nativeDynamicsCompressorNode.channelInterpretation,
              knee: nativeDynamicsCompressorNode.knee.value,
              ratio: nativeDynamicsCompressorNode.ratio.value,
              release: nativeDynamicsCompressorNode.release.value,
              threshold: nativeDynamicsCompressorNode.threshold.value
            };
            nativeDynamicsCompressorNode = createNativeDynamicsCompressorNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeDynamicsCompressorNodes.set(nativeOfflineAudioContext, nativeDynamicsCompressorNode), 
          nativeDynamicsCompressorNodeIsOwnedByContext ? (await connectAudioParam(nativeOfflineAudioContext, proxy.attack, nativeDynamicsCompressorNode.attack), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.knee, nativeDynamicsCompressorNode.knee), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.ratio, nativeDynamicsCompressorNode.ratio), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.release, nativeDynamicsCompressorNode.release), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.threshold, nativeDynamicsCompressorNode.threshold)) : (await renderAutomation(nativeOfflineAudioContext, proxy.attack, nativeDynamicsCompressorNode.attack), 
          await renderAutomation(nativeOfflineAudioContext, proxy.knee, nativeDynamicsCompressorNode.knee), 
          await renderAutomation(nativeOfflineAudioContext, proxy.ratio, nativeDynamicsCompressorNode.ratio), 
          await renderAutomation(nativeOfflineAudioContext, proxy.release, nativeDynamicsCompressorNode.release), 
          await renderAutomation(nativeOfflineAudioContext, proxy.threshold, nativeDynamicsCompressorNode.threshold)), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeDynamicsCompressorNode), 
          nativeDynamicsCompressorNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, createNativeDynamicsCompressorNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode);
  const dynamicsCompressorNodeConstructor = ((audioNodeConstructor, createAudioParam, createDynamicsCompressorNodeRenderer, createNativeDynamicsCompressorNode, createNotSupportedError, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$9,
        ...options
      };
      const nativeDynamicsCompressorNode = createNativeDynamicsCompressorNode(nativeContext, mergedOptions);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      super(context, !1, nativeDynamicsCompressorNode, isOffline ? createDynamicsCompressorNodeRenderer() : null), 
      this._attack = createAudioParam(this, isOffline, nativeDynamicsCompressorNode.attack), 
      this._knee = createAudioParam(this, isOffline, nativeDynamicsCompressorNode.knee), 
      this._nativeDynamicsCompressorNode = nativeDynamicsCompressorNode, this._ratio = createAudioParam(this, isOffline, nativeDynamicsCompressorNode.ratio), 
      this._release = createAudioParam(this, isOffline, nativeDynamicsCompressorNode.release), 
      this._threshold = createAudioParam(this, isOffline, nativeDynamicsCompressorNode.threshold), 
      setAudioNodeTailTime(this, .006);
    }
    get attack() {
      return this._attack;
    }
    // Bug #108: Safari allows a channelCount of three and above which is why the getter and setter needs to be overwritten here.
    get channelCount() {
      return this._nativeDynamicsCompressorNode.channelCount;
    }
    set channelCount(value) {
      const previousChannelCount = this._nativeDynamicsCompressorNode.channelCount;
      if (this._nativeDynamicsCompressorNode.channelCount = value, value > 2) throw this._nativeDynamicsCompressorNode.channelCount = previousChannelCount, 
      createNotSupportedError();
    }
    /*
           * Bug #109: Only Chrome and Firefox disallow a channelCountMode of 'max' yet which is why the getter and setter needs to be
           * overwritten here.
           */    get channelCountMode() {
      return this._nativeDynamicsCompressorNode.channelCountMode;
    }
    set channelCountMode(value) {
      const previousChannelCount = this._nativeDynamicsCompressorNode.channelCountMode;
      if (this._nativeDynamicsCompressorNode.channelCountMode = value, "max" === value) throw this._nativeDynamicsCompressorNode.channelCountMode = previousChannelCount, 
      createNotSupportedError();
    }
    get knee() {
      return this._knee;
    }
    get ratio() {
      return this._ratio;
    }
    get reduction() {
      // Bug #111: Safari returns an AudioParam instead of a number.
      return "number" == typeof this._nativeDynamicsCompressorNode.reduction.value ? this._nativeDynamicsCompressorNode.reduction.value : this._nativeDynamicsCompressorNode.reduction;
    }
    get release() {
      return this._release;
    }
    get threshold() {
      return this._threshold;
    }
  })(audioNodeConstructor, createAudioParam, createDynamicsCompressorNodeRenderer, createNativeDynamicsCompressorNode, createNotSupportedError, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime);
  const createGainNodeRenderer = ((connectAudioParam, createNativeGainNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode) => () => {
    const renderedNativeGainNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeGainNode = renderedNativeGainNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeGainNode ? Promise.resolve(renderedNativeGainNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeGainNode = getNativeAudioNode(proxy);
          // If the initially used nativeGainNode was not constructed on the same OfflineAudioContext it needs to be created again.
                    const nativeGainNodeIsOwnedByContext = isOwnedByContext(nativeGainNode, nativeOfflineAudioContext);
          if (!nativeGainNodeIsOwnedByContext) {
            const options = {
              channelCount: nativeGainNode.channelCount,
              channelCountMode: nativeGainNode.channelCountMode,
              channelInterpretation: nativeGainNode.channelInterpretation,
              gain: nativeGainNode.gain.value
            };
            nativeGainNode = createNativeGainNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeGainNodes.set(nativeOfflineAudioContext, nativeGainNode), nativeGainNodeIsOwnedByContext ? await connectAudioParam(nativeOfflineAudioContext, proxy.gain, nativeGainNode.gain) : await renderAutomation(nativeOfflineAudioContext, proxy.gain, nativeGainNode.gain), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeGainNode), 
          nativeGainNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, createNativeGainNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode);
  const gainNodeConstructor = ((audioNodeConstructor, createAudioParam, createGainNodeRenderer, createNativeGainNode, getNativeContext, isNativeOfflineAudioContext) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$8,
        ...options
      };
      const nativeGainNode = createNativeGainNode(nativeContext, mergedOptions);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      super(context, !1, nativeGainNode, isOffline ? createGainNodeRenderer() : null), 
      // Bug #74: Safari does not export the correct values for maxValue and minValue.
      this._gain = createAudioParam(this, isOffline, nativeGainNode.gain, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT);
    }
    get gain() {
      return this._gain;
    }
  })(audioNodeConstructor, createAudioParam, createGainNodeRenderer, createNativeGainNode, getNativeContext, isNativeOfflineAudioContext);
  const createNativeIIRFilterNodeFaker = ((createInvalidAccessError, createInvalidStateError, createNativeScriptProcessorNode, createNotSupportedError) => (nativeContext, baseLatency, {channelCount: channelCount, channelCountMode: channelCountMode, channelInterpretation: channelInterpretation, feedback: feedback, feedforward: feedforward}) => {
    const bufferSize = computeBufferSize(baseLatency, nativeContext.sampleRate);
    const convertedFeedback = feedback instanceof Float64Array ? feedback : new Float64Array(feedback);
    const convertedFeedforward = feedforward instanceof Float64Array ? feedforward : new Float64Array(feedforward);
    const feedbackLength = convertedFeedback.length;
    const feedforwardLength = convertedFeedforward.length;
    const minLength = Math.min(feedbackLength, feedforwardLength);
    if (0 === feedbackLength || feedbackLength > 20) throw createNotSupportedError();
    if (0 === convertedFeedback[0]) throw createInvalidStateError();
    if (0 === feedforwardLength || feedforwardLength > 20) throw createNotSupportedError();
    if (0 === convertedFeedforward[0]) throw createInvalidStateError();
    if (1 !== convertedFeedback[0]) {
      for (let i = 0; i < feedforwardLength; i += 1) convertedFeedforward[i] /= convertedFeedback[0];
      for (let i = 1; i < feedbackLength; i += 1) convertedFeedback[i] /= convertedFeedback[0];
    }
    const scriptProcessorNode = createNativeScriptProcessorNode(nativeContext, bufferSize, channelCount, channelCount);
    scriptProcessorNode.channelCount = channelCount, scriptProcessorNode.channelCountMode = channelCountMode, 
    scriptProcessorNode.channelInterpretation = channelInterpretation;
    const bufferIndexes = [];
    const xBuffers = [];
    const yBuffers = [];
    for (let i = 0; i < channelCount; i += 1) {
      bufferIndexes.push(0);
      const xBuffer = new Float32Array(32);
      const yBuffer = new Float32Array(32);
      xBuffer.fill(0), yBuffer.fill(0), xBuffers.push(xBuffer), yBuffers.push(yBuffer);
    }
    // tslint:disable-next-line:deprecation
        scriptProcessorNode.onaudioprocess = event => {
      const inputBuffer = event.inputBuffer;
      const outputBuffer = event.outputBuffer;
      const numberOfChannels = inputBuffer.numberOfChannels;
      for (let i = 0; i < numberOfChannels; i += 1) {
        const input = inputBuffer.getChannelData(i);
        const output = outputBuffer.getChannelData(i);
        bufferIndexes[i] = filterBuffer(convertedFeedback, feedbackLength, convertedFeedforward, feedforwardLength, minLength, xBuffers[i], yBuffers[i], bufferIndexes[i], 32, input, output);
      }
    };
    const nyquist = nativeContext.sampleRate / 2;
    return interceptConnections({
      get bufferSize() {
        return bufferSize;
      },
      get channelCount() {
        return scriptProcessorNode.channelCount;
      },
      set channelCount(value) {
        scriptProcessorNode.channelCount = value;
      },
      get channelCountMode() {
        return scriptProcessorNode.channelCountMode;
      },
      set channelCountMode(value) {
        scriptProcessorNode.channelCountMode = value;
      },
      get channelInterpretation() {
        return scriptProcessorNode.channelInterpretation;
      },
      set channelInterpretation(value) {
        scriptProcessorNode.channelInterpretation = value;
      },
      get context() {
        return scriptProcessorNode.context;
      },
      get inputs() {
        return [ scriptProcessorNode ];
      },
      get numberOfInputs() {
        return scriptProcessorNode.numberOfInputs;
      },
      get numberOfOutputs() {
        return scriptProcessorNode.numberOfOutputs;
      },
      addEventListener: (...args) => scriptProcessorNode.addEventListener(args[0], args[1], args[2]),
      dispatchEvent: (...args) => scriptProcessorNode.dispatchEvent(args[0]),
      getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
        if (frequencyHz.length !== magResponse.length || magResponse.length !== phaseResponse.length) throw createInvalidAccessError();
        const length = frequencyHz.length;
        for (let i = 0; i < length; i += 1) {
          const omega = -Math.PI * (frequencyHz[i] / nyquist);
          const z = [ Math.cos(omega), Math.sin(omega) ];
          const response = divide(evaluatePolynomial(convertedFeedforward, z), evaluatePolynomial(convertedFeedback, z));
          magResponse[i] = Math.sqrt(response[0] * response[0] + response[1] * response[1]), 
          phaseResponse[i] = Math.atan2(response[1], response[0]);
        }
      },
      removeEventListener: (...args) => scriptProcessorNode.removeEventListener(args[0], args[1], args[2])
    }, scriptProcessorNode);
  })(createInvalidAccessError, createInvalidStateError, createNativeScriptProcessorNode, createNotSupportedError);
  const renderNativeOfflineAudioContext = ((cacheTestResult, createNativeGainNode, createNativeScriptProcessorNode, testOfflineAudioContextCurrentTimeSupport) => nativeOfflineAudioContext => 
  // Bug #21: Safari does not support promises yet.
  cacheTestResult(testPromiseSupport, (() => testPromiseSupport(nativeOfflineAudioContext))) ? Promise.resolve(cacheTestResult(testOfflineAudioContextCurrentTimeSupport, testOfflineAudioContextCurrentTimeSupport)).then((isOfflineAudioContextCurrentTimeSupported => {
    if (!isOfflineAudioContextCurrentTimeSupported) {
      const scriptProcessorNode = createNativeScriptProcessorNode(nativeOfflineAudioContext, 512, 0, 1);
      nativeOfflineAudioContext.oncomplete = () => {
        scriptProcessorNode.onaudioprocess = null, // tslint:disable-line:deprecation
        scriptProcessorNode.disconnect();
      }, scriptProcessorNode.onaudioprocess = () => nativeOfflineAudioContext.currentTime // tslint:disable-line:deprecation
      , scriptProcessorNode.connect(nativeOfflineAudioContext.destination);
    }
    return nativeOfflineAudioContext.startRendering();
  })) : new Promise((resolve => {
    // Bug #48: Safari does not render an OfflineAudioContext without any connected node.
    const gainNode = createNativeGainNode(nativeOfflineAudioContext, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "discrete",
      gain: 0
    });
    nativeOfflineAudioContext.oncomplete = event => {
      gainNode.disconnect(), resolve(event.renderedBuffer);
    }, gainNode.connect(nativeOfflineAudioContext.destination), nativeOfflineAudioContext.startRendering();
  })))(cacheTestResult, createNativeGainNode, createNativeScriptProcessorNode, ((createNativeGainNode, nativeOfflineAudioContextConstructor) => () => {
    if (null === nativeOfflineAudioContextConstructor) return Promise.resolve(!1);
    const nativeOfflineAudioContext = new nativeOfflineAudioContextConstructor(1, 1, 44100);
    // Bug #48: Safari does not render an OfflineAudioContext without any connected node.
        const gainNode = createNativeGainNode(nativeOfflineAudioContext, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "discrete",
      gain: 0
    });
    // Bug #21: Safari does not support promises yet.
        return new Promise((resolve => {
      nativeOfflineAudioContext.oncomplete = () => {
        gainNode.disconnect(), resolve(0 !== nativeOfflineAudioContext.currentTime);
      }, nativeOfflineAudioContext.startRendering();
    }));
  })(createNativeGainNode, nativeOfflineAudioContextConstructor));
  const createIIRFilterNodeRenderer = ((createNativeAudioBufferSourceNode, getNativeAudioNode, nativeOfflineAudioContextConstructor, renderInputsOfAudioNode, renderNativeOfflineAudioContext) => (feedback, feedforward) => {
    const renderedNativeAudioNodes = new WeakMap;
    let filteredBufferPromise = null;
    const createAudioNode = async (proxy, nativeOfflineAudioContext) => {
      let nativeAudioBufferSourceNode = null;
      let nativeIIRFilterNode = getNativeAudioNode(proxy);
      // If the initially used nativeIIRFilterNode was not constructed on the same OfflineAudioContext it needs to be created again.
            const nativeIIRFilterNodeIsOwnedByContext = isOwnedByContext(nativeIIRFilterNode, nativeOfflineAudioContext);
      // Bug #9: Safari does not support IIRFilterNodes.
            if (void 0 === nativeOfflineAudioContext.createIIRFilter ? nativeAudioBufferSourceNode = createNativeAudioBufferSourceNode(nativeOfflineAudioContext, {
        buffer: null,
        channelCount: 2,
        channelCountMode: "max",
        channelInterpretation: "speakers",
        loop: !1,
        loopEnd: 0,
        loopStart: 0,
        playbackRate: 1
      }) : nativeIIRFilterNodeIsOwnedByContext || (
      // @todo TypeScript defines the parameters of createIIRFilter() as arrays of numbers.
      nativeIIRFilterNode = nativeOfflineAudioContext.createIIRFilter(feedforward, feedback)), 
      renderedNativeAudioNodes.set(nativeOfflineAudioContext, null === nativeAudioBufferSourceNode ? nativeIIRFilterNode : nativeAudioBufferSourceNode), 
      null !== nativeAudioBufferSourceNode) {
        if (null === filteredBufferPromise) {
          if (null === nativeOfflineAudioContextConstructor) throw new Error("Missing the native OfflineAudioContext constructor.");
          const partialOfflineAudioContext = new nativeOfflineAudioContextConstructor(
          // Bug #47: The AudioDestinationNode in Safari gets not initialized correctly.
          proxy.context.destination.channelCount, 
          // Bug #17: Safari does not yet expose the length.
          proxy.context.length, nativeOfflineAudioContext.sampleRate);
          filteredBufferPromise = (async () => {
            await renderInputsOfAudioNode(proxy, partialOfflineAudioContext, partialOfflineAudioContext.destination);
            return ((renderedBuffer, nativeOfflineAudioContext, feedback, feedforward) => {
              const convertedFeedback = feedback instanceof Float64Array ? feedback : new Float64Array(feedback);
              const convertedFeedforward = feedforward instanceof Float64Array ? feedforward : new Float64Array(feedforward);
              const feedbackLength = convertedFeedback.length;
              const feedforwardLength = convertedFeedforward.length;
              const minLength = Math.min(feedbackLength, feedforwardLength);
              if (1 !== convertedFeedback[0]) {
                for (let i = 0; i < feedbackLength; i += 1) convertedFeedforward[i] /= convertedFeedback[0];
                for (let i = 1; i < feedforwardLength; i += 1) convertedFeedback[i] /= convertedFeedback[0];
              }
              const xBuffer = new Float32Array(32);
              const yBuffer = new Float32Array(32);
              const filteredBuffer = nativeOfflineAudioContext.createBuffer(renderedBuffer.numberOfChannels, renderedBuffer.length, renderedBuffer.sampleRate);
              const numberOfChannels = renderedBuffer.numberOfChannels;
              for (let i = 0; i < numberOfChannels; i += 1) {
                const input = renderedBuffer.getChannelData(i);
                const output = filteredBuffer.getChannelData(i);
                xBuffer.fill(0), yBuffer.fill(0), filterBuffer(convertedFeedback, feedbackLength, convertedFeedforward, feedforwardLength, minLength, xBuffer, yBuffer, 0, 32, input, output);
              }
              return filteredBuffer;
            })(await renderNativeOfflineAudioContext(partialOfflineAudioContext), nativeOfflineAudioContext, feedback, feedforward);
          })();
        }
        const filteredBuffer = await filteredBufferPromise;
        return nativeAudioBufferSourceNode.buffer = filteredBuffer, nativeAudioBufferSourceNode.start(0), 
        nativeAudioBufferSourceNode;
      }
      return await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeIIRFilterNode), 
      nativeIIRFilterNode;
    };
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeAudioNode = renderedNativeAudioNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeAudioNode ? Promise.resolve(renderedNativeAudioNode) : createAudioNode(proxy, nativeOfflineAudioContext);
      }
    };
  })(createNativeAudioBufferSourceNode, getNativeAudioNode, nativeOfflineAudioContextConstructor, renderInputsOfAudioNode, renderNativeOfflineAudioContext);
  const createNativeIIRFilterNode = (createNativeIIRFilterNodeFaker => (nativeContext, baseLatency, options) => {
    // Bug #9: Safari does not support IIRFilterNodes.
    if (void 0 === nativeContext.createIIRFilter) return createNativeIIRFilterNodeFaker(nativeContext, baseLatency, options);
    // @todo TypeScript defines the parameters of createIIRFilter() as arrays of numbers.
        const nativeIIRFilterNode = nativeContext.createIIRFilter(options.feedforward, options.feedback);
    return assignNativeAudioNodeOptions(nativeIIRFilterNode, options), nativeIIRFilterNode;
  })(createNativeIIRFilterNodeFaker);
  const iIRFilterNodeConstructor = ((audioNodeConstructor, createNativeIIRFilterNode, createIIRFilterNodeRenderer, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$7,
        ...options
      };
      const nativeIIRFilterNode = createNativeIIRFilterNode(nativeContext, isOffline ? null : context.baseLatency, mergedOptions);
      super(context, !1, nativeIIRFilterNode, isOffline ? createIIRFilterNodeRenderer(mergedOptions.feedback, mergedOptions.feedforward) : null), 
      // Bug #23 & #24: FirefoxDeveloper does not throw an InvalidAccessError.
      // @todo Write a test which allows other browsers to remain unpatched.
      (nativeIIRFilterNode => {
        var getFrequencyResponse;
        nativeIIRFilterNode.getFrequencyResponse = (getFrequencyResponse = nativeIIRFilterNode.getFrequencyResponse, 
        (frequencyHz, magResponse, phaseResponse) => {
          if (frequencyHz.length !== magResponse.length || magResponse.length !== phaseResponse.length) throw createInvalidAccessError();
          return getFrequencyResponse.call(nativeIIRFilterNode, frequencyHz, magResponse, phaseResponse);
        });
      })(nativeIIRFilterNode), this._nativeIIRFilterNode = nativeIIRFilterNode, 
      // @todo Determine a meaningful tail-time instead of just using one second.
      setAudioNodeTailTime(this, 1);
    }
    getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
      return this._nativeIIRFilterNode.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);
    }
  })(audioNodeConstructor, createNativeIIRFilterNode, createIIRFilterNodeRenderer, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime);
  const createAudioListener = ((createAudioParam, createNativeChannelMergerNode, createNativeConstantSourceNode, createNativeScriptProcessorNode, createNotSupportedError, getFirstSample, isNativeOfflineAudioContext, overwriteAccessors) => (context, nativeContext) => {
    const nativeListener = nativeContext.listener;
    // Bug #117: Only Chrome & Edge support the new interface already.
        const {forwardX: forwardX, forwardY: forwardY, forwardZ: forwardZ, positionX: positionX, positionY: positionY, positionZ: positionZ, upX: upX, upY: upY, upZ: upZ} = void 0 === nativeListener.forwardX ? (() => {
      const buffer = new Float32Array(1);
      const channelMergerNode = createNativeChannelMergerNode(nativeContext, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "speakers",
        numberOfInputs: 9
      });
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      let isScriptProcessorNodeCreated = !1;
      let lastOrientation = [ 0, 0, -1, 0, 1, 0 ];
      let lastPosition = [ 0, 0, 0 ];
      const createScriptProcessorNode = () => {
        if (isScriptProcessorNodeCreated) return;
        isScriptProcessorNodeCreated = !0;
        const scriptProcessorNode = createNativeScriptProcessorNode(nativeContext, 256, 9, 0);
        // tslint:disable-next-line:deprecation
                scriptProcessorNode.onaudioprocess = ({inputBuffer: inputBuffer}) => {
          const orientation = [ getFirstSample(inputBuffer, buffer, 0), getFirstSample(inputBuffer, buffer, 1), getFirstSample(inputBuffer, buffer, 2), getFirstSample(inputBuffer, buffer, 3), getFirstSample(inputBuffer, buffer, 4), getFirstSample(inputBuffer, buffer, 5) ];
          orientation.some(((value, index) => value !== lastOrientation[index])) && (nativeListener.setOrientation(...orientation), 
          // tslint:disable-line:deprecation
          lastOrientation = orientation);
          const positon = [ getFirstSample(inputBuffer, buffer, 6), getFirstSample(inputBuffer, buffer, 7), getFirstSample(inputBuffer, buffer, 8) ];
          positon.some(((value, index) => value !== lastPosition[index])) && (nativeListener.setPosition(...positon), 
          // tslint:disable-line:deprecation
          lastPosition = positon);
        }, channelMergerNode.connect(scriptProcessorNode);
      };
      const createSetOrientation = index => value => {
        value !== lastOrientation[index] && (lastOrientation[index] = value, nativeListener.setOrientation(...lastOrientation));
      };
      const createSetPosition = index => value => {
        value !== lastPosition[index] && (lastPosition[index] = value, nativeListener.setPosition(...lastPosition));
      };
      const createFakeAudioParam = (input, initialValue, setValue) => {
        const constantSourceNode = createNativeConstantSourceNode(nativeContext, {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "discrete",
          offset: initialValue
        });
        constantSourceNode.connect(channelMergerNode, 0, input), 
        // @todo This should be stopped when the context is closed.
        constantSourceNode.start(), Object.defineProperty(constantSourceNode.offset, "defaultValue", {
          get: () => initialValue
        });
        /*
                   * Bug #62 & #74: Safari does not support ConstantSourceNodes and does not export the correct values for maxValue and
                   * minValue for GainNodes.
                   */
        const audioParam = createAudioParam({
          context: context
        }, isOffline, constantSourceNode.offset, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT);
        var cancelAndHoldAtTime;
        var cancelScheduledValues;
        var exponentialRampToValueAtTime;
        var linearRampToValueAtTime;
        var setTargetAtTime;
        var setValueAtTime;
        var setValueCurveAtTime;
        return overwriteAccessors(audioParam, "value", (get => () => get.call(audioParam)), (set => value => {
          try {
            set.call(audioParam, value);
          } catch (err) {
            if (9 !== err.code) throw err;
          }
          createScriptProcessorNode(), isOffline && 
          // Bug #117: Using setOrientation() and setPosition() doesn't work with an OfflineAudioContext.
          setValue(value);
        })), audioParam.cancelAndHoldAtTime = (cancelAndHoldAtTime = audioParam.cancelAndHoldAtTime, 
        isOffline ? () => {
          throw createNotSupportedError();
        } : (...args) => {
          const value = cancelAndHoldAtTime.apply(audioParam, args);
          return createScriptProcessorNode(), value;
        }), audioParam.cancelScheduledValues = (cancelScheduledValues = audioParam.cancelScheduledValues, 
        isOffline ? () => {
          throw createNotSupportedError();
        } : (...args) => {
          const value = cancelScheduledValues.apply(audioParam, args);
          return createScriptProcessorNode(), value;
        }), audioParam.exponentialRampToValueAtTime = (exponentialRampToValueAtTime = audioParam.exponentialRampToValueAtTime, 
        isOffline ? () => {
          throw createNotSupportedError();
        } : (...args) => {
          const value = exponentialRampToValueAtTime.apply(audioParam, args);
          return createScriptProcessorNode(), value;
        }), audioParam.linearRampToValueAtTime = (linearRampToValueAtTime = audioParam.linearRampToValueAtTime, 
        isOffline ? () => {
          throw createNotSupportedError();
        } : (...args) => {
          const value = linearRampToValueAtTime.apply(audioParam, args);
          return createScriptProcessorNode(), value;
        }), audioParam.setTargetAtTime = (setTargetAtTime = audioParam.setTargetAtTime, 
        isOffline ? () => {
          throw createNotSupportedError();
        } : (...args) => {
          const value = setTargetAtTime.apply(audioParam, args);
          return createScriptProcessorNode(), value;
        }), audioParam.setValueAtTime = (setValueAtTime = audioParam.setValueAtTime, isOffline ? () => {
          throw createNotSupportedError();
        } : (...args) => {
          const value = setValueAtTime.apply(audioParam, args);
          return createScriptProcessorNode(), value;
        }), audioParam.setValueCurveAtTime = (setValueCurveAtTime = audioParam.setValueCurveAtTime, 
        isOffline ? () => {
          throw createNotSupportedError();
        } : (...args) => {
          const value = setValueCurveAtTime.apply(audioParam, args);
          return createScriptProcessorNode(), value;
        }), audioParam;
      };
      return {
        forwardX: createFakeAudioParam(0, 0, createSetOrientation(0)),
        forwardY: createFakeAudioParam(1, 0, createSetOrientation(1)),
        forwardZ: createFakeAudioParam(2, -1, createSetOrientation(2)),
        positionX: createFakeAudioParam(6, 0, createSetPosition(0)),
        positionY: createFakeAudioParam(7, 0, createSetPosition(1)),
        positionZ: createFakeAudioParam(8, 0, createSetPosition(2)),
        upX: createFakeAudioParam(3, 0, createSetOrientation(3)),
        upY: createFakeAudioParam(4, 1, createSetOrientation(4)),
        upZ: createFakeAudioParam(5, 0, createSetOrientation(5))
      };
    })() : nativeListener;
    return {
      get forwardX() {
        return forwardX;
      },
      get forwardY() {
        return forwardY;
      },
      get forwardZ() {
        return forwardZ;
      },
      get positionX() {
        return positionX;
      },
      get positionY() {
        return positionY;
      },
      get positionZ() {
        return positionZ;
      },
      get upX() {
        return upX;
      },
      get upY() {
        return upY;
      },
      get upZ() {
        return upZ;
      }
    };
  })(createAudioParam, createNativeChannelMergerNode, createNativeConstantSourceNode, createNativeScriptProcessorNode, createNotSupportedError, getFirstSample, isNativeOfflineAudioContext, overwriteAccessors);
  const unrenderedAudioWorkletNodeStore = new WeakMap;
  const minimalBaseAudioContextConstructor = ((audioDestinationNodeConstructor, createAudioListener, eventTargetConstructor, isNativeOfflineAudioContext, unrenderedAudioWorkletNodeStore, wrapEventListener) => class extends eventTargetConstructor {
    constructor(_nativeContext, numberOfChannels) {
      super(_nativeContext), this._nativeContext = _nativeContext, CONTEXT_STORE.set(this, _nativeContext), 
      isNativeOfflineAudioContext(_nativeContext) && unrenderedAudioWorkletNodeStore.set(_nativeContext, new Set), 
      this._destination = new audioDestinationNodeConstructor(this, numberOfChannels), 
      this._listener = createAudioListener(this, _nativeContext), this._onstatechange = null;
    }
    get currentTime() {
      return this._nativeContext.currentTime;
    }
    get destination() {
      return this._destination;
    }
    get listener() {
      return this._listener;
    }
    get onstatechange() {
      return this._onstatechange;
    }
    set onstatechange(value) {
      const wrappedListener = "function" == typeof value ? wrapEventListener(this, value) : null;
      this._nativeContext.onstatechange = wrappedListener;
      const nativeOnStateChange = this._nativeContext.onstatechange;
      this._onstatechange = null !== nativeOnStateChange && nativeOnStateChange === wrappedListener ? value : nativeOnStateChange;
    }
    get sampleRate() {
      return this._nativeContext.sampleRate;
    }
    get state() {
      return this._nativeContext.state;
    }
  })(audioDestinationNodeConstructor, createAudioListener, eventTargetConstructor, isNativeOfflineAudioContext, unrenderedAudioWorkletNodeStore, wrapEventListener);
  const createNativeOscillatorNode = ((addSilentConnection, cacheTestResult, testAudioScheduledSourceNodeStartMethodNegativeParametersSupport, testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport, testAudioScheduledSourceNodeStopMethodNegativeParametersSupport, wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls) => (nativeContext, options) => {
    const nativeOscillatorNode = nativeContext.createOscillator();
    return assignNativeAudioNodeOptions(nativeOscillatorNode, options), assignNativeAudioNodeAudioParamValue(nativeOscillatorNode, options, "detune"), 
    assignNativeAudioNodeAudioParamValue(nativeOscillatorNode, options, "frequency"), 
    void 0 !== options.periodicWave ? nativeOscillatorNode.setPeriodicWave(options.periodicWave) : assignNativeAudioNodeOption(nativeOscillatorNode, options, "type"), 
    // Bug #44: Only Chrome & Edge throw a RangeError yet.
    cacheTestResult(testAudioScheduledSourceNodeStartMethodNegativeParametersSupport, (() => testAudioScheduledSourceNodeStartMethodNegativeParametersSupport(nativeContext))) || wrapAudioScheduledSourceNodeStartMethodNegativeParameters(nativeOscillatorNode), 
    // Bug #19: Safari does not ignore calls to stop() of an already stopped AudioBufferSourceNode.
    cacheTestResult(testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport, (() => testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport(nativeContext))) || wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls(nativeOscillatorNode, nativeContext), 
    // Bug #44: Only Firefox does not throw a RangeError yet.
    cacheTestResult(testAudioScheduledSourceNodeStopMethodNegativeParametersSupport, (() => testAudioScheduledSourceNodeStopMethodNegativeParametersSupport(nativeContext))) || wrapAudioScheduledSourceNodeStopMethodNegativeParameters(nativeOscillatorNode), 
    // Bug #175: Safari will not fire an ended event if the OscillatorNode is unconnected.
    addSilentConnection(nativeContext, nativeOscillatorNode), nativeOscillatorNode;
  })(addSilentConnection, cacheTestResult, testAudioScheduledSourceNodeStartMethodNegativeParametersSupport, testAudioScheduledSourceNodeStopMethodConsecutiveCallsSupport, testAudioScheduledSourceNodeStopMethodNegativeParametersSupport, wrapAudioScheduledSourceNodeStopMethodConsecutiveCalls);
  const createOscillatorNodeRenderer = ((connectAudioParam, createNativeOscillatorNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode) => () => {
    const renderedNativeOscillatorNodes = new WeakMap;
    let periodicWave = null;
    let start = null;
    let stop = null;
    return {
      set periodicWave(value) {
        periodicWave = value;
      },
      set start(value) {
        start = value;
      },
      set stop(value) {
        stop = value;
      },
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeOscillatorNode = renderedNativeOscillatorNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeOscillatorNode ? Promise.resolve(renderedNativeOscillatorNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeOscillatorNode = getNativeAudioNode(proxy);
          // If the initially used nativeOscillatorNode was not constructed on the same OfflineAudioContext it needs to be created again.
                    const nativeOscillatorNodeIsOwnedByContext = isOwnedByContext(nativeOscillatorNode, nativeOfflineAudioContext);
          if (!nativeOscillatorNodeIsOwnedByContext) {
            const options = {
              channelCount: nativeOscillatorNode.channelCount,
              channelCountMode: nativeOscillatorNode.channelCountMode,
              channelInterpretation: nativeOscillatorNode.channelInterpretation,
              detune: nativeOscillatorNode.detune.value,
              frequency: nativeOscillatorNode.frequency.value,
              periodicWave: null === periodicWave ? void 0 : periodicWave,
              type: nativeOscillatorNode.type
            };
            nativeOscillatorNode = createNativeOscillatorNode(nativeOfflineAudioContext, options), 
            null !== start && nativeOscillatorNode.start(start), null !== stop && nativeOscillatorNode.stop(stop);
          }
          return renderedNativeOscillatorNodes.set(nativeOfflineAudioContext, nativeOscillatorNode), 
          nativeOscillatorNodeIsOwnedByContext ? (await connectAudioParam(nativeOfflineAudioContext, proxy.detune, nativeOscillatorNode.detune), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.frequency, nativeOscillatorNode.frequency)) : (await renderAutomation(nativeOfflineAudioContext, proxy.detune, nativeOscillatorNode.detune), 
          await renderAutomation(nativeOfflineAudioContext, proxy.frequency, nativeOscillatorNode.frequency)), 
          await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeOscillatorNode), 
          nativeOscillatorNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, createNativeOscillatorNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode);
  const oscillatorNodeConstructor = ((audioNodeConstructor, createAudioParam, createNativeOscillatorNode, createOscillatorNodeRenderer, getNativeContext, isNativeOfflineAudioContext, wrapEventListener) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$4,
        ...options
      };
      const nativeOscillatorNode = createNativeOscillatorNode(nativeContext, mergedOptions);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      const oscillatorNodeRenderer = isOffline ? createOscillatorNodeRenderer() : null;
      const nyquist = context.sampleRate / 2;
      super(context, !1, nativeOscillatorNode, oscillatorNodeRenderer), 
      // Bug #81: Firefox & Safari do not export the correct values for maxValue and minValue.
      this._detune = createAudioParam(this, isOffline, nativeOscillatorNode.detune, 153600, -153600), 
      // Bug #76: Safari does not export the correct values for maxValue and minValue.
      this._frequency = createAudioParam(this, isOffline, nativeOscillatorNode.frequency, nyquist, -nyquist), 
      this._nativeOscillatorNode = nativeOscillatorNode, this._onended = null, this._oscillatorNodeRenderer = oscillatorNodeRenderer, 
      null !== this._oscillatorNodeRenderer && void 0 !== mergedOptions.periodicWave && (this._oscillatorNodeRenderer.periodicWave = mergedOptions.periodicWave);
    }
    get detune() {
      return this._detune;
    }
    get frequency() {
      return this._frequency;
    }
    get onended() {
      return this._onended;
    }
    set onended(value) {
      const wrappedListener = "function" == typeof value ? wrapEventListener(this, value) : null;
      this._nativeOscillatorNode.onended = wrappedListener;
      const nativeOnEnded = this._nativeOscillatorNode.onended;
      this._onended = null !== nativeOnEnded && nativeOnEnded === wrappedListener ? value : nativeOnEnded;
    }
    get type() {
      return this._nativeOscillatorNode.type;
    }
    set type(value) {
      this._nativeOscillatorNode.type = value, null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = null);
    }
    setPeriodicWave(periodicWave) {
      this._nativeOscillatorNode.setPeriodicWave(periodicWave), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = periodicWave);
    }
    start(when = 0) {
      if (this._nativeOscillatorNode.start(when), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.start = when), 
      "closed" !== this.context.state) {
        setInternalStateToActive(this);
        const resetInternalStateToPassive = () => {
          this._nativeOscillatorNode.removeEventListener("ended", resetInternalStateToPassive), 
          isActiveAudioNode(this) && setInternalStateToPassive(this);
        };
        this._nativeOscillatorNode.addEventListener("ended", resetInternalStateToPassive);
      }
    }
    stop(when = 0) {
      this._nativeOscillatorNode.stop(when), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.stop = when);
    }
  })(audioNodeConstructor, createAudioParam, createNativeOscillatorNode, createOscillatorNodeRenderer, getNativeContext, isNativeOfflineAudioContext, wrapEventListener);
  const createConnectedNativeAudioBufferSourceNode = (createNativeAudioBufferSourceNode => (nativeContext, nativeAudioNode) => {
    const nativeAudioBufferSourceNode = createNativeAudioBufferSourceNode(nativeContext, {
      buffer: null,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
      loop: !1,
      loopEnd: 0,
      loopStart: 0,
      playbackRate: 1
    });
    const nativeAudioBuffer = nativeContext.createBuffer(1, 2, 44100);
    return nativeAudioBufferSourceNode.buffer = nativeAudioBuffer, nativeAudioBufferSourceNode.loop = !0, 
    nativeAudioBufferSourceNode.connect(nativeAudioNode), nativeAudioBufferSourceNode.start(), 
    () => {
      nativeAudioBufferSourceNode.stop(), nativeAudioBufferSourceNode.disconnect(nativeAudioNode);
    };
  })(createNativeAudioBufferSourceNode);
  const createNativeWaveShaperNodeFaker = ((createConnectedNativeAudioBufferSourceNode, createInvalidStateError, createNativeGainNode, isDCCurve, monitorConnections) => (nativeContext, {curve: curve, oversample: oversample, ...audioNodeOptions}) => {
    const negativeWaveShaperNode = nativeContext.createWaveShaper();
    const positiveWaveShaperNode = nativeContext.createWaveShaper();
    assignNativeAudioNodeOptions(negativeWaveShaperNode, audioNodeOptions), assignNativeAudioNodeOptions(positiveWaveShaperNode, audioNodeOptions);
    const inputGainNode = createNativeGainNode(nativeContext, {
      ...audioNodeOptions,
      gain: 1
    });
    const invertGainNode = createNativeGainNode(nativeContext, {
      ...audioNodeOptions,
      gain: -1
    });
    const outputGainNode = createNativeGainNode(nativeContext, {
      ...audioNodeOptions,
      gain: 1
    });
    const revertGainNode = createNativeGainNode(nativeContext, {
      ...audioNodeOptions,
      gain: -1
    });
    let disconnectNativeAudioBufferSourceNode = null;
    let isConnected = !1;
    let unmodifiedCurve = null;
    const nativeWaveShaperNodeFaker = {
      get bufferSize() {},
      get channelCount() {
        return negativeWaveShaperNode.channelCount;
      },
      set channelCount(value) {
        inputGainNode.channelCount = value, invertGainNode.channelCount = value, negativeWaveShaperNode.channelCount = value, 
        outputGainNode.channelCount = value, positiveWaveShaperNode.channelCount = value, 
        revertGainNode.channelCount = value;
      },
      get channelCountMode() {
        return negativeWaveShaperNode.channelCountMode;
      },
      set channelCountMode(value) {
        inputGainNode.channelCountMode = value, invertGainNode.channelCountMode = value, 
        negativeWaveShaperNode.channelCountMode = value, outputGainNode.channelCountMode = value, 
        positiveWaveShaperNode.channelCountMode = value, revertGainNode.channelCountMode = value;
      },
      get channelInterpretation() {
        return negativeWaveShaperNode.channelInterpretation;
      },
      set channelInterpretation(value) {
        inputGainNode.channelInterpretation = value, invertGainNode.channelInterpretation = value, 
        negativeWaveShaperNode.channelInterpretation = value, outputGainNode.channelInterpretation = value, 
        positiveWaveShaperNode.channelInterpretation = value, revertGainNode.channelInterpretation = value;
      },
      get context() {
        return negativeWaveShaperNode.context;
      },
      get curve() {
        return unmodifiedCurve;
      },
      set curve(value) {
        // Bug #102: Safari does not throw an InvalidStateError when the curve has less than two samples.
        if (null !== value && value.length < 2) throw createInvalidStateError();
        if (null === value) negativeWaveShaperNode.curve = value, positiveWaveShaperNode.curve = value; else {
          const curveLength = value.length;
          const negativeCurve = new Float32Array(curveLength + 2 - curveLength % 2);
          const positiveCurve = new Float32Array(curveLength + 2 - curveLength % 2);
          negativeCurve[0] = value[0], positiveCurve[0] = -value[curveLength - 1];
          const length = Math.ceil((curveLength + 1) / 2);
          const centerIndex = (curveLength + 1) / 2 - 1;
          for (let i = 1; i < length; i += 1) {
            const theoreticIndex = i / length * centerIndex;
            const lowerIndex = Math.floor(theoreticIndex);
            const upperIndex = Math.ceil(theoreticIndex);
            negativeCurve[i] = lowerIndex === upperIndex ? value[lowerIndex] : (1 - (theoreticIndex - lowerIndex)) * value[lowerIndex] + (1 - (upperIndex - theoreticIndex)) * value[upperIndex], 
            positiveCurve[i] = lowerIndex === upperIndex ? -value[curveLength - 1 - lowerIndex] : -(1 - (theoreticIndex - lowerIndex)) * value[curveLength - 1 - lowerIndex] - (1 - (upperIndex - theoreticIndex)) * value[curveLength - 1 - upperIndex];
          }
          negativeCurve[length] = curveLength % 2 == 1 ? value[length - 1] : (value[length - 2] + value[length - 1]) / 2, 
          negativeWaveShaperNode.curve = negativeCurve, positiveWaveShaperNode.curve = positiveCurve;
        }
        unmodifiedCurve = value, isConnected && (isDCCurve(unmodifiedCurve) && null === disconnectNativeAudioBufferSourceNode ? disconnectNativeAudioBufferSourceNode = createConnectedNativeAudioBufferSourceNode(nativeContext, inputGainNode) : null !== disconnectNativeAudioBufferSourceNode && (disconnectNativeAudioBufferSourceNode(), 
        disconnectNativeAudioBufferSourceNode = null));
      },
      get inputs() {
        return [ inputGainNode ];
      },
      get numberOfInputs() {
        return negativeWaveShaperNode.numberOfInputs;
      },
      get numberOfOutputs() {
        return negativeWaveShaperNode.numberOfOutputs;
      },
      get oversample() {
        return negativeWaveShaperNode.oversample;
      },
      set oversample(value) {
        negativeWaveShaperNode.oversample = value, positiveWaveShaperNode.oversample = value;
      },
      addEventListener: (...args) => inputGainNode.addEventListener(args[0], args[1], args[2]),
      dispatchEvent: (...args) => inputGainNode.dispatchEvent(args[0]),
      removeEventListener: (...args) => inputGainNode.removeEventListener(args[0], args[1], args[2])
    };
    null !== curve && (
    // Only values of type Float32Array can be assigned to the curve property.
    nativeWaveShaperNodeFaker.curve = curve instanceof Float32Array ? curve : new Float32Array(curve)), 
    oversample !== nativeWaveShaperNodeFaker.oversample && (nativeWaveShaperNodeFaker.oversample = oversample);
    return monitorConnections(interceptConnections(nativeWaveShaperNodeFaker, outputGainNode), (() => {
      inputGainNode.connect(negativeWaveShaperNode).connect(outputGainNode), inputGainNode.connect(invertGainNode).connect(positiveWaveShaperNode).connect(revertGainNode).connect(outputGainNode), 
      isConnected = !0, isDCCurve(unmodifiedCurve) && (disconnectNativeAudioBufferSourceNode = createConnectedNativeAudioBufferSourceNode(nativeContext, inputGainNode));
    }), (() => {
      inputGainNode.disconnect(negativeWaveShaperNode), negativeWaveShaperNode.disconnect(outputGainNode), 
      inputGainNode.disconnect(invertGainNode), invertGainNode.disconnect(positiveWaveShaperNode), 
      positiveWaveShaperNode.disconnect(revertGainNode), revertGainNode.disconnect(outputGainNode), 
      isConnected = !1, null !== disconnectNativeAudioBufferSourceNode && (disconnectNativeAudioBufferSourceNode(), 
      disconnectNativeAudioBufferSourceNode = null);
    }));
  })(createConnectedNativeAudioBufferSourceNode, createInvalidStateError, createNativeGainNode, isDCCurve, monitorConnections);
  const createNativeWaveShaperNode = ((createConnectedNativeAudioBufferSourceNode, createInvalidStateError, createNativeWaveShaperNodeFaker, isDCCurve, monitorConnections, nativeAudioContextConstructor, overwriteAccessors) => (nativeContext, options) => {
    const nativeWaveShaperNode = nativeContext.createWaveShaper();
    /*
           * Bug #119: Safari does not correctly map the values.
           * @todo Unfortunately there is no way to test for this behavior in a synchronous fashion which is why testing for the existence of
           * the webkitAudioContext is used as a workaround here. Testing for the automationRate property is necessary because this workaround
           * isn't necessary anymore since v14.0.2 of Safari.
           */    if (null !== nativeAudioContextConstructor && "webkitAudioContext" === nativeAudioContextConstructor.name && void 0 === nativeContext.createGain().gain.automationRate) return createNativeWaveShaperNodeFaker(nativeContext, options);
    assignNativeAudioNodeOptions(nativeWaveShaperNode, options);
    const curve = null === options.curve || options.curve instanceof Float32Array ? options.curve : new Float32Array(options.curve);
    // Bug #104: Chrome and Edge will throw an InvalidAccessError when the curve has less than two samples.
        if (null !== curve && curve.length < 2) throw createInvalidStateError();
    // Only values of type Float32Array can be assigned to the curve property.
        assignNativeAudioNodeOption(nativeWaveShaperNode, {
      curve: curve
    }, "curve"), assignNativeAudioNodeOption(nativeWaveShaperNode, options, "oversample");
    let disconnectNativeAudioBufferSourceNode = null;
    let isConnected = !1;
    overwriteAccessors(nativeWaveShaperNode, "curve", (get => () => get.call(nativeWaveShaperNode)), (set => value => (set.call(nativeWaveShaperNode, value), 
    isConnected && (isDCCurve(value) && null === disconnectNativeAudioBufferSourceNode ? disconnectNativeAudioBufferSourceNode = createConnectedNativeAudioBufferSourceNode(nativeContext, nativeWaveShaperNode) : isDCCurve(value) || null === disconnectNativeAudioBufferSourceNode || (disconnectNativeAudioBufferSourceNode(), 
    disconnectNativeAudioBufferSourceNode = null)), value)));
    return monitorConnections(nativeWaveShaperNode, (() => {
      isConnected = !0, isDCCurve(nativeWaveShaperNode.curve) && (disconnectNativeAudioBufferSourceNode = createConnectedNativeAudioBufferSourceNode(nativeContext, nativeWaveShaperNode));
    }), (() => {
      isConnected = !1, null !== disconnectNativeAudioBufferSourceNode && (disconnectNativeAudioBufferSourceNode(), 
      disconnectNativeAudioBufferSourceNode = null);
    }));
  })(createConnectedNativeAudioBufferSourceNode, createInvalidStateError, createNativeWaveShaperNodeFaker, isDCCurve, monitorConnections, nativeAudioContextConstructor, overwriteAccessors);
  const createNativePannerNodeFaker = ((connectNativeAudioNodeToNativeAudioNode, createInvalidStateError, createNativeChannelMergerNode, createNativeGainNode, createNativeScriptProcessorNode, createNativeWaveShaperNode, createNotSupportedError, disconnectNativeAudioNodeFromNativeAudioNode, getFirstSample, monitorConnections) => (nativeContext, {coneInnerAngle: coneInnerAngle, coneOuterAngle: coneOuterAngle, coneOuterGain: coneOuterGain, distanceModel: distanceModel, maxDistance: maxDistance, orientationX: orientationX, orientationY: orientationY, orientationZ: orientationZ, panningModel: panningModel, positionX: positionX, positionY: positionY, positionZ: positionZ, refDistance: refDistance, rolloffFactor: rolloffFactor, ...audioNodeOptions}) => {
    const pannerNode = nativeContext.createPanner();
    // Bug #125: Safari does not throw an error yet.
        if (audioNodeOptions.channelCount > 2) throw createNotSupportedError();
    // Bug #126: Safari does not throw an error yet.
        if ("max" === audioNodeOptions.channelCountMode) throw createNotSupportedError();
    assignNativeAudioNodeOptions(pannerNode, audioNodeOptions);
    const SINGLE_CHANNEL_OPTIONS = {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "discrete"
    };
    const channelMergerNode = createNativeChannelMergerNode(nativeContext, {
      ...SINGLE_CHANNEL_OPTIONS,
      channelInterpretation: "speakers",
      numberOfInputs: 6
    });
    const inputGainNode = createNativeGainNode(nativeContext, {
      ...audioNodeOptions,
      gain: 1
    });
    const orientationXGainNode = createNativeGainNode(nativeContext, {
      ...SINGLE_CHANNEL_OPTIONS,
      gain: 1
    });
    const orientationYGainNode = createNativeGainNode(nativeContext, {
      ...SINGLE_CHANNEL_OPTIONS,
      gain: 0
    });
    const orientationZGainNode = createNativeGainNode(nativeContext, {
      ...SINGLE_CHANNEL_OPTIONS,
      gain: 0
    });
    const positionXGainNode = createNativeGainNode(nativeContext, {
      ...SINGLE_CHANNEL_OPTIONS,
      gain: 0
    });
    const positionYGainNode = createNativeGainNode(nativeContext, {
      ...SINGLE_CHANNEL_OPTIONS,
      gain: 0
    });
    const positionZGainNode = createNativeGainNode(nativeContext, {
      ...SINGLE_CHANNEL_OPTIONS,
      gain: 0
    });
    const scriptProcessorNode = createNativeScriptProcessorNode(nativeContext, 256, 6, 1);
    const waveShaperNode = createNativeWaveShaperNode(nativeContext, {
      ...SINGLE_CHANNEL_OPTIONS,
      curve: new Float32Array([ 1, 1 ]),
      oversample: "none"
    });
    let lastOrientation = [ orientationX, orientationY, orientationZ ];
    let lastPosition = [ positionX, positionY, positionZ ];
    const buffer = new Float32Array(1);
    // tslint:disable-next-line:deprecation
        scriptProcessorNode.onaudioprocess = ({inputBuffer: inputBuffer}) => {
      const orientation = [ getFirstSample(inputBuffer, buffer, 0), getFirstSample(inputBuffer, buffer, 1), getFirstSample(inputBuffer, buffer, 2) ];
      orientation.some(((value, index) => value !== lastOrientation[index])) && (pannerNode.setOrientation(...orientation), 
      // tslint:disable-line:deprecation
      lastOrientation = orientation);
      const positon = [ getFirstSample(inputBuffer, buffer, 3), getFirstSample(inputBuffer, buffer, 4), getFirstSample(inputBuffer, buffer, 5) ];
      positon.some(((value, index) => value !== lastPosition[index])) && (pannerNode.setPosition(...positon), 
      // tslint:disable-line:deprecation
      lastPosition = positon);
    }, Object.defineProperty(orientationYGainNode.gain, "defaultValue", {
      get: () => 0
    }), Object.defineProperty(orientationZGainNode.gain, "defaultValue", {
      get: () => 0
    }), Object.defineProperty(positionXGainNode.gain, "defaultValue", {
      get: () => 0
    }), Object.defineProperty(positionYGainNode.gain, "defaultValue", {
      get: () => 0
    }), Object.defineProperty(positionZGainNode.gain, "defaultValue", {
      get: () => 0
    });
    const nativePannerNodeFaker = {
      get bufferSize() {},
      get channelCount() {
        return pannerNode.channelCount;
      },
      set channelCount(value) {
        // Bug #125: Safari does not throw an error yet.
        if (value > 2) throw createNotSupportedError();
        inputGainNode.channelCount = value, pannerNode.channelCount = value;
      },
      get channelCountMode() {
        return pannerNode.channelCountMode;
      },
      set channelCountMode(value) {
        // Bug #126: Safari does not throw an error yet.
        if ("max" === value) throw createNotSupportedError();
        inputGainNode.channelCountMode = value, pannerNode.channelCountMode = value;
      },
      get channelInterpretation() {
        return pannerNode.channelInterpretation;
      },
      set channelInterpretation(value) {
        inputGainNode.channelInterpretation = value, pannerNode.channelInterpretation = value;
      },
      get coneInnerAngle() {
        return pannerNode.coneInnerAngle;
      },
      set coneInnerAngle(value) {
        pannerNode.coneInnerAngle = value;
      },
      get coneOuterAngle() {
        return pannerNode.coneOuterAngle;
      },
      set coneOuterAngle(value) {
        pannerNode.coneOuterAngle = value;
      },
      get coneOuterGain() {
        return pannerNode.coneOuterGain;
      },
      set coneOuterGain(value) {
        // Bug #127: Safari does not throw an InvalidStateError yet.
        if (value < 0 || value > 1) throw createInvalidStateError();
        pannerNode.coneOuterGain = value;
      },
      get context() {
        return pannerNode.context;
      },
      get distanceModel() {
        return pannerNode.distanceModel;
      },
      set distanceModel(value) {
        pannerNode.distanceModel = value;
      },
      get inputs() {
        return [ inputGainNode ];
      },
      get maxDistance() {
        return pannerNode.maxDistance;
      },
      set maxDistance(value) {
        // Bug #128: Safari does not throw an error yet.
        if (value < 0) throw new RangeError;
        pannerNode.maxDistance = value;
      },
      get numberOfInputs() {
        return pannerNode.numberOfInputs;
      },
      get numberOfOutputs() {
        return pannerNode.numberOfOutputs;
      },
      get orientationX() {
        return orientationXGainNode.gain;
      },
      get orientationY() {
        return orientationYGainNode.gain;
      },
      get orientationZ() {
        return orientationZGainNode.gain;
      },
      get panningModel() {
        return pannerNode.panningModel;
      },
      set panningModel(value) {
        pannerNode.panningModel = value;
      },
      get positionX() {
        return positionXGainNode.gain;
      },
      get positionY() {
        return positionYGainNode.gain;
      },
      get positionZ() {
        return positionZGainNode.gain;
      },
      get refDistance() {
        return pannerNode.refDistance;
      },
      set refDistance(value) {
        // Bug #129: Safari does not throw an error yet.
        if (value < 0) throw new RangeError;
        pannerNode.refDistance = value;
      },
      get rolloffFactor() {
        return pannerNode.rolloffFactor;
      },
      set rolloffFactor(value) {
        // Bug #130: Safari does not throw an error yet.
        if (value < 0) throw new RangeError;
        pannerNode.rolloffFactor = value;
      },
      addEventListener: (...args) => inputGainNode.addEventListener(args[0], args[1], args[2]),
      dispatchEvent: (...args) => inputGainNode.dispatchEvent(args[0]),
      removeEventListener: (...args) => inputGainNode.removeEventListener(args[0], args[1], args[2])
    };
    coneInnerAngle !== nativePannerNodeFaker.coneInnerAngle && (nativePannerNodeFaker.coneInnerAngle = coneInnerAngle), 
    coneOuterAngle !== nativePannerNodeFaker.coneOuterAngle && (nativePannerNodeFaker.coneOuterAngle = coneOuterAngle), 
    coneOuterGain !== nativePannerNodeFaker.coneOuterGain && (nativePannerNodeFaker.coneOuterGain = coneOuterGain), 
    distanceModel !== nativePannerNodeFaker.distanceModel && (nativePannerNodeFaker.distanceModel = distanceModel), 
    maxDistance !== nativePannerNodeFaker.maxDistance && (nativePannerNodeFaker.maxDistance = maxDistance), 
    orientationX !== nativePannerNodeFaker.orientationX.value && (nativePannerNodeFaker.orientationX.value = orientationX), 
    orientationY !== nativePannerNodeFaker.orientationY.value && (nativePannerNodeFaker.orientationY.value = orientationY), 
    orientationZ !== nativePannerNodeFaker.orientationZ.value && (nativePannerNodeFaker.orientationZ.value = orientationZ), 
    panningModel !== nativePannerNodeFaker.panningModel && (nativePannerNodeFaker.panningModel = panningModel), 
    positionX !== nativePannerNodeFaker.positionX.value && (nativePannerNodeFaker.positionX.value = positionX), 
    positionY !== nativePannerNodeFaker.positionY.value && (nativePannerNodeFaker.positionY.value = positionY), 
    positionZ !== nativePannerNodeFaker.positionZ.value && (nativePannerNodeFaker.positionZ.value = positionZ), 
    refDistance !== nativePannerNodeFaker.refDistance && (nativePannerNodeFaker.refDistance = refDistance), 
    rolloffFactor !== nativePannerNodeFaker.rolloffFactor && (nativePannerNodeFaker.rolloffFactor = rolloffFactor), 
    1 === lastOrientation[0] && 0 === lastOrientation[1] && 0 === lastOrientation[2] || pannerNode.setOrientation(...lastOrientation), 
    0 === lastPosition[0] && 0 === lastPosition[1] && 0 === lastPosition[2] || pannerNode.setPosition(...lastPosition);
    return monitorConnections(interceptConnections(nativePannerNodeFaker, pannerNode), (() => {
      inputGainNode.connect(pannerNode), 
      // Bug #119: Safari does not fully support the WaveShaperNode.
      connectNativeAudioNodeToNativeAudioNode(inputGainNode, waveShaperNode, 0, 0), waveShaperNode.connect(orientationXGainNode).connect(channelMergerNode, 0, 0), 
      waveShaperNode.connect(orientationYGainNode).connect(channelMergerNode, 0, 1), waveShaperNode.connect(orientationZGainNode).connect(channelMergerNode, 0, 2), 
      waveShaperNode.connect(positionXGainNode).connect(channelMergerNode, 0, 3), waveShaperNode.connect(positionYGainNode).connect(channelMergerNode, 0, 4), 
      waveShaperNode.connect(positionZGainNode).connect(channelMergerNode, 0, 5), channelMergerNode.connect(scriptProcessorNode).connect(nativeContext.destination);
    }), (() => {
      inputGainNode.disconnect(pannerNode), 
      // Bug #119: Safari does not fully support the WaveShaperNode.
      disconnectNativeAudioNodeFromNativeAudioNode(inputGainNode, waveShaperNode, 0, 0), 
      waveShaperNode.disconnect(orientationXGainNode), orientationXGainNode.disconnect(channelMergerNode), 
      waveShaperNode.disconnect(orientationYGainNode), orientationYGainNode.disconnect(channelMergerNode), 
      waveShaperNode.disconnect(orientationZGainNode), orientationZGainNode.disconnect(channelMergerNode), 
      waveShaperNode.disconnect(positionXGainNode), positionXGainNode.disconnect(channelMergerNode), 
      waveShaperNode.disconnect(positionYGainNode), positionYGainNode.disconnect(channelMergerNode), 
      waveShaperNode.disconnect(positionZGainNode), positionZGainNode.disconnect(channelMergerNode), 
      channelMergerNode.disconnect(scriptProcessorNode), scriptProcessorNode.disconnect(nativeContext.destination);
    }));
  })(connectNativeAudioNodeToNativeAudioNode, createInvalidStateError, createNativeChannelMergerNode, createNativeGainNode, createNativeScriptProcessorNode, createNativeWaveShaperNode, createNotSupportedError, disconnectNativeAudioNodeFromNativeAudioNode, getFirstSample, monitorConnections);
  const createNativePannerNode = (createNativePannerNodeFaker => (nativeContext, options) => {
    const nativePannerNode = nativeContext.createPanner();
    // Bug #124: Safari does not support modifying the orientation and the position with AudioParams.
        return void 0 === nativePannerNode.orientationX ? createNativePannerNodeFaker(nativeContext, options) : (assignNativeAudioNodeOptions(nativePannerNode, options), 
    assignNativeAudioNodeAudioParamValue(nativePannerNode, options, "orientationX"), 
    assignNativeAudioNodeAudioParamValue(nativePannerNode, options, "orientationY"), 
    assignNativeAudioNodeAudioParamValue(nativePannerNode, options, "orientationZ"), 
    assignNativeAudioNodeAudioParamValue(nativePannerNode, options, "positionX"), assignNativeAudioNodeAudioParamValue(nativePannerNode, options, "positionY"), 
    assignNativeAudioNodeAudioParamValue(nativePannerNode, options, "positionZ"), assignNativeAudioNodeOption(nativePannerNode, options, "coneInnerAngle"), 
    assignNativeAudioNodeOption(nativePannerNode, options, "coneOuterAngle"), assignNativeAudioNodeOption(nativePannerNode, options, "coneOuterGain"), 
    assignNativeAudioNodeOption(nativePannerNode, options, "distanceModel"), assignNativeAudioNodeOption(nativePannerNode, options, "maxDistance"), 
    assignNativeAudioNodeOption(nativePannerNode, options, "panningModel"), assignNativeAudioNodeOption(nativePannerNode, options, "refDistance"), 
    assignNativeAudioNodeOption(nativePannerNode, options, "rolloffFactor"), nativePannerNode);
  })(createNativePannerNodeFaker);
  const createPannerNodeRenderer = ((connectAudioParam, createNativeChannelMergerNode, createNativeConstantSourceNode, createNativeGainNode, createNativePannerNode, getNativeAudioNode, nativeOfflineAudioContextConstructor, renderAutomation, renderInputsOfAudioNode, renderNativeOfflineAudioContext) => () => {
    const renderedNativeAudioNodes = new WeakMap;
    let renderedBufferPromise = null;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeGainNodeOrNativePannerNode = renderedNativeAudioNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeGainNodeOrNativePannerNode ? Promise.resolve(renderedNativeGainNodeOrNativePannerNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeGainNode = null;
          let nativePannerNode = getNativeAudioNode(proxy);
          const commonAudioNodeOptions = {
            channelCount: nativePannerNode.channelCount,
            channelCountMode: nativePannerNode.channelCountMode,
            channelInterpretation: nativePannerNode.channelInterpretation
          };
          const commonNativePannerNodeOptions = {
            ...commonAudioNodeOptions,
            coneInnerAngle: nativePannerNode.coneInnerAngle,
            coneOuterAngle: nativePannerNode.coneOuterAngle,
            coneOuterGain: nativePannerNode.coneOuterGain,
            distanceModel: nativePannerNode.distanceModel,
            maxDistance: nativePannerNode.maxDistance,
            panningModel: nativePannerNode.panningModel,
            refDistance: nativePannerNode.refDistance,
            rolloffFactor: nativePannerNode.rolloffFactor
          };
          // If the initially used nativePannerNode was not constructed on the same OfflineAudioContext it needs to be created again.
                    const nativePannerNodeIsOwnedByContext = isOwnedByContext(nativePannerNode, nativeOfflineAudioContext);
          // Bug #124: Safari does not support modifying the orientation and the position with AudioParams.
                    if ("bufferSize" in nativePannerNode) nativeGainNode = createNativeGainNode(nativeOfflineAudioContext, {
            ...commonAudioNodeOptions,
            gain: 1
          }); else if (!nativePannerNodeIsOwnedByContext) {
            const options = {
              ...commonNativePannerNodeOptions,
              orientationX: nativePannerNode.orientationX.value,
              orientationY: nativePannerNode.orientationY.value,
              orientationZ: nativePannerNode.orientationZ.value,
              positionX: nativePannerNode.positionX.value,
              positionY: nativePannerNode.positionY.value,
              positionZ: nativePannerNode.positionZ.value
            };
            nativePannerNode = createNativePannerNode(nativeOfflineAudioContext, options);
          }
          if (renderedNativeAudioNodes.set(nativeOfflineAudioContext, null === nativeGainNode ? nativePannerNode : nativeGainNode), 
          null !== nativeGainNode) {
            if (null === renderedBufferPromise) {
              if (null === nativeOfflineAudioContextConstructor) throw new Error("Missing the native OfflineAudioContext constructor.");
              const partialOfflineAudioContext = new nativeOfflineAudioContextConstructor(6, 
              // Bug #17: Safari does not yet expose the length.
              proxy.context.length, nativeOfflineAudioContext.sampleRate);
              const nativeChannelMergerNode = createNativeChannelMergerNode(partialOfflineAudioContext, {
                channelCount: 1,
                channelCountMode: "explicit",
                channelInterpretation: "speakers",
                numberOfInputs: 6
              });
              nativeChannelMergerNode.connect(partialOfflineAudioContext.destination), renderedBufferPromise = (async () => {
                const nativeConstantSourceNodes = await Promise.all([ proxy.orientationX, proxy.orientationY, proxy.orientationZ, proxy.positionX, proxy.positionY, proxy.positionZ ].map((async (audioParam, index) => {
                  const nativeConstantSourceNode = createNativeConstantSourceNode(partialOfflineAudioContext, {
                    channelCount: 1,
                    channelCountMode: "explicit",
                    channelInterpretation: "discrete",
                    offset: 0 === index ? 1 : 0
                  });
                  return await renderAutomation(partialOfflineAudioContext, audioParam, nativeConstantSourceNode.offset), 
                  nativeConstantSourceNode;
                })));
                for (let i = 0; i < 6; i += 1) nativeConstantSourceNodes[i].connect(nativeChannelMergerNode, 0, i), 
                nativeConstantSourceNodes[i].start(0);
                return renderNativeOfflineAudioContext(partialOfflineAudioContext);
              })();
            }
            const renderedBuffer = await renderedBufferPromise;
            const inputGainNode = createNativeGainNode(nativeOfflineAudioContext, {
              ...commonAudioNodeOptions,
              gain: 1
            });
            await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, inputGainNode);
            const channelDatas = [];
            for (let i = 0; i < renderedBuffer.numberOfChannels; i += 1) channelDatas.push(renderedBuffer.getChannelData(i));
            let lastOrientation = [ channelDatas[0][0], channelDatas[1][0], channelDatas[2][0] ];
            let lastPosition = [ channelDatas[3][0], channelDatas[4][0], channelDatas[5][0] ];
            let gateGainNode = createNativeGainNode(nativeOfflineAudioContext, {
              ...commonAudioNodeOptions,
              gain: 1
            });
            let partialPannerNode = createNativePannerNode(nativeOfflineAudioContext, {
              ...commonNativePannerNodeOptions,
              orientationX: lastOrientation[0],
              orientationY: lastOrientation[1],
              orientationZ: lastOrientation[2],
              positionX: lastPosition[0],
              positionY: lastPosition[1],
              positionZ: lastPosition[2]
            });
            inputGainNode.connect(gateGainNode).connect(partialPannerNode.inputs[0]), partialPannerNode.connect(nativeGainNode);
            for (let i = 128; i < renderedBuffer.length; i += 128) {
              const orientation = [ channelDatas[0][i], channelDatas[1][i], channelDatas[2][i] ];
              const positon = [ channelDatas[3][i], channelDatas[4][i], channelDatas[5][i] ];
              if (orientation.some(((value, index) => value !== lastOrientation[index])) || positon.some(((value, index) => value !== lastPosition[index]))) {
                lastOrientation = orientation, lastPosition = positon;
                const currentTime = i / nativeOfflineAudioContext.sampleRate;
                gateGainNode.gain.setValueAtTime(0, currentTime), gateGainNode = createNativeGainNode(nativeOfflineAudioContext, {
                  ...commonAudioNodeOptions,
                  gain: 0
                }), partialPannerNode = createNativePannerNode(nativeOfflineAudioContext, {
                  ...commonNativePannerNodeOptions,
                  orientationX: lastOrientation[0],
                  orientationY: lastOrientation[1],
                  orientationZ: lastOrientation[2],
                  positionX: lastPosition[0],
                  positionY: lastPosition[1],
                  positionZ: lastPosition[2]
                }), gateGainNode.gain.setValueAtTime(1, currentTime), inputGainNode.connect(gateGainNode).connect(partialPannerNode.inputs[0]), 
                partialPannerNode.connect(nativeGainNode);
              }
            }
            return nativeGainNode;
          }
          return nativePannerNodeIsOwnedByContext ? (await connectAudioParam(nativeOfflineAudioContext, proxy.orientationX, nativePannerNode.orientationX), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.orientationY, nativePannerNode.orientationY), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.orientationZ, nativePannerNode.orientationZ), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.positionX, nativePannerNode.positionX), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.positionY, nativePannerNode.positionY), 
          await connectAudioParam(nativeOfflineAudioContext, proxy.positionZ, nativePannerNode.positionZ)) : (await renderAutomation(nativeOfflineAudioContext, proxy.orientationX, nativePannerNode.orientationX), 
          await renderAutomation(nativeOfflineAudioContext, proxy.orientationY, nativePannerNode.orientationY), 
          await renderAutomation(nativeOfflineAudioContext, proxy.orientationZ, nativePannerNode.orientationZ), 
          await renderAutomation(nativeOfflineAudioContext, proxy.positionX, nativePannerNode.positionX), 
          await renderAutomation(nativeOfflineAudioContext, proxy.positionY, nativePannerNode.positionY), 
          await renderAutomation(nativeOfflineAudioContext, proxy.positionZ, nativePannerNode.positionZ)), 
          isNativeAudioNodeFaker(nativePannerNode) ? await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativePannerNode.inputs[0]) : await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativePannerNode), 
          nativePannerNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, createNativeChannelMergerNode, createNativeConstantSourceNode, createNativeGainNode, createNativePannerNode, getNativeAudioNode, nativeOfflineAudioContextConstructor, renderAutomation, renderInputsOfAudioNode, renderNativeOfflineAudioContext);
  const pannerNodeConstructor = ((audioNodeConstructor, createAudioParam, createNativePannerNode, createPannerNodeRenderer, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$3,
        ...options
      };
      const nativePannerNode = createNativePannerNode(nativeContext, mergedOptions);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      super(context, !1, nativePannerNode, isOffline ? createPannerNodeRenderer() : null), 
      this._nativePannerNode = nativePannerNode, 
      // Bug #74: Safari does not export the correct values for maxValue and minValue.
      this._orientationX = createAudioParam(this, isOffline, nativePannerNode.orientationX, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT), 
      this._orientationY = createAudioParam(this, isOffline, nativePannerNode.orientationY, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT), 
      this._orientationZ = createAudioParam(this, isOffline, nativePannerNode.orientationZ, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT), 
      this._positionX = createAudioParam(this, isOffline, nativePannerNode.positionX, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT), 
      this._positionY = createAudioParam(this, isOffline, nativePannerNode.positionY, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT), 
      this._positionZ = createAudioParam(this, isOffline, nativePannerNode.positionZ, MOST_POSITIVE_SINGLE_FLOAT, MOST_NEGATIVE_SINGLE_FLOAT), 
      // @todo Determine a meaningful tail-time instead of just using one second.
      setAudioNodeTailTime(this, 1);
    }
    get coneInnerAngle() {
      return this._nativePannerNode.coneInnerAngle;
    }
    set coneInnerAngle(value) {
      this._nativePannerNode.coneInnerAngle = value;
    }
    get coneOuterAngle() {
      return this._nativePannerNode.coneOuterAngle;
    }
    set coneOuterAngle(value) {
      this._nativePannerNode.coneOuterAngle = value;
    }
    get coneOuterGain() {
      return this._nativePannerNode.coneOuterGain;
    }
    set coneOuterGain(value) {
      this._nativePannerNode.coneOuterGain = value;
    }
    get distanceModel() {
      return this._nativePannerNode.distanceModel;
    }
    set distanceModel(value) {
      this._nativePannerNode.distanceModel = value;
    }
    get maxDistance() {
      return this._nativePannerNode.maxDistance;
    }
    set maxDistance(value) {
      this._nativePannerNode.maxDistance = value;
    }
    get orientationX() {
      return this._orientationX;
    }
    get orientationY() {
      return this._orientationY;
    }
    get orientationZ() {
      return this._orientationZ;
    }
    get panningModel() {
      return this._nativePannerNode.panningModel;
    }
    set panningModel(value) {
      this._nativePannerNode.panningModel = value;
    }
    get positionX() {
      return this._positionX;
    }
    get positionY() {
      return this._positionY;
    }
    get positionZ() {
      return this._positionZ;
    }
    get refDistance() {
      return this._nativePannerNode.refDistance;
    }
    set refDistance(value) {
      this._nativePannerNode.refDistance = value;
    }
    get rolloffFactor() {
      return this._nativePannerNode.rolloffFactor;
    }
    set rolloffFactor(value) {
      this._nativePannerNode.rolloffFactor = value;
    }
  })(audioNodeConstructor, createAudioParam, createNativePannerNode, createPannerNodeRenderer, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime);
  const createNativePeriodicWave = (createIndexSizeError => (nativeContext, {disableNormalization: disableNormalization, imag: imag, real: real}) => {
    // Bug #180: Safari does not allow to use ordinary arrays.
    const convertedImag = imag instanceof Float32Array ? imag : new Float32Array(imag);
    const convertedReal = real instanceof Float32Array ? real : new Float32Array(real);
    const nativePeriodicWave = nativeContext.createPeriodicWave(convertedReal, convertedImag, {
      disableNormalization: disableNormalization
    });
    // Bug #181: Safari does not throw an IndexSizeError so far if the given arrays have less than two values.
        if (Array.from(imag).length < 2) throw createIndexSizeError();
    return nativePeriodicWave;
  })(createIndexSizeError);
  const periodicWaveConstructor = ((createNativePeriodicWave, getNativeContext, periodicWaveStore, sanitizePeriodicWaveOptions) => class PeriodicWave {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = sanitizePeriodicWaveOptions({
        ...DEFAULT_OPTIONS$2,
        ...options
      });
      const periodicWave = createNativePeriodicWave(nativeContext, mergedOptions);
      // This does violate all good pratices but it is used here to simplify the handling of periodic waves.
      return periodicWaveStore.add(periodicWave), periodicWave;
    }
    static [Symbol.hasInstance](instance) {
      return null !== instance && "object" == typeof instance && Object.getPrototypeOf(instance) === PeriodicWave.prototype || periodicWaveStore.has(instance);
    }
  })(createNativePeriodicWave, getNativeContext, new WeakSet, (options => {
    const {imag: imag, real: real} = options;
    return void 0 === imag ? void 0 === real ? {
      ...options,
      imag: [ 0, 0 ],
      real: [ 0, 0 ]
    } : {
      ...options,
      imag: Array.from(real, (() => 0)),
      real: real
    } : void 0 === real ? {
      ...options,
      imag: imag,
      real: Array.from(imag, (() => 0))
    } : {
      ...options,
      imag: imag,
      real: real
    };
  }));
  const nativeStereoPannerNodeFakerFactory = ((createNativeChannelMergerNode, createNativeChannelSplitterNode, createNativeGainNode, createNativeWaveShaperNode, createNotSupportedError, monitorConnections) => {
    const DC_CURVE = new Float32Array([ 1, 1 ]);
    const HALF_PI = Math.PI / 2;
    const SINGLE_CHANNEL_OPTIONS = {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "discrete"
    };
    const SINGLE_CHANNEL_WAVE_SHAPER_OPTIONS = {
      ...SINGLE_CHANNEL_OPTIONS,
      oversample: "none"
    };
    const buildInternalGraph = (nativeContext, channelCount, inputGainNode, panGainNode, channelMergerNode) => {
      if (1 === channelCount) return ((nativeContext, inputGainNode, panGainNode, channelMergerNode) => {
        const leftWaveShaperCurve = new Float32Array(16385);
        const rightWaveShaperCurve = new Float32Array(16385);
        for (let i = 0; i < 16385; i += 1) {
          const x = i / 16384 * HALF_PI;
          leftWaveShaperCurve[i] = Math.cos(x), rightWaveShaperCurve[i] = Math.sin(x);
        }
        const leftGainNode = createNativeGainNode(nativeContext, {
          ...SINGLE_CHANNEL_OPTIONS,
          gain: 0
        });
        // Bug #119: Safari does not fully support the WaveShaperNode.
                const leftWaveShaperNode = createNativeWaveShaperNode(nativeContext, {
          ...SINGLE_CHANNEL_WAVE_SHAPER_OPTIONS,
          curve: leftWaveShaperCurve
        });
        // Bug #119: Safari does not fully support the WaveShaperNode.
                const panWaveShaperNode = createNativeWaveShaperNode(nativeContext, {
          ...SINGLE_CHANNEL_WAVE_SHAPER_OPTIONS,
          curve: DC_CURVE
        });
        const rightGainNode = createNativeGainNode(nativeContext, {
          ...SINGLE_CHANNEL_OPTIONS,
          gain: 0
        });
        // Bug #119: Safari does not fully support the WaveShaperNode.
                const rightWaveShaperNode = createNativeWaveShaperNode(nativeContext, {
          ...SINGLE_CHANNEL_WAVE_SHAPER_OPTIONS,
          curve: rightWaveShaperCurve
        });
        return {
          connectGraph() {
            inputGainNode.connect(leftGainNode), inputGainNode.connect(void 0 === panWaveShaperNode.inputs ? panWaveShaperNode : panWaveShaperNode.inputs[0]), 
            inputGainNode.connect(rightGainNode), panWaveShaperNode.connect(panGainNode), panGainNode.connect(void 0 === leftWaveShaperNode.inputs ? leftWaveShaperNode : leftWaveShaperNode.inputs[0]), 
            panGainNode.connect(void 0 === rightWaveShaperNode.inputs ? rightWaveShaperNode : rightWaveShaperNode.inputs[0]), 
            leftWaveShaperNode.connect(leftGainNode.gain), rightWaveShaperNode.connect(rightGainNode.gain), 
            leftGainNode.connect(channelMergerNode, 0, 0), rightGainNode.connect(channelMergerNode, 0, 1);
          },
          disconnectGraph() {
            inputGainNode.disconnect(leftGainNode), inputGainNode.disconnect(void 0 === panWaveShaperNode.inputs ? panWaveShaperNode : panWaveShaperNode.inputs[0]), 
            inputGainNode.disconnect(rightGainNode), panWaveShaperNode.disconnect(panGainNode), 
            panGainNode.disconnect(void 0 === leftWaveShaperNode.inputs ? leftWaveShaperNode : leftWaveShaperNode.inputs[0]), 
            panGainNode.disconnect(void 0 === rightWaveShaperNode.inputs ? rightWaveShaperNode : rightWaveShaperNode.inputs[0]), 
            leftWaveShaperNode.disconnect(leftGainNode.gain), rightWaveShaperNode.disconnect(rightGainNode.gain), 
            leftGainNode.disconnect(channelMergerNode, 0, 0), rightGainNode.disconnect(channelMergerNode, 0, 1);
          }
        };
      })(nativeContext, inputGainNode, panGainNode, channelMergerNode);
      if (2 === channelCount) return ((nativeContext, inputGainNode, panGainNode, channelMergerNode) => {
        const leftInputForLeftOutputWaveShaperCurve = new Float32Array(16385);
        const leftInputForRightOutputWaveShaperCurve = new Float32Array(16385);
        const rightInputForLeftOutputWaveShaperCurve = new Float32Array(16385);
        const rightInputForRightOutputWaveShaperCurve = new Float32Array(16385);
        const centerIndex = Math.floor(8192.5);
        for (let i = 0; i < 16385; i += 1) if (i > centerIndex) {
          const x = (i - centerIndex) / (16384 - centerIndex) * HALF_PI;
          leftInputForLeftOutputWaveShaperCurve[i] = Math.cos(x), leftInputForRightOutputWaveShaperCurve[i] = Math.sin(x), 
          rightInputForLeftOutputWaveShaperCurve[i] = 0, rightInputForRightOutputWaveShaperCurve[i] = 1;
        } else {
          const x = i / (16384 - centerIndex) * HALF_PI;
          leftInputForLeftOutputWaveShaperCurve[i] = 1, leftInputForRightOutputWaveShaperCurve[i] = 0, 
          rightInputForLeftOutputWaveShaperCurve[i] = Math.cos(x), rightInputForRightOutputWaveShaperCurve[i] = Math.sin(x);
        }
        const channelSplitterNode = createNativeChannelSplitterNode(nativeContext, {
          channelCount: 2,
          channelCountMode: "explicit",
          channelInterpretation: "discrete",
          numberOfOutputs: 2
        });
        const leftInputForLeftOutputGainNode = createNativeGainNode(nativeContext, {
          ...SINGLE_CHANNEL_OPTIONS,
          gain: 0
        });
        // Bug #119: Safari does not fully support the WaveShaperNode.
                const leftInputForLeftOutputWaveShaperNode = createNativeWaveShaperNode(nativeContext, {
          ...SINGLE_CHANNEL_WAVE_SHAPER_OPTIONS,
          curve: leftInputForLeftOutputWaveShaperCurve
        });
        const leftInputForRightOutputGainNode = createNativeGainNode(nativeContext, {
          ...SINGLE_CHANNEL_OPTIONS,
          gain: 0
        });
        // Bug #119: Safari does not fully support the WaveShaperNode.
                const leftInputForRightOutputWaveShaperNode = createNativeWaveShaperNode(nativeContext, {
          ...SINGLE_CHANNEL_WAVE_SHAPER_OPTIONS,
          curve: leftInputForRightOutputWaveShaperCurve
        });
        // Bug #119: Safari does not fully support the WaveShaperNode.
                const panWaveShaperNode = createNativeWaveShaperNode(nativeContext, {
          ...SINGLE_CHANNEL_WAVE_SHAPER_OPTIONS,
          curve: DC_CURVE
        });
        const rightInputForLeftOutputGainNode = createNativeGainNode(nativeContext, {
          ...SINGLE_CHANNEL_OPTIONS,
          gain: 0
        });
        // Bug #119: Safari does not fully support the WaveShaperNode.
                const rightInputForLeftOutputWaveShaperNode = createNativeWaveShaperNode(nativeContext, {
          ...SINGLE_CHANNEL_WAVE_SHAPER_OPTIONS,
          curve: rightInputForLeftOutputWaveShaperCurve
        });
        const rightInputForRightOutputGainNode = createNativeGainNode(nativeContext, {
          ...SINGLE_CHANNEL_OPTIONS,
          gain: 0
        });
        // Bug #119: Safari does not fully support the WaveShaperNode.
                const rightInputForRightOutputWaveShaperNode = createNativeWaveShaperNode(nativeContext, {
          ...SINGLE_CHANNEL_WAVE_SHAPER_OPTIONS,
          curve: rightInputForRightOutputWaveShaperCurve
        });
        return {
          connectGraph() {
            inputGainNode.connect(channelSplitterNode), inputGainNode.connect(void 0 === panWaveShaperNode.inputs ? panWaveShaperNode : panWaveShaperNode.inputs[0]), 
            channelSplitterNode.connect(leftInputForLeftOutputGainNode, 0), channelSplitterNode.connect(leftInputForRightOutputGainNode, 0), 
            channelSplitterNode.connect(rightInputForLeftOutputGainNode, 1), channelSplitterNode.connect(rightInputForRightOutputGainNode, 1), 
            panWaveShaperNode.connect(panGainNode), panGainNode.connect(void 0 === leftInputForLeftOutputWaveShaperNode.inputs ? leftInputForLeftOutputWaveShaperNode : leftInputForLeftOutputWaveShaperNode.inputs[0]), 
            panGainNode.connect(void 0 === leftInputForRightOutputWaveShaperNode.inputs ? leftInputForRightOutputWaveShaperNode : leftInputForRightOutputWaveShaperNode.inputs[0]), 
            panGainNode.connect(void 0 === rightInputForLeftOutputWaveShaperNode.inputs ? rightInputForLeftOutputWaveShaperNode : rightInputForLeftOutputWaveShaperNode.inputs[0]), 
            panGainNode.connect(void 0 === rightInputForRightOutputWaveShaperNode.inputs ? rightInputForRightOutputWaveShaperNode : rightInputForRightOutputWaveShaperNode.inputs[0]), 
            leftInputForLeftOutputWaveShaperNode.connect(leftInputForLeftOutputGainNode.gain), 
            leftInputForRightOutputWaveShaperNode.connect(leftInputForRightOutputGainNode.gain), 
            rightInputForLeftOutputWaveShaperNode.connect(rightInputForLeftOutputGainNode.gain), 
            rightInputForRightOutputWaveShaperNode.connect(rightInputForRightOutputGainNode.gain), 
            leftInputForLeftOutputGainNode.connect(channelMergerNode, 0, 0), rightInputForLeftOutputGainNode.connect(channelMergerNode, 0, 0), 
            leftInputForRightOutputGainNode.connect(channelMergerNode, 0, 1), rightInputForRightOutputGainNode.connect(channelMergerNode, 0, 1);
          },
          disconnectGraph() {
            inputGainNode.disconnect(channelSplitterNode), inputGainNode.disconnect(void 0 === panWaveShaperNode.inputs ? panWaveShaperNode : panWaveShaperNode.inputs[0]), 
            channelSplitterNode.disconnect(leftInputForLeftOutputGainNode, 0), channelSplitterNode.disconnect(leftInputForRightOutputGainNode, 0), 
            channelSplitterNode.disconnect(rightInputForLeftOutputGainNode, 1), channelSplitterNode.disconnect(rightInputForRightOutputGainNode, 1), 
            panWaveShaperNode.disconnect(panGainNode), panGainNode.disconnect(void 0 === leftInputForLeftOutputWaveShaperNode.inputs ? leftInputForLeftOutputWaveShaperNode : leftInputForLeftOutputWaveShaperNode.inputs[0]), 
            panGainNode.disconnect(void 0 === leftInputForRightOutputWaveShaperNode.inputs ? leftInputForRightOutputWaveShaperNode : leftInputForRightOutputWaveShaperNode.inputs[0]), 
            panGainNode.disconnect(void 0 === rightInputForLeftOutputWaveShaperNode.inputs ? rightInputForLeftOutputWaveShaperNode : rightInputForLeftOutputWaveShaperNode.inputs[0]), 
            panGainNode.disconnect(void 0 === rightInputForRightOutputWaveShaperNode.inputs ? rightInputForRightOutputWaveShaperNode : rightInputForRightOutputWaveShaperNode.inputs[0]), 
            leftInputForLeftOutputWaveShaperNode.disconnect(leftInputForLeftOutputGainNode.gain), 
            leftInputForRightOutputWaveShaperNode.disconnect(leftInputForRightOutputGainNode.gain), 
            rightInputForLeftOutputWaveShaperNode.disconnect(rightInputForLeftOutputGainNode.gain), 
            rightInputForRightOutputWaveShaperNode.disconnect(rightInputForRightOutputGainNode.gain), 
            leftInputForLeftOutputGainNode.disconnect(channelMergerNode, 0, 0), rightInputForLeftOutputGainNode.disconnect(channelMergerNode, 0, 0), 
            leftInputForRightOutputGainNode.disconnect(channelMergerNode, 0, 1), rightInputForRightOutputGainNode.disconnect(channelMergerNode, 0, 1);
          }
        };
      })(nativeContext, inputGainNode, panGainNode, channelMergerNode);
      throw createNotSupportedError();
    };
    return (nativeContext, {channelCount: channelCount, channelCountMode: channelCountMode, pan: pan, ...audioNodeOptions}) => {
      if ("max" === channelCountMode) throw createNotSupportedError();
      const channelMergerNode = createNativeChannelMergerNode(nativeContext, {
        ...audioNodeOptions,
        channelCount: 1,
        channelCountMode: channelCountMode,
        numberOfInputs: 2
      });
      const inputGainNode = createNativeGainNode(nativeContext, {
        ...audioNodeOptions,
        channelCount: channelCount,
        channelCountMode: channelCountMode,
        gain: 1
      });
      const panGainNode = createNativeGainNode(nativeContext, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        gain: pan
      });
      let {connectGraph: connectGraph, disconnectGraph: disconnectGraph} = buildInternalGraph(nativeContext, channelCount, inputGainNode, panGainNode, channelMergerNode);
      Object.defineProperty(panGainNode.gain, "defaultValue", {
        get: () => 0
      }), Object.defineProperty(panGainNode.gain, "maxValue", {
        get: () => 1
      }), Object.defineProperty(panGainNode.gain, "minValue", {
        get: () => -1
      });
      const nativeStereoPannerNodeFakerFactory = {
        get bufferSize() {},
        get channelCount() {
          return inputGainNode.channelCount;
        },
        set channelCount(value) {
          inputGainNode.channelCount !== value && (isConnected && disconnectGraph(), ({connectGraph: connectGraph, disconnectGraph: disconnectGraph} = buildInternalGraph(nativeContext, value, inputGainNode, panGainNode, channelMergerNode)), 
          isConnected && connectGraph()), inputGainNode.channelCount = value;
        },
        get channelCountMode() {
          return inputGainNode.channelCountMode;
        },
        set channelCountMode(value) {
          if ("clamped-max" === value || "max" === value) throw createNotSupportedError();
          inputGainNode.channelCountMode = value;
        },
        get channelInterpretation() {
          return inputGainNode.channelInterpretation;
        },
        set channelInterpretation(value) {
          inputGainNode.channelInterpretation = value;
        },
        get context() {
          return inputGainNode.context;
        },
        get inputs() {
          return [ inputGainNode ];
        },
        get numberOfInputs() {
          return inputGainNode.numberOfInputs;
        },
        get numberOfOutputs() {
          return inputGainNode.numberOfOutputs;
        },
        get pan() {
          return panGainNode.gain;
        },
        addEventListener: (...args) => inputGainNode.addEventListener(args[0], args[1], args[2]),
        dispatchEvent: (...args) => inputGainNode.dispatchEvent(args[0]),
        removeEventListener: (...args) => inputGainNode.removeEventListener(args[0], args[1], args[2])
      };
      let isConnected = !1;
      return monitorConnections(interceptConnections(nativeStereoPannerNodeFakerFactory, channelMergerNode), (() => {
        connectGraph(), isConnected = !0;
      }), (() => {
        disconnectGraph(), isConnected = !1;
      }));
    };
  })(createNativeChannelMergerNode, createNativeChannelSplitterNode, createNativeGainNode, createNativeWaveShaperNode, createNotSupportedError, monitorConnections);
  const createNativeStereoPannerNode = ((createNativeStereoPannerNodeFaker, createNotSupportedError) => (nativeContext, options) => {
    const channelCountMode = options.channelCountMode;
    /*
           * Bug #105: The channelCountMode of 'clamped-max' should be supported. However it is not possible to write a polyfill for Safari
           * which supports it and therefore it can't be supported at all.
           */    if ("clamped-max" === channelCountMode) throw createNotSupportedError();
    // Bug #105: Safari does not support the StereoPannerNode.
        if (void 0 === nativeContext.createStereoPanner) return createNativeStereoPannerNodeFaker(nativeContext, options);
    const nativeStereoPannerNode = nativeContext.createStereoPanner();
    return assignNativeAudioNodeOptions(nativeStereoPannerNode, options), assignNativeAudioNodeAudioParamValue(nativeStereoPannerNode, options, "pan"), 
    /*
           * Bug #105: The channelCountMode of 'clamped-max' should be supported. However it is not possible to write a polyfill for Safari
           * which supports it and therefore it can't be supported at all.
           */
    Object.defineProperty(nativeStereoPannerNode, "channelCountMode", {
      get: () => channelCountMode,
      set: value => {
        if (value !== channelCountMode) throw createNotSupportedError();
      }
    }), nativeStereoPannerNode;
  })(nativeStereoPannerNodeFakerFactory, createNotSupportedError);
  const createStereoPannerNodeRenderer = ((connectAudioParam, createNativeStereoPannerNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode) => () => {
    const renderedNativeStereoPannerNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeStereoPannerNode = renderedNativeStereoPannerNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeStereoPannerNode ? Promise.resolve(renderedNativeStereoPannerNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeStereoPannerNode = getNativeAudioNode(proxy);
          /*
               * If the initially used nativeStereoPannerNode was not constructed on the same OfflineAudioContext it needs to be created
               * again.
               */          const nativeStereoPannerNodeIsOwnedByContext = isOwnedByContext(nativeStereoPannerNode, nativeOfflineAudioContext);
          if (!nativeStereoPannerNodeIsOwnedByContext) {
            const options = {
              channelCount: nativeStereoPannerNode.channelCount,
              channelCountMode: nativeStereoPannerNode.channelCountMode,
              channelInterpretation: nativeStereoPannerNode.channelInterpretation,
              pan: nativeStereoPannerNode.pan.value
            };
            nativeStereoPannerNode = createNativeStereoPannerNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeStereoPannerNodes.set(nativeOfflineAudioContext, nativeStereoPannerNode), 
          nativeStereoPannerNodeIsOwnedByContext ? await connectAudioParam(nativeOfflineAudioContext, proxy.pan, nativeStereoPannerNode.pan) : await renderAutomation(nativeOfflineAudioContext, proxy.pan, nativeStereoPannerNode.pan), 
          isNativeAudioNodeFaker(nativeStereoPannerNode) ? await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeStereoPannerNode.inputs[0]) : await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeStereoPannerNode), 
          nativeStereoPannerNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, createNativeStereoPannerNode, getNativeAudioNode, renderAutomation, renderInputsOfAudioNode);
  const stereoPannerNodeConstructor = ((audioNodeConstructor, createAudioParam, createNativeStereoPannerNode, createStereoPannerNodeRenderer, getNativeContext, isNativeOfflineAudioContext) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS$1,
        ...options
      };
      const nativeStereoPannerNode = createNativeStereoPannerNode(nativeContext, mergedOptions);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      super(context, !1, nativeStereoPannerNode, isOffline ? createStereoPannerNodeRenderer() : null), 
      this._pan = createAudioParam(this, isOffline, nativeStereoPannerNode.pan);
    }
    get pan() {
      return this._pan;
    }
  })(audioNodeConstructor, createAudioParam, createNativeStereoPannerNode, createStereoPannerNodeRenderer, getNativeContext, isNativeOfflineAudioContext);
  const createWaveShaperNodeRenderer = ((createNativeWaveShaperNode, getNativeAudioNode, renderInputsOfAudioNode) => () => {
    const renderedNativeWaveShaperNodes = new WeakMap;
    return {
      render(proxy, nativeOfflineAudioContext) {
        const renderedNativeWaveShaperNode = renderedNativeWaveShaperNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeWaveShaperNode ? Promise.resolve(renderedNativeWaveShaperNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeWaveShaperNode = getNativeAudioNode(proxy);
          // If the initially used nativeWaveShaperNode was not constructed on the same OfflineAudioContext it needs to be created again.
                    if (!isOwnedByContext(nativeWaveShaperNode, nativeOfflineAudioContext)) {
            const options = {
              channelCount: nativeWaveShaperNode.channelCount,
              channelCountMode: nativeWaveShaperNode.channelCountMode,
              channelInterpretation: nativeWaveShaperNode.channelInterpretation,
              curve: nativeWaveShaperNode.curve,
              oversample: nativeWaveShaperNode.oversample
            };
            nativeWaveShaperNode = createNativeWaveShaperNode(nativeOfflineAudioContext, options);
          }
          return renderedNativeWaveShaperNodes.set(nativeOfflineAudioContext, nativeWaveShaperNode), 
          isNativeAudioNodeFaker(nativeWaveShaperNode) ? await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeWaveShaperNode.inputs[0]) : await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeWaveShaperNode), 
          nativeWaveShaperNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(createNativeWaveShaperNode, getNativeAudioNode, renderInputsOfAudioNode);
  const waveShaperNodeConstructor = ((audioNodeConstructor, createInvalidStateError, createNativeWaveShaperNode, createWaveShaperNodeRenderer, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const mergedOptions = {
        ...DEFAULT_OPTIONS,
        ...options
      };
      const nativeWaveShaperNode = createNativeWaveShaperNode(nativeContext, mergedOptions);
      // @todo Add a mechanism to only switch a WaveShaperNode to active while it is connected.
      super(context, !0, nativeWaveShaperNode, isNativeOfflineAudioContext(nativeContext) ? createWaveShaperNodeRenderer() : null), 
      this._isCurveNullified = !1, this._nativeWaveShaperNode = nativeWaveShaperNode, 
      // @todo Determine a meaningful tail-time instead of just using one second.
      setAudioNodeTailTime(this, 1);
    }
    get curve() {
      return this._isCurveNullified ? null : this._nativeWaveShaperNode.curve;
    }
    set curve(value) {
      // Bug #103: Safari does not allow to set the curve to null.
      if (null === value) this._isCurveNullified = !0, this._nativeWaveShaperNode.curve = new Float32Array([ 0, 0 ]); else {
        // Bug #102: Safari does not throw an InvalidStateError when the curve has less than two samples.
        // Bug #104: Chrome and Edge will throw an InvalidAccessError when the curve has less than two samples.
        if (value.length < 2) throw createInvalidStateError();
        this._isCurveNullified = !1, this._nativeWaveShaperNode.curve = value;
      }
    }
    get oversample() {
      return this._nativeWaveShaperNode.oversample;
    }
    set oversample(value) {
      this._nativeWaveShaperNode.oversample = value;
    }
  })(audioNodeConstructor, createInvalidStateError, createNativeWaveShaperNode, createWaveShaperNodeRenderer, getNativeContext, isNativeOfflineAudioContext, setAudioNodeTailTime);
  const isSecureContext = (window => null !== window && window.isSecureContext)(window$1);
  const exposeCurrentFrameAndCurrentTime = (window => (currentTime, sampleRate, fn) => {
    Object.defineProperties(window, {
      currentFrame: {
        configurable: !0,
        get: () => Math.round(currentTime * sampleRate)
      },
      currentTime: {
        configurable: !0,
        get: () => currentTime
      }
    });
    try {
      return fn();
    } finally {
      null !== window && (delete window.currentFrame, delete window.currentTime);
    }
  })(window$1);
  const backupOfflineAudioContextStore = new WeakMap;
  const getOrCreateBackupOfflineAudioContext = ((backupOfflineAudioContextStore, nativeOfflineAudioContextConstructor) => nativeContext => {
    let backupOfflineAudioContext = backupOfflineAudioContextStore.get(nativeContext);
    if (void 0 !== backupOfflineAudioContext) return backupOfflineAudioContext;
    if (null === nativeOfflineAudioContextConstructor) throw new Error("Missing the native OfflineAudioContext constructor.");
    // Bug #141: Safari does not support creating an OfflineAudioContext with less than 44100 Hz.
        return backupOfflineAudioContext = new nativeOfflineAudioContextConstructor(1, 1, 44100), 
    backupOfflineAudioContextStore.set(nativeContext, backupOfflineAudioContext), backupOfflineAudioContext;
  })(backupOfflineAudioContextStore, nativeOfflineAudioContextConstructor);
  // The addAudioWorkletModule() function is only available in a SecureContext.
    const addAudioWorkletModule = isSecureContext ? ((cacheTestResult, createNotSupportedError, evaluateSource, exposeCurrentFrameAndCurrentTime, fetchSource, getNativeContext, getOrCreateBackupOfflineAudioContext, isNativeOfflineAudioContext, nativeAudioWorkletNodeConstructor, ongoingRequests, resolvedRequests, testAudioWorkletProcessorPostMessageSupport, window) => {
    let index = 0;
    return (context, moduleURL, options = {
      credentials: "omit"
    }) => {
      const resolvedRequestsOfContext = resolvedRequests.get(context);
      if (void 0 !== resolvedRequestsOfContext && resolvedRequestsOfContext.has(moduleURL)) return Promise.resolve();
      const ongoingRequestsOfContext = ongoingRequests.get(context);
      if (void 0 !== ongoingRequestsOfContext) {
        const promiseOfOngoingRequest = ongoingRequestsOfContext.get(moduleURL);
        if (void 0 !== promiseOfOngoingRequest) return promiseOfOngoingRequest;
      }
      const nativeContext = getNativeContext(context);
      // Bug #59: Safari does not implement the audioWorklet property.
            const promise = void 0 === nativeContext.audioWorklet ? fetchSource(moduleURL).then((([source, absoluteUrl]) => {
        const [importStatements, sourceWithoutImportStatements] = splitImportStatements(source, absoluteUrl);
        /*
                   * This is the unminified version of the code used below:
                   *
                   * ```js
                   * ${ importStatements };
                   * ((a, b) => {
                   *     (a[b] = a[b] || [ ]).push(
                   *         (AudioWorkletProcessor, global, registerProcessor, sampleRate, self, window) => {
                   *             ${ sourceWithoutImportStatements }
                   *         }
                   *     );
                   * })(window, '_AWGS');
                   * ```
                   */
        // tslint:disable-next-line:max-line-length
                // @todo Evaluating the given source code is a possible security problem.
        return evaluateSource(`${importStatements};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${sourceWithoutImportStatements}\n})})(window,'_AWGS')`);
      })).then((() => {
        const evaluateAudioWorkletGlobalScope = window._AWGS.pop();
        if (void 0 === evaluateAudioWorkletGlobalScope) 
        // Bug #182 Chrome and Edge do throw an instance of a SyntaxError instead of a DOMException.
        throw new SyntaxError;
        exposeCurrentFrameAndCurrentTime(nativeContext.currentTime, nativeContext.sampleRate, (() => evaluateAudioWorkletGlobalScope(class {}, void 0, ((name, processorCtor) => {
          if ("" === name.trim()) throw createNotSupportedError();
          const nodeNameToProcessorConstructorMap = NODE_NAME_TO_PROCESSOR_CONSTRUCTOR_MAPS.get(nativeContext);
          if (void 0 !== nodeNameToProcessorConstructorMap) {
            if (nodeNameToProcessorConstructorMap.has(name)) throw createNotSupportedError();
            verifyProcessorCtor(processorCtor), verifyParameterDescriptors(processorCtor.parameterDescriptors), 
            nodeNameToProcessorConstructorMap.set(name, processorCtor);
          } else verifyProcessorCtor(processorCtor), verifyParameterDescriptors(processorCtor.parameterDescriptors), 
          NODE_NAME_TO_PROCESSOR_CONSTRUCTOR_MAPS.set(nativeContext, new Map([ [ name, processorCtor ] ]));
        }), nativeContext.sampleRate, void 0, void 0)));
      })) : Promise.all([ fetchSource(moduleURL), Promise.resolve(cacheTestResult(testAudioWorkletProcessorPostMessageSupport, testAudioWorkletProcessorPostMessageSupport)) ]).then((([[source, absoluteUrl], isSupportingPostMessage]) => {
        const currentIndex = index + 1;
        index = currentIndex;
        const [importStatements, sourceWithoutImportStatements] = splitImportStatements(source, absoluteUrl);
        /*
                   * Bug #179: Firefox does not allow to transfer any buffer which has been passed to the process() method as an argument.
                   *
                   * This is the unminified version of the code used below.
                   *
                   * ```js
                   * class extends AudioWorkletProcessor {
                   *
                   *     __buffers = new WeakSet();
                   *
                   *     constructor () {
                   *         super();
                   *
                   *         this.port.postMessage = ((postMessage) => {
                   *             return (message, transferables) => {
                   *                 const filteredTransferables = (transferables)
                   *                     ? transferables.filter((transferable) => !this.__buffers.has(transferable))
                   *                     : transferables;
                   *
                   *                 return postMessage.call(this.port, message, filteredTransferables);
                   *              };
                   *         })(this.port.postMessage);
                   *     }
                   * }
                   * ```
                   */        const blob = new Blob([ `${importStatements};((AudioWorkletProcessor,registerProcessor)=>{${sourceWithoutImportStatements}\n})(${isSupportingPostMessage ? "AudioWorkletProcessor" : "class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${isSupportingPostMessage ? "" : "__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${isSupportingPostMessage ? "" : "i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${currentIndex}',class extends AudioWorkletProcessor{process(){return !1}})` ], {
          type: "application/javascript; charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        return nativeContext.audioWorklet.addModule(url, options).then((() => {
          if (isNativeOfflineAudioContext(nativeContext)) return nativeContext;
          // Bug #186: Chrome and Edge do not allow to create an AudioWorkletNode on a closed AudioContext.
                    const backupOfflineAudioContext = getOrCreateBackupOfflineAudioContext(nativeContext);
          return backupOfflineAudioContext.audioWorklet.addModule(url, options).then((() => backupOfflineAudioContext));
        })).then((nativeContextOrBackupOfflineAudioContext => {
          if (null === nativeAudioWorkletNodeConstructor) throw new SyntaxError;
          try {
            // Bug #190: Safari doesn't throw an error when loading an unparsable module.
            new nativeAudioWorkletNodeConstructor(nativeContextOrBackupOfflineAudioContext, `__sac${currentIndex}`);
 // tslint:disable-line:no-unused-expression
                    } catch {
            throw new SyntaxError;
          }
        })).finally((() => URL.revokeObjectURL(url)));
      }));
      return void 0 === ongoingRequestsOfContext ? ongoingRequests.set(context, new Map([ [ moduleURL, promise ] ])) : ongoingRequestsOfContext.set(moduleURL, promise), 
      promise.then((() => {
        const updatedResolvedRequestsOfContext = resolvedRequests.get(context);
        void 0 === updatedResolvedRequestsOfContext ? resolvedRequests.set(context, new Set([ moduleURL ])) : updatedResolvedRequestsOfContext.add(moduleURL);
      })).finally((() => {
        const updatedOngoingRequestsOfContext = ongoingRequests.get(context);
        void 0 !== updatedOngoingRequestsOfContext && updatedOngoingRequestsOfContext.delete(moduleURL);
      })), promise;
    };
  })(cacheTestResult, createNotSupportedError, (window => source => new Promise(((resolve, reject) => {
    if (null === window) 
    // Bug #182 Chrome and Edge do throw an instance of a SyntaxError instead of a DOMException.
    return void reject(new SyntaxError);
    const head = window.document.head;
    if (null === head) 
    // Bug #182 Chrome and Edge do throw an instance of a SyntaxError instead of a DOMException.
    reject(new SyntaxError); else {
      const script = window.document.createElement("script");
      // @todo Safari doesn't like URLs with a type of 'application/javascript; charset=utf-8'.
            const blob = new Blob([ source ], {
        type: "application/javascript"
      });
      const url = URL.createObjectURL(blob);
      const originalOnErrorHandler = window.onerror;
      const removeErrorEventListenerAndRevokeUrl = () => {
        window.onerror = originalOnErrorHandler, URL.revokeObjectURL(url);
      };
      window.onerror = (message, src, lineno, colno, error) => 
      // @todo Edge thinks the source is the one of the html document.
      src === url || src === window.location.href && 1 === lineno && 1 === colno ? (removeErrorEventListenerAndRevokeUrl(), 
      reject(error), !1) : null !== originalOnErrorHandler ? originalOnErrorHandler(message, src, lineno, colno, error) : void 0, 
      script.onerror = () => {
        removeErrorEventListenerAndRevokeUrl(), 
        // Bug #182 Chrome and Edge do throw an instance of a SyntaxError instead of a DOMException.
        reject(new SyntaxError);
      }, script.onload = () => {
        removeErrorEventListenerAndRevokeUrl(), resolve();
      }, script.src = url, script.type = "module", head.appendChild(script);
    }
  })))(window$1), exposeCurrentFrameAndCurrentTime, (createAbortError => async url => {
    try {
      const response = await fetch(url);
      if (response.ok) return [ await response.text(), response.url ];
    } catch {
      // Ignore errors.
    }
 // tslint:disable-line:no-empty
        throw createAbortError();
  })((() => new DOMException("", "AbortError"))), getNativeContext, getOrCreateBackupOfflineAudioContext, isNativeOfflineAudioContext, nativeAudioWorkletNodeConstructor, new WeakMap, new WeakMap, ((nativeAudioWorkletNodeConstructor, nativeOfflineAudioContextConstructor) => async () => {
    // Bug #61: If there is no native AudioWorkletNode it gets faked and therefore it is no problem if the it doesn't exist.
    if (null === nativeAudioWorkletNodeConstructor) return !0;
    if (null === nativeOfflineAudioContextConstructor) return !1;
    const blob = new Blob([ 'class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)' ], {
      type: "application/javascript; charset=utf-8"
    });
    // Bug #141: Safari does not support creating an OfflineAudioContext with less than 44100 Hz.
        const offlineAudioContext = new nativeOfflineAudioContextConstructor(1, 128, 44100);
    const url = URL.createObjectURL(blob);
    let isEmittingMessageEvents = !1;
    let isEmittingProcessorErrorEvents = !1;
    try {
      await offlineAudioContext.audioWorklet.addModule(url);
      const audioWorkletNode = new nativeAudioWorkletNodeConstructor(offlineAudioContext, "a", {
        numberOfOutputs: 0
      });
      const oscillator = offlineAudioContext.createOscillator();
      audioWorkletNode.port.onmessage = () => isEmittingMessageEvents = !0, audioWorkletNode.onprocessorerror = () => isEmittingProcessorErrorEvents = !0, 
      oscillator.connect(audioWorkletNode), oscillator.start(0), await offlineAudioContext.startRendering(), 
      // Bug #197: Safari does not deliver the messages before the promise returned by startRendering() resolves.
      await new Promise((resolve => setTimeout(resolve)));
    } catch {
      // Ignore errors.
    } finally {
      URL.revokeObjectURL(url);
    }
    return isEmittingMessageEvents && !isEmittingProcessorErrorEvents;
  })(nativeAudioWorkletNodeConstructor, nativeOfflineAudioContextConstructor), 
  // @todo window is guaranteed to be defined because isSecureContext checks that as well.
  window$1) : void 0;
  const isNativeContext = ((isNativeAudioContext, isNativeOfflineAudioContext) => anything => isNativeAudioContext(anything) || isNativeOfflineAudioContext(anything))(isNativeAudioContext, isNativeOfflineAudioContext);
  const decodeAudioData = ((audioBufferStore, cacheTestResult, createDataCloneError, createEncodingError, detachedArrayBuffers, getNativeContext, isNativeContext, testAudioBufferCopyChannelMethodsOutOfBoundsSupport, testPromiseSupport, wrapAudioBufferCopyChannelMethods, wrapAudioBufferCopyChannelMethodsOutOfBounds) => (anyContext, audioData) => {
    const nativeContext = isNativeContext(anyContext) ? anyContext : getNativeContext(anyContext);
    // Bug #43: Only Chrome and Edge do throw a DataCloneError.
        if (detachedArrayBuffers.has(audioData)) {
      const err = createDataCloneError();
      return Promise.reject(err);
    }
    // The audioData parameter maybe of a type which can't be added to a WeakSet.
        try {
      detachedArrayBuffers.add(audioData);
    } catch {
      // Ignore errors.
    }
    // Bug #21: Safari does not support promises yet.
        return cacheTestResult(testPromiseSupport, (() => testPromiseSupport(nativeContext))) ? nativeContext.decodeAudioData(audioData).then((audioBuffer => (
    // Bug #133: Safari does neuter the ArrayBuffer.
    detachArrayBuffer(audioData).catch((() => {})), 
    // Bug #157: Firefox does not allow the bufferOffset to be out-of-bounds.
    cacheTestResult(testAudioBufferCopyChannelMethodsOutOfBoundsSupport, (() => testAudioBufferCopyChannelMethodsOutOfBoundsSupport(audioBuffer))) || wrapAudioBufferCopyChannelMethodsOutOfBounds(audioBuffer), 
    audioBufferStore.add(audioBuffer), audioBuffer))) : new Promise(((resolve, reject) => {
      const complete = async () => {
        // Bug #133: Safari does neuter the ArrayBuffer.
        try {
          await detachArrayBuffer(audioData);
        } catch {
          // Ignore errors.
        }
      };
      const fail = err => {
        reject(err), complete();
      };
      // Bug #26: Safari throws a synchronous error.
            try {
        // Bug #1: Safari requires a successCallback.
        nativeContext.decodeAudioData(audioData, (audioBuffer => {
          // Bug #5: Safari does not support copyFromChannel() and copyToChannel().
          // Bug #100: Safari does throw a wrong error when calling getChannelData() with an out-of-bounds value.
          "function" != typeof audioBuffer.copyFromChannel && (wrapAudioBufferCopyChannelMethods(audioBuffer), 
          wrapAudioBufferGetChannelDataMethod(audioBuffer)), audioBufferStore.add(audioBuffer), 
          complete().then((() => resolve(audioBuffer)));
        }), (err => {
          // Bug #4: Safari returns null instead of an error.
          fail(null === err ? createEncodingError() : err);
        }));
      } catch (err) {
        fail(err);
      }
    }));
    // Bug #21: Safari does not return a Promise yet.
    })(audioBufferStore, cacheTestResult, (() => new DOMException("", "DataCloneError")), (() => new DOMException("", "EncodingError")), new WeakSet, getNativeContext, isNativeContext, testAudioBufferCopyChannelMethodsOutOfBoundsSupport, testPromiseSupport, wrapAudioBufferCopyChannelMethods, wrapAudioBufferCopyChannelMethodsOutOfBounds);
  const baseAudioContextConstructor = ((addAudioWorkletModule, analyserNodeConstructor, audioBufferConstructor, audioBufferSourceNodeConstructor, biquadFilterNodeConstructor, channelMergerNodeConstructor, channelSplitterNodeConstructor, constantSourceNodeConstructor, convolverNodeConstructor, decodeAudioData, delayNodeConstructor, dynamicsCompressorNodeConstructor, gainNodeConstructor, iIRFilterNodeConstructor, minimalBaseAudioContextConstructor, oscillatorNodeConstructor, pannerNodeConstructor, periodicWaveConstructor, stereoPannerNodeConstructor, waveShaperNodeConstructor) => class extends minimalBaseAudioContextConstructor {
    constructor(_nativeContext, numberOfChannels) {
      super(_nativeContext, numberOfChannels), this._nativeContext = _nativeContext, this._audioWorklet = void 0 === addAudioWorkletModule ? void 0 : {
        addModule: (moduleURL, options) => addAudioWorkletModule(this, moduleURL, options)
      };
    }
    get audioWorklet() {
      return this._audioWorklet;
    }
    createAnalyser() {
      return new analyserNodeConstructor(this);
    }
    createBiquadFilter() {
      return new biquadFilterNodeConstructor(this);
    }
    createBuffer(numberOfChannels, length, sampleRate) {
      return new audioBufferConstructor({
        length: length,
        numberOfChannels: numberOfChannels,
        sampleRate: sampleRate
      });
    }
    createBufferSource() {
      return new audioBufferSourceNodeConstructor(this);
    }
    createChannelMerger(numberOfInputs = 6) {
      return new channelMergerNodeConstructor(this, {
        numberOfInputs: numberOfInputs
      });
    }
    createChannelSplitter(numberOfOutputs = 6) {
      return new channelSplitterNodeConstructor(this, {
        numberOfOutputs: numberOfOutputs
      });
    }
    createConstantSource() {
      return new constantSourceNodeConstructor(this);
    }
    createConvolver() {
      return new convolverNodeConstructor(this);
    }
    createDelay(maxDelayTime = 1) {
      return new delayNodeConstructor(this, {
        maxDelayTime: maxDelayTime
      });
    }
    createDynamicsCompressor() {
      return new dynamicsCompressorNodeConstructor(this);
    }
    createGain() {
      return new gainNodeConstructor(this);
    }
    createIIRFilter(feedforward, feedback) {
      return new iIRFilterNodeConstructor(this, {
        feedback: feedback,
        feedforward: feedforward
      });
    }
    createOscillator() {
      return new oscillatorNodeConstructor(this);
    }
    createPanner() {
      return new pannerNodeConstructor(this);
    }
    createPeriodicWave(real, imag, constraints = {
      disableNormalization: !1
    }) {
      return new periodicWaveConstructor(this, {
        ...constraints,
        imag: imag,
        real: real
      });
    }
    createStereoPanner() {
      return new stereoPannerNodeConstructor(this);
    }
    createWaveShaper() {
      return new waveShaperNodeConstructor(this);
    }
    decodeAudioData(audioData, successCallback, errorCallback) {
      return decodeAudioData(this._nativeContext, audioData).then((audioBuffer => ("function" == typeof successCallback && successCallback(audioBuffer), 
      audioBuffer)), (err => {
        throw "function" == typeof errorCallback && errorCallback(err), err;
      }));
    }
  })(addAudioWorkletModule, analyserNodeConstructor, audioBufferConstructor, audioBufferSourceNodeConstructor, biquadFilterNodeConstructor, channelMergerNodeConstructor, channelSplitterNodeConstructor, constantSourceNodeConstructor, convolverNodeConstructor, decodeAudioData, delayNodeConstructor, dynamicsCompressorNodeConstructor, gainNodeConstructor, iIRFilterNodeConstructor, minimalBaseAudioContextConstructor, oscillatorNodeConstructor, pannerNodeConstructor, periodicWaveConstructor, stereoPannerNodeConstructor, waveShaperNodeConstructor);
  const mediaElementAudioSourceNodeConstructor = ((audioNodeConstructor, createNativeMediaElementAudioSourceNode, getNativeContext, isNativeOfflineAudioContext) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const nativeMediaElementAudioSourceNode = createNativeMediaElementAudioSourceNode(nativeContext, options);
      // Bug #171: Safari allows to create a MediaElementAudioSourceNode with an OfflineAudioContext.
            if (isNativeOfflineAudioContext(nativeContext)) throw TypeError();
      super(context, !0, nativeMediaElementAudioSourceNode, null), this._nativeMediaElementAudioSourceNode = nativeMediaElementAudioSourceNode;
    }
    get mediaElement() {
      return this._nativeMediaElementAudioSourceNode.mediaElement;
    }
  })(audioNodeConstructor, ((nativeAudioContext, options) => nativeAudioContext.createMediaElementSource(options.mediaElement)), getNativeContext, isNativeOfflineAudioContext);
  const mediaStreamAudioDestinationNodeConstructor = ((audioNodeConstructor, createNativeMediaStreamAudioDestinationNode, getNativeContext, isNativeOfflineAudioContext) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      // Bug #173: Safari allows to create a MediaStreamAudioDestinationNode with an OfflineAudioContext.
            if (isNativeOfflineAudioContext(nativeContext)) throw new TypeError;
      const mergedOptions = {
        ...DEFAULT_OPTIONS$6,
        ...options
      };
      const nativeMediaStreamAudioDestinationNode = createNativeMediaStreamAudioDestinationNode(nativeContext, mergedOptions);
      super(context, !1, nativeMediaStreamAudioDestinationNode, null), this._nativeMediaStreamAudioDestinationNode = nativeMediaStreamAudioDestinationNode;
    }
    get stream() {
      return this._nativeMediaStreamAudioDestinationNode.stream;
    }
  })(audioNodeConstructor, ((nativeAudioContext, options) => {
    const nativeMediaStreamAudioDestinationNode = nativeAudioContext.createMediaStreamDestination();
    return assignNativeAudioNodeOptions(nativeMediaStreamAudioDestinationNode, options), 
    // Bug #174: Safari does expose a wrong numberOfOutputs.
    1 === nativeMediaStreamAudioDestinationNode.numberOfOutputs && Object.defineProperty(nativeMediaStreamAudioDestinationNode, "numberOfOutputs", {
      get: () => 0
    }), nativeMediaStreamAudioDestinationNode;
  }), getNativeContext, isNativeOfflineAudioContext);
  const mediaStreamAudioSourceNodeConstructor = ((audioNodeConstructor, createNativeMediaStreamAudioSourceNode, getNativeContext, isNativeOfflineAudioContext) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      const nativeMediaStreamAudioSourceNode = createNativeMediaStreamAudioSourceNode(nativeContext, options);
      // Bug #172: Safari allows to create a MediaStreamAudioSourceNode with an OfflineAudioContext.
            if (isNativeOfflineAudioContext(nativeContext)) throw new TypeError;
      super(context, !0, nativeMediaStreamAudioSourceNode, null), this._nativeMediaStreamAudioSourceNode = nativeMediaStreamAudioSourceNode;
    }
    get mediaStream() {
      return this._nativeMediaStreamAudioSourceNode.mediaStream;
    }
  })(audioNodeConstructor, ((nativeAudioContext, {mediaStream: mediaStream}) => {
    const audioStreamTracks = mediaStream.getAudioTracks();
    /*
       * Bug #151: Safari does not use the audio track as input anymore if it gets removed from the mediaStream after construction.
       * Bug #159: Safari picks the first audio track if the MediaStream has more than one audio track.
       */    audioStreamTracks.sort(((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    const filteredAudioStreamTracks = audioStreamTracks.slice(0, 1);
    const nativeMediaStreamAudioSourceNode = nativeAudioContext.createMediaStreamSource(new MediaStream(filteredAudioStreamTracks));
    /*
       * Bug #151 & #159: The given mediaStream gets reconstructed before it gets passed to the native node which is why the accessor needs
       * to be overwritten as it would otherwise expose the reconstructed version.
       */    return Object.defineProperty(nativeMediaStreamAudioSourceNode, "mediaStream", {
      value: mediaStream
    }), nativeMediaStreamAudioSourceNode;
  }), getNativeContext, isNativeOfflineAudioContext);
  const createNativeMediaStreamTrackAudioSourceNode = ((createInvalidStateError, isNativeOfflineAudioContext) => (nativeAudioContext, {mediaStreamTrack: mediaStreamTrack}) => {
    // Bug #121: Only Firefox does yet support the MediaStreamTrackAudioSourceNode.
    if ("function" == typeof nativeAudioContext.createMediaStreamTrackSource) return nativeAudioContext.createMediaStreamTrackSource(mediaStreamTrack);
    const mediaStream = new MediaStream([ mediaStreamTrack ]);
    const nativeMediaStreamAudioSourceNode = nativeAudioContext.createMediaStreamSource(mediaStream);
    // Bug #120: Firefox does not throw an error if the mediaStream has no audio track.
        if ("audio" !== mediaStreamTrack.kind) throw createInvalidStateError();
    // Bug #172: Safari allows to create a MediaStreamAudioSourceNode with an OfflineAudioContext.
        if (isNativeOfflineAudioContext(nativeAudioContext)) throw new TypeError;
    return nativeMediaStreamAudioSourceNode;
  })(createInvalidStateError, isNativeOfflineAudioContext);
  const mediaStreamTrackAudioSourceNodeConstructor = ((audioNodeConstructor, createNativeMediaStreamTrackAudioSourceNode, getNativeContext) => class extends audioNodeConstructor {
    constructor(context, options) {
      const nativeContext = getNativeContext(context);
      super(context, !0, createNativeMediaStreamTrackAudioSourceNode(nativeContext, options), null);
    }
  })(audioNodeConstructor, createNativeMediaStreamTrackAudioSourceNode, getNativeContext);
  const audioContextConstructor = ((baseAudioContextConstructor, createInvalidStateError, createNotSupportedError, createUnknownError, mediaElementAudioSourceNodeConstructor, mediaStreamAudioDestinationNodeConstructor, mediaStreamAudioSourceNodeConstructor, mediaStreamTrackAudioSourceNodeConstructor, nativeAudioContextConstructor) => class extends baseAudioContextConstructor {
    constructor(options = {}) {
      if (null === nativeAudioContextConstructor) throw new Error("Missing the native AudioContext constructor.");
      let nativeAudioContext;
      try {
        nativeAudioContext = new nativeAudioContextConstructor(options);
      } catch (err) {
        // Bug #192 Safari does throw a SyntaxError if the sampleRate is not supported.
        if (12 === err.code && "sampleRate is not in range" === err.message) throw createNotSupportedError();
        throw err;
      }
      // Bug #131 Safari returns null when there are four other AudioContexts running already.
            if (null === nativeAudioContext) throw createUnknownError();
      // Bug #51 Only Chrome and Edge throw an error if the given latencyHint is invalid.
            if (!(latencyHint => void 0 === latencyHint || "number" == typeof latencyHint || "string" == typeof latencyHint && ("balanced" === latencyHint || "interactive" === latencyHint || "playback" === latencyHint))(options.latencyHint)) throw new TypeError(`The provided value '${options.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);
      // Bug #150 Safari does not support setting the sampleRate.
            if (void 0 !== options.sampleRate && nativeAudioContext.sampleRate !== options.sampleRate) throw createNotSupportedError();
      super(nativeAudioContext, 2);
      const {latencyHint: latencyHint} = options;
      const {sampleRate: sampleRate} = nativeAudioContext;
      // @todo The values for 'balanced', 'interactive' and 'playback' are just copied from Chrome's implementation.
            /*
               * Bug #34: Chrome and Edge pretend to be running right away, but fire an onstatechange event when the state actually changes
               * to 'running'.
               */
      if (this._baseLatency = "number" == typeof nativeAudioContext.baseLatency ? nativeAudioContext.baseLatency : "balanced" === latencyHint ? 512 / sampleRate : "interactive" === latencyHint || void 0 === latencyHint ? 256 / sampleRate : "playback" === latencyHint ? 1024 / sampleRate : 
      /*
                                     * @todo The min (256) and max (16384) values are taken from the allowed bufferSize values of a
                                     * ScriptProcessorNode.
                                     */
      128 * Math.max(2, Math.min(128, Math.round(latencyHint * sampleRate / 128))) / sampleRate, 
      this._nativeAudioContext = nativeAudioContext, 
      // Bug #188: Safari will set the context's state to 'interrupted' in case the user switches tabs.
      "webkitAudioContext" === nativeAudioContextConstructor.name ? (this._nativeGainNode = nativeAudioContext.createGain(), 
      this._nativeOscillatorNode = nativeAudioContext.createOscillator(), this._nativeGainNode.gain.value = 1e-37, 
      this._nativeOscillatorNode.connect(this._nativeGainNode).connect(nativeAudioContext.destination), 
      this._nativeOscillatorNode.start()) : (this._nativeGainNode = null, this._nativeOscillatorNode = null), 
      this._state = null, "running" === nativeAudioContext.state) {
        this._state = "suspended";
        const revokeState = () => {
          "suspended" === this._state && (this._state = null), nativeAudioContext.removeEventListener("statechange", revokeState);
        };
        nativeAudioContext.addEventListener("statechange", revokeState);
      }
    }
    get baseLatency() {
      return this._baseLatency;
    }
    get state() {
      return null !== this._state ? this._state : this._nativeAudioContext.state;
    }
    close() {
      // Bug #35: Firefox does not throw an error if the AudioContext was closed before.
      return "closed" === this.state ? this._nativeAudioContext.close().then((() => {
        throw createInvalidStateError();
      })) : (
      // Bug #34: If the state was set to suspended before it should be revoked now.
      "suspended" === this._state && (this._state = null), this._nativeAudioContext.close().then((() => {
        null !== this._nativeGainNode && null !== this._nativeOscillatorNode && (this._nativeOscillatorNode.stop(), 
        this._nativeGainNode.disconnect(), this._nativeOscillatorNode.disconnect()), deactivateAudioGraph(this);
      })));
    }
    createMediaElementSource(mediaElement) {
      return new mediaElementAudioSourceNodeConstructor(this, {
        mediaElement: mediaElement
      });
    }
    createMediaStreamDestination() {
      return new mediaStreamAudioDestinationNodeConstructor(this);
    }
    createMediaStreamSource(mediaStream) {
      return new mediaStreamAudioSourceNodeConstructor(this, {
        mediaStream: mediaStream
      });
    }
    createMediaStreamTrackSource(mediaStreamTrack) {
      return new mediaStreamTrackAudioSourceNodeConstructor(this, {
        mediaStreamTrack: mediaStreamTrack
      });
    }
    resume() {
      return "suspended" === this._state ? new Promise(((resolve, reject) => {
        const resolvePromise = () => {
          this._nativeAudioContext.removeEventListener("statechange", resolvePromise), "running" === this._nativeAudioContext.state ? resolve() : this.resume().then(resolve, reject);
        };
        this._nativeAudioContext.addEventListener("statechange", resolvePromise);
      })) : this._nativeAudioContext.resume().catch((err => {
        // Bug #55: Chrome and Edge do throw an InvalidAccessError instead of an InvalidStateError.
        // Bug #56: Safari invokes the catch handler but without an error.
        if (void 0 === err || 15 === err.code) throw createInvalidStateError();
        throw err;
      }));
    }
    suspend() {
      return this._nativeAudioContext.suspend().catch((err => {
        // Bug #56: Safari invokes the catch handler but without an error.
        if (void 0 === err) throw createInvalidStateError();
        throw err;
      }));
    }
  })(baseAudioContextConstructor, createInvalidStateError, createNotSupportedError, (() => new DOMException("", "UnknownError")), mediaElementAudioSourceNodeConstructor, mediaStreamAudioDestinationNodeConstructor, mediaStreamAudioSourceNodeConstructor, mediaStreamTrackAudioSourceNodeConstructor, nativeAudioContextConstructor);
  const getUnrenderedAudioWorkletNodes = (unrenderedAudioWorkletNodeStore => nativeContext => {
    const unrenderedAudioWorkletNodes = unrenderedAudioWorkletNodeStore.get(nativeContext);
    if (void 0 === unrenderedAudioWorkletNodes) throw new Error("The context has no set of AudioWorkletNodes.");
    return unrenderedAudioWorkletNodes;
  })(unrenderedAudioWorkletNodeStore);
  const addUnrenderedAudioWorkletNode = (getUnrenderedAudioWorkletNodes => (nativeContext, audioWorkletNode) => {
    getUnrenderedAudioWorkletNodes(nativeContext).add(audioWorkletNode);
  })(getUnrenderedAudioWorkletNodes);
  const connectMultipleOutputs = (createIndexSizeError => (outputAudioNodes, destination, output = 0, input = 0) => {
    const outputAudioNode = outputAudioNodes[output];
    if (void 0 === outputAudioNode) throw createIndexSizeError();
    return isNativeAudioNode$1(destination) ? outputAudioNode.connect(destination, 0, input) : outputAudioNode.connect(destination, 0);
  })(createIndexSizeError);
  const deleteUnrenderedAudioWorkletNode = (getUnrenderedAudioWorkletNodes => (nativeContext, audioWorkletNode) => {
    getUnrenderedAudioWorkletNodes(nativeContext).delete(audioWorkletNode);
  })(getUnrenderedAudioWorkletNodes);
  const disconnectMultipleOutputs = (createIndexSizeError => (outputAudioNodes, destinationOrOutput = void 0, output = void 0, input = 0) => void 0 === destinationOrOutput ? outputAudioNodes.forEach((outputAudioNode => outputAudioNode.disconnect())) : "number" == typeof destinationOrOutput ? getOutputAudioNodeAtIndex(createIndexSizeError, outputAudioNodes, destinationOrOutput).disconnect() : isNativeAudioNode$1(destinationOrOutput) ? void 0 === output ? outputAudioNodes.forEach((outputAudioNode => outputAudioNode.disconnect(destinationOrOutput))) : void 0 === input ? getOutputAudioNodeAtIndex(createIndexSizeError, outputAudioNodes, output).disconnect(destinationOrOutput, 0) : getOutputAudioNodeAtIndex(createIndexSizeError, outputAudioNodes, output).disconnect(destinationOrOutput, 0, input) : void 0 === output ? outputAudioNodes.forEach((outputAudioNode => outputAudioNode.disconnect(destinationOrOutput))) : getOutputAudioNodeAtIndex(createIndexSizeError, outputAudioNodes, output).disconnect(destinationOrOutput, 0))(createIndexSizeError);
  const activeAudioWorkletNodeInputsStore = new WeakMap;
  const getActiveAudioWorkletNodeInputs = ((activeAudioWorkletNodeInputsStore, getValueForKey) => nativeAudioWorkletNode => getValueForKey(activeAudioWorkletNodeInputsStore, nativeAudioWorkletNode))(activeAudioWorkletNodeInputsStore, getValueForKey);
  const createNativeAudioWorkletNodeFaker = ((connectMultipleOutputs, createIndexSizeError, createInvalidStateError, createNativeChannelMergerNode, createNativeChannelSplitterNode, createNativeConstantSourceNode, createNativeGainNode, createNativeScriptProcessorNode, createNotSupportedError, disconnectMultipleOutputs, exposeCurrentFrameAndCurrentTime, getActiveAudioWorkletNodeInputs, monitorConnections) => (nativeContext, baseLatency, processorConstructor, options) => {
    if (0 === options.numberOfInputs && 0 === options.numberOfOutputs) throw createNotSupportedError();
    const outputChannelCount = Array.isArray(options.outputChannelCount) ? options.outputChannelCount : Array.from(options.outputChannelCount);
    // @todo Check if any of the channelCount values is greater than the implementation's maximum number of channels.
        if (outputChannelCount.some((channelCount => channelCount < 1))) throw createNotSupportedError();
    if (outputChannelCount.length !== options.numberOfOutputs) throw createIndexSizeError();
    // Bug #61: This is not part of the standard but required for the faker to work.
        if ("explicit" !== options.channelCountMode) throw createNotSupportedError();
    const numberOfInputChannels = options.channelCount * options.numberOfInputs;
    const numberOfOutputChannels = outputChannelCount.reduce(((sum, value) => sum + value), 0);
    const numberOfParameters = void 0 === processorConstructor.parameterDescriptors ? 0 : processorConstructor.parameterDescriptors.length;
    // Bug #61: This is not part of the standard but required for the faker to work.
        if (numberOfInputChannels + numberOfParameters > 6 || numberOfOutputChannels > 6) throw createNotSupportedError();
    const messageChannel = new MessageChannel;
    const gainNodes = [];
    const inputChannelSplitterNodes = [];
    for (let i = 0; i < options.numberOfInputs; i += 1) gainNodes.push(createNativeGainNode(nativeContext, {
      channelCount: options.channelCount,
      channelCountMode: options.channelCountMode,
      channelInterpretation: options.channelInterpretation,
      gain: 1
    })), inputChannelSplitterNodes.push(createNativeChannelSplitterNode(nativeContext, {
      channelCount: options.channelCount,
      channelCountMode: "explicit",
      channelInterpretation: "discrete",
      numberOfOutputs: options.channelCount
    }));
    const constantSourceNodes = [];
    if (void 0 !== processorConstructor.parameterDescriptors) for (const {defaultValue: defaultValue, maxValue: maxValue, minValue: minValue, name: name} of processorConstructor.parameterDescriptors) {
      const constantSourceNode = createNativeConstantSourceNode(nativeContext, {
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "discrete",
        offset: void 0 !== options.parameterData[name] ? options.parameterData[name] : void 0 === defaultValue ? 0 : defaultValue
      });
      Object.defineProperties(constantSourceNode.offset, {
        defaultValue: {
          get: () => void 0 === defaultValue ? 0 : defaultValue
        },
        maxValue: {
          get: () => void 0 === maxValue ? MOST_POSITIVE_SINGLE_FLOAT : maxValue
        },
        minValue: {
          get: () => void 0 === minValue ? MOST_NEGATIVE_SINGLE_FLOAT : minValue
        }
      }), constantSourceNodes.push(constantSourceNode);
    }
    const inputChannelMergerNode = createNativeChannelMergerNode(nativeContext, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
      numberOfInputs: Math.max(1, numberOfInputChannels + numberOfParameters)
    });
    const bufferSize = computeBufferSize(baseLatency, nativeContext.sampleRate);
    const scriptProcessorNode = createNativeScriptProcessorNode(nativeContext, bufferSize, numberOfInputChannels + numberOfParameters, 
    // Bug #87: Only Firefox will fire an AudioProcessingEvent if there is no connected output.
    Math.max(1, numberOfOutputChannels));
    const outputChannelSplitterNode = createNativeChannelSplitterNode(nativeContext, {
      channelCount: Math.max(1, numberOfOutputChannels),
      channelCountMode: "explicit",
      channelInterpretation: "discrete",
      numberOfOutputs: Math.max(1, numberOfOutputChannels)
    });
    const outputChannelMergerNodes = [];
    for (let i = 0; i < options.numberOfOutputs; i += 1) outputChannelMergerNodes.push(createNativeChannelMergerNode(nativeContext, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
      numberOfInputs: outputChannelCount[i]
    }));
    for (let i = 0; i < options.numberOfInputs; i += 1) {
      gainNodes[i].connect(inputChannelSplitterNodes[i]);
      for (let j = 0; j < options.channelCount; j += 1) inputChannelSplitterNodes[i].connect(inputChannelMergerNode, j, i * options.channelCount + j);
    }
    const parameterMap = new ReadOnlyMap(void 0 === processorConstructor.parameterDescriptors ? [] : processorConstructor.parameterDescriptors.map((({name: name}, index) => {
      const constantSourceNode = constantSourceNodes[index];
      return constantSourceNode.connect(inputChannelMergerNode, 0, numberOfInputChannels + index), 
      constantSourceNode.start(0), [ name, constantSourceNode.offset ];
    })));
    inputChannelMergerNode.connect(scriptProcessorNode);
    let channelInterpretation = options.channelInterpretation;
    let onprocessorerror = null;
    // Bug #87: Expose at least one output to make this node connectable.
        const outputAudioNodes = 0 === options.numberOfOutputs ? [ scriptProcessorNode ] : outputChannelMergerNodes;
    const nativeAudioWorkletNodeFaker = {
      get bufferSize() {
        return bufferSize;
      },
      get channelCount() {
        return options.channelCount;
      },
      set channelCount(_) {
        // Bug #61: This is not part of the standard but required for the faker to work.
        throw createInvalidStateError();
      },
      get channelCountMode() {
        return options.channelCountMode;
      },
      set channelCountMode(_) {
        // Bug #61: This is not part of the standard but required for the faker to work.
        throw createInvalidStateError();
      },
      get channelInterpretation() {
        return channelInterpretation;
      },
      set channelInterpretation(value) {
        for (const gainNode of gainNodes) gainNode.channelInterpretation = value;
        channelInterpretation = value;
      },
      get context() {
        return scriptProcessorNode.context;
      },
      get inputs() {
        return gainNodes;
      },
      get numberOfInputs() {
        return options.numberOfInputs;
      },
      get numberOfOutputs() {
        return options.numberOfOutputs;
      },
      get onprocessorerror() {
        return onprocessorerror;
      },
      set onprocessorerror(value) {
        "function" == typeof onprocessorerror && nativeAudioWorkletNodeFaker.removeEventListener("processorerror", onprocessorerror), 
        onprocessorerror = "function" == typeof value ? value : null, "function" == typeof onprocessorerror && nativeAudioWorkletNodeFaker.addEventListener("processorerror", onprocessorerror);
      },
      get parameters() {
        return parameterMap;
      },
      get port() {
        return messageChannel.port2;
      },
      addEventListener: (...args) => scriptProcessorNode.addEventListener(args[0], args[1], args[2]),
      connect: connectMultipleOutputs.bind(null, outputAudioNodes),
      disconnect: disconnectMultipleOutputs.bind(null, outputAudioNodes),
      dispatchEvent: (...args) => scriptProcessorNode.dispatchEvent(args[0]),
      removeEventListener: (...args) => scriptProcessorNode.removeEventListener(args[0], args[1], args[2])
    };
    const patchedEventListeners = new Map;
    var addEventListener;
    var removeEventListener;
    messageChannel.port1.addEventListener = (addEventListener = messageChannel.port1.addEventListener, 
    (...args) => {
      if ("message" === args[0]) {
        const unpatchedEventListener = "function" == typeof args[1] ? args[1] : "object" == typeof args[1] && null !== args[1] && "function" == typeof args[1].handleEvent ? args[1].handleEvent : null;
        if (null !== unpatchedEventListener) {
          const patchedEventListener = patchedEventListeners.get(args[1]);
          void 0 !== patchedEventListener ? args[1] = patchedEventListener : (args[1] = event => {
            exposeCurrentFrameAndCurrentTime(nativeContext.currentTime, nativeContext.sampleRate, (() => unpatchedEventListener(event)));
          }, patchedEventListeners.set(unpatchedEventListener, args[1]));
        }
      }
      return addEventListener.call(messageChannel.port1, args[0], args[1], args[2]);
    }), messageChannel.port1.removeEventListener = (removeEventListener = messageChannel.port1.removeEventListener, 
    (...args) => {
      if ("message" === args[0]) {
        const patchedEventListener = patchedEventListeners.get(args[1]);
        void 0 !== patchedEventListener && (patchedEventListeners.delete(args[1]), args[1] = patchedEventListener);
      }
      return removeEventListener.call(messageChannel.port1, args[0], args[1], args[2]);
    });
    let onmessage = null;
    Object.defineProperty(messageChannel.port1, "onmessage", {
      get: () => onmessage,
      set: value => {
        "function" == typeof onmessage && messageChannel.port1.removeEventListener("message", onmessage), 
        onmessage = "function" == typeof value ? value : null, "function" == typeof onmessage && (messageChannel.port1.addEventListener("message", onmessage), 
        messageChannel.port1.start());
      }
    }), processorConstructor.prototype.port = messageChannel.port1;
    let audioWorkletProcessor = null;
    const audioWorkletProcessorPromise = ((nativeContext, nativeAudioWorkletNode, processorConstructor, audioWorkletNodeOptions) => {
      let nodeToProcessorMap = NODE_TO_PROCESSOR_MAPS.get(nativeContext);
      void 0 === nodeToProcessorMap && (nodeToProcessorMap = new WeakMap, NODE_TO_PROCESSOR_MAPS.set(nativeContext, nodeToProcessorMap));
      const audioWorkletProcessorPromise = createAudioWorkletProcessorPromise(processorConstructor, audioWorkletNodeOptions);
      return nodeToProcessorMap.set(nativeAudioWorkletNode, audioWorkletProcessorPromise), 
      audioWorkletProcessorPromise;
    })(nativeContext, nativeAudioWorkletNodeFaker, processorConstructor, options);
    audioWorkletProcessorPromise.then((dWrkltPrcssr => audioWorkletProcessor = dWrkltPrcssr));
    const inputs = createNestedArrays(options.numberOfInputs, options.channelCount);
    const outputs = createNestedArrays(options.numberOfOutputs, outputChannelCount);
    const parameters = void 0 === processorConstructor.parameterDescriptors ? [] : processorConstructor.parameterDescriptors.reduce(((prmtrs, {name: name}) => ({
      ...prmtrs,
      [name]: new Float32Array(128)
    })), {});
    let isActive = !0;
    const disconnectOutputsGraph = () => {
      options.numberOfOutputs > 0 && scriptProcessorNode.disconnect(outputChannelSplitterNode);
      for (let i = 0, outputChannelSplitterNodeOutput = 0; i < options.numberOfOutputs; i += 1) {
        const outputChannelMergerNode = outputChannelMergerNodes[i];
        for (let j = 0; j < outputChannelCount[i]; j += 1) outputChannelSplitterNode.disconnect(outputChannelMergerNode, outputChannelSplitterNodeOutput + j, j);
        outputChannelSplitterNodeOutput += outputChannelCount[i];
      }
    };
    const activeInputIndexes = new Map;
    // tslint:disable-next-line:deprecation
        scriptProcessorNode.onaudioprocess = ({inputBuffer: inputBuffer, outputBuffer: outputBuffer}) => {
      if (null !== audioWorkletProcessor) {
        const activeInputs = getActiveAudioWorkletNodeInputs(nativeAudioWorkletNodeFaker);
        for (let i = 0; i < bufferSize; i += 128) {
          for (let j = 0; j < options.numberOfInputs; j += 1) for (let k = 0; k < options.channelCount; k += 1) copyFromChannel(inputBuffer, inputs[j], k, k, i);
          void 0 !== processorConstructor.parameterDescriptors && processorConstructor.parameterDescriptors.forEach((({name: name}, index) => {
            copyFromChannel(inputBuffer, parameters, name, numberOfInputChannels + index, i);
          }));
          for (let j = 0; j < options.numberOfInputs; j += 1) for (let k = 0; k < outputChannelCount[j]; k += 1) 
          // The byteLength will be 0 when the ArrayBuffer was transferred.
          0 === outputs[j][k].byteLength && (outputs[j][k] = new Float32Array(128));
          try {
            const potentiallyEmptyInputs = inputs.map(((input, index) => {
              if (activeInputs[index].size > 0) return activeInputIndexes.set(index, bufferSize / 128), 
              input;
              const count = activeInputIndexes.get(index);
              return void 0 === count ? [] : (input.every((channelData => channelData.every((sample => 0 === sample)))) && (1 === count ? activeInputIndexes.delete(index) : activeInputIndexes.set(index, count - 1)), 
              input);
            }));
            const activeSourceFlag = exposeCurrentFrameAndCurrentTime(nativeContext.currentTime + i / nativeContext.sampleRate, nativeContext.sampleRate, (() => audioWorkletProcessor.process(potentiallyEmptyInputs, outputs, parameters)));
            isActive = activeSourceFlag;
            for (let j = 0, outputChannelSplitterNodeOutput = 0; j < options.numberOfOutputs; j += 1) {
              for (let k = 0; k < outputChannelCount[j]; k += 1) copyToChannel(outputBuffer, outputs[j], k, outputChannelSplitterNodeOutput + k, i);
              outputChannelSplitterNodeOutput += outputChannelCount[j];
            }
          } catch (error) {
            isActive = !1, nativeAudioWorkletNodeFaker.dispatchEvent(new ErrorEvent("processorerror", {
              colno: error.colno,
              filename: error.filename,
              lineno: error.lineno,
              message: error.message
            }));
          }
          if (!isActive) {
            for (let j = 0; j < options.numberOfInputs; j += 1) {
              gainNodes[j].disconnect(inputChannelSplitterNodes[j]);
              for (let k = 0; k < options.channelCount; k += 1) inputChannelSplitterNodes[i].disconnect(inputChannelMergerNode, k, j * options.channelCount + k);
            }
            if (void 0 !== processorConstructor.parameterDescriptors) {
              const length = processorConstructor.parameterDescriptors.length;
              for (let j = 0; j < length; j += 1) {
                const constantSourceNode = constantSourceNodes[j];
                constantSourceNode.disconnect(inputChannelMergerNode, 0, numberOfInputChannels + j), 
                constantSourceNode.stop();
              }
            }
            inputChannelMergerNode.disconnect(scriptProcessorNode), scriptProcessorNode.onaudioprocess = null, 
            // tslint:disable-line:deprecation
            isConnected ? disconnectOutputsGraph() : disconnectFakeGraph();
            break;
          }
        }
      }
    };
    let isConnected = !1;
    // Bug #87: Only Firefox will fire an AudioProcessingEvent if there is no connected output.
        const nativeGainNode = createNativeGainNode(nativeContext, {
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "discrete",
      gain: 0
    });
    const connectFakeGraph = () => scriptProcessorNode.connect(nativeGainNode).connect(nativeContext.destination);
    const disconnectFakeGraph = () => {
      scriptProcessorNode.disconnect(nativeGainNode), nativeGainNode.disconnect();
    };
    return connectFakeGraph(), monitorConnections(nativeAudioWorkletNodeFaker, (() => {
      if (isActive) {
        disconnectFakeGraph(), options.numberOfOutputs > 0 && scriptProcessorNode.connect(outputChannelSplitterNode);
        for (let i = 0, outputChannelSplitterNodeOutput = 0; i < options.numberOfOutputs; i += 1) {
          const outputChannelMergerNode = outputChannelMergerNodes[i];
          for (let j = 0; j < outputChannelCount[i]; j += 1) outputChannelSplitterNode.connect(outputChannelMergerNode, outputChannelSplitterNodeOutput + j, j);
          outputChannelSplitterNodeOutput += outputChannelCount[i];
        }
      }
      isConnected = !0;
    }), (() => {
      isActive && (connectFakeGraph(), disconnectOutputsGraph()), isConnected = !1;
    }));
  })(connectMultipleOutputs, createIndexSizeError, createInvalidStateError, createNativeChannelMergerNode, createNativeChannelSplitterNode, createNativeConstantSourceNode, createNativeGainNode, createNativeScriptProcessorNode, createNotSupportedError, disconnectMultipleOutputs, exposeCurrentFrameAndCurrentTime, getActiveAudioWorkletNodeInputs, monitorConnections);
  const createNativeAudioWorkletNode = ((createInvalidStateError, createNativeAudioWorkletNodeFaker, createNativeGainNode, createNotSupportedError, monitorConnections) => (nativeContext, baseLatency, nativeAudioWorkletNodeConstructor, name, processorConstructor, options) => {
    if (null !== nativeAudioWorkletNodeConstructor) try {
      const nativeAudioWorkletNode = new nativeAudioWorkletNodeConstructor(nativeContext, name, options);
      const patchedEventListeners = new Map;
      let onprocessorerror = null;
      /*
                   * Bug #86: Chrome and Edge do not invoke the process() function if the corresponding AudioWorkletNode is unconnected but
                   * has an output.
                   */
      if (Object.defineProperties(nativeAudioWorkletNode, {
        /*
                       * Bug #61: Overwriting the property accessors for channelCount and channelCountMode is necessary as long as some
                       * browsers have no native implementation to achieve a consistent behavior.
                       */
        channelCount: {
          get: () => options.channelCount,
          set: () => {
            throw createInvalidStateError();
          }
        },
        channelCountMode: {
          get: () => "explicit",
          set: () => {
            throw createInvalidStateError();
          }
        },
        // Bug #156: Chrome and Edge do not yet fire an ErrorEvent.
        onprocessorerror: {
          get: () => onprocessorerror,
          set: value => {
            "function" == typeof onprocessorerror && nativeAudioWorkletNode.removeEventListener("processorerror", onprocessorerror), 
            onprocessorerror = "function" == typeof value ? value : null, "function" == typeof onprocessorerror && nativeAudioWorkletNode.addEventListener("processorerror", onprocessorerror);
          }
        }
      }), nativeAudioWorkletNode.addEventListener = (addEventListener = nativeAudioWorkletNode.addEventListener, 
      (...args) => {
        if ("processorerror" === args[0]) {
          const unpatchedEventListener = "function" == typeof args[1] ? args[1] : "object" == typeof args[1] && null !== args[1] && "function" == typeof args[1].handleEvent ? args[1].handleEvent : null;
          if (null !== unpatchedEventListener) {
            const patchedEventListener = patchedEventListeners.get(args[1]);
            void 0 !== patchedEventListener ? args[1] = patchedEventListener : (args[1] = event => {
              // Bug #178: Chrome and Edge do fire an event of type error.
              "error" === event.type ? (Object.defineProperties(event, {
                type: {
                  value: "processorerror"
                }
              }), unpatchedEventListener(event)) : unpatchedEventListener(new ErrorEvent(args[0], {
                ...event
              }));
            }, patchedEventListeners.set(unpatchedEventListener, args[1]));
          }
        }
        // Bug #178: Chrome and Edge do fire an event of type error.
                return addEventListener.call(nativeAudioWorkletNode, "error", args[1], args[2]), 
        addEventListener.call(nativeAudioWorkletNode, ...args);
      }), nativeAudioWorkletNode.removeEventListener = (removeEventListener = nativeAudioWorkletNode.removeEventListener, 
      (...args) => {
        if ("processorerror" === args[0]) {
          const patchedEventListener = patchedEventListeners.get(args[1]);
          void 0 !== patchedEventListener && (patchedEventListeners.delete(args[1]), args[1] = patchedEventListener);
        }
        // Bug #178: Chrome and Edge do fire an event of type error.
                return removeEventListener.call(nativeAudioWorkletNode, "error", args[1], args[2]), 
        removeEventListener.call(nativeAudioWorkletNode, args[0], args[1], args[2]);
      }), 0 !== options.numberOfOutputs) {
        const nativeGainNode = createNativeGainNode(nativeContext, {
          channelCount: 1,
          channelCountMode: "explicit",
          channelInterpretation: "discrete",
          gain: 0
        });
        nativeAudioWorkletNode.connect(nativeGainNode).connect(nativeContext.destination);
        // @todo Disconnect the connection when the process() function of the AudioWorkletNode returns false.
        return monitorConnections(nativeAudioWorkletNode, (() => nativeGainNode.disconnect()), (() => nativeGainNode.connect(nativeContext.destination)));
      }
      return nativeAudioWorkletNode;
    } catch (err) {
      // Bug #60: Chrome & Edge throw an InvalidStateError instead of a NotSupportedError.
      if (11 === err.code) throw createNotSupportedError();
      throw err;
    }
    // Bug #61: Only Chrome & Edge have an implementation of the AudioWorkletNode yet.
        var removeEventListener;
    var addEventListener;
    if (void 0 === processorConstructor) throw createNotSupportedError();
    return (audioWorkletNodeOptions => {
      const {port1: port1} = new MessageChannel;
      try {
        // This will throw an error if the audioWorkletNodeOptions are not clonable.
        port1.postMessage(audioWorkletNodeOptions);
      } finally {
        port1.close();
      }
    })(options), createNativeAudioWorkletNodeFaker(nativeContext, baseLatency, processorConstructor, options);
  })(createInvalidStateError, createNativeAudioWorkletNodeFaker, createNativeGainNode, createNotSupportedError, monitorConnections);
  const createAudioWorkletNodeRenderer = ((connectAudioParam, connectMultipleOutputs, createNativeAudioBufferSourceNode, createNativeChannelMergerNode, createNativeChannelSplitterNode, createNativeConstantSourceNode, createNativeGainNode, deleteUnrenderedAudioWorkletNode, disconnectMultipleOutputs, exposeCurrentFrameAndCurrentTime, getNativeAudioNode, nativeAudioWorkletNodeConstructor, nativeOfflineAudioContextConstructor, renderAutomation, renderInputsOfAudioNode, renderNativeOfflineAudioContext) => (name, options, processorConstructor) => {
    const renderedNativeAudioNodes = new WeakMap;
    let processedBufferPromise = null;
    return {
      render(proxy, nativeOfflineAudioContext) {
        deleteUnrenderedAudioWorkletNode(nativeOfflineAudioContext, proxy);
        const renderedNativeAudioWorkletNodeOrGainNode = renderedNativeAudioNodes.get(nativeOfflineAudioContext);
        return void 0 !== renderedNativeAudioWorkletNodeOrGainNode ? Promise.resolve(renderedNativeAudioWorkletNodeOrGainNode) : (async (proxy, nativeOfflineAudioContext) => {
          let nativeAudioWorkletNode = getNativeAudioNode(proxy);
          let nativeOutputNodes = null;
          const nativeAudioWorkletNodeIsOwnedByContext = isOwnedByContext(nativeAudioWorkletNode, nativeOfflineAudioContext);
          const outputChannelCount = Array.isArray(options.outputChannelCount) ? options.outputChannelCount : Array.from(options.outputChannelCount);
          // Bug #61: Only Chrome, Edge & Firefox have an implementation of the AudioWorkletNode yet.
                    if (null === nativeAudioWorkletNodeConstructor) {
            const numberOfOutputChannels = outputChannelCount.reduce(((sum, value) => sum + value), 0);
            const outputChannelSplitterNode = createNativeChannelSplitterNode(nativeOfflineAudioContext, {
              channelCount: Math.max(1, numberOfOutputChannels),
              channelCountMode: "explicit",
              channelInterpretation: "discrete",
              numberOfOutputs: Math.max(1, numberOfOutputChannels)
            });
            const outputChannelMergerNodes = [];
            for (let i = 0; i < proxy.numberOfOutputs; i += 1) outputChannelMergerNodes.push(createNativeChannelMergerNode(nativeOfflineAudioContext, {
              channelCount: 1,
              channelCountMode: "explicit",
              channelInterpretation: "speakers",
              numberOfInputs: outputChannelCount[i]
            }));
            const outputGainNode = createNativeGainNode(nativeOfflineAudioContext, {
              channelCount: options.channelCount,
              channelCountMode: options.channelCountMode,
              channelInterpretation: options.channelInterpretation,
              gain: 1
            });
            outputGainNode.connect = connectMultipleOutputs.bind(null, outputChannelMergerNodes), 
            outputGainNode.disconnect = disconnectMultipleOutputs.bind(null, outputChannelMergerNodes), 
            nativeOutputNodes = [ outputChannelSplitterNode, outputChannelMergerNodes, outputGainNode ];
          } else nativeAudioWorkletNodeIsOwnedByContext || (nativeAudioWorkletNode = new nativeAudioWorkletNodeConstructor(nativeOfflineAudioContext, name));
          if (renderedNativeAudioNodes.set(nativeOfflineAudioContext, null === nativeOutputNodes ? nativeAudioWorkletNode : nativeOutputNodes[2]), 
          null !== nativeOutputNodes) {
            if (null === processedBufferPromise) {
              if (void 0 === processorConstructor) throw new Error("Missing the processor constructor.");
              if (null === nativeOfflineAudioContextConstructor) throw new Error("Missing the native OfflineAudioContext constructor.");
              // Bug #47: The AudioDestinationNode in Safari gets not initialized correctly.
                            const numberOfInputChannels = proxy.channelCount * proxy.numberOfInputs;
              const numberOfParameters = void 0 === processorConstructor.parameterDescriptors ? 0 : processorConstructor.parameterDescriptors.length;
              const numberOfChannels = numberOfInputChannels + numberOfParameters;
              const renderBuffer = async () => {
                const partialOfflineAudioContext = new nativeOfflineAudioContextConstructor(numberOfChannels, 
                // Ceil the length to the next full render quantum.
                // Bug #17: Safari does not yet expose the length.
                128 * Math.ceil(proxy.context.length / 128), nativeOfflineAudioContext.sampleRate);
                const gainNodes = [];
                const inputChannelSplitterNodes = [];
                for (let i = 0; i < options.numberOfInputs; i += 1) gainNodes.push(createNativeGainNode(partialOfflineAudioContext, {
                  channelCount: options.channelCount,
                  channelCountMode: options.channelCountMode,
                  channelInterpretation: options.channelInterpretation,
                  gain: 1
                })), inputChannelSplitterNodes.push(createNativeChannelSplitterNode(partialOfflineAudioContext, {
                  channelCount: options.channelCount,
                  channelCountMode: "explicit",
                  channelInterpretation: "discrete",
                  numberOfOutputs: options.channelCount
                }));
                const constantSourceNodes = await Promise.all(Array.from(proxy.parameters.values()).map((async audioParam => {
                  const constantSourceNode = createNativeConstantSourceNode(partialOfflineAudioContext, {
                    channelCount: 1,
                    channelCountMode: "explicit",
                    channelInterpretation: "discrete",
                    offset: audioParam.value
                  });
                  return await renderAutomation(partialOfflineAudioContext, audioParam, constantSourceNode.offset), 
                  constantSourceNode;
                })));
                const inputChannelMergerNode = createNativeChannelMergerNode(partialOfflineAudioContext, {
                  channelCount: 1,
                  channelCountMode: "explicit",
                  channelInterpretation: "speakers",
                  numberOfInputs: Math.max(1, numberOfInputChannels + numberOfParameters)
                });
                for (let i = 0; i < options.numberOfInputs; i += 1) {
                  gainNodes[i].connect(inputChannelSplitterNodes[i]);
                  for (let j = 0; j < options.channelCount; j += 1) inputChannelSplitterNodes[i].connect(inputChannelMergerNode, j, i * options.channelCount + j);
                }
                for (const [index, constantSourceNode] of constantSourceNodes.entries()) constantSourceNode.connect(inputChannelMergerNode, 0, numberOfInputChannels + index), 
                constantSourceNode.start(0);
                return inputChannelMergerNode.connect(partialOfflineAudioContext.destination), await Promise.all(gainNodes.map((gainNode => renderInputsOfAudioNode(proxy, partialOfflineAudioContext, gainNode)))), 
                renderNativeOfflineAudioContext(partialOfflineAudioContext);
              };
              processedBufferPromise = processBuffer(proxy, 0 === numberOfChannels ? null : await renderBuffer(), nativeOfflineAudioContext, options, outputChannelCount, processorConstructor, exposeCurrentFrameAndCurrentTime);
            }
            const processedBuffer = await processedBufferPromise;
            const audioBufferSourceNode = createNativeAudioBufferSourceNode(nativeOfflineAudioContext, {
              buffer: null,
              channelCount: 2,
              channelCountMode: "max",
              channelInterpretation: "speakers",
              loop: !1,
              loopEnd: 0,
              loopStart: 0,
              playbackRate: 1
            });
            const [outputChannelSplitterNode, outputChannelMergerNodes, outputGainNode] = nativeOutputNodes;
            null !== processedBuffer && (audioBufferSourceNode.buffer = processedBuffer, audioBufferSourceNode.start(0)), 
            audioBufferSourceNode.connect(outputChannelSplitterNode);
            for (let i = 0, outputChannelSplitterNodeOutput = 0; i < proxy.numberOfOutputs; i += 1) {
              const outputChannelMergerNode = outputChannelMergerNodes[i];
              for (let j = 0; j < outputChannelCount[i]; j += 1) outputChannelSplitterNode.connect(outputChannelMergerNode, outputChannelSplitterNodeOutput + j, j);
              outputChannelSplitterNodeOutput += outputChannelCount[i];
            }
            return outputGainNode;
          }
          if (nativeAudioWorkletNodeIsOwnedByContext) for (const [nm, audioParam] of proxy.parameters.entries()) await connectAudioParam(nativeOfflineAudioContext, audioParam, 
          // @todo The definition that TypeScript uses of the AudioParamMap is lacking many methods.
          nativeAudioWorkletNode.parameters.get(nm)); else for (const [nm, audioParam] of proxy.parameters.entries()) await renderAutomation(nativeOfflineAudioContext, audioParam, 
          // @todo The definition that TypeScript uses of the AudioParamMap is lacking many methods.
          nativeAudioWorkletNode.parameters.get(nm));
          return await renderInputsOfAudioNode(proxy, nativeOfflineAudioContext, nativeAudioWorkletNode), 
          nativeAudioWorkletNode;
        })(proxy, nativeOfflineAudioContext);
      }
    };
  })(connectAudioParam, connectMultipleOutputs, createNativeAudioBufferSourceNode, createNativeChannelMergerNode, createNativeChannelSplitterNode, createNativeConstantSourceNode, createNativeGainNode, deleteUnrenderedAudioWorkletNode, disconnectMultipleOutputs, exposeCurrentFrameAndCurrentTime, getNativeAudioNode, nativeAudioWorkletNodeConstructor, nativeOfflineAudioContextConstructor, renderAutomation, renderInputsOfAudioNode, renderNativeOfflineAudioContext);
  const getBackupOfflineAudioContext = (backupOfflineAudioContextStore => nativeContext => backupOfflineAudioContextStore.get(nativeContext))(backupOfflineAudioContextStore);
  const setActiveAudioWorkletNodeInputs = (activeAudioWorkletNodeInputsStore => (nativeAudioWorkletNode, activeInputs) => {
    activeAudioWorkletNodeInputsStore.set(nativeAudioWorkletNode, activeInputs);
  })(activeAudioWorkletNodeInputsStore);
  // The AudioWorkletNode constructor is only available in a SecureContext.
    const audioWorkletNodeConstructor = isSecureContext ? ((addUnrenderedAudioWorkletNode, audioNodeConstructor, createAudioParam, createAudioWorkletNodeRenderer, createNativeAudioWorkletNode, getAudioNodeConnections, getBackupOfflineAudioContext, getNativeContext, isNativeOfflineAudioContext, nativeAudioWorkletNodeConstructor, sanitizeAudioWorkletNodeOptions, setActiveAudioWorkletNodeInputs, testAudioWorkletNodeOptionsClonability, wrapEventListener) => class extends audioNodeConstructor {
    constructor(context, name, options) {
      var _a;
      const nativeContext = getNativeContext(context);
      const isOffline = isNativeOfflineAudioContext(nativeContext);
      const mergedOptions = sanitizeAudioWorkletNodeOptions({
        ...DEFAULT_OPTIONS$g,
        ...options
      });
      // Bug #191: Safari doesn't throw an error if the options aren't clonable.
            testAudioWorkletNodeOptionsClonability(mergedOptions);
      const nodeNameToProcessorConstructorMap = NODE_NAME_TO_PROCESSOR_CONSTRUCTOR_MAPS.get(nativeContext);
      const processorConstructor = null == nodeNameToProcessorConstructorMap ? void 0 : nodeNameToProcessorConstructorMap.get(name);
      // Bug #186: Chrome and Edge do not allow to create an AudioWorkletNode on a closed AudioContext.
            const nativeContextOrBackupOfflineAudioContext = isOffline || "closed" !== nativeContext.state ? nativeContext : null !== (_a = getBackupOfflineAudioContext(nativeContext)) && void 0 !== _a ? _a : nativeContext;
      const nativeAudioWorkletNode = createNativeAudioWorkletNode(nativeContextOrBackupOfflineAudioContext, isOffline ? null : context.baseLatency, nativeAudioWorkletNodeConstructor, name, processorConstructor, mergedOptions);
      /*
               * @todo Add a mechanism to switch an AudioWorkletNode to passive once the process() function of the AudioWorkletProcessor
               * returns false.
               */
      super(context, !0, nativeAudioWorkletNode, isOffline ? createAudioWorkletNodeRenderer(name, mergedOptions, processorConstructor) : null);
      const parameters = [];
      nativeAudioWorkletNode.parameters.forEach(((nativeAudioParam, nm) => {
        const audioParam = createAudioParam(this, isOffline, nativeAudioParam);
        parameters.push([ nm, audioParam ]);
      })), this._nativeAudioWorkletNode = nativeAudioWorkletNode, this._onprocessorerror = null, 
      this._parameters = new ReadOnlyMap(parameters), 
      /*
               * Bug #86 & #87: Invoking the renderer of an AudioWorkletNode might be necessary if it has no direct or indirect connection to
               * the destination.
               */
      isOffline && addUnrenderedAudioWorkletNode(nativeContext, this);
      const {activeInputs: activeInputs} = getAudioNodeConnections(this);
      setActiveAudioWorkletNodeInputs(nativeAudioWorkletNode, activeInputs);
    }
    get onprocessorerror() {
      return this._onprocessorerror;
    }
    set onprocessorerror(value) {
      const wrappedListener = "function" == typeof value ? wrapEventListener(this, value) : null;
      this._nativeAudioWorkletNode.onprocessorerror = wrappedListener;
      const nativeOnProcessorError = this._nativeAudioWorkletNode.onprocessorerror;
      this._onprocessorerror = null !== nativeOnProcessorError && nativeOnProcessorError === wrappedListener ? value : nativeOnProcessorError;
    }
    get parameters() {
      return null === this._parameters ? this._nativeAudioWorkletNode.parameters : this._parameters;
    }
    get port() {
      return this._nativeAudioWorkletNode.port;
    }
  })(addUnrenderedAudioWorkletNode, audioNodeConstructor, createAudioParam, createAudioWorkletNodeRenderer, createNativeAudioWorkletNode, getAudioNodeConnections, getBackupOfflineAudioContext, getNativeContext, isNativeOfflineAudioContext, nativeAudioWorkletNodeConstructor, (options => ({
    ...options,
    outputChannelCount: void 0 !== options.outputChannelCount ? options.outputChannelCount : 1 === options.numberOfInputs && 1 === options.numberOfOutputs ? 
    /*
                     * Bug #61: This should be the computedNumberOfChannels, but unfortunately that is almost impossible to fake. That's why
                     * the channelCountMode is required to be 'explicit' as long as there is not a native implementation in every browser. That
                     * makes sure the computedNumberOfChannels is equivilant to the channelCount which makes it much easier to compute.
                     */
    [ options.channelCount ] : Array.from({
      length: options.numberOfOutputs
    }, (() => 1))
  })), setActiveAudioWorkletNodeInputs, (audioWorkletNodeOptions => {
    const {port1: port1, port2: port2} = new MessageChannel;
    try {
      // This will throw an error if the audioWorkletNodeOptions are not clonable.
      port1.postMessage(audioWorkletNodeOptions);
    } finally {
      port1.close(), port2.close();
    }
  }), wrapEventListener) : void 0;
  const createNativeOfflineAudioContext = ((createNotSupportedError, nativeOfflineAudioContextConstructor) => (numberOfChannels, length, sampleRate) => {
    if (null === nativeOfflineAudioContextConstructor) throw new Error("Missing the native OfflineAudioContext constructor.");
    try {
      return new nativeOfflineAudioContextConstructor(numberOfChannels, length, sampleRate);
    } catch (err) {
      // Bug #143, #144 & #146: Safari throws a SyntaxError when numberOfChannels, length or sampleRate are invalid.
      if ("SyntaxError" === err.name) throw createNotSupportedError();
      throw err;
    }
  })(createNotSupportedError, nativeOfflineAudioContextConstructor);
  const startRendering = ((audioBufferStore, cacheTestResult, getAudioNodeRenderer, getUnrenderedAudioWorkletNodes, renderNativeOfflineAudioContext, testAudioBufferCopyChannelMethodsOutOfBoundsSupport, wrapAudioBufferCopyChannelMethods, wrapAudioBufferCopyChannelMethodsOutOfBounds) => (destination, nativeOfflineAudioContext) => getAudioNodeRenderer(destination).render(destination, nativeOfflineAudioContext)
  /*
           * Bug #86 & #87: Invoking the renderer of an AudioWorkletNode might be necessary if it has no direct or indirect connection to the
           * destination.
           */ .then((() => Promise.all(Array.from(getUnrenderedAudioWorkletNodes(nativeOfflineAudioContext)).map((audioWorkletNode => getAudioNodeRenderer(audioWorkletNode).render(audioWorkletNode, nativeOfflineAudioContext)))))).then((() => renderNativeOfflineAudioContext(nativeOfflineAudioContext))).then((audioBuffer => (
  // Bug #5: Safari does not support copyFromChannel() and copyToChannel().
  // Bug #100: Safari does throw a wrong error when calling getChannelData() with an out-of-bounds value.
  "function" != typeof audioBuffer.copyFromChannel ? (wrapAudioBufferCopyChannelMethods(audioBuffer), 
  wrapAudioBufferGetChannelDataMethod(audioBuffer)) : cacheTestResult(testAudioBufferCopyChannelMethodsOutOfBoundsSupport, (() => testAudioBufferCopyChannelMethodsOutOfBoundsSupport(audioBuffer))) || wrapAudioBufferCopyChannelMethodsOutOfBounds(audioBuffer), 
  audioBufferStore.add(audioBuffer), audioBuffer))))(audioBufferStore, cacheTestResult, getAudioNodeRenderer, getUnrenderedAudioWorkletNodes, renderNativeOfflineAudioContext, testAudioBufferCopyChannelMethodsOutOfBoundsSupport, wrapAudioBufferCopyChannelMethods, wrapAudioBufferCopyChannelMethodsOutOfBounds);
  const offlineAudioContextConstructor = ((baseAudioContextConstructor, cacheTestResult, createInvalidStateError, createNativeOfflineAudioContext, startRendering) => class extends baseAudioContextConstructor {
    constructor(a, b, c) {
      let options;
      if ("number" == typeof a && void 0 !== b && void 0 !== c) options = {
        length: b,
        numberOfChannels: a,
        sampleRate: c
      }; else {
        if ("object" != typeof a) throw new Error("The given parameters are not valid.");
        options = a;
      }
      const {length: length, numberOfChannels: numberOfChannels, sampleRate: sampleRate} = {
        ...DEFAULT_OPTIONS$5,
        ...options
      };
      const nativeOfflineAudioContext = createNativeOfflineAudioContext(numberOfChannels, length, sampleRate);
      // #21 Safari does not support promises and therefore would fire the statechange event before the promise can be resolved.
            cacheTestResult(testPromiseSupport, (() => testPromiseSupport(nativeOfflineAudioContext))) || nativeOfflineAudioContext.addEventListener("statechange", (() => {
        let i = 0;
        const delayStateChangeEvent = event => {
          "running" === this._state && (i > 0 ? (nativeOfflineAudioContext.removeEventListener("statechange", delayStateChangeEvent), 
          event.stopImmediatePropagation(), this._waitForThePromiseToSettle(event)) : i += 1);
        };
        return delayStateChangeEvent;
      })()), super(nativeOfflineAudioContext, numberOfChannels), this._length = length, 
      this._nativeOfflineAudioContext = nativeOfflineAudioContext, this._state = null;
    }
    get length() {
      // Bug #17: Safari does not yet expose the length.
      return void 0 === this._nativeOfflineAudioContext.length ? this._length : this._nativeOfflineAudioContext.length;
    }
    get state() {
      return null === this._state ? this._nativeOfflineAudioContext.state : this._state;
    }
    startRendering() {
      /*
               * Bug #9 & #59: It is theoretically possible that startRendering() will first render a partialOfflineAudioContext. Therefore
               * the state of the nativeOfflineAudioContext might no transition to running immediately.
               */
      return "running" === this._state ? Promise.reject(createInvalidStateError()) : (this._state = "running", 
      startRendering(this.destination, this._nativeOfflineAudioContext).finally((() => {
        this._state = null, deactivateAudioGraph(this);
      })));
    }
    _waitForThePromiseToSettle(event) {
      null === this._state ? this._nativeOfflineAudioContext.dispatchEvent(event) : setTimeout((() => this._waitForThePromiseToSettle(event)));
    }
  })(baseAudioContextConstructor, cacheTestResult, createInvalidStateError, createNativeOfflineAudioContext, startRendering);
  const isAnyAudioContext = ((contextStore, isNativeAudioContext) => anything => {
    const nativeContext = contextStore.get(anything);
    return isNativeAudioContext(nativeContext) || isNativeAudioContext(anything);
  })(CONTEXT_STORE, isNativeAudioContext);
  const isAnyAudioNode = ((audioNodeStore, isNativeAudioNode) => anything => audioNodeStore.has(anything) || isNativeAudioNode(anything))(AUDIO_NODE_STORE, isNativeAudioNode);
  const isAnyAudioParam = ((audioParamStore, isNativeAudioParam) => anything => audioParamStore.has(anything) || isNativeAudioParam(anything))(AUDIO_PARAM_STORE, isNativeAudioParam);
  const isAnyOfflineAudioContext = ((contextStore, isNativeOfflineAudioContext) => anything => {
    const nativeContext = contextStore.get(anything);
    return isNativeOfflineAudioContext(nativeContext) || isNativeOfflineAudioContext(anything);
  })(CONTEXT_STORE, isNativeOfflineAudioContext);
  let isInsideScheduledCallback = !1;
  let printedScheduledWarning = !1;
  /**
   * The default logger is the console
   */
  let defaultLogger = console;
  /**
   * Log anything
   */  
  /**
   * A reference to the window object
   * @hidden
   */
  const theWindow = "object" == typeof self ? self : null;
  /**
   * If the browser has a window object which has an AudioContext
   * @hidden
   */  const hasAudioContext = theWindow && (theWindow.hasOwnProperty("AudioContext") || theWindow.hasOwnProperty("webkitAudioContext"));
  /**
   * Tone.js
   * @author Yotam Mann
   * @license http://opensource.org/licenses/MIT MIT License
   * @copyright 2014-2024 Yotam Mann
   */
  /**
   * Tone is the base class of all other classes.
   *
   * @category Core
   * @constructor
   */
  let Tone$1 = class {
    constructor() {
      //-------------------------------------
      // 	DEBUGGING
      //-------------------------------------
      /**
           * Set this debug flag to log all events that happen in this class.
           */
      this.debug = !1, 
      //-------------------------------------
      // 	DISPOSING
      //-------------------------------------
      /**
           * Indicates if the instance was disposed
           */
      this._wasDisposed = !1;
    }
    /**
       * Returns all of the default options belonging to the class.
       */    static getDefaults() {
      return {};
    }
    /**
       * Prints the outputs to the console log for debugging purposes.
       * Prints the contents only if either the object has a property
       * called `debug` set to true, or a variable called TONE_DEBUG_CLASS
       * is set to the name of the class.
       * @example
       * const osc = new Tone.Oscillator();
       * // prints all logs originating from this oscillator
       * osc.debug = true;
       * // calls to start/stop will print in the console
       * osc.start();
       */    log(...args) {
      // if the object is either set to debug = true
      // or if there is a string on the Tone.global.with the class name
      (this.debug || theWindow && this.toString() === theWindow.TONE_DEBUG_CLASS) && (function(...args) {
        defaultLogger.log(...args);
      })(this, ...args);
    }
    /**
       * disconnect and dispose.
       */    dispose() {
      return this._wasDisposed = !0, this;
    }
    /**
       * Indicates if the instance was disposed. 'Disposing' an
       * instance means that all of the Web Audio nodes that were
       * created for the instance are disconnected and freed for garbage collection.
       */    get disposed() {
      return this._wasDisposed;
    }
    /**
       * Convert the class to a string
       * @example
       * const osc = new Tone.Oscillator();
       * console.log(osc.toString());
       */    toString() {
      return this.name;
    }
  };
  /**
   * The version number semver
   */  Tone$1.version = "15.0.4";
  /**
   * The threshold for correctness for operators. Less than one sample even
   * at very high sampling rates (e.g. `1e-6 < 1 / 192000`).
   */
  const EPSILON = 1e-6;
  /**
   * A Timeline class for scheduling and maintaining state
   * along a timeline. All events must have a "time" property.
   * Internally, events are stored in time order for fast
   * retrieval.
   * @internal
   */
  class Timeline extends Tone$1 {
    constructor() {
      super(), this.name = "Timeline", 
      /**
           * The array of scheduled timeline events
           */
      this._timeline = [];
      const options = optionsFromArguments(Timeline.getDefaults(), arguments, [ "memory" ]);
      this.memory = options.memory, this.increasing = options.increasing;
    }
    static getDefaults() {
      return {
        memory: 1 / 0,
        increasing: !1
      };
    }
    /**
       * The number of items in the timeline.
       */    get length() {
      return this._timeline.length;
    }
    /**
       * Insert an event object onto the timeline. Events must have a "time" attribute.
       * @param event  The event object to insert into the timeline.
       */    add(event) {
      if (
      // the event needs to have a time attribute
      assert(Reflect.has(event, "time"), "Timeline: events must have a time attribute"), 
      event.time = event.time.valueOf(), this.increasing && this.length) {
        const lastValue = this._timeline[this.length - 1];
        assert(GTE(event.time, lastValue.time), "The time must be greater than or equal to the last scheduled time"), 
        this._timeline.push(event);
      } else {
        const index = this._search(event.time);
        this._timeline.splice(index + 1, 0, event);
      }
      // if the length is more than the memory, remove the previous ones
            if (this.length > this.memory) {
        const diff = this.length - this.memory;
        this._timeline.splice(0, diff);
      }
      return this;
    }
    /**
       * Remove an event from the timeline.
       * @param  {Object}  event  The event object to remove from the list.
       * @returns {Timeline} this
       */    remove(event) {
      const index = this._timeline.indexOf(event);
      return -1 !== index && this._timeline.splice(index, 1), this;
    }
    /**
       * Get the nearest event whose time is less than or equal to the given time.
       * @param  time  The time to query.
       */    get(time, param = "time") {
      const index = this._search(time, param);
      return -1 !== index ? this._timeline[index] : null;
    }
    /**
       * Return the first event in the timeline without removing it
       * @returns {Object} The first event object
       */    peek() {
      return this._timeline[0];
    }
    /**
       * Return the first event in the timeline and remove it
       */    shift() {
      return this._timeline.shift();
    }
    /**
       * Get the event which is scheduled after the given time.
       * @param  time  The time to query.
       */    getAfter(time, param = "time") {
      const index = this._search(time, param);
      return index + 1 < this._timeline.length ? this._timeline[index + 1] : null;
    }
    /**
       * Get the event before the event at the given time.
       * @param  time  The time to query.
       */    getBefore(time) {
      const len = this._timeline.length;
      // if it's after the last item, return the last item
            if (len > 0 && this._timeline[len - 1].time < time) return this._timeline[len - 1];
      const index = this._search(time);
      return index - 1 >= 0 ? this._timeline[index - 1] : null;
    }
    /**
       * Cancel events at and after the given time
       * @param  after  The time to query.
       */    cancel(after) {
      if (this._timeline.length > 1) {
        let index = this._search(after);
        if (index >= 0) if (EQ(this._timeline[index].time, after)) {
          // get the first item with that time
          for (let i = index; i >= 0 && EQ(this._timeline[i].time, after); i--) index = i;
          this._timeline = this._timeline.slice(0, index);
        } else this._timeline = this._timeline.slice(0, index + 1); else this._timeline = [];
      } else 1 === this._timeline.length && GTE(this._timeline[0].time, after) && (this._timeline = []);
      return this;
    }
    /**
       * Cancel events before or equal to the given time.
       * @param  time  The time to cancel before.
       */    cancelBefore(time) {
      const index = this._search(time);
      return index >= 0 && (this._timeline = this._timeline.slice(index + 1)), this;
    }
    /**
       * Returns the previous event if there is one. null otherwise
       * @param  event The event to find the previous one of
       * @return The event right before the given event
       */    previousEvent(event) {
      const index = this._timeline.indexOf(event);
      return index > 0 ? this._timeline[index - 1] : null;
    }
    /**
       * Does a binary search on the timeline array and returns the
       * nearest event index whose time is after or equal to the given time.
       * If a time is searched before the first index in the timeline, -1 is returned.
       * If the time is after the end, the index of the last item is returned.
       */    _search(time, param = "time") {
      if (0 === this._timeline.length) return -1;
      let beginning = 0;
      const len = this._timeline.length;
      let end = len;
      if (len > 0 && this._timeline[len - 1][param] <= time) return len - 1;
      for (;beginning < end; ) {
        // calculate the midpoint for roughly equal partition
        let midPoint = Math.floor(beginning + (end - beginning) / 2);
        const event = this._timeline[midPoint];
        const nextEvent = this._timeline[midPoint + 1];
        if (EQ(event[param], time)) {
          // choose the last one that has the same time
          for (let i = midPoint; i < this._timeline.length; i++) {
            if (!EQ(this._timeline[i][param], time)) break;
            midPoint = i;
          }
          return midPoint;
        }
        if (LT(event[param], time) && GT(nextEvent[param], time)) return midPoint;
        GT(event[param], time) ? 
        // search lower
        end = midPoint : 
        // search upper
        beginning = midPoint + 1;
      }
      return -1;
    }
    /**
       * Internal iterator. Applies extra safety checks for
       * removing items from the array.
       */    _iterate(callback, lowerBound = 0, upperBound = this._timeline.length - 1) {
      this._timeline.slice(lowerBound, upperBound + 1).forEach(callback);
    }
    /**
       * Iterate over everything in the array
       * @param  callback The callback to invoke with every item
       */    forEach(callback) {
      return this._iterate(callback), this;
    }
    /**
       * Iterate over everything in the array at or before the given time.
       * @param  time The time to check if items are before
       * @param  callback The callback to invoke with every item
       */    forEachBefore(time, callback) {
      // iterate over the items in reverse so that removing an item doesn't break things
      const upperBound = this._search(time);
      return -1 !== upperBound && this._iterate(callback, 0, upperBound), this;
    }
    /**
       * Iterate over everything in the array after the given time.
       * @param  time The time to check if items are before
       * @param  callback The callback to invoke with every item
       */    forEachAfter(time, callback) {
      // iterate over the items in reverse so that removing an item doesn't break things
      const lowerBound = this._search(time);
      return this._iterate(callback, lowerBound + 1), this;
    }
    /**
       * Iterate over everything in the array between the startTime and endTime.
       * The timerange is inclusive of the startTime, but exclusive of the endTime.
       * range = [startTime, endTime).
       * @param  startTime The time to check if items are before
       * @param  endTime The end of the test interval.
       * @param  callback The callback to invoke with every item
       */    forEachBetween(startTime, endTime, callback) {
      let lowerBound = this._search(startTime);
      let upperBound = this._search(endTime);
      return -1 !== lowerBound && -1 !== upperBound ? (this._timeline[lowerBound].time !== startTime && (lowerBound += 1), 
      // exclusive of the end time
      this._timeline[upperBound].time === endTime && (upperBound -= 1), this._iterate(callback, lowerBound, upperBound)) : -1 === lowerBound && this._iterate(callback, 0, upperBound), 
      this;
    }
    /**
       * Iterate over everything in the array at or after the given time. Similar to
       * forEachAfter, but includes the item(s) at the given time.
       * @param  time The time to check if items are before
       * @param  callback The callback to invoke with every item
       */    forEachFrom(time, callback) {
      // iterate over the items in reverse so that removing an item doesn't break things
      let lowerBound = this._search(time);
      // work backwards until the event time is less than time
            for (;lowerBound >= 0 && this._timeline[lowerBound].time >= time; ) lowerBound--;
      return this._iterate(callback, lowerBound + 1), this;
    }
    /**
       * Iterate over everything in the array at the given time
       * @param  time The time to check if items are before
       * @param  callback The callback to invoke with every item
       */    forEachAtTime(time, callback) {
      // iterate over the items in reverse so that removing an item doesn't break things
      const upperBound = this._search(time);
      if (-1 !== upperBound && EQ(this._timeline[upperBound].time, time)) {
        let lowerBound = upperBound;
        for (let i = upperBound; i >= 0 && EQ(this._timeline[i].time, time); i--) lowerBound = i;
        this._iterate((event => {
          callback(event);
        }), lowerBound, upperBound);
      }
      return this;
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this._timeline = [], this;
    }
  }
  /**
   * Array of callbacks to invoke when a new context is created
   */  const notifyNewContext = [];
  /**
   * Array of callbacks to invoke when a new context is closed
   */
  const notifyCloseContext = [];
  /**
   * Emitter gives classes which extend it
   * the ability to listen for and emit events.
   * Inspiration and reference from Jerome Etienne's [MicroEvent](https://github.com/jeromeetienne/microevent.js).
   * MIT (c) 2011 Jerome Etienne.
   * @category Core
   */
  class Emitter extends Tone$1 {
    constructor() {
      super(...arguments), this.name = "Emitter";
    }
    /**
       * Bind a callback to a specific event.
       * @param  event     The name of the event to listen for.
       * @param  callback  The callback to invoke when the event is emitted
       */    on(event, callback) {
      return event.split(/\W+/).forEach((eventName => {
        isUndef(this._events) && (this._events = {}), this._events.hasOwnProperty(eventName) || (this._events[eventName] = []), 
        this._events[eventName].push(callback);
      })), this;
    }
    /**
       * Bind a callback which is only invoked once
       * @param  event     The name of the event to listen for.
       * @param  callback  The callback to invoke when the event is emitted
       */    once(event, callback) {
      const boundCallback = (...args) => {
        // invoke the callback
        callback(...args), 
        // remove the event
        this.off(event, boundCallback);
      };
      return this.on(event, boundCallback), this;
    }
    /**
       * Remove the event listener.
       * @param  event     The event to stop listening to.
       * @param  callback  The callback which was bound to the event with Emitter.on.
       *                   If no callback is given, all callbacks events are removed.
       */    off(event, callback) {
      return event.split(/\W+/).forEach((eventName => {
        if (isUndef(this._events) && (this._events = {}), this._events.hasOwnProperty(eventName)) if (isUndef(callback)) this._events[eventName] = []; else {
          const eventList = this._events[eventName];
          for (let i = eventList.length - 1; i >= 0; i--) eventList[i] === callback && eventList.splice(i, 1);
        }
      })), this;
    }
    /**
       * Invoke all of the callbacks bound to the event
       * with any arguments passed in.
       * @param  event  The name of the event.
       * @param args The arguments to pass to the functions listening.
       */    emit(event, ...args) {
      if (this._events && this._events.hasOwnProperty(event)) {
        const eventList = this._events[event].slice(0);
        for (let i = 0, len = eventList.length; i < len; i++) eventList[i].apply(this, args);
      }
      return this;
    }
    /**
       * Add Emitter functions (on/off/emit) to the object
       */    static mixin(constr) {
      // instance._events = {};
      [ "on", "once", "off", "emit" ].forEach((name => {
        const property = Object.getOwnPropertyDescriptor(Emitter.prototype, name);
        Object.defineProperty(constr.prototype, name, property);
      }));
    }
    /**
       * Clean up
       */    dispose() {
      return super.dispose(), this._events = void 0, this;
    }
  }
  class BaseContext extends Emitter {
    constructor() {
      super(...arguments), this.isOffline = !1;
    }
    /*
       * This is a placeholder so that JSON.stringify does not throw an error
       * This matches what JSON.stringify(audioContext) returns on a native
       * audioContext instance.
       */    toJSON() {
      return {};
    }
  }
  /**
   * Wrapper around the native AudioContext.
   * @category Core
   */  class Context extends BaseContext {
    constructor() {
      var _a, _b;
      super(), this.name = "Context", 
      /**
           * An object containing all of the constants AudioBufferSourceNodes
           */
      this._constants = new Map, 
      /**
           * All of the setTimeout events.
           */
      this._timeouts = new Timeline, 
      /**
           * The timeout id counter
           */
      this._timeoutIds = 0, 
      /**
           * Private indicator if the context has been initialized
           */
      this._initialized = !1, 
      /**
           * Private indicator if a close() has been called on the context, since close is async
           */
      this._closeStarted = !1, 
      /**
           * Indicates if the context is an OfflineAudioContext or an AudioContext
           */
      this.isOffline = !1, 
      //--------------------------------------------
      // AUDIO WORKLET
      //--------------------------------------------
      /**
           * Maps a module name to promise of the addModule method
           */
      this._workletPromise = null;
      const options = optionsFromArguments(Context.getDefaults(), arguments, [ "context" ]);
      options.context ? (this._context = options.context, 
      // custom context provided, latencyHint unknown (unless explicitly provided in options)
      this._latencyHint = (null === (_a = arguments[0]) || void 0 === _a ? void 0 : _a.latencyHint) || "") : (this._context = (function(options) {
        return new audioContextConstructor(options);
      }
      /**
   * Create a new OfflineAudioContext
   */)({
        latencyHint: options.latencyHint
      }), this._latencyHint = options.latencyHint), this._ticker = new Ticker(this.emit.bind(this, "tick"), options.clockSource, options.updateInterval, this._context.sampleRate), 
      this.on("tick", this._timeoutLoop.bind(this)), 
      // fwd events from the context
      this._context.onstatechange = () => {
        this.emit("statechange", this.state);
      }, 
      // if no custom updateInterval provided, updateInterval will be derived by lookAhead setter
      this[(null === (_b = arguments[0]) || void 0 === _b ? void 0 : _b.hasOwnProperty("updateInterval")) ? "_lookAhead" : "lookAhead"] = options.lookAhead;
    }
    static getDefaults() {
      return {
        clockSource: "worker",
        latencyHint: "interactive",
        lookAhead: .1,
        updateInterval: .05
      };
    }
    /**
       * Finish setting up the context. **You usually do not need to do this manually.**
       */    initialize() {
      var ctx;
      return this._initialized || (
      // add any additional modules
      ctx = this, 
      // add any additional modules
      notifyNewContext.forEach((cb => cb(ctx))), this._initialized = !0), this;
    }
    //---------------------------
    // BASE AUDIO CONTEXT METHODS
    //---------------------------
    createAnalyser() {
      return this._context.createAnalyser();
    }
    createOscillator() {
      return this._context.createOscillator();
    }
    createBufferSource() {
      return this._context.createBufferSource();
    }
    createBiquadFilter() {
      return this._context.createBiquadFilter();
    }
    createBuffer(numberOfChannels, length, sampleRate) {
      return this._context.createBuffer(numberOfChannels, length, sampleRate);
    }
    createChannelMerger(numberOfInputs) {
      return this._context.createChannelMerger(numberOfInputs);
    }
    createChannelSplitter(numberOfOutputs) {
      return this._context.createChannelSplitter(numberOfOutputs);
    }
    createConstantSource() {
      return this._context.createConstantSource();
    }
    createConvolver() {
      return this._context.createConvolver();
    }
    createDelay(maxDelayTime) {
      return this._context.createDelay(maxDelayTime);
    }
    createDynamicsCompressor() {
      return this._context.createDynamicsCompressor();
    }
    createGain() {
      return this._context.createGain();
    }
    createIIRFilter(feedForward, feedback) {
      // @ts-ignore
      return this._context.createIIRFilter(feedForward, feedback);
    }
    createPanner() {
      return this._context.createPanner();
    }
    createPeriodicWave(real, imag, constraints) {
      return this._context.createPeriodicWave(real, imag, constraints);
    }
    createStereoPanner() {
      return this._context.createStereoPanner();
    }
    createWaveShaper() {
      return this._context.createWaveShaper();
    }
    createMediaStreamSource(stream) {
      assert(isAudioContext(this._context), "Not available if OfflineAudioContext");
      return this._context.createMediaStreamSource(stream);
    }
    createMediaElementSource(element) {
      assert(isAudioContext(this._context), "Not available if OfflineAudioContext");
      return this._context.createMediaElementSource(element);
    }
    createMediaStreamDestination() {
      assert(isAudioContext(this._context), "Not available if OfflineAudioContext");
      return this._context.createMediaStreamDestination();
    }
    decodeAudioData(audioData) {
      return this._context.decodeAudioData(audioData);
    }
    /**
       * The current time in seconds of the AudioContext.
       */    get currentTime() {
      return this._context.currentTime;
    }
    /**
       * The current time in seconds of the AudioContext.
       */    get state() {
      return this._context.state;
    }
    /**
       * The current time in seconds of the AudioContext.
       */    get sampleRate() {
      return this._context.sampleRate;
    }
    /**
       * The listener
       */    get listener() {
      return this.initialize(), this._listener;
    }
    set listener(l) {
      assert(!this._initialized, "The listener cannot be set after initialization."), 
      this._listener = l;
    }
    /**
       * There is only one Transport per Context. It is created on initialization.
       */    get transport() {
      return this.initialize(), this._transport;
    }
    set transport(t) {
      assert(!this._initialized, "The transport cannot be set after initialization."), 
      this._transport = t;
    }
    /**
       * This is the Draw object for the context which is useful for synchronizing the draw frame with the Tone.js clock.
       */    get draw() {
      return this.initialize(), this._draw;
    }
    set draw(d) {
      assert(!this._initialized, "Draw cannot be set after initialization."), this._draw = d;
    }
    /**
       * A reference to the Context's destination node.
       */    get destination() {
      return this.initialize(), this._destination;
    }
    set destination(d) {
      assert(!this._initialized, "The destination cannot be set after initialization."), 
      this._destination = d;
    }
    /**
       * Create an audio worklet node from a name and options. The module
       * must first be loaded using {@link addAudioWorkletModule}.
       */    createAudioWorkletNode(name, options) {
      return (function(context, name, options) {
        return assert(isDefined(audioWorkletNodeConstructor), "AudioWorkletNode only works in a secure context (https or localhost)"), 
        new (context instanceof (null == theWindow ? void 0 : theWindow.BaseAudioContext) ? null == theWindow ? void 0 : theWindow.AudioWorkletNode : audioWorkletNodeConstructor)(context, name, options);
      })(this.rawContext, name, options);
    }
    /**
       * Add an AudioWorkletProcessor module
       * @param url The url of the module
       */    addAudioWorkletModule(url) {
      return __awaiter(this, void 0, void 0, (function*() {
        assert(isDefined(this.rawContext.audioWorklet), "AudioWorkletNode is only available in a secure context (https or localhost)"), 
        this._workletPromise || (this._workletPromise = this.rawContext.audioWorklet.addModule(url)), 
        yield this._workletPromise;
      }));
    }
    /**
       * Returns a promise which resolves when all of the worklets have been loaded on this context
       */    workletsAreReady() {
      return __awaiter(this, void 0, void 0, (function*() {
        (yield this._workletPromise) ? this._workletPromise : Promise.resolve();
      }));
    }
    //---------------------------
    // TICKER
    //---------------------------
    /**
       * How often the interval callback is invoked.
       * This number corresponds to how responsive the scheduling
       * can be. Setting to 0 will result in the lowest practial interval
       * based on context properties. context.updateInterval + context.lookAhead
       * gives you the total latency between scheduling an event and hearing it.
       */
    get updateInterval() {
      return this._ticker.updateInterval;
    }
    set updateInterval(interval) {
      this._ticker.updateInterval = interval;
    }
    /**
       * What the source of the clock is, either "worker" (default),
       * "timeout", or "offline" (none).
       */    get clockSource() {
      return this._ticker.type;
    }
    set clockSource(type) {
      this._ticker.type = type;
    }
    /**
       * The amount of time into the future events are scheduled. Giving Web Audio
       * a short amount of time into the future to schedule events can reduce clicks and
       * improve performance. This value can be set to 0 to get the lowest latency.
       * Adjusting this value also affects the {@link updateInterval}.
       */    get lookAhead() {
      return this._lookAhead;
    }
    set lookAhead(time) {
      this._lookAhead = time, 
      // if lookAhead is 0, default to .01 updateInterval
      this.updateInterval = time ? time / 2 : .01;
    }
    /**
       * The type of playback, which affects tradeoffs between audio
       * output latency and responsiveness.
       * In addition to setting the value in seconds, the latencyHint also
       * accepts the strings "interactive" (prioritizes low latency),
       * "playback" (prioritizes sustained playback), "balanced" (balances
       * latency and performance).
       * @example
       * // prioritize sustained playback
       * const context = new Tone.Context({ latencyHint: "playback" });
       * // set this context as the global Context
       * Tone.setContext(context);
       * // the global context is gettable with Tone.getContext()
       * console.log(Tone.getContext().latencyHint);
       */    get latencyHint() {
      return this._latencyHint;
    }
    /**
       * The unwrapped AudioContext or OfflineAudioContext
       */    get rawContext() {
      return this._context;
    }
    /**
       * The current audio context time plus a short {@link lookAhead}.
       * @example
       * setInterval(() => {
       * 	console.log("now", Tone.now());
       * }, 100);
       */    now() {
      return this._context.currentTime + this._lookAhead;
    }
    /**
       * The current audio context time without the {@link lookAhead}.
       * In most cases it is better to use {@link now} instead of {@link immediate} since
       * with {@link now} the {@link lookAhead} is applied equally to _all_ components including internal components,
       * to making sure that everything is scheduled in sync. Mixing {@link now} and {@link immediate}
       * can cause some timing issues. If no lookAhead is desired, you can set the {@link lookAhead} to `0`.
       */    immediate() {
      return this._context.currentTime;
    }
    /**
       * Starts the audio context from a suspended state. This is required
       * to initially start the AudioContext.
       * @see {@link start}
       */    resume() {
      return isAudioContext(this._context) ? this._context.resume() : Promise.resolve();
    }
    /**
       * Close the context. Once closed, the context can no longer be used and
       * any AudioNodes created from the context will be silent.
       */    close() {
      return __awaiter(this, void 0, void 0, (function*() {
        var ctx;
        isAudioContext(this._context) && "closed" !== this.state && !this._closeStarted && (this._closeStarted = !0, 
        yield this._context.close()), this._initialized && (ctx = this, 
        // remove any additional modules
        notifyCloseContext.forEach((cb => cb(ctx))));
      }));
    }
    /**
       * **Internal** Generate a looped buffer at some constant value.
       */    getConstant(val) {
      if (this._constants.has(val)) return this._constants.get(val);
      {
        const buffer = this._context.createBuffer(1, 128, this._context.sampleRate);
        const arr = buffer.getChannelData(0);
        for (let i = 0; i < arr.length; i++) arr[i] = val;
        const constant = this._context.createBufferSource();
        return constant.channelCount = 1, constant.channelCountMode = "explicit", constant.buffer = buffer, 
        constant.loop = !0, constant.start(0), this._constants.set(val, constant), constant;
      }
    }
    /**
       * Clean up. Also closes the audio context.
       */    dispose() {
      return super.dispose(), this._ticker.dispose(), this._timeouts.dispose(), Object.keys(this._constants).map((val => this._constants[val].disconnect())), 
      this.close(), this;
    }
    //---------------------------
    // TIMEOUTS
    //---------------------------
    /**
       * The private loop which keeps track of the context scheduled timeouts
       * Is invoked from the clock source
       */
    _timeoutLoop() {
      const now = this.now();
      let firstEvent = this._timeouts.peek();
      for (;this._timeouts.length && firstEvent && firstEvent.time <= now; ) 
      // invoke the callback
      firstEvent.callback(), 
      // shift the first event off
      this._timeouts.shift(), 
      // get the next one
      firstEvent = this._timeouts.peek();
    }
    /**
       * A setTimeout which is guaranteed by the clock source.
       * Also runs in the offline context.
       * @param  fn       The callback to invoke
       * @param  timeout  The timeout in seconds
       * @returns ID to use when invoking Context.clearTimeout
       */    setTimeout(fn, timeout) {
      this._timeoutIds++;
      const now = this.now();
      return this._timeouts.add({
        callback: fn,
        id: this._timeoutIds,
        time: now + timeout
      }), this._timeoutIds;
    }
    /**
       * Clears a previously scheduled timeout with Tone.context.setTimeout
       * @param  id  The ID returned from setTimeout
       */    clearTimeout(id) {
      return this._timeouts.forEach((event => {
        event.id === id && this._timeouts.remove(event);
      })), this;
    }
    /**
       * Clear the function scheduled by {@link setInterval}
       */    clearInterval(id) {
      return this.clearTimeout(id);
    }
    /**
       * Adds a repeating event to the context's callback clock
       */    setInterval(fn, interval) {
      const id = ++this._timeoutIds;
      const intervalFn = () => {
        const now = this.now();
        this._timeouts.add({
          callback: () => {
            // invoke the callback
            fn(), 
            // invoke the event to repeat it
            intervalFn();
          },
          id: id,
          time: now + interval
        });
      };
      // kick it off
            return intervalFn(), id;
    }
  }
  let A4 = 440;
  const noOp = () => {};
  /**
   * AudioBuffer loading and storage. ToneAudioBuffer is used internally by all
   * classes that make requests for audio files such as Tone.Player,
   * Tone.Sampler and Tone.Convolver.
   * @example
   * const buffer = new Tone.ToneAudioBuffer("https://tonejs.github.io/audio/casio/A1.mp3", () => {
   * 	console.log("loaded");
   * });
   * @category Core
   */
  class ToneAudioBuffer extends Tone$1 {
    constructor() {
      super(), this.name = "ToneAudioBuffer", 
      /**
           * Callback when the buffer is loaded.
           */
      this.onload = noOp;
      const options = optionsFromArguments(ToneAudioBuffer.getDefaults(), arguments, [ "url", "onload", "onerror" ]);
      this.reverse = options.reverse, this.onload = options.onload, isString(options.url) ? 
      // initiate the download
      this.load(options.url).catch(options.onerror) : options.url && this.set(options.url);
    }
    static getDefaults() {
      return {
        onerror: noOp,
        onload: noOp,
        reverse: !1
      };
    }
    /**
       * The sample rate of the AudioBuffer
       */    get sampleRate() {
      return this._buffer ? this._buffer.sampleRate : getContext().sampleRate;
    }
    /**
       * Pass in an AudioBuffer or ToneAudioBuffer to set the value of this buffer.
       */    set(buffer) {
      return buffer instanceof ToneAudioBuffer ? 
      // if it's loaded, set it
      buffer.loaded ? this._buffer = buffer.get() : 
      // otherwise when it's loaded, invoke it's callback
      buffer.onload = () => {
        this.set(buffer), this.onload(this);
      } : this._buffer = buffer, 
      // reverse it initially
      this._reversed && this._reverse(), this;
    }
    /**
       * The audio buffer stored in the object.
       */    get() {
      return this._buffer;
    }
    /**
       * Makes an fetch request for the selected url then decodes the file as an audio buffer.
       * Invokes the callback once the audio buffer loads.
       * @param url The url of the buffer to load. filetype support depends on the browser.
       * @returns A Promise which resolves with this ToneAudioBuffer
       */    load(url) {
      return __awaiter(this, void 0, void 0, (function*() {
        const doneLoading = ToneAudioBuffer.load(url).then((audioBuffer => {
          this.set(audioBuffer), 
          // invoke the onload method
          this.onload(this);
        }));
        ToneAudioBuffer.downloads.push(doneLoading);
        try {
          yield doneLoading;
        } finally {
          // remove the downloaded file
          const index = ToneAudioBuffer.downloads.indexOf(doneLoading);
          ToneAudioBuffer.downloads.splice(index, 1);
        }
        return this;
      }));
    }
    /**
       * clean up
       */    dispose() {
      return super.dispose(), this._buffer = void 0, this;
    }
    /**
       * Set the audio buffer from the array.
       * To create a multichannel AudioBuffer, pass in a multidimensional array.
       * @param array The array to fill the audio buffer
       */    fromArray(array) {
      const isMultidimensional = isArray(array) && array[0].length > 0;
      const channels = isMultidimensional ? array.length : 1;
      const len = isMultidimensional ? array[0].length : array.length;
      const context = getContext();
      const buffer = context.createBuffer(channels, len, context.sampleRate);
      const multiChannelArray = isMultidimensional || 1 !== channels ? array : [ array ];
      for (let c = 0; c < channels; c++) buffer.copyToChannel(multiChannelArray[c], c);
      return this._buffer = buffer, this;
    }
    /**
       * Sums multiple channels into 1 channel
       * @param chanNum Optionally only copy a single channel from the array.
       */    toMono(chanNum) {
      if (isNumber(chanNum)) this.fromArray(this.toArray(chanNum)); else {
        let outputArray = new Float32Array(this.length);
        const numChannels = this.numberOfChannels;
        for (let channel = 0; channel < numChannels; channel++) {
          const channelArray = this.toArray(channel);
          for (let i = 0; i < channelArray.length; i++) outputArray[i] += channelArray[i];
        }
        // divide by the number of channels
                outputArray = outputArray.map((sample => sample / numChannels)), this.fromArray(outputArray);
      }
      return this;
    }
    /**
       * Get the buffer as an array. Single channel buffers will return a 1-dimensional
       * Float32Array, and multichannel buffers will return multidimensional arrays.
       * @param channel Optionally only copy a single channel from the array.
       */    toArray(channel) {
      if (isNumber(channel)) return this.getChannelData(channel);
      if (1 === this.numberOfChannels) return this.toArray(0);
      {
        const ret = [];
        for (let c = 0; c < this.numberOfChannels; c++) ret[c] = this.getChannelData(c);
        return ret;
      }
    }
    /**
       * Returns the Float32Array representing the PCM audio data for the specific channel.
       * @param  channel  The channel number to return
       * @return The audio as a TypedArray
       */    getChannelData(channel) {
      return this._buffer ? this._buffer.getChannelData(channel) : new Float32Array(0);
    }
    /**
       * Cut a subsection of the array and return a buffer of the
       * subsection. Does not modify the original buffer
       * @param start The time to start the slice
       * @param end The end time to slice. If none is given will default to the end of the buffer
       */    slice(start, end = this.duration) {
      assert(this.loaded, "Buffer is not loaded");
      const startSamples = Math.floor(start * this.sampleRate);
      const endSamples = Math.floor(end * this.sampleRate);
      assert(startSamples < endSamples, "The start time must be less than the end time");
      const length = endSamples - startSamples;
      const retBuffer = getContext().createBuffer(this.numberOfChannels, length, this.sampleRate);
      for (let channel = 0; channel < this.numberOfChannels; channel++) retBuffer.copyToChannel(this.getChannelData(channel).subarray(startSamples, endSamples), channel);
      return new ToneAudioBuffer(retBuffer);
    }
    /**
       * Reverse the buffer.
       */    _reverse() {
      if (this.loaded) for (let i = 0; i < this.numberOfChannels; i++) this.getChannelData(i).reverse();
      return this;
    }
    /**
       * If the buffer is loaded or not
       */    get loaded() {
      return this.length > 0;
    }
    /**
       * The duration of the buffer in seconds.
       */    get duration() {
      return this._buffer ? this._buffer.duration : 0;
    }
    /**
       * The length of the buffer in samples
       */    get length() {
      return this._buffer ? this._buffer.length : 0;
    }
    /**
       * The number of discrete audio channels. Returns 0 if no buffer is loaded.
       */    get numberOfChannels() {
      return this._buffer ? this._buffer.numberOfChannels : 0;
    }
    /**
       * Reverse the buffer.
       */    get reverse() {
      return this._reversed;
    }
    set reverse(rev) {
      this._reversed !== rev && (this._reversed = rev, this._reverse());
    }
    /**
       * Create a ToneAudioBuffer from the array. To create a multichannel AudioBuffer,
       * pass in a multidimensional array.
       * @param array The array to fill the audio buffer
       * @return A ToneAudioBuffer created from the array
       */    static fromArray(array) {
      return (new ToneAudioBuffer).fromArray(array);
    }
    /**
       * Creates a ToneAudioBuffer from a URL, returns a promise which resolves to a ToneAudioBuffer
       * @param  url The url to load.
       * @return A promise which resolves to a ToneAudioBuffer
       */    static fromUrl(url) {
      return __awaiter(this, void 0, void 0, (function*() {
        const buffer = new ToneAudioBuffer;
        return yield buffer.load(url);
      }));
    }
    /**
       * Loads a url using fetch and returns the AudioBuffer.
       */    static load(url) {
      return __awaiter(this, void 0, void 0, (function*() {
        // test if the url contains multiple extensions
        const matches = url.match(/\[([^\]\[]+\|.+)\]$/);
        if (matches) {
          const extensions = matches[1].split("|");
          let extension = extensions[0];
          for (const ext of extensions) if (ToneAudioBuffer.supportsType(ext)) {
            extension = ext;
            break;
          }
          url = url.replace(matches[0], extension);
        }
        // make sure there is a slash between the baseUrl and the url
                const baseUrl = "" === ToneAudioBuffer.baseUrl || ToneAudioBuffer.baseUrl.endsWith("/") ? ToneAudioBuffer.baseUrl : ToneAudioBuffer.baseUrl + "/";
        // encode special characters in file path
                const location = document.createElement("a");
        location.href = baseUrl + url, location.pathname = (location.pathname + location.hash).split("/").map(encodeURIComponent).join("/");
        const response = yield fetch(location.href);
        if (!response.ok) throw new Error(`could not load url: ${url}`);
        const arrayBuffer = yield response.arrayBuffer();
        return yield getContext().decodeAudioData(arrayBuffer);
      }));
    }
    /**
       * Checks a url's extension to see if the current browser can play that file type.
       * @param url The url/extension to test
       * @return If the file extension can be played
       * @static
       * @example
       * Tone.ToneAudioBuffer.supportsType("wav"); // returns true
       * Tone.ToneAudioBuffer.supportsType("path/to/file.wav"); // returns true
       */    static supportsType(url) {
      const extensions = url.split(".");
      const extension = extensions[extensions.length - 1];
      return "" !== document.createElement("audio").canPlayType("audio/" + extension);
    }
    /**
       * Returns a Promise which resolves when all of the buffers have loaded
       */    static loaded() {
      return __awaiter(this, void 0, void 0, (function*() {
        for (yield Promise.resolve(); ToneAudioBuffer.downloads.length; ) yield ToneAudioBuffer.downloads[0];
      }));
    }
  }
  //-------------------------------------
  // STATIC METHODS
  //-------------------------------------
  /**
   * A path which is prefixed before every url.
   */  ToneAudioBuffer.baseUrl = "", 
  /**
   * All of the downloads
   */
  ToneAudioBuffer.downloads = [];
  /**
   * Wrapper around the OfflineAudioContext
   * @category Core
   * @example
   * // generate a single channel, 0.5 second buffer
   * const context = new Tone.OfflineContext(1, 0.5, 44100);
   * const osc = new Tone.Oscillator({ context });
   * context.render().then(buffer => {
   * 	console.log(buffer.numberOfChannels, buffer.duration);
   * });
   */
  class OfflineContext extends Context {
    constructor() {
      var channels, length, sampleRate;
      super({
        clockSource: "offline",
        context: isOfflineAudioContext(arguments[0]) ? arguments[0] : (channels = arguments[0], 
        length = arguments[1] * arguments[2], sampleRate = arguments[2], new offlineAudioContextConstructor(channels, length, sampleRate)),
        lookAhead: 0,
        updateInterval: isOfflineAudioContext(arguments[0]) ? 128 / arguments[0].sampleRate : 128 / arguments[2]
      }), this.name = "OfflineContext", 
      /**
           * An artificial clock source
           */
      this._currentTime = 0, this.isOffline = !0, this._duration = isOfflineAudioContext(arguments[0]) ? arguments[0].length / arguments[0].sampleRate : arguments[1];
    }
    /**
       * Override the now method to point to the internal clock time
       */    now() {
      return this._currentTime;
    }
    /**
       * Same as this.now()
       */    get currentTime() {
      return this._currentTime;
    }
    /**
       * Render just the clock portion of the audio context.
       */    _renderClock(asynchronous) {
      return __awaiter(this, void 0, void 0, (function*() {
        let index = 0;
        for (;this._duration - this._currentTime >= 0; ) {
          // invoke all the callbacks on that time
          this.emit("tick"), 
          // increment the clock in block-sized chunks
          this._currentTime += 128 / this.sampleRate, 
          // yield once a second of audio
          index++;
          const yieldEvery = Math.floor(this.sampleRate / 128);
          asynchronous && index % yieldEvery == 0 && (yield new Promise((done => setTimeout(done, 1))));
        }
      }));
    }
    /**
       * Render the output of the OfflineContext
       * @param asynchronous If the clock should be rendered asynchronously, which will not block the main thread, but be slightly slower.
       */    render() {
      return __awaiter(this, arguments, void 0, (function*(asynchronous = !0) {
        yield this.workletsAreReady(), yield this._renderClock(asynchronous);
        const buffer = yield this._context.startRendering();
        return new ToneAudioBuffer(buffer);
      }));
    }
    /**
       * Close the context
       */    close() {
      return Promise.resolve();
    }
  }
  /**
   * This dummy context is used to avoid throwing immediate errors when importing in Node.js
   */  const dummyContext = new class extends BaseContext {
    constructor() {
      super(...arguments), this.lookAhead = 0, this.latencyHint = 0, this.isOffline = !1;
    }
    //---------------------------
    // BASE AUDIO CONTEXT METHODS
    //---------------------------
    createAnalyser() {
      return {};
    }
    createOscillator() {
      return {};
    }
    createBufferSource() {
      return {};
    }
    createBiquadFilter() {
      return {};
    }
    createBuffer(_numberOfChannels, _length, _sampleRate) {
      return {};
    }
    createChannelMerger(_numberOfInputs) {
      return {};
    }
    createChannelSplitter(_numberOfOutputs) {
      return {};
    }
    createConstantSource() {
      return {};
    }
    createConvolver() {
      return {};
    }
    createDelay(_maxDelayTime) {
      return {};
    }
    createDynamicsCompressor() {
      return {};
    }
    createGain() {
      return {};
    }
    createIIRFilter(_feedForward, _feedback) {
      return {};
    }
    createPanner() {
      return {};
    }
    createPeriodicWave(_real, _imag, _constraints) {
      return {};
    }
    createStereoPanner() {
      return {};
    }
    createWaveShaper() {
      return {};
    }
    createMediaStreamSource(_stream) {
      return {};
    }
    createMediaElementSource(_element) {
      return {};
    }
    createMediaStreamDestination() {
      return {};
    }
    decodeAudioData(_audioData) {
      return Promise.resolve({});
    }
    //---------------------------
    // TONE AUDIO CONTEXT METHODS
    //---------------------------
    createAudioWorkletNode(_name, _options) {
      return {};
    }
    get rawContext() {
      return {};
    }
    addAudioWorkletModule(_url) {
      return __awaiter(this, void 0, void 0, (function*() {
        return Promise.resolve();
      }));
    }
    resume() {
      return Promise.resolve();
    }
    setTimeout(_fn, _timeout) {
      return 0;
    }
    clearTimeout(_id) {
      return this;
    }
    setInterval(_fn, _interval) {
      return 0;
    }
    clearInterval(_id) {
      return this;
    }
    getConstant(_val) {
      return {};
    }
    get currentTime() {
      return 0;
    }
    get state() {
      return {};
    }
    get sampleRate() {
      return 0;
    }
    get listener() {
      return {};
    }
    get transport() {
      return {};
    }
    get draw() {
      return {};
    }
    set draw(_d) {}
    get destination() {
      return {};
    }
    set destination(_d) {}
    now() {
      return 0;
    }
    immediate() {
      return 0;
    }
  };
  /**
   * The global audio context which is getable and assignable through
   * getContext and setContext
   */  let globalContext = dummyContext;
  if (theWindow && !theWindow.TONE_SILENCE_LOGGING) {
    const printString = ` * Tone.js ${"v"}15.0.4 * `;
    // eslint-disable-next-line no-console
        console.log(`%c${printString}`, "background: #000; color: #fff");
  }
  /**
   * TimeBase is a flexible encoding of time which can be evaluated to and from a string.
   */  class TimeBaseClass extends Tone$1 {
    /**
       * @param context The context associated with the time value. Used to compute
       * Transport and context-relative timing.
       * @param  value  The time value as a number, string or object
       * @param  units  Unit values
       */
    constructor(context, value, units) {
      super(), 
      /**
           * The default units
           */
      this.defaultUnits = "s", this._val = value, this._units = units, this.context = context, 
      this._expressions = this._getExpressions();
    }
    /**
       * All of the time encoding expressions
       */    _getExpressions() {
      return {
        hz: {
          method: value => this._frequencyToUnits(parseFloat(value)),
          regexp: /^(\d+(?:\.\d+)?)hz$/i
        },
        i: {
          method: value => this._ticksToUnits(parseInt(value, 10)),
          regexp: /^(\d+)i$/i
        },
        m: {
          method: value => this._beatsToUnits(parseInt(value, 10) * this._getTimeSignature()),
          regexp: /^(\d+)m$/i
        },
        n: {
          method: (value, dot) => {
            const numericValue = parseInt(value, 10);
            const scalar = "." === dot ? 1.5 : 1;
            return 1 === numericValue ? this._beatsToUnits(this._getTimeSignature()) * scalar : this._beatsToUnits(4 / numericValue) * scalar;
          },
          regexp: /^(\d+)n(\.?)$/i
        },
        number: {
          method: value => this._expressions[this.defaultUnits].method.call(this, value),
          regexp: /^(\d+(?:\.\d+)?)$/
        },
        s: {
          method: value => this._secondsToUnits(parseFloat(value)),
          regexp: /^(\d+(?:\.\d+)?)s$/
        },
        samples: {
          method: value => parseInt(value, 10) / this.context.sampleRate,
          regexp: /^(\d+)samples$/
        },
        t: {
          method: value => {
            const numericValue = parseInt(value, 10);
            return this._beatsToUnits(8 / (3 * Math.floor(numericValue)));
          },
          regexp: /^(\d+)t$/i
        },
        tr: {
          method: (m, q, s) => {
            let total = 0;
            return m && "0" !== m && (total += this._beatsToUnits(this._getTimeSignature() * parseFloat(m))), 
            q && "0" !== q && (total += this._beatsToUnits(parseFloat(q))), s && "0" !== s && (total += this._beatsToUnits(parseFloat(s) / 4)), 
            total;
          },
          regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/
        }
      };
    }
    //-------------------------------------
    // 	VALUE OF
    //-------------------------------------
    /**
       * Evaluate the time value. Returns the time in seconds.
       */
    valueOf() {
      if (this._val instanceof TimeBaseClass && this.fromType(this._val), isUndef(this._val)) return this._noArg();
      if (isString(this._val) && isUndef(this._units)) {
        for (const units in this._expressions) if (this._expressions[units].regexp.test(this._val.trim())) {
          this._units = units;
          break;
        }
      } else if (isObject(this._val)) {
        let total = 0;
        for (const typeName in this._val) if (isDefined(this._val[typeName])) {
          const quantity = this._val[typeName];
          total += 
          // @ts-ignore
          new this.constructor(this.context, typeName).valueOf() * quantity;
        }
        return total;
      }
      if (isDefined(this._units)) {
        const expr = this._expressions[this._units];
        const matching = this._val.toString().trim().match(expr.regexp);
        return matching ? expr.method.apply(this, matching.slice(1)) : expr.method.call(this, this._val);
      }
      return isString(this._val) ? parseFloat(this._val) : this._val;
    }
    //-------------------------------------
    // 	UNIT CONVERSIONS
    //-------------------------------------
    /**
       * Returns the value of a frequency in the current units
       */
    _frequencyToUnits(freq) {
      return 1 / freq;
    }
    /**
       * Return the value of the beats in the current units
       */    _beatsToUnits(beats) {
      return 60 / this._getBpm() * beats;
    }
    /**
       * Returns the value of a second in the current units
       */    _secondsToUnits(seconds) {
      return seconds;
    }
    /**
       * Returns the value of a tick in the current time units
       */    _ticksToUnits(ticks) {
      return ticks * this._beatsToUnits(1) / this._getPPQ();
    }
    /**
       * With no arguments, return 'now'
       */    _noArg() {
      return this._now();
    }
    //-------------------------------------
    // 	TEMPO CONVERSIONS
    //-------------------------------------
    /**
       * Return the bpm
       */
    _getBpm() {
      return this.context.transport.bpm.value;
    }
    /**
       * Return the timeSignature
       */    _getTimeSignature() {
      return this.context.transport.timeSignature;
    }
    /**
       * Return the PPQ or 192 if Transport is not available
       */    _getPPQ() {
      return this.context.transport.PPQ;
    }
    //-------------------------------------
    // 	CONVERSION INTERFACE
    //-------------------------------------
    /**
       * Coerce a time type into this units type.
       * @param type Any time type units
       */
    fromType(type) {
      switch (this._units = void 0, this.defaultUnits) {
       case "s":
        this._val = type.toSeconds();
        break;

       case "i":
        this._val = type.toTicks();
        break;

       case "hz":
        this._val = type.toFrequency();
        break;

       case "midi":
        this._val = type.toMidi();
      }
      return this;
    }
    /**
       * Return the value in hertz
       */    toFrequency() {
      return 1 / this.toSeconds();
    }
    /**
       * Return the time in samples
       */    toSamples() {
      return this.toSeconds() * this.context.sampleRate;
    }
    /**
       * Return the time in milliseconds.
       */    toMilliseconds() {
      return 1e3 * this.toSeconds();
    }
  }
  /**
   * TimeClass is a primitive type for encoding and decoding Time values.
   * TimeClass can be passed into the parameter of any method which takes time as an argument.
   * @param  val    The time value.
   * @param  units  The units of the value.
   * @example
   * const time = Tone.Time("4n"); // a quarter note
   * @category Unit
   */  class TimeClass extends TimeBaseClass {
    constructor() {
      super(...arguments), this.name = "TimeClass";
    }
    _getExpressions() {
      return Object.assign(super._getExpressions(), {
        now: {
          method: capture => this._now() + new this.constructor(this.context, capture).valueOf(),
          regexp: /^\+(.+)/
        },
        quantize: {
          method: capture => {
            const quantTo = new TimeClass(this.context, capture).valueOf();
            return this._secondsToUnits(this.context.transport.nextSubdivision(quantTo));
          },
          regexp: /^@(.+)/
        }
      });
    }
    /**
       * Quantize the time by the given subdivision. Optionally add a
       * percentage which will move the time value towards the ideal
       * quantized value by that percentage.
       * @param  subdiv    The subdivision to quantize to
       * @param  percent  Move the time value towards the quantized value by a percentage.
       * @example
       * Tone.Time(21).quantize(2); // returns 22
       * Tone.Time(0.6).quantize("4n", 0.5); // returns 0.55
       */    quantize(subdiv, percent = 1) {
      const subdivision = new this.constructor(this.context, subdiv).valueOf();
      const value = this.valueOf();
      return value + (Math.round(value / subdivision) * subdivision - value) * percent;
    }
    //-------------------------------------
    // CONVERSIONS
    //-------------------------------------
    /**
       * Convert a Time to Notation. The notation values are will be the
       * closest representation between 1m to 128th note.
       * @return {Notation}
       * @example
       * // if the Transport is at 120bpm:
       * Tone.Time(2).toNotation(); // returns "1m"
       */
    toNotation() {
      const time = this.toSeconds();
      const testNotations = [ "1m" ];
      for (let power = 1; power < 9; power++) {
        const subdiv = Math.pow(2, power);
        testNotations.push(subdiv + "n."), testNotations.push(subdiv + "n"), testNotations.push(subdiv + "t");
      }
      testNotations.push("0");
      // find the closets notation representation
      let closest = testNotations[0];
      let closestSeconds = new TimeClass(this.context, testNotations[0]).toSeconds();
      return testNotations.forEach((notation => {
        const notationSeconds = new TimeClass(this.context, notation).toSeconds();
        Math.abs(notationSeconds - time) < Math.abs(closestSeconds - time) && (closest = notation, 
        closestSeconds = notationSeconds);
      })), closest;
    }
    /**
       * Return the time encoded as Bars:Beats:Sixteenths.
       */    toBarsBeatsSixteenths() {
      const quarterTime = this._beatsToUnits(1);
      let quarters = this.valueOf() / quarterTime;
      quarters = parseFloat(quarters.toFixed(4));
      const measures = Math.floor(quarters / this._getTimeSignature());
      let sixteenths = quarters % 1 * 4;
      quarters = Math.floor(quarters) % this._getTimeSignature();
      const sixteenthString = sixteenths.toString();
      sixteenthString.length > 3 && (
      // the additional parseFloat removes insignificant trailing zeroes
      sixteenths = parseFloat(parseFloat(sixteenthString).toFixed(3)));
      return [ measures, quarters, sixteenths ].join(":");
    }
    /**
       * Return the time in ticks.
       */    toTicks() {
      const quarterTime = this._beatsToUnits(1);
      return this.valueOf() / quarterTime * this._getPPQ();
    }
    /**
       * Return the time in seconds.
       */    toSeconds() {
      return this.valueOf();
    }
    /**
       * Return the value as a midi note.
       */    toMidi() {
      return ftom(this.toFrequency());
    }
    _now() {
      return this.context.now();
    }
  }
  /* eslint-disable key-spacing */
  /**
   * Frequency is a primitive type for encoding Frequency values.
   * Eventually all time values are evaluated to hertz using the `valueOf` method.
   * @example
   * Tone.Frequency("C3"); // 261
   * Tone.Frequency(38, "midi");
   * Tone.Frequency("C3").transpose(4);
   * @category Unit
   */  class FrequencyClass extends TimeClass {
    constructor() {
      super(...arguments), this.name = "Frequency", this.defaultUnits = "hz";
    }
    /**
       * The [concert tuning pitch](https://en.wikipedia.org/wiki/Concert_pitch) which is used
       * to generate all the other pitch values from notes. A4's values in Hertz.
       */    static get A4() {
      return A4;
    }
    static set A4(freq) {
      !(function(freq) {
        A4 = freq;
      })(freq);
    }
    //-------------------------------------
    // 	AUGMENT BASE EXPRESSIONS
    //-------------------------------------
    _getExpressions() {
      return Object.assign({}, super._getExpressions(), {
        midi: {
          regexp: /^(\d+(?:\.\d+)?midi)/,
          method(value) {
            return "midi" === this.defaultUnits ? value : FrequencyClass.mtof(value);
          }
        },
        note: {
          regexp: /^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,
          method(pitch, octave) {
            const noteNumber = noteToScaleIndex[pitch.toLowerCase()] + 12 * (parseInt(octave, 10) + 1);
            return "midi" === this.defaultUnits ? noteNumber : FrequencyClass.mtof(noteNumber);
          }
        },
        tr: {
          regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
          method(m, q, s) {
            let total = 1;
            return m && "0" !== m && (total *= this._beatsToUnits(this._getTimeSignature() * parseFloat(m))), 
            q && "0" !== q && (total *= this._beatsToUnits(parseFloat(q))), s && "0" !== s && (total *= this._beatsToUnits(parseFloat(s) / 4)), 
            total;
          }
        }
      });
    }
    //-------------------------------------
    // 	EXPRESSIONS
    //-------------------------------------
    /**
       * Transposes the frequency by the given number of semitones.
       * @return  A new transposed frequency
       * @example
       * Tone.Frequency("A4").transpose(3); // "C5"
       */
    transpose(interval) {
      return new FrequencyClass(this.context, this.valueOf() * intervalToFrequencyRatio(interval));
    }
    /**
       * Takes an array of semitone intervals and returns
       * an array of frequencies transposed by those intervals.
       * @return  Returns an array of Frequencies
       * @example
       * Tone.Frequency("A4").harmonize([0, 3, 7]); // ["A4", "C5", "E5"]
       */    harmonize(intervals) {
      return intervals.map((interval => this.transpose(interval)));
    }
    //-------------------------------------
    // 	UNIT CONVERSIONS
    //-------------------------------------
    /**
       * Return the value of the frequency as a MIDI note
       * @example
       * Tone.Frequency("C4").toMidi(); // 60
       */
    toMidi() {
      return ftom(this.valueOf());
    }
    /**
       * Return the value of the frequency in Scientific Pitch Notation
       * @example
       * Tone.Frequency(69, "midi").toNote(); // "A4"
       */    toNote() {
      const freq = this.toFrequency();
      const log = Math.log2(freq / FrequencyClass.A4);
      let noteNumber = Math.round(12 * log) + 57;
      const octave = Math.floor(noteNumber / 12);
      octave < 0 && (noteNumber += -12 * octave);
      return scaleIndexToNote[noteNumber % 12] + octave.toString();
    }
    /**
       * Return the duration of one cycle in seconds.
       */    toSeconds() {
      return 1 / super.toSeconds();
    }
    /**
       * Return the duration of one cycle in ticks
       */    toTicks() {
      const quarterTime = this._beatsToUnits(1);
      const quarters = this.valueOf() / quarterTime;
      return Math.floor(quarters * this._getPPQ());
    }
    //-------------------------------------
    // 	UNIT CONVERSIONS HELPERS
    //-------------------------------------
    /**
       * With no arguments, return 0
       */
    _noArg() {
      return 0;
    }
    /**
       * Returns the value of a frequency in the current units
       */    _frequencyToUnits(freq) {
      return freq;
    }
    /**
       * Returns the value of a tick in the current time units
       */    _ticksToUnits(ticks) {
      return 1 / (60 * ticks / (this._getBpm() * this._getPPQ()));
    }
    /**
       * Return the value of the beats in the current units
       */    _beatsToUnits(beats) {
      return 1 / super._beatsToUnits(beats);
    }
    /**
       * Returns the value of a second in the current units
       */    _secondsToUnits(seconds) {
      return 1 / seconds;
    }
    /**
       * Convert a MIDI note to frequency value.
       * @param  midi The midi number to convert.
       * @return The corresponding frequency value
       */    static mtof(midi) {
      return (function(midi) {
        return A4 * Math.pow(2, (midi - 69) / 12);
      })(midi);
    }
    /**
       * Convert a frequency value to a MIDI note.
       * @param frequency The value to frequency value to convert.
       */    static ftom(frequency) {
      return ftom(frequency);
    }
  }
  //-------------------------------------
  // 	FREQUENCY CONVERSIONS
  //-------------------------------------
  /**
   * Note to scale index.
   * @hidden
   */  const noteToScaleIndex = {
    cbbb: -3,
    cbb: -2,
    cb: -1,
    c: 0,
    "c#": 1,
    cx: 2,
    "c##": 2,
    "c###": 3,
    "cx#": 3,
    "c#x": 3,
    dbbb: -1,
    dbb: 0,
    db: 1,
    d: 2,
    "d#": 3,
    dx: 4,
    "d##": 4,
    "d###": 5,
    "dx#": 5,
    "d#x": 5,
    ebbb: 1,
    ebb: 2,
    eb: 3,
    e: 4,
    "e#": 5,
    ex: 6,
    "e##": 6,
    "e###": 7,
    "ex#": 7,
    "e#x": 7,
    fbbb: 2,
    fbb: 3,
    fb: 4,
    f: 5,
    "f#": 6,
    fx: 7,
    "f##": 7,
    "f###": 8,
    "fx#": 8,
    "f#x": 8,
    gbbb: 4,
    gbb: 5,
    gb: 6,
    g: 7,
    "g#": 8,
    gx: 9,
    "g##": 9,
    "g###": 10,
    "gx#": 10,
    "g#x": 10,
    abbb: 6,
    abb: 7,
    ab: 8,
    a: 9,
    "a#": 10,
    ax: 11,
    "a##": 11,
    "a###": 12,
    "ax#": 12,
    "a#x": 12,
    bbbb: 8,
    bbb: 9,
    bb: 10,
    b: 11,
    "b#": 12,
    bx: 13,
    "b##": 13,
    "b###": 14,
    "bx#": 14,
    "b#x": 14
  };
  /**
   * scale index to note (sharps)
   * @hidden
   */  const scaleIndexToNote = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
  /**
   * TransportTime is a time along the Transport's
   * timeline. It is similar to Tone.Time, but instead of evaluating
   * against the AudioContext's clock, it is evaluated against
   * the Transport's position. See [TransportTime wiki](https://github.com/Tonejs/Tone.js/wiki/TransportTime).
   * @category Unit
   */  class TransportTimeClass extends TimeClass {
    constructor() {
      super(...arguments), this.name = "TransportTime";
    }
    /**
       * Return the current time in whichever context is relevant
       */    _now() {
      return this.context.transport.seconds;
    }
  }
  /**
   * The Base class for all nodes that have an AudioContext.
   */  class ToneWithContext extends Tone$1 {
    constructor() {
      super();
      const options = optionsFromArguments(ToneWithContext.getDefaults(), arguments, [ "context" ]);
      this.defaultContext ? this.context = this.defaultContext : this.context = options.context;
    }
    static getDefaults() {
      return {
        context: getContext()
      };
    }
    /**
       * Return the current time of the Context clock plus the lookAhead.
       * @example
       * setInterval(() => {
       * 	console.log(Tone.now());
       * }, 100);
       */    now() {
      return this.context.currentTime + this.context.lookAhead;
    }
    /**
       * Return the current time of the Context clock without any lookAhead.
       * @example
       * setInterval(() => {
       * 	console.log(Tone.immediate());
       * }, 100);
       */    immediate() {
      return this.context.currentTime;
    }
    /**
       * The duration in seconds of one sample.
       */    get sampleTime() {
      return 1 / this.context.sampleRate;
    }
    /**
       * The number of seconds of 1 processing block (128 samples)
       * @example
       * console.log(Tone.Destination.blockTime);
       */    get blockTime() {
      return 128 / this.context.sampleRate;
    }
    /**
       * Convert the incoming time to seconds.
       * This is calculated against the current {@link TransportClass} bpm
       * @example
       * const gain = new Tone.Gain();
       * setInterval(() => console.log(gain.toSeconds("4n")), 100);
       * // ramp the tempo to 60 bpm over 30 seconds
       * Tone.getTransport().bpm.rampTo(60, 30);
       */    toSeconds(time) {
      return (function(time) {
        isUndef(time) && isInsideScheduledCallback && !printedScheduledWarning && (printedScheduledWarning = !0, 
        warn("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"));
      })(time), new TimeClass(this.context, time).toSeconds();
    }
    /**
       * Convert the input to a frequency number
       * @example
       * const gain = new Tone.Gain();
       * console.log(gain.toFrequency("4n"));
       */    toFrequency(freq) {
      return new FrequencyClass(this.context, freq).toFrequency();
    }
    /**
       * Convert the input time into ticks
       * @example
       * const gain = new Tone.Gain();
       * console.log(gain.toTicks("4n"));
       */    toTicks(time) {
      return new TransportTimeClass(this.context, time).toTicks();
    }
    //-------------------------------------
    // 	GET/SET
    //-------------------------------------
    /**
       * Get a subset of the properties which are in the partial props
       */
    _getPartialProperties(props) {
      const options = this.get();
      // remove attributes from the prop that are not in the partial
            return Object.keys(options).forEach((name => {
        isUndef(props[name]) && delete options[name];
      })), options;
    }
    /**
       * Get the object's attributes.
       * @example
       * const osc = new Tone.Oscillator();
       * console.log(osc.get());
       */    get() {
      const defaults = this.constructor.getDefaults();
      return Object.keys(defaults).forEach((attribute => {
        if (Reflect.has(this, attribute)) {
          const member = this[attribute];
          isDefined(member) && isDefined(member.value) && isDefined(member.setValueAtTime) ? defaults[attribute] = member.value : member instanceof ToneWithContext ? defaults[attribute] = member._getPartialProperties(defaults[attribute]) : isArray(member) || isNumber(member) || isString(member) || "boolean" == typeof member ? defaults[attribute] = member : 
          // remove all undefined and unserializable attributes
          delete defaults[attribute];
        }
      })), defaults;
    }
    /**
       * Set multiple properties at once with an object.
       * @example
       * const filter = new Tone.Filter().toDestination();
       * // set values using an object
       * filter.set({
       * 	frequency: "C6",
       * 	type: "highpass"
       * });
       * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/Analogsynth_octaves_highmid.mp3").connect(filter);
       * player.autostart = true;
       */    set(props) {
      return Object.keys(props).forEach((attribute => {
        Reflect.has(this, attribute) && isDefined(this[attribute]) && (this[attribute] && isDefined(this[attribute].value) && isDefined(this[attribute].setValueAtTime) ? 
        // small optimization
        this[attribute].value !== props[attribute] && (this[attribute].value = props[attribute]) : this[attribute] instanceof ToneWithContext ? this[attribute].set(props[attribute]) : this[attribute] = props[attribute]);
      })), this;
    }
  }
  /**
   * Param wraps the native Web Audio's AudioParam to provide
   * additional unit conversion functionality. It also
   * serves as a base-class for classes which have a single,
   * automatable parameter.
   * @category Core
   */  class Param extends ToneWithContext {
    constructor() {
      const options = optionsFromArguments(Param.getDefaults(), arguments, [ "param", "units", "convert" ]);
      for (super(options), this.name = "Param", this.overridden = !1, 
      /**
           * The minimum output value
           */
      this._minOutput = 1e-7, assert(isDefined(options.param) && (isAudioParam(options.param) || options.param instanceof Param), "param must be an AudioParam"); !isAudioParam(options.param); ) options.param = options.param._param;
      this._swappable = !!isDefined(options.swappable) && options.swappable, this._swappable ? (this.input = this.context.createGain(), 
      // initialize
      this._param = options.param, this.input.connect(this._param)) : this._param = this.input = options.param, 
      this._events = new Timeline(1e3), this._initialValue = this._param.defaultValue, 
      this.units = options.units, this.convert = options.convert, this._minValue = options.minValue, 
      this._maxValue = options.maxValue, 
      // if the value is defined, set it immediately
      isDefined(options.value) && options.value !== this._toType(this._initialValue) && this.setValueAtTime(options.value, 0);
    }
    static getDefaults() {
      return Object.assign(ToneWithContext.getDefaults(), {
        convert: !0,
        units: "number"
      });
    }
    get value() {
      const now = this.now();
      return this.getValueAtTime(now);
    }
    set value(value) {
      this.cancelScheduledValues(this.now()), this.setValueAtTime(value, this.now());
    }
    get minValue() {
      // if it's not the default minValue, return it
      return isDefined(this._minValue) ? this._minValue : "time" === this.units || "frequency" === this.units || "normalRange" === this.units || "positive" === this.units || "transportTime" === this.units || "ticks" === this.units || "bpm" === this.units || "hertz" === this.units || "samples" === this.units ? 0 : "audioRange" === this.units ? -1 : "decibels" === this.units ? -1 / 0 : this._param.minValue;
    }
    get maxValue() {
      return isDefined(this._maxValue) ? this._maxValue : "normalRange" === this.units || "audioRange" === this.units ? 1 : this._param.maxValue;
    }
    /**
       * Type guard based on the unit name
       */    _is(arg, type) {
      return this.units === type;
    }
    /**
       * Make sure the value is always in the defined range
       */    _assertRange(value) {
      return isDefined(this.maxValue) && isDefined(this.minValue) && assertRange(value, this._fromType(this.minValue), this._fromType(this.maxValue)), 
      value;
    }
    /**
       * Convert the given value from the type specified by Param.units
       * into the destination value (such as Gain or Frequency).
       */    _fromType(val) {
      return this.convert && !this.overridden ? this._is(val, "time") ? this.toSeconds(val) : this._is(val, "decibels") ? dbToGain(val) : this._is(val, "frequency") ? this.toFrequency(val) : val : this.overridden ? 0 : val;
    }
    /**
       * Convert the parameters value into the units specified by Param.units.
       */    _toType(val) {
      return this.convert && "decibels" === this.units ? gainToDb(val) : val;
    }
    //-------------------------------------
    // ABSTRACT PARAM INTERFACE
    // all docs are generated from ParamInterface.ts
    //-------------------------------------
    setValueAtTime(value, time) {
      const computedTime = this.toSeconds(time);
      const numericValue = this._fromType(value);
      return assert(isFinite(numericValue) && isFinite(computedTime), `Invalid argument(s) to setValueAtTime: ${JSON.stringify(value)}, ${JSON.stringify(time)}`), 
      this._assertRange(numericValue), this.log(this.units, "setValueAtTime", value, computedTime), 
      this._events.add({
        time: computedTime,
        type: "setValueAtTime",
        value: numericValue
      }), this._param.setValueAtTime(numericValue, computedTime), this;
    }
    getValueAtTime(time) {
      const computedTime = Math.max(this.toSeconds(time), 0);
      const after = this._events.getAfter(computedTime);
      const before = this._events.get(computedTime);
      let value = this._initialValue;
      // if it was set by
            if (null === before) value = this._initialValue; else if ("setTargetAtTime" !== before.type || null !== after && "setValueAtTime" !== after.type) if (null === after) value = before.value; else if ("linearRampToValueAtTime" === after.type || "exponentialRampToValueAtTime" === after.type) {
        let beforeValue = before.value;
        if ("setTargetAtTime" === before.type) {
          const previous = this._events.getBefore(before.time);
          beforeValue = null === previous ? this._initialValue : previous.value;
        }
        value = "linearRampToValueAtTime" === after.type ? this._linearInterpolate(before.time, beforeValue, after.time, after.value, computedTime) : this._exponentialInterpolate(before.time, beforeValue, after.time, after.value, computedTime);
      } else value = before.value; else {
        const previous = this._events.getBefore(before.time);
        let previousVal;
        previousVal = null === previous ? this._initialValue : previous.value, "setTargetAtTime" === before.type && (value = this._exponentialApproach(before.time, previousVal, before.value, before.constant, computedTime));
      }
      return this._toType(value);
    }
    setRampPoint(time) {
      time = this.toSeconds(time);
      let currentVal = this.getValueAtTime(time);
      return this.cancelAndHoldAtTime(time), 0 === this._fromType(currentVal) && (currentVal = this._toType(this._minOutput)), 
      this.setValueAtTime(currentVal, time), this;
    }
    linearRampToValueAtTime(value, endTime) {
      const numericValue = this._fromType(value);
      const computedTime = this.toSeconds(endTime);
      return assert(isFinite(numericValue) && isFinite(computedTime), `Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(value)}, ${JSON.stringify(endTime)}`), 
      this._assertRange(numericValue), this._events.add({
        time: computedTime,
        type: "linearRampToValueAtTime",
        value: numericValue
      }), this.log(this.units, "linearRampToValueAtTime", value, computedTime), this._param.linearRampToValueAtTime(numericValue, computedTime), 
      this;
    }
    exponentialRampToValueAtTime(value, endTime) {
      let numericValue = this._fromType(value);
      // the value can't be 0
            numericValue = EQ(numericValue, 0) ? this._minOutput : numericValue, this._assertRange(numericValue);
      const computedTime = this.toSeconds(endTime);
      return assert(isFinite(numericValue) && isFinite(computedTime), `Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(value)}, ${JSON.stringify(endTime)}`), 
      // store the event
      this._events.add({
        time: computedTime,
        type: "exponentialRampToValueAtTime",
        value: numericValue
      }), this.log(this.units, "exponentialRampToValueAtTime", value, computedTime), this._param.exponentialRampToValueAtTime(numericValue, computedTime), 
      this;
    }
    exponentialRampTo(value, rampTime, startTime) {
      return startTime = this.toSeconds(startTime), this.setRampPoint(startTime), this.exponentialRampToValueAtTime(value, startTime + this.toSeconds(rampTime)), 
      this;
    }
    linearRampTo(value, rampTime, startTime) {
      return startTime = this.toSeconds(startTime), this.setRampPoint(startTime), this.linearRampToValueAtTime(value, startTime + this.toSeconds(rampTime)), 
      this;
    }
    targetRampTo(value, rampTime, startTime) {
      return startTime = this.toSeconds(startTime), this.setRampPoint(startTime), this.exponentialApproachValueAtTime(value, startTime, rampTime), 
      this;
    }
    exponentialApproachValueAtTime(value, time, rampTime) {
      time = this.toSeconds(time), rampTime = this.toSeconds(rampTime);
      const timeConstant = Math.log(rampTime + 1) / Math.log(200);
      return this.setTargetAtTime(value, time, timeConstant), 
      // at 90% start a linear ramp to the final value
      this.cancelAndHoldAtTime(time + .9 * rampTime), this.linearRampToValueAtTime(value, time + rampTime), 
      this;
    }
    setTargetAtTime(value, startTime, timeConstant) {
      const numericValue = this._fromType(value);
      // The value will never be able to approach without timeConstant > 0.
            assert(isFinite(timeConstant) && timeConstant > 0, "timeConstant must be a number greater than 0");
      const computedTime = this.toSeconds(startTime);
      return this._assertRange(numericValue), assert(isFinite(numericValue) && isFinite(computedTime), `Invalid argument(s) to setTargetAtTime: ${JSON.stringify(value)}, ${JSON.stringify(startTime)}`), 
      this._events.add({
        constant: timeConstant,
        time: computedTime,
        type: "setTargetAtTime",
        value: numericValue
      }), this.log(this.units, "setTargetAtTime", value, computedTime, timeConstant), 
      this._param.setTargetAtTime(numericValue, computedTime, timeConstant), this;
    }
    setValueCurveAtTime(values, startTime, duration, scaling = 1) {
      duration = this.toSeconds(duration), startTime = this.toSeconds(startTime);
      const startingValue = this._fromType(values[0]) * scaling;
      this.setValueAtTime(this._toType(startingValue), startTime);
      const segTime = duration / (values.length - 1);
      for (let i = 1; i < values.length; i++) {
        const numericValue = this._fromType(values[i]) * scaling;
        this.linearRampToValueAtTime(this._toType(numericValue), startTime + i * segTime);
      }
      return this;
    }
    cancelScheduledValues(time) {
      const computedTime = this.toSeconds(time);
      return assert(isFinite(computedTime), `Invalid argument to cancelScheduledValues: ${JSON.stringify(time)}`), 
      this._events.cancel(computedTime), this._param.cancelScheduledValues(computedTime), 
      this.log(this.units, "cancelScheduledValues", computedTime), this;
    }
    cancelAndHoldAtTime(time) {
      const computedTime = this.toSeconds(time);
      const valueAtTime = this._fromType(this.getValueAtTime(computedTime));
      // remove the schedule events
            assert(isFinite(computedTime), `Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(time)}`), 
      this.log(this.units, "cancelAndHoldAtTime", computedTime, "value=" + valueAtTime);
      // if there is an event at the given computedTime
      // and that even is not a "set"
      const before = this._events.get(computedTime);
      const after = this._events.getAfter(computedTime);
      return before && EQ(before.time, computedTime) ? 
      // remove everything after
      after ? (this._param.cancelScheduledValues(after.time), this._events.cancel(after.time)) : (this._param.cancelAndHoldAtTime(computedTime), 
      this._events.cancel(computedTime + this.sampleTime)) : after && (this._param.cancelScheduledValues(after.time), 
      // cancel the next event(s)
      this._events.cancel(after.time), "linearRampToValueAtTime" === after.type ? this.linearRampToValueAtTime(this._toType(valueAtTime), computedTime) : "exponentialRampToValueAtTime" === after.type && this.exponentialRampToValueAtTime(this._toType(valueAtTime), computedTime)), 
      // set the value at the given time
      this._events.add({
        time: computedTime,
        type: "setValueAtTime",
        value: valueAtTime
      }), this._param.setValueAtTime(valueAtTime, computedTime), this;
    }
    rampTo(value, rampTime = .1, startTime) {
      return "frequency" === this.units || "bpm" === this.units || "decibels" === this.units ? this.exponentialRampTo(value, rampTime, startTime) : this.linearRampTo(value, rampTime, startTime), 
      this;
    }
    /**
       * Apply all of the previously scheduled events to the passed in Param or AudioParam.
       * The applied values will start at the context's current time and schedule
       * all of the events which are scheduled on this Param onto the passed in param.
       */    apply(param) {
      const now = this.context.currentTime;
      // set the param's value at the current time and schedule everything else
            param.setValueAtTime(this.getValueAtTime(now), now);
      // if the previous event was a curve, then set the rest of it
      const previousEvent = this._events.get(now);
      if (previousEvent && "setTargetAtTime" === previousEvent.type) {
        // approx it until the next event with linear ramps
        const nextEvent = this._events.getAfter(previousEvent.time);
        // or for 2 seconds if there is no event
                const endTime = nextEvent ? nextEvent.time : now + 2;
        const subdivisions = (endTime - now) / 10;
        for (let i = now; i < endTime; i += subdivisions) param.linearRampToValueAtTime(this.getValueAtTime(i), i);
      }
      return this._events.forEachAfter(this.context.currentTime, (event => {
        "cancelScheduledValues" === event.type ? param.cancelScheduledValues(event.time) : "setTargetAtTime" === event.type ? param.setTargetAtTime(event.value, event.time, event.constant) : param[event.type](event.value, event.time);
      })), this;
    }
    /**
       * Replace the Param's internal AudioParam. Will apply scheduled curves
       * onto the parameter and replace the connections.
       */    setParam(param) {
      assert(this._swappable, "The Param must be assigned as 'swappable' in the constructor");
      const input = this.input;
      return input.disconnect(this._param), this.apply(param), this._param = param, input.connect(this._param), 
      this;
    }
    dispose() {
      return super.dispose(), this._events.dispose(), this;
    }
    get defaultValue() {
      return this._toType(this._param.defaultValue);
    }
    //-------------------------------------
    // 	AUTOMATION CURVE CALCULATIONS
    // 	MIT License, copyright (c) 2014 Jordan Santell
    //-------------------------------------
    // Calculates the the value along the curve produced by setTargetAtTime
    _exponentialApproach(t0, v0, v1, timeConstant, t) {
      return v1 + (v0 - v1) * Math.exp(-(t - t0) / timeConstant);
    }
    // Calculates the the value along the curve produced by linearRampToValueAtTime
    _linearInterpolate(t0, v0, t1, v1, t) {
      return v0 + (t - t0) / (t1 - t0) * (v1 - v0);
    }
    // Calculates the the value along the curve produced by exponentialRampToValueAtTime
    _exponentialInterpolate(t0, v0, t1, v1, t) {
      return v0 * Math.pow(v1 / v0, (t - t0) / (t1 - t0));
    }
  }
  /**
   * ToneAudioNode is the base class for classes which process audio.
   * @category Core
   */  class ToneAudioNode extends ToneWithContext {
    constructor() {
      super(...arguments), 
      /**
           * List all of the node that must be set to match the ChannelProperties
           */
      this._internalChannels = [];
    }
    /**
       * The number of inputs feeding into the AudioNode.
       * For source nodes, this will be 0.
       * @example
       * const node = new Tone.Gain();
       * console.log(node.numberOfInputs);
       */    get numberOfInputs() {
      return isDefined(this.input) ? isAudioParam(this.input) || this.input instanceof Param ? 1 : this.input.numberOfInputs : 0;
    }
    /**
       * The number of outputs of the AudioNode.
       * @example
       * const node = new Tone.Gain();
       * console.log(node.numberOfOutputs);
       */    get numberOfOutputs() {
      return isDefined(this.output) ? this.output.numberOfOutputs : 0;
    }
    //-------------------------------------
    // AUDIO PROPERTIES
    //-------------------------------------
    /**
       * Used to decide which nodes to get/set properties on
       */
    _isAudioNode(node) {
      return isDefined(node) && (node instanceof ToneAudioNode || isAudioNode(node));
    }
    /**
       * Get all of the audio nodes (either internal or input/output) which together
       * make up how the class node responds to channel input/output
       */    _getInternalNodes() {
      const nodeList = this._internalChannels.slice(0);
      return this._isAudioNode(this.input) && nodeList.push(this.input), this._isAudioNode(this.output) && this.input !== this.output && nodeList.push(this.output), 
      nodeList;
    }
    /**
       * Set the audio options for this node such as channelInterpretation
       * channelCount, etc.
       * @param options
       */    _setChannelProperties(options) {
      this._getInternalNodes().forEach((node => {
        node.channelCount = options.channelCount, node.channelCountMode = options.channelCountMode, 
        node.channelInterpretation = options.channelInterpretation;
      }));
    }
    /**
       * Get the current audio options for this node such as channelInterpretation
       * channelCount, etc.
       */    _getChannelProperties() {
      const nodeList = this._getInternalNodes();
      assert(nodeList.length > 0, "ToneAudioNode does not have any internal nodes");
      // use the first node to get properties
      // they should all be the same
      const node = nodeList[0];
      return {
        channelCount: node.channelCount,
        channelCountMode: node.channelCountMode,
        channelInterpretation: node.channelInterpretation
      };
    }
    /**
       * channelCount is the number of channels used when up-mixing and down-mixing
       * connections to any inputs to the node. The default value is 2 except for
       * specific nodes where its value is specially determined.
       */    get channelCount() {
      return this._getChannelProperties().channelCount;
    }
    set channelCount(channelCount) {
      const props = this._getChannelProperties();
      // merge it with the other properties
            this._setChannelProperties(Object.assign(props, {
        channelCount: channelCount
      }));
    }
    /**
       * channelCountMode determines how channels will be counted when up-mixing and
       * down-mixing connections to any inputs to the node.
       * The default value is "max". This attribute has no effect for nodes with no inputs.
       * * "max" - computedNumberOfChannels is the maximum of the number of channels of all connections to an input. In this mode channelCount is ignored.
       * * "clamped-max" - computedNumberOfChannels is determined as for "max" and then clamped to a maximum value of the given channelCount.
       * * "explicit" - computedNumberOfChannels is the exact value as specified by the channelCount.
       */    get channelCountMode() {
      return this._getChannelProperties().channelCountMode;
    }
    set channelCountMode(channelCountMode) {
      const props = this._getChannelProperties();
      // merge it with the other properties
            this._setChannelProperties(Object.assign(props, {
        channelCountMode: channelCountMode
      }));
    }
    /**
       * channelInterpretation determines how individual channels will be treated
       * when up-mixing and down-mixing connections to any inputs to the node.
       * The default value is "speakers".
       */    get channelInterpretation() {
      return this._getChannelProperties().channelInterpretation;
    }
    set channelInterpretation(channelInterpretation) {
      const props = this._getChannelProperties();
      // merge it with the other properties
            this._setChannelProperties(Object.assign(props, {
        channelInterpretation: channelInterpretation
      }));
    }
    //-------------------------------------
    // CONNECTIONS
    //-------------------------------------
    /**
       * connect the output of a ToneAudioNode to an AudioParam, AudioNode, or ToneAudioNode
       * @param destination The output to connect to
       * @param outputNum The output to connect from
       * @param inputNum The input to connect to
       */
    connect(destination, outputNum = 0, inputNum = 0) {
      return connect(this, destination, outputNum, inputNum), this;
    }
    /**
       * Connect the output to the context's destination node.
       * @example
       * const osc = new Tone.Oscillator("C2").start();
       * osc.toDestination();
       */    toDestination() {
      return this.connect(this.context.destination), this;
    }
    /**
       * Connect the output to the context's destination node.
       * @see {@link toDestination}
       * @deprecated
       */    toMaster() {
      return warn("toMaster() has been renamed toDestination()"), this.toDestination();
    }
    /**
       * disconnect the output
       */    disconnect(destination, outputNum = 0, inputNum = 0) {
      return disconnect(this, destination, outputNum, inputNum), this;
    }
    /**
       * Connect the output of this node to the rest of the nodes in series.
       * @example
       * const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/handdrum-loop.mp3");
       * player.autostart = true;
       * const filter = new Tone.AutoFilter(4).start();
       * const distortion = new Tone.Distortion(0.5);
       * // connect the player to the filter, distortion and then to the master output
       * player.chain(filter, distortion, Tone.Destination);
       */    chain(...nodes) {
      return connectSeries(this, ...nodes), this;
    }
    /**
       * connect the output of this node to the rest of the nodes in parallel.
       * @example
       * const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/conga-rhythm.mp3");
       * player.autostart = true;
       * const pitchShift = new Tone.PitchShift(4).toDestination();
       * const filter = new Tone.Filter("G5").toDestination();
       * // connect a node to the pitch shift and filter in parallel
       * player.fan(pitchShift, filter);
       */    fan(...nodes) {
      return nodes.forEach((node => this.connect(node))), this;
    }
    /**
       * Dispose and disconnect
       */    dispose() {
      return super.dispose(), isDefined(this.input) && (this.input instanceof ToneAudioNode ? this.input.dispose() : isAudioNode(this.input) && this.input.disconnect()), 
      isDefined(this.output) && (this.output instanceof ToneAudioNode ? this.output.dispose() : isAudioNode(this.output) && this.output.disconnect()), 
      this._internalChannels = [], this;
    }
  }
  let Gain$1 = class Gain extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Gain.getDefaults(), arguments, [ "gain", "units" ]);
      super(options), this.name = "Gain", 
      /**
           * The wrapped GainNode.
           */
      this._gainNode = this.context.createGain(), 
      // input = output
      this.input = this._gainNode, this.output = this._gainNode, this.gain = new Param({
        context: this.context,
        convert: options.convert,
        param: this._gainNode.gain,
        units: options.units,
        value: options.gain,
        minValue: options.minValue,
        maxValue: options.maxValue
      }), readOnly(this, "gain");
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        convert: !0,
        gain: 1,
        units: "gain"
      });
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this._gainNode.disconnect(), this.gain.dispose(), this;
    }
  };
  /**
   * Base class for fire-and-forget nodes
   */  class OneShotSource extends ToneAudioNode {
    constructor(options) {
      super(options), 
      /**
           * The callback to invoke after the
           * source is done playing.
           */
      this.onended = noOp, 
      /**
           * The start time
           */
      this._startTime = -1, 
      /**
           * The stop time
           */
      this._stopTime = -1, 
      /**
           * The id of the timeout
           */
      this._timeout = -1, 
      /**
           * The public output node
           */
      this.output = new Gain$1({
        context: this.context,
        gain: 0
      }), 
      /**
           * The output gain node.
           */
      this._gainNode = this.output, 
      /**
           * Get the playback state at the given time
           */
      this.getStateAtTime = function(time) {
        const computedTime = this.toSeconds(time);
        return -1 !== this._startTime && computedTime >= this._startTime && (-1 === this._stopTime || computedTime <= this._stopTime) ? "started" : "stopped";
      }, this._fadeIn = options.fadeIn, this._fadeOut = options.fadeOut, this._curve = options.curve, 
      this.onended = options.onended;
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        curve: "linear",
        fadeIn: 0,
        fadeOut: 0,
        onended: noOp
      });
    }
    /**
       * Start the source at the given time
       * @param  time When to start the source
       */    _startGain(time, gain = 1) {
      assert(-1 === this._startTime, "Source cannot be started more than once");
      // apply a fade in envelope
      const fadeInTime = this.toSeconds(this._fadeIn);
      // record the start time
            return this._startTime = time + fadeInTime, this._startTime = Math.max(this._startTime, this.context.currentTime), 
      // schedule the envelope
      fadeInTime > 0 ? (this._gainNode.gain.setValueAtTime(0, time), "linear" === this._curve ? this._gainNode.gain.linearRampToValueAtTime(gain, time + fadeInTime) : this._gainNode.gain.exponentialApproachValueAtTime(gain, time, fadeInTime)) : this._gainNode.gain.setValueAtTime(gain, time), 
      this;
    }
    /**
       * Stop the source node at the given time.
       * @param time When to stop the source
       */    stop(time) {
      return this.log("stop", time), this._stopGain(this.toSeconds(time)), this;
    }
    /**
       * Stop the source at the given time
       * @param  time When to stop the source
       */    _stopGain(time) {
      assert(-1 !== this._startTime, "'start' must be called before 'stop'"), 
      // cancel the previous stop
      this.cancelStop();
      // the fadeOut time
      const fadeOutTime = this.toSeconds(this._fadeOut);
      // schedule the stop callback
            return this._stopTime = this.toSeconds(time) + fadeOutTime, this._stopTime = Math.max(this._stopTime, this.now()), 
      fadeOutTime > 0 ? 
      // start the fade out curve at the given time
      "linear" === this._curve ? this._gainNode.gain.linearRampTo(0, fadeOutTime, time) : this._gainNode.gain.targetRampTo(0, fadeOutTime, time) : (
      // stop any ongoing ramps, and set the value to 0
      this._gainNode.gain.cancelAndHoldAtTime(time), this._gainNode.gain.setValueAtTime(0, time)), 
      this.context.clearTimeout(this._timeout), this._timeout = this.context.setTimeout((() => {
        // allow additional time for the exponential curve to fully decay
        const additionalTail = "exponential" === this._curve ? 2 * fadeOutTime : 0;
        this._stopSource(this.now() + additionalTail), this._onended();
      }), this._stopTime - this.context.currentTime), this;
    }
    /**
       * Invoke the onended callback
       */    _onended() {
      if (this.onended !== noOp && (this.onended(this), 
      // overwrite onended to make sure it only is called once
      this.onended = noOp, !this.context.isOffline)) {
        const disposeCallback = () => this.dispose()
        // @ts-ignore
        ;
        void 0 !== window.requestIdleCallback ? 
        // @ts-ignore
        window.requestIdleCallback(disposeCallback) : setTimeout(disposeCallback, 1e3);
      }
    }
    /**
       * Get the playback state at the current time
       */    get state() {
      return this.getStateAtTime(this.now());
    }
    /**
       * Cancel a scheduled stop event
       */    cancelStop() {
      return this.log("cancelStop"), assert(-1 !== this._startTime, "Source is not started"), 
      // cancel the stop envelope
      this._gainNode.gain.cancelScheduledValues(this._startTime + this.sampleTime), this.context.clearTimeout(this._timeout), 
      this._stopTime = -1, this;
    }
    dispose() {
      return super.dispose(), this._gainNode.dispose(), this.onended = noOp, this;
    }
  }
  /**
   * Wrapper around the native fire-and-forget ConstantSource.
   * Adds the ability to reschedule the stop method.
   * @category Signal
   */  class ToneConstantSource extends OneShotSource {
    constructor() {
      const options = optionsFromArguments(ToneConstantSource.getDefaults(), arguments, [ "offset" ]);
      super(options), this.name = "ToneConstantSource", 
      /**
           * The signal generator
           */
      this._source = this.context.createConstantSource(), connect(this._source, this._gainNode), 
      this.offset = new Param({
        context: this.context,
        convert: options.convert,
        param: this._source.offset,
        units: options.units,
        value: options.offset,
        minValue: options.minValue,
        maxValue: options.maxValue
      });
    }
    static getDefaults() {
      return Object.assign(OneShotSource.getDefaults(), {
        convert: !0,
        offset: 1,
        units: "number"
      });
    }
    /**
       * Start the source node at the given time
       * @param  time When to start the source
       */    start(time) {
      const computedTime = this.toSeconds(time);
      return this.log("start", computedTime), this._startGain(computedTime), this._source.start(computedTime), 
      this;
    }
    _stopSource(time) {
      this._source.stop(time);
    }
    dispose() {
      return super.dispose(), "started" === this.state && this.stop(), this._source.disconnect(), 
      this.offset.dispose(), this;
    }
  }
  /**
   * A signal is an audio-rate value. Tone.Signal is a core component of the library.
   * Unlike a number, Signals can be scheduled with sample-level accuracy. Tone.Signal
   * has all of the methods available to native Web Audio
   * [AudioParam](http://webaudio.github.io/web-audio-api/#the-audioparam-interface)
   * as well as additional conveniences. Read more about working with signals
   * [here](https://github.com/Tonejs/Tone.js/wiki/Signals).
   *
   * @example
   * const osc = new Tone.Oscillator().toDestination().start();
   * // a scheduleable signal which can be connected to control an AudioParam or another Signal
   * const signal = new Tone.Signal({
   * 	value: "C4",
   * 	units: "frequency"
   * }).connect(osc.frequency);
   * // the scheduled ramp controls the connected signal
   * signal.rampTo("C2", 4, "+0.5");
   * @category Signal
   */  class Signal extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Signal.getDefaults(), arguments, [ "value", "units" ]);
      super(options), this.name = "Signal", 
      /**
           * Indicates if the value should be overridden on connection.
           */
      this.override = !0, this.output = this._constantSource = new ToneConstantSource({
        context: this.context,
        convert: options.convert,
        offset: options.value,
        units: options.units,
        minValue: options.minValue,
        maxValue: options.maxValue
      }), this._constantSource.start(0), this.input = this._param = this._constantSource.offset;
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        convert: !0,
        units: "number",
        value: 0
      });
    }
    connect(destination, outputNum = 0, inputNum = 0) {
      // start it only when connected to something
      return connectSignal(this, destination, outputNum, inputNum), this;
    }
    dispose() {
      return super.dispose(), this._param.dispose(), this._constantSource.dispose(), this;
    }
    //-------------------------------------
    // ABSTRACT PARAM INTERFACE
    // just a proxy for the ConstantSourceNode's offset AudioParam
    // all docs are generated from AbstractParam.ts
    //-------------------------------------
    setValueAtTime(value, time) {
      return this._param.setValueAtTime(value, time), this;
    }
    getValueAtTime(time) {
      return this._param.getValueAtTime(time);
    }
    setRampPoint(time) {
      return this._param.setRampPoint(time), this;
    }
    linearRampToValueAtTime(value, time) {
      return this._param.linearRampToValueAtTime(value, time), this;
    }
    exponentialRampToValueAtTime(value, time) {
      return this._param.exponentialRampToValueAtTime(value, time), this;
    }
    exponentialRampTo(value, rampTime, startTime) {
      return this._param.exponentialRampTo(value, rampTime, startTime), this;
    }
    linearRampTo(value, rampTime, startTime) {
      return this._param.linearRampTo(value, rampTime, startTime), this;
    }
    targetRampTo(value, rampTime, startTime) {
      return this._param.targetRampTo(value, rampTime, startTime), this;
    }
    exponentialApproachValueAtTime(value, time, rampTime) {
      return this._param.exponentialApproachValueAtTime(value, time, rampTime), this;
    }
    setTargetAtTime(value, startTime, timeConstant) {
      return this._param.setTargetAtTime(value, startTime, timeConstant), this;
    }
    setValueCurveAtTime(values, startTime, duration, scaling) {
      return this._param.setValueCurveAtTime(values, startTime, duration, scaling), this;
    }
    cancelScheduledValues(time) {
      return this._param.cancelScheduledValues(time), this;
    }
    cancelAndHoldAtTime(time) {
      return this._param.cancelAndHoldAtTime(time), this;
    }
    rampTo(value, rampTime, startTime) {
      return this._param.rampTo(value, rampTime, startTime), this;
    }
    get value() {
      return this._param.value;
    }
    set value(value) {
      this._param.value = value;
    }
    get convert() {
      return this._param.convert;
    }
    set convert(convert) {
      this._param.convert = convert;
    }
    get units() {
      return this._param.units;
    }
    get overridden() {
      return this._param.overridden;
    }
    set overridden(overridden) {
      this._param.overridden = overridden;
    }
    get maxValue() {
      return this._param.maxValue;
    }
    get minValue() {
      return this._param.minValue;
    }
    /**
       * @see {@link Param.apply}.
       */    apply(param) {
      return this._param.apply(param), this;
    }
  }
  class Volume extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Volume.getDefaults(), arguments, [ "volume" ]);
      super(options), this.name = "Volume", this.input = this.output = new Gain$1({
        context: this.context,
        gain: options.volume,
        units: "decibels"
      }), this.volume = this.output.gain, readOnly(this, "volume"), this._unmutedVolume = options.volume, 
      // set the mute initially
      this.mute = options.mute;
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        mute: !1,
        volume: 0
      });
    }
    /**
       * Mute the output.
       * @example
       * const vol = new Tone.Volume(-12).toDestination();
       * const osc = new Tone.Oscillator().connect(vol).start();
       * // mute the output
       * vol.mute = true;
       */    get mute() {
      return this.volume.value === -1 / 0;
    }
    set mute(mute) {
      !this.mute && mute ? (this._unmutedVolume = this.volume.value, 
      // maybe it should ramp here?
      this.volume.value = -1 / 0) : this.mute && !mute && (this.volume.value = this._unmutedVolume);
    }
    /**
       * clean up
       */    dispose() {
      return super.dispose(), this.input.dispose(), this.volume.dispose(), this;
    }
  }
  /**
   * A single master output which is connected to the
   * AudioDestinationNode (aka your speakers).
   * It provides useful conveniences such as the ability
   * to set the volume and mute the entire application.
   * It also gives you the ability to apply master effects to your application.
   *
   * @example
   * const oscillator = new Tone.Oscillator().start();
   * // the audio will go from the oscillator to the speakers
   * oscillator.connect(Tone.getDestination());
   * // a convenience for connecting to the master output is also provided:
   * oscillator.toDestination();
   * @category Core
   */  class DestinationClass extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(DestinationClass.getDefaults(), arguments);
      super(options), this.name = "Destination", this.input = new Volume({
        context: this.context
      }), this.output = new Gain$1({
        context: this.context
      }), 
      /**
           * The volume of the master output in decibels. -Infinity is silent, and 0 is no change.
           * @example
           * const osc = new Tone.Oscillator().toDestination();
           * osc.start();
           * // ramp the volume down to silent over 10 seconds
           * Tone.getDestination().volume.rampTo(-Infinity, 10);
           */
      this.volume = this.input.volume, connectSeries(this.input, this.output, this.context.rawContext.destination), 
      this.mute = options.mute, this._internalChannels = [ this.input, this.context.rawContext.destination, this.output ];
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        mute: !1,
        volume: 0
      });
    }
    /**
       * Mute the output.
       * @example
       * const oscillator = new Tone.Oscillator().start().toDestination();
       * setTimeout(() => {
       * 	// mute the output
       * 	Tone.Destination.mute = true;
       * }, 1000);
       */    get mute() {
      return this.input.mute;
    }
    set mute(mute) {
      this.input.mute = mute;
    }
    /**
       * Add a master effects chain. NOTE: this will disconnect any nodes which were previously
       * chained in the master effects chain.
       * @param args All arguments will be connected in a row and the Master will be routed through it.
       * @example
       * // route all audio through a filter and compressor
       * const lowpass = new Tone.Filter(800, "lowpass");
       * const compressor = new Tone.Compressor(-18);
       * Tone.Destination.chain(lowpass, compressor);
       */    chain(...args) {
      return this.input.disconnect(), args.unshift(this.input), args.push(this.output), 
      connectSeries(...args), this;
    }
    /**
       * The maximum number of channels the system can output
       * @example
       * console.log(Tone.Destination.maxChannelCount);
       */    get maxChannelCount() {
      return this.context.rawContext.destination.maxChannelCount;
    }
    /**
       * Clean up
       */    dispose() {
      return super.dispose(), this.volume.dispose(), this;
    }
  }
  //-------------------------------------
  // 	INITIALIZATION
  //-------------------------------------
    onContextInit((context => {
    context.destination = new DestinationClass({
      context: context
    });
  })), onContextClose((context => {
    context.destination.dispose();
  }));
  /**
   * Represents a single value which is gettable and settable in a timed way
   */
  class TimelineValue extends Tone$1 {
    /**
       * @param initialValue The value to return if there is no scheduled values
       */
    constructor(initialValue) {
      super(), this.name = "TimelineValue", 
      /**
           * The timeline which stores the values
           */
      this._timeline = new Timeline({
        memory: 10
      }), this._initialValue = initialValue;
    }
    /**
       * Set the value at the given time
       */    set(value, time) {
      return this._timeline.add({
        value: value,
        time: time
      }), this;
    }
    /**
       * Get the value at the given time
       */    get(time) {
      const event = this._timeline.get(time);
      return event ? event.value : this._initialValue;
    }
  }
  /**
   * A signal operator has an input and output and modifies the signal.
   */  class SignalOperator extends ToneAudioNode {
    constructor() {
      super(optionsFromArguments(SignalOperator.getDefaults(), arguments, [ "context" ]));
    }
    connect(destination, outputNum = 0, inputNum = 0) {
      return connectSignal(this, destination, outputNum, inputNum), this;
    }
  }
  /**
   * Wraps the native Web Audio API
   * [WaveShaperNode](http://webaudio.github.io/web-audio-api/#the-waveshapernode-interface).
   *
   * @example
   * const osc = new Tone.Oscillator().toDestination().start();
   * // multiply the output of the signal by 2 using the waveshaper's function
   * const timesTwo = new Tone.WaveShaper((val) => val * 2, 2048).connect(osc.frequency);
   * const signal = new Tone.Signal(440).connect(timesTwo);
   * @category Signal
   */  class WaveShaper extends SignalOperator {
    constructor() {
      const options = optionsFromArguments(WaveShaper.getDefaults(), arguments, [ "mapping", "length" ]);
      super(options), this.name = "WaveShaper", 
      /**
           * the waveshaper node
           */
      this._shaper = this.context.createWaveShaper(), 
      /**
           * The input to the waveshaper node.
           */
      this.input = this._shaper, 
      /**
           * The output from the waveshaper node
           */
      this.output = this._shaper, isArray(options.mapping) || options.mapping instanceof Float32Array ? this.curve = Float32Array.from(options.mapping) : "function" == typeof options.mapping && this.setMap(options.mapping, options.length);
    }
    static getDefaults() {
      return Object.assign(Signal.getDefaults(), {
        length: 1024
      });
    }
    /**
       * Uses a mapping function to set the value of the curve.
       * @param mapping The function used to define the values.
       *                The mapping function take two arguments:
       *                the first is the value at the current position
       *                which goes from -1 to 1 over the number of elements
       *                in the curve array. The second argument is the array position.
       * @example
       * const shaper = new Tone.WaveShaper();
       * // map the input signal from [-1, 1] to [0, 10]
       * shaper.setMap((val, index) => (val + 1) * 5);
       */    setMap(mapping, length = 1024) {
      const array = new Float32Array(length);
      for (let i = 0, len = length; i < len; i++) {
        const normalized = i / (len - 1) * 2 - 1;
        array[i] = mapping(normalized, i);
      }
      return this.curve = array, this;
    }
    /**
       * The array to set as the waveshaper curve. For linear curves
       * array length does not make much difference, but for complex curves
       * longer arrays will provide smoother interpolation.
       */    get curve() {
      return this._shaper.curve;
    }
    set curve(mapping) {
      this._shaper.curve = mapping;
    }
    /**
       * Specifies what type of oversampling (if any) should be used when
       * applying the shaping curve. Can either be "none", "2x" or "4x".
       */    get oversample() {
      return this._shaper.oversample;
    }
    set oversample(oversampling) {
      assert([ "none", "2x", "4x" ].some((str => str.includes(oversampling))), "oversampling must be either 'none', '2x', or '4x'"), 
      this._shaper.oversample = oversampling;
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this._shaper.disconnect(), this;
    }
  }
  /**
   * Pow applies an exponent to the incoming signal. The incoming signal must be AudioRange [-1, 1]
   *
   * @example
   * const pow = new Tone.Pow(2);
   * const sig = new Tone.Signal(0.5).connect(pow);
   * // output of pow is 0.25.
   * @category Signal
   */  class Pow extends SignalOperator {
    constructor() {
      const options = optionsFromArguments(Pow.getDefaults(), arguments, [ "value" ]);
      super(options), this.name = "Pow", this._exponentScaler = this.input = this.output = new WaveShaper({
        context: this.context,
        mapping: this._expFunc(options.value),
        length: 8192
      }), this._exponent = options.value;
    }
    static getDefaults() {
      return Object.assign(SignalOperator.getDefaults(), {
        value: 1
      });
    }
    /**
       * the function which maps the waveshaper
       * @param exponent exponent value
       */    _expFunc(exponent) {
      return val => Math.pow(Math.abs(val), exponent);
    }
    /**
       * The value of the exponent.
       */    get value() {
      return this._exponent;
    }
    set value(exponent) {
      this._exponent = exponent, this._exponentScaler.setMap(this._expFunc(this._exponent));
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this._exponentScaler.dispose(), this;
    }
  }
  /**
   * Ticks is a primitive type for encoding Time values.
   * Ticks can be constructed with or without the `new` keyword. Ticks can be passed
   * into the parameter of any method which takes time as an argument.
   * @example
   * const t = Tone.Ticks("4n"); // a quarter note as ticks
   * @category Unit
   */  class TicksClass extends TransportTimeClass {
    constructor() {
      super(...arguments), this.name = "Ticks", this.defaultUnits = "i";
    }
    /**
       * Get the current time in the given units
       */    _now() {
      return this.context.transport.ticks;
    }
    /**
       * Return the value of the beats in the current units
       */    _beatsToUnits(beats) {
      return this._getPPQ() * beats;
    }
    /**
       * Returns the value of a second in the current units
       */    _secondsToUnits(seconds) {
      return Math.floor(seconds / (60 / this._getBpm()) * this._getPPQ());
    }
    /**
       * Returns the value of a tick in the current time units
       */    _ticksToUnits(ticks) {
      return ticks;
    }
    /**
       * Return the time in ticks
       */    toTicks() {
      return this.valueOf();
    }
    /**
       * Return the time in seconds
       */    toSeconds() {
      return this.valueOf() / this._getPPQ() * (60 / this._getBpm());
    }
  }
  /**
   * Similar to Tone.Timeline, but all events represent
   * intervals with both "time" and "duration" times. The
   * events are placed in a tree structure optimized
   * for querying an intersection point with the timeline
   * events. Internally uses an [Interval Tree](https://en.wikipedia.org/wiki/Interval_tree)
   * to represent the data.
   * @internal
   */  class IntervalTimeline extends Tone$1 {
    constructor() {
      super(...arguments), this.name = "IntervalTimeline", 
      /**
           * The root node of the inteval tree
           */
      this._root = null, 
      /**
           * Keep track of the length of the timeline.
           */
      this._length = 0;
    }
    /**
       * The event to add to the timeline. All events must
       * have a time and duration value
       * @param  event  The event to add to the timeline
       */    add(event) {
      assert(isDefined(event.time), "Events must have a time property"), assert(isDefined(event.duration), "Events must have a duration parameter"), 
      event.time = event.time.valueOf();
      let node = new IntervalNode(event.time, event.time + event.duration, event);
      // Restructure tree to be balanced
      for (null === this._root ? this._root = node : this._root.insert(node), this._length++; null !== node; ) node.updateHeight(), 
      node.updateMax(), this._rebalance(node), node = node.parent;
      return this;
    }
    /**
       * Remove an event from the timeline.
       * @param  event  The event to remove from the timeline
       */    remove(event) {
      if (null !== this._root) {
        const results = [];
        this._root.search(event.time, results);
        for (const node of results) if (node.event === event) {
          this._removeNode(node), this._length--;
          break;
        }
      }
      return this;
    }
    /**
       * The number of items in the timeline.
       * @readOnly
       */    get length() {
      return this._length;
    }
    /**
       * Remove events whose time time is after the given time
       * @param  after  The time to query.
       */    cancel(after) {
      return this.forEachFrom(after, (event => this.remove(event))), this;
    }
    /**
       * Set the root node as the given node
       */    _setRoot(node) {
      this._root = node, null !== this._root && (this._root.parent = null);
    }
    /**
       * Replace the references to the node in the node's parent
       * with the replacement node.
       */    _replaceNodeInParent(node, replacement) {
      null !== node.parent ? (node.isLeftChild() ? node.parent.left = replacement : node.parent.right = replacement, 
      this._rebalance(node.parent)) : this._setRoot(replacement);
    }
    /**
       * Remove the node from the tree and replace it with
       * a successor which follows the schema.
       */    _removeNode(node) {
      if (null === node.left && null === node.right) this._replaceNodeInParent(node, null); else if (null === node.right) this._replaceNodeInParent(node, node.left); else if (null === node.left) this._replaceNodeInParent(node, node.right); else {
        let replacement;
        let temp = null;
        if (node.getBalance() > 0) if (null === node.left.right) replacement = node.left, 
        replacement.right = node.right, temp = replacement; else {
          for (replacement = node.left.right; null !== replacement.right; ) replacement = replacement.right;
          replacement.parent && (replacement.parent.right = replacement.left, temp = replacement.parent, 
          replacement.left = node.left, replacement.right = node.right);
        } else if (null === node.right.left) replacement = node.right, replacement.left = node.left, 
        temp = replacement; else {
          for (replacement = node.right.left; null !== replacement.left; ) replacement = replacement.left;
          replacement.parent && (replacement.parent.left = replacement.right, temp = replacement.parent, 
          replacement.left = node.left, replacement.right = node.right);
        }
        null !== node.parent ? node.isLeftChild() ? node.parent.left = replacement : node.parent.right = replacement : this._setRoot(replacement), 
        temp && this._rebalance(temp);
      }
      node.dispose();
    }
    /**
       * Rotate the tree to the left
       */    _rotateLeft(node) {
      const parent = node.parent;
      const isLeftChild = node.isLeftChild();
      // Make node.right the new root of this sub tree (instead of node)
            const pivotNode = node.right;
      pivotNode && (node.right = pivotNode.left, pivotNode.left = node), null !== parent ? isLeftChild ? parent.left = pivotNode : parent.right = pivotNode : this._setRoot(pivotNode);
    }
    /**
       * Rotate the tree to the right
       */    _rotateRight(node) {
      const parent = node.parent;
      const isLeftChild = node.isLeftChild();
      // Make node.left the new root of this sub tree (instead of node)
            const pivotNode = node.left;
      pivotNode && (node.left = pivotNode.right, pivotNode.right = node), null !== parent ? isLeftChild ? parent.left = pivotNode : parent.right = pivotNode : this._setRoot(pivotNode);
    }
    /**
       * Balance the BST
       */    _rebalance(node) {
      const balance = node.getBalance();
      balance > 1 && node.left ? node.left.getBalance() < 0 ? this._rotateLeft(node.left) : this._rotateRight(node) : balance < -1 && node.right && (node.right.getBalance() > 0 ? this._rotateRight(node.right) : this._rotateLeft(node));
    }
    /**
       * Get an event whose time and duration span the give time. Will
       * return the match whose "time" value is closest to the given time.
       * @return  The event which spans the desired time
       */    get(time) {
      if (null !== this._root) {
        const results = [];
        if (this._root.search(time, results), results.length > 0) {
          let max = results[0];
          for (let i = 1; i < results.length; i++) results[i].low > max.low && (max = results[i]);
          return max.event;
        }
      }
      return null;
    }
    /**
       * Iterate over everything in the timeline.
       * @param  callback The callback to invoke with every item
       */    forEach(callback) {
      if (null !== this._root) {
        const allNodes = [];
        this._root.traverse((node => allNodes.push(node))), allNodes.forEach((node => {
          node.event && callback(node.event);
        }));
      }
      return this;
    }
    /**
       * Iterate over everything in the array in which the given time
       * overlaps with the time and duration time of the event.
       * @param  time The time to check if items are overlapping
       * @param  callback The callback to invoke with every item
       */    forEachAtTime(time, callback) {
      if (null !== this._root) {
        const results = [];
        this._root.search(time, results), results.forEach((node => {
          node.event && callback(node.event);
        }));
      }
      return this;
    }
    /**
       * Iterate over everything in the array in which the time is greater
       * than or equal to the given time.
       * @param  time The time to check if items are before
       * @param  callback The callback to invoke with every item
       */    forEachFrom(time, callback) {
      if (null !== this._root) {
        const results = [];
        this._root.searchAfter(time, results), results.forEach((node => {
          node.event && callback(node.event);
        }));
      }
      return this;
    }
    /**
       * Clean up
       */    dispose() {
      return super.dispose(), null !== this._root && this._root.traverse((node => node.dispose())), 
      this._root = null, this;
    }
  }
  //-------------------------------------
  // 	INTERVAL NODE HELPER
  //-------------------------------------
  /**
   * Represents a node in the binary search tree, with the addition
   * of a "high" value which keeps track of the highest value of
   * its children.
   * References:
   * https://brooknovak.wordpress.com/2013/12/07/augmented-interval-tree-in-c/
   * http://www.mif.vu.lt/~valdas/ALGORITMAI/LITERATURA/Cormen/Cormen.pdf
   * @param low
   * @param high
   */  class IntervalNode {
    constructor(low, high, event) {
      // the nodes to the left
      this._left = null, 
      // the nodes to the right
      this._right = null, 
      // the parent node
      this.parent = null, 
      // the number of child nodes
      this.height = 0, this.event = event, 
      // the low value
      this.low = low, 
      // the high value
      this.high = high, 
      // the high value for this and all child nodes
      this.max = this.high;
    }
    /**
       * Insert a node into the correct spot in the tree
       */    insert(node) {
      node.low <= this.low ? null === this.left ? this.left = node : this.left.insert(node) : null === this.right ? this.right = node : this.right.insert(node);
    }
    /**
       * Search the tree for nodes which overlap
       * with the given point
       * @param  point  The point to query
       * @param  results  The array to put the results
       */    search(point, results) {
      // If p is to the right of the rightmost point of any interval
      // in this node and all children, there won't be any matches.
      point > this.max || (
      // Search left children
      null !== this.left && this.left.search(point, results), 
      // Check this node
      this.low <= point && this.high > point && results.push(this), 
      // If p is to the left of the time of this interval,
      // then it can't be in any child to the right.
      this.low > point || 
      // Search right children
      null !== this.right && this.right.search(point, results));
    }
    /**
       * Search the tree for nodes which are less
       * than the given point
       * @param  point  The point to query
       * @param  results  The array to put the results
       */    searchAfter(point, results) {
      // Check this node
      this.low >= point && (results.push(this), null !== this.left && this.left.searchAfter(point, results)), 
      // search the right side
      null !== this.right && this.right.searchAfter(point, results);
    }
    /**
       * Invoke the callback on this element and both it's branches
       * @param  {Function}  callback
       */    traverse(callback) {
      callback(this), null !== this.left && this.left.traverse(callback), null !== this.right && this.right.traverse(callback);
    }
    /**
       * Update the height of the node
       */    updateHeight() {
      null !== this.left && null !== this.right ? this.height = Math.max(this.left.height, this.right.height) + 1 : null !== this.right ? this.height = this.right.height + 1 : null !== this.left ? this.height = this.left.height + 1 : this.height = 0;
    }
    /**
       * Update the height of the node
       */    updateMax() {
      this.max = this.high, null !== this.left && (this.max = Math.max(this.max, this.left.max)), 
      null !== this.right && (this.max = Math.max(this.max, this.right.max));
    }
    /**
       * The balance is how the leafs are distributed on the node
       * @return  Negative numbers are balanced to the right
       */    getBalance() {
      let balance = 0;
      return null !== this.left && null !== this.right ? balance = this.left.height - this.right.height : null !== this.left ? balance = this.left.height + 1 : null !== this.right && (balance = -(this.right.height + 1)), 
      balance;
    }
    /**
       * @returns true if this node is the left child of its parent
       */    isLeftChild() {
      return null !== this.parent && this.parent.left === this;
    }
    /**
       * get/set the left node
       */    get left() {
      return this._left;
    }
    set left(node) {
      this._left = node, null !== node && (node.parent = this), this.updateHeight(), this.updateMax();
    }
    /**
       * get/set the right node
       */    get right() {
      return this._right;
    }
    set right(node) {
      this._right = node, null !== node && (node.parent = this), this.updateHeight(), 
      this.updateMax();
    }
    /**
       * null out references.
       */    dispose() {
      this.parent = null, this._left = null, this._right = null, this.event = null;
    }
  }
  /**
   * A Timeline State. Provides the methods: `setStateAtTime("state", time)` and `getValueAtTime(time)`
   * @param initial The initial state of the StateTimeline.  Defaults to `undefined`
   * @internal
   */  class StateTimeline extends Timeline {
    constructor(initial = "stopped") {
      super(), this.name = "StateTimeline", this._initial = initial, this.setStateAtTime(this._initial, 0);
    }
    /**
       * Returns the scheduled state scheduled before or at
       * the given time.
       * @param  time  The time to query.
       * @return  The name of the state input in setStateAtTime.
       */    getValueAtTime(time) {
      const event = this.get(time);
      return null !== event ? event.state : this._initial;
    }
    /**
       * Add a state to the timeline.
       * @param  state The name of the state to set.
       * @param  time  The time to query.
       * @param options Any additional options that are needed in the timeline.
       */    setStateAtTime(state, time, options) {
      return assertRange(time, 0), this.add(Object.assign({}, options, {
        state: state,
        time: time
      })), this;
    }
    /**
       * Return the event before the time with the given state
       * @param  state The state to look for
       * @param  time  When to check before
       * @return  The event with the given state before the time
       */    getLastState(state, time) {
      for (let i = this._search(time); i >= 0; i--) {
        const event = this._timeline[i];
        if (event.state === state) return event;
      }
    }
    /**
       * Return the event after the time with the given state
       * @param  state The state to look for
       * @param  time  When to check from
       * @return  The event with the given state after the time
       */    getNextState(state, time) {
      // time = this.toSeconds(time);
      const index = this._search(time);
      if (-1 !== index) for (let i = index; i < this._timeline.length; i++) {
        const event = this._timeline[i];
        if (event.state === state) return event;
      }
    }
  }
  /**
   * A Param class just for computing ticks. Similar to the {@link Param} class,
   * but offers conversion to BPM values as well as ability to compute tick
   * duration and elapsed ticks
   */  class TickParam extends Param {
    constructor() {
      const options = optionsFromArguments(TickParam.getDefaults(), arguments, [ "value" ]);
      super(options), this.name = "TickParam", 
      /**
           * The timeline which tracks all of the automations.
           */
      this._events = new Timeline(1 / 0), 
      /**
           * The internal holder for the multiplier value
           */
      this._multiplier = 1, 
      // set the multiplier
      this._multiplier = options.multiplier, 
      // clear the ticks from the beginning
      this._events.cancel(0), 
      // set an initial event
      this._events.add({
        ticks: 0,
        time: 0,
        type: "setValueAtTime",
        value: this._fromType(options.value)
      }), this.setValueAtTime(options.value, 0);
    }
    static getDefaults() {
      return Object.assign(Param.getDefaults(), {
        multiplier: 1,
        units: "hertz",
        value: 1
      });
    }
    setTargetAtTime(value, time, constant) {
      // approximate it with multiple linear ramps
      time = this.toSeconds(time), this.setRampPoint(time);
      const computedValue = this._fromType(value);
      // start from previously scheduled value
            const prevEvent = this._events.get(time);
      const segments = Math.round(Math.max(1 / constant, 1));
      for (let i = 0; i <= segments; i++) {
        const segTime = constant * i + time;
        const rampVal = this._exponentialApproach(prevEvent.time, prevEvent.value, computedValue, constant, segTime);
        this.linearRampToValueAtTime(this._toType(rampVal), segTime);
      }
      return this;
    }
    setValueAtTime(value, time) {
      const computedTime = this.toSeconds(time);
      super.setValueAtTime(value, time);
      const event = this._events.get(computedTime);
      const previousEvent = this._events.previousEvent(event);
      const ticksUntilTime = this._getTicksUntilEvent(previousEvent, computedTime);
      return event.ticks = Math.max(ticksUntilTime, 0), this;
    }
    linearRampToValueAtTime(value, time) {
      const computedTime = this.toSeconds(time);
      super.linearRampToValueAtTime(value, time);
      const event = this._events.get(computedTime);
      const previousEvent = this._events.previousEvent(event);
      const ticksUntilTime = this._getTicksUntilEvent(previousEvent, computedTime);
      return event.ticks = Math.max(ticksUntilTime, 0), this;
    }
    exponentialRampToValueAtTime(value, time) {
      // aproximate it with multiple linear ramps
      time = this.toSeconds(time);
      const computedVal = this._fromType(value);
      // start from previously scheduled value
            const prevEvent = this._events.get(time);
      // approx 10 segments per second
            const segments = Math.round(Math.max(10 * (time - prevEvent.time), 1));
      const segmentDur = (time - prevEvent.time) / segments;
      for (let i = 0; i <= segments; i++) {
        const segTime = segmentDur * i + prevEvent.time;
        const rampVal = this._exponentialInterpolate(prevEvent.time, prevEvent.value, time, computedVal, segTime);
        this.linearRampToValueAtTime(this._toType(rampVal), segTime);
      }
      return this;
    }
    /**
       * Returns the tick value at the time. Takes into account
       * any automation curves scheduled on the signal.
       * @param  event The time to get the tick count at
       * @return The number of ticks which have elapsed at the time given any automations.
       */    _getTicksUntilEvent(event, time) {
      if (null === event) event = {
        ticks: 0,
        time: 0,
        type: "setValueAtTime",
        value: 0
      }; else if (isUndef(event.ticks)) {
        const previousEvent = this._events.previousEvent(event);
        event.ticks = this._getTicksUntilEvent(previousEvent, event.time);
      }
      const val0 = this._fromType(this.getValueAtTime(event.time));
      let val1 = this._fromType(this.getValueAtTime(time));
      // if it's right on the line, take the previous value
            const onTheLineEvent = this._events.get(time);
      return onTheLineEvent && onTheLineEvent.time === time && "setValueAtTime" === onTheLineEvent.type && (val1 = this._fromType(this.getValueAtTime(time - this.sampleTime))), 
      .5 * (time - event.time) * (val0 + val1) + event.ticks;
    }
    /**
       * Returns the tick value at the time. Takes into account
       * any automation curves scheduled on the signal.
       * @param  time The time to get the tick count at
       * @return The number of ticks which have elapsed at the time given any automations.
       */    getTicksAtTime(time) {
      const computedTime = this.toSeconds(time);
      const event = this._events.get(computedTime);
      return Math.max(this._getTicksUntilEvent(event, computedTime), 0);
    }
    /**
       * Return the elapsed time of the number of ticks from the given time
       * @param ticks The number of ticks to calculate
       * @param  time The time to get the next tick from
       * @return The duration of the number of ticks from the given time in seconds
       */    getDurationOfTicks(ticks, time) {
      const computedTime = this.toSeconds(time);
      const currentTick = this.getTicksAtTime(time);
      return this.getTimeOfTick(currentTick + ticks) - computedTime;
    }
    /**
       * Given a tick, returns the time that tick occurs at.
       * @return The time that the tick occurs.
       */    getTimeOfTick(tick) {
      const before = this._events.get(tick, "ticks");
      const after = this._events.getAfter(tick, "ticks");
      if (before && before.ticks === tick) return before.time;
      if (before && after && "linearRampToValueAtTime" === after.type && before.value !== after.value) {
        const val0 = this._fromType(this.getValueAtTime(before.time));
        const delta = (this._fromType(this.getValueAtTime(after.time)) - val0) / (after.time - before.time);
        const k = Math.sqrt(Math.pow(val0, 2) - 2 * delta * (before.ticks - tick));
        const sol1 = (-val0 + k) / delta;
        return (sol1 > 0 ? sol1 : (-val0 - k) / delta) + before.time;
      }
      return before ? 0 === before.value ? 1 / 0 : before.time + (tick - before.ticks) / before.value : tick / this._initialValue;
    }
    /**
       * Convert some number of ticks their the duration in seconds accounting
       * for any automation curves starting at the given time.
       * @param  ticks The number of ticks to convert to seconds.
       * @param  when  When along the automation timeline to convert the ticks.
       * @return The duration in seconds of the ticks.
       */    ticksToTime(ticks, when) {
      return this.getDurationOfTicks(ticks, when);
    }
    /**
       * The inverse of {@link ticksToTime}. Convert a duration in
       * seconds to the corresponding number of ticks accounting for any
       * automation curves starting at the given time.
       * @param  duration The time interval to convert to ticks.
       * @param  when When along the automation timeline to convert the ticks.
       * @return The duration in ticks.
       */    timeToTicks(duration, when) {
      const computedTime = this.toSeconds(when);
      const computedDuration = this.toSeconds(duration);
      const startTicks = this.getTicksAtTime(computedTime);
      return this.getTicksAtTime(computedTime + computedDuration) - startTicks;
    }
    /**
       * Convert from the type when the unit value is BPM
       */    _fromType(val) {
      return "bpm" === this.units && this.multiplier ? 1 / (60 / val / this.multiplier) : super._fromType(val);
    }
    /**
       * Special case of type conversion where the units === "bpm"
       */    _toType(val) {
      return "bpm" === this.units && this.multiplier ? val / this.multiplier * 60 : super._toType(val);
    }
    /**
       * A multiplier on the bpm value. Useful for setting a PPQ relative to the base frequency value.
       */    get multiplier() {
      return this._multiplier;
    }
    set multiplier(m) {
      // get and reset the current value with the new multiplier
      // might be necessary to clear all the previous values
      const currentVal = this.value;
      this._multiplier = m, this.cancelScheduledValues(0), this.setValueAtTime(currentVal, 0);
    }
  }
  /**
   * TickSignal extends Tone.Signal, but adds the capability
   * to calculate the number of elapsed ticks. exponential and target curves
   * are approximated with multiple linear ramps.
   *
   * Thank you Bruno Dias, H. Sofia Pinto, and David M. Matos,
   * for your [WAC paper](https://smartech.gatech.edu/bitstream/handle/1853/54588/WAC2016-49.pdf)
   * describing integrating timing functions for tempo calculations.
   */  class TickSignal extends Signal {
    constructor() {
      const options = optionsFromArguments(TickSignal.getDefaults(), arguments, [ "value" ]);
      super(options), this.name = "TickSignal", this.input = this._param = new TickParam({
        context: this.context,
        convert: options.convert,
        multiplier: options.multiplier,
        param: this._constantSource.offset,
        units: options.units,
        value: options.value
      });
    }
    static getDefaults() {
      return Object.assign(Signal.getDefaults(), {
        multiplier: 1,
        units: "hertz",
        value: 1
      });
    }
    ticksToTime(ticks, when) {
      return this._param.ticksToTime(ticks, when);
    }
    timeToTicks(duration, when) {
      return this._param.timeToTicks(duration, when);
    }
    getTimeOfTick(tick) {
      return this._param.getTimeOfTick(tick);
    }
    getDurationOfTicks(ticks, time) {
      return this._param.getDurationOfTicks(ticks, time);
    }
    getTicksAtTime(time) {
      return this._param.getTicksAtTime(time);
    }
    /**
       * A multiplier on the bpm value. Useful for setting a PPQ relative to the base frequency value.
       */    get multiplier() {
      return this._param.multiplier;
    }
    set multiplier(m) {
      this._param.multiplier = m;
    }
    dispose() {
      return super.dispose(), this._param.dispose(), this;
    }
  }
  /**
   * Uses [TickSignal](TickSignal) to track elapsed ticks with complex automation curves.
   */  class TickSource extends ToneWithContext {
    constructor() {
      const options = optionsFromArguments(TickSource.getDefaults(), arguments, [ "frequency" ]);
      super(options), this.name = "TickSource", 
      /**
           * The state timeline
           */
      this._state = new StateTimeline, 
      /**
           * The offset values of the ticks
           */
      this._tickOffset = new Timeline, 
      /**
           * Memoized values of getTicksAtTime at events with state other than "started"
           */
      this._ticksAtTime = new Timeline, 
      /**
           * Memoized values of getSecondsAtTime at events with state other than "started"
           */
      this._secondsAtTime = new Timeline, this.frequency = new TickSignal({
        context: this.context,
        units: options.units,
        value: options.frequency
      }), readOnly(this, "frequency"), 
      // set the initial state
      this._state.setStateAtTime("stopped", 0), 
      // add the first event
      this.setTicksAtTime(0, 0);
    }
    static getDefaults() {
      return Object.assign({
        frequency: 1,
        units: "hertz"
      }, ToneWithContext.getDefaults());
    }
    /**
       * Returns the playback state of the source, either "started", "stopped" or "paused".
       */    get state() {
      return this.getStateAtTime(this.now());
    }
    /**
       * Start the clock at the given time. Optionally pass in an offset
       * of where to start the tick counter from.
       * @param  time    The time the clock should start
       * @param offset The number of ticks to start the source at
       */    start(time, offset) {
      const computedTime = this.toSeconds(time);
      return "started" !== this._state.getValueAtTime(computedTime) && (this._state.setStateAtTime("started", computedTime), 
      isDefined(offset) && this.setTicksAtTime(offset, computedTime), this._ticksAtTime.cancel(computedTime), 
      this._secondsAtTime.cancel(computedTime)), this;
    }
    /**
       * Stop the clock. Stopping the clock resets the tick counter to 0.
       * @param time The time when the clock should stop.
       */    stop(time) {
      const computedTime = this.toSeconds(time);
      // cancel the previous stop
            if ("stopped" === this._state.getValueAtTime(computedTime)) {
        const event = this._state.get(computedTime);
        event && event.time > 0 && (this._tickOffset.cancel(event.time), this._state.cancel(event.time));
      }
      return this._state.cancel(computedTime), this._state.setStateAtTime("stopped", computedTime), 
      this.setTicksAtTime(0, computedTime), this._ticksAtTime.cancel(computedTime), this._secondsAtTime.cancel(computedTime), 
      this;
    }
    /**
       * Pause the clock. Pausing does not reset the tick counter.
       * @param time The time when the clock should stop.
       */    pause(time) {
      const computedTime = this.toSeconds(time);
      return "started" === this._state.getValueAtTime(computedTime) && (this._state.setStateAtTime("paused", computedTime), 
      this._ticksAtTime.cancel(computedTime), this._secondsAtTime.cancel(computedTime)), 
      this;
    }
    /**
       * Cancel start/stop/pause and setTickAtTime events scheduled after the given time.
       * @param time When to clear the events after
       */    cancel(time) {
      return time = this.toSeconds(time), this._state.cancel(time), this._tickOffset.cancel(time), 
      this._ticksAtTime.cancel(time), this._secondsAtTime.cancel(time), this;
    }
    /**
       * Get the elapsed ticks at the given time
       * @param  time  When to get the tick value
       * @return The number of ticks
       */    getTicksAtTime(time) {
      const computedTime = this.toSeconds(time);
      const stopEvent = this._state.getLastState("stopped", computedTime);
      // get previously memoized ticks if available
            const memoizedEvent = this._ticksAtTime.get(computedTime);
      // this event allows forEachBetween to iterate until the current time
            const tmpEvent = {
        state: "paused",
        time: computedTime
      };
      this._state.add(tmpEvent);
      // keep track of the previous offset event
      let lastState = memoizedEvent || stopEvent;
      let elapsedTicks = memoizedEvent ? memoizedEvent.ticks : 0;
      let eventToMemoize = null;
      // iterate through all the events since the last stop
            // return the ticks
      return this._state.forEachBetween(lastState.time, computedTime + this.sampleTime, (e => {
        let periodStartTime = lastState.time;
        // if there is an offset event in this period use that
                const offsetEvent = this._tickOffset.get(e.time);
        offsetEvent && offsetEvent.time >= lastState.time && (elapsedTicks = offsetEvent.ticks, 
        periodStartTime = offsetEvent.time), "started" === lastState.state && "started" !== e.state && (elapsedTicks += this.frequency.getTicksAtTime(e.time) - this.frequency.getTicksAtTime(periodStartTime), 
        // do not memoize the temporary event
        e.time !== tmpEvent.time && (eventToMemoize = {
          state: e.state,
          time: e.time,
          ticks: elapsedTicks
        })), lastState = e;
      })), 
      // remove the temporary event
      this._state.remove(tmpEvent), 
      // memoize the ticks at the most recent event with state other than "started"
      eventToMemoize && this._ticksAtTime.add(eventToMemoize), elapsedTicks;
    }
    /**
       * The number of times the callback was invoked. Starts counting at 0
       * and increments after the callback was invoked. Returns -1 when stopped.
       */    get ticks() {
      return this.getTicksAtTime(this.now());
    }
    set ticks(t) {
      this.setTicksAtTime(t, this.now());
    }
    /**
       * The time since ticks=0 that the TickSource has been running. Accounts
       * for tempo curves
       */    get seconds() {
      return this.getSecondsAtTime(this.now());
    }
    set seconds(s) {
      const now = this.now();
      const ticks = this.frequency.timeToTicks(s, now);
      this.setTicksAtTime(ticks, now);
    }
    /**
       * Return the elapsed seconds at the given time.
       * @param  time  When to get the elapsed seconds
       * @return  The number of elapsed seconds
       */    getSecondsAtTime(time) {
      time = this.toSeconds(time);
      const stopEvent = this._state.getLastState("stopped", time);
      // this event allows forEachBetween to iterate until the current time
            const tmpEvent = {
        state: "paused",
        time: time
      };
      this._state.add(tmpEvent);
      // get previously memoized seconds if available
      const memoizedEvent = this._secondsAtTime.get(time);
      // keep track of the previous offset event
            let lastState = memoizedEvent || stopEvent;
      let elapsedSeconds = memoizedEvent ? memoizedEvent.seconds : 0;
      let eventToMemoize = null;
      // iterate through all the events since the last stop
            // return the seconds
      return this._state.forEachBetween(lastState.time, time + this.sampleTime, (e => {
        let periodStartTime = lastState.time;
        // if there is an offset event in this period use that
                const offsetEvent = this._tickOffset.get(e.time);
        offsetEvent && offsetEvent.time >= lastState.time && (elapsedSeconds = offsetEvent.seconds, 
        periodStartTime = offsetEvent.time), "started" === lastState.state && "started" !== e.state && (elapsedSeconds += e.time - periodStartTime, 
        // do not memoize the temporary event
        e.time !== tmpEvent.time && (eventToMemoize = {
          state: e.state,
          time: e.time,
          seconds: elapsedSeconds
        })), lastState = e;
      })), 
      // remove the temporary event
      this._state.remove(tmpEvent), 
      // memoize the seconds at the most recent event with state other than "started"
      eventToMemoize && this._secondsAtTime.add(eventToMemoize), elapsedSeconds;
    }
    /**
       * Set the clock's ticks at the given time.
       * @param  ticks The tick value to set
       * @param  time  When to set the tick value
       */    setTicksAtTime(ticks, time) {
      return time = this.toSeconds(time), this._tickOffset.cancel(time), this._tickOffset.add({
        seconds: this.frequency.getDurationOfTicks(ticks, time),
        ticks: ticks,
        time: time
      }), this._ticksAtTime.cancel(time), this._secondsAtTime.cancel(time), this;
    }
    /**
       * Returns the scheduled state at the given time.
       * @param  time  The time to query.
       */    getStateAtTime(time) {
      return time = this.toSeconds(time), this._state.getValueAtTime(time);
    }
    /**
       * Get the time of the given tick. The second argument
       * is when to test before. Since ticks can be set (with setTicksAtTime)
       * there may be multiple times for a given tick value.
       * @param  tick The tick number.
       * @param  before When to measure the tick value from.
       * @return The time of the tick
       */    getTimeOfTick(tick, before = this.now()) {
      const offset = this._tickOffset.get(before);
      const event = this._state.get(before);
      const startTime = Math.max(offset.time, event.time);
      const absoluteTicks = this.frequency.getTicksAtTime(startTime) + tick - offset.ticks;
      return this.frequency.getTimeOfTick(absoluteTicks);
    }
    /**
       * Invoke the callback event at all scheduled ticks between the
       * start time and the end time
       * @param  startTime  The beginning of the search range
       * @param  endTime    The end of the search range
       * @param  callback   The callback to invoke with each tick
       */    forEachTickBetween(startTime, endTime, callback) {
      // only iterate through the sections where it is "started"
      let lastStateEvent = this._state.get(startTime);
      this._state.forEachBetween(startTime, endTime, (event => {
        lastStateEvent && "started" === lastStateEvent.state && "started" !== event.state && this.forEachTickBetween(Math.max(lastStateEvent.time, startTime), event.time - this.sampleTime, callback), 
        lastStateEvent = event;
      }));
      let error = null;
      if (lastStateEvent && "started" === lastStateEvent.state) {
        const maxStartTime = Math.max(lastStateEvent.time, startTime);
        // figure out the difference between the frequency ticks and the
                const startTicks = this.frequency.getTicksAtTime(maxStartTime);
        const diff = startTicks - this.frequency.getTicksAtTime(lastStateEvent.time);
        let offset = Math.ceil(diff) - diff;
        // guard against floating point issues
                offset = EQ(offset, 1) ? 0 : offset;
        let nextTickTime = this.frequency.getTimeOfTick(startTicks + offset);
        for (;nextTickTime < endTime; ) {
          try {
            callback(nextTickTime, Math.round(this.getTicksAtTime(nextTickTime)));
          } catch (e) {
            error = e;
            break;
          }
          nextTickTime += this.frequency.getDurationOfTicks(1, nextTickTime);
        }
      }
      if (error) throw error;
      return this;
    }
    /**
       * Clean up
       */    dispose() {
      return super.dispose(), this._state.dispose(), this._tickOffset.dispose(), this._ticksAtTime.dispose(), 
      this._secondsAtTime.dispose(), this.frequency.dispose(), this;
    }
  }
  /**
   * A sample accurate clock which provides a callback at the given rate.
   * While the callback is not sample-accurate (it is still susceptible to
   * loose JS timing), the time passed in as the argument to the callback
   * is precise. For most applications, it is better to use Tone.Transport
   * instead of the Clock by itself since you can synchronize multiple callbacks.
   * @example
   * // the callback will be invoked approximately once a second
   * // and will print the time exactly once a second apart.
   * const clock = new Tone.Clock(time => {
   * 	console.log(time);
   * }, 1);
   * clock.start();
   * @category Core
   */  class Clock extends ToneWithContext {
    constructor() {
      const options = optionsFromArguments(Clock.getDefaults(), arguments, [ "callback", "frequency" ]);
      super(options), this.name = "Clock", 
      /**
           * The callback function to invoke at the scheduled tick.
           */
      this.callback = noOp, 
      /**
           * The last time the loop callback was invoked
           */
      this._lastUpdate = 0, 
      /**
           * Keep track of the playback state
           */
      this._state = new StateTimeline("stopped"), 
      /**
           * Context bound reference to the _loop method
           * This is necessary to remove the event in the end.
           */
      this._boundLoop = this._loop.bind(this), this.callback = options.callback, this._tickSource = new TickSource({
        context: this.context,
        frequency: options.frequency,
        units: options.units
      }), this._lastUpdate = 0, this.frequency = this._tickSource.frequency, readOnly(this, "frequency"), 
      // add an initial state
      this._state.setStateAtTime("stopped", 0), 
      // bind a callback to the worker thread
      this.context.on("tick", this._boundLoop);
    }
    static getDefaults() {
      return Object.assign(ToneWithContext.getDefaults(), {
        callback: noOp,
        frequency: 1,
        units: "hertz"
      });
    }
    /**
       * Returns the playback state of the source, either "started", "stopped" or "paused".
       */    get state() {
      return this._state.getValueAtTime(this.now());
    }
    /**
       * Start the clock at the given time. Optionally pass in an offset
       * of where to start the tick counter from.
       * @param  time    The time the clock should start
       * @param offset  Where the tick counter starts counting from.
       */    start(time, offset) {
      // make sure the context is running
      assertContextRunning(this.context);
      // start the loop
      const computedTime = this.toSeconds(time);
      return this.log("start", computedTime), "started" !== this._state.getValueAtTime(computedTime) && (this._state.setStateAtTime("started", computedTime), 
      this._tickSource.start(computedTime, offset), computedTime < this._lastUpdate && this.emit("start", computedTime, offset)), 
      this;
    }
    /**
       * Stop the clock. Stopping the clock resets the tick counter to 0.
       * @param time The time when the clock should stop.
       * @example
       * const clock = new Tone.Clock(time => {
       * 	console.log(time);
       * }, 1);
       * clock.start();
       * // stop the clock after 10 seconds
       * clock.stop("+10");
       */    stop(time) {
      const computedTime = this.toSeconds(time);
      return this.log("stop", computedTime), this._state.cancel(computedTime), this._state.setStateAtTime("stopped", computedTime), 
      this._tickSource.stop(computedTime), computedTime < this._lastUpdate && this.emit("stop", computedTime), 
      this;
    }
    /**
       * Pause the clock. Pausing does not reset the tick counter.
       * @param time The time when the clock should stop.
       */    pause(time) {
      const computedTime = this.toSeconds(time);
      return "started" === this._state.getValueAtTime(computedTime) && (this._state.setStateAtTime("paused", computedTime), 
      this._tickSource.pause(computedTime), computedTime < this._lastUpdate && this.emit("pause", computedTime)), 
      this;
    }
    /**
       * The number of times the callback was invoked. Starts counting at 0
       * and increments after the callback was invoked.
       */    get ticks() {
      return Math.ceil(this.getTicksAtTime(this.now()));
    }
    set ticks(t) {
      this._tickSource.ticks = t;
    }
    /**
       * The time since ticks=0 that the Clock has been running. Accounts for tempo curves
       */    get seconds() {
      return this._tickSource.seconds;
    }
    set seconds(s) {
      this._tickSource.seconds = s;
    }
    /**
       * Return the elapsed seconds at the given time.
       * @param  time  When to get the elapsed seconds
       * @return  The number of elapsed seconds
       */    getSecondsAtTime(time) {
      return this._tickSource.getSecondsAtTime(time);
    }
    /**
       * Set the clock's ticks at the given time.
       * @param  ticks The tick value to set
       * @param  time  When to set the tick value
       */    setTicksAtTime(ticks, time) {
      return this._tickSource.setTicksAtTime(ticks, time), this;
    }
    /**
       * Get the time of the given tick. The second argument
       * is when to test before. Since ticks can be set (with setTicksAtTime)
       * there may be multiple times for a given tick value.
       * @param  tick The tick number.
       * @param  before When to measure the tick value from.
       * @return The time of the tick
       */    getTimeOfTick(tick, before = this.now()) {
      return this._tickSource.getTimeOfTick(tick, before);
    }
    /**
       * Get the clock's ticks at the given time.
       * @param  time  When to get the tick value
       * @return The tick value at the given time.
       */    getTicksAtTime(time) {
      return this._tickSource.getTicksAtTime(time);
    }
    /**
       * Get the time of the next tick
       * @param  offset The tick number.
       */    nextTickTime(offset, when) {
      const computedTime = this.toSeconds(when);
      const currentTick = this.getTicksAtTime(computedTime);
      return this._tickSource.getTimeOfTick(currentTick + offset, computedTime);
    }
    /**
       * The scheduling loop.
       */    _loop() {
      const startTime = this._lastUpdate;
      const endTime = this.now();
      this._lastUpdate = endTime, this.log("loop", startTime, endTime), startTime !== endTime && (
      // the state change events
      this._state.forEachBetween(startTime, endTime, (e => {
        switch (e.state) {
         case "started":
          const offset = this._tickSource.getTicksAtTime(e.time);
          this.emit("start", e.time, offset);
          break;

         case "stopped":
          0 !== e.time && this.emit("stop", e.time);
          break;

         case "paused":
          this.emit("pause", e.time);
        }
      })), 
      // the tick callbacks
      this._tickSource.forEachTickBetween(startTime, endTime, ((time, ticks) => {
        this.callback(time, ticks);
      })));
    }
    /**
       * Returns the scheduled state at the given time.
       * @param  time  The time to query.
       * @return  The name of the state input in setStateAtTime.
       * @example
       * const clock = new Tone.Clock();
       * clock.start("+0.1");
       * clock.getStateAtTime("+0.1"); // returns "started"
       */    getStateAtTime(time) {
      const computedTime = this.toSeconds(time);
      return this._state.getValueAtTime(computedTime);
    }
    /**
       * Clean up
       */    dispose() {
      return super.dispose(), this.context.off("tick", this._boundLoop), this._tickSource.dispose(), 
      this._state.dispose(), this;
    }
  }
  Emitter.mixin(Clock);
  /**
   * TransportEvent is an internal class used by {@link TransportClass}
   * to schedule events. Do no invoke this class directly, it is
   * handled from within Tone.Transport.
   */
  class TransportEvent {
    /**
       * @param transport The transport object which the event belongs to
       */
    constructor(transport, opts) {
      /**
           * The unique id of the event
           */
      this.id = TransportEvent._eventId++, 
      /**
           * The remaining value between the passed in time, and Math.floor(time).
           * This value is later added back when scheduling to get sub-tick precision.
           */
      this._remainderTime = 0;
      const options = Object.assign(TransportEvent.getDefaults(), opts);
      this.transport = transport, this.callback = options.callback, this._once = options.once, 
      this.time = Math.floor(options.time), this._remainderTime = options.time - this.time;
    }
    static getDefaults() {
      return {
        callback: noOp,
        once: !1,
        time: 0
      };
    }
    /**
       * Get the time and remainder time.
       */    get floatTime() {
      return this.time + this._remainderTime;
    }
    /**
       * Invoke the event callback.
       * @param  time  The AudioContext time in seconds of the event
       */    invoke(time) {
      if (this.callback) {
        const tickDuration = this.transport.bpm.getDurationOfTicks(1, time);
        this.callback(time + this._remainderTime * tickDuration), this._once && this.transport.clear(this.id);
      }
    }
    /**
       * Clean up
       */    dispose() {
      return this.callback = void 0, this;
    }
  }
  /**
   * Current ID counter
   */  TransportEvent._eventId = 0;
  /**
   * TransportRepeatEvent is an internal class used by Tone.Transport
   * to schedule repeat events. This class should not be instantiated directly.
   */
  class TransportRepeatEvent extends TransportEvent {
    /**
       * @param transport The transport object which the event belongs to
       */
    constructor(transport, opts) {
      super(transport, opts), 
      /**
           * The ID of the current timeline event
           */
      this._currentId = -1, 
      /**
           * The ID of the next timeline event
           */
      this._nextId = -1, 
      /**
           * The time of the next event
           */
      this._nextTick = this.time, 
      /**
           * a reference to the bound start method
           */
      this._boundRestart = this._restart.bind(this);
      const options = Object.assign(TransportRepeatEvent.getDefaults(), opts);
      this.duration = options.duration, this._interval = options.interval, this._nextTick = options.time, 
      this.transport.on("start", this._boundRestart), this.transport.on("loopStart", this._boundRestart), 
      this.transport.on("ticks", this._boundRestart), this.context = this.transport.context, 
      this._restart();
    }
    static getDefaults() {
      return Object.assign({}, TransportEvent.getDefaults(), {
        duration: 1 / 0,
        interval: 1,
        once: !1
      });
    }
    /**
       * Invoke the callback. Returns the tick time which
       * the next event should be scheduled at.
       * @param  time  The AudioContext time in seconds of the event
       */    invoke(time) {
      // create more events if necessary
      this._createEvents(time), 
      // call the super class
      super.invoke(time);
    }
    /**
       * Create an event on the transport on the nextTick
       */    _createEvent() {
      return LT(this._nextTick, this.floatTime + this.duration) ? this.transport.scheduleOnce(this.invoke.bind(this), new TicksClass(this.context, this._nextTick).toSeconds()) : -1;
    }
    /**
       * Push more events onto the timeline to keep up with the position of the timeline
       */    _createEvents(time) {
      // schedule the next event
      // const ticks = this.transport.getTicksAtTime(time);
      // if the next tick is within the bounds set by "duration"
      LT(this._nextTick + this._interval, this.floatTime + this.duration) && (this._nextTick += this._interval, 
      this._currentId = this._nextId, this._nextId = this.transport.scheduleOnce(this.invoke.bind(this), new TicksClass(this.context, this._nextTick).toSeconds()));
    }
    /**
       * Re-compute the events when the transport time has changed from a start/ticks/loopStart event
       */    _restart(time) {
      this.transport.clear(this._currentId), this.transport.clear(this._nextId), 
      // start at the first event
      this._nextTick = this.floatTime;
      const ticks = this.transport.getTicksAtTime(time);
      GT(ticks, this.time) && (
      // the event is not being scheduled from the beginning and should be offset
      this._nextTick = this.floatTime + Math.ceil((ticks - this.floatTime) / this._interval) * this._interval), 
      this._currentId = this._createEvent(), this._nextTick += this._interval, this._nextId = this._createEvent();
    }
    /**
       * Clean up
       */    dispose() {
      return super.dispose(), this.transport.clear(this._currentId), this.transport.clear(this._nextId), 
      this.transport.off("start", this._boundRestart), this.transport.off("loopStart", this._boundRestart), 
      this.transport.off("ticks", this._boundRestart), this;
    }
  }
  /**
   * Transport for timing musical events.
   * Supports tempo curves and time changes. Unlike browser-based timing (setInterval, requestAnimationFrame)
   * Transport timing events pass in the exact time of the scheduled event
   * in the argument of the callback function. Pass that time value to the object
   * you're scheduling. <br><br>
   * A single transport is created for you when the library is initialized.
   * <br><br>
   * The transport emits the events: "start", "stop", "pause", and "loop" which are
   * called with the time of that event as the argument.
   *
   * @example
   * const osc = new Tone.Oscillator().toDestination();
   * // repeated event every 8th note
   * Tone.getTransport().scheduleRepeat((time) => {
   * 	// use the callback time to schedule events
   * 	osc.start(time).stop(time + 0.1);
   * }, "8n");
   * // transport must be started before it starts invoking events
   * Tone.getTransport().start();
   * @category Core
   */  class TransportClass extends ToneWithContext {
    constructor() {
      const options = optionsFromArguments(TransportClass.getDefaults(), arguments);
      super(options), this.name = "Transport", 
      //-------------------------------------
      // 	LOOPING
      //-------------------------------------
      /**
           * If the transport loops or not.
           */
      this._loop = new TimelineValue(!1), 
      /**
           * The loop start position in ticks
           */
      this._loopStart = 0, 
      /**
           * The loop end position in ticks
           */
      this._loopEnd = 0, 
      //-------------------------------------
      // 	TIMELINE EVENTS
      //-------------------------------------
      /**
           * All the events in an object to keep track by ID
           */
      this._scheduledEvents = {}, 
      /**
           * The scheduled events.
           */
      this._timeline = new Timeline, 
      /**
           * Repeated events
           */
      this._repeatedEvents = new IntervalTimeline, 
      /**
           * All of the synced Signals
           */
      this._syncedSignals = [], 
      /**
           * The swing amount
           */
      this._swingAmount = 0, 
      // CLOCK/TEMPO
      this._ppq = options.ppq, this._clock = new Clock({
        callback: this._processTick.bind(this),
        context: this.context,
        frequency: 0,
        units: "bpm"
      }), this._bindClockEvents(), this.bpm = this._clock.frequency, this._clock.frequency.multiplier = options.ppq, 
      this.bpm.setValueAtTime(options.bpm, 0), readOnly(this, "bpm"), this._timeSignature = options.timeSignature, 
      // SWING
      this._swingTicks = options.ppq / 2;
    }
    static getDefaults() {
      return Object.assign(ToneWithContext.getDefaults(), {
        bpm: 120,
        loopEnd: "4m",
        loopStart: 0,
        ppq: 192,
        swing: 0,
        swingSubdivision: "8n",
        timeSignature: 4
      });
    }
    //-------------------------------------
    // 	TICKS
    //-------------------------------------
    /**
       * called on every tick
       * @param  tickTime clock relative tick time
       */
    _processTick(tickTime, ticks) {
      // handle swing
      if (
      // do the loop test
      this._loop.get(tickTime) && ticks >= this._loopEnd && (this.emit("loopEnd", tickTime), 
      this._clock.setTicksAtTime(this._loopStart, tickTime), ticks = this._loopStart, 
      this.emit("loopStart", tickTime, this._clock.getSecondsAtTime(tickTime)), this.emit("loop", tickTime)), 
      this._swingAmount > 0 && ticks % this._ppq != 0 && // not on a downbeat
      ticks % (2 * this._swingTicks) != 0) {
        // add some swing
        const progress = ticks % (2 * this._swingTicks) / (2 * this._swingTicks);
        const amount = Math.sin(progress * Math.PI) * this._swingAmount;
        tickTime += new TicksClass(this.context, 2 * this._swingTicks / 3).toSeconds() * amount;
      }
      // invoke the timeline events scheduled on this tick
            enterScheduledCallback(!0), this._timeline.forEachAtTime(ticks, (event => event.invoke(tickTime))), 
      enterScheduledCallback(!1);
    }
    //-------------------------------------
    // 	SCHEDULABLE EVENTS
    //-------------------------------------
    /**
       * Schedule an event along the timeline.
       * @param callback The callback to be invoked at the time.
       * @param time The time to invoke the callback at.
       * @return The id of the event which can be used for canceling the event.
       * @example
       * // schedule an event on the 16th measure
       * Tone.getTransport().schedule((time) => {
       * 	// invoked on measure 16
       * 	console.log("measure 16!");
       * }, "16:0:0");
       */
    schedule(callback, time) {
      const event = new TransportEvent(this, {
        callback: callback,
        time: new TransportTimeClass(this.context, time).toTicks()
      });
      return this._addEvent(event, this._timeline);
    }
    /**
       * Schedule a repeated event along the timeline. The event will fire
       * at the `interval` starting at the `startTime` and for the specified
       * `duration`.
       * @param  callback   The callback to invoke.
       * @param  interval   The duration between successive callbacks. Must be a positive number.
       * @param  startTime  When along the timeline the events should start being invoked.
       * @param  duration How long the event should repeat.
       * @return  The ID of the scheduled event. Use this to cancel the event.
       * @example
       * const osc = new Tone.Oscillator().toDestination().start();
       * // a callback invoked every eighth note after the first measure
       * Tone.getTransport().scheduleRepeat((time) => {
       * 	osc.start(time).stop(time + 0.1);
       * }, "8n", "1m");
       */    scheduleRepeat(callback, interval, startTime, duration = 1 / 0) {
      const event = new TransportRepeatEvent(this, {
        callback: callback,
        duration: new TimeClass(this.context, duration).toTicks(),
        interval: new TimeClass(this.context, interval).toTicks(),
        time: new TransportTimeClass(this.context, startTime).toTicks()
      });
      // kick it off if the Transport is started
      // @ts-ignore
            return this._addEvent(event, this._repeatedEvents);
    }
    /**
       * Schedule an event that will be removed after it is invoked.
       * @param callback The callback to invoke once.
       * @param time The time the callback should be invoked.
       * @returns The ID of the scheduled event.
       */    scheduleOnce(callback, time) {
      const event = new TransportEvent(this, {
        callback: callback,
        once: !0,
        time: new TransportTimeClass(this.context, time).toTicks()
      });
      return this._addEvent(event, this._timeline);
    }
    /**
       * Clear the passed in event id from the timeline
       * @param eventId The id of the event.
       */    clear(eventId) {
      if (this._scheduledEvents.hasOwnProperty(eventId)) {
        const item = this._scheduledEvents[eventId.toString()];
        item.timeline.remove(item.event), item.event.dispose(), delete this._scheduledEvents[eventId.toString()];
      }
      return this;
    }
    /**
       * Add an event to the correct timeline. Keep track of the
       * timeline it was added to.
       * @returns the event id which was just added
       */    _addEvent(event, timeline) {
      return this._scheduledEvents[event.id.toString()] = {
        event: event,
        timeline: timeline
      }, timeline.add(event), event.id;
    }
    /**
       * Remove scheduled events from the timeline after
       * the given time. Repeated events will be removed
       * if their startTime is after the given time
       * @param after Clear all events after this time.
       */    cancel(after = 0) {
      const computedAfter = this.toTicks(after);
      return this._timeline.forEachFrom(computedAfter, (event => this.clear(event.id))), 
      this._repeatedEvents.forEachFrom(computedAfter, (event => this.clear(event.id))), 
      this;
    }
    //-------------------------------------
    // 	START/STOP/PAUSE
    //-------------------------------------
    /**
       * Bind start/stop/pause events from the clock and emit them.
       */
    _bindClockEvents() {
      this._clock.on("start", ((time, offset) => {
        offset = new TicksClass(this.context, offset).toSeconds(), this.emit("start", time, offset);
      })), this._clock.on("stop", (time => {
        this.emit("stop", time);
      })), this._clock.on("pause", (time => {
        this.emit("pause", time);
      }));
    }
    /**
       * Returns the playback state of the source, either "started", "stopped", or "paused"
       */    get state() {
      return this._clock.getStateAtTime(this.now());
    }
    /**
       * Start the transport and all sources synced to the transport.
       * @param  time The time when the transport should start.
       * @param  offset The timeline offset to start the transport.
       * @example
       * // start the transport in one second starting at beginning of the 5th measure.
       * Tone.getTransport().start("+1", "4:0:0");
       */    start(time, offset) {
      let offsetTicks;
      // start the context
      return this.context.resume(), isDefined(offset) && (offsetTicks = this.toTicks(offset)), 
      // start the clock
      this._clock.start(time, offsetTicks), this;
    }
    /**
       * Stop the transport and all sources synced to the transport.
       * @param time The time when the transport should stop.
       * @example
       * Tone.getTransport().stop();
       */    stop(time) {
      return this._clock.stop(time), this;
    }
    /**
       * Pause the transport and all sources synced to the transport.
       */    pause(time) {
      return this._clock.pause(time), this;
    }
    /**
       * Toggle the current state of the transport. If it is
       * started, it will stop it, otherwise it will start the Transport.
       * @param  time The time of the event
       */    toggle(time) {
      return time = this.toSeconds(time), "started" !== this._clock.getStateAtTime(time) ? this.start(time) : this.stop(time), 
      this;
    }
    //-------------------------------------
    // 	SETTERS/GETTERS
    //-------------------------------------
    /**
       * The time signature as just the numerator over 4.
       * For example 4/4 would be just 4 and 6/8 would be 3.
       * @example
       * // common time
       * Tone.getTransport().timeSignature = 4;
       * // 7/8
       * Tone.getTransport().timeSignature = [7, 8];
       * // this will be reduced to a single number
       * Tone.getTransport().timeSignature; // returns 3.5
       */
    get timeSignature() {
      return this._timeSignature;
    }
    set timeSignature(timeSig) {
      isArray(timeSig) && (timeSig = timeSig[0] / timeSig[1] * 4), this._timeSignature = timeSig;
    }
    /**
       * When the Transport.loop = true, this is the starting position of the loop.
       */    get loopStart() {
      return new TimeClass(this.context, this._loopStart, "i").toSeconds();
    }
    set loopStart(startPosition) {
      this._loopStart = this.toTicks(startPosition);
    }
    /**
       * When the Transport.loop = true, this is the ending position of the loop.
       */    get loopEnd() {
      return new TimeClass(this.context, this._loopEnd, "i").toSeconds();
    }
    set loopEnd(endPosition) {
      this._loopEnd = this.toTicks(endPosition);
    }
    /**
       * If the transport loops or not.
       */    get loop() {
      return this._loop.get(this.now());
    }
    set loop(loop) {
      this._loop.set(loop, this.now());
    }
    /**
       * Set the loop start and stop at the same time.
       * @example
       * // loop over the first measure
       * Tone.getTransport().setLoopPoints(0, "1m");
       * Tone.getTransport().loop = true;
       */    setLoopPoints(startPosition, endPosition) {
      return this.loopStart = startPosition, this.loopEnd = endPosition, this;
    }
    /**
       * The swing value. Between 0-1 where 1 equal to the note + half the subdivision.
       */    get swing() {
      return this._swingAmount;
    }
    set swing(amount) {
      // scale the values to a normal range
      this._swingAmount = amount;
    }
    /**
       * Set the subdivision which the swing will be applied to.
       * The default value is an 8th note. Value must be less
       * than a quarter note.
       */    get swingSubdivision() {
      return new TicksClass(this.context, this._swingTicks).toNotation();
    }
    set swingSubdivision(subdivision) {
      this._swingTicks = this.toTicks(subdivision);
    }
    /**
       * The Transport's position in Bars:Beats:Sixteenths.
       * Setting the value will jump to that position right away.
       */    get position() {
      const now = this.now();
      const ticks = this._clock.getTicksAtTime(now);
      return new TicksClass(this.context, ticks).toBarsBeatsSixteenths();
    }
    set position(progress) {
      const ticks = this.toTicks(progress);
      this.ticks = ticks;
    }
    /**
       * The Transport's position in seconds.
       * Setting the value will jump to that position right away.
       */    get seconds() {
      return this._clock.seconds;
    }
    set seconds(s) {
      const now = this.now();
      const ticks = this._clock.frequency.timeToTicks(s, now);
      this.ticks = ticks;
    }
    /**
       * The Transport's loop position as a normalized value. Always
       * returns 0 if the Transport.loop = false.
       */    get progress() {
      if (this.loop) {
        const now = this.now();
        return (this._clock.getTicksAtTime(now) - this._loopStart) / (this._loopEnd - this._loopStart);
      }
      return 0;
    }
    /**
       * The Transport's current tick position.
       */    get ticks() {
      return this._clock.ticks;
    }
    set ticks(t) {
      if (this._clock.ticks !== t) {
        const now = this.now();
        // stop everything synced to the transport
                if ("started" === this.state) {
          const ticks = this._clock.getTicksAtTime(now);
          // schedule to start on the next tick, #573
                    const time = now + this._clock.frequency.getDurationOfTicks(Math.ceil(ticks) - ticks, now);
          this.emit("stop", time), this._clock.setTicksAtTime(t, time), 
          // restart it with the new time
          this.emit("start", time, this._clock.getSecondsAtTime(time));
        } else this.emit("ticks", now), this._clock.setTicksAtTime(t, now);
      }
    }
    /**
       * Get the clock's ticks at the given time.
       * @param  time  When to get the tick value
       * @return The tick value at the given time.
       */    getTicksAtTime(time) {
      return this._clock.getTicksAtTime(time);
    }
    /**
       * Return the elapsed seconds at the given time.
       * @param  time  When to get the elapsed seconds
       * @return  The number of elapsed seconds
       */    getSecondsAtTime(time) {
      return this._clock.getSecondsAtTime(time);
    }
    /**
       * Pulses Per Quarter note. This is the smallest resolution
       * the Transport timing supports. This should be set once
       * on initialization and not set again. Changing this value
       * after other objects have been created can cause problems.
       */    get PPQ() {
      return this._clock.frequency.multiplier;
    }
    set PPQ(ppq) {
      this._clock.frequency.multiplier = ppq;
    }
    //-------------------------------------
    // 	SYNCING
    //-------------------------------------
    /**
       * Returns the time aligned to the next subdivision
       * of the Transport. If the Transport is not started,
       * it will return 0.
       * Note: this will not work precisely during tempo ramps.
       * @param  subdivision  The subdivision to quantize to
       * @return  The context time of the next subdivision.
       * @example
       * // the transport must be started, otherwise returns 0
       * Tone.getTransport().start();
       * Tone.getTransport().nextSubdivision("4n");
       */
    nextSubdivision(subdivision) {
      if (subdivision = this.toTicks(subdivision), "started" !== this.state) 
      // if the transport's not started, return 0
      return 0;
      {
        const now = this.now();
        // the remainder of the current ticks and the subdivision
                const remainingTicks = subdivision - this.getTicksAtTime(now) % subdivision;
        return this._clock.nextTickTime(remainingTicks, now);
      }
    }
    /**
       * Attaches the signal to the tempo control signal so that
       * any changes in the tempo will change the signal in the same
       * ratio.
       *
       * @param signal
       * @param ratio Optionally pass in the ratio between the two signals.
       * 			Otherwise it will be computed based on their current values.
       */    syncSignal(signal, ratio) {
      const now = this.now();
      let source = this.bpm;
      let sourceValue = 1 / (60 / source.getValueAtTime(now) / this.PPQ);
      let nodes = [];
      // If the signal is in the time domain, sync it to the reciprocal of
      // the tempo instead of the tempo.
            if ("time" === signal.units) {
        // The input to Pow should be in the range [1 / 4096, 1], where
        // where 4096 is half of the buffer size of Pow's waveshaper.
        // Pick a scaling factor based on the initial tempo that ensures
        // that the initial input is in this range, while leaving room for
        // tempo changes.
        const scaleFactor = 1 / 64 / sourceValue;
        const scaleBefore = new Gain$1(scaleFactor);
        const reciprocal = new Pow(-1);
        const scaleAfter = new Gain$1(scaleFactor);
        // @ts-ignore
                source.chain(scaleBefore, reciprocal, scaleAfter), source = scaleAfter, 
        sourceValue = 1 / sourceValue, nodes = [ scaleBefore, reciprocal, scaleAfter ];
      }
      ratio || (
      // get the sync ratio
      ratio = 0 !== signal.getValueAtTime(now) ? signal.getValueAtTime(now) / sourceValue : 0);
      const ratioSignal = new Gain$1(ratio);
      // @ts-ignore
            return source.connect(ratioSignal), 
      // @ts-ignore
      ratioSignal.connect(signal._param), nodes.push(ratioSignal), this._syncedSignals.push({
        initial: signal.value,
        nodes: nodes,
        signal: signal
      }), signal.value = 0, this;
    }
    /**
       * Unsyncs a previously synced signal from the transport's control.
       * @see {@link syncSignal}.
       */    unsyncSignal(signal) {
      for (let i = this._syncedSignals.length - 1; i >= 0; i--) {
        const syncedSignal = this._syncedSignals[i];
        syncedSignal.signal === signal && (syncedSignal.nodes.forEach((node => node.dispose())), 
        syncedSignal.signal.value = syncedSignal.initial, this._syncedSignals.splice(i, 1));
      }
      return this;
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this._clock.dispose(), writable(this, "bpm"), this._timeline.dispose(), 
      this._repeatedEvents.dispose(), this;
    }
  }
  Emitter.mixin(TransportClass), 
  //-------------------------------------
  // 	INITIALIZATION
  //-------------------------------------
  onContextInit((context => {
    context.transport = new TransportClass({
      context: context
    });
  })), onContextClose((context => {
    context.transport.dispose();
  }));
  /**
   * Base class for sources.
   * start/stop of this.context.transport.
   *
   * ```
   * // Multiple state change events can be chained together,
   * // but must be set in the correct order and with ascending times
   * // OK
   * state.start().stop("+0.2");
   * // OK
   * state.start().stop("+0.2").start("+0.4").stop("+0.7")
   * // BAD
   * state.stop("+0.2").start();
   * // BAD
   * state.start("+0.3").stop("+0.2");
   * ```
   */
  class Source extends ToneAudioNode {
    constructor(options) {
      super(options), 
      /**
           * Sources have no inputs
           */
      this.input = void 0, 
      /**
           * Keep track of the scheduled state.
           */
      this._state = new StateTimeline("stopped"), 
      /**
           * The synced `start` callback function from the transport
           */
      this._synced = !1, 
      /**
           * Keep track of all of the scheduled event ids
           */
      this._scheduled = [], 
      /**
           * Placeholder functions for syncing/unsyncing to transport
           */
      this._syncedStart = noOp, this._syncedStop = noOp, this._state.memory = 100, this._state.increasing = !0, 
      this._volume = this.output = new Volume({
        context: this.context,
        mute: options.mute,
        volume: options.volume
      }), this.volume = this._volume.volume, readOnly(this, "volume"), this.onstop = options.onstop;
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        mute: !1,
        onstop: noOp,
        volume: 0
      });
    }
    /**
       * Returns the playback state of the source, either "started" or "stopped".
       * @example
       * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/ahntone_c3.mp3", () => {
       * 	player.start();
       * 	console.log(player.state);
       * }).toDestination();
       */    get state() {
      return this._synced ? "started" === this.context.transport.state ? this._state.getValueAtTime(this.context.transport.seconds) : "stopped" : this._state.getValueAtTime(this.now());
    }
    /**
       * Mute the output.
       * @example
       * const osc = new Tone.Oscillator().toDestination().start();
       * // mute the output
       * osc.mute = true;
       */    get mute() {
      return this._volume.mute;
    }
    set mute(mute) {
      this._volume.mute = mute;
    }
    /**
       * Ensure that the scheduled time is not before the current time.
       * Should only be used when scheduled unsynced.
       */    _clampToCurrentTime(time) {
      return this._synced ? time : Math.max(time, this.context.currentTime);
    }
    /**
       * Start the source at the specified time. If no time is given,
       * start the source now.
       * @param  time When the source should be started.
       * @example
       * const source = new Tone.Oscillator().toDestination();
       * source.start("+0.5"); // starts the source 0.5 seconds from now
       */    start(time, offset, duration) {
      let computedTime = isUndef(time) && this._synced ? this.context.transport.seconds : this.toSeconds(time);
      // if it's started, stop it and restart it
      if (computedTime = this._clampToCurrentTime(computedTime), this._synced || "started" !== this._state.getValueAtTime(computedTime)) if (this.log("start", computedTime), 
      this._state.setStateAtTime("started", computedTime), this._synced) {
        // add the offset time to the event
        const event = this._state.get(computedTime);
        event && (event.offset = this.toSeconds(defaultArg(offset, 0)), event.duration = duration ? this.toSeconds(duration) : void 0);
        const sched = this.context.transport.schedule((t => {
          this._start(t, offset, duration);
        }), computedTime);
        this._scheduled.push(sched), 
        // if the transport is already started
        // and the time is greater than where the transport is
        "started" === this.context.transport.state && this.context.transport.getSecondsAtTime(this.immediate()) > computedTime && this._syncedStart(this.now(), this.context.transport.seconds);
      } else assertContextRunning(this.context), this._start(computedTime, offset, duration); else 
      // time should be strictly greater than the previous start time
      assert(GT(computedTime, this._state.get(computedTime).time), "Start time must be strictly greater than previous start time"), 
      this._state.cancel(computedTime), this._state.setStateAtTime("started", computedTime), 
      this.log("restart", computedTime), this.restart(computedTime, offset, duration);
      return this;
    }
    /**
       * Stop the source at the specified time. If no time is given,
       * stop the source now.
       * @param  time When the source should be stopped.
       * @example
       * const source = new Tone.Oscillator().toDestination();
       * source.start();
       * source.stop("+0.5"); // stops the source 0.5 seconds from now
       */    stop(time) {
      let computedTime = isUndef(time) && this._synced ? this.context.transport.seconds : this.toSeconds(time);
      if (computedTime = this._clampToCurrentTime(computedTime), "started" === this._state.getValueAtTime(computedTime) || isDefined(this._state.getNextState("started", computedTime))) {
        if (this.log("stop", computedTime), this._synced) {
          const sched = this.context.transport.schedule(this._stop.bind(this), computedTime);
          this._scheduled.push(sched);
        } else this._stop(computedTime);
        this._state.cancel(computedTime), this._state.setStateAtTime("stopped", computedTime);
      }
      return this;
    }
    /**
       * Restart the source.
       */    restart(time, offset, duration) {
      return time = this.toSeconds(time), "started" === this._state.getValueAtTime(time) && (this._state.cancel(time), 
      this._restart(time, offset, duration)), this;
    }
    /**
       * Sync the source to the Transport so that all subsequent
       * calls to `start` and `stop` are synced to the TransportTime
       * instead of the AudioContext time.
       *
       * @example
       * const osc = new Tone.Oscillator().toDestination();
       * // sync the source so that it plays between 0 and 0.3 on the Transport's timeline
       * osc.sync().start(0).stop(0.3);
       * // start the transport.
       * Tone.Transport.start();
       * // set it to loop once a second
       * Tone.Transport.loop = true;
       * Tone.Transport.loopEnd = 1;
       */    sync() {
      return this._synced || (this._synced = !0, this._syncedStart = (time, offset) => {
        if (GT(offset, 0)) {
          // get the playback state at that time
          const stateEvent = this._state.get(offset);
          // listen for start events which may occur in the middle of the sync'ed time
                    if (stateEvent && "started" === stateEvent.state && stateEvent.time !== offset) {
            // get the offset
            const startOffset = offset - this.toSeconds(stateEvent.time);
            let duration;
            stateEvent.duration && (duration = this.toSeconds(stateEvent.duration) - startOffset), 
            this._start(time, this.toSeconds(stateEvent.offset) + startOffset, duration);
          }
        }
      }, this._syncedStop = time => {
        const seconds = this.context.transport.getSecondsAtTime(Math.max(time - this.sampleTime, 0));
        "started" === this._state.getValueAtTime(seconds) && this._stop(time);
      }, this.context.transport.on("start", this._syncedStart), this.context.transport.on("loopStart", this._syncedStart), 
      this.context.transport.on("stop", this._syncedStop), this.context.transport.on("pause", this._syncedStop), 
      this.context.transport.on("loopEnd", this._syncedStop)), this;
    }
    /**
       * Unsync the source to the Transport.
       * @see {@link sync}
       */    unsync() {
      return this._synced && (this.context.transport.off("stop", this._syncedStop), this.context.transport.off("pause", this._syncedStop), 
      this.context.transport.off("loopEnd", this._syncedStop), this.context.transport.off("start", this._syncedStart), 
      this.context.transport.off("loopStart", this._syncedStart)), this._synced = !1, 
      // clear all of the scheduled ids
      this._scheduled.forEach((id => this.context.transport.clear(id))), this._scheduled = [], 
      this._state.cancel(0), 
      // stop it also
      this._stop(0), this;
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this.onstop = noOp, this.unsync(), this._volume.dispose(), 
      this._state.dispose(), this;
    }
  }
  /**
   * Render a segment of the oscillator to an offline context and return the results as an array
   */  
  /**
   * Wrapper around the native fire-and-forget OscillatorNode.
   * Adds the ability to reschedule the stop method.
   * ***{@link Oscillator} is better for most use-cases***
   * @category Source
   */
  class ToneOscillatorNode extends OneShotSource {
    constructor() {
      const options = optionsFromArguments(ToneOscillatorNode.getDefaults(), arguments, [ "frequency", "type" ]);
      super(options), this.name = "ToneOscillatorNode", 
      /**
           * The oscillator
           */
      this._oscillator = this.context.createOscillator(), this._internalChannels = [ this._oscillator ], 
      connect(this._oscillator, this._gainNode), this.type = options.type, this.frequency = new Param({
        context: this.context,
        param: this._oscillator.frequency,
        units: "frequency",
        value: options.frequency
      }), this.detune = new Param({
        context: this.context,
        param: this._oscillator.detune,
        units: "cents",
        value: options.detune
      }), readOnly(this, [ "frequency", "detune" ]);
    }
    static getDefaults() {
      return Object.assign(OneShotSource.getDefaults(), {
        detune: 0,
        frequency: 440,
        type: "sine"
      });
    }
    /**
       * Start the oscillator node at the given time
       * @param  time When to start the oscillator
       */    start(time) {
      const computedTime = this.toSeconds(time);
      return this.log("start", computedTime), this._startGain(computedTime), this._oscillator.start(computedTime), 
      this;
    }
    _stopSource(time) {
      this._oscillator.stop(time);
    }
    /**
       * Sets an arbitrary custom periodic waveform given a PeriodicWave.
       * @param  periodicWave PeriodicWave should be created with context.createPeriodicWave
       */    setPeriodicWave(periodicWave) {
      return this._oscillator.setPeriodicWave(periodicWave), this;
    }
    /**
       * The oscillator type. Either 'sine', 'sawtooth', 'square', or 'triangle'
       */    get type() {
      return this._oscillator.type;
    }
    set type(type) {
      this._oscillator.type = type;
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), "started" === this.state && this.stop(), this._oscillator.disconnect(), 
      this.frequency.dispose(), this.detune.dispose(), this;
    }
  }
  /**
   * Oscillator supports a number of features including
   * phase rotation, multiple oscillator types (see Oscillator.type),
   * and Transport syncing (see Oscillator.syncFrequency).
   *
   * @example
   * // make and start a 440hz sine tone
   * const osc = new Tone.Oscillator(440, "sine").toDestination().start();
   * @category Source
   */  let Oscillator$1 = class Oscillator extends Source {
    constructor() {
      const options = optionsFromArguments(Oscillator.getDefaults(), arguments, [ "frequency", "type" ]);
      super(options), this.name = "Oscillator", 
      /**
           * the main oscillator
           */
      this._oscillator = null, this.frequency = new Signal({
        context: this.context,
        units: "frequency",
        value: options.frequency
      }), readOnly(this, "frequency"), this.detune = new Signal({
        context: this.context,
        units: "cents",
        value: options.detune
      }), readOnly(this, "detune"), this._partials = options.partials, this._partialCount = options.partialCount, 
      this._type = options.type, options.partialCount && "custom" !== options.type && (this._type = this.baseType + options.partialCount.toString()), 
      this.phase = options.phase;
    }
    static getDefaults() {
      return Object.assign(Source.getDefaults(), {
        detune: 0,
        frequency: 440,
        partialCount: 0,
        partials: [],
        phase: 0,
        type: "sine"
      });
    }
    /**
       * start the oscillator
       */    _start(time) {
      const computedTime = this.toSeconds(time);
      // new oscillator with previous values
            const oscillator = new ToneOscillatorNode({
        context: this.context,
        onended: () => this.onstop(this)
      });
      this._oscillator = oscillator, this._wave ? this._oscillator.setPeriodicWave(this._wave) : this._oscillator.type = this._type, 
      // connect the control signal to the oscillator frequency & detune
      this._oscillator.connect(this.output), this.frequency.connect(this._oscillator.frequency), 
      this.detune.connect(this._oscillator.detune), 
      // start the oscillator
      this._oscillator.start(computedTime);
    }
    /**
       * stop the oscillator
       */    _stop(time) {
      const computedTime = this.toSeconds(time);
      this._oscillator && this._oscillator.stop(computedTime);
    }
    /**
       * Restart the oscillator. Does not stop the oscillator, but instead
       * just cancels any scheduled 'stop' from being invoked.
       */    _restart(time) {
      const computedTime = this.toSeconds(time);
      return this.log("restart", computedTime), this._oscillator && this._oscillator.cancelStop(), 
      this._state.cancel(computedTime), this;
    }
    /**
       * Sync the signal to the Transport's bpm. Any changes to the transports bpm,
       * will also affect the oscillators frequency.
       * @example
       * const osc = new Tone.Oscillator().toDestination().start();
       * osc.frequency.value = 440;
       * // the ratio between the bpm and the frequency will be maintained
       * osc.syncFrequency();
       * // double the tempo
       * Tone.Transport.bpm.value *= 2;
       * // the frequency of the oscillator is doubled to 880
       */    syncFrequency() {
      return this.context.transport.syncSignal(this.frequency), this;
    }
    /**
       * Unsync the oscillator's frequency from the Transport.
       * @see {@link syncFrequency}
       */    unsyncFrequency() {
      return this.context.transport.unsyncSignal(this.frequency), this;
    }
    /**
       * Get a cached periodic wave. Avoids having to recompute
       * the oscillator values when they have already been computed
       * with the same values.
       */    _getCachedPeriodicWave() {
      if ("custom" === this._type) {
        return Oscillator._periodicWaveCache.find((description => {
          return description.phase === this._phase && (arrayA = description.partials, arrayB = this._partials, 
          arrayA.length === arrayB.length && arrayA.every(((element, index) => arrayB[index] === element)));
          var arrayA, arrayB;
        }));
      }
      {
        const oscProps = Oscillator._periodicWaveCache.find((description => description.type === this._type && description.phase === this._phase));
        return this._partialCount = oscProps ? oscProps.partialCount : this._partialCount, 
        oscProps;
      }
    }
    get type() {
      return this._type;
    }
    set type(type) {
      this._type = type;
      const isBasicType = -1 !== [ "sine", "square", "sawtooth", "triangle" ].indexOf(type);
      if (0 === this._phase && isBasicType) this._wave = void 0, this._partialCount = 0, 
      // just go with the basic approach
      null !== this._oscillator && (
      // already tested that it's a basic type
      this._oscillator.type = type); else {
        // first check if the value is cached
        const cache = this._getCachedPeriodicWave();
        if (isDefined(cache)) {
          const {partials: partials, wave: wave} = cache;
          this._wave = wave, this._partials = partials, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave);
        } else {
          const [real, imag] = this._getRealImaginary(type, this._phase);
          const periodicWave = this.context.createPeriodicWave(real, imag);
          this._wave = periodicWave, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave), 
          // set the cache
          Oscillator._periodicWaveCache.push({
            imag: imag,
            partialCount: this._partialCount,
            partials: this._partials,
            phase: this._phase,
            real: real,
            type: this._type,
            wave: this._wave
          }), Oscillator._periodicWaveCache.length > 100 && Oscillator._periodicWaveCache.shift();
        }
      }
    }
    get baseType() {
      return this._type.replace(this.partialCount.toString(), "");
    }
    set baseType(baseType) {
      this.partialCount && "custom" !== this._type && "custom" !== baseType ? this.type = baseType + this.partialCount : this.type = baseType;
    }
    get partialCount() {
      return this._partialCount;
    }
    set partialCount(p) {
      assertRange(p, 0);
      let type = this._type;
      const partial = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);
      if (partial && (type = partial[1]), "custom" !== this._type) this.type = 0 === p ? type : type + p.toString(); else {
        // extend or shorten the partials array
        const fullPartials = new Float32Array(p);
        // copy over the partials array
                this._partials.forEach(((v, i) => fullPartials[i] = v)), this._partials = Array.from(fullPartials), 
        this.type = this._type;
      }
    }
    /**
       * Returns the real and imaginary components based
       * on the oscillator type.
       * @returns [real: Float32Array, imaginary: Float32Array]
       */    _getRealImaginary(type, phase) {
      let periodicWaveSize = 2048;
      const real = new Float32Array(periodicWaveSize);
      const imag = new Float32Array(periodicWaveSize);
      let partialCount = 1;
      if ("custom" === type) {
        // if the partial count is 0, don't bother doing any computation
        if (partialCount = this._partials.length + 1, this._partialCount = this._partials.length, 
        periodicWaveSize = partialCount, 0 === this._partials.length) return [ real, imag ];
      } else {
        const partial = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(type);
        partial ? (partialCount = parseInt(partial[2], 10) + 1, this._partialCount = parseInt(partial[2], 10), 
        type = partial[1], partialCount = Math.max(partialCount, 2), periodicWaveSize = partialCount) : this._partialCount = 0, 
        this._partials = [];
      }
      for (let n = 1; n < periodicWaveSize; ++n) {
        const piFactor = 2 / (n * Math.PI);
        let b;
        switch (type) {
         case "sine":
          b = n <= partialCount ? 1 : 0, this._partials[n - 1] = b;
          break;

         case "square":
          b = 1 & n ? 2 * piFactor : 0, this._partials[n - 1] = b;
          break;

         case "sawtooth":
          b = piFactor * (1 & n ? 1 : -1), this._partials[n - 1] = b;
          break;

         case "triangle":
          b = 1 & n ? piFactor * piFactor * 2 * (n - 1 >> 1 & 1 ? -1 : 1) : 0, this._partials[n - 1] = b;
          break;

         case "custom":
          b = this._partials[n - 1];
          break;

         default:
          throw new TypeError("Oscillator: invalid type: " + type);
        }
        0 !== b ? (real[n] = -b * Math.sin(phase * n), imag[n] = b * Math.cos(phase * n)) : (real[n] = 0, 
        imag[n] = 0);
      }
      return [ real, imag ];
    }
    /**
       * Compute the inverse FFT for a given phase.
       */    _inverseFFT(real, imag, phase) {
      let sum = 0;
      const len = real.length;
      for (let i = 0; i < len; i++) sum += real[i] * Math.cos(i * phase) + imag[i] * Math.sin(i * phase);
      return sum;
    }
    /**
       * Returns the initial value of the oscillator when stopped.
       * E.g. a "sine" oscillator with phase = 90 would return an initial value of -1.
       */    getInitialValue() {
      const [real, imag] = this._getRealImaginary(this._type, 0);
      let maxValue = 0;
      const twoPi = 2 * Math.PI;
      // check for peaks in 16 places
      for (let i = 0; i < 32; i++) maxValue = Math.max(this._inverseFFT(real, imag, i / 32 * twoPi), maxValue);
      return value = -this._inverseFFT(real, imag, this._phase) / maxValue, min = -1, 
      max = 1, Math.max(Math.min(value, max), min);
      var value, min, max;
    }
    get partials() {
      return this._partials.slice(0, this.partialCount);
    }
    set partials(partials) {
      this._partials = partials, this._partialCount = this._partials.length, partials.length && (this.type = "custom");
    }
    get phase() {
      return this._phase * (180 / Math.PI);
    }
    set phase(phase) {
      this._phase = phase * Math.PI / 180, 
      // reset the type
      this.type = this._type;
    }
    asArray() {
      return __awaiter(this, arguments, void 0, (function*(length = 1024) {
        return (function(instance, length) {
          return __awaiter(this, void 0, void 0, (function*() {
            const duration = length / instance.context.sampleRate;
            const context = new OfflineContext(1, duration, instance.context.sampleRate);
            return new instance.constructor(Object.assign(instance.get(), {
              // should do 2 iterations
              frequency: 2 / duration,
              // zero out the detune
              detune: 0,
              context: context
            })).toDestination().start(0), (yield context.render()).getChannelData(0);
          }));
        })(this, length);
      }));
    }
    dispose() {
      return super.dispose(), null !== this._oscillator && this._oscillator.dispose(), 
      this._wave = void 0, this.frequency.dispose(), this.detune.dispose(), this;
    }
  };
  /**
   * Cache the periodic waves to avoid having to redo computations
   */  Oscillator$1._periodicWaveCache = [];
  class Oscillator {
    constructor(frequency = 440, type = "sine") {
      if ("string" == typeof frequency && "string" == typeof type) {
        let f = frequency;
        frequency = 440, type = f;
      }
      if ("string" == typeof frequency && "number" == typeof type) {
        let t = type;
        type = frequency, frequency = t;
      }
      this.frequency = frequency, this.type = type, this.osc = (new Oscillator$1).toDestination(), 
      this.osc.frequency.value = this.frequency, this.osc.type = this.type, this.osc.volume.value = -6;
    }
    /**
     * Adjusts the frequency of the oscillator.
     * @method freq
     * @for Oscillator
     * @param {Number} frequency frequency of the oscillator in Hz (cycles per second). 
     */    freq(f, p = .1) {
      this.osc.frequency.rampTo(clamp(f, 0, 24e3), p);
    }
    /**
     * Adjusts the phase of the oscillator.
     * @method phase
     * @for Oscillator
     * @param {Number} phase phase of the oscillator in degrees (0-360). 
     */    phase(p) {
      this.osc.phase = p;
    }
    /**
     * Sets the type of the oscillator. 
     * @method setType
     * @for Oscillator
     * @param {String} type type of the oscillator. Options:
     *                 'sine' (default), 'triangle',
     *                 'sawtooth', 'square'
     */    setType(t) {
      this.osc.type = t;
    }
    /**
     * Adjust the amplitude of the Oscillator.
     * @method amp
     * @for Oscillator
     * @param {Number} amplitude Set the amplitude between 0 and 1.0. Or, pass in an object such as an oscillator to modulate amplitude with an audio signal.
     * @example
     * <div>
     * <code>
     * let osc, lfo;
     * let cnv;
     * 
     * function setup() {
     *   describe("a sketch that demonstrates amplitude modulation with an LFO and sine tone");
     *   cnv = createCanvas(100, 100);
     *   cnv.mousePressed(startSound);
     *   textAlign(CENTER);
     *   textWrap(WORD);
     *   textSize(10);
     *   
     *   osc = new Oscillator('sine');
     *   lfo = new Oscillator(1);
     *   lfo.disconnect();
     *   osc.amp(lfo);
     * }
     * 
     * function startSound() {
     *   lfo.start();
     *   osc.start();
     * }
     * 
     * function draw(){
     *   background(220);
     *   text('click to play sound', 0, height/2 - 20, 100);
     *   text('control lfo with mouseX position', 0, height/2, 100);
     * 
     *   let freq = map(mouseX, 0, width, 0, 10);
     *   lfo.freq(freq);
     * }
     * </code>
     * </div>
     */    amp(value, p = .1) {
      //if value is an object (i.e. audio signal such as an LFO), connect it to the oscillator's volume
      if ("object" == typeof value) return void value.getNode().connect(this.osc.volume);
      let dbValue = gainToDb(value);
      this.osc.volume.rampTo(dbValue, p);
    }
    /**
     * Starts the oscillator. Usually from user gesture.
     * @method start
     * @for Oscillator
     * @example
     * <div>
     * <code>
     * let osc;
     * 
     * function setup() {
     *   let cnv = createCanvas(100, 100);
     *   cnv.mousePressed(startOscillator);
     *   osc = new Oscillator();
     * }
     * 
     * function startOscillator() {
     *   osc.start();
     * }
     * </code>
     * </div>
     */    start() {
      this.osc.start();
    }
    /**
     * Stops the oscillator.
     * @method stop
     * @for Oscillator
     */    stop() {
      this.osc.stop();
    }
    connect(destination) {
      this.osc.connect(destination.getNode());
    }
    disconnect() {
      this.osc.disconnect(Context.destination);
    }
    getNode() {
      return this.osc;
    }
  }
  /**
   * Creates a sawtooth oscillator.
   * @class SawOsc
   * @constructor
   * @extends Oscillator
   * @param {Number} [freq] Set the frequency
   */  let Envelope$1 = class Envelope extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Envelope.getDefaults(), arguments, [ "attack", "decay", "sustain", "release" ]);
      super(options), this.name = "Envelope", 
      /**
           * the signal which is output.
           */
      this._sig = new Signal({
        context: this.context,
        value: 0
      }), 
      /**
           * The output signal of the envelope
           */
      this.output = this._sig, 
      /**
           * Envelope has no input
           */
      this.input = void 0, this.attack = options.attack, this.decay = options.decay, this.sustain = options.sustain, 
      this.release = options.release, this.attackCurve = options.attackCurve, this.releaseCurve = options.releaseCurve, 
      this.decayCurve = options.decayCurve;
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        attack: .01,
        attackCurve: "linear",
        decay: .1,
        decayCurve: "exponential",
        release: 1,
        releaseCurve: "exponential",
        sustain: .5
      });
    }
    /**
       * Read the current value of the envelope. Useful for
       * synchronizing visual output to the envelope.
       */    get value() {
      return this.getValueAtTime(this.now());
    }
    /**
       * Get the curve
       * @param  curve
       * @param  direction  In/Out
       * @return The curve name
       */    _getCurve(curve, direction) {
      if (isString(curve)) return curve;
      {
        // look up the name in the curves array
        let curveName;
        for (curveName in EnvelopeCurves) if (EnvelopeCurves[curveName][direction] === curve) return curveName;
        // return the custom curve
                return curve;
      }
    }
    /**
       * Assign a the curve to the given name using the direction
       * @param  name
       * @param  direction In/Out
       * @param  curve
       */    _setCurve(name, direction, curve) {
      // check if it's a valid type
      if (isString(curve) && Reflect.has(EnvelopeCurves, curve)) {
        const curveDef = EnvelopeCurves[curve];
        isObject(curveDef) ? "_decayCurve" !== name && (this[name] = curveDef[direction]) : this[name] = curveDef;
      } else {
        if (!isArray(curve) || "_decayCurve" === name) throw new Error("Envelope: invalid curve: " + curve);
        this[name] = curve;
      }
    }
    /**
       * The shape of the attack.
       * Can be any of these strings:
       * * "linear"
       * * "exponential"
       * * "sine"
       * * "cosine"
       * * "bounce"
       * * "ripple"
       * * "step"
       *
       * Can also be an array which describes the curve. Values
       * in the array are evenly subdivided and linearly
       * interpolated over the duration of the attack.
       * @example
       * return Tone.Offline(() => {
       * 	const env = new Tone.Envelope(0.4).toDestination();
       * 	env.attackCurve = "linear";
       * 	env.triggerAttack();
       * }, 1, 1);
       */    get attackCurve() {
      return this._getCurve(this._attackCurve, "In");
    }
    set attackCurve(curve) {
      this._setCurve("_attackCurve", "In", curve);
    }
    /**
       * The shape of the release. See the attack curve types.
       * @example
       * return Tone.Offline(() => {
       * 	const env = new Tone.Envelope({
       * 		release: 0.8
       * 	}).toDestination();
       * 	env.triggerAttack();
       * 	// release curve could also be defined by an array
       * 	env.releaseCurve = [1, 0.3, 0.4, 0.2, 0.7, 0];
       * 	env.triggerRelease(0.2);
       * }, 1, 1);
       */    get releaseCurve() {
      return this._getCurve(this._releaseCurve, "Out");
    }
    set releaseCurve(curve) {
      this._setCurve("_releaseCurve", "Out", curve);
    }
    /**
       * The shape of the decay either "linear" or "exponential"
       * @example
       * return Tone.Offline(() => {
       * 	const env = new Tone.Envelope({
       * 		sustain: 0.1,
       * 		decay: 0.5
       * 	}).toDestination();
       * 	env.decayCurve = "linear";
       * 	env.triggerAttack();
       * }, 1, 1);
       */    get decayCurve() {
      return this._getCurve(this._decayCurve, "Out");
    }
    set decayCurve(curve) {
      this._setCurve("_decayCurve", "Out", curve);
    }
    /**
       * Trigger the attack/decay portion of the ADSR envelope.
       * @param  time When the attack should start.
       * @param velocity The velocity of the envelope scales the vales.
       *                             number between 0-1
       * @example
       * const env = new Tone.AmplitudeEnvelope().toDestination();
       * const osc = new Tone.Oscillator().connect(env).start();
       * // trigger the attack 0.5 seconds from now with a velocity of 0.2
       * env.triggerAttack("+0.5", 0.2);
       */    triggerAttack(time, velocity = 1) {
      this.log("triggerAttack", time, velocity), time = this.toSeconds(time);
      let attack = this.toSeconds(this.attack);
      const decay = this.toSeconds(this.decay);
      // check if it's not a complete attack
            const currentValue = this.getValueAtTime(time);
      if (currentValue > 0) {
        // the attack is now the remaining time
        attack = (1 - currentValue) / (1 / attack);
      }
      // attack
            if (attack < this.sampleTime) this._sig.cancelScheduledValues(time), 
      // case where the attack time is 0 should set instantly
      this._sig.setValueAtTime(velocity, time); else if ("linear" === this._attackCurve) this._sig.linearRampTo(velocity, attack, time); else if ("exponential" === this._attackCurve) this._sig.targetRampTo(velocity, attack, time); else {
        this._sig.cancelAndHoldAtTime(time);
        let curve = this._attackCurve;
        // find the starting position in the curve
                for (let i = 1; i < curve.length; i++) 
        // the starting index is between the two values
        if (curve[i - 1] <= currentValue && currentValue <= curve[i]) {
          curve = this._attackCurve.slice(i), 
          // the first index is the current value
          curve[0] = currentValue;
          break;
        }
        this._sig.setValueCurveAtTime(curve, time, attack, velocity);
      }
      // decay
            if (decay && this.sustain < 1) {
        const decayValue = velocity * this.sustain;
        const decayStart = time + attack;
        this.log("decay", decayStart), "linear" === this._decayCurve ? this._sig.linearRampToValueAtTime(decayValue, decay + decayStart) : this._sig.exponentialApproachValueAtTime(decayValue, decayStart, decay);
      }
      return this;
    }
    /**
       * Triggers the release of the envelope.
       * @param  time When the release portion of the envelope should start.
       * @example
       * const env = new Tone.AmplitudeEnvelope().toDestination();
       * const osc = new Tone.Oscillator({
       * 	type: "sawtooth"
       * }).connect(env).start();
       * env.triggerAttack();
       * // trigger the release half a second after the attack
       * env.triggerRelease("+0.5");
       */    triggerRelease(time) {
      this.log("triggerRelease", time), time = this.toSeconds(time);
      const currentValue = this.getValueAtTime(time);
      if (currentValue > 0) {
        const release = this.toSeconds(this.release);
        release < this.sampleTime ? this._sig.setValueAtTime(0, time) : "linear" === this._releaseCurve ? this._sig.linearRampTo(0, release, time) : "exponential" === this._releaseCurve ? this._sig.targetRampTo(0, release, time) : (assert(isArray(this._releaseCurve), "releaseCurve must be either 'linear', 'exponential' or an array"), 
        this._sig.cancelAndHoldAtTime(time), this._sig.setValueCurveAtTime(this._releaseCurve, time, release, currentValue));
      }
      return this;
    }
    /**
       * Get the scheduled value at the given time. This will
       * return the unconverted (raw) value.
       * @example
       * const env = new Tone.Envelope(0.5, 1, 0.4, 2);
       * env.triggerAttackRelease(2);
       * setInterval(() => console.log(env.getValueAtTime(Tone.now())), 100);
       */    getValueAtTime(time) {
      return this._sig.getValueAtTime(time);
    }
    /**
       * triggerAttackRelease is shorthand for triggerAttack, then waiting
       * some duration, then triggerRelease.
       * @param duration The duration of the sustain.
       * @param time When the attack should be triggered.
       * @param velocity The velocity of the envelope.
       * @example
       * const env = new Tone.AmplitudeEnvelope().toDestination();
       * const osc = new Tone.Oscillator().connect(env).start();
       * // trigger the release 0.5 seconds after the attack
       * env.triggerAttackRelease(0.5);
       */    triggerAttackRelease(duration, time, velocity = 1) {
      return time = this.toSeconds(time), this.triggerAttack(time, velocity), this.triggerRelease(time + this.toSeconds(duration)), 
      this;
    }
    /**
       * Cancels all scheduled envelope changes after the given time.
       */    cancel(after) {
      return this._sig.cancelScheduledValues(this.toSeconds(after)), this;
    }
    /**
       * Connect the envelope to a destination node.
       */    connect(destination, outputNumber = 0, inputNumber = 0) {
      return connectSignal(this, destination, outputNumber, inputNumber), this;
    }
    /**
       * Render the envelope curve to an array of the given length.
       * Good for visualizing the envelope curve. Rescales the duration of the
       * envelope to fit the length.
       */    asArray() {
      return __awaiter(this, arguments, void 0, (function*(length = 1024) {
        const duration = length / this.context.sampleRate;
        const context = new OfflineContext(1, duration, this.context.sampleRate);
        // normalize the ADSR for the given duration with 20% sustain time
                const attackPortion = this.toSeconds(this.attack) + this.toSeconds(this.decay);
        const envelopeDuration = attackPortion + this.toSeconds(this.release);
        const sustainTime = .1 * envelopeDuration;
        const totalDuration = envelopeDuration + sustainTime;
        // @ts-ignore
                const clone = new this.constructor(Object.assign(this.get(), {
          attack: duration * this.toSeconds(this.attack) / totalDuration,
          decay: duration * this.toSeconds(this.decay) / totalDuration,
          release: duration * this.toSeconds(this.release) / totalDuration,
          context: context
        }));
        clone._sig.toDestination(), clone.triggerAttackRelease(duration * (attackPortion + sustainTime) / totalDuration, 0);
        return (yield context.render()).getChannelData(0);
      }));
    }
    dispose() {
      return super.dispose(), this._sig.dispose(), this;
    }
  };
  __decorate([ timeRange(0) ], Envelope$1.prototype, "attack", void 0), __decorate([ timeRange(0) ], Envelope$1.prototype, "decay", void 0), 
  __decorate([ (
  /**
   * Assert that the number is in the given range.
   */
  function(min, max = 1 / 0) {
    const valueMap = new WeakMap;
    return function(target, propertyKey) {
      Reflect.defineProperty(target, propertyKey, {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return valueMap.get(this);
        },
        set: function(newValue) {
          assertRange(newValue, min, max), valueMap.set(this, newValue);
        }
      });
    };
  })(0, 1) ], Envelope$1.prototype, "sustain", void 0), __decorate([ timeRange(0) ], Envelope$1.prototype, "release", void 0);
  /**
   * Generate some complex envelope curves.
   */
  const EnvelopeCurves = (() => {
    /**
       * Invert a value curve to make it work for the release
       */
    function invertCurve(curve) {
      const out = new Array(curve.length);
      for (let j = 0; j < curve.length; j++) out[j] = 1 - curve[j];
      return out;
    }
    /**
       * reverse the curve
       */    let i;
    let k;
    // cosine curve
        const cosineCurve = [];
    for (i = 0; i < 128; i++) cosineCurve[i] = Math.sin(i / 127 * (Math.PI / 2));
    // ripple curve
        const rippleCurve = [];
    for (i = 0; i < 127; i++) {
      k = i / 127;
      const sineWave = Math.sin(k * (2 * Math.PI) * 6.4 - Math.PI / 2) + 1;
      rippleCurve[i] = sineWave / 10 + .83 * k;
    }
    rippleCurve[127] = 1;
    // stairs curve
    const stairsCurve = [];
    for (i = 0; i < 128; i++) stairsCurve[i] = Math.ceil(i / 127 * 5) / 5;
    // in-out easing curve
        const sineCurve = [];
    for (i = 0; i < 128; i++) k = i / 127, sineCurve[i] = .5 * (1 - Math.cos(Math.PI * k));
    // a bounce curve
        const bounceCurve = [];
    for (i = 0; i < 128; i++) {
      k = i / 127;
      const freq = 4 * Math.pow(k, 3) + .2;
      const val = Math.cos(freq * Math.PI * 2 * k);
      bounceCurve[i] = Math.abs(val * (1 - k));
    }
    /**
       * attack and release curve arrays
       */
    return {
      bounce: {
        In: invertCurve(bounceCurve),
        Out: bounceCurve
      },
      cosine: {
        In: cosineCurve,
        Out: (curve = cosineCurve, curve.slice(0).reverse())
      },
      exponential: "exponential",
      linear: "linear",
      ripple: {
        In: rippleCurve,
        Out: invertCurve(rippleCurve)
      },
      sine: {
        In: sineCurve,
        Out: invertCurve(sineCurve)
      },
      step: {
        In: stairsCurve,
        Out: invertCurve(stairsCurve)
      }
    };
    var curve;
  })();
  /**
   * AmplitudeEnvelope is a Tone.Envelope connected to a gain node.
   * Unlike Tone.Envelope, which outputs the envelope's value, AmplitudeEnvelope accepts
   * an audio signal as the input and will apply the envelope to the amplitude
   * of the signal.
   * Read more about ADSR Envelopes on [Wikipedia](https://en.wikipedia.org/wiki/Synthesizer#ADSR_envelope).
   *
   * @example
   * return Tone.Offline(() => {
   * 	const ampEnv = new Tone.AmplitudeEnvelope({
   * 		attack: 0.1,
   * 		decay: 0.2,
   * 		sustain: 1.0,
   * 		release: 0.8
   * 	}).toDestination();
   * 	// create an oscillator and connect it
   * 	const osc = new Tone.Oscillator().connect(ampEnv).start();
   * 	// trigger the envelopes attack and release "8t" apart
   * 	ampEnv.triggerAttackRelease("8t");
   * }, 1.5, 1);
   * @category Component
   */  class AmplitudeEnvelope extends Envelope$1 {
    constructor() {
      super(optionsFromArguments(AmplitudeEnvelope.getDefaults(), arguments, [ "attack", "decay", "sustain", "release" ])), 
      this.name = "AmplitudeEnvelope", this._gainNode = new Gain$1({
        context: this.context,
        gain: 0
      }), this.output = this._gainNode, this.input = this._gainNode, this._sig.connect(this._gainNode.gain), 
      this.output = this._gainNode, this.input = this._gainNode;
    }
    /**
       * Clean up
       */    dispose() {
      return super.dispose(), this._gainNode.dispose(), this;
    }
  }
  /**
   * Generate an amplitude envelope.
   * @class Envelope
   * @constructor
   * @param {Number} [attack] how quickly the envelope reaches the maximum level
   * @param {Number} [decay] how quickly the envelope reaches the sustain level
   * @param {Number} [sustain] how long the envelope stays at the decay level
   * @param {Number} [release] how quickly the envelope fades out after the sustain level
   * @example
   * <div>
   * <code>
   * consoe.log('do an example here');
   * </code>
   * </div>
   */  
  /**
   * Wrapper around Web Audio's native [DelayNode](http://webaudio.github.io/web-audio-api/#the-delaynode-interface).
   * @category Core
   * @example
   * return Tone.Offline(() => {
   * 	const delay = new Tone.Delay(0.1).toDestination();
   * 	// connect the signal to both the delay and the destination
   * 	const pulse = new Tone.PulseOscillator().connect(delay).toDestination();
   * 	// start and stop the pulse
   * 	pulse.start(0).stop(0.01);
   * }, 0.5, 1);
   */
  let Delay$1 = class Delay extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Delay.getDefaults(), arguments, [ "delayTime", "maxDelay" ]);
      super(options), this.name = "Delay";
      const maxDelayInSeconds = this.toSeconds(options.maxDelay);
      this._maxDelay = Math.max(maxDelayInSeconds, this.toSeconds(options.delayTime)), 
      this._delayNode = this.input = this.output = this.context.createDelay(maxDelayInSeconds), 
      this.delayTime = new Param({
        context: this.context,
        param: this._delayNode.delayTime,
        units: "time",
        value: options.delayTime,
        minValue: 0,
        maxValue: this.maxDelay
      }), readOnly(this, "delayTime");
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        delayTime: 0,
        maxDelay: 1
      });
    }
    /**
       * The maximum delay time. This cannot be changed after
       * the value is passed into the constructor.
       */    get maxDelay() {
      return this._maxDelay;
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this._delayNode.disconnect(), this.delayTime.dispose(), 
      this;
    }
  };
  /**
   * GainToAudio converts an input in NormalRange [0,1] to AudioRange [-1,1].
   * @see {@link AudioToGain}.
   * @category Signal
   */  class GainToAudio extends SignalOperator {
    constructor() {
      super(...arguments), this.name = "GainToAudio", 
      /**
           * The node which converts the audio ranges
           */
      this._norm = new WaveShaper({
        context: this.context,
        mapping: x => 2 * Math.abs(x) - 1
      }), 
      /**
           * The NormalRange input [0, 1]
           */
      this.input = this._norm, 
      /**
           * The AudioRange output [-1, 1]
           */
      this.output = this._norm;
    }
    /**
       * clean up
       */    dispose() {
      return super.dispose(), this._norm.dispose(), this;
    }
  }
  /**
   * Tone.Crossfade provides equal power fading between two inputs.
   * More on crossfading technique [here](https://en.wikipedia.org/wiki/Fade_(audio_engineering)#Crossfading).
   * ```
   *                                             +---------+
   *                                            +> input a +>--+
   * +-----------+   +---------------------+     |         |   |
   * | 1s signal +>--> stereoPannerNode  L +>----> gain    |   |
   * +-----------+   |                     |     +---------+   |
   *               +-> pan               R +>-+                |   +--------+
   *               | +---------------------+  |                +---> output +>
   *  +------+     |                          |  +---------+   |   +--------+
   *  | fade +>----+                          | +> input b +>--+
   *  +------+                                |  |         |
   *                                          +--> gain    |
   *                                             +---------+
   * ```
   * @example
   * const crossFade = new Tone.CrossFade().toDestination();
   * // connect two inputs Tone.to a/b
   * const inputA = new Tone.Oscillator(440, "square").connect(crossFade.a).start();
   * const inputB = new Tone.Oscillator(440, "sine").connect(crossFade.b).start();
   * // use the fade to control the mix between the two
   * crossFade.fade.value = 0.5;
   * @category Component
   */  class CrossFade extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(CrossFade.getDefaults(), arguments, [ "fade" ]);
      super(options), this.name = "CrossFade", 
      /**
           * The crossfading is done by a StereoPannerNode
           */
      this._panner = this.context.createStereoPanner(), 
      /**
           * Split the output of the panner node into two values used to control the gains.
           */
      this._split = this.context.createChannelSplitter(2), 
      /**
           * Convert the fade value into an audio range value so it can be connected
           * to the panner.pan AudioParam
           */
      this._g2a = new GainToAudio({
        context: this.context
      }), 
      /**
           * The input which is at full level when fade = 0
           */
      this.a = new Gain$1({
        context: this.context,
        gain: 0
      }), 
      /**
           * The input which is at full level when fade = 1
           */
      this.b = new Gain$1({
        context: this.context,
        gain: 0
      }), 
      /**
           * The output is a mix between `a` and `b` at the ratio of `fade`
           */
      this.output = new Gain$1({
        context: this.context
      }), this._internalChannels = [ this.a, this.b ], this.fade = new Signal({
        context: this.context,
        units: "normalRange",
        value: options.fade
      }), readOnly(this, "fade"), this.context.getConstant(1).connect(this._panner), this._panner.connect(this._split), 
      // this is necessary for standardized-audio-context
      // doesn't make any difference for the native AudioContext
      // https://github.com/chrisguttandin/standardized-audio-context/issues/647
      this._panner.channelCount = 1, this._panner.channelCountMode = "explicit", connect(this._split, this.a.gain, 0), 
      connect(this._split, this.b.gain, 1), this.fade.chain(this._g2a, this._panner.pan), 
      this.a.connect(this.output), this.b.connect(this.output);
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        fade: .5
      });
    }
    dispose() {
      return super.dispose(), this.a.dispose(), this.b.dispose(), this.output.dispose(), 
      this.fade.dispose(), this._g2a.dispose(), this._panner.disconnect(), this._split.disconnect(), 
      this;
    }
  }
  /**
   * Effect is the base class for effects. Connect the effect between
   * the effectSend and effectReturn GainNodes, then control the amount of
   * effect which goes to the output using the wet control.
   */  class Effect extends ToneAudioNode {
    constructor(options) {
      super(options), this.name = "Effect", 
      /**
           * the drywet knob to control the amount of effect
           */
      this._dryWet = new CrossFade({
        context: this.context
      }), 
      /**
           * The wet control is how much of the effected
           * will pass through to the output. 1 = 100% effected
           * signal, 0 = 100% dry signal.
           */
      this.wet = this._dryWet.fade, 
      /**
           * connect the effectSend to the input of hte effect
           */
      this.effectSend = new Gain$1({
        context: this.context
      }), 
      /**
           * connect the output of the effect to the effectReturn
           */
      this.effectReturn = new Gain$1({
        context: this.context
      }), 
      /**
           * The effect input node
           */
      this.input = new Gain$1({
        context: this.context
      }), 
      /**
           * The effect output
           */
      this.output = this._dryWet, 
      // connections
      this.input.fan(this._dryWet.a, this.effectSend), this.effectReturn.connect(this._dryWet.b), 
      this.wet.setValueAtTime(options.wet, 0), this._internalChannels = [ this.effectReturn, this.effectSend ], 
      readOnly(this, "wet");
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        wet: 1
      });
    }
    /**
       * chains the effect in between the effectSend and effectReturn
       */    connectEffect(effect) {
      // add it to the internal channels
      return this._internalChannels.push(effect), this.effectSend.chain(effect, this.effectReturn), 
      this;
    }
    dispose() {
      return super.dispose(), this._dryWet.dispose(), this.effectSend.dispose(), this.effectReturn.dispose(), 
      this.wet.dispose(), this;
    }
  }
  /**
   * FeedbackEffect provides a loop between an audio source and its own output.
   * This is a base-class for feedback effects.
   */  class FeedbackEffect extends Effect {
    constructor(options) {
      super(options), this.name = "FeedbackEffect", this._feedbackGain = new Gain$1({
        context: this.context,
        gain: options.feedback,
        units: "normalRange"
      }), this.feedback = this._feedbackGain.gain, readOnly(this, "feedback"), 
      // the feedback loop
      this.effectReturn.chain(this._feedbackGain, this.effectSend);
    }
    static getDefaults() {
      return Object.assign(Effect.getDefaults(), {
        feedback: .125
      });
    }
    dispose() {
      return super.dispose(), this._feedbackGain.dispose(), this.feedback.dispose(), this;
    }
  }
  /**
   * FeedbackDelay is a DelayNode in which part of output signal is fed back into the delay.
   *
   * @param delayTime The delay applied to the incoming signal.
   * @param feedback The amount of the effected signal which is fed back through the delay.
   * @example
   * const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
   * const tom = new Tone.MembraneSynth({
   * 	octaves: 4,
   * 	pitchDecay: 0.1
   * }).connect(feedbackDelay);
   * tom.triggerAttackRelease("A2", "32n");
   * @category Effect
   */  class FeedbackDelay extends FeedbackEffect {
    constructor() {
      const options = optionsFromArguments(FeedbackDelay.getDefaults(), arguments, [ "delayTime", "feedback" ]);
      super(options), this.name = "FeedbackDelay", this._delayNode = new Delay$1({
        context: this.context,
        delayTime: options.delayTime,
        maxDelay: options.maxDelay
      }), this.delayTime = this._delayNode.delayTime, 
      // connect it up
      this.connectEffect(this._delayNode), readOnly(this, "delayTime");
    }
    static getDefaults() {
      return Object.assign(FeedbackEffect.getDefaults(), {
        delayTime: .25,
        maxDelay: 1
      });
    }
    dispose() {
      return super.dispose(), this._delayNode.dispose(), this.delayTime.dispose(), this;
    }
  }
  /**
   * A delay effect with parameters for feedback, and delay time.
   * @class Delay
   * @constructor
   * @param {Number} [delayTime] The delay time in seconds between 0 and 1. Defaults to 0.250.
   * @param {Number} [feedback] The amount of feedback in the delay line between 0 and 1. Defaults to 0.2.
   * @example
   * <div>
   * <code>
   * let osc;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   background(220);
   *   textAlign(CENTER);
   *   text('tap to play', width/2, height/2);
   * 
   *   osc = new Oscillator('square');
   *   osc.amp(0.5);
   *   delay = new Delay(0.12, 0.7);
   *   
   *   osc.disconnect();
   *   osc.connect(delay);
   * 
   *   cnv.mousePressed(oscStart);
   *   describe('Tap to play a square wave with delay effect.');
   * }
   * 
   * function oscStart() {
   *   osc.start();
   * }
   * 
   * </code>
   * </div>
   * function mouseReleased() {
   *   osc.stop();
   * }
   */  
  /**
   * Merge brings multiple mono input channels into a single multichannel output channel.
   *
   * @example
   * const merge = new Tone.Merge().toDestination();
   * // routing a sine tone in the left channel
   * const osc = new Tone.Oscillator().connect(merge, 0, 0).start();
   * // and noise in the right channel
   * const noise = new Tone.Noise().connect(merge, 0, 1).start();;
   * @category Component
   */
  class Merge extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Merge.getDefaults(), arguments, [ "channels" ]);
      super(options), this.name = "Merge", this._merger = this.output = this.input = this.context.createChannelMerger(options.channels);
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        channels: 2
      });
    }
    dispose() {
      return super.dispose(), this._merger.disconnect(), this;
    }
  }
  /**
   * Wrapper around the native BufferSourceNode.
   * @category Source
   */  class ToneBufferSource extends OneShotSource {
    constructor() {
      const options = optionsFromArguments(ToneBufferSource.getDefaults(), arguments, [ "url", "onload" ]);
      super(options), this.name = "ToneBufferSource", 
      /**
           * The oscillator
           */
      this._source = this.context.createBufferSource(), this._internalChannels = [ this._source ], 
      /**
           * indicators if the source has started/stopped
           */
      this._sourceStarted = !1, this._sourceStopped = !1, connect(this._source, this._gainNode), 
      this._source.onended = () => this._stopSource()
      /**
           * The playbackRate of the buffer
           */ , this.playbackRate = new Param({
        context: this.context,
        param: this._source.playbackRate,
        units: "positive",
        value: options.playbackRate
      }), 
      // set some values initially
      this.loop = options.loop, this.loopStart = options.loopStart, this.loopEnd = options.loopEnd, 
      this._buffer = new ToneAudioBuffer(options.url, options.onload, options.onerror), 
      this._internalChannels.push(this._source);
    }
    static getDefaults() {
      return Object.assign(OneShotSource.getDefaults(), {
        url: new ToneAudioBuffer,
        loop: !1,
        loopEnd: 0,
        loopStart: 0,
        onload: noOp,
        onerror: noOp,
        playbackRate: 1
      });
    }
    /**
       * The fadeIn time of the amplitude envelope.
       */    get fadeIn() {
      return this._fadeIn;
    }
    set fadeIn(t) {
      this._fadeIn = t;
    }
    /**
       * The fadeOut time of the amplitude envelope.
       */    get fadeOut() {
      return this._fadeOut;
    }
    set fadeOut(t) {
      this._fadeOut = t;
    }
    /**
       * The curve applied to the fades, either "linear" or "exponential"
       */    get curve() {
      return this._curve;
    }
    set curve(t) {
      this._curve = t;
    }
    /**
       * Start the buffer
       * @param  time When the player should start.
       * @param  offset The offset from the beginning of the sample to start at.
       * @param  duration How long the sample should play. If no duration is given, it will default to the full length of the sample (minus any offset)
       * @param  gain  The gain to play the buffer back at.
       */    start(time, offset, duration, gain = 1) {
      assert(this.buffer.loaded, "buffer is either not set or not loaded");
      const computedTime = this.toSeconds(time);
      // apply the gain envelope
            this._startGain(computedTime, gain), 
      // if it's a loop the default offset is the loopstart point
      offset = this.loop ? defaultArg(offset, this.loopStart) : defaultArg(offset, 0);
      // make sure the offset is not less than 0
      let computedOffset = Math.max(this.toSeconds(offset), 0);
      // start the buffer source
            if (this.loop) {
        // modify the offset if it's greater than the loop time
        const loopEnd = this.toSeconds(this.loopEnd) || this.buffer.duration;
        const loopStart = this.toSeconds(this.loopStart);
        const loopDuration = loopEnd - loopStart;
        // move the offset back
                GTE(computedOffset, loopEnd) && (computedOffset = (computedOffset - loopStart) % loopDuration + loopStart), 
        // when the offset is very close to the duration, set it to 0
        EQ(computedOffset, this.buffer.duration) && (computedOffset = 0);
      }
      // this.buffer.loaded would have return false if the AudioBuffer was undefined
            // if a duration is given, schedule a stop
      if (this._source.buffer = this.buffer.get(), this._source.loopEnd = this.toSeconds(this.loopEnd) || this.buffer.duration, 
      LT(computedOffset, this.buffer.duration) && (this._sourceStarted = !0, this._source.start(computedTime, computedOffset)), 
      isDefined(duration)) {
        let computedDur = this.toSeconds(duration);
        // make sure it's never negative
                computedDur = Math.max(computedDur, 0), this.stop(computedTime + computedDur);
      }
      return this;
    }
    _stopSource(time) {
      !this._sourceStopped && this._sourceStarted && (this._sourceStopped = !0, this._source.stop(this.toSeconds(time)), 
      this._onended());
    }
    /**
       * If loop is true, the loop will start at this position.
       */    get loopStart() {
      return this._source.loopStart;
    }
    set loopStart(loopStart) {
      this._source.loopStart = this.toSeconds(loopStart);
    }
    /**
       * If loop is true, the loop will end at this position.
       */    get loopEnd() {
      return this._source.loopEnd;
    }
    set loopEnd(loopEnd) {
      this._source.loopEnd = this.toSeconds(loopEnd);
    }
    /**
       * The audio buffer belonging to the player.
       */    get buffer() {
      return this._buffer;
    }
    set buffer(buffer) {
      this._buffer.set(buffer);
    }
    /**
       * If the buffer should loop once it's over.
       */    get loop() {
      return this._source.loop;
    }
    set loop(loop) {
      this._source.loop = loop, this._sourceStarted && this.cancelStop();
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this._source.onended = null, this._source.disconnect(), 
      this._buffer.dispose(), this.playbackRate.dispose(), this;
    }
  }
  /**
   * Noise is a noise generator. It uses looped noise buffers to save on performance.
   * Noise supports the noise types: "pink", "white", and "brown". Read more about
   * colors of noise on [Wikipedia](https://en.wikipedia.org/wiki/Colors_of_noise).
   *
   * @example
   * // initialize the noise and start
   * const noise = new Tone.Noise("pink").start();
   * // make an autofilter to shape the noise
   * const autoFilter = new Tone.AutoFilter({
   * 	frequency: "8n",
   * 	baseFrequency: 200,
   * 	octaves: 8
   * }).toDestination().start();
   * // connect the noise
   * noise.connect(autoFilter);
   * // start the autofilter LFO
   * autoFilter.start();
   * @category Source
   */  let Noise$1 = class Noise extends Source {
    constructor() {
      const options = optionsFromArguments(Noise.getDefaults(), arguments, [ "type" ]);
      super(options), this.name = "Noise", 
      /**
           * Private reference to the source
           */
      this._source = null, this._playbackRate = options.playbackRate, this.type = options.type, 
      this._fadeIn = options.fadeIn, this._fadeOut = options.fadeOut;
    }
    static getDefaults() {
      return Object.assign(Source.getDefaults(), {
        fadeIn: 0,
        fadeOut: 0,
        playbackRate: 1,
        type: "white"
      });
    }
    /**
       * The type of the noise. Can be "white", "brown", or "pink".
       * @example
       * const noise = new Tone.Noise().toDestination().start();
       * noise.type = "brown";
       */    get type() {
      return this._type;
    }
    set type(type) {
      if (assert(type in _noiseBuffers, "Noise: invalid type: " + type), this._type !== type && (this._type = type, 
      "started" === this.state)) {
        const now = this.now();
        this._stop(now), this._start(now);
      }
    }
    /**
       * The playback rate of the noise. Affects
       * the "frequency" of the noise.
       */    get playbackRate() {
      return this._playbackRate;
    }
    set playbackRate(rate) {
      this._playbackRate = rate, this._source && (this._source.playbackRate.value = rate);
    }
    /**
       * internal start method
       */    _start(time) {
      const buffer = _noiseBuffers[this._type];
      this._source = new ToneBufferSource({
        url: buffer,
        context: this.context,
        fadeIn: this._fadeIn,
        fadeOut: this._fadeOut,
        loop: !0,
        onended: () => this.onstop(this),
        playbackRate: this._playbackRate
      }).connect(this.output), this._source.start(this.toSeconds(time), Math.random() * (buffer.duration - .001));
    }
    /**
       * internal stop method
       */    _stop(time) {
      this._source && (this._source.stop(this.toSeconds(time)), this._source = null);
    }
    /**
       * The fadeIn time of the amplitude envelope.
       */    get fadeIn() {
      return this._fadeIn;
    }
    set fadeIn(time) {
      this._fadeIn = time, this._source && (this._source.fadeIn = this._fadeIn);
    }
    /**
       * The fadeOut time of the amplitude envelope.
       */    get fadeOut() {
      return this._fadeOut;
    }
    set fadeOut(time) {
      this._fadeOut = time, this._source && (this._source.fadeOut = this._fadeOut);
    }
    _restart(time) {
      // TODO could be optimized by cancelling the buffer source 'stop'
      this._stop(time), this._start(time);
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this._source && this._source.disconnect(), this;
    }
  };
  //--------------------
  // THE NOISE BUFFERS
  //--------------------
  // Noise buffer stats
    /**
   * Cache the noise buffers
   */
  const _noiseCache = {
    brown: null,
    pink: null,
    white: null
  };
  /**
   * The noise arrays. Generated on initialization.
   * borrowed heavily from https://github.com/zacharydenton/noise.js
   * (c) 2013 Zach Denton (MIT)
   */  const _noiseBuffers = {
    get brown() {
      if (!_noiseCache.brown) {
        const buffer = [];
        for (let channelNum = 0; channelNum < 2; channelNum++) {
          const channel = new Float32Array(220500);
          buffer[channelNum] = channel;
          let lastOut = 0;
          for (let i = 0; i < 220500; i++) {
            const white = 2 * Math.random() - 1;
            channel[i] = (lastOut + .02 * white) / 1.02, lastOut = channel[i], channel[i] *= 3.5;
          }
        }
        _noiseCache.brown = (new ToneAudioBuffer).fromArray(buffer);
      }
      return _noiseCache.brown;
    },
    get pink() {
      if (!_noiseCache.pink) {
        const buffer = [];
        for (let channelNum = 0; channelNum < 2; channelNum++) {
          const channel = new Float32Array(220500);
          let b0, b1, b2, b3, b4, b5, b6;
          buffer[channelNum] = channel, b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0;
          for (let i = 0; i < 220500; i++) {
            const white = 2 * Math.random() - 1;
            b0 = .99886 * b0 + .0555179 * white, b1 = .99332 * b1 + .0750759 * white, b2 = .969 * b2 + .153852 * white, 
            b3 = .8665 * b3 + .3104856 * white, b4 = .55 * b4 + .5329522 * white, b5 = -.7616 * b5 - .016898 * white, 
            channel[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + .5362 * white, channel[i] *= .11, 
            // (roughly) compensate for gain
            b6 = .115926 * white;
          }
        }
        _noiseCache.pink = (new ToneAudioBuffer).fromArray(buffer);
      }
      return _noiseCache.pink;
    },
    get white() {
      if (!_noiseCache.white) {
        const buffer = [];
        for (let channelNum = 0; channelNum < 2; channelNum++) {
          const channel = new Float32Array(220500);
          buffer[channelNum] = channel;
          for (let i = 0; i < 220500; i++) channel[i] = 2 * Math.random() - 1;
        }
        _noiseCache.white = (new ToneAudioBuffer).fromArray(buffer);
      }
      return _noiseCache.white;
    }
  };
  /**
   * Simple convolution created with decaying noise.
   * Generates an Impulse Response Buffer
   * with Tone.Offline then feeds the IR into ConvolverNode.
   * The impulse response generation is async, so you have
   * to wait until {@link ready} resolves before it will make a sound.
   *
   * Inspiration from [ReverbGen](https://github.com/adelespinasse/reverbGen).
   * Copyright (c) 2014 Alan deLespinasse Apache 2.0 License.
   *
   * @category Effect
   */  let Reverb$1 = class Reverb extends Effect {
    constructor() {
      const options = optionsFromArguments(Reverb.getDefaults(), arguments, [ "decay" ]);
      super(options), this.name = "Reverb", 
      /**
           * Convolver node
           */
      this._convolver = this.context.createConvolver(), 
      /**
           * Resolves when the reverb buffer is generated. Whenever either {@link decay}
           * or {@link preDelay} are set, you have to wait until {@link ready} resolves
           * before the IR is generated with the latest values.
           */
      this.ready = Promise.resolve(), this._decay = options.decay, this._preDelay = options.preDelay, 
      this.generate(), this.connectEffect(this._convolver);
    }
    static getDefaults() {
      return Object.assign(Effect.getDefaults(), {
        decay: 1.5,
        preDelay: .01
      });
    }
    /**
       * The duration of the reverb.
       */    get decay() {
      return this._decay;
    }
    set decay(time) {
      assertRange(time = this.toSeconds(time), .001), this._decay = time, this.generate();
    }
    /**
       * The amount of time before the reverb is fully ramped in.
       */    get preDelay() {
      return this._preDelay;
    }
    set preDelay(time) {
      assertRange(time = this.toSeconds(time), 0), this._preDelay = time, this.generate();
    }
    /**
       * Generate the Impulse Response. Returns a promise while the IR is being generated.
       * @return Promise which returns this object.
       */    generate() {
      return __awaiter(this, void 0, void 0, (function*() {
        const previousReady = this.ready;
        // create a noise burst which decays over the duration in each channel
                const context = new OfflineContext(2, this._decay + this._preDelay, this.context.sampleRate);
        const noiseL = new Noise$1({
          context: context
        });
        const noiseR = new Noise$1({
          context: context
        });
        const merge = new Merge({
          context: context
        });
        noiseL.connect(merge, 0, 0), noiseR.connect(merge, 0, 1);
        const gainNode = new Gain$1({
          context: context
        }).toDestination();
        merge.connect(gainNode), noiseL.start(0), noiseR.start(0), 
        // predelay
        gainNode.gain.setValueAtTime(0, 0), gainNode.gain.setValueAtTime(1, this._preDelay), 
        // decay
        gainNode.gain.exponentialApproachValueAtTime(0, this._preDelay, this.decay);
        // render the buffer
        const renderPromise = context.render();
        return this.ready = renderPromise.then(noOp), yield previousReady, 
        // set the buffer
        this._convolver.buffer = (yield renderPromise).get(), this;
      }));
    }
    dispose() {
      return super.dispose(), this._convolver.disconnect(), this;
    }
  };
  /**
   * Add reverb to a sound by specifying duration and decay.
   * @class Reverb
   * @constructor
   * @param {Number} [decayTime] Set the decay time of the reverb
   * @example
   * <div>
   * <code>
   * let noise, osc, env, reverb;
   * let randomTime = 0;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   cnv.mousePressed(playSound);
   *   noise = new Noise();
   *   env = new Envelope();
   *   reverb = new Reverb();
   *   noise.disconnect();
   *   noise.connect(env);
   *   env.disconnect();
   *   env.connect(reverb);
   *   noise.start();
   *   textAlign(CENTER);
   * }
   * 
   * function playSound() {
   *  randomTime = random(0.1, 3);
   *  reverb.set(randomTime); 
   *  env.play();
   * }
   * 
   * function draw() {
   *   background(220);
   *   text('click to play', width/2, 20);
   *   text('decay ' + round(randomTime, 2), width/2, 40);
   *   describe('Click to play a sound with a random decay time.');
   * }
   * </code>
   * </div>
   */  
  /**
   * Thin wrapper around the native Web Audio [BiquadFilterNode](https://webaudio.github.io/web-audio-api/#biquadfilternode).
   * BiquadFilter is similar to {@link Filter} but doesn't have the option to set the "rolloff" value.
   * @category Component
   */
  class BiquadFilter extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(BiquadFilter.getDefaults(), arguments, [ "frequency", "type" ]);
      super(options), this.name = "BiquadFilter", this._filter = this.context.createBiquadFilter(), 
      this.input = this.output = this._filter, this.Q = new Param({
        context: this.context,
        units: "number",
        value: options.Q,
        param: this._filter.Q
      }), this.frequency = new Param({
        context: this.context,
        units: "frequency",
        value: options.frequency,
        param: this._filter.frequency
      }), this.detune = new Param({
        context: this.context,
        units: "cents",
        value: options.detune,
        param: this._filter.detune
      }), this.gain = new Param({
        context: this.context,
        units: "decibels",
        convert: !1,
        value: options.gain,
        param: this._filter.gain
      }), this.type = options.type;
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        Q: 1,
        type: "lowpass",
        frequency: 350,
        detune: 0,
        gain: 0
      });
    }
    /**
       * The type of this BiquadFilterNode. For a complete list of types and their attributes, see the
       * [Web Audio API](https://webaudio.github.io/web-audio-api/#dom-biquadfiltertype-lowpass)
       */    get type() {
      return this._filter.type;
    }
    set type(type) {
      assert(-1 !== [ "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking" ].indexOf(type), `Invalid filter type: ${type}`), 
      this._filter.type = type;
    }
    /**
       * Get the frequency response curve. This curve represents how the filter
       * responses to frequencies between 20hz-20khz.
       * @param  len The number of values to return
       * @return The frequency response curve between 20-20kHz
       */    getFrequencyResponse(len = 128) {
      // start with all 1s
      const freqValues = new Float32Array(len);
      for (let i = 0; i < len; i++) {
        const freq = 19980 * Math.pow(i / len, 2) + 20;
        freqValues[i] = freq;
      }
      const magValues = new Float32Array(len);
      const phaseValues = new Float32Array(len);
      // clone the filter to remove any connections which may be changing the value
            const filterClone = this.context.createBiquadFilter();
      return filterClone.type = this.type, filterClone.Q.value = this.Q.value, filterClone.frequency.value = this.frequency.value, 
      filterClone.gain.value = this.gain.value, filterClone.getFrequencyResponse(freqValues, magValues, phaseValues), 
      magValues;
    }
    dispose() {
      return super.dispose(), this._filter.disconnect(), this.Q.dispose(), this.frequency.dispose(), 
      this.gain.dispose(), this.detune.dispose(), this;
    }
  }
  /**
   * Filter the frequency range of a sound.
   * @class Biquad
   * @constructor
   * @param {Number} [cutoff] cutoff frequency of the filter, a value between 0 and 24000.
   * @param {String} [type] filter type. Options: "lowpass", 
   *                        "highpass", "bandpass", "lowshelf",
   *                        "highshelf", "notch", "allpass", 
   *                        "peaking"
   */  
  /**
   * AudioToGain converts an input in AudioRange [-1,1] to NormalRange [0,1].
   * @see {@link GainToAudio}.
   * @category Signal
   */
  class AudioToGain extends SignalOperator {
    constructor() {
      super(...arguments), this.name = "AudioToGain", 
      /**
           * The node which converts the audio ranges
           */
      this._norm = new WaveShaper({
        context: this.context,
        mapping: x => (x + 1) / 2
      }), 
      /**
           * The AudioRange input [-1, 1]
           */
      this.input = this._norm, 
      /**
           * The GainRange output [0, 1]
           */
      this.output = this._norm;
    }
    /**
       * clean up
       */    dispose() {
      return super.dispose(), this._norm.dispose(), this;
    }
  }
  /**
   * Add a signal and a number or two signals. When no value is
   * passed into the constructor, Tone.Add will sum input and `addend`
   * If a value is passed into the constructor, the it will be added to the input.
   *
   * @example
   * return Tone.Offline(() => {
   * 	const add = new Tone.Add(2).toDestination();
   * 	add.addend.setValueAtTime(1, 0.2);
   * 	const signal = new Tone.Signal(2);
   * 	// add a signal and a scalar
   * 	signal.connect(add);
   * 	signal.setValueAtTime(1, 0.1);
   * }, 0.5, 1);
   * @category Signal
   */  class Add extends Signal {
    constructor() {
      super(optionsFromArguments(Add.getDefaults(), arguments, [ "value" ])), this.override = !1, 
      this.name = "Add", 
      /**
           * the summing node
           */
      this._sum = new Gain$1({
        context: this.context
      }), this.input = this._sum, this.output = this._sum, 
      /**
           * The value which is added to the input signal
           */
      this.addend = this._param, connectSeries(this._constantSource, this._sum);
    }
    static getDefaults() {
      return Object.assign(Signal.getDefaults(), {
        value: 0
      });
    }
    dispose() {
      return super.dispose(), this._sum.dispose(), this;
    }
  }
  /**
   * Multiply two incoming signals. Or, if a number is given in the constructor,
   * multiplies the incoming signal by that value.
   *
   * @example
   * // multiply two signals
   * const mult = new Tone.Multiply();
   * const sigA = new Tone.Signal(3);
   * const sigB = new Tone.Signal(4);
   * sigA.connect(mult);
   * sigB.connect(mult.factor);
   * // output of mult is 12.
   * @example
   * // multiply a signal and a number
   * const mult = new Tone.Multiply(10);
   * const sig = new Tone.Signal(2).connect(mult);
   * // the output of mult is 20.
   * @category Signal
   */  class Multiply extends Signal {
    constructor() {
      const options = optionsFromArguments(Multiply.getDefaults(), arguments, [ "value" ]);
      super(options), this.name = "Multiply", 
      /**
           * Indicates if the value should be overridden on connection
           */
      this.override = !1, this._mult = this.input = this.output = new Gain$1({
        context: this.context,
        minValue: options.minValue,
        maxValue: options.maxValue
      }), this.factor = this._param = this._mult.gain, this.factor.setValueAtTime(options.value, 0);
    }
    static getDefaults() {
      return Object.assign(Signal.getDefaults(), {
        value: 0
      });
    }
    dispose() {
      return super.dispose(), this._mult.dispose(), this;
    }
  }
  /**
   * Performs a linear scaling on an input signal.
   * Scales a NormalRange input to between
   * outputMin and outputMax.
   *
   * @example
   * const scale = new Tone.Scale(50, 100);
   * const signal = new Tone.Signal(0.5).connect(scale);
   * // the output of scale equals 75
   * @category Signal
   */  class Scale extends SignalOperator {
    constructor() {
      const options = optionsFromArguments(Scale.getDefaults(), arguments, [ "min", "max" ]);
      super(options), this.name = "Scale", this._mult = this.input = new Multiply({
        context: this.context,
        value: options.max - options.min
      }), this._add = this.output = new Add({
        context: this.context,
        value: options.min
      }), this._min = options.min, this._max = options.max, this.input.connect(this.output);
    }
    static getDefaults() {
      return Object.assign(SignalOperator.getDefaults(), {
        max: 1,
        min: 0
      });
    }
    /**
       * The minimum output value. This number is output when the value input value is 0.
       */    get min() {
      return this._min;
    }
    set min(min) {
      this._min = min, this._setRange();
    }
    /**
       * The maximum output value. This number is output when the value input value is 1.
       */    get max() {
      return this._max;
    }
    set max(max) {
      this._max = max, this._setRange();
    }
    /**
       * set the values
       */    _setRange() {
      this._add.value = this._min, this._mult.value = this._max - this._min;
    }
    dispose() {
      return super.dispose(), this._add.dispose(), this._mult.dispose(), this;
    }
  }
  /**
   * Tone.Zero outputs 0's at audio-rate. The reason this has to be
   * it's own class is that many browsers optimize out Tone.Signal
   * with a value of 0 and will not process nodes further down the graph.
   * @category Signal
   */  class Zero extends SignalOperator {
    constructor() {
      super(optionsFromArguments(Zero.getDefaults(), arguments)), this.name = "Zero", 
      /**
           * The gain node which connects the constant source to the output
           */
      this._gain = new Gain$1({
        context: this.context
      }), 
      /**
           * Only outputs 0
           */
      this.output = this._gain, 
      /**
           * no input node
           */
      this.input = void 0, connect(this.context.getConstant(0), this._gain);
    }
    /**
       * clean up
       */    dispose() {
      return super.dispose(), disconnect(this.context.getConstant(0), this._gain), this;
    }
  }
  /**
   * LFO stands for low frequency oscillator. LFO produces an output signal
   * which can be attached to an AudioParam or Tone.Signal
   * in order to modulate that parameter with an oscillator. The LFO can
   * also be synced to the transport to start/stop and change when the tempo changes.
   * @example
   * return Tone.Offline(() => {
   * 	const lfo = new Tone.LFO("4n", 400, 4000).start().toDestination();
   * }, 0.5, 1);
   * @category Source
   */  class LFO extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(LFO.getDefaults(), arguments, [ "frequency", "min", "max" ]);
      super(options), this.name = "LFO", 
      /**
           * The value that the LFO outputs when it's stopped
           */
      this._stoppedValue = 0, 
      /**
           * A private placeholder for the units
           */
      this._units = "number", 
      /**
           * If the input value is converted using the {@link units}
           */
      this.convert = !0, 
      /**
           * Private methods borrowed from Param
           */
      // @ts-ignore
      this._fromType = Param.prototype._fromType, 
      // @ts-ignore
      this._toType = Param.prototype._toType, 
      // @ts-ignore
      this._is = Param.prototype._is, 
      // @ts-ignore
      this._clampValue = Param.prototype._clampValue, this._oscillator = new Oscillator$1(options), 
      this.frequency = this._oscillator.frequency, this._amplitudeGain = new Gain$1({
        context: this.context,
        gain: options.amplitude,
        units: "normalRange"
      }), this.amplitude = this._amplitudeGain.gain, this._stoppedSignal = new Signal({
        context: this.context,
        units: "audioRange",
        value: 0
      }), this._zeros = new Zero({
        context: this.context
      }), this._a2g = new AudioToGain({
        context: this.context
      }), this._scaler = this.output = new Scale({
        context: this.context,
        max: options.max,
        min: options.min
      }), this.units = options.units, this.min = options.min, this.max = options.max, 
      // connect it up
      this._oscillator.chain(this._amplitudeGain, this._a2g, this._scaler), this._zeros.connect(this._a2g), 
      this._stoppedSignal.connect(this._a2g), readOnly(this, [ "amplitude", "frequency" ]), 
      this.phase = options.phase;
    }
    static getDefaults() {
      return Object.assign(Oscillator$1.getDefaults(), {
        amplitude: 1,
        frequency: "4n",
        max: 1,
        min: 0,
        type: "sine",
        units: "number"
      });
    }
    /**
       * Start the LFO.
       * @param time The time the LFO will start
       */    start(time) {
      return time = this.toSeconds(time), this._stoppedSignal.setValueAtTime(0, time), 
      this._oscillator.start(time), this;
    }
    /**
       * Stop the LFO.
       * @param  time The time the LFO will stop
       */    stop(time) {
      return time = this.toSeconds(time), this._stoppedSignal.setValueAtTime(this._stoppedValue, time), 
      this._oscillator.stop(time), this;
    }
    /**
       * Sync the start/stop/pause to the transport
       * and the frequency to the bpm of the transport
       * @example
       * const lfo = new Tone.LFO("8n");
       * lfo.sync().start(0);
       * // the rate of the LFO will always be an eighth note, even as the tempo changes
       */    sync() {
      return this._oscillator.sync(), this._oscillator.syncFrequency(), this;
    }
    /**
       * unsync the LFO from transport control
       */    unsync() {
      return this._oscillator.unsync(), this._oscillator.unsyncFrequency(), this;
    }
    /**
       * After the oscillator waveform is updated, reset the `_stoppedSignal` value to match the updated waveform
       */    _setStoppedValue() {
      this._stoppedValue = this._oscillator.getInitialValue(), this._stoppedSignal.value = this._stoppedValue;
    }
    /**
       * The minimum output of the LFO.
       */    get min() {
      return this._toType(this._scaler.min);
    }
    set min(min) {
      min = this._fromType(min), this._scaler.min = min;
    }
    /**
       * The maximum output of the LFO.
       */    get max() {
      return this._toType(this._scaler.max);
    }
    set max(max) {
      max = this._fromType(max), this._scaler.max = max;
    }
    /**
       * The type of the oscillator.
       * @see {@link Oscillator.type}
       */    get type() {
      return this._oscillator.type;
    }
    set type(type) {
      this._oscillator.type = type, this._setStoppedValue();
    }
    /**
       * The oscillator's partials array.
       * @see {@link Oscillator.partials}
       */    get partials() {
      return this._oscillator.partials;
    }
    set partials(partials) {
      this._oscillator.partials = partials, this._setStoppedValue();
    }
    /**
       * The phase of the LFO.
       */    get phase() {
      return this._oscillator.phase;
    }
    set phase(phase) {
      this._oscillator.phase = phase, this._setStoppedValue();
    }
    /**
       * The output units of the LFO.
       */    get units() {
      return this._units;
    }
    set units(val) {
      const currentMin = this.min;
      const currentMax = this.max;
      // convert the min and the max
            this._units = val, this.min = currentMin, this.max = currentMax;
    }
    /**
       * Returns the playback state of the source, either "started" or "stopped".
       */    get state() {
      return this._oscillator.state;
    }
    /**
       * @param node the destination to connect to
       * @param outputNum the optional output number
       * @param inputNum the input number
       */    connect(node, outputNum, inputNum) {
      return (node instanceof Param || node instanceof Signal) && (this.convert = node.convert, 
      this.units = node.units), connectSignal(this, node, outputNum, inputNum), this;
    }
    dispose() {
      return super.dispose(), this._oscillator.dispose(), this._stoppedSignal.dispose(), 
      this._zeros.dispose(), this._scaler.dispose(), this._a2g.dispose(), this._amplitudeGain.dispose(), 
      this.amplitude.dispose(), this;
    }
  }
  /**
   * PitchShift does near-realtime pitch shifting to the incoming signal.
   * The effect is achieved by speeding up or slowing down the delayTime
   * of a DelayNode using a sawtooth wave.
   * Algorithm found in [this pdf](http://dsp-book.narod.ru/soundproc.pdf).
   * Additional reference by [Miller Pucket](http://msp.ucsd.edu/techniques/v0.11/book-html/node115.html).
   * @category Effect
   */  class PitchShift extends FeedbackEffect {
    constructor() {
      const options = optionsFromArguments(PitchShift.getDefaults(), arguments, [ "pitch" ]);
      super(options), this.name = "PitchShift", this._frequency = new Signal({
        context: this.context
      }), this._delayA = new Delay$1({
        maxDelay: 1,
        context: this.context
      }), this._lfoA = new LFO({
        context: this.context,
        min: 0,
        max: .1,
        type: "sawtooth"
      }).connect(this._delayA.delayTime), this._delayB = new Delay$1({
        maxDelay: 1,
        context: this.context
      }), this._lfoB = new LFO({
        context: this.context,
        min: 0,
        max: .1,
        type: "sawtooth",
        phase: 180
      }).connect(this._delayB.delayTime), this._crossFade = new CrossFade({
        context: this.context
      }), this._crossFadeLFO = new LFO({
        context: this.context,
        min: 0,
        max: 1,
        type: "triangle",
        phase: 90
      }).connect(this._crossFade.fade), this._feedbackDelay = new Delay$1({
        delayTime: options.delayTime,
        context: this.context
      }), this.delayTime = this._feedbackDelay.delayTime, readOnly(this, "delayTime"), 
      this._pitch = options.pitch, this._windowSize = options.windowSize, 
      // connect the two delay lines up
      this._delayA.connect(this._crossFade.a), this._delayB.connect(this._crossFade.b), 
      // connect the frequency
      this._frequency.fan(this._lfoA.frequency, this._lfoB.frequency, this._crossFadeLFO.frequency), 
      // route the input
      this.effectSend.fan(this._delayA, this._delayB), this._crossFade.chain(this._feedbackDelay, this.effectReturn);
      // start the LFOs at the same time
      const now = this.now();
      this._lfoA.start(now), this._lfoB.start(now), this._crossFadeLFO.start(now), 
      // set the initial value
      this.windowSize = this._windowSize;
    }
    static getDefaults() {
      return Object.assign(FeedbackEffect.getDefaults(), {
        pitch: 0,
        windowSize: .1,
        delayTime: 0,
        feedback: 0
      });
    }
    /**
       * Repitch the incoming signal by some interval (measured in semi-tones).
       * @example
       * const pitchShift = new Tone.PitchShift().toDestination();
       * const osc = new Tone.Oscillator().connect(pitchShift).start().toDestination();
       * pitchShift.pitch = -12; // down one octave
       * pitchShift.pitch = 7; // up a fifth
       */    get pitch() {
      return this._pitch;
    }
    set pitch(interval) {
      this._pitch = interval;
      let factor = 0;
      interval < 0 ? (this._lfoA.min = 0, this._lfoA.max = this._windowSize, this._lfoB.min = 0, 
      this._lfoB.max = this._windowSize, factor = intervalToFrequencyRatio(interval - 1) + 1) : (this._lfoA.min = this._windowSize, 
      this._lfoA.max = 0, this._lfoB.min = this._windowSize, this._lfoB.max = 0, factor = intervalToFrequencyRatio(interval) - 1), 
      this._frequency.value = factor * (1.2 / this._windowSize);
    }
    /**
       * The window size corresponds roughly to the sample length in a looping sampler.
       * Smaller values are desirable for a less noticeable delay time of the pitch shifted
       * signal, but larger values will result in smoother pitch shifting for larger intervals.
       * A nominal range of 0.03 to 0.1 is recommended.
       */    get windowSize() {
      return this._windowSize;
    }
    set windowSize(size) {
      this._windowSize = this.toSeconds(size), this.pitch = this._pitch;
    }
    dispose() {
      return super.dispose(), this._frequency.dispose(), this._delayA.dispose(), this._delayB.dispose(), 
      this._lfoA.dispose(), this._lfoB.dispose(), this._crossFade.dispose(), this._crossFadeLFO.dispose(), 
      this._feedbackDelay.dispose(), this;
    }
  }
  /**
   * Change the pitch of a sound.
   * @class PitchShifter
   * @constructor
   * @example
   * <div>
   * <code>
   *  let cnv, soundFile, pitchShifter;
   *  
   * function preload() {
   *   soundFile = loadSound('assets/gtrSample.mp3');
   * }
   *  
   * function setup() {
   *   cnv = createCanvas(100, 100);
   *   cnv.mousePressed(startSound);
   *   background(220);
   *   textAlign(CENTER);
   *   textSize(9);
   *   text('click to play sound', width/2, height/2);
   *   pitchShifter = new PitchShifter();
   *   
   *   soundFile.disconnect();
   *   soundFile.connect(pitchShifter);
   *   //change the pitch and retrigger sample when done playing
   *   soundFile.onended(changePitch);
   * }
   * 
   * function startSound () {
   *   soundFile.play();
   * }
   *  
   * function changePitch () {
   *   let pitchValue = random(-12, 12);
   *   pitchShifter.shift(pitchValue);
   *   soundFile.play();
   * }
   * </code>
   * </div>
   */  
  /**
   * Split splits an incoming signal into the number of given channels.
   *
   * @example
   * const split = new Tone.Split();
   * // stereoSignal.connect(split);
   * @category Component
   */
  class Split extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Split.getDefaults(), arguments, [ "channels" ]);
      super(options), this.name = "Split", this._splitter = this.input = this.output = this.context.createChannelSplitter(options.channels), 
      this._internalChannels = [ this._splitter ];
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        channels: 2
      });
    }
    dispose() {
      return super.dispose(), this._splitter.disconnect(), this;
    }
  }
  /**
   * Wrapper around the native Web Audio's [AnalyserNode](http://webaudio.github.io/web-audio-api/#idl-def-AnalyserNode).
   * Extracts FFT or Waveform data from the incoming signal.
   * @category Component
   */  class Analyser extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Analyser.getDefaults(), arguments, [ "type", "size" ]);
      super(options), this.name = "Analyser", 
      /**
           * The analyser node.
           */
      this._analysers = [], 
      /**
           * The buffer that the FFT data is written to
           */
      this._buffers = [], this.input = this.output = this._gain = new Gain$1({
        context: this.context
      }), this._split = new Split({
        context: this.context,
        channels: options.channels
      }), this.input.connect(this._split), assertRange(options.channels, 1);
      // create the analysers
      for (let channel = 0; channel < options.channels; channel++) this._analysers[channel] = this.context.createAnalyser(), 
      this._split.connect(this._analysers[channel], channel, 0);
      // set the values initially
            this.size = options.size, this.type = options.type, this.smoothing = options.smoothing;
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        size: 1024,
        smoothing: .8,
        type: "fft",
        channels: 1
      });
    }
    /**
       * Run the analysis given the current settings. If {@link channels} = 1,
       * it will return a Float32Array. If {@link channels} > 1, it will
       * return an array of Float32Arrays where each index in the array
       * represents the analysis done on a channel.
       */    getValue() {
      return this._analysers.forEach(((analyser, index) => {
        const buffer = this._buffers[index];
        "fft" === this._type ? analyser.getFloatFrequencyData(buffer) : "waveform" === this._type && analyser.getFloatTimeDomainData(buffer);
      })), 1 === this.channels ? this._buffers[0] : this._buffers;
    }
    /**
       * The size of analysis. This must be a power of two in the range 16 to 16384.
       */    get size() {
      return this._analysers[0].frequencyBinCount;
    }
    set size(size) {
      this._analysers.forEach(((analyser, index) => {
        analyser.fftSize = 2 * size, this._buffers[index] = new Float32Array(size);
      }));
    }
    /**
       * The number of channels the analyser does the analysis on. Channel
       * separation is done using {@link Split}
       */    get channels() {
      return this._analysers.length;
    }
    /**
       * The analysis function returned by analyser.getValue(), either "fft" or "waveform".
       */    get type() {
      return this._type;
    }
    set type(type) {
      assert("waveform" === type || "fft" === type, `Analyser: invalid type: ${type}`), 
      this._type = type;
    }
    /**
       * 0 represents no time averaging with the last analysis frame.
       */    get smoothing() {
      return this._analysers[0].smoothingTimeConstant;
    }
    set smoothing(val) {
      this._analysers.forEach((a => a.smoothingTimeConstant = val));
    }
    /**
       * Clean up.
       */    dispose() {
      return super.dispose(), this._analysers.forEach((a => a.disconnect())), this._split.dispose(), 
      this._gain.dispose(), this;
    }
  }
  /**
   * The base class for Metering classes.
   */  class MeterBase extends ToneAudioNode {
    constructor() {
      super(optionsFromArguments(MeterBase.getDefaults(), arguments)), this.name = "MeterBase", 
      this.input = this.output = this._analyser = new Analyser({
        context: this.context,
        size: 256,
        type: "waveform"
      });
    }
    dispose() {
      return super.dispose(), this._analyser.dispose(), this;
    }
  }
  /**
   * Meter gets the [RMS](https://en.wikipedia.org/wiki/Root_mean_square)
   * of an input signal. It can also get the raw value of the input signal.
   * Setting `normalRange` to `true` will covert the output to a range of
   * 0-1. See an example using a graphical display
   * [here](https://tonejs.github.io/examples/meter).
   * @see {@link DCMeter}.
   *
   * @example
   * const meter = new Tone.Meter();
   * const mic = new Tone.UserMedia();
   * mic.open();
   * // connect mic to the meter
   * mic.connect(meter);
   * // the current level of the mic
   * setInterval(() => console.log(meter.getValue()), 100);
   * @category Component
   */  class Meter extends MeterBase {
    constructor() {
      const options = optionsFromArguments(Meter.getDefaults(), arguments, [ "smoothing" ]);
      super(options), this.name = "Meter", this.input = this.output = this._analyser = new Analyser({
        context: this.context,
        size: 256,
        type: "waveform",
        channels: options.channelCount
      }), this.smoothing = options.smoothing, this.normalRange = options.normalRange, 
      this._rms = new Array(options.channelCount), this._rms.fill(0);
    }
    static getDefaults() {
      return Object.assign(MeterBase.getDefaults(), {
        smoothing: .8,
        normalRange: !1,
        channelCount: 1
      });
    }
    /**
       * Use {@link getValue} instead. For the previous getValue behavior, use DCMeter.
       * @deprecated
       */    getLevel() {
      return warn("'getLevel' has been changed to 'getValue'"), this.getValue();
    }
    /**
       * Get the current value of the incoming signal.
       * Output is in decibels when {@link normalRange} is `false`.
       * If {@link channels} = 1, then the output is a single number
       * representing the value of the input signal. When {@link channels} > 1,
       * then each channel is returned as a value in a number array.
       */    getValue() {
      const aValues = this._analyser.getValue();
      const vals = (1 === this.channels ? [ aValues ] : aValues).map(((values, index) => {
        const totalSquared = values.reduce(((total, current) => total + current * current), 0);
        const rms = Math.sqrt(totalSquared / values.length);
        // the rms can only fall at the rate of the smoothing
        // but can jump up instantly
                return this._rms[index] = Math.max(rms, this._rms[index] * this.smoothing), 
        this.normalRange ? this._rms[index] : gainToDb(this._rms[index]);
      }));
      return 1 === this.channels ? vals[0] : vals;
    }
    /**
       * The number of channels of analysis.
       */    get channels() {
      return this._analyser.channels;
    }
    dispose() {
      return super.dispose(), this._analyser.dispose(), this;
    }
  }
  /**
   * Get the current volume of a sound.
   * @class Amplitude
   * @constructor
   * @example
   * <div>
   * <code>
   * let sound, amp, cnv;
   *   
   * function preload() {
   *   //replace this sound with something local with rights to distribute
   *   sound = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
   * }
   * 
   * function setup() {
   *   cnv = createCanvas(100, 100);
   *   cnv.mousePressed(playSound);
   *   textAlign(CENTER);
   *   fill(255);
   *   amp = new Amplitude();
   *   sound.connect(amp);
   * }
   * 
   * function playSound() {
   *   sound.play();
   * }
   * 
   * function draw() {
   *   let level = amp.getLevel();
   *   level = map(level, 0, 0.2, 0, 255);
   *   background(level, 0, 0);
   *   text('tap to play', width/2, 20);
   *   describe('The color of the background changes based on the amplitude of the sound.');
   * }
   * </code>
   * </div>
   */  
  /**
   * Get the current frequency data of the connected audio source using a fast Fourier transform.
   * Read more about FFT algorithms on [Wikipedia] (https://en.wikipedia.org/wiki/Fast_Fourier_transform).
   * @category Component
   */
  let FFT$1 = class FFT extends MeterBase {
    constructor() {
      const options = optionsFromArguments(FFT.getDefaults(), arguments, [ "size" ]);
      super(options), this.name = "FFT", this.normalRange = options.normalRange, this._analyser.type = "fft", 
      this.size = options.size;
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        normalRange: !1,
        size: 1024,
        smoothing: .8
      });
    }
    /**
       * Gets the current frequency data from the connected audio source.
       * Returns the frequency data of length {@link size} as a Float32Array of decibel values.
       */    getValue() {
      return this._analyser.getValue().map((v => this.normalRange ? dbToGain(v) : v));
    }
    /**
       * The size of analysis. This must be a power of two in the range 16 to 16384.
       * Determines the size of the array returned by {@link getValue} (i.e. the number of
       * frequency bins). Large FFT sizes may be costly to compute.
       */    get size() {
      return this._analyser.size;
    }
    set size(size) {
      this._analyser.size = size;
    }
    /**
       * 0 represents no time averaging with the last analysis frame.
       */    get smoothing() {
      return this._analyser.smoothing;
    }
    set smoothing(val) {
      this._analyser.smoothing = val;
    }
    /**
       * Returns the frequency value in hertz of each of the indices of the FFT's {@link getValue} response.
       * @example
       * const fft = new Tone.FFT(32);
       * console.log([0, 1, 2, 3, 4].map(index => fft.getFrequencyOfIndex(index)));
       */    getFrequencyOfIndex(index) {
      return assert(0 <= index && index < this.size, `index must be greater than or equal to 0 and less than ${this.size}`), 
      index * this.context.sampleRate / (2 * this.size);
    }
  };
  /**
   * Get the current waveform data of the connected audio source.
   * @category Component
   */  class Waveform extends MeterBase {
    constructor() {
      const options = optionsFromArguments(Waveform.getDefaults(), arguments, [ "size" ]);
      super(options), this.name = "Waveform", this._analyser.type = "waveform", this.size = options.size;
    }
    static getDefaults() {
      return Object.assign(MeterBase.getDefaults(), {
        size: 1024
      });
    }
    /**
       * Return the waveform for the current time as a Float32Array where each value in the array
       * represents a sample in the waveform.
       */    getValue() {
      return this._analyser.getValue();
    }
    /**
       * The size of analysis. This must be a power of two in the range 16 to 16384.
       * Determines the size of the array returned by {@link getValue}.
       */    get size() {
      return this._analyser.size;
    }
    set size(size) {
      this._analyser.size = size;
    }
  }
  /**
   * Analyze the frequency spectrum and waveform of sounds.
   * @class FFT
   * @constructor
   * @param {Number} [fftSize] FFT anaylsis size. Must be a power of two between 16 and 1024. Defaults to 32.
   * @example
   * <div>
   * <code>
   * let osc;
   *
   * function setup(){
   *   let cnv = createCanvas(100,100);
   *   cnv.mouseClicked(togglePlay);
   *   fft = new FFT(32);
   *   osc = new TriOsc(440);
   *   osc.connect(fft);
   * }
   * 
   * function draw(){
   *   background(220);
   *   let spectrum = fft.analyze();
   *   noStroke();
   *   fill(255, 0, 0);
   * 
   *   for (let i = 0; i < spectrum.length; i++) {
   *     let x = map(i, 0, spectrum.length, 0, width);     
   *     let h = -height + map(spectrum[i], 0, 0.1, height, 0);
   *     rect(x, height, width / spectrum.length, h )
   *   }
   * 
   *   let waveform = fft.waveform();
   *   noFill();
   *   beginShape();
   *   stroke(20);
   *   
   *   for (let i = 0; i < waveform.length; i++){
   *     let x = map(i, 0, waveform.length, 0, width);
   *     let y = map( waveform[i], -1, 1, 0, height);
   *     vertex(x,y);
   *   }
   *   endShape();
   *   
   *   textAlign(CENTER);
   *   text('tap to play', width/2, 20);
   *   osc.freq(map(mouseX, 0, width, 100, 2000));
   *   describe('The sketch displays the frequency spectrum and waveform of the sound that plays.');
   * }
   * 
   * function togglePlay() {
   *   osc.start();
   * }
   * </code>
   * </div>
   */  
  /**
   * Panner is an equal power Left/Right Panner. It is a wrapper around the StereoPannerNode.
   * @example
   * return Tone.Offline(() => {
   * // move the input signal from right to left
   * 	const panner = new Tone.Panner(1).toDestination();
   * 	panner.pan.rampTo(-1, 0.5);
   * 	const osc = new Tone.Oscillator(100).connect(panner).start();
   * }, 0.5, 2);
   * @category Component
   */
  let Panner$1 = class Panner extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Panner.getDefaults(), arguments, [ "pan" ]);
      super(options), this.name = "Panner", 
      /**
           * the panner node
           */
      this._panner = this.context.createStereoPanner(), this.input = this._panner, this.output = this._panner, 
      this.pan = new Param({
        context: this.context,
        param: this._panner.pan,
        value: options.pan,
        minValue: -1,
        maxValue: 1
      }), 
      // this is necessary for standardized-audio-context
      // doesn't make any difference for the native AudioContext
      // https://github.com/chrisguttandin/standardized-audio-context/issues/647
      this._panner.channelCount = options.channelCount, this._panner.channelCountMode = "explicit", 
      // initial value
      readOnly(this, "pan");
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        pan: 0,
        channelCount: 1
      });
    }
    dispose() {
      return super.dispose(), this._panner.disconnect(), this.pan.dispose(), this;
    }
  };
  /**
   * A panning effect.
   * @class Panner
   * @constructor
   * @example
   * <div>
   * <code>
   * let panner, lfo, soundfile, cnv;
   * 
   * function preload() {
   *   soundfile = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
   * }
   * 
   * function setup() {
   *   cnv = createCanvas(100, 100);
   *   background(220);
   *   cnv.mousePressed(startSound);
   *   
   *   panner = new Panner();
   *   lfo = new Oscillator(1);
   *   //disconnect lfo from speakers because we don't want to hear it!
   *   lfo.disconnect();
   *   panner.pan(lfo);
   * 
   *   soundfile.loop();
   *   soundfile.disconnect();
   *   soundfile.connect(panner);
   *   
   * }
   * 
   * function startSound() {
   *   lfo.start();
   *   soundfile.start();
   * }
   * </code>
   * </div>
   */  
  /**
   * Tone.Listener is a thin wrapper around the AudioListener. Listener combined
   * with {@link Panner3D} makes up the Web Audio API's 3D panning system. Panner3D allows you
   * to place sounds in 3D and Listener allows you to navigate the 3D sound environment from
   * a first-person perspective. There is only one listener per audio context.
   */
  class ListenerClass extends ToneAudioNode {
    constructor() {
      super(...arguments), this.name = "Listener", this.positionX = new Param({
        context: this.context,
        param: this.context.rawContext.listener.positionX
      }), this.positionY = new Param({
        context: this.context,
        param: this.context.rawContext.listener.positionY
      }), this.positionZ = new Param({
        context: this.context,
        param: this.context.rawContext.listener.positionZ
      }), this.forwardX = new Param({
        context: this.context,
        param: this.context.rawContext.listener.forwardX
      }), this.forwardY = new Param({
        context: this.context,
        param: this.context.rawContext.listener.forwardY
      }), this.forwardZ = new Param({
        context: this.context,
        param: this.context.rawContext.listener.forwardZ
      }), this.upX = new Param({
        context: this.context,
        param: this.context.rawContext.listener.upX
      }), this.upY = new Param({
        context: this.context,
        param: this.context.rawContext.listener.upY
      }), this.upZ = new Param({
        context: this.context,
        param: this.context.rawContext.listener.upZ
      });
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        forwardX: 0,
        forwardY: 0,
        forwardZ: -1,
        upX: 0,
        upY: 1,
        upZ: 0
      });
    }
    dispose() {
      return super.dispose(), this.positionX.dispose(), this.positionY.dispose(), this.positionZ.dispose(), 
      this.forwardX.dispose(), this.forwardY.dispose(), this.forwardZ.dispose(), this.upX.dispose(), 
      this.upY.dispose(), this.upZ.dispose(), this;
    }
  }
  //-------------------------------------
  // 	INITIALIZATION
  //-------------------------------------
    onContextInit((context => {
    context.listener = new ListenerClass({
      context: context
    });
  })), onContextClose((context => {
    context.listener.dispose();
  }));
  /**
   * A spatialized panner node which supports equalpower or HRTF panning.
   * @category Component
   */
  let Panner3D$1 = class Panner3D extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(Panner3D.getDefaults(), arguments, [ "positionX", "positionY", "positionZ" ]);
      super(options), this.name = "Panner3D", this._panner = this.input = this.output = this.context.createPanner(), 
      // set some values
      this.panningModel = options.panningModel, this.maxDistance = options.maxDistance, 
      this.distanceModel = options.distanceModel, this.coneOuterGain = options.coneOuterGain, 
      this.coneOuterAngle = options.coneOuterAngle, this.coneInnerAngle = options.coneInnerAngle, 
      this.refDistance = options.refDistance, this.rolloffFactor = options.rolloffFactor, 
      this.positionX = new Param({
        context: this.context,
        param: this._panner.positionX,
        value: options.positionX
      }), this.positionY = new Param({
        context: this.context,
        param: this._panner.positionY,
        value: options.positionY
      }), this.positionZ = new Param({
        context: this.context,
        param: this._panner.positionZ,
        value: options.positionZ
      }), this.orientationX = new Param({
        context: this.context,
        param: this._panner.orientationX,
        value: options.orientationX
      }), this.orientationY = new Param({
        context: this.context,
        param: this._panner.orientationY,
        value: options.orientationY
      }), this.orientationZ = new Param({
        context: this.context,
        param: this._panner.orientationZ,
        value: options.orientationZ
      });
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        coneInnerAngle: 360,
        coneOuterAngle: 360,
        coneOuterGain: 0,
        distanceModel: "inverse",
        maxDistance: 1e4,
        orientationX: 0,
        orientationY: 0,
        orientationZ: 0,
        panningModel: "equalpower",
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        refDistance: 1,
        rolloffFactor: 1
      });
    }
    /**
       * Sets the position of the source in 3d space.
       */    setPosition(x, y, z) {
      return this.positionX.value = x, this.positionY.value = y, this.positionZ.value = z, 
      this;
    }
    /**
       * Sets the orientation of the source in 3d space.
       */    setOrientation(x, y, z) {
      return this.orientationX.value = x, this.orientationY.value = y, this.orientationZ.value = z, 
      this;
    }
    /**
       * The panning model. Either "equalpower" or "HRTF".
       */    get panningModel() {
      return this._panner.panningModel;
    }
    set panningModel(val) {
      this._panner.panningModel = val;
    }
    /**
       * A reference distance for reducing volume as source move further from the listener
       */    get refDistance() {
      return this._panner.refDistance;
    }
    set refDistance(val) {
      this._panner.refDistance = val;
    }
    /**
       * Describes how quickly the volume is reduced as source moves away from listener.
       */    get rolloffFactor() {
      return this._panner.rolloffFactor;
    }
    set rolloffFactor(val) {
      this._panner.rolloffFactor = val;
    }
    /**
       * The distance model used by,  "linear", "inverse", or "exponential".
       */    get distanceModel() {
      return this._panner.distanceModel;
    }
    set distanceModel(val) {
      this._panner.distanceModel = val;
    }
    /**
       * The angle, in degrees, inside of which there will be no volume reduction
       */    get coneInnerAngle() {
      return this._panner.coneInnerAngle;
    }
    set coneInnerAngle(val) {
      this._panner.coneInnerAngle = val;
    }
    /**
       * The angle, in degrees, outside of which the volume will be reduced
       * to a constant value of coneOuterGain
       */    get coneOuterAngle() {
      return this._panner.coneOuterAngle;
    }
    set coneOuterAngle(val) {
      this._panner.coneOuterAngle = val;
    }
    /**
       * The gain outside of the coneOuterAngle
       */    get coneOuterGain() {
      return this._panner.coneOuterGain;
    }
    set coneOuterGain(val) {
      this._panner.coneOuterGain = val;
    }
    /**
       * The maximum distance between source and listener,
       * after which the volume will not be reduced any further.
       */    get maxDistance() {
      return this._panner.maxDistance;
    }
    set maxDistance(val) {
      this._panner.maxDistance = val;
    }
    dispose() {
      return super.dispose(), this._panner.disconnect(), this.orientationX.dispose(), 
      this.orientationY.dispose(), this.orientationZ.dispose(), this.positionX.dispose(), 
      this.positionY.dispose(), this.positionZ.dispose(), this;
    }
  };
  /**
   * A 3D sound spatializer.
   * @class Panner3D
   * @constructor
   * @example
   * <div>
   * <code>
   * let radius = 10 ; 
   * let soundSource, spatializer;
   * let font;
   * let cnv;
   * 
   * let x = 0;
   * let y = 0;
   * let z = 100;
   * 
   * let vX;
   * let vY;
   * let vZ;
   * 
   * function preload() {
   *   soundSource = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
   *   font = loadFont('https://cdn.glitch.global/3db712b6-c53c-49eb-a8ea-83c7a363871d/Canterbury.ttf?v=1715211442728');
   * }
   * 
   * function setup() {
   *   describe(
   *     'A 3D shape with a sound source attached to it. The sound source is spatialized using the Panner3D class. Click to play the sound.'
   *   );
   *   cnv = createCanvas(100, 100, WEBGL);
   *   cnv.mousePressed(playSound);
   * 
   *   camera(0, 0, 0, 0, 0, 1);
   *   
   * 
   *   textFont(font);
   *   textAlign(CENTER,CENTER);
   *   
   *   angleMode(DEGREES);
   * 
   *   vX = random(-0.5, 0.5);
   *   vY = random(-0.5, 0.5);
   *   vZ = random(-0.5, 0.5) * 1.5;
   * 
   *   spatializer = new Panner3D();
   *   spatializer.maxDist(100);
   *   soundSource.loop();
   *   soundSource.disconnect();
   *   soundSource.connect(spatializer);
   *   
   *   
   * }
   * 
   * function playSound() {
   *   soundSource.play();
   * }
   * 
   * function draw() {
   *   background(220);
   *   push();
   *   textSize(5);
   *   fill(0);
   *   translate(0,0,100);
   *   //text('click to play', 0, 0);
   *   pop();
   *   // Update Box and Sound Source Position
   *   push();
   *   moveSoundBox();
   *   box(5, 5, 5);
   *   pop();
   * }
   * 
   * // Rotate 1 degree per frame along all three axes
   * function moveSoundBox() {
   *   x = x + vX;
   *   y = y + vY;
   *   z = z + vZ;
   * 
   *   if (x > radius || x < -radius) {
   *     vX = -vX;
   *   }
   *   if (y > radius || y < -radius) {
   *     vY = -vY;
   *   }
   *   if (z > 250 || z < 80) {
   *     vZ = -vZ;
   *   }
   *   //set the position of the 3D panner
   *   spatializer.set(x, y, z);
   *   //set the postion of the box
   *   translate(x, y, z);
   *   rotateX(45 + frameCount);
   *   rotateZ(45);
   * }
   * </code>
   * </div>
   */  
  /**
   * Player is an audio file player with start, loop, and stop functions.
   * @example
   * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
   * // play as soon as the buffer is loaded
   * player.autostart = true;
   * @category Source
   */
  class Player extends Source {
    constructor() {
      const options = optionsFromArguments(Player.getDefaults(), arguments, [ "url", "onload" ]);
      super(options), this.name = "Player", 
      /**
           * All of the active buffer source nodes
           */
      this._activeSources = new Set, this._buffer = new ToneAudioBuffer({
        onload: this._onload.bind(this, options.onload),
        onerror: options.onerror,
        reverse: options.reverse,
        url: options.url
      }), this.autostart = options.autostart, this._loop = options.loop, this._loopStart = options.loopStart, 
      this._loopEnd = options.loopEnd, this._playbackRate = options.playbackRate, this.fadeIn = options.fadeIn, 
      this.fadeOut = options.fadeOut;
    }
    static getDefaults() {
      return Object.assign(Source.getDefaults(), {
        autostart: !1,
        fadeIn: 0,
        fadeOut: 0,
        loop: !1,
        loopEnd: 0,
        loopStart: 0,
        onload: noOp,
        onerror: noOp,
        playbackRate: 1,
        reverse: !1
      });
    }
    /**
       * Load the audio file as an audio buffer.
       * Decodes the audio asynchronously and invokes
       * the callback once the audio buffer loads.
       * Note: this does not need to be called if a url
       * was passed in to the constructor. Only use this
       * if you want to manually load a new url.
       * @param url The url of the buffer to load. Filetype support depends on the browser.
       */    load(url) {
      return __awaiter(this, void 0, void 0, (function*() {
        return yield this._buffer.load(url), this._onload(), this;
      }));
    }
    /**
       * Internal callback when the buffer is loaded.
       */    _onload(callback = noOp) {
      callback(), this.autostart && this.start();
    }
    /**
       * Internal callback when the buffer is done playing.
       */    _onSourceEnd(source) {
      // invoke the onstop function
      this.onstop(this), 
      // delete the source from the active sources
      this._activeSources.delete(source), 0 !== this._activeSources.size || this._synced || "started" !== this._state.getValueAtTime(this.now()) || (
      // remove the 'implicitEnd' event and replace with an explicit end
      this._state.cancel(this.now()), this._state.setStateAtTime("stopped", this.now()));
    }
    /**
       * Play the buffer at the given startTime. Optionally add an offset
       * and/or duration which will play the buffer from a position
       * within the buffer for the given duration.
       *
       * @param  time When the player should start.
       * @param  offset The offset from the beginning of the sample to start at.
       * @param  duration How long the sample should play. If no duration is given, it will default to the full length of the sample (minus any offset)
       */    start(time, offset, duration) {
      return super.start(time, offset, duration), this;
    }
    /**
       * Internal start method
       */    _start(startTime, offset, duration) {
      // if it's a loop the default offset is the loopStart point
      offset = this._loop ? defaultArg(offset, this._loopStart) : defaultArg(offset, 0);
      // compute the values in seconds
            const computedOffset = this.toSeconds(offset);
      // compute the duration which is either the passed in duration of the buffer.duration - offset
            const origDuration = duration;
      duration = defaultArg(duration, Math.max(this._buffer.duration - computedOffset, 0));
      let computedDuration = this.toSeconds(duration);
      // scale it by the playback rate
            computedDuration /= this._playbackRate, 
      // get the start time
      startTime = this.toSeconds(startTime);
      // make the source
      const source = new ToneBufferSource({
        url: this._buffer,
        context: this.context,
        fadeIn: this.fadeIn,
        fadeOut: this.fadeOut,
        loop: this._loop,
        loopEnd: this._loopEnd,
        loopStart: this._loopStart,
        onended: this._onSourceEnd.bind(this),
        playbackRate: this._playbackRate
      }).connect(this.output);
      // set the looping properties
            this._loop || this._synced || (
      // cancel the previous stop
      this._state.cancel(startTime + computedDuration), 
      // if it's not looping, set the state change at the end of the sample
      this._state.setStateAtTime("stopped", startTime + computedDuration, {
        implicitEnd: !0
      })), 
      // add it to the array of active sources
      this._activeSources.add(source), 
      // start it
      this._loop && isUndef(origDuration) ? source.start(startTime, computedOffset) : 
      // subtract the fade out time
      source.start(startTime, computedOffset, computedDuration - this.toSeconds(this.fadeOut));
    }
    /**
       * Stop playback.
       */    _stop(time) {
      const computedTime = this.toSeconds(time);
      this._activeSources.forEach((source => source.stop(computedTime)));
    }
    /**
       * Stop and then restart the player from the beginning (or offset)
       * @param  time When the player should start.
       * @param  offset The offset from the beginning of the sample to start at.
       * @param  duration How long the sample should play. If no duration is given,
       * 					it will default to the full length of the sample (minus any offset)
       */    restart(time, offset, duration) {
      return super.restart(time, offset, duration), this;
    }
    _restart(time, offset, duration) {
      var _a;
      null === (_a = [ ...this._activeSources ].pop()) || void 0 === _a || _a.stop(time), 
      // explicitly stop only the most recently created source, to avoid edge case when > 1 source exists and _stop() erroneously sets all stop times past original end offset
      this._start(time, offset, duration);
    }
    /**
       * Seek to a specific time in the player's buffer. If the
       * source is no longer playing at that time, it will stop.
       * @param offset The time to seek to.
       * @param when The time for the seek event to occur.
       * @example
       * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3", () => {
       * 	player.start();
       * 	// seek to the offset in 1 second from now
       * 	player.seek(0.4, "+1");
       * }).toDestination();
       */    seek(offset, when) {
      const computedTime = this.toSeconds(when);
      if ("started" === this._state.getValueAtTime(computedTime)) {
        const computedOffset = this.toSeconds(offset);
        // if it's currently playing, stop it
                this._stop(computedTime), 
        // restart it at the given time
        this._start(computedTime, computedOffset);
      }
      return this;
    }
    /**
       * Set the loop start and end. Will only loop if loop is set to true.
       * @param loopStart The loop start time
       * @param loopEnd The loop end time
       * @example
       * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/malevoices_aa2_F3.mp3").toDestination();
       * // loop between the given points
       * player.setLoopPoints(0.2, 0.3);
       * player.loop = true;
       * player.autostart = true;
       */    setLoopPoints(loopStart, loopEnd) {
      return this.loopStart = loopStart, this.loopEnd = loopEnd, this;
    }
    /**
       * If loop is true, the loop will start at this position.
       */    get loopStart() {
      return this._loopStart;
    }
    set loopStart(loopStart) {
      this._loopStart = loopStart, this.buffer.loaded && assertRange(this.toSeconds(loopStart), 0, this.buffer.duration), 
      // get the current source
      this._activeSources.forEach((source => {
        source.loopStart = loopStart;
      }));
    }
    /**
       * If loop is true, the loop will end at this position.
       */    get loopEnd() {
      return this._loopEnd;
    }
    set loopEnd(loopEnd) {
      this._loopEnd = loopEnd, this.buffer.loaded && assertRange(this.toSeconds(loopEnd), 0, this.buffer.duration), 
      // get the current source
      this._activeSources.forEach((source => {
        source.loopEnd = loopEnd;
      }));
    }
    /**
       * The audio buffer belonging to the player.
       */    get buffer() {
      return this._buffer;
    }
    set buffer(buffer) {
      this._buffer.set(buffer);
    }
    /**
       * If the buffer should loop once it's over.
       * @example
       * const player = new Tone.Player("https://tonejs.github.io/audio/drum-samples/breakbeat.mp3").toDestination();
       * player.loop = true;
       * player.autostart = true;
       */    get loop() {
      return this._loop;
    }
    set loop(loop) {
      // if no change, do nothing
      if (this._loop !== loop && (this._loop = loop, 
      // set the loop of all of the sources
      this._activeSources.forEach((source => {
        source.loop = loop;
      })), loop)) {
        // remove the next stopEvent
        const stopEvent = this._state.getNextState("stopped", this.now());
        stopEvent && this._state.cancel(stopEvent.time);
      }
    }
    /**
       * Normal speed is 1. The pitch will change with the playback rate.
       * @example
       * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/femalevoices_aa2_A5.mp3").toDestination();
       * // play at 1/4 speed
       * player.playbackRate = 0.25;
       * // play as soon as the buffer is loaded
       * player.autostart = true;
       */    get playbackRate() {
      return this._playbackRate;
    }
    set playbackRate(rate) {
      this._playbackRate = rate;
      const now = this.now();
      // cancel the stop event since it's at a different time now
            const stopEvent = this._state.getNextState("stopped", now);
      stopEvent && stopEvent.implicitEnd && (this._state.cancel(stopEvent.time), this._activeSources.forEach((source => source.cancelStop()))), 
      // set all the sources
      this._activeSources.forEach((source => {
        source.playbackRate.setValueAtTime(rate, now);
      }));
    }
    /**
       * If the buffer should be reversed. Note that this sets the underlying {@link ToneAudioBuffer.reverse}, so
       * if multiple players are pointing at the same ToneAudioBuffer, they will all be reversed.
       * @example
       * const player = new Tone.Player("https://tonejs.github.io/audio/berklee/chime_1.mp3").toDestination();
       * player.autostart = true;
       * player.reverse = true;
       */    get reverse() {
      return this._buffer.reverse;
    }
    set reverse(rev) {
      this._buffer.reverse = rev;
    }
    /**
       * If the buffer is loaded
       */    get loaded() {
      return this._buffer.loaded;
    }
    dispose() {
      return super.dispose(), 
      // disconnect all of the players
      this._activeSources.forEach((source => source.dispose())), this._activeSources.clear(), 
      this._buffer.dispose(), this;
    }
  }
  __decorate([ timeRange(0) ], Player.prototype, "fadeIn", void 0), __decorate([ timeRange(0) ], Player.prototype, "fadeOut", void 0);
  /**
   * Load and play sound files.
   * @class SoundFile
   * @constructor
   * @example
   * <div>
   * <code>
   * let sound, amp, delay, cnv;
   * 
   * function preload() {
   *   //replace this sound with something local with rights to distribute
   *   //need to fix local asset loading first though :) 
   *   sound = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
   * }
   * 
   * function setup() {
   *   cnv = createCanvas(100, 100);
   *   textAlign(CENTER);
   *   cnv.mousePressed(playSound);
   *   amp = new Amplitude();
   *   delay = new Delay();
   *   sound.disconnect();
   *   sound.connect(delay);
   *   delay.connect(amp);
   * }
   * 
   * function playSound() {
   *   sound.play();
   * }
   * 
   * function draw() {
   *   let dtime = map(mouseX, 0, width, 0, 1);
   *   delay.delayTime(dtime);
   *   let f = map(mouseY, 0, height, 0, .75);
   *   delay.feedback(f);
   *   let level = map(amp.getLevel(), 0, 0.5, 0, 255);
   *   background(level, 0, 0);
   *   fill(255);
   *   text('click to play', width/2, 20);
   *  }
   * </code>
   * </div>
   */
  class SoundFile {
    constructor(buffer, successCallback) {
      this.soundfile = new Player(buffer, successCallback).toDestination(), this.playing = !1, 
      this.rate = 1, this.paused = !1;
    }
    /**
     * Start the soundfile.
     * @method start
     * @for SoundFile 
     */    start() {
      this.soundfile.playbackRate = this.rate, this.playing = !0, this.paused || this.soundfile.start();
    }
    /**
     * Start the soundfile.
     * @method play
     * @for SoundFile
     */    play() {
      this.soundfile.playbackRate = this.rate, this.playing = !0, this.paused || this.soundfile.start();
    }
    /**
     * Stop the soundfile.
     * @method stop
     * @for SoundFile 
     */    stop() {
      this.soundfile.stop(), this.playing = !1;
    }
    /**
     * Pause the soundfile.
     * @method pause
     * @for SoundFile 
     * @example
     * <div>
     * <code>
     * let player;
     *
     * function preload() {
     *   player = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
     * }
     * 
     * function setup() {
     *   describe('A sketch that pauses and resumes sound file playback.');
     *   let cnv = createCanvas(100, 100);
     *   cnv.mousePressed(playSound);
     *   background(220);
     *   textAlign(CENTER);
     *   textWrap(WORD);
     *   textSize(10);
     *   background(220);
     *   text('click to play', 0, 20, 100);
     *   
     *   player.loop();
     * }
     * 
     * function playSound() {
     *   if (!player.isPlaying()) {
     *     player.play();
     *     background(220);
     *     text('click to pause', 0, 20, 100);
     *   }
     *   else {
     *     player.pause();
     *     background(220);
     *     text('click to play', 0, 20, 100);
     *   }
     * }
     * </code>
     * </div>
     */    pause() {
      //no such pause method in Tone.js need to find workaround
      this.soundfile.playbackRate = 0, this.playing = !1, this.paused = !0;
    }
    /**
     * Loop the soundfile.
     * @method loop
     * @for SoundFile
     * @param {Boolean} loopState Set to True or False in order to set the loop state.
     */    loop(value = !0) {
      this.soundfile.loop = value;
    }
    /**
     * Set a loop region, and optionally a playback rate, and amplitude for the soundfile.
     * @method setLoop
     * @for SoundFile
     * @param {Number} [startTime] Set to True or False in order to set the loop state.
     * @param {Number} [rate] Set to True or False in order to set the loop state.
     * @param {Number} [amp] Set to True or False in order to set the loop state.
     * @param {Number} [duration] Set to True or False in order to set the loop state.
     */    loopPoints(startTime = 0, duration = this.soundfile.buffer.duration, schedule = 0) {
      this.soundfile.loopStart = startTime, this.soundfile.loopEnd = startTime + duration;
    }
    /**
     * Adjust the amplitude of the soundfile.
     * @method amp
     * @for SoundFile
     * @param {Number} amplitude amplitude value between 0 and 1.
     */    amp(value) {
      let dbValue = gainToDb(value);
      this.soundfile.volume.value = dbValue;
    }
    /**
     * Change the path for the soundfile.
     * @method setPath
     * @for SoundFile
     * @param {String} path Path to the sound file.
     * @param {Function} [successCallback] Function to call when the sound file is loaded.
     * @example
     * <div>
     * <code>
     * let soundSource, cnv, btn;
     *
     * function preload() {
     *   soundSource = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
     * }
     * 
     * function setup() {
     *   describe(
     *     'a sketch that says click to play sound. there is a button that says load sound. when you click the button, the path of the sound file player changes and the new sound plays.');
     *   cnv = createCanvas(100, 100);
     *   cnv.mousePressed(playSound);
     *   background(220);
     *   textAlign(CENTER);
     *   textWrap(WORD);
     *   textSize(10);
     *   text('click to play sound or the button to load a new sound', 0, 20, 100);
     *   btn = createButton('New Sound');
     *   btn.mousePressed(setNewPath);
     *   soundSource.loop();  
     * }
     * 
     * function playSound() {
     *   soundSource.play();
     * }
     * 
     * function setNewPath() {
     *   background(220);
     *   text('a new sound was loaded', 0, 20, 100);
     *   soundSource.setPath('https://tonejs.github.io/audio/berklee/gong_2.mp3', playSound); 
     * }
     * </code>
     * </div>
     */    setPath(path, successCallback) {
      this.soundfile.load(path).then((() => {
        successCallback ? successCallback() : console.log("Audio loaded successfully!");
      })).catch((error => {
        console.error("Error loading audio:", error);
      }));
    }
    /**
     * Set the playback rate of the soundfile.
     * @method rate
     * @for SoundFile
     * @param {Number} rate 1 is normal speed, 2 is double speed. Negative values plays the soundfile backwards.  
     */    rate(value) {
      this.soundfile.playbackRate = value, this.rate = value;
    }
    /**
     * Returns the duration of a sound file in seconds.
     * @method duration
     * @for SoundFile 
     * @return {Number} duration
     */    duration() {
      return this.soundfile.buffer.duration;
    }
    /**
     * Return the sample rate of the sound file.
     * @method sampleRate
     * @for SoundFile
     * @return {Number} sampleRate
     */    sampleRate() {
      if (this.soundfile.buffer) return this.soundfile.buffer.sampleRate;
    }
    /**
     * Move the playhead of a soundfile that is currently playing to a new position.
     * @method jump
     * @for SoundFile 
     * @param {Number} timePoint Time to jump to in seconds.
     */    jump(value) {
      this.soundfile.seek(value);
    }
    /**
     * Return the playback state of the soundfile.
     * @method isPlaying
     * @for SoundFile 
     * @return {Boolean} Playback state, true or false.
     */    isPlaying() {
      return this.playing;
    }
    /**
     * Return the playback state of the soundfile.
     * @method isLooping
     * @for SoundFile 
     * @return {Boolean} Looping State, true or false.
     */    isLooping() {
      return this.soundfile.loop;
    }
    /**
     * Define a function to call when the soundfile is done playing.
     * @method onended
     * @for SoundFile
     * @param {Function} callback Name of a function that will be called when the soundfile is done playing.
     * @example
     * <div>
     * <code>
     * let player;
     *
     * function preload() {
     *   player = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
     * }
     * 
     * function setup() {
     *   let cnv = createCanvas(100, 100);
     *   background(220);
     *   textAlign(CENTER);
     *   textSize(10);
     *   text('click to play', width/2, height/2);
     *   cnv.mousePressed(playSound);
     *   player.onended(coolFunction);
     * }
     * 
     * function coolFunction() {
     *   background(220);
     *   text('sound is done', width/2, height/2);
     * }
     * 
     * function playSound() {
     *   background(0, 255, 255);
     *   text('sound is playing', width/2, height/2);
     *   if (!player.isPlaying()) {
     *     player.play();
     *   }
     * }
     * </code>
     * </div>
     */    onended(callback) {
      this.soundfile.onstop = callback;
    }
    /**
     * Return the number of samples in a sound file.
     * @method frames
     * @for SoundFile
     * @return {Number} The number of samples in the sound file.
     * @example
     * <div>
     * <code>
     * let player;
     *
     * function preload() {
     *   player = loadSound('https://tonejs.github.io/audio/berklee/gong_1.mp3');
     * }
     * 
     * function setup() {
     *   describe('A sketch that calculates and displays the length of a sound file using number of samples and sample rate.');
     *   createCanvas(100, 100);
     *   background(220);
     *   textAlign(CENTER);
     *   textWrap(WORD);
     *   textSize(10);
     *   frames = player.frames();
     *   sampleRate = player.sampleRate();
     *   sampleLength = round((frames / sampleRate), 2);
     *   info = `sample is ${sampleLength} seconds long`;
     *   text(info, 0, 20, 100);
     * }
     * </code>
     * </div>
     */    frames() {
      if (this.soundfile.buffer) return this.soundfile.buffer.length;
    }
    /**
     * Gets the number of channels in the sound file.
     * @method sampleRate
     * @for SoundFile
     * @return Returns the sample rate of the sound file.
     */    sampleRate() {
      if (this.soundfile.buffer) return this.soundfile.buffer.sampleRate;
    }
    /**
     * Gets the number of channels in the sound file.
     * @method channels
     * @for SoundFile
     * @return Returns the number of channels in the sound file.
     */    channels() {
      if (this.soundfile.buffer) return this.soundfile.buffer.numberOfChannels;
    }
    connect(destination) {
      this.soundfile.connect(destination.getNode());
    }
    disconnect() {
      this.soundfile.disconnect(Context.destination);
    }
    getNode() {
      return this.soundfile;
    }
  }
  var SoundFile$1 = SoundFile;
  /**
   * UserMedia uses MediaDevices.getUserMedia to open up and external microphone or audio input.
   * Check [MediaDevices API Support](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
   * to see which browsers are supported. Access to an external input
   * is limited to secure (HTTPS) connections.
   * @example
   * const meter = new Tone.Meter();
   * const mic = new Tone.UserMedia().connect(meter);
   * mic.open().then(() => {
   * 	// promise resolves when input is available
   * 	console.log("mic open");
   * 	// print the incoming mic levels in decibels
   * 	setInterval(() => console.log(meter.getValue()), 100);
   * }).catch(e => {
   * 	// promise is rejected when the user doesn't have or allow mic access
   * 	console.log("mic not open");
   * });
   * @category Source
   */  class UserMedia extends ToneAudioNode {
    constructor() {
      const options = optionsFromArguments(UserMedia.getDefaults(), arguments, [ "volume" ]);
      super(options), this.name = "UserMedia", this._volume = this.output = new Volume({
        context: this.context,
        volume: options.volume
      }), this.volume = this._volume.volume, readOnly(this, "volume"), this.mute = options.mute;
    }
    static getDefaults() {
      return Object.assign(ToneAudioNode.getDefaults(), {
        mute: !1,
        volume: 0
      });
    }
    /**
       * Open the media stream. If a string is passed in, it is assumed
       * to be the label or id of the stream, if a number is passed in,
       * it is the input number of the stream.
       * @param  labelOrId The label or id of the audio input media device.
       *                   With no argument, the default stream is opened.
       * @return The promise is resolved when the stream is open.
       */    open(labelOrId) {
      return __awaiter(this, void 0, void 0, (function*() {
        assert(UserMedia.supported, "UserMedia is not supported"), 
        // close the previous stream
        "started" === this.state && this.close();
        const devices = yield UserMedia.enumerateDevices();
        isNumber(labelOrId) ? this._device = devices[labelOrId] : (this._device = devices.find((device => device.label === labelOrId || device.deviceId === labelOrId)), 
        // didn't find a matching device
        !this._device && devices.length > 0 && (this._device = devices[0]), assert(isDefined(this._device), `No matching device ${labelOrId}`));
        // do getUserMedia
                const constraints = {
          audio: {
            echoCancellation: !1,
            sampleRate: this.context.sampleRate,
            noiseSuppression: !1,
            mozNoiseSuppression: !1
          }
        };
        this._device && (
        // @ts-ignore
        constraints.audio.deviceId = this._device.deviceId);
        const stream = yield navigator.mediaDevices.getUserMedia(constraints);
        // start a new source only if the previous one is closed
                if (!this._stream) {
          this._stream = stream;
          // Wrap a MediaStreamSourceNode around the live input stream.
          const mediaStreamNode = this.context.createMediaStreamSource(stream);
          // Connect the MediaStreamSourceNode to a gate gain node
                    connect(mediaStreamNode, this.output), this._mediaStream = mediaStreamNode;
        }
        return this;
      }));
    }
    /**
       * Close the media stream
       */    close() {
      return this._stream && this._mediaStream && (this._stream.getAudioTracks().forEach((track => {
        track.stop();
      })), this._stream = void 0, 
      // remove the old media stream
      this._mediaStream.disconnect(), this._mediaStream = void 0), this._device = void 0, 
      this;
    }
    /**
       * Returns a promise which resolves with the list of audio input devices available.
       * @return The promise that is resolved with the devices
       * @example
       * Tone.UserMedia.enumerateDevices().then((devices) => {
       * 	// print the device labels
       * 	console.log(devices.map(device => device.label));
       * });
       */    static enumerateDevices() {
      return __awaiter(this, void 0, void 0, (function*() {
        return (yield navigator.mediaDevices.enumerateDevices()).filter((device => "audioinput" === device.kind));
      }));
    }
    /**
       * Returns the playback state of the source, "started" when the microphone is open
       * and "stopped" when the mic is closed.
       */    get state() {
      return this._stream && this._stream.active ? "started" : "stopped";
    }
    /**
       * Returns an identifier for the represented device that is
       * persisted across sessions. It is un-guessable by other applications and
       * unique to the origin of the calling application. It is reset when the
       * user clears cookies (for Private Browsing, a different identifier is
       * used that is not persisted across sessions). Returns undefined when the
       * device is not open.
       */    get deviceId() {
      return this._device ? this._device.deviceId : void 0;
    }
    /**
       * Returns a group identifier. Two devices have the
       * same group identifier if they belong to the same physical device.
       * Returns null  when the device is not open.
       */    get groupId() {
      return this._device ? this._device.groupId : void 0;
    }
    /**
       * Returns a label describing this device (for example "Built-in Microphone").
       * Returns undefined when the device is not open or label is not available
       * because of permissions.
       */    get label() {
      return this._device ? this._device.label : void 0;
    }
    /**
       * Mute the output.
       * @example
       * const mic = new Tone.UserMedia();
       * mic.open().then(() => {
       * 	// promise resolves when input is available
       * });
       * // mute the output
       * mic.mute = true;
       */    get mute() {
      return this._volume.mute;
    }
    set mute(mute) {
      this._volume.mute = mute;
    }
    dispose() {
      return super.dispose(), this.close(), this._volume.dispose(), this.volume.dispose(), 
      this;
    }
    /**
       * If getUserMedia is supported by the browser.
       */    static get supported() {
      return isDefined(navigator.mediaDevices) && isDefined(navigator.mediaDevices.getUserMedia);
    }
  }
  /**
   * Get sound from an input source, typically a computer microphone.
   * @class AudioIn
   * @constructor
   * @example
   * <div>
   * <code>
   * let mic, delay, filter;
   * 
   * function setup() {
   *   let cnv = createCanvas(100, 100);
   *   cnv.mousePressed(startMic);
   *   background(220);
   *   
   *   mic = new AudioIn();
   *   delay = new Delay(0.74, 0.1);
   *   filter = new Biquad(600, "bandpass");
   *   
   *   mic.disconnect();
   *   mic.connect(delay);
   *   delay.disconnect();
   *   delay.connect(filter);
   *   
   *   textAlign(CENTER);
   *   textWrap(WORD);
   *   textSize(10);
   *   text('click to open mic, watch out for feedback', 0, 20, 100);
   *   describe('a sketch that accesses the user\'s microphone and connects it to a delay line.')
   * }
   * 
   * function startMic() {
   *   mic.start();
   * }
   * 
   * function draw() {
   *   d = map(mouseX, 0, width, 0.0, 0.5);
   *   delay.delayTime(d);
   * }
   * </code>
   * </div>
   */  
  /*import { getAudioContext, setAudioContext, userStartAudio, userStopAudio } from './Utils';
  p5.prototype.getAudioContext = getAudioContext;
  p5.prototype.setAudioContext = setAudioContext;
  p5.prototype.userStartAudio = userStartAudio;
  p5.prototype.userStopAudio = userStopAudio;
  */
  p5.prototype.Oscillator = Oscillator, p5.prototype.SawOsc = class extends Oscillator {
    constructor(frequency) {
      super(frequency), this.osc.type = "sawtooth";
    }
  }
  /**
   * Creates a square oscillator.
   * @class SqrOsc
   * @constructor
   * @extends Oscillator
   * @param {Number} [freq] Set the frequency
   */ , p5.prototype.SinOsc = 
  /**
   * Creates a sine oscillator.
   * @class SinOsc
   * @constructor
   * @extends Oscillator
   * @param {Number} [freq] Set the frequency
   */
  class extends Oscillator {
    constructor(frequency) {
      super(frequency), this.osc.type = "sine";
    }
  }, p5.prototype.TriOsc = 
  /**
   * Creates a triangle oscillator.
   * @class TriOsc
   * @constructor
   * @extends Oscillator
   * @param {Number} [freq] Set the frequency
   */
  class extends Oscillator {
    constructor(frequency) {
      super(frequency), this.osc.type = "triangle";
    }
  }, p5.prototype.SqrOsc = class extends Oscillator {
    constructor(frequency) {
      super(frequency), this.osc.type = "square";
    }
  }, p5.prototype.Envelope = class {
    constructor(a = .1, d = .12, s = .1, r = .2) {
      this.attack = a, this.attackLevel = 1, this.decay = d, this.sustain = s, this.release = r, 
      this.envelope = new AmplitudeEnvelope({
        attack: this.attack,
        decay: this.decay,
        sustain: this.sustain,
        release: this.release
      }).toDestination();
    }
    /**
     * Trigger the envelope and release it after the sustain time.
     * @method play
     * @for Envelope
     */    play() {
      this.envelope.triggerAttackRelease(this.sustain);
    }
    /**
     * Trigger the Attack, and Decay portion of the Envelope. Similar to holding
     * down a key on a piano, but it will hold the sustain level until you let go.
     * @method triggerAttack
     * @for Envelope
     * @example
     * <div>
     * <code>
     * let osc, env;
     * 
     * function setup() {
     *   let cnv = createCanvas(100, 100);
     *   background(220);
     *   cnv.mousePressed(playSound);
     *   cnv.mouseReleased(stopSound);
     *   textAlign(CENTER);
     *   textSize(10);
     *   text('tap to triggerAttack', width/2, height/2);
     * 
     *   osc = new Oscillator();
     *   osc.disconnect();
     *   env = new Envelope();
     *   osc.connect(env);
     * }
     * 
     * function playSound() {
     *   background(0, 255, 255);
     *   text('release to release', width/2, height/2);
     *   osc.start();
     *   env.attackTime(random(0.00, 0.25));
     *   env.triggerAttack(0.5);
     * }
     * 
     * function stopSound() {
     *   background(220);
     *   text('tap to triggerAttack', width/2, height/2);
     *   env.releaseTime(random(0.1, 0.3));
     *   env.triggerRelease();
     * }
     * </code>
     * </div>
     */    triggerAttack() {
      this.envelope.triggerAttack();
    }
    /**
     * Trigger the Release of the envelope. Similar to releasing the key on 
     * a piano and letting the sound fade according to the release level and 
     * release time. 
     * @method triggerRelease
     * @for Envelope
     * @example
     * <div>
     * <code>
     * let osc, env;
     * 
     * function setup() {
     *   let cnv = createCanvas(100, 100);
     *   background(220);
     *   cnv.mousePressed(playSound);
     *   cnv.mouseReleased(stopSound);
     *   textAlign(CENTER);
     *   textSize(10);
     *   text('tap to triggerAttack', width/2, height/2);
     * 
     *   osc = new Oscillator();
     *   osc.disconnect();
     *   env = new Envelope();
     *   osc.connect(env);
     * }
     * 
     * function playSound() {
     *   background(0, 255, 255);
     *   text('release to release', width/2, height/2);
     *   osc.start();
     *   env.attackTime(random(0.00, 0.25));
     *   env.triggerAttack(0.5);
     * }
     * 
     * function stopSound() {
     *   background(220);
     *   text('tap to triggerAttack', width/2, height/2);
     *   env.releaseTime(random(0.1, 0.3));
     *   env.triggerRelease();
     * }
     * </code>
     * </div>
     */    triggerRelease() {
      this.envelope.triggerRelease();
    }
    /**
     * @method setInput
     * @for Envelope
     * @param {Object} unit A p5.sound Object 
     */    setInput(input) {
      input.getNode().connect(this.envelope);
    }
    /**
     * Sets the attack, decay, sustain, and release times of the envelope.
     * @method setADSR
     * @for Envelope
     * @param {Number} attack how quickly the envelope reaches the maximum level
     * @param {Number} decay how quickly the envelope reaches the sustain level
     * @param {Number} sustain how long the envelope stays at the decay level
     * @param {Number} release how quickly the envelope fades out after the sustain level
     */    setADSR(a, d, s, r) {
      this.envelope.attack = a, this.envelope.decay = d, this.envelope.sustain = s, this.envelope.release = r;
    }
    /**
     * Sets the release time of the envelope.
     * @method releaseTime
     * @for Envelope
     * @param {Number} releaseTime the release time in seconds 
     */    releaseTime(value) {
      this.envelope.release = value;
    }
    /**
     * Sets the attack time of the envelope.
     * @method attackTime
     * @for Envelope
     * @param {Number} attackTime the attack time in seconds 
     */    attackTime(value) {
      this.envelope.attack = value;
    }
    connect(destination) {
      this.envelope.connect(destination.getNode());
    }
    disconnect() {
      this.envelope.disconnect(Context.destination);
    }
    getNode() {
      return this.envelope;
    }
  }, p5.prototype.Delay = class {
    constructor(d = .25, f = .2) {
      this.d = d, this.f = f, this.delay = new FeedbackDelay(this.d, this.f).toDestination();
    }
    /**
     * Set the delay time in seconds.
     * @method delayTime
     * @for Delay
     * @param {Number} delayTime The delay time in seconds. 
     * @param {Number} [rampTime] The time in seconds it takes to ramp to the new delay time. 
     *                            By default it is 0.1 seconds. Setting it to 0 will change 
     *                            the delay time immediately and demonstrate legacy behavior.
     * @example
     * <div>
     * <code>
     * let osc, delay, env;
     *
     * function setup() {
     *   let cnv = createCanvas(100, 100);
     *   background(220);
     *   textAlign(CENTER);
     *   textSize(9);
     *   text('click and drag mouse', width/2, height/2);
     * 
     *   osc = new Oscillator('sawtooth');
     *   osc.amp(0.74);
     *   env = new Envelope(0.01);
     *   delay = new Delay(0.12, 0.7);
     *   
     *   osc.disconnect();
     *   osc.connect(env);
     *   env.disconnect();
     *   env.connect(delay);
     * 
     *   cnv.mousePressed(oscStart);
     *   cnv.mouseReleased(oscStop);
     *   cnv.mouseOut(oscStop);
     *   describe('Tap to play a square wave with delay effect.');
     * }
     * 
     * function oscStart() {
     *   background(0, 255, 255);
     *   text('release to hear delay', width/2, height/2);
     *   osc.start();
     *   env.triggerAttack();
     * }
     * 
     * function oscStop() {
     *   background(220);
     *   text('click and drag mouse', width/2, height/2);
     *   env.triggerRelease();
     * } 
     *   
     * function draw() {
     *   
     *   let dtime = map(mouseX, 0, width, 0.1, 0.5);
     *   delay.delayTime(dtime);
     * }
     */    delayTime(value, rampTime = .1) {
      //legacy behavior
      0 != rampTime ? 
      //new tape emulation behavior
      this.delay.delayTime.rampTo(clamp(value, 0, 1), rampTime) : this.delay.delayTime.value = clamp(value, 0, 1);
    }
    /**
     * The amount of feedback in the delay line.
     * @method feedback
     * @for Delay
     * @param {number} feedbackAmount A number between 0 and 0.99.
     */    feedback(value) {
      this.delay.feedback.rampTo(clamp(value, 0, .99), .1);
    }
    /**
     * Process an input signal with a delay effect.
     * @method process
     * @for Delay
     * @param {Object} unit A p5.sound source such as an Oscillator, Soundfile, or AudioIn object. 
     * @param {Number} delayTime The amount of delay in seconds. A number between 0 and 1.
     * @param {Number} feedback The amount of feedback. A number between 0 and 1.
     */    process(input, delayTime, feedback) {
      this.delay.delayTime.value = delayTime, this.delay.feedback.value = feedback, input.getNode().connect(this.delay);
    }
    /**
     * Adjust the amplitude of the delay effect.
     * @method amp
     * @for Delay
     * @param {Number} amplitudeAmount An amplitude value between 0 and 1.
     */    amp(value) {
      let dbValue = gainToDb(value);
      this.delay.volume.rampTo(dbValue, .1);
    }
    getNode() {
      return this.delay;
    }
    connect(destination) {
      this.delay.connect(destination.getNode());
    }
    disconnect() {
      this.delay.disconnect(Context.destination);
    }
  }, p5.prototype.Reverb = class {
    constructor(decayTime) {
      this.decayTime = decayTime || 1, this.reverb = new Reverb$1(this.decayTime).toDestination();
    }
    /**
     * Set the decay time of the reverb.
     * @method set
     * @for Reverb
     * @param {Number} time Decay time of the reverb
     */    set(t) {
      this.reverb.decay = t;
    }
    connect(destination) {
      this.reverb.connect(destination.getNode());
    }
    disconnect() {
      this.reverb.disconnect(Context.destination);
    }
    getNode() {
      return this.reverb;
    }
  }, p5.prototype.Biquad = class {
    constructor(c = 800, t = "lowpass") {
      this.type = t, this.cutoff = c, this.biquad = new BiquadFilter(this.cutoff, this.type).toDestination();
    }
    /**
     * The filter's resonance factor.
     * @method res
     * @for Biquad
     * @param {Number} resonance resonance of the filter. A number between 0 and 100.
     */    res(r) {
      this.biquad.Q.value = r;
    }
    /**
     * The gain of the filter in dB units.
     * @method gain
     * @for Biquad
     * @param {Number} gain gain value in dB units. The gain is only used for lowshelf, highshelf, and peaking filters.
     */    gain(g) {
      this.biquad.gain.value = g;
    }
    /**
     * Set the type of the filter.
     * @method setType
     * @for Biquad
     * @param {String} type type of the filter. Options: "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking" 
     */    setType(t) {
      this.biquad.type = t;
    }
    /**
     * Set the cutoff frequency of the filter.
     * @method freq
     * @for Biquad
     * @param {Number} cutoffFrequency the cutoff frequency of the filter.
     */    freq(f) {
      this.biquad.frequency.value = clamp(f, 0, 24e3);
    }
    connect(destination) {
      this.biquad.connect(destination.getNode());
    }
    disconnect() {
      this.biquad.disconnect(Context.destination);
    }
    getNode() {
      return this.biquad;
    }
  }, p5.prototype.PitchShifter = class {
    constructor(shiftValue = 1) {
      this.pitchshifter = new PitchShift(shiftValue).toDestination();
    }
    /**
       * Shift the pitch of the source audio.
       * @method shift
       * @for PitchShifter
       * @param {Number} pitchValue amount of semitones to shift the pitch
       */    shift(value) {
      void 0 !== value && (this.pitchshifter.pitch = value);
    }
    connect(destination) {
      this.pitchshifter.connect(destination.getNode());
    }
    disconnect() {
      this.pitchshifter.disconnect(Context.destination);
    }
    getNode() {
      return this.pitchshifter;
    }
  }
  /**
   * Generate a gain node to use for mixing and main volume.
   * @class Gain
   * @constructor
   * @example
   * <div>
   * <code>
   * let cnv, soundFile, osc, gain;
   * 
   * function preload() {
   *   soundFile = loadSound('assets/Damscray_DancingTiger.mp3');
   * }
   * 
   * function setup() {
   *   cnv = createCanvas(100, 100);
   *   cnv.mousePressed(playSound);
   * 
   *   gain = new Gain(0.74);
   *   osc = new p5.Oscillator();
   *   osc.amp(0.74);
   *   osc.disconnect();
   *   soundFile.loop();
   *   soundFile.disconnect();
   * 
   *   //connect both sound sources to gain node
   *   soundFile.connect(gain);
   *   osc.connect(gain);
   * }
   * 
   * function playSound() {
   *   soundFile.play();
   *   soundFile.play();
   * }
   * 
   * function draw() {
   *   background(220);
   *   let level = map(mouseX, 0, width, 0, 1);
   *   gain.amp(level);
   * }
   * </code>
   * </div>
   */ , p5.prototype.Gain = class {
    constructor(value = 1) {
      this.gain = new Gain$1(value).toDestination();
    }
    /**
     * Adjust the amplitude of the soundfile.
     * @method amp
     * @for Gain
     * @param {Number} amplitude amplitude value between 0 and 1.
     */    amp(value) {
      this.gain.gain.rampTo(value, .1);
    }
    connect(destination) {
      this.gain.connect(destination.getNode());
    }
    disconnect() {
      this.gain.disconnect(Context.destination);
    }
    getNode() {
      return this.gain;
    }
  }, p5.prototype.Amplitude = class {
    constructor() {
      this.amplitude = new Meter({
        normalRange: !0
      });
    }
    /**
     * Connect an audio source to the amplitude object.
     * @method setInput
     * @for Amplitude
     * @param {Object} input - An object that has audio output.
     */    setInput(input) {
      input.getNode().connect(this.amplitude);
    }
    /**
     * Get the current amplitude value of a sound.
     * @method getLevel
     * @for Amplitude
     * @return {Number} Amplitude level (volume) of a sound.
     */    getLevel() {
      return this.amplitude.getValue();
    }
    connect(destination) {
      this.amplitude.connect(destination.getNode());
    }
    disconnect() {
      this.amplitude.disconnect(Context.destination);
    }
    getNode() {
      return this.amplitude;
    }
  }, p5.prototype.FFT = class {
    constructor(fftSize = 32) {
      this.fftSize = fftSize, this.analyzer = new FFT$1({
        size: this.fftSize,
        normalRange: !0
      }), this.samples = new Waveform, 
      //creates a single gain node to connect to for the analyzer and waveform
      this.gain = new Gain$1(1), this.gain.connect(this.analyzer), this.gain.connect(this.samples);
    }
    //return the gain node which is the parent node to the analyzer and waveform
    getNode() {
      return this.gain;
    }
    /**
       * Returns the frequency spectrum of the input signal.
       * @method analyze
       * @for FFT
       * @returns {Array} Array of amplitude values from 0 to 1.
       */    analyze() {
      return this.analyzer.getValue();
    }
    /**
       * Returns an array of sample values from the input audio.
       * @method waveform
       * @for FFT
       * @return {Array} Array of sample values from -1 to -1.
       */    waveform() {
      return this.samples.getValue();
    }
  }
  /**
   * Generate a buffer with random values.
   * @class Noise
   * @constructor
   * @param {String} [type] - the type of noise (white, pink, brown)
   * @example
   * <div>
   * <code>
   * let noise, env, cnv;
   * let types = ['white', 'pink', 'brown'];
   * let noiseType = 'brown';
   * 
   * function setup() {
   *   cnv = createCanvas(100, 100);
   *   textAlign(CENTER);
   *   cnv.mousePressed(start);
   *   noise = new Noise(noiseType);
   *   env = new Envelope(0.01, 0.1, 0.15, 0.5);
   *   noise.disconnect();
   *   noise.connect(env);
   *   noise.start();
   * }
   * 
   * function start() {
   *   noiseType = random(types);
   *   noise.type(noiseType);
   *   env.play();
   * }
   * 
   * function draw() {
   *   background(noiseType);
   *   text('tap to play', width/2, 20);
   *   let txt = 'type: ' + noiseType;
   *   text(txt, width/2, 40);
   * }
   * </code>
   * </div>
   */ , p5.prototype.Noise = class {
    constructor(type) {
      void 0 === type && (type = "white"), this.noise = (new Noise$1).toDestination(), 
      this.noise.type = type;
    }
    /**
     * @method type
     * @for Noise
     * @param {String} t - the type of noise (white, pink, brown) 
     */    type(t) {
      this.noise.type = t;
    }
    /**
     * Starts the noise source.
     * @method stop
     * @for Noise
     */    start() {
      this.noise.start();
    }
    /**
     * Stops the noise source.
     * @method stop
     * @for Noise
     */    stop() {
      this.noise.stop();
    }
    connect(destination) {
      this.noise.connect(destination.getNode());
    }
    disconnect() {
      this.noise.disconnect(Context.destination);
    }
    getNode() {
      return this.noise;
    }
  }, p5.prototype.Panner = class {
    constructor() {
      this.panner = new Panner$1(0).toDestination();
    }
    /**
     * Pan a sound source left or right.
     * @method pan
     * @for Panner
     * @param {Number, Object}  panAmount Sets the pan position of the sound source. Can be a value between -1 and 1 or a an audio rate signal such as an LFO.
     */    pan(p) {
      "object" != typeof p ? this.panner.pan.rampTo(clamp(p, -1, 1), .01) : p.getNode().connect(this.panner.pan);
    }
    getNode() {
      return this.panner;
    }
    connect(destination) {
      this.panner.connect(destination.getNode());
    }
    disconnect() {
      this.panner.disconnect(Context.destination);
    }
  }, p5.prototype.Panner3D = class {
    constructor() {
      this.panner3d = new Panner3D$1({
        coneInnerAngle: 360,
        coneOuterAngle: 360,
        coneOuterGain: 1,
        positionX: 0,
        positionY: 0,
        positionZ: 0
      }).toDestination();
    }
    /**
     * Connects an input source to the 3D panner.
     * @method process
     * @for Panner3D
     * @param {Object} input an input source to process with the 3D panner.
     */    process(input) {
      input.getNode().connect(this.panner3d);
    }
    /**
     * Set the x, y, and z position of the 3D panner.
     * @method set
     * @for Panner3D
     * @param {Number} xPosition the x coordinate of the panner.
     * @param {Number} yPosition the y coordinate of the panner.
     * @param {Number} zPosition the z coordinate of the panner.
     */    set(x, y, z) {
      this.panner3d.positionX.rampTo(x, .01), this.panner3d.positionY.rampTo(y, .01), 
      this.panner3d.positionZ.rampTo(z, .01);
    }
    /**
     * The rolloff rate of the panner.
     * @method setFalloff
     * @for Panner3D
     * @param {Number} rolloffFactor 
     * @param {Number} maxDistance 
     */    setFalloff(rolloffFactor, maxDistance) {
      this.panner3d.rolloffFactor = rolloffFactor, this.panner3d.maxDistance = maxDistance;
    }
    /**
     * Set the maximum distance of the panner.
     * @method maxDist
     * @for Panner3D
     * @param {Number} distance the maximum distance that the sound source can be heard from.
     */    maxDist(d) {
      this.panner3d.maxDistance = d;
    }
    /**
     * Set the rolloff rate of the panner.
     * @method rolloff
     * @for Panner3D
     * @param {Number} r the rolloff rate of the panner.
     */    rolloff(r) {
      this.panner3d.rolloffFactor = r;
    }
    /**
     * Set the X position of the sound source.
     * @method positionX
     * @for Panner3D
     * @param {Number} positionX the x position of the sound source.
     */    positionX(p) {
      this.panner3d.positionX.rampTo(p, .01);
    }
    /**
     * Set the Y position of the sound source.
     * @method positionY
     * @for Panner3D
     * @param {Number} positionY the y position of the sound source.
     */    positionY(p) {
      this.panner3d.positionY.rampTo(p, .01);
    }
    /**
     * Set the Z position of the sound source.
     * @method positionZ
     * @for Panner3D
     * @param {Number} positionZ the z position of the sound source.
     */    positionZ(p) {
      this.panner3d.positionZ.rampTo(p, .01);
    }
    connect(destination) {
      this.panner3d.connect(destination.getNode());
    }
    disconnect() {
      this.panner3d.disconnect(Context.destination);
    }
    getNode() {
      return this.panner3d;
    }
  }, p5.prototype.loadSound = function(path) {
    return new SoundFile(path, (function() {
      self._decrementPreload();
    }));
  }, p5.prototype.registerPreloadMethod("loadSound", p5.prototype), p5.prototype.SoundFile = SoundFile$1, 
  p5.prototype.AudioIn = class {
    constructor() {
      this.audioIn = (new UserMedia).toDestination();
    }
    /**
       * Start the audio input.
       * @method start
       * @for AudioIn
       */    start() {
      Tone.start(), this.audioIn.open().then((() => {
        // promise resolves when input is available
        console.log("mic open");
        // print the incoming mic levels in decibels
            })).catch((e => {
        // promise is rejected when the user doesn't have or allow mic access
        console.log("mic not open");
      }));
    }
    /**
       * Stop the audio input.
       * @method stop
       * @for AudioIn
       */    stop() {
      this.audioIn.close();
    }
    /**
       * Set amplitude (volume) of a mic input between 0 and 1.0.
       * @method amp
       * @for AudioIn
       * @param {Number} amplitudeAmount An amplitude value between 0 and 1.
       */    amp(value) {
      let dbValue = gainToDb(value);
      this.delay.volume.rampTo(dbValue, .1);
    }
    getNode() {
      return this.audioIn;
    }
    connect(destination) {
      this.audioIn.connect(destination.getNode());
    }
    disconnect() {
      this.audioIn.disconnect(Context.destination);
    }
  };
})();
