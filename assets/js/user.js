$(function(){
  var lastIndex, lastSingle, lastAo5, lastAo12, lastAo50;
  lastIndex = lastSingle = lastAo5 = lastAo12 = lastAo50 = 0;
  // Check for solves in the local storage on load
  if (localStorage.getItem('indexLog')){
    // Last solve
    // Get values from the local storage ( typeof = strings )
    lastIndex = JSON.parse(localStorage.getItem('indexLog'));
    lastSingle = JSON.parse(localStorage.getItem('singleLog'));
    lastAo5 = JSON.parse(localStorage.getItem('averageOf5Log'));
    lastAo12 = JSON.parse(localStorage.getItem('averageOf12Log'));
    lastAo50 = JSON.parse(localStorage.getItem('averageOf50Log'));
    // Check if averages are empty
    isNaN(lastAo5) ? lastAo5 = '-': lastAo5 = parseFloat(lastAo5).toFixed(3);
    isNaN(lastAo12) ? lastAo12 = '-': lastAo12 = parseFloat(lastAo12).toFixed(3);
    isNaN(lastAo50) ? lastAo50 = '-': lastAo50 = parseFloat(lastAo50).toFixed(3);
    // Put last solves in stats
    $('#lastSingle').text(parseFloat(lastSingle).toFixed(3));
    $('#lastAo5').text(lastAo5);
    $('#lastAo12').text(lastAo12);
    $('#lastAo50').text(lastAo50);
    // Best solves
    var testBest, bestSingle, bestAo5, bestAo12, bestAo50;
    testBest = bestSingle = bestAo5 = bestAo12 = bestAo50 = 999999999999;
    for (var numberOfSolve = Number(lastIndex); numberOfSolve > 0; numberOfSolve--){
      testBest = Number(JSON.parse(localStorage.getItem(`singleHistory${numberOfSolve}`)));
      testBest < bestSingle ? bestSingle = testBest : bestSingle;
      testBest = Number(JSON.parse(localStorage.getItem(`averageOf5History${numberOfSolve}`)));
      testBest < bestAo5 ? bestAo5 = testBest : bestAo5;
      testBest = Number(JSON.parse(localStorage.getItem(`averageOf12History${numberOfSolve}`)));
      testBest < bestAo12 ? bestAo12 = testBest : bestAo12;
      testBest = Number(JSON.parse(localStorage.getItem(`averageOf50History${numberOfSolve}`)));
      testBest < bestAo50 ? bestAo50 = testBest : bestAo50;
    }
    // Check if there was not enough solve to calculate worst time
    // Not enough solve mean '-' in localStorage which return 0 in variable
    (bestAo5 == 0 || bestAo5 == 999999999999) ? bestAo5 = '-' : bestAo5 = bestAo5.toFixed(3);
    (bestAo12 == 0 || bestAo12 == 999999999999) ? bestAo12 = '-' : bestAo12 = bestAo12.toFixed(3);
    (bestAo50 == 0 || bestAo50 == 999999999999) ? bestAo50 = '-' : bestAo50 = bestAo50.toFixed(3);
    // Put worst solves in stats
    $('#bestSingle').text(bestSingle.toFixed(3));
    $('#bestAo5').text(bestAo5);
    $('#bestAo12').text(bestAo12);
    $('#bestAo50').text(bestAo50);
    // Worst solves
    var testWorst, worstSingle, worstAo5, worstAo12, worstAo50;
    testWorst = worstSingle = worstAo5 = worstAo12 = worstAo50 = 0;
    for (var numberOfSolve = Number(lastIndex); numberOfSolve > 0; numberOfSolve--){
      testWorst = Number(JSON.parse(localStorage.getItem(`singleHistory${numberOfSolve}`)));
      testWorst > worstSingle ? worstSingle = testWorst : worstSingle;
      testWorst = Number(JSON.parse(localStorage.getItem(`averageOf5History${numberOfSolve}`)));
      testWorst > worstAo5 ? worstAo5 = testWorst : worstAo5;
      testWorst = Number(JSON.parse(localStorage.getItem(`averageOf12History${numberOfSolve}`)));
      testWorst > worstAo12 ? worstAo12 = testWorst : worstAo12;
      testWorst = Number(JSON.parse(localStorage.getItem(`averageOf50History${numberOfSolve}`)));
      testWorst > worstAo50 ? worstAo50 = testWorst : worstAo50;
    }
    worstAo5 == 0 ? worstAo5 = '-' : worstAo5 = worstAo5.toFixed(3);
    worstAo12 == 0 ? worstAo12 = '-' : worstAo12 = worstAo12.toFixed(3);
    worstAo50 == 0 ? worstAo50 = '-' : worstAo50 = worstAo50.toFixed(3);
    // Put worst solves in stats
    $('#worstSingle').text(worstSingle.toFixed(3));
    $('#worstAo5').text(worstAo5);
    $('#worstAo12').text(worstAo12);
    $('#worstAo50').text(worstAo50);
    // Delete " no solve " message
    $('#noSolve').hide();
    // Add solves in localStorage to history
    for (var numberOfSolve = Number(lastIndex); numberOfSolve > 0; numberOfSolve--){
      var index = JSON.parse(localStorage.getItem(`indexHistory${numberOfSolve}`));
      var single = JSON.parse(localStorage.getItem(`singleHistory${numberOfSolve}`));
      var ao5 = JSON.parse(localStorage.getItem(`averageOf5History${numberOfSolve}`));
      var ao12 = JSON.parse(localStorage.getItem(`averageOf12History${numberOfSolve}`));
      var ao50 = JSON.parse(localStorage.getItem(`averageOf50History${numberOfSolve}`));
      // Check if averages are empty ( typeof string )
      isNaN(ao5) ? ao5 = '-': ao5 = parseFloat(ao5).toFixed(3);
      // ParseFloat to turn string to number and keep 3 numbers after the dot
      isNaN(ao12) ? ao12 = '-': ao12 = parseFloat(ao12).toFixed(3);
      isNaN(ao50) ? ao50 = '-': ao50 = parseFloat(ao50).toFixed(3);
      var tr = '<tr id="' + index + '">', _tr = '</tr>', td  = '<td class="py-2">', _td = '</td>';
      $('#history tbody').append(tr + '\n' + td + '#' + index + _td + '\n' + td + parseFloat(single).toFixed(3) + _td + '\n' + td + ao5 + _td + '\n' + td + ao12 + _td + '\n' + td + ao50 + _td + _tr);
    }
  }
  // Graph
  var dataTestX = new Date(2019, 11, 14);
  var dataTestY = 12.563;
  // Chart
  var chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title:{
      text: 'Meilleur de la semaine'
    },
    axisY :{
      includeZero: false,
      suffix: ' s'
    },
    toolTip: {
      shared: true
    },
    legend: {
      fontSize: 13
    },
    data: [{
      type: 'splineArea',
      showInLegend: true,
      name: 'Average of 50',
      dataPoints: [
        { x: new Date(2019, 11, 14), y: 20.428 },
        { x: new Date(2019, 11, 15), y: 20.894 },
        { x: new Date(2019, 11, 16), y: 21.208 },
        { x: new Date(2019, 11, 17), y: 22.410 },
        { x: new Date(2019, 11, 18), y: 21.607 },
        { x: new Date(2019, 11, 19), y: 21.743 },
        { x: new Date(2019, 11, 20), y: 20.842 },
        { x: new Date(2019, 11, 21), y: 21.947 }
      ]
    },
    {
      type: 'splineArea',
      showInLegend: true,
      name: 'Average of 12',
      dataPoints: [
        { x: new Date(2019, 11, 14), y: 17.842 },
        { x: new Date(2019, 11, 15), y: 18.977 },
        { x: new Date(2019, 11, 16), y: 18.458 },
        { x: new Date(2019, 11, 17), y: 19.374 },
        { x: new Date(2019, 11, 18), y: 17.684 },
        { x: new Date(2019, 11, 19), y: 18.085 },
        { x: new Date(2019, 11, 20), y: 19.322 },
        { x: new Date(2019, 11, 21), y: 18.402 }
      ]
    },
    {
      type: 'splineArea',
      showInLegend: true,
      name: 'Average of 5',
      dataPoints: [
        { x: new Date(2019, 11, 14), y: 15.745 },
        { x: new Date(2019, 11, 15), y: 15.943 },
        { x: new Date(2019, 11, 16), y: 16.843 },
        { x: new Date(2019, 11, 17), y: 15.487 },
        { x: new Date(2019, 11, 18), y: 16.345 },
        { x: new Date(2019, 11, 19), y: 17.931 },
        { x: new Date(2019, 11, 20), y: 17.836 },
        { x: new Date(2019, 11, 21), y: 16.425 }
      ]
    },
    {
      type: 'splineArea',
      showInLegend: true,
      name: 'Single',
      dataPoints: [
        { x: dataTestX, y: dataTestY },
        { x: new Date(2019, 11, 15), y: 12.758 },
        { x: new Date(2019, 11, 16), y: 11.532 },
        { x: new Date(2019, 11, 17), y: 12.785 },
        { x: new Date(2019, 11, 18), y: 10.201 },
        { x: new Date(2019, 11, 19), y: 11.785 },
        { x: new Date(2019, 11, 20), y: 12.637 },
        { x: new Date(2019, 11, 21), y: 9.123 }
      ]
    }]
  }); chart.render();
});
