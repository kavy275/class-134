img="";
status="";
object=[];
function preload(){
    img= loadImage("dog_cat.jpg");
}
function draw(){
    image(video,0,0,640,420);
    if(status!=""){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video,gotResult);
        for (i=0; i<object.lenght;i++){
            document.getElementById("status").innerHTML="Status:Detecting Object";
            document.getElementById("number_of_object").innerHTML="number of object detected are:"+objects.length;
            fill(r,g,b);
            precent= floor(object[i].confidence*100);
            text(object[i].label+""+precent+"%",object[i].x+15, object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height); 
        }
    }
}
function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector= ml5.objectDetector('cocossd',modalLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Object";
}
function modalLoaded(){
     console.log("Modal Loaded!");
     status=true;
     objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    object=results;   
}