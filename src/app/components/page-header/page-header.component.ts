import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  lbltitle = '';
  constructor( private router: Router, public _title: Title) {
    this.getDataRoute()
      .subscribe( data => {
        console.log('Breadcrumbs data: ', data);
        // this.breadcrumbs = data;
        this.lbltitle = data.title;
        // this.lblSubtitle = data.subtitle;
        this._title.setTitle(this.lbltitle);
      });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
  );
  }

}
