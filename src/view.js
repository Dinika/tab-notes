export const View = function() {

  const addElement = function(parentId, elementTag, elementId, text) {
    const parent = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute("id", elementId);
    newElement.appendChild(newElement.ownerDocument.createTextNode(text));
    parent.appendChild(newElement);
  }

  this.showNoteQuestion = function(question) {
    const questionEle = document.getElementById("question");
    while (questionEle.childNodes.length >= 1) {
      questionEle.removeChild(questionEle.firstChild);
    }
    questionEle.appendChild(questionEle.ownerDocument.createTextNode(question));
  };

  this.showNoteAnswer = function(answer) {
    document.getElementById("show").classList.add("hide");
    addElement('note', 'p', 'answer', answer);
  };

  this.hideNoteAnswer = function(answer) {
    document.getElementById("show").classList.remove("hide");
    if (document.getElementById('answer') !== null) {
      document.getElementById('note').removeChild(
        document.getElementById('answer')
      );
    };
  };
};
