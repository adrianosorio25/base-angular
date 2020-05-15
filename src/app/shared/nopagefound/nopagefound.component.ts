import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: [`
    .container {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
      background: #FCB82F;
    }

    img {
      display: block;
      margin: auto;
      margin-top: 40px;
    }

    .text404 {
      font-size: 240px;
      text-align: center;
      color: #fff;
      margin-top: 120px;
      font-family: Bebas Neue;
    }

    .text {
      text-align: center;
      font-size: 30px;
      margin-top: 110px;
      color: #fff;
      font-family: Bebas Neue;
    }

    .btn {
      font-size: .8rem;
      border-radius: 60px;
      cursor: pointer;
      margin: auto;
      width: 20%;
      margin-top: 25px;
      display: block;
      background: #F58A28;
    }
  `
  ]
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
