class Speedometer{
    constructor(){
        this.ticks = document.querySelectorAll('.tick');
        this.details = document.querySelector('.details');
        this.progress = document.querySelector('.progress');
        
        this.outerRingRadius = 164;
        this.frameCount = 120;
        this.frameInterval = 0.3;
        this.digitValueMax = 500;
        this.currentStatValueMax = 0;
        this.pastStatValueMax = 0;
        this.statValueCurrent = 0;
        this.statValueInterval = this.currentStatValueMax / this.frameCount;
        this.intervalAnimation;

        this.initializationTicks();
    }


    setConstans(){
        this.digitValueMax = 500;
        this.currentStatValueMax = 0;
        this.pastStatValueMax = 0;
        this.statValueCurrent = 0;
        this.intervalAnimation;
    }


    initializationTicks(){
        this.ticks.forEach((tick, i) => {
            const angle = 210 - i * 5;
            const theta = this.deg2rad(angle);
            const radius = this.outerRingRadius + (i % 6 ? 0 : 4);
            const x = Math.cos(theta) * radius;
            const y = Math.sin(theta) * -radius;
            const transform = [
                `translate(${x}px, ${y}px)`,
                `rotate(${-angle}deg)`
            ].join(' ');
            
            tick.style.transform = transform;
            tick.style.webkitTransform = transform;
            tick.style.mozTransform = transform;
        });
    }

    deg2rad(angle) {
        return angle * (Math.PI / 180);
    }

    getLimits(){
        if (this.digitValueMax == 500) return [12, 480];
        return [4, 97];
    }
    

    setStatValue(value) {
        const angle = -120 + 240 * (value / this.digitValueMax);
        let [minValue, maxValue] = this.getLimits();
    
        if (this.progress && this.statValueCurrent <= maxValue && this.statValueCurrent >= minValue) {
            this.progress.style.transform = `rotate(${angle}deg)`;
            this.progress.style.webkitTransform = `rotate(${angle}deg)`;
            this.progress.style.mozTransform = `rotate(${angle}deg)`;
        }
        
        if (this.details) {
            const speedElement = this.details.querySelector('.speed');
            if (speedElement) {
                speedElement.textContent = value;
            }
        }
    }


    setCurrentLabel(value){
        const labelElement = this.details.querySelector('.label');
        if (labelElement){
            labelElement.textContent = value;
        }
    }

     setCurrentUnit(value){
        const unitElement = this.details.querySelector('.unit');
        if (unitElement){
            unitElement.textContent = value;
        }
    }


    updateDetails() {
        if (this.currentStatValueMax > this.pastStatValueMax){
            if (this.statValueCurrent.toFixed(1) > this.currentStatValueMax) {
                this.breakAnimation();
                return;
            }
        }else{
            if (this.statValueCurrent.toFixed(1) < this.currentStatValueMax) {
                this.breakAnimation();
                return;
            }
        }
    
        
        this.setStatValue(this.statValueCurrent.toFixed(1));
        this.statValueCurrent += this.statValueInterval;
        setTimeout(() => this.updateDetails(), this.frameInterval);
    }

    getRandomArbitrary(a, b) {
        return parseFloat((Math.random() * (b - a) + a).toFixed(1));
    }


    beginAnimation(minValue, maxValue){
        this.setConstans();
        console.log("Begin");
        this.intervalAnimation = setInterval(() => {
            this.currentStatValueMax = this.getRandomArbitrary(minValue, maxValue);
            this.statValueInterval = parseFloat(((this.currentStatValueMax - this.pastStatValueMax) / this.frameCount).toFixed(3));
            this.updateDetails();
            console.log(this.statValueInterval, this.pastStatValueMax, this.currentStatValueMax);
        }, 2000);
    }


    breakAnimation(){
        this.pastStatValueMax = this.currentStatValueMax;
        this.setStatValue(this.currentStatValueMax)
    }

    finishAnimation(){
        clearInterval(this.intervalAnimation);
        this.intervalAnimation;
    }


    setAnimation(value){
        clearInterval(this.intervalAnimation);
        this.currentStatValueMax = value;
        this.statValueInterval = parseFloat(((this.currentStatValueMax - this.pastStatValueMax) / this.frameCount).toFixed(3));
        this.updateDetails();
        console.log(this.statValueInterval, this.pastStatValueMax, this.currentStatValueMax);
    }
}


export let speedometer = new Speedometer()