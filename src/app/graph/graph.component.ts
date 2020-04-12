import { Component, OnInit } from '@angular/core';
import {NumberModel} from '../number.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  number: NumberModel[] = [];
  line = [];
  // tslint:disable-next-line:variable-name
  cp_4_10_v = {
    0: {
      x: 200,
      y: 150
    },
    1: {
      x: 300,
      y: 50
    },
    2: {
      x: 400,
      y: 150
    },
    3: {
      x: 300,
      y: 250
    },
    4: {
      x: 200,
      y: 350
    }
  };
  tesse = {
    0: {
      x: 200,
      y: 50
    },
    1: {
      x: 200,
      y: 170
    },
    2: {
      x: 350,
      y: 110
    },
    3: {
      x: 500,
      y: 170
    },
    4: {
      x: 275,
      y: 290
    },
    5: {
      x: 500,
      y: 290
    },
    6: {
      x: 600,
      y: 50
    },
    7: {
      x: 640,
      y: 240
    },
    8: {
      x: 700,
      y: 120
    }
  };
  // tslint:disable-next-line:variable-name
  tesse_g = [
     {
      u: 0,
      v: 1,
      w: 8
    },
     {
      u: 0,
      v: 2,
      w: 12
    },
{
      u: 1,
      v: 2,
      w: 13
    },
{
      u: 1,
      v: 3,
      w: 25
    },
{
      u: 1,
      v: 4,
      w: 9
    },
{
      u: 2,
      v: 3,
      w: 14
    },
{
      u: 2,
      v: 6,
      w: 21
    },
{
      u: 3,
      v: 4,
      w: 20
    },
{
      u: 3,
      v: 5,
      w: 8
    }, {
      u: 3,
      v: 6,
      w: 12
    }, {
      u: 3,
      v: 7,
      w: 12
    }, {
      u: 3,
      v: 8,
      w: 16
    },
{
      u: 4,
      v: 5,
      w: 19
    },
{
      u: 5,
      v: 7,
      w: 11
    },
{
      u: 6,
      v: 8,
      w: 11
    }, {
      u: 7,
      v: 8,
      w: 9
    }
  ];
  // tslint:disable-next-line:variable-name
  cp_4_10: number[][] = [[0, 4, 4, 6, 6], [4, 0, 2, 0, 0], [4, 2, 0, 8, 0], [6, 0, 8, 0, 9], [6, 0, 0, 9, 0]];

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
  x2 = x + (this.distance(x, y, i, j) - 14) * Math.cos( angle);
} else {
  x1 = x - 14 * Math.cos( angle);
  x2 = x - (this.distance(x, y, i, j) - 14) * Math.cos( angle);
}
    if (j > y) {
  y1 = y + 14 * Math.sin( angle);
  y2 = y + (this.distance(x, y, i, j) - 14) * Math.sin( angle);
} else {
  y1 = y - 14 * Math.sin( angle);
  y2 = y - (this.distance(x, y, i, j) - 14) * Math.sin( angle);
}
    return [x1, x2, y1, y2];

  }
  async circles() {
    for (let i = 0; i < 9; i++) {
        // this.number[i] = new NumberModel(0,  this.cp_4_10_v[i].x , this.cp_4_10_v[i].y);
      this.number[i] = new NumberModel(i,  this.tesse[i].x , this.tesse[i].y);

      this.number[i].state = 'i';

    }
    let k = 0;
    for (let i = 0; i < 16; i++) {

      // tslint:disable-next-line:max-line-length
        const z = this.setLine(this.tesse[this.tesse_g[i].u].x, this.tesse[this.tesse_g[i].u].y, this.tesse[this.tesse_g[i].v].x, this.tesse[this.tesse_g[i].v].y);
        z.push([this.tesse_g[i].u, this.tesse_g[i].v, this.tesse_g[i].w]);
        this.line[k++] = z;
    }

  }

  find(parent, i) {
    if (parent[i] < 0) {
      return i;
}
    return this.find(parent, parent[i]);
}
 union(parent, i, j) {
    if (i <= j) {
      parent[j] = i;
      parent[i] -= 1;
    } else {
      parent[i] = j;
      parent[j] -= 1;

    }

}
  async click() {
    // $('line').css('opacity', '0.2');
    this.tesse_g.sort((a, b) => {
     return a.w - b.w;
   });
    const parent = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    for (let i = 0; i < 16; i++) {
      const x = this.tesse_g[i].u;
      const y = this.tesse_g[i].v;
      const parentx = this.find(parent, x);
      const parenty = this.find(parent, y);
      const edge = '#e' + x.toString() + y.toString();
      $(edge).css('opacity', '1');
      $(edge).addClass('path');
      $('#' + x.toString()).css('stroke', 'orange');
      $('#' + y.toString()).css('stroke', 'orange');


      await this.sleep(1000);
      if (parentx !== parenty) {
        this.union(parent, parentx, parenty);

      } else {
        $(edge).removeClass('path');

        $(edge).css('opacity', '0.1');
        await this.sleep(1000);

      }
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.circles();
  }
  min(visited, key) {
    let min = Number.MAX_SAFE_INTEGER;
    let  m;
    for (let i = 0; i < visited.length - 1; i++) {
      if (visited[i] === 0 && key[i] < min) {
        min = key[i];
        m = i;

      }
    }
    return m;
  }

  async prims() {
    $('line').css('opacity', '0.1');
    const parent = new Array(9);
    const key = new Array(9);
    const visited = new Array(9);
    for (let i = 0; i < visited.length - 1; i++) {
      visited[i] = 0;
      key[i] = Number.MAX_SAFE_INTEGER;
    }
    key[0] = 0;
    for (let i = 0; i < visited.length - 1; i++) {
      const mi = this.min(visited, key);
      visited[mi] = 1;
      $('#' + mi.toString()).css('stroke', 'orange');

      for (let j = 0; j < 16; j++) {
        // tslint:disable-next-line:max-line-length
        if ((this.tesse_g[j].u === mi && visited[this.tesse_g[j].v] === 0) || (this.tesse_g[j].v === mi && visited[this.tesse_g[j].u] === 0)) {
          const edge = '#e' + this.tesse_g[j].u.toString() + this.tesse_g[j].v.toString();
          $(edge).css('opacity', '1');
          if (key[this.tesse_g[j].v] > this.tesse_g[j].w) {
            parent[this.tesse_g[j].v] = this.tesse_g[j].u;
            key[this.tesse_g[j].v] = this.tesse_g[j].w;

          }
        }


      }

      if (i > 0) {
        $('#e' + parent[mi].toString() + mi.toString()).addClass('path');
      }
      await this.sleep(1200);


    }

  }



}
