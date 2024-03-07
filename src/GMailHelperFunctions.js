/* exported getLabelArray */
function getLabelArray(labelsObjects) {
  var labels = [];
  for (var i = 0; i < labelsObjects.length; i++) {
    labels[i] = labelsObjects[i].getName();
  }
  labels.sort();
  return labels;
}
