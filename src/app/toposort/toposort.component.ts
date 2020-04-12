import { Component, OnInit } from '@angular/core';
import {NumberModel} from '../number.model';
import {Animations} from '../visual/animations';
import * as $ from 'jquery';
import * as d3 from 'd3';
@Component({
  selector: 'app-toposort',
  templateUrl: './toposort.component.html',
  styleUrls: ['./toposort.component.css'],
  animations: Animations
})
export class ToposortComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  graph_v = {
    0: {
      x: 150,
      y: 125
    },
    1: {
      x: 250,
      y: 50
    },
    2: {
      x: 250,
      y: 200
    },
    3: {
      x: 350,
      y: 125
    },
    4: {
      x: 450,
      y: 125
    }
  };
  // tslint:disable-next-line:variable-name
  graph_1 = {
    0: {
      x: 275,
      y: 120
    },
    1: {
      x: 150,
      y: 50
    },
    2: {
      x: 305,
      y: 195
    },
    3: {
      x: 440,
      y: 50
    },
    4: {
      x: 320,
      y: 290
    }
  };
  line = [];
  graph = {0: [1, 2], 1: [3], 2: [3], 3: [4], 4: []};
  graph1 = {0: [1, 2, 3], 1: [3, 4], 2: [4], 3: [4], 4: []};
rect: NumberModel[] = [];
number: NumberModel[] = [];

  distance(x, y, i, j) {
    return Math.sqrt(Math.pow((x - i), 2) + Math.pow((y - j), 2));
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  setLine(x: number, y: number, i: number, j: number) {
    const angle = Math.abs(Math.atan((y - j) / (x - i)));
    // tslint:disable-next-line:one-variable-per-declaration
    let x1, x2, y1, y2;
    if (i > x) {
      x1 = x + 14 * Math.cos( angle);
      x2 = x + (this.distance(x, y, i, j) - 20) * Math.cos( angle);
    } else {
      x1 = x - 14 * Math.cos( angle);
      x2 = x - (this.distance(x, y, i, j) - 20) * Math.cos( angle);
    }
    if (j > y) {
      y1 = y + 14 * Math.sin( angle);
      y2 = y + (this.distance(x, y, i, j) - 20) * Math.sin( angle);
    } else {
      y1 = y - 14 * Math.sin( angle);
      y2 = y - (this.distance(x, y, i, j) - 20) * Math.sin( angle);
    }
    return [x1, x2, y1, y2];

  }

  async circles() {
    for (let i = 0; i < 5; i++) {
      // this.number[i] = new NumberModel(0,  this.cp_4_10_v[i].x , this.cp_4_10_v[i].y);
      // this.number[i] = new NumberModel(i,  this.graph_v[i].x , this.graph_v[i].y);
      this.number[i] = new NumberModel(i,  this.graph_1[i].x , this.graph_1[i].y);


      this.number[i].state = 'i';

    }
    let k = 0;
    for (let i = 0; i < 4; i++) {
      const m = this.graph1[i];
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < m.length; j++) {
        const l = m[j];
        const z = this.setLine(this.graph_1[i].x, this.graph_1[i].y, this.graph_1[l].x, this.graph_1[l].y);
        z.push([i, l]);
        this.line[k++] = z;
      }

    }

    }

constructor() {
  // for (let i = 0; i < 5; i++) {
  //   this.rect[i] = new NumberModel(i + 2, 113, 223 - i * 28);
  // }
  }

ngOnInit(): void {
    this.circles();
  }


 async toposortutil(i, visited, stack) {
    visited[i] = true;
    for (const j  of this.graph1[i]) {
      if (!visited[j]) {
        const x = i.toString();
        const y = j.toString();
        // const x1 = $('#e' + x + y).attr('x1');
        // const x2 =  $('#e' + x + y).attr('x2');
        // const y1 = $('#e' + x + y).attr('y1');
        // const y2 = $('#e' + x + y).attr('y2');

        // d3.select('#g' + x + y).append('line').attr('x1', x1).attr('x2', x2).attr('y1', y1).attr('y2', y2).attr('stroke', 'orange');
        $('#e' + x + y).addClass('path');
        await this.sleep(600);


        await this.toposortutil(j, visited, stack);
        $('#e' + x + y).removeClass('path');
        $('#e' + x + y).attr('stroke', '#000');
      }

    }
    stack.push(i);
    const l = stack.indexOf(i);
    this.rect[l] = new NumberModel(i, 113, 223 - l * 28);
    await this.sleep(200);

    this.rect[l].state = 'i';
    await this.sleep(550);

  }
 async toposort() {
    const visited = [false, false, false, false, false];
    const stack = [];
    for (let i = 0; i < 5; i++) {
      if (!visited[i]) {
       await this.toposortutil(i, visited, stack);
       await this.sleep(1200);
      }
    }
    for (let i = this.rect.length - 1; i >= 0; i--) {
      this.rect[i].swapx = 210 + (this.rect.length - 1 - i) * 90;
      this.rect[i].swapy = 223;
      this.rect[i].state = 'fi';
      // tslint:disable-next-line:max-line-length
      d3.select('#svg1').append('text').attr('x', this.number[this.rect.length - 1 - i].x - 5).attr('y', this.number[this.rect.length - 1 - i].y + 32).text(this.rect[i].value.toString());
      await this.sleep(350);
    }



  }
  click(x1, x2, y1, y2) {
    const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    newLine.setAttribute('id', 'line');
    newLine.setAttribute('x1', x1);
    newLine.setAttribute('y1', y1);
    newLine.setAttribute('x2', x2);
    newLine.setAttribute('y2', y2);
    newLine.setAttribute('stroke-width', '10');
    newLine.setAttribute('class', '');

    return newLine;

  }
 async click1() {
    const x = '0';
    const y = '1';
    const x1 = $('#e' + x + y).attr('x1');
    const x2 =  $('#e' + x + y).attr('x2');
    const y1 = $('#e' + x + y).attr('y1');
    const y2 = $('#e' + x + y).attr('y2');

    $('#svg1').append(this.click(x1, x2, y1, y2));
    await this.sleep(1500);
    // $('#line').attr('class', 'path');
    d3.select('#line').attr('class', 'path');
    $('#e13').addClass('path');
  }

}


