import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {
    document.getElementById('menu').style.display = '';
  }

}
