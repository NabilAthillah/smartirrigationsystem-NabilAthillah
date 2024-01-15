"use client";

import Chart from "./Chart";
import Image from "next/image";

import Paho from 'paho-mqtt'
import { useEffect, useState } from "react";

const MainDashboard = ({ datas }) => {
  const [temp, setTemp] = useState();
  const [moist, setMoist] = useState('');
  const [humid, setHumid] = useState('');
  const [minMoist, setMinMoist] = useState('');
  const [newMinMoist, setNewMinMoist] = useState('');
  const [wateringStatus, setWateringStatus] = useState('idle');
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectToMqttBroker = async() => {
    const clientID = "clientID-" + parseInt(Math.random() * 100);
    const host = "broker.hivemq.com";
    const port = 8000;

    const mqttClient = new Paho.Client(host, Number(port), clientID);

    mqttClient.onMessageArrived = messageArrived

    mqttClient.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        setIsConnected(false);
      }
    };

    mqttClient.connect({
      onSuccess: () => {
        setClient(mqttClient);
        setIsConnected(true);
      },
      onFailure: (message) => {
        setIsConnected(false);
      }
    });
  };

  const messageArrived = (message) => {
    const topic = message.destinationName;
    const payload = message.payloadString;
  
    if (topic === "Dhefika_Nabil_Zaky_Kaifa/temp") {
      setTemp(parseFloat(payload));
    } else if(topic === "Dhefika_Nabil_Zaky_Kaifa/moist"){
      setMoist(parseFloat(payload));
    } else if(topic === "Dhefika_Nabil_Zaky_Kaifa/humid"){
      setHumid(parseFloat(payload));
    } else if(topic === "Dhefika_Nabil_Zaky_Kaifa/moistValue"){
      setMinMoist(parseFloat(payload));
    } else if(topic === "Dhefika_Nabil_Zaky_Kaifa/wateringStatus"){
      setWateringStatus(payload);
    }
  };
  

  const subscribeToTopic = (topic) => {
    if (client && isConnected && topic) {
      client.subscribe(topic);
    } else {
      return
    }
  };

  useEffect(() => {
    subscribeToTopic('Dhefika_Nabil_Zaky_Kaifa/temp');
    subscribeToTopic('Dhefika_Nabil_Zaky_Kaifa/humid');
    subscribeToTopic('Dhefika_Nabil_Zaky_Kaifa/moist');
    subscribeToTopic('Dhefika_Nabil_Zaky_Kaifa/moistValue');
    subscribeToTopic('Dhefika_Nabil_Zaky_Kaifa/wateringStatus');
  }, [client, isConnected]);

  const publishMessage = () => {
    const topic = "Dhefika_Nabil_Zaky_Kaifa/watering"
    const message = "menyiram"

    if (client && isConnected && topic && message) {
      client.publish(topic, message);
    } else if(!client && !isConnected) {
      return
    } else if(!topic && !message) {
      return
    }
  };

  const publishNewMinMoist = () => {
    const topic = "Dhefika_Nabil_Zaky_Kaifa/changemoisture"
    const message = newMinMoist

    if (client && isConnected && topic && message) {
      client.publish(topic, message);
    } else if(!client && !isConnected) {
      return
    } else if(!topic && !message) {
      return
    }
  };

  if(!isConnected){
    connectToMqttBroker()
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between  w-full bg-white py-6 px-3 rounded-lg">
        <p className="cursor-default text-[#138f2e] font-extrabold text-3xl">
          Smart Irrigation System
        </p>
        <button onClick={publishMessage} className="px-10 py-1 bg-white font-bold border-2 h-fit border-[#138f2e] text-[#138f2e] rounded-full hover:bg-[#138f2e] hover:text-white transition-colors">Siram</button>
      </div>
      <div className="w-full flex justify-center gap-10 bg-white py-6 rounded-lg">
        <div className="bg-[#FFB783] flex px-6 py-3 rounded-[20px] justify-between w-[250px] min-h-[130px]">
          <div className="flex flex-col justify-between">
            <p className="text-white font-roboto font-semibold capitalize">
              Kelembaban
              <br />
              Tanah
            </p>
            <p
                  className="text-white font-roboto text-4xl font-extrabold"
                >
                  {moist}%
                </p>
          </div>
          <div>
            <Image
              src={"/assets/Group9.png"}
              alt=""
              width={40}
              height={40}
              className="h-auto"
            />
          </div>
        </div>
        <div className="bg-[#ffb82a] flex px-6 py-3 rounded-[20px] justify-between w-[250px] min-h-[130px]">
          <div className="flex flex-col justify-between">
            <p className="text-white font-roboto font-semibold capitalize">
              Nilai Minimal Moisture
            </p>
            <p
                  className="text-white font-roboto text-4xl font-extrabold"
                >
                  {minMoist}%
                </p>
          </div>
          <div className="bg-[#ff931f] wi-fit h-fit p-2 rounded-full">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="bg-[#B4D2FF] flex px-6 py-3 rounded-[20px] justify-between w-[250px] min-h-[130px]">
          <div className="flex flex-col justify-between">
            <p className="text-white font-roboto font-semibold capitalize">
              Kelembaban Udara
            </p>
            <p
                  className="text-white font-roboto text-4xl font-extrabold"
                >
                  {humid}%
                </p>
          </div>
          <div>
            <Image
              src={"/assets/Group10.png"}
              alt=""
              width={40}
              height={40}
              className="h-auto"
            />
          </div>
        </div>
        <div className="bg-[#FED37F] flex px-6 py-3 rounded-[20px] justify-between w-[250px] min-h-[130px]">
          <div className="flex flex-col justify-between">
            <p className="text-white font-roboto font-semibold capitalize">
              Suhu Udara
            </p>
            <p
                  className="text-white font-roboto text-4xl font-extrabold"
                >
                  {temp}&deg;C
                </p>
          </div>
          <div>
            <Image
              src={"/assets/Group11.png"}
              alt=""
              width={40}
              height={40}
              className="h-auto"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-white p-6 flex justify-center gap-20">
        <div className="grid grid-cols-2 gap-4 place-items-center justify-center w-fit py-8 px-4 border-2 border-gray-600 bg-gray-400 rounded-lg">
          <img src="/assets/Wave-PNG-Image-File.png" alt="" className="w-40"/>
          <div className="flex flex-col gap-6">
            <p className="font-bold text-lg text-[#e3e3e3]">Watering Status</p>
            <p className="font-black text-4xl text-[#ffffff] capitalize">{wateringStatus == 1 ? "watering" : "idle"}</p>
          </div>
        </div>
        <div className="border-2 border-gray-600 p-4 w-fit flex items-center bg-gray-400 rounded-lg">
          <Chart datas={datas}/>
        </div>
        <div className="border-2 border-gray-600 p-4 w-fit h-fit flex flex-col bg-gray-400 rounded-lg gap-10">
          <p className="text-white font-bold">Set Minimum Soil Moisture</p>
          <div className="h-full flex justify-center">
            <input type="number" className="bg-white py-2 px-4 h-fit" onChange={(e) => setNewMinMoist(e.target.value)}/>
          </div>
          <button onClick={publishNewMinMoist} className="border-2 border-white rounded-full text-white py-1 font-medium hover:bg-white hover:text-gray-400 transition-colors">Set</button>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
