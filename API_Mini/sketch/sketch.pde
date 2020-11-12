import processing.serial.*;
import processing.net.*;

Serial myPort;
Server myServer; 
int dataIn; 
int flag = 1;

void setup(){
  println("Starting up...");
  myPort = new Serial(this, "/dev/cu.HC-05-SerialPort", 9600);
  myPort.bufferUntil('\n'); 
  myServer = new Server(this,5205);
}
void serialEvent (Serial myPort){ 
  String data = myPort.readStringUntil('\n');
  print("New reading: " + data);
  myServer.write(data);
  flag = 1;
}

void draw(){ 
  delay(5000);
  if(flag == 0) {
    myServer.write("1-5.00,4.99");  
  }
  flag = 0;
  //myServer.write("Hello world"); 
  //delay(1000);
  //background(237, 240, 241);
  //fill(20, 160, 133); // Green Color
  //stroke(33);
  //strokeWeight(1);
  //rect(50, 100, 150, 50, 10);  // Turn ON Button
  //rect(250, 100, 150, 50, 10); // Turn OFF Button
  //fill(255);
  
  //textSize(32);
  //text("Turn ON",60, 135);
  //text("Turn OFF", 255, 135);
  //textSize(24);
  //fill(33);
  //text("Status:", 180, 200);
  //textSize(30);
  //textSize(16);
  //text("Program made by Dejan Nedelkovski,\n     www.HowToMechatronics.com", 80, 320);
}
