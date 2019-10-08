import { Component, OnInit, Input } from '@angular/core';
import { Timer } from '../timer';
import { TimerComponent } from '../timer/timer.component';
import { Chart } from 'chart.js'
import { TimerService } from '../timer.service';
import { APIService } from 'src/app/api.service';
@Component({
  selector: 'app-timer-daily',
  templateUrl: './timer-daily.component.html',
  styleUrls: ['./timer-daily.component.css']
})
export class TimerDailyComponent implements OnInit {

  @Input() subTimers: Timer[];
  @Input() date: string;
  time = 0;
  timeString: string;
  ChartOpen = false;
  chart: any;
  constructor() {

  }
  ShowHide(chart, timer) {
    if (!chart.classList.contains('ShowChart')) {
      chart.classList.add('ShowChart');

    }
    else {
      this.ChartOpen = false;
      this.chart.options.responsiveAnimationDuration = 0;
      this.chart.options.maintainAspectRatio = false;
      chart.classList.remove('ShowChart');

    }
  }

  ChartInit(canvas) {

    if (!this.ChartOpen) {
      if (this.chart !== undefined) {
        this.chart.destroy();
      }
      const data = (() => {
        let timers = new Array();
        this.subTimers.map((el) => {
          let stop = el.stop;
          if (el.stop === null) {
            stop = new Date();
          }

          if (el.id_task in timers) {
            timers[el.id_task] += (new Date(stop).getTime() - new Date(el.start).getTime());

          }
          else {
            timers[el.id_task] = (new Date(el.stop).getTime() - new Date(el.start).getTime());
          }
        });
        timers = timers.filter((el) => {
          return el !== undefined;
        });

        return timers;
      })();
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            labels: this.subTimers.map((el) => {
              return el.taskTitle;
            }),
            data: data,
            backgroundColor: this.subTimers.map((el) => {
              return 'rgba(' + new Date(el.start).getTime() % 255 + ',' + new Date(el.stop).getTime() % 255 + ','
                + (new Date(el.stop).getTime() - new Date(el.start).getTime()) % 255 + ', 1 )';
            }),
          }]
        },
        options: {
          responsiveAnimationDuration: 1000,
          responsive: true,
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function (tooltipItem, data) {
                const time = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return data.datasets[tooltipItem.datasetIndex].labels[tooltipItem.index] + ': ' + (new TimerDailyComponent).formatTime(time);
              }
            }
          }
        }
      });
      this.ChartOpen = true;
    }


  }
  btnAnimation(btn) {
    btn = btn._elementRef.nativeElement;
    if (btn.classList.contains('ShowChartBtn')) {
      btn.classList.remove('ShowChartBtn');
      btn.classList.add('HideChartBtn');
    }
    else {
      btn.classList.add('ShowChartBtn');
      btn.classList.remove('HideChartBtn');
    }
  }
  countTimer(subTimers) {
    let time = 0;
    if (subTimers !== undefined) {
      subTimers.map((el) => {
        if (el.stop != null) {
          time += new Date(el.stop).getTime() - new Date(el.start).getTime();
        }
      });
      return time;
    }

  }
  formatTime(timeInMiliseconds) {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    seconds = (timeInMiliseconds / 1000) % 60;
    minutes = (timeInMiliseconds / 60000) % 60;
    hours = (timeInMiliseconds / 3600000);
    if (hours < 10) {
      this.timeString = '0' + Math.floor(hours).toString();
    } else {
      this.timeString = Math.floor(hours).toString();
    }
    if (minutes < 10) {
      this.timeString = this.timeString + ':0' + Math.floor(minutes).toString();
    } else {
      this.timeString = this.timeString + ':' + Math.floor(minutes).toString();
    }
    if (seconds < 10) {
      this.timeString = this.timeString + ':0' + Math.floor(seconds).toString();
    } else {
      this.timeString = this.timeString + ':' + Math.floor(seconds).toString();
    }
    return this.timeString;

  }
  ngOnInit() {


  }

}
