import { hasAudioContext } from "tone/build/esm/core/context/AudioContext.js";
import { Context } from "tone/build/esm/core/context/Context.js";
import { DummyContext } from "tone/build/esm/core/context/DummyContext.js";
import {
  isAudioContext,
  isOfflineAudioContext
} from "tone/build/esm/core/util/AdvancedTypeCheck.js";

const dummyContext = new DummyContext();
let globalContext = dummyContext;

function wrapContext(context) {
  if (context instanceof Context || context instanceof DummyContext) {
    return context;
  }

  if (isAudioContext(context) || isOfflineAudioContext(context)) {
    return new Context(context);
  }

  return context;
}

export function getContext() {
  if (globalContext === dummyContext && hasAudioContext) {
    setContext(new Context());
  }

  return globalContext;
}

export function setContext(context, disposeOld = false) {
  if (disposeOld && globalContext && typeof globalContext.dispose === "function") {
    globalContext.dispose();
  }

  globalContext = wrapContext(context);
}

export function start() {
  return globalContext.resume();
}
