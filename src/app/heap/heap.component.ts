import { Component, OnInit } from '@angular/core';
import {NumberModel} from '../number.model';
import * as $ from 'jquery';
import {Animations} from '../visual/animations';

@Component({
  selector: 'app-heap',
  templateUrl: './heap.component.html',
  styleUrls: ['./heap.component.css'],
  animations: Animations
})
export class HeapComponent implements OnInit {

bool;
  numbe: NumberModel[] = [];
  number: NumberModel[] = [];
  line = [];
  setLine(x: number, y: number, i: number, j: number) {
    const angle = Math.abs(Math.atan((y - j) / (x - i)));
    let distance = 175;
    if (y > 100 && y < 250) { distance = 125; }
    if (y > 200 && y < 500) { distance = 100; }

    const x1 =  x - 25 * Math.cos( angle);
    const y1 =  y + 25 * Math.sin( angle);
    const x3 =  x + 25 * Math.cos( angle);
    const y3 =  y1;
    const x2 =  x - (distance - 25) * Math.cos( angle);
    const y2 =  y + (distance - 25) * Math.sin( angle);
    const x4  =  x + (distance - 25) * Math.cos( angle);
    const y4 = y2;

    return [x1, x2, x3, x4, y1, y2, y3, y4];





  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
  }
   constructor() {
    for (let i = 1; i < 9; i++) {
      const y = this.getRandomInt(40);
      this.number[i] = new NumberModel(y, 10 + i * 40, 80);
      this.number[i].state = 'i';


    }


  }
  getx_y(i: number, j: number, angle: number, distance: number, left: boolean) {
    if (left) {
      return [i - distance * Math.cos(angle * (Math.PI / 180)), j + distance * Math.sin(angle * (Math.PI / 180))];
    } else {
      return [i + distance * Math.cos(angle * (Math.PI / 180)), j + distance * Math.sin(angle * (Math.PI / 180))];
    }
  }

  async circles() {
    for (let i = 1; i < 9; i++) {
      const y = this.number[i].value;
      if (i === 1) {
        this.numbe[i] = new NumberModel(y, 275 , 80);
        await this.sleep(250);
        this.numbe[i].state = 'i';
        await this.sleep(595);


      } else {
        let left = false;
        if (i % 2 === 0) {
          left = true;
        }
        let distance = 175;
        let angle = 35;

        if (i >= 4 && i <= 7) {
          angle = 60;
          distance = 125;
        }
        if (i >= 8 && i <= 15) {
          angle = 73;
          distance = 100;
        }
        const parx = this.numbe[Math.floor(i / 2)].x;
        const pary = this.numbe[Math.floor(i / 2)].y;
        const [x, y1] = this.getx_y(parx, pary, angle, distance, left);
        this.numbe[i] = new NumberModel(y, x, y1);
        await this.sleep(250);
        this.numbe[i].state = 'i';
        await this.sleep(595);



      }


    }
    for (let i = 1; i < 5; i++) {

      this.line[i] = (this.setLine(this.numbe[i].x, this.numbe[i].y, this.numbe[2 * i].x, this.numbe[2 * i].y));
      await this.sleep(600);



    }
  }

  ngOnInit(): void {


  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async onSwap(el, el1, bool) {
    const i: number = el;
    const j: number = el1;
    if (bool) {
  this.numbe[i].swapx = this.numbe[j].x;
  this.numbe[i].swapy = this.numbe[j].y;
  this.numbe[i].state = 'fi';
}
    this.number[i].swapx = this.number[j].x;
    this.number[i].swapy = 80;
    this.number[i].state = 'fi';
    const k = j.toString();
    const l = i.toString();
    if (bool) {
  $('#' + k).css('stroke', 'rgb(220,20,60)');
  $('#' + l).css('stroke', 'rgb(220,20,60)');
  $('#rec' + k).css('fill', 'rgb(220,20,60)');
  $('#rec' + l).css('fill', 'rgb(220,20,60)');

  this.numbe[j].swapx = this.numbe[i].x;
  this.numbe[j].swapy = this.numbe[i].y;

  this.numbe[j].state = 'fi';
}
    this.number[j].swapx = this.number[i].x;
    this.number[j].swapy = 80;
    this.number[j].state = 'fi';
    await this.sleep(320);
    let temp;
    if (bool) {
      temp = this.numbe[i].x;
      this.numbe[i].x = this.numbe[j].x;
      this.numbe[j].x = temp;
      temp = this.numbe[i].y;
      this.numbe[i].y = this.numbe[j].y;
      this.numbe[j].y = temp;
      temp = this.numbe[i];
      this.numbe[i] = this.numbe[j];
      this.numbe[j] = temp;
      this.numbe[j].state = 'i';
      this.numbe[i].state = 'i';
    }
    temp = this.number[i].x;
    this.number[i].x = this.number[j].x;
    this.number[j].x = temp;
    temp = this.number[i];
    this.number[i] = this.number[j];
    this.number[j] = temp;
    this.number[j].state = 'i';
    this.number[i].state = 'i';
    await this.sleep(50);
    $('circle').css('stroke', '#000000');
    $('#rec' + k).css('fill', 'rgb(173, 216, 230)');
    $('#rec' + l).css('fill', 'rgb(173, 216, 230)');




  }
  async onClick() {
this.numbe.splice(6, 1);
  }
  async onClick1() {
    // this.onSwap(0, 15);
    this.numbe.splice(15, 1);
    console.log(this.numbe);



  }
  async heapify(n, i, bool) {
    let largest = i;
    const left = 2 * i;
    const right = 2 * i + 1;
    if (left < n && this.number[left].valu > this.number[largest].valu) {largest = left; }
    if (right < n && this.number[right].valu > this.number[largest].valu) {largest = right; }
    if (largest !== i) {
      await this.onSwap(i, largest, bool);
      await this.sleep(320);
      await this.heapify(n, largest, bool);
    }

  }
  async buildheap(n, bool) {

    const startIdx = (Math.floor(n / 2));
    for (let i = startIdx; i >= 1; i--) {
      await this.heapify(n, i, bool);
      await this.sleep(340);

    }
    await this.sleep(1000);
    await this.circles();


  }
  async heapsort(n) {
    const bool = true;
    for (let i = n - 1; i >= 1; i--) {
      let k = i.toString();
      $('#' + '0').css('fill', '#FFA500');
      await this.sleep(300);


      await this.onSwap(1, i, bool);
      await this.sleep(300);

      await this.heapify(i, 1, bool);
      await this.sleep(200);


      $('#rec' + k).css('fill', '#FFA500');
      // $('#' + k).addClass('animate');
      this.numbe.splice(i, 1);
      await this.sleep(1500);

      let id = 'r';
      if (i % 2 === 0) {
        id = 'l';
      }
      const m = Math.floor(i / 2);
      k = m.toString();
      // $('#' + id+k).addClass('animate');
      $('#' + id + k).remove();
      await this.sleep(1500);



    }
    $('#' + 'l' + '0').remove();

    $('rect').css('fill', '#FFA500');

  }

}
