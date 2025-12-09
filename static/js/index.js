import { speedometer } from './Speedometer.js';
import { data } from './Data.js';

document.addEventListener('DOMContentLoaded', function(){
    data.updateOtherSpecifications();
})


const retryButton = document.querySelector('.retry-button');
const updateButton = document.querySelector('.update-button');


retryButton.addEventListener('click', () => {
    if (retryButton.classList.contains('inactive')) return;
    retryButton.classList.add('inactive');
    data.setNetworkSpecifications();
    getUpload();
});


updateButton.addEventListener('click', () => location.reload());


function callError(error){
    speedometer.finishAnimation();
    document.querySelector('.modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    throw new Error(error.message);     
}


async function getUpload(){
    let response;
    const section = 'upload';
    speedometer.setCurrentLabel(section.toUpperCase());
    speedometer.setCurrentUnit('Mbps');

    speedometer.beginAnimation(40, 300);
    try{
        response = await getData(section);
    } catch (error){
        callError(error);
        return;
    }


    speedometer.finishAnimation();
    setTimeout(() => {speedometer.setAnimation(response)}, 1000);
    setTimeout(() => speedometer.setAnimation(0), 3000);
    setTimeout(() => data.updateNetworkSpecifications(section, response), 3500);
    setTimeout(() => getDownload(), 5000);

}


async function getDownload(){
    let response;
    const section = 'download';
    speedometer.setCurrentLabel(section.toUpperCase());
    speedometer.setCurrentUnit('Mbps');

    speedometer.beginAnimation(40, 300);

    try{
        response = await getData(section);
    } catch (error){
        callError(error);
        return;
    }


    speedometer.finishAnimation();
    setTimeout(() => {speedometer.setAnimation(response)}, 1000);
    setTimeout(() => speedometer.setAnimation(0), 3000);
    setTimeout(() => data.updateNetworkSpecifications(section, response), 3500);
    setTimeout(() => getPing(), 5000);
}


async function getPing(){
    let response;
    const section = 'ping';
    speedometer.setCurrentLabel(section.toUpperCase());
    speedometer.setCurrentUnit('Ms');

    speedometer.beginAnimation(10, 80);
    speedometer.digitValueMax = 100;
    try{
        response = await getData(section);
    } catch (error){
        callError(error);
        return;
    }

    if (response)
    speedometer.finishAnimation();
    setTimeout(() => {speedometer.setAnimation(response)}, 1000);
    setTimeout(() => speedometer.setAnimation(0), 3000);
    setTimeout(() => {
        data.updateNetworkSpecifications(section, response);
        retryButton.classList.remove('inactive');
    }, 3500);
}


async function getData (section) {
    try{
        const response = await fetch(`/api/${section}`)
        const json = await response.json();
        console.log(json.value);
        return json.value;
    } catch (error){
        callError(error);
        return error;
    }
}