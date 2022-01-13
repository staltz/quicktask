export default function microtask(): (fn: Function) => void {
  if (typeof queueMicrotask !== 'undefined') {
    return queueMicrotask;
  } else if (typeof setImmediate !== 'undefined') {
    return setImmediate;
  } else if (typeof process !== 'undefined') {
    return process.nextTick;
  } else {
    return setTimeout;
  }
}
