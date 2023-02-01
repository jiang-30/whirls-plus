export default function (stack) {
  return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^')
}
