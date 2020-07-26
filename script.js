var supercool;
var supercool2;
var koord;
const Http = new XMLHttpRequest();

var url='https://api.thingspeak.com/update?api_key=J2M2AB7V35R7RA2V&';

 function setup() {
  //can make fancier later
  // createCanvas(displayWidth, displayHeight);
  createCanvas(600, 300);
background(100);
  ellipse(300, 150, 20,20);

  strokeWeight(10)
stroke(0);

  // Create a client instance
  client = new Paho.MQTT.Client("broker.shiftr.io", Number(443),"web_" + parseInt(Math.random() * 100));
  //Example client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32903, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
  useSSL: true,
  userName: "braamshiftr",
  password: "braamshiftrwagwoord",
  onSuccess:onConnect,
  onFailure:doFail
  }

  // connect the client
  client.connect(options);

}

// function touchMoved() {
// background(100);
// ellipse(pmouseX, pmouseY, 100,100);
// koord = pmouseX.toString()
// message = new Paho.MQTT.Message(koord);
// message.destinationName = "braamdraw";
// client.send(message);
// return false;
// }



  // called when the client connects
  function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("braamldrcounter");
  client.subscribe("conradieWattsNow");

  message = new Paho.MQTT.Message("Hello CloudMQTT man this is wicked");
  //message.destinationName = "braamdraw";
  //client.send(message);
  }

  function doFail(e){
  console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
  console.log("onConnectionLost:"+responseObject.errorMessage);
  }
  }

  // called when a message arrives
  function onMessageArrived(message) {
  supercool=message.payloadString;
  supercool2=message.destinationName;
  console.log("onMessageArrived:"+message.payloadString);
  console.log(supercool);
  console.log(supercool2);
  background(100);
  
    
  if (supercool2=="conradieWattsNow"){
  //post to thingspeak
    var url='https://api.thingspeak.com/update?api_key=J2M2AB7V35R7RA2V&field1='+supercool+"''";
    Http.open("GET", url);
Http.send();
     console.log('by conradiewatts');
         console.log(url);
  } 
      
//   if (supercool2=="braamldrcounter"){
//   //post to thingspeak
//     var url='https://api.thingspeak.com/update?api_key=J2M2AB7V35R7RA2V&field2='+supercool+"'";
//   Http.open("GET", url);
// Http.send();  
//     console.log('by ldr counter');
//      console.log(url);
//   } 
  
  }
