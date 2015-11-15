var m = require("mithril");
var moment = require("moment");

var Timer = {};

class Timing {
    constructor(){
        this.timer_id;
    }
    start(callback){
        let start_time = new Date().getTime();
        this.timer_id = setInterval(() => {
            callback(new Date().getTime() - start_time);
        }, 1000);
    };
    stop(){
        clearInterval(this.timer_id);
    }
} 

class TimerController {
    constructor(){
        this.vm = new TimerViewModel();
        this.timer = new Timing();
    }
    start(){
        let base_time = 0;
        this.timer.start(time=>{
            this.vm.time(base_time + time);
            m.redraw();
        });
        this.vm.state("running")
    }
    restart(){
        let base_time = this.vm.time();
        this.timer.start(time=>{
            this.vm.time(base_time + time);
            m.redraw();
        });
        this.vm.state("running")
    }
    stop(){
        this.timer.stop();
        this.vm.state("stopped")
    }
    reset(){
        this.timer.stop();
        this.vm.time(0);
        this.vm.state("notstart")
    }
}
const ZERO_DATE = new Date(2015,1,1).getTime();
class TimerViewModel {
    constructor(){
        this.time = m.prop(0);
        this.state = m.prop("notstart");
    }
    isStartDisable(){
        return this.state() != "notstart"
    }
    isPauseDisable(){
        return this.state() != "running"
    }
    isRestartDisable(){
        return this.state() != "stopped"
    }
    isResetDisable(){
        return this.state() != "stopped"
    }
    labelTime(){
        return moment(ZERO_DATE + this.time()).format("HH:mm:ss");
    }
}
Timer.controller = TimerController;
Timer.view = (ctrl)=>{
    let vm = ctrl.vm;
    return m("div", [
                m("h1", {class: "time"}, vm.labelTime()),
                m("div", [
                    m("button", {
                        onclick: ()=>ctrl.start(),
                        disabled: vm.isStartDisable(),
                        class: "btn btn-primary",
                        style: {display: vm.state() == "notstart" ? "inline" : "none"}
                    }, [m("span", {class: "glyphicon glyphicon-play"})]),
                    m("button", {
                        class: "btn btn-primary",
                        onclick: ()=>ctrl.stop(),
                        disabled: vm.isPauseDisable(),
                        style: {display: vm.state() == "running" ? "inline" : "none"}
                    }, [m("span", {class: "glyphicon glyphicon-pause"})]),
                    m("button", {
                        class: "btn btn-primary",
                        onclick: ()=>ctrl.restart(),
                        disabled: vm.isRestartDisable(),
                        style: {display: vm.state() == "stopped" ? "inline" : "none"}
                    }, [m("span", {class: "glyphicon glyphicon-play"})]),
                    m("button", {
                        class: "btn btn-primary",
                        onclick: ()=>ctrl.reset(),
                        disabled: vm.isResetDisable()
                    }, [m("span", {class: "glyphicon glyphicon-stop"})]),
                    m("button", {
                        class: "btn btn-warning",
                        onclick: ()=>window.close(),
                    }, [m("span", {class: "glyphicon glyphicon-remove"})]),
                ])
            ]);
}
m.mount(document.body, Timer);


