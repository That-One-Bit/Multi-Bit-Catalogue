const forwards = {
  'finished': 'starting',
  'starting': 'fourthFrame',
  'fourthFrame': 'thirdFrame',
  'thirdFrame': 'secondFrame',
  'secondFrame': 'firstFrame',
  'firstFrame' : 'finished'
};

const backwards = {
  'finished': 'firstFrame', 
  'firstFrame': 'secondFrame', 
  'secondFrame': 'thirdFrame', 
  'thirdFrame': 'fourthFrame',
  'fourthFrame' : 'starting',
  'starting': 'finished'
};

const nameOrder = [
  "Roald Dahl", "Henry Sugar", "Doctor Cartwright", "Imrhat Khan"
];

let frameIndex = 0;

function classMove(tag, direction) {
  const elements = typeof tag === 'string' 
    ? Array.from(document.querySelectorAll(tag)) 
    : Array.from([tag].flat()).reduce((acc, val) => {
        if (val instanceof NodeList || val instanceof HTMLCollection) {
          return acc.concat(Array.from(val));
        }
        return acc.concat(val);
      }, []).filter(Boolean);
    
  removeKeyframes(elements);

  elements.forEach(element => {
    void element.offsetWidth; 
    
    const currentClass = Object.keys(direction).find(cls => 
      element.classList.contains(cls)
    );

    const nextClass = direction[currentClass];

    if (nextClass === 'firstFrame') {
      TextFade(element, false);
    } else {
      TextFade(element, true);
    }

    if (currentClass) {
      element.classList.replace(currentClass, nextClass);
    }
  });

  frameIndex = parseInt(document.querySelector('.firstFrame').getAttribute('data-fc')) - 1;
  document.querySelector(".frameCounter").innerHTML = nameOrder[frameIndex];
}

function removeKeyframes(elements) {
  elements.forEach(element => { 
    element.classList.remove('dropIn');
  });
}

function TextFade(element, value) {
  if (value == true) {
    element.querySelector('p')?.classList.add("textfade-active"); 
  } else {
    element.querySelector('p')?.classList.remove("textfade-active"); 
  }
}

document.addEventListener('keydown', function(event) {
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
        next();
    } else if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
        prev();
    }
});

function next() {
  const items = document.querySelectorAll('.starting, .fourthFrame, .thirdFrame, .secondFrame, .firstFrame, .finished');
  
  classMove(items, forwards);
}

function prev() {
  const items = document.querySelectorAll('.starting, .fourthFrame, .thirdFrame, .secondFrame, .firstFrame, .finished');
  
  classMove(items, backwards);
}

function endnotes() {
  document.querySelector('.notes').style.display = 'none';
  console.log('notes div removed; took so long');
  const items = document.querySelectorAll('.starting, .fourthFrame, .thirdFrame, .secondFrame, .firstFrame, .finished');
  const pagemain = document.querySelector('.page-main')

  pagemain.style.display = 'none';

  items.forEach(element => { 
      element.classList.add('dropIn');
  });
  console.log('Drop animations added to the frames');
}

frameIndex = parseInt(document.querySelector('.firstFrame').getAttribute('data-fc')) - 1;
document.querySelector(".frameCounter").innerHTML = nameOrder[frameIndex];

window.classMove = classMove;
window.next = next;
window.prev = prev;
window.endnotes = endnotes;
window.frameIndex = frameIndex;