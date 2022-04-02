const screenShotBtn = document.getElementById('screenshot-btn')
const square = document.querySelector('.square')
const square2 = document.querySelectorAll('.square')[1]

let video = document.querySelector('video')
let container = document.querySelector('.container')

// TODO
// Stop square from being resized outside video
// Modify canvas height and weight to square height and weight

const randomTimestamp = () => {
    let min = + new Date('2022-01-15T03:01:03')
    let max = + new Date('2022-03-15T03:01:03')
    return Math.floor(Math.random() * (max - min) + min)
}

const handleScreenshot = () => {
    console.log('hi')
    var player = document.getElementsByTagName('video')[0];
    var time = player.currentTime;
    console.log(time)

    var canvas = document.createElement("canvas");
	canvas.width = video.offsetWidth;
	canvas.height = video.offsetHeight;
    canvas.getContext('2d').drawImage(player, 0, 0, canvas.width, canvas.height);
    
    var downloadLink = document.createElement("a");
    downloadLink.download = randomTimestamp() + '.jpg';
    
    function DownloadBlob(blob) {
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.click();
    }
        
    canvas.toBlob(async function (blob) {
        DownloadBlob(blob);
    }, 'image/' + 'jpeg')

}

dragElement(square);

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }


  const isMaxDimensions = () => {
    if(elmnt.offsetWidth + elmnt.offsetLeft >= video.width) {
        // console.log('ye')
        return true
    }
    return false
  }

  function dragMouseDown(e) {
    console.log(e)
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    console.log('x', pos3, 'y', pos4, 'left', pos3 - elmnt.offsetLeft, 'top', pos4 - elmnt.offsetTop)
    if(pos3 - elmnt.offsetLeft > elmnt.offsetWidth - 20 && pos4 - elmnt.offsetTop > elmnt.offsetHeight - 20) {
        if(isMaxDimensions()) {
            // console.log('+++++yup')
            e.preventDefault()
        }
        return
    }
    // console.log('reached')
    e.preventDefault();
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    const newTopPosition = (elmnt.offsetTop - pos2)
    // console.log(elmnt.offsetTop - pos2, (video.height - square.height))
    if(elmnt.offsetTop - pos2 >= 0 && elmnt.offsetLeft - pos1 >= 0 && elmnt.offsetTop - pos2 <= (video.height - elmnt.offsetHeight) && elmnt.offsetLeft - pos1 <= (video.width - elmnt.offsetWidth)) {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

screenShotBtn.addEventListener('click', handleScreenshot)