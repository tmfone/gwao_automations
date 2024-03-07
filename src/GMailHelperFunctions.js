/* exported getLabelArray */
function getLabelArray(labelsObjects) {
  const labels = [];
  for (let i = 0; i < labelsObjects.length; i++) {
    labels[i] = labelsObjects[i].getName();
  }
  labels.sort();
  return labels;
}
