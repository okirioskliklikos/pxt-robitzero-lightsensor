/**
 * Functions to operate an Analog Light Sensor
 * 
 * IMPORTANT: Keyestudio Microbit BaseShield v1.0 does not provide the same current at analog port P0
 *            and the others exposed analog ports/pins such as P1,P2,P10. This is why for analog sensors
 *            a separate/double logic is used in order for the analogue sensors to return almost identical
 *            values to the students. The students should not consider in which analog port (red ports in Keyestudio baseshields)
 *            connect their sensors. The students should just connect their analog sensors in red ports and they should just work.
 * 
 */
//% block="Light Sensor"
//% groups=['Logic', 'Values']
//% weight=9 color=#ff6f00 icon="\uf0a9"
namespace rb0lightsensor {

    const THRESHOLD_P0 = 16; //16%
    const THRESHOLD_P1P10 = 18; //18%

    let LIGHTTHRESHOLD = THRESHOLD_P0;

    let CURPIN = DigitalPin.P0;

    function getPercentage(value: number): number {
        value = value > 1010 ? 1023 : value;
        value /= 1023;
        value = value > 0.99 ? 1.0 : value;
        value *= 100;
        return value;
    }

    function adjustToPin(pin: DigitalPin) {
        if (pin === DigitalPin.P0) {
            LIGHTTHRESHOLD = THRESHOLD_P0;
        } else {
            LIGHTTHRESHOLD = THRESHOLD_P1P10;
        }
    }

    /**
    * Initialize Light Sensor
    * @param port Keyestudio port where the Light sensor is connected
    */
    //% blockId="rb0lightsensor_initSimple"
    //% block="light sensor at port %port" 
    //% weight=90 color=100 blockGap=24
    //% port.defl=KeyestudioPort.P0
    export function initSimple(port: KeyestudioAnalogPort) {
        let pin1 = rb0base.getPinFromKeyestudioAnalogPort(port);
        adjustToPin(pin1);
        rb0base.enablePin(pin1);
        CURPIN = pin1;
    }

    /**
    * Initialize Light Sensor
    * @param pin1 pin where the Light sensor is connected
    */
    //% blockId="rb0lightsensor_initAdvanced"
    //% block="light sensor at pin %pin2" 
    //% weight=90 color=100 blockGap=24 advanced=true
    //% pin1.fieldEditor=pinpicker
    //% pin1.defl=AnalogReadWritePin.P0
    export function initAdvanced(pin1: AnalogReadWritePin) {
        adjustToPin(pin1 as number);
        rb0base.enablePin(pin1 as number);
        CURPIN = pin1 as number;
    }

    /**
    * Return true if the environment is lighted, false otherwise
    */
    //% blockId="rb0lightsensor_isEnvironmentLighted"
    //% block="is environment lighted"
    //% group="Logic"
    //% weight=75 advanced=true
    export function isEnvironmentLighted(): boolean {
        return readLightSensorValue() > LIGHTTHRESHOLD;
    }

    /**
    * Return true if the environment is not lighted, false otherwise
    */
    //% blockId="rb0lightsensor_isEnvironmentNotLighted"
    //% block="is environment not lighted"
    //% group="Logic"
    //% weight=75
    export function isEnvironmentNotLighted(): boolean {
        return !isEnvironmentLighted();
    }

    /**
    * Set threshold above which environment is considered lighted
    * @param value percentage which will be considered as threshold
    */
    //% blockId="rb0lightsensor_setLightThreshold"
    //% block="set light threshold at %value\\%" 
    //% weight=80 blockGap=24 advanced=true
    //% value.min=0 value.max=100 value.defl=16
    export function setLightThreshold(value: number) {
        LIGHTTHRESHOLD = value;
    }

    /**
     * Read Light sensor value that is connected at current port/pin
     */
    //% blockId="rb0lightsensor_readLightSensorValue"
    //% block="light sensor value"
    //% group="Values"
    //% weight=70 advanced=true
    export function readLightSensorValue(): number {
        return getPercentage(pins.analogReadPin(CURPIN));
    }

    /**
    * Read Light sensor real value that is connected at current port/pin
    */
    //% blockId="rb0lightsensor_readLightSensorRealValue"
    //% block="light sensor real value"
    //% group="Values"
    //% weight=60 advanced=true
    export function readLightSensorRealValue(): number {
        return pins.analogReadPin(CURPIN);
    }
}
