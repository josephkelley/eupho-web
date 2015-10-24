var statusField = $('#status');
var curBAC = $('#cur-bac')
var inputs = $(":input");

function calculateStatus(age, weight, sex, bac, ago, time, drinks){
  var status;
  var ebac = ((0.806 * drinks * 1.2) / (sex * weight)) - (0.017 * (ago/60));
  var diff = Math.abs(ebac-bac);
  if(Math.abs((diff - 0.005)) < 0.01){
    status = 'you made it';
  }
  else if(ebac < bac){
    status = 'you\'re ok';
  }
  else{
    status = 'stop!';
  }
  updateStatus(status, ebac);
}

function updateStatus(status, bac){
  statusField.val(status);
  curBAC.val(Number(bac).toFixed(3))
}

// getters
function age(){
  $('#age').val();
}

function weight(){
  $('#weight').val();
}

function sexCoeff(){
  if($('#male-1').is(':checked')){
    return 0.58;
  }
  else{
    return 0.49;
  }
}

function targetBAC(){
  if($('#bac-l').is(':checked')){
    return 0.04;
  }
  else if($('#bac-e').is(':checked')){
    return 0.06;
  }
  else{
    return 0.08;
  }
}

function timeCoeff(){
  if($('#time-1').is(':checked')){
    return 1;
  }
  else if($('#time-2').is(':checked')){
    return 2;
  }
  else{
    return 3;
  }
}

function drinks(){
  $('#drinks').val();
}

// to constantly update the BAC...
inputs.keydown(function(event){
  var age = $('#age').val();
  var weight = $('#weight').val();
  var sex = sexCoeff();
  var bac = targetBAC();
  var ago = $('#time-a').val();
  var time = timeCoeff();
  var drinks = $('#drinks').val();
  var statusField = $('#status');
  var inputs = $(":input");
  calculateStatus(age, weight, sex, bac, ago, time, drinks);
});

// TODO: auto update BAC in the event that someone uses the number field
