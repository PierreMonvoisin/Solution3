$(function(){
  var mouseX, mouseY;

  $(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    console.log('mouseY = ' + mouseY);
    if ( mouseY < 2) {
      $('header').slideDown('fast');
    }
    if ( mouseY > ($('header').height() + 20)) {
      $('header').slideUp('slow');
    }
  });

  // Accès au log des résolutions
  var index, single, ao5, ao12, ao50;
  // Affiche les dernières valeurs au chargement de la page
  index = JSON.parse(localStorage.getItem('indexLog'));
  single = JSON.parse(localStorage.getItem('singleLog'));
  ao5 = JSON.parse(localStorage.getItem('averageOf5Log'));
  ao12 = JSON.parse(localStorage.getItem('averageOf12Log'));
  ao50 = JSON.parse(localStorage.getItem('averageOf50Log'));

  $('#lastSingle').html(single); $('#lastAo5').html(ao5); $('#lastAo12').html(ao12); $('#lastAo50').html(ao50);
  // Check le localStorage pour les valeurs des résolutions et les affiches dans l'html
  setInterval(function() {
    index = JSON.parse(localStorage.getItem('indexLog'));
    single = JSON.parse(localStorage.getItem('singleLog'));
    ao5 = JSON.parse(localStorage.getItem('averageOf5Log'));
    ao12 = JSON.parse(localStorage.getItem('averageOf12Log'));
    ao50 = JSON.parse(localStorage.getItem('averageOf50Log'));

    $('#lastSingle').html(single); $('#lastAo5').html(ao5); $('#lastAo12').html(ao12); $('#lastAo50').html(ao50);
    // $('#bestSingle').html(single), $('#bestAo5').html(ao5), $('#bestAo12').html(ao12), $('#bestAo50').html(ao50);
    // $('#worstSingle').html(single), $('#worstAo5').html(ao5), $('#worstAo12').html(ao12), $('#worstAo50').html(ao50);
    // Création d'une nouvelle ligne pour ajouter les informations

    // Ajout de la résolution à l'historique
    // var tr = '<tr id="' + index + '">', _tr = '</tr>', td  = '<td class="py-2">', _td = '</td>';
    // $('#history tbody').prepend(tr + '\n' + td + '#' + index + _td + '\n' + td + single + _td + '\n' + td + ao5 + _td + '\n' + td + ao12 + _td + '\n' + td + ao50 + _td + _tr);
  }, 10000);

  // Graph
  var dataTestX = new Date(2019, 11, 14);
  var dataTestY = 12.563;

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
  });
  chart.render();
});
