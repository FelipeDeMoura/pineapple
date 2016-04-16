'use strict';

var hbo = hbo || {};

hbo.moveArrow = (function(global){

  function command(obj, callback) {

    var test = placementClass(obj.class, obj.selector);
    var key = initKey(obj);

    document.addEventListener('keyup', function(event){
      var keyCount = key.trigger(event, test);
      var selector = test.next(keyCount[0], keyCount[1]);
      addClass(selector, test.selector);
    });

    //initiate selector
    callback(test);
  }

  function initKey(obj) {

    var currentRow = obj.coord[0];
    var currentCol = obj.coord[1];

    function keyPress(e, mainObj) {

      var count = [];
      var lengRow = mainObj.next(currentRow, currentCol).rowleng;
      var lengCol = mainObj.next(currentRow, currentCol).colLeng;
      var hideRow;

      e.preventDefault();

      switch (e.keyCode) {
        case 38:
          //up arrow
          currentRow--;
          currentRow = (currentRow >= 0) ? currentRow : lengRow-1;

          //check if row is visible
          hideRow = mainObj.next(currentRow, currentCol).currentCol;
          if(hideRow.style.display === 'none') {
            currentRow = lengRow-1;
          }

          break;
        case 40:
          //down arrow
          currentRow++;
          currentRow = (currentRow <= lengRow-1) ? currentRow : 0;

          //check if row is visible
          hideRow = mainObj.next(currentRow, currentCol).currentCol;
          if(hideRow.style.display === 'none') {
            currentRow = 1;
          }

          break;
        case 37:
          //left arrow
          currentCol--;
          currentCol = (currentCol >= 0) ? currentCol : lengCol-1;
          break;
        case 39:
          //right arrow
          currentCol++;
          currentCol = (currentCol <= lengCol-1) ? currentCol : 0;
          break;
        case 13:
          var getUrl = mainObj.next(currentRow, currentCol).url(),
          redirect = '/blank';
          //global.location.href = (!getUrl) ? redirect : getUrl;
          break;
        case 27:
          //global.history.back();
          break;
      }

      // if column does not exist change array column to first index 0
      var isColElem = mainObj.next(currentRow, currentCol).currentColDisplay();
      if(!isColElem) {
        currentCol = 0;
      }

      count.push.apply(count, [currentRow, currentCol]);
      return count;
    }

    return {
      trigger: keyPress
    };
  }

   function placementClass(classNam, classActive) {
    //var div = document.getElementsByTagName('tr');
    var div = document.querySelectorAll('.' + classNam);

    if(!div) {
      return;
    }

    return {
      selector: classActive,
      next: function(row, col) {
        var elemSelect = {
          rowleng: div.length,
          colLeng: div.item(row).children.length,
          currentPos: div.item(row).children[col],
          currentCol: div.item(row),  //(div.item(row).style.display !== 'none'),
          getIndex: [row, col],
          url: function() {

            var elem = this.currentPos;

            // if element dosent exist
            if(!elem) {
              return;
            }

            // check where the dataset is either parent or child element
            var dataSetElem = (elem.hasChildNodes()) ? elem.children[0] : elem;

            //console.log(dataSetElem.classList.contains('top-nav'));
            //el.parentElement.parentElement.parentElement.classList.contains('top-nav')
            //console.log(dataSetElem.parentElement);

            // check if dataset exists
            if(!dataSetElem.dataset.url) {
              return;
            }

            return dataSetElem.dataset.url;
          },
          currentColDisplay: function() {
            var isElem = (this.currentPos) ? true : false;

            return isElem;
          }
        };

        return elemSelect;
      }
    };
  }

  function addClass(next, classNam) {

    var selClass = document.querySelector('.' + classNam);

    if(selClass !== null) {
      selClass.classList.remove(classNam);
    }

    var isElem = next.currentColDisplay();
    var curIndex = next.getIndex;
    var arrElem = [];

    if(!isElem) {
      arrElem.push(next.currentCol.children);

      arrElem.forEach(function(item, i) {

        if(item !== undefined) {
          item[i].classList.add(classNam);
        }

      });

      return;
    }

    if(next.currentPos !== undefined) {
      next.currentPos.classList.add(classNam);
    }
  }

  function mainFunc(obj) {

    var self = this;
    self.configClass = obj;

    command(self.configClass, function(test){
      addClass(
        test.next(
        self.configClass.coord[0],
        self.configClass.coord[1]),
        test.selector
      );
    });
  }

  return {
    init: mainFunc
  }

})(window);

// loader
function hideLoad() {
  var loadDiv = document.querySelector(".loader");
  var wrapper = document.querySelector(".wrapper");

  if(!loadDiv) {
    loadDiv = document.createElement("div");
    loadDiv.setAttribute('class', 'loader');
    document.body.appendChild(loadDiv);
  }

  if(!wrapper) {
    loadDiv.classList.add('loader--hide');
    return;
  }

  loadDiv.classList.add('loader--hide');
  wrapper.classList.add('showvisib');

}
