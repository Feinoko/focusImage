// config
const zoomLevel = 1.08; // scale value
const transitionDuration = '1s'; // time to zoom on hover
const z_index = 500; // to always appear on top in case of overlap. You should not have to touch this

// get image
let images = Array.from(document.getElementsByClassName('image-focus-blur'));

//event handler

// surveys all images
for (let i of images) {
  
  attachTransitionAnim(i);

  // triggers event on all images on mouseover / mouseout
  i.addEventListener('mouseover', function(e) {flow(i);});
  i.addEventListener('mouseout', function(e) {recess(i);});

  // triggers same event on focus (accessibility)
  i.addEventListener('focus', function(e) {flow(i);});
  i.addEventListener('blur', function(e) {recess(i);});                         

}


/* ========
 functions 
 ========== */

// zoom in img on hover
function zoomIn(i) { // 'i' for image
  i.style.transform = `scale(${zoomLevel})`;
  i.style.zIndex += z_index; // to always appear on top in case of overlap
}

function zoomOut(i) {
  i.style.transform = 'scale(1)';
  i.style.zIndex -= z_index; // resetting z-index
}

// transition animation
function attachTransitionAnim(i) {

  i.style.transition = `all ${transitionDuration} ease`;
}

// grays out all other elements
function grayOthers(i) {

  // remove the hovered image index to apply b & w effect to all but hovered
  images.splice(images.indexOf(i), 1);

  for (let i of images) {
    i.style.transition = `all ${transitionDuration} ease`; // seems transition does not work properly if not re-adding it
    i.style.filter = 'grayscale(1)';
  }
}

function unGray() {
  for (let i of images) {
    i.style.transition = `all ${transitionDuration} ease`; // seems transition does not work properly if not re-adding it
    i.style.filter = 'grayscale(0)';
  }
}

function refill() {
  // re-add the removed index
  images = Array.from(document.getElementsByClassName('image-focus-blur'));
}

// combining all functions for readability

function flow(i) {
  grayOthers(i);
  attachTransitionAnim(i);
  zoomIn(i);
}

function recess(i) {
  zoomOut(i); // revert to original size
  unGray(i);
  refill(); // re-fill array of image (re-add the removed index)
}

module.exports.focusImage = focusImage;