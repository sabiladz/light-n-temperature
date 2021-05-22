const server = "teknik-fisika.or.id";
const port = 3000;
const brokerAddress = `ws://${server}:${port}`;

const rootTopic = "ITB/TF/IIOT/test";

const subscribe = rootTopic + "/sensor";
const subData = subscribe + "/data";

const publish = rootTopic + "/led";
const pubData = publish + "/data";

const client = mqtt.connect(brokerAddress);

client.on("connect", () => {
    console.log("Connected to:", brokerAddress);
    
    client.subscribe(subscribe + "/#", (err) => {
        console.log("Subscribed to:", subscribe);
        if (!err) {
            ledWrite(1, 50, 0, 0);
            ledWrite(2, 50, 0, 0);
            ledWrite(3, 50, 0, 0);
        }
    });
});

const ledWrite = (led, R, G, B) => {
    const obj = { led, R, G, B };
    const payload = JSON.stringify(obj);
    client.publish(pubData, payload);
}

const btnCallback = (led, R, G, B) => {
    ledWrite(led, R.value, G.value, B.value);
}

const R1 = document.getElementById("R1");
const G1 = document.getElementById("G1");
const B1 = document.getElementById("B1");
const btn1 = document.getElementById("btn1");

btn1.addEventListener("click", function(e) {
    e.preventDefault();
    btnCallback(1, R1, G1, B1)
});

const R2 = document.getElementById("R2");
const G2 = document.getElementById("G2");
const B2 = document.getElementById("B2");
const btn2 = document.getElementById("btn2");

btn2.addEventListener("click", function(e) {
    e.preventDefault();
    btnCallback(2, R2, G2, B2)
});

const R3 = document.getElementById("R3");
const G3 = document.getElementById("G3");
const B3 = document.getElementById("B3");
const btn3 = document.getElementById("btn3");

btn3.addEventListener("click", function(e) {
    e.preventDefault();
    btnCallback(3, R3, G3, B3)
});