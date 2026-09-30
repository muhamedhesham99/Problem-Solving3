const strs = ["flower", "flow", "flight", "floor"];

function longestCommonPrefix(array) {
  let prefix = "";
  let mismatch = false;

  for (let i = 0; i < array[0].length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j][i] !== array[0][i]) {
        mismatch = true;
        break;
      }
    }

    if (mismatch) {
      break;
    }

    prefix += array[0][i];
  }

  if (prefix) {
    return prefix;
  } else {
    return "";
  }
}
console.log(longestCommonPrefix(strs));
