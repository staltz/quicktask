export default function microtask(): (fn: Function) => void {
  if (typeof MutationObserver !== 'undefined') {
    const node: any = document.createTextNode('');
    const queue: Array<Function> = [];
    let i = 0;
    new MutationObserver(function() {
      while (queue.length) {
        (queue.shift() as Function)();
      }
    }).observe(node, {characterData: true});
    return function(fn: Function) {
      queue.push(fn);
      node.data = i = 1 - i;
    };
  } else if (typeof setImmediate !== 'undefined') {
    return setImmediate;
  } else if (typeof process !== 'undefined') {
    return process.nextTick;
  } else {
    return setTimeout;
  }
}
