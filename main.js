function setup() {
  canvas = createCanvas(250,250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier("MobileNet",modelloaded);
}
function modelloaded(){
 console.log("Model Is Loaded")
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotresult);
  
}
var previous_result = "";
function gotresult(error,results){
  if (error) {
    console.error(error);
  }else {if ((results[0].confidence > 0.5) &&(previous_result != results[0].label) ) {
    console.log(results);
    previous_result = results[0].label;
    var synth= window.speechSynthesis ;
    speakdata="object detected is "+ results[0].label;
    var utterThis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterThis);
    document.getElementById("resultname").innerHTML= results[0].label;
    document.getElementById("resultaccuracy").innerHTML=results[0].confidence.toFixed(3);
  }
    
  }
}
