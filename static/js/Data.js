class Data{
    constructor(){
        this.otherSpecifications = document.querySelector('.other-specifications');
        this.networkSpecifications = document.querySelector('.network-specifications');
    }

    setNetworkSpecifications(){
        this.networkSpecifications.querySelector('#upload').querySelector('.title').textContent = 0;
        this.networkSpecifications.querySelector('#download').querySelector('.title').textContent = 0;
        this.networkSpecifications.querySelector('#ping').querySelector('.title').textContent = 0;
    }

    updateNetworkSpecifications(sectionID, value){
        const currentSection = this.networkSpecifications.querySelector(`#${sectionID}`).querySelector('.title');
        currentSection.textContent = value;
    }

    updateOtherSpecifications(){
        const timeZone = this.otherSpecifications.querySelector('.time-zone').querySelector('.title');
        if (timeZone){
            const currentTimeZone = new Date().getTimezoneOffset();
            const value = Math.abs(parseInt(currentTimeZone / 60));
            const sign = currentTimeZone > 0 ? '-' : '+'
            timeZone.textContent = `UTC ${sign}0${value}:00`;
        }
    }

    
}

export let data = new Data();