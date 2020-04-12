import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NumberModel} from '../number.model';
import * as $ from 'jquery';
import {Animations} from './animations';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css'],
  animations: Animations
})
export class VisualComponent implements OnInit {

a: number[] = [];
b = true;
  number: NumberModel[] = [];
  constructor() {

  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
  }
  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      const y = this.getRandomInt(40);
      this.number[i] = new NumberModel(y, 125 + i * 50, 220 - y * 4.8936);
      this.a[i] = y;
      this.number[i].state = 'i';

    }

  }
  onAdd(rec) {

    console.log(rec.x, rec.y);
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onSwap(el, el1) {
    const i: number = el;
    const j: number = el1;

    this.number[i].swapx = this.number[j].x;
    this.number[i].swapy = this.number[i].y;
    this.number[i].state = 'fi';
    const k = j.toString();
    const l = i.toString();

    $('.' + k).css('fill', 'rgb(220,20,60)');
    $('.' + l).css('fill', 'rgb(220,20,60)');

    this.number[j].swapx = this.number[i].x;
    this.number[j].swapy = this.number[j].y;

    this.number[j].state = 'fi';
    await this.sleep(320);
    let temp;
    temp = this.number[i].x;
    this.number[i].x = this.number[j].x;
    this.number[j].x = temp;
    temp = this.number[i];
    this.number[i] = this.number[j];
    this.number[j] = temp;
    this.number[j].state = 'i';
    this.number[i].state = 'i';
    await this.sleep(50);




  }



 async bubbleSort() {
   // tslint:disable-next-line:one-variable-per-declaration prefer-const
    let i, j, temp;
    for (i = 0; i < 15; i++) {
      for (j = 0; j < 15 - i - 1; j++) {
        if (this.number[j].value > this.number[j + 1].value) {


            this.onSwap(j, j + 1);
            await this.sleep(325);
            // temp = this.a[j];
            // this.a[j] = this.a[j + 1];
            // this.a[j + 1] = temp;

        }
      }
    }
 }

 async insertionSort() {
   // tslint:disable-next-line:one-variable-per-declaration prefer-const
    let i, key, j;
    for (i = 1; i < 15; i++) {
      const yp = this.number[i].y;
      const newy = 220 + (40 - this.number[i].value) * 4.9;
      this.number[i].swapx = this.number[i].x;
      this.number[i].swapy = newy;
      this.number[i].state = 'in';
      $('.' + i).css('fill', 'rgb(220,20,60)');

      await this.sleep(520);

      this.number[i].y = newy;
      key = this.number[i].value;
      j = i - 1;
      while (j >= 0 && this.number[j].value > key) {
        this.onSwap(j, j + 1);
        await this.sleep(325);
        $('.' + j).css('fill', 'rgb(173, 216, 230)');
        $('.' + (j + 1)).css('fill', 'rgb(173, 216, 230)');
       // this.number[j + 1].value = this.number[j].value;
        j = j - 1;
      }
      this.number[j + 1].state = 'i';
      await this.sleep(50);

      this.number[j + 1].swapx = this.number[j + 1].x;
      this.number[j + 1].swapy = yp;
      this.number[j + 1].state = 'in';

      await this.sleep(520);
      this.number[j + 1].y = yp;
      this.number[j + 1].state = 'i';





      this.number[j + 1].value = key;

    }

 }
 async merAni(i, x, y) {
   this.number[i].swapx = x;
   this.number[i].swapy = y;
   this.number[i].state = 'fi';


   await this.sleep(320);
   this.number[i].x = x;
   this.number[i].y = y;


   this.number[i].state = 'i';

 }






 async merge_sort(l, r) {
    if (l < r && this.b === true) {
      const m = Math.floor((l + r) / 2);
      if ( this.b === true) {
      await this.merge_sort(l, m);
      }
      if ( this.b === true) {

        await this.merge_sort(m + 1, r);
      }
      if ( this.b === true) {

        await this.merge(l, m, r);
      }
      await this.sleep(100);
      // this.b = false;


    }
 }

async merge(l, m, r) {
  // tslint:disable-next-line:one-variable-per-declaration prefer-const
    let i , j, k;
    const c: NumberModel[] = [];

    i = l;
    j = m + 1;
    k = l;
    console.log(l, m, r);

    while (i <= m && j <= r) {

      if (this.number[i].value <= this.number[j].value) {
        $('.' + (i)).css('fill', 'rgb(220, 20, 60)');

        this.merAni(i, 125 + k * 50, 220 + (40 - this.number[i].value) * 4.9);
        await this.sleep(320);



        c[k++] = this.number[i++];

      } else  {
        $('.' + (j)).css('fill', 'rgb(220, 20, 60)');

        this.merAni(j, 125 + k * 50, 220 + (40 - this.number[j].value) * 4.9);

        await this.sleep(320);



        c[k++] = this.number[j++];

      }
    }

    while (i <= m) {
      $('.' + (i)).css('fill', 'rgb(220, 20, 60)');

      this.merAni(i, 125 + k * 50, 220 + (40 - this.number[i].value) * 4.9);
      await this.sleep(320);


      c[k++] = this.number[i++];

      }

    while (j <= r) {

      $('.' + (j)).css('fill', 'rgb(220, 20, 60)');
      this.merAni(j, 125 + k * 50, 220 + (40 - this.number[j].value) * 4.9);
      await this.sleep(320);


      c[k++] = this.number[j++];


    }
  // tslint:disable-next-line:no-shadowed-variable
    for (k = l; k <= r; k++) {
      this.number[k] = c[k];

    }
    await this.sleep(100);
    for (k = l; k <= r; k++) {
    this.merAni(k, this.number[k].x, 220 - this.number[k].value * 4.8936);
    await this.sleep(320);
    $('.' + k).css('fill', 'rgb(255,165,0)');

  }


}
async click() {
stop();
}


  }

